import { Teacher } from '@/app/services/teachers/types';
import Button from '@/app/components/ui/Button';
import { useState } from 'react';

interface BookingButtonProps {
  teacher: Teacher;
}

/**
 * مكون زر الحجز الرئيسي لجلسات التعليم عبر الإنترنت
 */
export default function BookingButton({ teacher }: BookingButtonProps) {
  const [loading, setLoading] = useState(false);
  
  // التحقق من وجود خدمات للمعلم
  const hasServices = teacher.services && teacher.services.length > 0;
  
  const handleBooking = () => {
    setLoading(true);
    
    // محاكاة عملية التحقق من توفر المواعيد
    setTimeout(() => {
      setLoading(false);
      
      // عرض نافذة اختيار نوع الجلسة
      const sessionOptions = [
        'جلسة خاصة فردية', 
        'جلسة مراجعة', 
        'جلسة استشارة'
      ];
      
      const sessionType = window.prompt(
        `اختر نوع الجلسة مع المعلم ${teacher.display_name}:\n\n` + 
        sessionOptions.map((option, index) => `${index + 1}. ${option}`).join('\n')
      );
      
      if (sessionType) {
        const selectedOption = parseInt(sessionType);
        if (!isNaN(selectedOption) && selectedOption >= 1 && selectedOption <= sessionOptions.length) {
          alert(`سيتم توجيهك لحجز ${sessionOptions[selectedOption - 1]} مع المعلم ${teacher.display_name} عبر منصة TeachSpace للتعليم عن بعد`);
        } else {
          alert('الرجاء اختيار رقم صحيح من القائمة');
        }
      }
    }, 1000);
  };

  return (
    <div className="mt-8 text-center p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg">
      <h3 className="text-xl font-bold mb-3">احجز جلستك التعليمية الآن</h3>
      <p className="mb-4 text-gray-600 dark:text-gray-300">استمتع بجلسات تعليمية عبر الإنترنت مع دعم كامل للفيديو والصوت ومشاركة الموارد التعليمية</p>
      
      <Button 
        variant="primary"
        size="lg"
        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>}
        iconPosition="left"
        loading={loading}
        disabled={!hasServices || loading}
        onClick={handleBooking}
      >
        حجز جلسة تعليمية عبر الإنترنت
      </Button>
      
      {!hasServices && (
        <p className="mt-3 text-yellow-600 dark:text-yellow-400 text-sm">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          لا تتوفر جلسات حاليًا لهذا المعلم
        </p>
      )}
    </div>
  );
}
