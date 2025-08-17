import React from 'react';
import { Teacher } from '@/app/services/teachers/types';
import Button from '@/app/components/ui/Button';

interface TeacherBookingSectionProps {
  teacher: Teacher;
}

export default function TeacherBookingSection({ teacher }: TeacherBookingSectionProps) {
  return (
    <div className="mt-8 bg-blue-50 dark:bg-gray-700 rounded-lg p-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            حجز جلسة تعليمية مع {teacher.display_name}
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            تواصل مع إدارة المنصة عبر الواتساب أو التيليجرام لحجز جلسة تعليمية مع هذا المعلم.
            سيقوم فريق الإدارة بتنسيق الموعد المناسب وإعداد كافة التفاصيل.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
        
            <Button
                    variant="primary"
                    size="sm"
                    className="w-full"
                    onClick={() => {
                      const username = teacher.teacher_profile?.telegram_username 
                        ? teacher.teacher_profile.telegram_username 
                        : "M_Y_H_A"; // الحساب الافتراضي
                      window.open("https://t.me/" + username, "_blank");
                    }}
                  >
                    تواصل عبر التيليجرام
            </Button>
        
            <Button
            variant="success"
            size="sm"
            className="w-full"
            onClick={() => {
              const whatsappNumber = teacher.teacher_profile?.whatsapp_number
                ? teacher.teacher_profile.whatsapp_number
                : "971521565010"; // الرقم الافتراضي
              
              window.open(
                "https://wa.me/" +
                  whatsappNumber +
                  "?text=" +
                  encodeURIComponent("مرحباً، أود الاستفسار عن دروسك."),
                "_blank"
              );
            }}
          >
            تواصل عبر الواتساب
            </Button>
              
          <Button 
            variant="warning" 
            size="sm"
            className="flex items-center gap-2"
            onClick={() => window.open('/contact', '_self')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            صفحة الاتصال
          </Button>
        </div>
      </div>
    </div>
  );
}
