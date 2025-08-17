import React from 'react';
import { UserProfile } from '@/app/services/auth/types';

interface BasicInfoProps {
  user: UserProfile | null;
  isEditing: boolean;
  formData: Partial<UserProfile>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * مكون المعلومات الأساسية للمستخدم
 */
const BasicInfo: React.FC<BasicInfoProps> = ({ user, isEditing, formData, handleChange }) => {
  return (
    <div className="mb-4 overflow-hidden rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
      <h2 className="mb-3 text-sm font-semibold text-gray-900 dark:text-gray-100">المعلومات الأساسية</h2>
      
      {isEditing ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-300">
              الاسم الأول
            </label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name || ''}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
            />
          </div>
          
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-300">
              الاسم الأخير
            </label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name || ''}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
            />
          </div>
          
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-300">
              البريد الإلكتروني
            </label>
            <input
              type="email"
              name="email"
              value={formData.email || ''}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-200 bg-gray-100 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
              disabled
            />
            <p className="mt-1 text-[11px] text-gray-500">لا يمكن تغيير البريد الإلكتروني</p>
          </div>
          
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-300">
              اسم المستخدم
            </label>
            <input
              type="text"
              name="username"
              value={formData.username || ''}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
            />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400">الاسم الأول</h3>
            <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">{user?.first_name || '-'}</p>
          </div>
          
          <div>
            <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400">الاسم الأخير</h3>
            <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">{user?.last_name || '-'}</p>
          </div>
          
          <div>
            <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400">البريد الإلكتروني</h3>
            <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">{user?.email || '-'}</p>
          </div>
          
          <div>
            <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400">اسم المستخدم</h3>
            <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">{user?.username || '-'}</p>
          </div>
          
          <div>
            <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400">نوع الحساب</h3>
            <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
              {user?.is_teacher ? 'معلم' : user?.is_student ? 'طالب' : 'مستخدم عادي'}
              {user?.is_staff && ' (مدير)'}
            </p>
          </div>
          
          <div>
            <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400">تاريخ الانضمام</h3>
            <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
              {user?.date_joined ? new Date(user.date_joined).toLocaleDateString('ar-AE', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              }) : '-'}
            </p>
          </div>
          
          <div>
            <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400">آخر تسجيل دخول</h3>
            <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
              {user?.last_login ? new Date(user.last_login).toLocaleString('ar-AE', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              }) : '-'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BasicInfo;
