import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'success' | 'warning' | 'info' | 'secondary' | 'amber';
  color?: 'primary' | 'success' | 'warning' | 'info' | 'secondary' | 'amber'; // إضافة خاصية color كبديل لـ variant
  size?: 'sm' | 'md';
  className?: string;
}

/**
 * مكون الشارة وفقًا للهوية البصرية لمنصة TeachSpace
 */
export default function Badge({
  children,
  variant = 'primary',
  color,
  size = 'md',
  className = ''
}: BadgeProps) {
  // استخدام color إذا كان موجودًا، وإلا استخدام variant
  const badgeColor = color || variant;
  // تم نقل أنماط الشارات إلى ملف components.css

  return (
    <span
      className={`
        badge badge-${badgeColor} badge-${size}
        ${className}
      `}
    >
      {children}
    </span>
  );
}
