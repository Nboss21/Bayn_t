import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, FileText, CreditCard, AlertCircle, Archive, ArchiveRestore, Inbox } from 'lucide-react';

const iconMap = {
  file: <FileText className="w-4 h-4" />,
  credit: <CreditCard className="w-4 h-4" />,
  alert: <AlertCircle className="w-4 h-4" />,
};

function renderLeft(left) {
  if (left.type === 'badge') {
    return <span className={`inline-flex px-2 py-1 text-xs font-medium rounded ${left.className}`}>{left.text}</span>;
  }
  if (left.type === 'paid') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-[#ecfdf3] text-[#027a48] text-xs font-medium rounded border border-[#abefc6]">
        <span className="w-1.5 h-1.5 rounded-full bg-[#12b76a]"></span>
        Paid
      </span>
    );
  }
  return <span className="text-xs text-[#6b7280]">{left.text}</span>;
}

export default function NotificationsDropdown({ notifications, onClose, onMarkAllRead, onMarkRead, onToggleArchive }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const counters = {
    all: notifications.filter((n) => !n.archived).length,
    unread: notifications.filter((n) => !n.read && !n.archived).length,
    archive: notifications.filter((n) => n.archived).length,
  };

  const filtered = notifications.filter((n) => {
    if (activeTab === 'unread') return !n.read && !n.archived;
    if (activeTab === 'archive') return n.archived;
    return !n.archived;
  });

  const handleOpen = (notification) => {
    onMarkRead(notification.id);
    if (notification.to) navigate(notification.to);
    onClose();
  };

  const tabs = [
    { key: 'all', label: 'All', count: counters.all },
    { key: 'unread', label: 'Unread', count: counters.unread },
    { key: 'archive', label: 'Archive', count: counters.archive },
  ];

  return (
    <div ref={dropdownRef} className="absolute top-16 right-8 w-[420px] bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-[#e5e7eb] flex flex-col font-sans z-50 overflow-hidden">
      {/* Header */}
      <div className="px-5 pt-5 pb-4 border-b border-[#f3f4f6]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-semibold text-[#111827]">Notifications</h2>
            {counters.unread > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-[#ecfdf3] text-[#027a48] text-xs font-medium border border-[#abefc6]">
                {counters.unread} unread
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onMarkAllRead}
              disabled={counters.unread === 0}
              className="text-sm text-[#6b7280] hover:text-[#374151] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Mark all as read
            </button>
            <button onClick={onClose} className="text-[#9ca3af] hover:text-[#6b7280] transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center bg-[#f3f4f6] p-1 rounded-lg">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 py-1.5 px-3 text-sm font-medium rounded-md transition-colors ${
                activeTab === tab.key
                  ? 'bg-white text-[#111827] shadow-sm'
                  : 'text-[#6b7280] hover:text-[#374151]'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-h-[500px] overflow-y-auto bg-[#f9fafb] p-3">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-14 text-center">
            <div className="w-12 h-12 rounded-full bg-[#e8ece0] flex items-center justify-center mb-3">
              <Inbox className="w-6 h-6 text-[#6b7280]" />
            </div>
            <p className="text-sm font-medium text-[#111827]">
              {activeTab === 'unread'
                ? 'No unread notifications'
                : activeTab === 'archive'
                  ? 'No archived notifications'
                  : 'No notifications'}
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between px-2 mb-3 mt-1">
              <span className="text-[11px] font-bold text-[#9ca3af] tracking-wider uppercase">TODAY</span>
              <span className="text-[11px] text-[#9ca3af]">
                {filtered.length} {filtered.length === 1 ? 'item' : 'items'}
              </span>
            </div>

            <div className="space-y-2">
              {filtered.map((n) => (
                <div
                  key={n.id}
                  onClick={() => handleOpen(n)}
                  className={`bg-white p-4 rounded-xl border shadow-sm cursor-pointer hover:shadow-md transition-all ${
                    n.read ? 'border-[#f3f4f6]' : 'border-[#e5e7eb]'
                  }`}
                >
                  <div className="flex gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${n.iconClass}`}>
                      {iconMap[n.icon]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <div className="flex items-center gap-2 min-w-0">
                          {!n.read && <span className="w-2 h-2 rounded-full bg-[#404c36] flex-shrink-0 mt-1.5"></span>}
                          <h3 className={`text-sm ${n.read ? 'text-[#374151]' : 'text-[#111827] font-semibold'}`}>
                            {n.title}
                          </h3>
                        </div>
                        <div className="flex items-center flex-shrink-0 ml-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onToggleArchive(n.id);
                            }}
                            title={n.archived ? 'Unarchive' : 'Archive'}
                            className="text-[#9ca3af] hover:text-[#6b7280] transition-colors p-1"
                          >
                            {n.archived ? <ArchiveRestore className="w-3.5 h-3.5" /> : <Archive className="w-3.5 h-3.5" />}
                          </button>
                          <span className="text-xs text-[#9ca3af] whitespace-nowrap">{n.time}</span>
                        </div>
                      </div>
                      <p className="text-sm text-[#4b5563] mb-3 leading-relaxed">
                        <span className="font-semibold text-[#111827]">{n.name}</span> {n.message}
                      </p>
                      <div className="flex items-center justify-between mt-1">
                        {renderLeft(n.left)}
                        {n.right && (
                          n.right.type === 'amount' ? (
                            <span className="text-xs font-medium text-[#6b7280]">{n.right.text}</span>
                          ) : (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleOpen(n);
                              }}
                              className={`px-3 py-1.5 text-xs font-medium rounded-md flex items-center gap-1 transition-colors ${
                                n.right.variant === 'solid'
                                  ? 'bg-[#404c36] hover:bg-[#343e2b] text-white'
                                  : 'bg-white border border-[#d1d5db] hover:bg-[#f9fafb] text-[#374151]'
                              }`}
                            >
                              {n.right.label} {n.right.variant === 'solid' && <span className="text-[10px]">›</span>}
                            </button>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}