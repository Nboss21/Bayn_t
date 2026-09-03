import React, { createContext, useContext, useState, useCallback } from 'react';
import { pathData } from '../data/home/pathData';

const ApplicationContext = createContext(null);

const STEP_ORDER = ['program', 'selected', 'location', 'experience', 'documents', 'review', 'payment', 'confirmation'];

const initialState = {
  programId: null,
  city: '',
  area: '',
  landmark: '',
  education: null,
  experience: null,
  idDocument: null,
  profilePhoto: null,
  supportingDoc: null,
  paymentMethod: 'primary',
  agreed: false,
};

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'application/pdf'];

export function ApplicationProvider({ children }) {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [furthestStep, setFurthestStep] = useState(0);

  const updateField = useCallback((field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }, []);

  const getSelectedProgram = useCallback(() => {
    return pathData.programs.find((p) => p.id === formData.programId) || null;
  }, [formData.programId]);

  const validateFile = useCallback((file) => {
    if (!file) return 'This document is required';
    if (file.size > MAX_FILE_SIZE) return 'File must be under 10 MB';
    if (!ALLOWED_TYPES.includes(file.type)) return 'Only JPG, PNG, or PDF allowed';
    return null;
  }, []);

  const completeStep = useCallback((step) => {
    const idx = STEP_ORDER.indexOf(step);
    if (idx >= 0) {
      setFurthestStep((prev) => Math.max(prev, idx + 1));
    }
  }, []);

  // Returns true if can access, or returns the step they should be redirected to
  const canAccess = useCallback((step) => {
    const idx = STEP_ORDER.indexOf(step);
    if (idx <= furthestStep) return true;
    return STEP_ORDER[idx - 1]; // return the step they need to complete first
  }, [furthestStep]);

  const validateStep = useCallback((step) => {
    const newErrors = {};

    switch (step) {
      case 'program':
        if (!formData.programId) newErrors.programId = 'Please select a program';
        break;
      case 'location':
        if (!formData.city.trim()) newErrors.city = 'City is required';
        if (!formData.area.trim()) newErrors.area = 'Area is required';
        break;
      case 'experience':
        if (!formData.education) newErrors.education = 'Please select your education level';
        if (!formData.experience) newErrors.experience = 'Please select your experience level';
        break;
      case 'documents': {
        const idErr = validateFile(formData.idDocument);
        const photoErr = validateFile(formData.profilePhoto);
        if (idErr) newErrors.idDocument = idErr;
        if (photoErr) newErrors.profilePhoto = photoErr;
        break;
      }
      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, validateFile]);

  return (
    <ApplicationContext.Provider
      value={{ formData, errors, furthestStep, updateField, getSelectedProgram, validateStep, completeStep, canAccess, setErrors }}
    >
      {children}
    </ApplicationContext.Provider>
  );
}

export function useApplication() {
  const ctx = useContext(ApplicationContext);
  if (!ctx) throw new Error('useApplication must be used within ApplicationProvider');
  return ctx;
}