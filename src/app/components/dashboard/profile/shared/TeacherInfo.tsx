import React from 'react';
import { UserProfile, TeacherProfile as TeacherProfileType } from '@/app/services/auth/types';
import Button from '@/app/components/ui/Button';

interface TeacherInfoProps {
  user: UserProfile | null;
  isEditing: boolean;
  formData: Partial<UserProfile>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

/**
 * مكون معلومات المعلم
 */
const TeacherInfo: React.FC<TeacherInfoProps> = ({ user, isEditing, formData, handleChange }) => {
  // إذا لم يكن المستخدم معلماً، لا نعرض هذا المكون
  if (!user?.is_teacher) {
    return null;
  }

  // استخراج بيانات المعلم من formData أو من user
  const teacherData = formData.teacher_profile || user?.teacher_profile || {};
  
  // معالجة تغيير حقول المعلم
  const handleTeacherChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const updatedTeacherProfile = {
      ...formData.teacher_profile,
      [name]: value,
    };
    
    // استدعاء handleChange الأصلي مع تحديث كامل لـ teacher_profile
    const syntheticEvent = {
      target: {
        name: 'teacher_profile',
        value: updatedTeacherProfile,
      },
    } as unknown as React.ChangeEvent<HTMLInputElement>;
    
    handleChange(syntheticEvent);
  };

  return (
    <div className="mb-4 overflow-hidden rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
      <h2 className="mb-3 text-sm font-semibold text-gray-900 dark:text-gray-100">معلومات المعلم</h2>
      
      {isEditing ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-300">
              النطاق الفرعي
            </label>
            <div className="flex items-center">
              <input
                type="text"
                name="subdomain"
                value={teacherData.subdomain || ''}
                onChange={handleTeacherChange}
                className="w-full rounded-l-md border border-gray-200 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
              />
              <span className="rounded-r-md border border-l-0 border-gray-200 bg-gray-100 px-3 py-2 text-gray-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
                .teachspace.com
              </span>
            </div>
          </div>
          

          
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-300">
              التخصص
            </label>
            <input
              type="text"
              name="specialization"
              value={teacherData.specialization || ''}
              onChange={handleTeacherChange}
              className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
            />
          </div>
          
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-300">
              سنوات الخبرة
            </label>
            <input
              type="number"
              name="years_of_experience"
              value={teacherData.years_of_experience || ''}
              onChange={handleTeacherChange}
              min="0"
              className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
            />
          </div>
          
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-300">
              مستويات التدريس
            </label>
            <input
              type="text"
              name="teaching_levels"
              value={teacherData.teaching_levels || ''}
              onChange={handleTeacherChange}
              className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
              placeholder="ابتدائي، متوسط، ثانوي، جامعي"
            />
          </div>
          
          {/* تم حذف حقل اللغات */}
          


          <div className="col-span-2">
            <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-300">
              المؤهلات التعليمية
            </label>
            <textarea
              name="qualifications"
              value={teacherData.qualifications || ''}
              onChange={handleTeacherChange}
              rows={3}
              className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
              placeholder="الشهادات والمؤهلات العلمية"
            />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400">الموقع التعليمي</h3>
            <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
              {user?.teacher_profile?.subdomain ? (
                <a 
                  href={`https://${user.teacher_profile.subdomain}.teachspace.com`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {`${user.teacher_profile.subdomain}.teachspace.com`}
                </a>
              ) : '-'}
            </p>
          </div>
          

          
          <div>
            <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400">التخصص</h3>
            <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">{user?.teacher_profile?.specialization || '-'}</p>
          </div>
          
          <div>
            <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400">سنوات الخبرة</h3>
            <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
              {user?.teacher_profile?.years_of_experience ? `${user.teacher_profile.years_of_experience} سنوات` : '-'}
            </p>
          </div>
          
          <div>
            <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400">مستويات التدريس</h3>
            <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">{user?.teacher_profile?.teaching_levels || '-'}</p>
          </div>
          
          {/* تم حذف عرض حقل اللغات */}
          


          
          <div className="col-span-2">
            <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400">المؤهلات التعليمية</h3>
            <p className="mt-1 whitespace-pre-line text-sm text-gray-700 dark:text-gray-300">{user?.teacher_profile?.qualifications || '-'}</p>
          </div>
          

        </div>
      )}
      
      <div className="mt-4">
        <Button
          variant="success"
          onClick={() => window.location.href = '/dashboard/teacher'}
        >
          الانتقال إلى لوحة تحكم المعلم
        </Button>
      </div>
    </div>
  );
};

export default TeacherInfo;
