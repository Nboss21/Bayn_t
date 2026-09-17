import { useEffect, useState } from 'react';
import EnrollmentHistoryModel from '../models/EnrollmentHistoryModel';

export default function useEnrollmentHistory() {
  const [model, setModel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    EnrollmentHistoryModel.fetch()
      .then((m) => {
        if (active) setModel(m);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  return { model, loading };
}
