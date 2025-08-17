import React from 'react';
import { Teacher } from '@/app/services/teachers/types';
import {formatTime} from '@/utils/dateUtils';

interface TeacherAvailabilityProps {
  teacher: Teacher;
}

/**
 * مكون عرض جداول التوفر للجلسات التعليمية عبر الإنترنت
 */
const TeacherAvailability: React.FC<TeacherAvailabilityProps> = ({ teacher }) => {
  // التحقق من وجود جداول توفر
  if (!teacher.availability_schedules || teacher.availability_schedules.length === 0) {
    return (
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 border-b pb-2">أوقات التوفر للجلسات عبر الإنترنت</h2>
        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2 text-yellow-600 dark:text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-yellow-800 dark:text-yellow-200">
            لم يقم المعلم بإضافة جداول توفر بعد. يمكنك التواصل معه للاستفسار عن الأوقات المناسبة.
          </p>
        </div>
      </section>
    );
  }

  // تحويل رقم اليوم إلى اسم اليوم
  const getDayName = (dayNumber: number): string => {
    // استخدام day_of_week_display إذا كان متاحًا
    return ['الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت', 'الأحد'][dayNumber];
  };



  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold mb-4 border-b pb-2">أوقات التوفر للجلسات عبر الإنترنت</h2>
      
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-4">
        <p className="mb-3">أوقات توفر المعلم لتقديم جلسات تعليمية عبر الإنترنت. يمكنك اختيار الوقت المناسب لك من الجدول أدناه.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {teacher.availability_schedules.map((schedule) => (
            <div 
              key={schedule.id} 
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-3">
                <h4 className="font-semibold text-lg text-gray-900 dark:text-gray-100">{schedule.title}</h4>
                <div className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs px-2 py-1 rounded-full">
                  متاح للحجز
                </div>
              </div>
              
              <div className="flex items-center mb-3 text-gray-700 dark:text-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="font-medium">
                  {schedule.day_of_week_display || getDayName(schedule.day_of_week)}
                </span>
              </div>
              
              <div className="flex items-center text-gray-700 dark:text-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>
                  {formatTime(schedule.start_time)} - {formatTime(schedule.end_time)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeacherAvailability;
