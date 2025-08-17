import React from 'react';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'white';
  className?: string;
}

/**
 * مكون الدوار (Spinner) لعرض حالة التحميل
 * يدعم أحجام وألوان مختلفة متوافقة مع الهوية البصرية للمنصة
 */
export const Spinner = ({ 
  size = 'md', 
  variant = 'primary', 
  className = '' 
}: SpinnerProps) => {
  return (
    <div 
      className={`spinner spinner-${size} spinner-${variant} ${className}`} 
      role="status"
    >
      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
        جاري التحميل...
      </span>
    </div>
  );
};
