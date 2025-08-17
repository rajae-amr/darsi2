import React from 'react';
import Button from '@/app/components/ui/Button';

interface AlertProps {
  children: React.ReactNode;
  variant?: 'info' | 'success' | 'warning' | 'error';
  type?: 'info' | 'success' | 'warning' | 'error'; // إضافة خاصية type كبديل لـ variant
  icon?: React.ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
}

/**
 * مكون التنبيه وفقًا للهوية البصرية لمنصة TeachSpace
 */
export default function Alert({
  children,
  variant = 'info',
  type,
  icon,
  dismissible = false,
  onDismiss,
  className = ''
}: AlertProps) {
  // استخدام type إذا كان موجودًا، وإلا استخدام variant
  const alertType = type || variant;
  // تم نقل أنماط التنبيه إلى ملف components.css

  return (
    <div
      className={`
        alert alert-${alertType}
        ${className}
      `}
      role="alert"
    >
      {icon && (
        <div className="flex-shrink-0 me-3 rtl:ms-3 rtl:me-0">
          {icon}
        </div>
      )}
      
      <div className="flex-1">
        {children}
      </div>
      
      {dismissible && (
        <div className="ms-auto -mx-1.5 -my-1.5 rtl:ms-0 rtl:me-auto">
          <Button
            type="button"
            variant="flat"
            size="sm"
            onClick={onDismiss}
            aria-label="Close"
            className={`alert-close alert-close-${alertType}`}
          >
            <span className="sr-only">إغلاق</span>
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </Button>
        </div>
      )}
    </div>
  );
}
