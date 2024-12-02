import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === 'success' ? 'bg-[#2C3639]' : 'bg-red-600';

  return (
    <div className={`fixed top-4 right-4 ${bgColor} text-[#DCD7C9] px-6 py-4 rounded-lg shadow-xl z-50 flex items-center min-w-[300px] transform transition-all duration-300 ease-out`}>
      <span className="flex-grow font-light">{message}</span>
      <button onClick={onClose} className="ml-4 hover:opacity-75">
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};