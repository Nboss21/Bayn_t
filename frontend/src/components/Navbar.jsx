import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [atTop, setAtTop] = useState(true);
  const lastScrollY = useRef(0);
  const navRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const isAtTop = currentY < 10;

      setAtTop(isAtTop);

      if (isAtTop) {
        setVisible(true);
      } else if (currentY > lastScrollY.current) {
        // scrolling down — hide
        setVisible(false);
      } else {
        // scrolling up — show
        setVisible(true);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const isActive = (path) => location.pathname === path;

  const desktopLinkClass = (path) =>
    `hover:text-white transition-colors capitalize ${isActive(path) ? 'text-white underline underline-offset-[6px] decoration-[#eec15b] decoration-2' : ''}`;

  const mobileLinkClass = (path) =>
    `hover:text-white transition-colors capitalize text-center ${isActive(path) ? 'text-white underline underline-offset-[6px] decoration-[#eec15b] decoration-2' : 'text-white/70'}`;

  return (
    <div
      ref={navRef}
      className={`z-50 flex justify-center transition-all duration-300 ease-in-out
        ${atTop
          ? 'absolute top-6 left-0 right-0'
          : 'fixed top-0 left-0 right-0 pt-3 pb-2'
        }
        ${!atTop && !visible ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'}
      `}
    >
      <nav
        className={`flex justify-between items-center px-6 rounded-full w-[90%] max-w-4xl text-white border border-white/20 backdrop-blur-md transition-all duration-300 ease-in-out
          ${atTop
            ? 'py-3 bg-gradient-to-br from-[#8a5f3f]/80 to-[#7a5236]/80 shadow-md'
            : 'py-2.5 bg-gradient-to-br from-[#7a5236]/95 to-[#6b4830]/95 shadow-2xl shadow-black/30'
          }`}
      >
        <Link to="/" className="flex flex-col items-start justify-center leading-none">
          <span className="text-xl font-serif tracking-wide">Lumière</span>
          <span className="text-[8px] uppercase tracking-[0.15em] text-white/90 mt-0.5">MAKEUP ACADEMY</span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 text-xs font-medium text-white/90">
          <li><Link to="/about" className={desktopLinkClass('/about')}>about</Link></li>
          <li><Link to="/programs" className={desktopLinkClass('/programs')}>programs</Link></li>
          <li><Link to="/teachers" className={desktopLinkClass('/teachers')}>teachers</Link></li>
          <li><Link to="/gallery" className={desktopLinkClass('/gallery')}>gallery</Link></li>
          <li><Link to="/events" className={desktopLinkClass('/events')}>events</Link></li>
          <li><Link to="/contact" className={desktopLinkClass('/contact')}>contact</Link></li>
        </ul>

        <Link
          to="/application"
          className="hidden md:block bg-[#eec15b] text-[#1c1c1c] px-6 py-2 rounded-full text-xs font-semibold uppercase hover:bg-[#d6ac4f] transition-colors"
        >
          Apply Now
        </Link>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-white/70 hover:text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-[72px] left-0 right-0 mx-auto w-[90%] bg-[#2a2723] border border-white/10 rounded-2xl p-4 flex flex-col space-y-4 shadow-xl md:hidden z-40">
          <Link to="/about" className={mobileLinkClass('/about')} onClick={() => setIsOpen(false)}>about</Link>
          <Link to="/programs" className={mobileLinkClass('/programs')} onClick={() => setIsOpen(false)}>programs</Link>
          <Link to="/teachers" className={mobileLinkClass('/teachers')} onClick={() => setIsOpen(false)}>teachers</Link>
          <Link to="/gallery" className={mobileLinkClass('/gallery')} onClick={() => setIsOpen(false)}>gallery</Link>
          <Link to="/events" className={mobileLinkClass('/events')} onClick={() => setIsOpen(false)}>events</Link>
          <Link to="/contact" className={mobileLinkClass('/contact')} onClick={() => setIsOpen(false)}>contact</Link>
          <Link
            to="/application"
            className="bg-[#eec15b] text-[#1c1c1c] px-6 py-2 rounded-full text-xs font-semibold uppercase w-full text-center hover:bg-[#d6ac4f] transition-colors inline-block"
            onClick={() => setIsOpen(false)}
          >
            Apply Now
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
