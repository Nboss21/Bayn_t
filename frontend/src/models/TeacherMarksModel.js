import { teacherService } from '../services/applicationService';

const scheduleLabel = (schedule) => typeof schedule === 'string' ? schedule : schedule?.label || schedule?.description || (schedule ? Object.values(schedule).filter(Boolean).join(' · ') : 'Schedule not set');

export default class TeacherMarksModel {
  constructor(data) {
    this.data = data;
    this.header = data.header;
    this.assessments = data.header.assessments;
    this.classInfo = data.classInfo;
    this.gradingWeight = data.gradingWeight;
    this.categories = data.gradingWeight.categories;
    this.initialStudents = data.students;
    this.totalStudents = data.students.length;
  }

  assessmentById(id) {
    return this.assessments.find((a) => a.id === id) || this.assessments[0] || { id: 'all', name: 'Assessment' };
  }

  static async fetch(classId = null) {
    const classesResponse = await teacherService.classes({ per_page: 100 });
    const classRows = classesResponse?.data || classesResponse || [];
    const classItem = classRows.find((item) => String(item.id) === String(classId)) || classRows[0];
    if (!classItem) return new TeacherMarksModel({ header: { title: 'Marks', subtitle: 'No assigned class.', assessments: [] }, classInfo: {}, gradingWeight: { categories: [] }, students: [] });
    const [response, gradingResponse] = await Promise.all([
      teacherService.classAssessments(classItem.id, { per_page: 100 }),
      teacherService.grading({ class_id: classItem.id }),
    ]);
    const rows = response?.data || response || [];
    const grading = gradingResponse?.data || gradingResponse || [];
    const existingCategories = [...new Set(rows.flatMap((row) => (row.assessments || []).map((assessment) => assessment.category)))];
    const categories = (grading.length ? grading : existingCategories.map((category) => ({ category, weight_percentage: 0 }))).map((config) => {
      const id = config.category;
      return { id, label: id.charAt(0).toUpperCase() + id.slice(1), percent: Number(config.weight_percentage || 0), points: 100 };
    });
    const students = rows.map((row) => ({
      id: row.student?.id,
      name: row.student?.name || 'Unnamed student',
      studentId: `STU-${row.student?.id}`,
      practical: row.categories?.practical ?? null,
      practical_id: row.assessments?.find((assessment) => assessment.category === 'practical')?.id,
      theory: row.categories?.theory ?? null,
      theory_id: row.assessments?.find((assessment) => assessment.category === 'theory')?.id,
      professional: row.categories?.professional ?? null,
      professional_id: row.assessments?.find((assessment) => assessment.category === 'professional')?.id,
    })).map((student) => {
      const values = { ...student };
      categories.forEach((category) => {
        values[category.id] ??= null;
        values[`${category.id}_id`] ??= undefined;
      });
      return values;
    });
    const model = new TeacherMarksModel({
      header: { title: 'Marks', subtitle: `Record marks for ${classItem.name}.`, classId: classItem.id, assessments: [{ id: 'all', name: 'Assessment' }] },
      classInfo: { name: classItem.name, program: classItem.program?.name || 'Program', cohort: classItem.intake?.name || 'Current intake', schedule: scheduleLabel(classItem.schedule) },
      gradingWeight: { categories },
      students,
    });
    model.availableClasses = classRows.map((item) => ({ id: item.id, name: item.name, program: item.program?.name || 'Program' }));
    return model;
  }
}
