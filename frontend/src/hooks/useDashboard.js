import { useEffect, useState, useCallback } from 'react';
import DashboardModel from '../models/DashboardModel';
import { toUserMessage } from '../services/api';

export default function useDashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(() => {
    let active = true;
    setLoading(true);
    setError(null);

    DashboardModel.fetch()
      .then((model) => {
        if (active) {
          setDashboard(model);
          setError(null);
        }
      })
      .catch((err) => {
        if (active) {
          setError(toUserMessage(err, 'Could not load registrar dashboard.'));
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const cleanup = load();
    return cleanup;
  }, [load]);

  return { dashboard, loading, error, reload: load };
}