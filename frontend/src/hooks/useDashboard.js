import { useEffect, useState } from 'react';
import DashboardModel from '../models/DashboardModel';

export default function useDashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    DashboardModel.fetch()
      .then((model) => {
        if (active) setDashboard(model);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  return { dashboard, loading };
}