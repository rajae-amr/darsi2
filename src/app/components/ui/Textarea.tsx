import React, { forwardRef } from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
  label?: string;
  className?: string;
}

/**
 * مكون منطقة النص (Textarea)
 * يستخدم لإدخال نصوص متعددة الأسطر مع دعم التسميات ورسائل الخطأ
 */
const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ error, label, className = '', ...props }, ref) => {
    return (
      <div className="textarea-container">
        {label && (
          <label className="textarea-label">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={`textarea ${error ? 'textarea-error' : ''} ${className}`}
          {...props}
        />
        {error && <p className="textarea-error-message">{error}</p>}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export default Textarea;
