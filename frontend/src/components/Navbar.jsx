import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={navRef} className="absolute top-6 left-0 right-0 flex justify-center z-50">
      <nav className="flex justify-between items-center py-3 px-6 bg-gradient-to-br from-[#8a5f3f]/80 to-[#7a5236]/80 backdrop-blur-md border border-white/20 rounded-full w-[90%] max-w-4xl text-white shadow-md">
        <Link to="/" className="flex flex-col items-start justify-center leading-none">
          <span className="text-xl font-serif tracking-wide">Lumière</span>
          <span className="text-[8px] uppercase tracking-[0.15em] text-white/90 mt-0.5">MAKEUP ACADEMY</span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 text-xs font-medium text-white/90">
          <li><Link to="/about" className="hover:text-white transition capitalize">about</Link></li>
          <li><Link to="/programs" className="hover:text-white transition capitalize">programs</Link></li>
          <li><Link to="/teachers" className="hover:text-white transition capitalize">teachers</Link></li>
          <li><Link to="/gallery" className="hover:text-white transition capitalize">gallery</Link></li>
          <li><Link to="/events" className="hover:text-white transition capitalize">events</Link></li>
          <li><Link to="/contact" className="hover:text-white transition capitalize">contact</Link></li>
        </ul>

        <button className="hidden md:block bg-[#eec15b] text-[#1c1c1c] px-6 py-2 rounded-full text-xs font-bold uppercase shadow-sm">
          Apply Now
        </button>

        {/* Mobile Hamburger Button */}
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
        <div className="absolute top-20 left-0 right-0 mx-auto w-[90%] bg-[#2a2723] border border-white/10 rounded-2xl p-4 flex flex-col space-y-4 shadow-xl md:hidden z-40">
          <Link to="/about" className="text-white/70 hover:text-white transition capitalize text-center" onClick={() => setIsOpen(false)}>about</Link>
          <Link to="/programs" className="text-white/70 hover:text-white transition capitalize text-center" onClick={() => setIsOpen(false)}>programs</Link>
          <Link to="/teachers" className="text-white/70 hover:text-white transition capitalize text-center" onClick={() => setIsOpen(false)}>teachers</Link>
          <Link to="/gallery" className="text-white/70 hover:text-white transition capitalize text-center" onClick={() => setIsOpen(false)}>gallery</Link>
          <Link to="/events" className="text-white/70 hover:text-white transition capitalize text-center" onClick={() => setIsOpen(false)}>events</Link>
          <Link to="/contact" className="text-white/70 hover:text-white transition capitalize text-center" onClick={() => setIsOpen(false)}>contact</Link>
          <button className="bg-[#eec15b] text-[#1c1c1c] px-6 py-2 rounded-full text-xs font-semibold uppercase w-full">
            Apply Now
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;

