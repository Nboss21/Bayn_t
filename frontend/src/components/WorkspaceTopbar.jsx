import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Search, Bell, ChevronDown, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function WorkspaceTopbar({
  breadcrumbs = [],
  userName,
  userInitials,
  onToggleNotifications,
  unreadCount = 0,
  profilePath,
  onSearch,          // optional: (query) => Promise<{applications, students}>
  searchBasePath,    // e.g. '/registrar'
}) {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searching, setSearching] = useState(false);
  const searchRef = useRef(null);
  const debounceRef = useRef(null);

  const handleSignOut = async () => {
    setDropdownOpen(false);
    try {
      await logout();
    } finally {
      navigate('/auth/login', { replace: true });
    }
  };

  const handleViewProfile = () => {
    setDropdownOpen(false);
    if (profilePath) navigate(profilePath);
  };

  const handleSearchChange = useCallback((e) => {
    const q = e.target.value;
    setSearchQuery(q);
    if (!onSearch) return;
    clearTimeout(debounceRef.current);
    if (!q.trim()) { setSearchResults(null); setSearchOpen(false); return; }
    debounceRef.current = setTimeout(async () => {
      setSearching(true);
      try {
        const results = await onSearch(q.trim());
        setSearchResults(results);
        setSearchOpen(true);
      } catch { setSearchResults(null); }
      finally { setSearching(false); }
    }, 300);
  }, [onSearch]);

  const handleSearchResultClick = (path) => {
    setSearchQuery('');
    setSearchResults(null);
    setSearchOpen(false);
    navigate(path);
  };

  // Close search on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) setDropdownOpen(false);
      if (searchRef.current && !searchRef.current.contains(event.target)) setSearchOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);


  return (
    <header className="h-[72px] flex items-center justify-between px-8 border-b border-[#e5e7eb] bg-[#fafafa] w-full font-sans relative z-50">
      {/* Breadcrumbs */}
      <div className="flex items-center text-[#111827] text-base">
        {breadcrumbs.map((crumb, i) => (
          <React.Fragment key={i}>
            {i > 0 && <span className="mx-2 text-[#d1d5db]">/</span>}
            {crumb.active ? (
              <span className="font-medium text-[#111827]">{crumb.label}</span>
            ) : (
              <Link
                to={crumb.to}
                className="text-[#111827] hover:text-[#6b7280] transition-colors"
              >
                {crumb.label}
              </Link>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Right side controls */}
      <div className="flex items-center gap-6">
        {/* Search */}
        <div className="relative" ref={searchRef}>
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className={`h-4 w-4 ${searching ? 'text-[#4A5D4E] animate-pulse' : 'text-[#9ca3af]'}`} />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            onFocus={() => searchResults && setSearchOpen(true)}
            placeholder={onSearch ? 'Search applications, students…' : 'Search'}
            className="block w-64 pl-10 pr-10 py-2 border border-[#e5e7eb] rounded-lg text-sm text-[#111827] placeholder-[#9ca3af] focus:outline-none focus:ring-1 focus:ring-[#9ca3af] focus:border-[#9ca3af] bg-[#f4f5f5]"
          />
          {searchQuery ? (
            <button
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#9ca3af] hover:text-[#111827]"
              onClick={() => { setSearchQuery(''); setSearchResults(null); setSearchOpen(false); }}
            >
              <X className="w-3.5 h-3.5" />
            </button>
          ) : (
            <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
              <div className="border border-[#d1d5db] rounded px-1.5 py-0.5 text-[10px] text-[#9ca3af] bg-white font-medium">⌘K</div>
            </div>
          )}

          {/* Search Results Dropdown */}
          {searchOpen && searchResults && (
            <div className="absolute top-full left-0 mt-2 w-80 bg-white border border-[#e5e7eb] rounded-xl shadow-lg py-2 z-50 max-h-72 overflow-y-auto">
              {/* Applications */}
              {searchResults.applications?.length > 0 && (
                <>
                  <p className="px-4 py-1 text-[10px] font-semibold text-[#9ca3af] uppercase tracking-wider">Applications</p>
                  {searchResults.applications.map((app) => (
                    <button
                      key={app.id}
                      onClick={() => handleSearchResultClick(`${searchBasePath || '/registrar'}/applications/${app.id}`)}
                      className="w-full text-left px-4 py-2 hover:bg-[#f9fafb] text-sm"
                    >
                      <span className="font-medium text-[#111827]">#{app.id}</span>
                      <span className="text-[#6b7280] ml-2">{app.status}</span>
                    </button>
                  ))}
                </>
              )}
              {/* Students */}
              {searchResults.students?.length > 0 && (
                <>
                  <p className="px-4 py-1 text-[10px] font-semibold text-[#9ca3af] uppercase tracking-wider mt-1">Students</p>
                  {searchResults.students.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => handleSearchResultClick(`${searchBasePath || '/registrar'}/students/${s.id}`)}
                      className="w-full text-left px-4 py-2 hover:bg-[#f9fafb] text-sm"
                    >
                      <span className="font-medium text-[#111827]">{s.name || s.user?.name}</span>
                      <span className="text-[#6b7280] ml-2 text-xs">ID {s.id}</span>
                    </button>
                  ))}
                </>
              )}
              {/* No results */}
              {!searchResults.applications?.length && !searchResults.students?.length && (
                <p className="px-4 py-3 text-sm text-[#9ca3af] text-center">No results found</p>
              )}
            </div>
          )}
        </div>

        {/* Notification bell */}
        <button
          onClick={onToggleNotifications}
          className="text-[#4b5563] hover:text-[#111827] relative"
          title="Notifications"
        >
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 bg-[#ef4444] text-white text-[10px] font-bold rounded-full ring-2 ring-[#fafafa] flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </button>

        {/* User Profile Mini */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-3 bg-[#a5be9a] hover:bg-[#96ae8b] rounded-full px-3 py-1.5 transition-colors"
          >
            <span className="text-sm font-medium text-[#111827] ml-1">{userName}</span>
            <div className="w-7 h-7 rounded-full bg-[#91ab86] flex items-center justify-center text-xs font-semibold text-[#111827]">
              {userInitials}
            </div>
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white border border-[#e5e7eb] rounded-xl shadow-lg py-2 z-50">
              <button
                onClick={handleViewProfile}
                className="w-full flex items-center justify-between px-4 py-2 hover:bg-[#f9fafb] text-sm text-[#111827] font-medium mb-1"
              >
                {userName}
                <ChevronDown className="w-4 h-4 text-[#6b7280]" />
              </button>
              <div className="border-t border-[#f3f4f6] my-1"></div>
              <button
                onClick={handleSignOut}
                className="w-full flex items-center px-4 py-2 hover:bg-[#f9fafb] text-sm text-[#111827] mt-1"
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
