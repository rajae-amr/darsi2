import React, { ReactNode, useEffect, useState } from 'react';

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export const Dialog = ({ isOpen, onClose, title, children, size = 'md' }: DialogProps) => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    
    // عند فتح الحوار، نمنع التمرير في الصفحة الخلفية
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      setMounted(false);
      document.body.style.overflow = '';
    };
  }, [isOpen]);
  
  // Prevent rendering on the server
  if (!mounted) return null;
  
  if (!isOpen) return null;
  
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    full: 'w-full max-w-[95%]'
  };

  // Handle click outside to close
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto">
      {/* طبقة التعتيم الخلفية */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={handleBackdropClick}
      />
      
      {/* حاوية الحوار */}
      <div className="fixed inset-0 flex items-center justify-center p-4 z-[101]">
        <div 
          className={`w-full ${sizeClasses[size]} transform overflow-hidden rounded-2xl bg-white p-8 text-right rtl:text-right ltr:text-left align-middle shadow-2xl transition-all border border-gray-100`}
        >
          {/* عنوان الحوار */}
          {title && (
            <h3 className="text-xl font-bold leading-6 text-gray-800 mb-6 border-b pb-3">
              {title}
            </h3>
          )}
          
          {/* محتوى الحوار */}
          <div className="text-gray-800">
            {children}
          </div>
          
          {/* زر الإغلاق */}
          <button
            type="button"
            className="absolute top-4 right-4 rtl:right-4 rtl:left-auto ltr:right-4 ltr:left-auto text-gray-400 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full p-1 transition-all duration-200"
            onClick={onClose}
          >
            <span className="sr-only">إغلاق</span>
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
