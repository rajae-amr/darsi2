'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardBody } from '@/app/components/ui/Card';
import { useAuth } from '@/app/hooks/auth';
import AuthLayout from '@/app/components/layouts/AuthLayout';
import TeacherLoginForm from './TeacherLoginForm';

export default function TeacherLoginPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  
  // إذا كان المستخدم مسجل دخوله بالفعل، قم بإعادة توجيهه إلى لوحة التحكم
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard/teacher');
    }
  }, [isAuthenticated, router]);

  return (
    <AuthLayout>
      {/* رأس صفحة تسجيل الدخول */}
      <div className="text-center mb-8">
        <h2 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
          تسجيل دخول المعلم
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          أدخل بيانات حسابك للوصول إلى منصة التدريس
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card>
          <CardBody>
            {/* نموذج تسجيل دخول المعلم */}
            <TeacherLoginForm />
            
            <div className="mt-6">

              <div className="text-center mt-2">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  ليس لديك حساب؟{' '}
                  <a href="/teacher-application" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">
                    تقدم بطلب انضمام
                  </a>
                </p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </AuthLayout>
  );
}
