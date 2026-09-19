import { useEffect, useState } from 'react';
import TeacherMarksModel from '../models/TeacherMarksModel';

export default function useTeacherMarks(classId) {
  const [marksModel, setMarksModel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    TeacherMarksModel.fetch(classId)
      .then((model) => {
        if (active) setMarksModel(model);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [classId]);

  return { marksModel, loading };
}
