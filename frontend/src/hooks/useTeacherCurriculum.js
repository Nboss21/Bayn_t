import { useEffect, useState } from 'react';
import TeacherCurriculumModel from '../models/TeacherCurriculumModel';

export default function useTeacherCurriculum() {
  const [curriculumModel, setCurriculumModel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    TeacherCurriculumModel.fetch()
      .then((model) => {
        if (active) setCurriculumModel(model);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  return { curriculumModel, loading };
}