import { useEffect, useState } from 'react';
import TeacherClassesModel from '../models/TeacherClassesModel';

export default function useTeacherClasses() {
  const [classesModel, setClassesModel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    TeacherClassesModel.fetch()
      .then((model) => {
        if (active) setClassesModel(model);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  return { classesModel, loading };
}