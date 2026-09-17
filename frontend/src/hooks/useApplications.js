import { useEffect, useState } from 'react';
import ApplicationsModel from '../models/ApplicationsModel';

export default function useApplications() {
  const [applications, setApplications] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    ApplicationsModel.fetch()
      .then((model) => {
        if (active) setApplications(model);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  return { applications, loading };
}