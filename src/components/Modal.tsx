import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-theme-surface border-2 border-theme p-6 rounded-xl shadow-2xl relative w-full max-w-md transform transition-all duration-200 scale-100">
        <button
          className="absolute top-4 right-4 text-theme-muted hover:text-theme-primary text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-all duration-200"
          onClick={onClose}
        >
          &times;
        </button>
        <div className="text-black">
          {children}
        </div>
      </div>
    </div>
  );
}