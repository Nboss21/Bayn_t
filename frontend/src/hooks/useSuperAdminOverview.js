import { useEffect, useState, useCallback } from 'react';
import SuperAdminOverviewModel from '../models/SuperAdminOverviewModel';
import { toUserMessage } from '../services/api';

export default function useSuperAdminOverview() {
  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(() => {
    let active = true;
    setLoading(true);
    setError(null);

    SuperAdminOverviewModel.fetch()
      .then((model) => {
        if (active) {
          setOverview(model);
          setError(null);
        }
      })
      .catch((err) => {
        if (active) {
          setError(toUserMessage(err, 'Could not load super admin overview.'));
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

  return { overview, loading, error, reload: load };
}