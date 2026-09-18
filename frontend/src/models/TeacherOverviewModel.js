import { teacherOverview } from '../data/teacherOverviewData';
import { teacherService } from '../services/applicationService';

export default class TeacherOverviewModel {
  constructor(data) {
    this.data = data;
    this.greeting = buildGreeting(data.user.name);
    this.stats = data.stats;
    this.attentionItems = data.attentionItems;
    this.attendanceChart = data.attendanceChart;
    this.classes = data.classes;
    this.assessmentProgress = data.assessmentProgress;
  }

  static async fetch() {
    const [dashboardResponse, classesResponse, attendanceResponse, assessmentsResponse] = await Promise.allSettled([
      teacherService.dashboard(),
      teacherService.classes({ per_page: 100 }),
      teacherService.attendance({ per_page: 200 }),
      teacherService.assessments({ per_page: 200 }),
    ]);

    const dashboard = dashboardResponse.status === 'fulfilled'
      ? (dashboardResponse.value?.data || dashboardResponse.value || {})
      : {};
    const classes = classesResponse.status === 'fulfilled'
      ? (classesResponse.value?.data || classesResponse.value || [])
      : [];
    const attendance = attendanceResponse.status === 'fulfilled'
      ? (attendanceResponse.value?.data || attendanceResponse.value || [])
      : [];
    const assessments = assessmentsResponse.status === 'fulfilled'
      ? (assessmentsResponse.value?.data || assessmentsResponse.value || [])
      : [];

    // Build class cards from real data
    const classRows = classes.map((item) => ({
      id: item.id,
      program: item.program?.name || 'Program',
      title: item.name,
      date: item.intake?.name || 'Current intake',
      time: typeof item.schedule === 'string' ? item.schedule : item.schedule?.label || 'Schedule not set',
      studentsCount: item.enrolled_count ?? item.students_count ?? 0,
      totalStudents: item.capacity ?? 0,
      seatsAvailable: item.available_capacity ?? 0,
      isFull: (item.available_capacity ?? 0) <= 0,
      status: 'Assigned',
      path: '/teacher/classes',
    }));

    // ── Attendance Chart: build last 5 school days from real records ──────────
    const today = new Date();
    const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const last5Days = [];
    let d = new Date(today);
    while (last5Days.length < 5) {
      d.setDate(d.getDate() - 1);
      if (d.getDay() !== 0 && d.getDay() !== 6) { // skip weekends
        last5Days.unshift(new Date(d));
      }
    }

    const chartData = last5Days.map((day) => {
      const dayStr = day.toISOString().split('T')[0];
      const dayRecords = attendance.filter((r) => (r.date || r.attendance_date || '').startsWith(dayStr));
      const total = dayRecords.length;
      const present = dayRecords.filter((r) => r.status === 'present' || r.status === 'late').length;
      const pct = total > 0 ? Math.round((present / total) * 100) : null;
      return { name: dayLabels[day.getDay()], value: pct };
    });

    // Filter out days with no data (null) → only show days with records
    const validChartData = chartData.filter((d) => d.value !== null);
    const primaryClass = classes[0];
    const attendanceChartData = validChartData.length > 0 ? validChartData : teacherOverview.attendanceChart.data;

    // ── Assessment Progress ───────────────────────────────────────────────────
    // Get unique student IDs across all classes
    const totalStudentSlots = classes.reduce((sum, c) => sum + (c.enrolled_count ?? c.students_count ?? 0), 0);
    const gradedCount = assessments.filter((a) => a.raw_score !== null && a.raw_score !== undefined).length;
    const totalPossible = Math.max(totalStudentSlots, assessments.length, 1);
    const marksCompletedPercent = Math.min(100, Math.round((gradedCount / totalPossible) * 100));
    const remainingPercent = 100 - marksCompletedPercent;
    const pendingAssessments = assessments.filter((a) => a.raw_score === null || a.raw_score === undefined).length;

    // ── Attention Items: built from real gaps ─────────────────────────────────
    const attentionItems = [];
    // Check if attendance was taken today for any class
    const todayStr = today.toISOString().split('T')[0];
    const todayAttendance = attendance.filter((r) => (r.date || '').startsWith(todayStr));
    if (todayAttendance.length === 0 && classes.length > 0) {
      attentionItems.push({
        id: 'attendance-today',
        type: 'Attendance',
        message: `Attendance not yet recorded today for ${classes[0]?.name || 'your class'}.`,
        refId: `#${classes[0]?.id || '—'}`,
        buttonText: 'Take Attendance',
        path: '/teacher/attendance',
      });
    }
    if (pendingAssessments > 0) {
      attentionItems.push({
        id: 'pending-marks',
        type: 'Marks',
        message: `${pendingAssessments} assessment${pendingAssessments > 1 ? 's' : ''} ready for mark entry.`,
        refId: '—',
        buttonText: 'Enter Marks',
        path: '/teacher/marks',
      });
    }
    // Fall back to static items if API gave no useful data
    const finalAttentionItems = attentionItems.length > 0 ? attentionItems : teacherOverview.attentionItems;

    // ── Stats ─────────────────────────────────────────────────────────────────
    const staticData = teacherOverview;
    const stats = staticData.stats.map((stat) => ({ ...stat }));
    stats.find((s) => s.id === 'classes').value = String(dashboard.classes_count ?? classRows.length);
    stats.find((s) => s.id === 'students').value = String(dashboard.student_count ?? totalStudentSlots);
    const marksStat = stats.find((s) => s.id === 'marks');
    if (marksStat) marksStat.value = String(pendingAssessments);
    const attendanceStat = stats.find((s) => s.id === 'attendance');
    if (attendanceStat) attendanceStat.value = String(todayAttendance.length === 0 && classes.length > 0 ? classes.length : 0);

    return new TeacherOverviewModel({
      user: { name: dashboard.user?.name || staticData.user.name, role: 'Teacher' },
      stats,
      classes: classRows,
      attentionItems: finalAttentionItems,
      attendanceChart: {
        title: 'Attendance this week',
        className: primaryClass?.name || 'My Class',
        subtitle: 'Weekly attendance rate across your classes.',
        data: attendanceChartData,
      },
      assessmentProgress: {
        marksCompletedPercent,
        remainingPercent,
        remainingText: pendingAssessments > 0
          ? `${pendingAssessments} assessment${pendingAssessments > 1 ? 's' : ''} still need completion.`
          : 'All assessments are up to date.',
        viewMarksPath: '/teacher/marks',
      },
    });
  }
}

function buildGreeting(name) {
  const hour = (new Date().getUTCHours() + 3) % 24;
  const part = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
  return `${part}, ${name}`;
}
