'use client';

import React from 'react';
import { useAuth } from '@/app/hooks/auth';
import Navbar from '@/app/components/layouts/Navbar';
import Footer from '@/app/components/layouts/Footer';
import { usePathname } from 'next/navigation';

interface AppLayoutProps {
  children: React.ReactNode;
  hideNavbar?: boolean;
  hideFooter?: boolean;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ 
  children, 
  hideNavbar = false,
  hideFooter = false 
}) => {
  const { isAuthenticated, isLoading } = useAuth();
  const pathname = usePathname();
  
  // تحديد نوع المستخدم للنافبار المناسب بناءً على مسار الصفحة
  let userType: 'teacher' | 'general' = 'general';
  
  // إذا كان المسار يحتوي على 'teacher' فهو صفحة معلم
  if (pathname?.includes('/dashboard/teacher')) {
    userType = 'teacher';
  }

  
  // إظهار النافبار فقط إذا اكتملت عملية التحقق من المصادقة
  const showNavbar = !hideNavbar && !isLoading;
  
  return (
    <div className="min-h-screen flex flex-col">
      {showNavbar && (
        <Navbar 
          isAuthenticated={isAuthenticated} 
          userType={userType} 
        />
      )}
      
      <main className="flex-grow">
        {children}
      </main>
      
      {!hideFooter && !isLoading && <Footer />}
    </div>
  );
};

export default AppLayout;
