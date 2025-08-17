'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/app/hooks/auth';
import { Spinner } from '@/app/components/ui/Spinner';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  
  // تحديد نوع المستخدم من المسار
  const userType = pathname?.includes('/dashboard/teacher')
    ? 'teacher'
    : pathname?.includes('/dashboard/student')
    ? 'student'
    : 'general';
  
  // حماية المسار
  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push('/auth/login');
      } else if (user) {
        // التحقق من تطابق نوع المستخدم مع المسار
        if (userType === 'teacher' && !user.is_teacher) {
          router.push('/dashboard/student');
        } else if (userType === 'student' && !user.is_student) {
          router.push('/dashboard/teacher');
        }
      }
    }
  }, [isAuthenticated, isLoading, user, router, pathname, userType]);
  
  if (isLoading) {
    return (
      <div className=" bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }
  
  return (
    <div className=" min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <main className="flex-1 flex">
        {children}
      </main>
    </div>
  );
}
