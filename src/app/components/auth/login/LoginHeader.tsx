'use client';

import React from 'react';
import Link from 'next/link';
import { Logo } from '@/app/components/layouts/Logo';

export const LoginHeader: React.FC = () => {
  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-md">
      <div className="flex justify-center">
        <Logo variant="full" size="lg" />
      </div>
      <h2 className="mt-6 text-center text-3xl font-bold text-gray-900 dark:text-white">
        تسجيل الدخول إلى حسابك
      </h2>
      <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
        أو{' '}
        <Link href="/auth/register" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">
          إنشاء حساب جديد
        </Link>
      </p>
    </div>
  );
};

export default LoginHeader;
