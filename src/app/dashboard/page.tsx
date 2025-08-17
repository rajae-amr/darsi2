'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/hooks/auth';
import Button from '../components/ui/Button';

export default function MainDashboard() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  // حماية المسار - التأكد من المصادقة وتوجيه المستخدمين المحددين إلى لوحات تحكمهم الخاصة
  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        // إذا لم يكن المستخدم مصادقًا، توجيهه إلى صفحة اختيار نوع المستخدم لتسجيل الدخول
        router.push('/auth/login/type');
      } else if (user) {
        // توجيه المستخدمين المحددين إلى لوحات تحكمهم الخاصة
        if (user.is_teacher) {
          router.push('/dashboard/teacher');
        } 
        // إذا لم يكن المستخدم معلمًا أو طالبًا، فسيبقى في لوحة التحكم العامة
      }
    }
  }, [isAuthenticated, isLoading, user, router]);

  // عرض شاشة تحميل أثناء التحقق من المصادقة
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <p className="text-lg">جاري التحميل...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <h1 className="text-2xl font-bold mb-6">لوحة التحكم العامة</h1>
      
      {user && (
        <div className="min-h-screen bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">مرحبًا، {user.first_name || user.username||user.email}</h2>
          <p className="mb-4">هذه هي لوحة التحكم العامة.</p>
          
          <div className="flex flex-wrap gap-4">
            <Button
              variant="primary"
              onClick={() => router.push('/dashboard/profile')}
            >
              الملف الشخصي
            </Button>
            
            {user.is_teacher && (
              <Button
                variant="success"
                onClick={() => router.push('/dashboard/teacher')}
              >
                لوحة تحكم المعلم
              </Button>
            )}
            
            {user.is_student && (
              <Button
                variant="primary"
                className="bg-purple-600 hover:bg-purple-700 focus:ring-purple-300"
                onClick={() => router.push('/dashboard/student')}
              >
                لوحة تحكم الطالب
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}