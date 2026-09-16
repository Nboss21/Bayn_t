import { useState, useEffect } from 'react';
import TeacherRosterModel from '../models/TeacherRosterModel';

const useTeacherRoster = (active = true) => {
  const [rosterModel, setRosterModel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!active) return;
    let cancelled = false;
    setLoading(true);

    TeacherRosterModel.fetch().then((data) => {
      if (!cancelled) {
        setRosterModel(data);
        setLoading(false);
      }
    });

    return () => { cancelled = true; };
  }, [active]);

  return { rosterModel, loading };
};

export default useTeacherRoster;