import React from 'react';
import Image from 'next/image';
import { UserProfile } from '@/app/services/auth/types';

interface ProfilePictureProps {
  user: UserProfile | null;
  // يمكن إضافة وظائف لتحميل الصورة في المستقبل
}

/**
 * مكون صورة الملف الشخصي
 */
const ProfilePicture: React.FC<ProfilePictureProps> = ({ user }) => {
  return (
    <div className="mb-4 flex flex-col items-center">
      <div className="relative mb-3 h-28 w-28">
        {user?.profile_image ? (
          <Image 
            src={user.profile_image} 
            alt="الصورة الشخصية"
            fill
            className="rounded-full border border-gray-200 object-cover dark:border-gray-700"
          />
        ) : (
          <div className="flex h-28 w-28 items-center justify-center rounded-full border border-gray-200 bg-gray-100 dark:border-gray-700 dark:bg-gray-800">
            <span className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
              {user?.first_name?.[0] || user?.email?.[0] || '?'}
            </span>
          </div>
        )}
      </div>
      
      <h2 className="text-center text-base font-semibold text-gray-900 dark:text-gray-100">
        {user?.first_name && user?.last_name 
          ? `${user.first_name} ${user.last_name}` 
          : user?.username || user?.email}
      </h2>
      
      <p className="mt-1 text-center text-xs text-gray-600 dark:text-gray-300">
        {user?.is_teacher ? 'معلم' : user?.is_student ? 'طالب' : 'مستخدم'}
        {user?.is_staff && ' (مدير)'}
      </p>
      
      {/* يمكن إضافة زر لتحميل صورة جديدة في المستقبل */}
      {/* 
      <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
        تغيير الصورة
      </button>
      */}
    </div>
  );
};

export default ProfilePicture;
