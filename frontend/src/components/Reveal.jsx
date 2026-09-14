import React, { useEffect, useRef, useState } from 'react';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const Reveal = ({
  as: Tag = 'div',
  delay = 0,
  y = 26,
  once = true,
  className = '',
  children,
  style,
  ...rest
}) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(() => prefersReducedMotion());

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold: 0.18, rootMargin: '0px 0px -8% 0px' },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once]);

  return (
    <Tag
      ref={ref}
      style={{ '--reveal-y': `${y}px`, transitionDelay: `${delay}ms`, ...style }}
      className={`reveal ${className} ${inView ? 'reveal-in' : ''}`}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export default Reveal;