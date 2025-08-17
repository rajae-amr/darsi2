"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AuthLayout from '@/app/components/layouts/AuthLayout';

export default function LoginTypePage() {
  const router = useRouter();

  // توجيه المستخدم مباشرة إلى صفحة تسجيل دخول المعلم
  useEffect(() => {
    router.push('/auth/login/teacher');
  }, [router]);

  return (
    <AuthLayout>
      <div className="text-center mb-8 items-center justify-center mx-auto">
        <h2 className="my-6 text-3xl font-bold text-gray-900 dark:text-white text-center">
          جاري التوجيه...
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          جاري توجيهك إلى صفحة تسجيل الدخول
        </p>
      </div>
    </AuthLayout>
  );
}
