import React from 'react';
import Link from 'next/link';
import { FaGraduationCap } from 'react-icons/fa';

type LogoProps = {
  variant?: 'full' | 'icon' | 'text';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  withLink?: boolean;
  href?: string;
};

/**
 * مكون الشعار لمنصة TeachSpace
 * يدعم ثلاثة أنواع: الشعار الكامل، الأيقونة فقط، النص فقط
 */
export const Logo: React.FC<LogoProps> = ({ 
  variant = 'full', 
  size = 'md', 
  className = '',
  withLink = true,
  href = '/' 
}) => {
  // تحديد أحجام الشعار
  const sizeClasses = {
    sm: 'h-8',
    md: 'h-10',
    lg: 'h-12',
    xl: 'h-16'
  };

  // تحديد نوع الشعار المراد عرضه
  const renderLogo = () => {
    switch (variant) {
      case 'icon':
        return (
          <div className={`flex items-center justify-center ${sizeClasses[size]} ${className}`}>
            <div className=" p-2 rounded-lg flex items-center justify-center">
              <FaGraduationCap className="text-blue-600" style={{ fontSize: '24px' }} />
            </div>
          </div>
        );
      
      case 'text':
        return (
          <div className={`flex items-center ${sizeClasses[size]} ${className}`}>
            <span className="font-bold text-blue-600 text-2xl">درسي<span className="text-green-500">منصة</span></span>
          </div>
        );
        
      default: // full logo
        return (
          <div className={`flex items-center ${sizeClasses[size]} ${className}`}>
            <div className=" p-2 rounded-lg flex items-center justify-center">
              <FaGraduationCap className="text-blue-600" style={{ fontSize: '24px' }} />
            </div>
            <span className="font-bold text-blue-600 text-2xl">درسي </span>
          </div>
        );
    }
  };

  // إذا كان withLink صحيحًا، قم بتضمين الشعار داخل رابط
  if (withLink) {
    return (
      <Link href={href} className={`no-underline`}>
        {renderLogo()}
      </Link>
    );
  }
  
  // وإلا، قم بإرجاع الشعار فقط
  return renderLogo();
}
