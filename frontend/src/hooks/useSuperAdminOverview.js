import { useEffect, useState } from 'react';
import SuperAdminOverviewModel from '../models/SuperAdminOverviewModel';

export default function useSuperAdminOverview() {
  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    SuperAdminOverviewModel.fetch()
      .then((model) => {
        if (active) setOverview(model);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  return { overview, loading };
}