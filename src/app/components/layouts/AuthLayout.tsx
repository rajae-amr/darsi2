'use client';

import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
}

/**
 * تخطيط خاص بصفحات المصادقة (تسجيل الدخول، التسجيل، استعادة كلمة المرور)
 * لا يحتوي على النافبار أو الفوتر لتركيز المستخدم على عملية المصادقة
 */
export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {children}
    </div>
  );
};

export default AuthLayout;
