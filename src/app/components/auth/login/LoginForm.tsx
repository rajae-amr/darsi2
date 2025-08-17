'use client';

import React from 'react';
import Link from 'next/link';
import Button from '@/app/components/ui/Button';
import { LoginCredentials } from '@/app/services/auth';

interface LoginFormProps {
  formData: LoginCredentials;
  errors: Record<string, string>;
  isLoading: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  formData,
  errors,
  isLoading,
  onChange,
  onSubmit
}) => {
  return (
    <form className="space-y-6" onSubmit={onSubmit}>
      {/* البريد الإلكتروني */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          البريد الإلكتروني
        </label>
        <div className="mt-1">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className={`appearance-none block w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white`}
            dir="ltr"
            value={formData.email}
            onChange={onChange}
            disabled={isLoading}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>
      </div>

      {/* كلمة المرور */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          كلمة المرور
        </label>
        <div className="mt-1">
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className={`appearance-none block w-full px-3 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white`}
            dir="ltr"
            value={formData.password}
            onChange={onChange}
            disabled={isLoading}
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password}</p>
          )}
        </div>
      </div>

      {/* خيارات إضافية */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember"
            type="checkbox"
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            checked={formData.remember}
            onChange={onChange}
            disabled={isLoading}
          />
          <label htmlFor="remember-me" className="mr-2 rtl:ml-2 rtl:mr-0 block text-sm text-gray-900 dark:text-gray-300">
            تذكرني
          </label>
        </div>

        <div className="text-sm">
          <Link href="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">
            نسيت كلمة المرور؟
          </Link>
        </div>
      </div>

      {/* زر تسجيل الدخول */}
      <div>
        <Button
          type="submit"
          variant="primary"
          fullWidth={true}
          size="lg"
          disabled={isLoading}
          loading={isLoading}
        >
          {isLoading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
