import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { galleryImages } from '../../data/home/galleryData';

const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';
const AUTO_INTERVAL = 3800;
const SWIPE_THRESHOLD = 56;
const GAP = 16;
const CARD_W = 252;
const CARD_H = 356;

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const shortestDistance = (target, active, n) => {
  let d = (target - active) % n;
  if (d > n / 2) d -= n;
  if (d < -n / 2) d += n;
  return d;
};

const RevolvingShowcase = () => {
  const n = galleryImages.length;
  const [active, setActive] = useState(0);
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(min-width: 768px)').matches : true,
  );
  const [trackWidth, setTrackWidth] = useState(0);

  const viewportRef = useRef(null);
  const pausedRef = useRef(false);
  const hoveringRef = useRef(false);
  const dragRef = useRef({ startX: null, startY: null, movedX: 0, dragging: false });

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const update = () => setIsDesktop(mq.matches);
    mq.addEventListener('change', update);
    update();
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return undefined;
    const ro = new ResizeObserver(() => setTrackWidth(el.clientWidth));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const goTo = useCallback(
    (i) => setActive(((i % n) + n) % n),
    [n],
  );

  const goNext = useCallback(() => goTo(active + 1), [active, goTo]);
  const goPrev = useCallback(() => goTo(active - 1), [active, goTo]);

  // Auto-rotate — pauses on hover / focus / drag, disabled under reduced motion
  useEffect(() => {
    if (prefersReducedMotion()) return undefined;
    const id = setInterval(() => {
      if (!pausedRef.current) goTo(active + 1);
    }, AUTO_INTERVAL);
    return () => clearInterval(id);
  }, [active, goTo]);

  const syncPause = () => {
    pausedRef.current = hoveringRef.current || dragRef.current.dragging;
  };

  const handlePointerDown = (e) => {
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      movedX: 0,
      dragging: true,
    };
    pausedRef.current = true;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      /* noop */
    }
  };

  const handlePointerMove = (e) => {
    const s = dragRef.current;
    if (s.startX === null) return;
    const dx = e.clientX - s.startX;
    const dy = e.clientY - s.startY;
    if (Math.abs(dx) > 8 && Math.abs(dx) > Math.abs(dy)) s.movedX = dx;
  };

  const endGesture = () => {
    const s = dragRef.current;
    const moved = s.movedX;
    if (s.dragging && Math.abs(moved) > SWIPE_THRESHOLD) {
      if (moved < -SWIPE_THRESHOLD) goNext();
      else if (moved > SWIPE_THRESHOLD) goPrev();
    }
    s.startX = null;
    s.startY = null;
    s.movedX = 0;
    s.dragging = false;
    syncPause();
  };

  const handlePointerUp = (e) => {
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    endGesture();
  };

  const handlePointerCancel = () => endGesture();

  const handleClickCapture = (e) => {
    if (dragRef.current.movedX) e.preventDefault();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goPrev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      goNext();
    } else if (e.key === 'Home') {
      e.preventDefault();
      goTo(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      goTo(n - 1);
    }
  };

  const stepPx = trackWidth * 0.8 + GAP;

  return (
    <section
      id="showcase"
      aria-labelledby="showcase-heading"
      className="relative overflow-hidden bg-espresso py-24 text-cream md:py-32"
    >
      {/* Warm glow + grain */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-champagne/10 blur-[130px]"
      />
      <div className="grain-overlay grain-overlay--soft" aria-hidden="true" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 md:px-10">
        {/* ---------- Header ---------- */}
        <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.4em] text-champagne">
              <span className="h-px w-10 bg-champagne/70" />
              The Showcase
            </p>
            <h2
              id="showcase-heading"
              className="font-display text-5xl font-light leading-[1.02] tracking-[-0.01em] md:text-6xl"
            >
              Moments in <em className="not-italic text-champagne-light">motion</em>
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-cream/60">
            Real work from our students, instructors, and academy events — a living
            rotation of the craft.
          </p>
        </div>

        {/* ---------- Carousel region ---------- */}
        <div
          role="region"
          aria-roledescription="carousel"
          aria-label="Showcase of student and instructor work"
          aria-live="off"
          className="relative select-none"
        >
          <div
            ref={viewportRef}
            tabIndex={0}
            role="group"
            aria-label="Showcase images"
            className="relative h-[340px] outline-none focus-visible:ring-2 focus-visible:ring-champagne/70 focus-visible:ring-offset-4 focus-visible:ring-offset-espresso md:h-[430px]"
            style={{ touchAction: 'pan-y' }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerCancel}
            onClickCapture={handleClickCapture}
            onKeyDown={handleKeyDown}
            onMouseEnter={() => {
              hoveringRef.current = true;
              syncPause();
            }}
            onMouseLeave={() => {
              hoveringRef.current = false;
              syncPause();
            }}
          >
            {/* ---------- Desktop: 3D coverflow ---------- */}
            {isDesktop ? (
              <div className="relative h-full w-full [perspective:1600px]">
                {galleryImages.map((image, i) => {
                  const d = shortestDistance(i, active, n);
                  const isActive = d === 0;
                  const scale = 1 - Math.abs(d) * 0.13;
                  return (
                    <div
                      key={image.id}
                      aria-hidden={!isActive}
                      className="absolute left-1/2 top-1/2"
                      style={{
                        width: CARD_W,
                        height: CARD_H,
                        zIndex: 50 - Math.abs(d),
                        opacity: isActive ? 1 : 0.32,
                        transform: `translate(-50%, -50%) translateX(${d * 250}px) translateZ(${-Math.abs(d) * 140}px) scale(${scale}) rotateY(${d * 22}deg)`,
                        transition: `transform 700ms ${EASE}, opacity 500ms ${EASE}`,
                        willChange: 'transform, opacity',
                        pointerEvents: isActive ? 'auto' : 'none',
                      }}
                    >
                      <Card image={image} active={isActive} />
                    </div>
                  );
                })}
              </div>
            ) : (
              /* ---------- Mobile: simpler swipe carousel ---------- */
              <div className="relative h-full w-full overflow-hidden">
                <div
                  className="flex h-full"
                  style={{
                    transform: `translateX(${-active * stepPx}px)`,
                    transition: `transform 700ms ${EASE}`,
                    willChange: 'transform',
                  }}
                >
                  {galleryImages.map((image) => (
                    <div key={image.id} className="h-full shrink-0 pr-4" style={{ width: '80%' }}>
                      <Card image={image} active />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ---------- Caption ---------- */}
          <div className="mt-8 flex items-center justify-between gap-4 px-1 md:px-2">
            <p className="text-sm text-cream/70">
              <span className="mr-3 inline-block h-2 w-2 rounded-full bg-champagne align-middle" />
              {galleryImages[active].alt}
            </p>
            <p className="font-display text-sm tracking-[0.2em] text-cream/50" aria-hidden="true">
              {String(active + 1).padStart(2, '0')}
              <span className="mx-2 text-cream/25">/</span>
              {String(n).padStart(2, '0')}
            </p>
          </div>

          {/* ---------- Controls ---------- */}
          <div className="mt-8 flex items-center justify-center gap-6">
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous image"
              className="group flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-cream/80 transition-all duration-300 hover:border-champagne hover:text-champagne hover:-translate-x-0.5 active:translate-x-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne"
            >
              <svg
                className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <path d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {galleryImages.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  aria-current={active === i ? 'true' : undefined}
                  className={`h-1.5 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne ${
                    active === i
                      ? 'w-7 bg-champagne'
                      : 'w-1.5 bg-white/25 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={goNext}
              aria-label="Next image"
              className="group flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-cream/80 transition-all duration-300 hover:border-champagne hover:text-champagne hover:translate-x-0.5 active:translate-x-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne"
            >
              <svg
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <path d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const Card = ({ image, active }) => {
  const inner = (
    <div className="relative h-full w-full overflow-hidden rounded-2xl bg-espresso-soft shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)] ring-1 ring-white/10">
      <img
        src={image.src}
        alt={image.alt}
        loading="lazy"
        decoding="async"
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-transparent to-white/10"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.18),transparent_45%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />
      {/* Caption cue */}
      <div className="absolute inset-x-0 bottom-0 translate-y-3 p-5 opacity-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-hover:opacity-100">
        <p className="text-lg font-display text-cream">{image.alt}</p>
        <span className="mt-1 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-champagne">
          View gallery
          <svg
            className="h-3 w-3"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </div>
  );

  return active ? (
    <Link to="/gallery" className="group block h-full w-full" aria-label={`${image.alt} — view gallery`}>
      {inner}
    </Link>
  ) : (
    <div className="group block h-full w-full">{inner}</div>
  );
};

export default RevolvingShowcase;