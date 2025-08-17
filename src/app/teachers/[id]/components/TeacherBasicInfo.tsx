import Image from 'next/image';
import { Teacher } from '@/app/services/teachers/types';
import { getSpecializationText } from '@/utils/constants';

interface TeacherBasicInfoProps {
  teacher: Teacher;
}

/**
 * مكون معلومات المدرس الأساسية
 */
export default function TeacherBasicInfo({ teacher }: TeacherBasicInfoProps) {
  return (
    <div className="bg-blue-50 dark:bg-blue-900 p-6 rounded-2xl shadow-md flex flex-col md:flex-row items-center gap-6">
      {/* صورة المدرس */}
      <div className="relative w-32 h-32">
        {teacher.profile_image ? (
          <Image
            src={teacher.profile_image}
            alt={`صورة ${teacher.display_name}`}
            className="rounded-full object-cover"
            fill
          />
        ) : (
          <div className="w-32 h-32 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 text-4xl">
            {teacher.display_name.charAt(0)}
          </div>
        )}
      </div>

      {/* معلومات المدرس */}
      <div className="flex-1 text-center md:text-right">
        <div className="flex flex-wrap items-center gap-2 justify-center md:justify-start">
          <h1 className="text-2xl font-bold text-blue-900 dark:text-white">
            {teacher.display_name}
          </h1>
          
          {/* علامات المدرس المميز والموثق */}
          {teacher.teacher_profile?.is_featured && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              مدرس مميز
            </span>
          )}
          {teacher.teacher_profile?.is_verified && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              موثق
            </span>
          )}
        </div>

        {teacher.teacher_profile?.specialization && (
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-2">
            {getSpecializationText(teacher.teacher_profile.specialization)}
          </p>
        )}

        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          {teacher.bio || 'لا يوجد وصف متاح للمدرس.'}
        </p>

        {/* الإحصائيات */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm text-gray-800 dark:text-gray-200 mt-4">
          <div className="bg-white dark:bg-blue-800 rounded-xl shadow p-3 text-center">
            <p className="font-semibold">معدل التقييم</p>
            <p>{teacher.teacher_profile?.average_rating ?? '—'}</p>
          </div>
          <div className="bg-white dark:bg-blue-800 rounded-xl shadow p-3 text-center">
            <p className="font-semibold">عدد التقييمات</p>
            <p>{teacher.teacher_profile?.rating_count ?? '—'}</p>
          </div>
          <div className="bg-white dark:bg-blue-800 rounded-xl shadow p-3 text-center">
            <p className="font-semibold">جودة التدريس</p>
            <p>{teacher.teacher_profile?.teaching_quality_avg ?? '—'}</p>
          </div>
          <div className="bg-white dark:bg-blue-800 rounded-xl shadow p-3 text-center">
            <p className="font-semibold">التواصل</p>
            <p>{teacher.teacher_profile?.communication_avg ?? '—'}</p>
          </div>
          <div className="bg-white dark:bg-blue-800 rounded-xl shadow p-3 text-center">
            <p className="font-semibold">الالتزام بالمواعيد</p>
            <p>{teacher.teacher_profile?.punctuality_avg ?? '—'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
