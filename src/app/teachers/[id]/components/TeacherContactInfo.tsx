import { Teacher } from '@/app/services/teachers/types';
import { MapPinIcon } from '@heroicons/react/24/outline';

interface TeacherContactInfoProps {
  teacher: Teacher;
}

/**
 * مكون معلومات الاتصال بالمدرس
 */
export default function TeacherContactInfo({ teacher }: TeacherContactInfoProps) {
  const hasContactInfo = teacher.teacher_profile?.subdomain || teacher.contact_info || teacher.phone_number;

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold mb-4 border-b pb-2">معلومات الاتصال</h2>
      
      {hasContactInfo ? (
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
         
          
          {teacher.contact_info && (
            <div className="space-y-3">
              
              
              {(teacher.contact_info.city || teacher.contact_info.country) && (
                <div className="flex items-center">
                  <MapPinIcon className="h-5 w-5 ml-2 text-gray-500" />
                  <div>
                    <h3 className="font-semibold">العنوان:</h3>
                    <p>
                      {teacher.contact_info.city && teacher.contact_info.country 
                        ? `${teacher.contact_info.city}، ${teacher.contact_info.country}`
                        : teacher.contact_info.city || teacher.contact_info.country}
                    </p>
                    {teacher.contact_info.address && (
                      <p className="text-gray-600">{teacher.contact_info.address}</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <p className="text-gray-500">لا توجد معلومات اتصال متاحة.</p>
      )}
      

    </section>
  );
}
