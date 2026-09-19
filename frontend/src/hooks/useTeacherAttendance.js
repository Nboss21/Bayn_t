import { useEffect, useState } from 'react';
import TeacherAttendanceModel from '../models/TeacherAttendanceModel';

export default function useTeacherAttendance(classId, date) {
  const [attendanceModel, setAttendanceModel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    TeacherAttendanceModel.fetch(classId, date)
      .then((model) => {
        if (active) setAttendanceModel(model);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [classId, date]);

  return { attendanceModel, loading };
}
