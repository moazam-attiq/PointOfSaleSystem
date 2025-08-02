import React, { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext();
export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, variant = 'success', delay = 3000) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, variant }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, delay);
  }, []);

  const getStyles = (variant) => {
    switch (variant) {
      case 'success':
        return 'bg-green-600 text-white';
      case 'danger':
        return 'bg-red-600 text-white';
      case 'warning':
        return 'bg-yellow-400 text-black';
      case 'info':
        return 'bg-blue-500 text-white';
      default:
        return 'bg-gray-700 text-white';
    }
  };

  const getIcon = (variant) => {
    switch (variant) {
      case 'success':
        return (
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        );
      case 'danger':
        return (
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        );
      case 'warning':
        return (
          <svg
            className="w-5 h-5 text-black"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M4.93 19h14.14a2 2 0 001.7-3l-7.07-12a2 2 0 00-3.42 0l-7.07 12a2 2 0 001.7 3z" />
          </svg>
        );
      case 'info':
        return (
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z" />
          </svg>
        );
      default:
        return (
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4h4" />
          </svg>
        );
    }
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      <div className="fixed top-5 right-5 space-y-4 z-50">
        {toasts.map(({ id, message, variant }) => (
          <div
            key={id}
            className={`flex items-center w-full max-w-xs p-4 rounded-lg shadow-lg ${getStyles(
              variant
            )}`}
          >
            <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg mr-3">
              {getIcon(variant)}
            </div>
            <div className="text-sm font-medium">{message}</div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};
