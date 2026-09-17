import { useEffect, useState } from 'react';
import SuperAdminClassesModel from '../models/SuperAdminClassesModel';

export default function useSuperAdminClasses() {
  const [classesModel, setClassesModel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    SuperAdminClassesModel.fetch()
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