import { useCallback, useEffect, useState } from 'react';
import SuperAdminUsersModel from '../models/SuperAdminUsersModel';

export default function useSuperAdminUsers() {
  const [usersModel, setUsersModel] = useState(null);
  const [loading, setLoading] = useState(true);

  const reload = useCallback(() => {
    let active = true;
    setLoading(true);
    SuperAdminUsersModel.fetch()
      .then((model) => {
        if (active) setUsersModel(model);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => reload(), [reload]);

  return { usersModel, loading, reload };
}
