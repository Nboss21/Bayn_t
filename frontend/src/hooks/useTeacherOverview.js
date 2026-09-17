import { useEffect, useState } from 'react';
import TeacherOverviewModel from '../models/TeacherOverviewModel';

export default function useTeacherOverview() {
  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    TeacherOverviewModel.fetch()
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
