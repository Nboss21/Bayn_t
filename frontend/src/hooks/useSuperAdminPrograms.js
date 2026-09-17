import { useEffect, useState } from 'react';
import SuperAdminProgramsModel from '../models/SuperAdminProgramsModel';

export default function useSuperAdminPrograms() {
  const [programsModel, setProgramsModel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    SuperAdminProgramsModel.fetch()
      .then((model) => {
        if (active) setProgramsModel(model);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  return { programsModel, loading };
}