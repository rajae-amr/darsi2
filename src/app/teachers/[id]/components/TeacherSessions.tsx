import { Teacher, Service } from '@/app/services/teachers/types';
import Button from '@/app/components/ui/Button';
import { useRouter } from 'next/navigation';
import { formatPrice } from '@/utils/constants';
import { formatDuration } from '@/utils/dateUtils';

interface TeacherSessionsProps {
  teacher: Teacher;
}

/**
 * مكون الجلسات التعليمية عبر الإنترنت المتاحة للمعلم
 */
export default function TeacherSessions({ teacher }: TeacherSessionsProps) {
  // استخدام مكتبة التنقل
  const router = useRouter();
  
  // التحقق من وجود خدمات للمعلم
  const hasServices = teacher.services && teacher.services.length > 0;

  // عرض رسالة في حالة عدم وجود خدمات
  if (!hasServices) {
    return (
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 border-b pb-2">الجلسات التعليمية عبر الإنترنت</h2>
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-4">
          <p>لا توجد جلسات تعليمية متاحة حاليًا لهذا المعلم.</p>
        </div>
      </section>
    );
  }



  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold mb-4 border-b pb-2">الجلسات التعليمية عبر الإنترنت</h2>
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-4">
        <p className="mb-2">يقدم المعلم جلسات تعليمية عبر الإنترنت باستخدام منصة TeachSpace مع دعم كامل للفيديو والصوت.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {teacher.services?.map((service: Service) => (
            <div 
              key={service.id} 
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
            >
              <h3 className="font-bold text-lg mb-2">{service.name}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-2 h-20 overflow-y-auto">{service.description}</p>
              <div className="flex items-center mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-gray-700 dark:text-gray-300">{formatDuration(service.duration)}</span>
              </div>
              <p className="font-bold text-lg text-blue-600 mb-3">
                {formatPrice(service.price)}
              </p>
              <Button 
                variant="primary" 
                size="md" 
                fullWidth
                icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>}
                onClick={() => router.push(`/dashboard/student/bookings/new?service_id=${service.id}&teacher_id=${teacher.id}`)}
              >
                احجز جلسة
              </Button>
            </div>
          ))}

          {/* عرض رسالة في حالة وجود عدد قليل من الخدمات */}
          {teacher.services && teacher.services.length < 3 && (
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 flex items-center justify-center">
              <div className="text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-gray-600 dark:text-gray-300">
                  سيتم إضافة المزيد من الجلسات قريبًا
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
