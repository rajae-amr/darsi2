import React, { forwardRef } from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: string;
  label?: string;
  className?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ children, error, label, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="input-label">
            {label}
          </label>
        )}
        <select
          ref={ref}
          className={`select ${
            error ? `select-error` : ``
          } ${className}`}
          {...props}
        >
          {children}
        </select>
        {error && (
          <p className="mt-1 text-sm error-message">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

export default Select;
