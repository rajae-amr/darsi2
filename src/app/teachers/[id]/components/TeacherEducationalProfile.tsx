import { Teacher } from '@/app/services/teachers/types';
import { getSpecializationText, getTeachingLevelText } from '@/utils/constants';

interface TeacherEducationalProfileProps {
  teacher: Teacher;
}

/**
 * مكون الملف التعليمي للمدرس
 */
export default function TeacherEducationalProfile({ teacher }: TeacherEducationalProfileProps) {
  // التحقق من وجود بيانات الملف التعليمي
  const hasEducationalProfile = teacher.teacher_profile && (
    teacher.teacher_profile.specialization ||
    teacher.teacher_profile.teaching_levels ||
    teacher.teacher_profile.years_of_experience ||
    teacher.teacher_profile.qualifications
  );

  if (!hasEducationalProfile) {
    return (
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 border-b pb-2">الملف التعليمي</h2>
        <p className="text-gray-600 dark:text-gray-400">لا توجد معلومات تعليمية متاحة.</p>
      </section>
    );
  }

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold mb-4 border-b pb-2">الملف التعليمي</h2>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        {teacher.teacher_profile?.specialization && (
          <div className="mb-4">
            <h3 className="font-semibold text-lg">التخصص:</h3>
            <p>{getSpecializationText(teacher.teacher_profile.specialization)}</p>
          </div>
        )}
        
        {teacher.teacher_profile?.teaching_levels && (
          <div className="mb-4">
            <h3 className="font-semibold text-lg">المستويات التعليمية:</h3>
            <p>{getTeachingLevelText(teacher.teacher_profile.teaching_levels)}</p>
          </div>
        )}
        
        {teacher.teacher_profile?.years_of_experience && (
          <div className="mb-4">
            <h3 className="font-semibold text-lg">سنوات الخبرة:</h3>
            <p>{teacher.teacher_profile.years_of_experience}</p>
          </div>
        )}
        
        {teacher.teacher_profile?.qualifications && (
          <div className="mb-4">
            <h3 className="font-semibold text-lg">المؤهلات:</h3>
            <p>{teacher.teacher_profile.qualifications}</p>
          </div>
        )}
      </div>
    </section>
  );
}
