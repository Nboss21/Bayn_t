import { teacherCurriculum } from '../data/teacherCurriculumData';

export default class TeacherCurriculumModel {
  constructor(data) {
    this.data = data;
    this.header = data.header;
    this.banner = data.banner;
    this.programs = data.programs;
    this.activeProgramId = data.activeProgramId;
    this.filterTabs = data.filterTabs;
    this.teachingContext = data.teachingContext;
    this.rawModules = data.modules;
    this.modulesCount = data.modules.length;
    this.moduleCount = data.modules.filter((m) => m.type === 'module').length;
    this.briefCount = data.modules.filter((m) => m.type === 'brief').length;
    this.tabCounts = {
      All: this.modulesCount,
      module: this.moduleCount,
      brief: this.briefCount,
    };

    const { completedModules, totalModules } = data.progress;
    const hasInProgress = data.modules.some((m) => m.status === 'in_progress');
    const coursewayUnits = completedModules + (hasInProgress ? 1 : 0);
    const percent = totalModules > 0 ? (coursewayUnits / totalModules) * 100 : 0;
    this.progress = {
      ...data.progress,
      percentDisplay: percent % 1 === 0 ? `${percent.toFixed(0)}%` : `${percent.toFixed(1)}%`,
    };
  }

  filterModules(type, searchQuery) {
    let result = [...this.rawModules];

    if (type && type !== 'All') {
      result = result.filter((m) => m.type === type);
    }

    if (searchQuery && searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (m) =>
          m.title.toLowerCase().includes(q) ||
          m.description.toLowerCase().includes(q) ||
          m.lessons.some((l) => l.title.toLowerCase().includes(q))
      );
    }

    return result;
  }

  static async fetch() {
    return new TeacherCurriculumModel(teacherCurriculum);
  }
}