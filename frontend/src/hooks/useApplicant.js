import { useEffect, useState } from 'react';
import ApplicationModel from '../models/ApplicationModel';

export default function useApplicant(id) {
  const [applicant, setApplicant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    ApplicationModel.fetch(id)
      .then((model) => {
        if (active) setApplicant(model);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [id]);

  const transition = (options) => {
    setApplicant((current) => (current ? current.transition(options.status, options) : null));
  };

  return { applicant, loading, transition };
}