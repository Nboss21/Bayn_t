import { teacherClasses } from '../data/teacherClassesData';

export default class TeacherClassesModel {
  constructor(data) {
    this.data = data;
    this.pageTitle = data.pageTitle;
    this.pageSubtitle = data.pageSubtitle;
    this.filters = data.filters;
    this.attentionBanner = data.attentionBanner;
    this.classes = data.classes;
    this.assignedCount = data.classes.length;
    this.programs = data.filters.programs;
    this.intakes = data.filters.intakes;
    this.statuses = data.filters.statuses;
    this.sortOptions = data.filters.sortOptions;
  }

  static async fetch() {
    return new TeacherClassesModel(teacherClasses);
  }
}