import { useEffect, useState } from 'react';
import StudentsModel from '../models/StudentsModel';

export default function useStudents() {
  const [students, setStudents] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    StudentsModel.fetch()
      .then((model) => {
        if (active) setStudents(model);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  return { students, loading };
}