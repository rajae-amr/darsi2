import React from 'react';
import { BiLoaderAlt } from 'react-icons/bi';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'flat' | 'success' | 'warning' | 'white' | 'outline' | 'link';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: () => void;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  href?: string;
}

/**
 * مكون الزر وفقًا للهوية البصرية لمنصة TeachSpace
 */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  type = 'button',
  disabled = false,
  onClick,
  fullWidth = false,
  icon,
  iconPosition = 'left',
  loading = false,
  href
}: ButtonProps) {
  // تم نقل أنماط الأزرار إلى ملف components.css

  // تجميع الأنماط
  const ButtonContent = (
    <>
      {loading && (
        <BiLoaderAlt className="animate-spin btn-icon btn-icon-start" />
      )}
      {icon && iconPosition === 'left' && !loading && (
        <span className="btn-icon btn-icon-start">{icon}</span>
      )}
      {children}
      {icon && iconPosition === 'right' && (
        <span className="btn-icon btn-icon-end">{icon}</span>
      )}
    </>
  );

  const buttonClasses = `
    btn btn-${variant} btn-${size}
    ${fullWidth ? 'w-full' : ''}
    ${disabled || loading ? 'btn-disabled' : ''}
    ${className}
  `;

  if (href) {
    return (
      <a
        href={href}
        className={buttonClasses}
        onClick={onClick}
      >
        {ButtonContent}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {ButtonContent}
    </button>
  );
}

export default Button;
