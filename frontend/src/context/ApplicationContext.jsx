import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { contentService, applicationService } from '../services/applicationService';
import { useAuth } from './AuthContext';

const ApplicationContext = createContext(null);
const STEP_ORDER = ['program', 'selected', 'location', 'experience', 'documents', 'review', 'payment', 'confirmation'];
const initialState = { programId: null, intakeId: null, city: '', area: '', landmark: '', education: null, experience: null, idDocument: null, profilePhoto: null, supportingDoc: null, paymentMethod: 'primary', agreed: false };
const normalizeProgram = (p) => ({ ...p, title: p.name, duration: p.duration_weeks ? `${p.duration_weeks} weeks` : '—', image: p.image_url || '/hero.png' });

export function ApplicationProvider({ children }) {
  const { user } = useAuth();
  const [formData, setFormData] = useState(initialState); const [programs, setPrograms] = useState([]); const [intakes, setIntakes] = useState([]);
  const [application, setApplication] = useState(null); const [errors, setErrors] = useState({}); const [furthestStep, setFurthestStep] = useState(0); const [loading, setLoading] = useState(true);
  useEffect(() => { contentService.programs({ status: 'open', per_page: 100 }).then((data) => setPrograms((data?.data || data || []).map(normalizeProgram))).catch(() => setErrors({ api: 'Programs could not be loaded.' })).finally(() => setLoading(false)); }, []);
  useEffect(() => { if (!user) return; applicationService.list({ per_page: 100 }).then((data) => { const drafts = data?.data || data || []; const draft = drafts.find((item) => item.status === 'draft'); if (draft) { setApplication(draft); setFormData((prev) => ({ ...prev, programId: draft.program_id, intakeId: draft.intake_id })); } }).catch(() => {}); }, [user]);
  useEffect(() => { if (formData.programId) contentService.intakes({ program_id: formData.programId, status: 'open', per_page: 100 }).then((data) => setIntakes(data?.data || data || [])).catch(() => setIntakes([])); }, [formData.programId]);
  const updateField = useCallback((field, value) => { setFormData((prev) => ({ ...prev, [field]: value })); setErrors((prev) => { const next = { ...prev }; delete next[field]; return next; }); }, []);
  const getSelectedProgram = useCallback(() => programs.find((p) => String(p.id) === String(formData.programId)) || null, [programs, formData.programId]);
  const validateFile = useCallback((file) => !file ? 'This document is required' : file.size > 10 * 1024 * 1024 ? 'File must be under 10 MB' : !['image/jpeg', 'image/png', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type) ? 'Only PDF, JPG, PNG, DOC, or DOCX allowed' : null, []);
  const validateStep = useCallback((step) => { const next = {}; if (step === 'program' && !formData.programId) next.programId = 'Please select a program'; if (step === 'selected' && !formData.intakeId) next.intakeId = 'Please select an intake'; if (step === 'location') { if (!formData.city.trim()) next.city = 'City is required'; if (!formData.area.trim()) next.area = 'Area is required'; } if (step === 'experience') { if (!formData.education) next.education = 'Please select your education level'; if (!formData.experience) next.experience = 'Please select your experience level'; } if (step === 'documents') { next.idDocument = validateFile(formData.idDocument); next.profilePhoto = validateFile(formData.profilePhoto); Object.keys(next).forEach((key) => !next[key] && delete next[key]); } setErrors(next); return !Object.keys(next).length; }, [formData, validateFile]);
  const completeStep = useCallback((step) => { const index = STEP_ORDER.indexOf(step); setFurthestStep((prev) => Math.max(prev, index + 1)); }, []);
  const canAccess = useCallback((step) => { const index = STEP_ORDER.indexOf(step); return index <= furthestStep ? true : STEP_ORDER[index - 1]; }, [furthestStep]);
  const ensureDraft = useCallback(async () => { if (application?.id) return application; const draft = await applicationService.create({ program_id: formData.programId, intake_id: formData.intakeId, applicant_name: user?.name, applicant_phone: user?.phone }); setApplication(draft); return draft; }, [application, formData, user]);
  const saveStep = useCallback(async (step) => { const draft = await ensureDraft(); const payload = { program_id: formData.programId, intake_id: formData.intakeId, applicant_name: user?.name, applicant_phone: user?.phone }; const saved = await applicationService.saveStep(draft.id, step, payload); setApplication(saved); return saved; }, [ensureDraft, formData, user]);
  const uploadDocuments = useCallback(async () => { const draft = await ensureDraft(); for (const [type, file] of [['id_photo', formData.idDocument], ['registration_doc', formData.supportingDoc], ['other', formData.profilePhoto]]) if (file) await applicationService.upload(draft.id, type, file); }, [ensureDraft, formData]);
  return <ApplicationContext.Provider value={{ formData, programs, intakes, application, loading, errors, furthestStep, updateField, getSelectedProgram, validateStep, completeStep, canAccess, setErrors, ensureDraft, saveStep, uploadDocuments }}>{children}</ApplicationContext.Provider>;
}
export function useApplication() { const context = useContext(ApplicationContext); if (!context) throw new Error('useApplication must be used within ApplicationProvider'); return context; }
