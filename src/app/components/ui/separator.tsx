import React from 'react';

interface SeparatorProps {
  className?: string;
  orientation?: 'horizontal' | 'vertical';
}

/**
 * مكون الفاصل وفقًا للهوية البصرية لمنصة TeachSpace
 */
const Separator = ({
  className = '',
  orientation = 'horizontal'
}: SeparatorProps) => {
  const baseClasses = 'bg-gray-200 dark:bg-gray-700';
  const orientationClasses = orientation === 'horizontal' 
    ? 'h-px w-full' 
    : 'h-full w-px';

  return (
    <div 
      className={`${baseClasses} ${orientationClasses} ${className}`}
      role="separator"
    />
  );
};

export { Separator };
