import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="absolute top-6 left-0 right-0 flex justify-center z-50">
      <nav className="flex justify-between items-center py-3 px-6 bg-[#2a2723]/80 backdrop-blur-sm border border-white/10 rounded-full w-[90%] max-w-4xl text-white">
        <Link to="/" className="flex flex-col items-start justify-center leading-none">
          <span className="text-xl font-serif tracking-wide">Lumière</span>
          <span className="text-[8px] uppercase tracking-[0.15em] text-white/70 mt-0.5">MAKEUP ACADEMY</span>
        </Link>
        <ul className="flex space-x-6 text-xs font-medium text-white/70">
          <li><Link to="/about" className="hover:text-white transition capitalize">about</Link></li>
          <li><Link to="/programs" className="hover:text-white transition capitalize">programs</Link></li>
          <li><a href="#" className="hover:text-white transition capitalize">teachers</a></li>
          <li><a href="#" className="hover:text-white transition capitalize">gallery</a></li>
          <li><Link to="/events" className="hover:text-white transition capitalize">events</Link></li>
        </ul>
        <button className="bg-[#eec15b] text-[#1c1c1c] px-6 py-2 rounded-full text-xs font-semibold uppercase">
          Apply Now
        </button>
      </nav>
    </div>
  );
};

export default Navbar;

