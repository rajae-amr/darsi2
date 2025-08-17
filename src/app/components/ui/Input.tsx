import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  fullWidth?: boolean;
  helperText?: string;
}

/**
 * مكون حقل الإدخال وفقًا للهوية البصرية لمنصة TeachSpace
 */
const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ 
    label, 
    error, 
    icon, 
    className = '', 
    fullWidth = true, 
    helperText,
    ...props 
  }, ref) => {
    return (
      <div className={`relative ${className}`}>
        {label && (
          <label 
            htmlFor={props.id} 
            className="input-label"
          >
            {label}
          </label>
        )}
        
        <div className="relative">
          {icon && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              {icon}
            </div>
          )}
          
          <input
            ref={ref}
            className={`
              input
              ${icon ? (props.dir === 'rtl' ? 'pl-10' : 'pr-10') : ''}
              ${error ? 'input-error' : ''}
              ${fullWidth ? 'w-full' : ''}
              ${className}
            `}
            {...props}
          />
          {icon && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              {icon}
            </div>
          )}
        </div>
        
        {error && (
          <p className="error-message">
            {error}
          </p>
        )}
        {!error && helperText && (
          <p className="mt-1 text-sm text-gray-500">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
