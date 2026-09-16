import { useEffect, useState } from 'react';
import TeacherAttendanceModel from '../models/TeacherAttendanceModel';

export default function useTeacherAttendance() {
  const [attendanceModel, setAttendanceModel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    TeacherAttendanceModel.fetch()
      .then((model) => {
        if (active) setAttendanceModel(model);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  return { attendanceModel, loading };
}