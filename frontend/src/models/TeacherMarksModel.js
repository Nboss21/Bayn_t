import { teacherMarks } from '../data/teacherMarksData';

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
    return this.assessments.find((a) => a.id === id) || this.assessments[0];
  }

  static async fetch() {
    return new TeacherMarksModel(teacherMarks);
  }
}