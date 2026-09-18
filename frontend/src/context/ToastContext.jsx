import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback((message, type = 'info', duration = 4000) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 6);
    const newToast = { id, message, type };
    setToasts((prev) => [...prev, newToast]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
    return id;
  }, [removeToast]);

  const toast = {
    show: showToast,
    success: (msg, duration) => showToast(msg, 'success', duration),
    error: (msg, duration) => showToast(msg, 'error', duration),
    warning: (msg, duration) => showToast(msg, 'warning', duration),
    info: (msg, duration) => showToast(msg, 'info', duration),
    dismiss: removeToast,
  };

  return (
    <ToastContext.Provider value={toast}>
      {children}
      {/* Toast Notification Viewport */}
      <div
        className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0"
        aria-live="polite"
      >
        {toasts.map((t) => {
          const config = {
            success: {
              bg: 'bg-[#064e3b]',
              border: 'border-[#059669]',
              text: 'text-white',
              icon: <CheckCircle2 className="w-5 h-5 text-[#34d399] shrink-0" />,
            },
            error: {
              bg: 'bg-[#7f1d1d]',
              border: 'border-[#dc2626]',
              text: 'text-white',
              icon: <AlertCircle className="w-5 h-5 text-[#f87171] shrink-0" />,
            },
            warning: {
              bg: 'bg-[#78350f]',
              border: 'border-[#d97706]',
              text: 'text-white',
              icon: <AlertTriangle className="w-5 h-5 text-[#fbbf24] shrink-0" />,
            },
            info: {
              bg: 'bg-[#172554]',
              border: 'border-[#2563eb]',
              text: 'text-white',
              icon: <Info className="w-5 h-5 text-[#60a5fa] shrink-0" />,
            },
          }[t.type] || {
            bg: 'bg-[#1f2937]',
            border: 'border-[#374151]',
            text: 'text-white',
            icon: <Info className="w-5 h-5 text-[#9ca3af] shrink-0" />,
          };

          return (
            <div
              key={t.id}
              className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border shadow-xl backdrop-blur-sm transition-all duration-300 animate-in fade-in slide-in-from-bottom-2 ${config.bg} ${config.border} ${config.text}`}
              role="alert"
            >
              {config.icon}
              <div className="flex-1 text-[13px] font-medium leading-snug break-words">
                {t.message}
              </div>
              <button
                onClick={() => removeToast(t.id)}
                className="opacity-70 hover:opacity-100 transition-opacity p-0.5 rounded focus:outline-none"
                aria-label="Close notification"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    // Fallback if rendered outside provider so it doesn't crash
    return {
      show: (msg) => console.log(msg),
      success: (msg) => console.log(msg),
      error: (msg) => console.error(msg),
      warning: (msg) => console.warn(msg),
      info: (msg) => console.info(msg),
      dismiss: () => {},
    };
  }
  return context;
}
