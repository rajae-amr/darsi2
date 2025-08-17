'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Teacher } from '@/app/services/teachers/types';
import { TeacherService } from '@/app/services/teachers/teacherService';

// استيراد المكونات
import TeacherHeader from './components/TeacherHeader';
import TeacherBasicInfo from './components/TeacherBasicInfo';
import TeacherEducationalProfile from './components/TeacherEducationalProfile';
import TeacherContactInfo from './components/TeacherContactInfo';
import TeacherExperiance from './components/TeacherExperiance';
import TeacherBookingSection from './components/TeacherBookingSection';

/**
 * صفحة المدرس الفردي
 */
export default function TeacherPage() {
  const params = useParams();
  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // جلب بيانات المدرس عند تحميل الصفحة
  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const teacherId = params.id as string;
        const teacherIdNumber = parseInt(teacherId, 10);
        console.log(`جلب بيانات المدرس بالمعرف: ${teacherId} (${teacherIdNumber})`);
        
        const teacherService = new TeacherService();
        const teacherData = await teacherService.getTeacherById(teacherIdNumber);
        
        console.log('تم جلب بيانات المدرس:', teacherData);
        setTeacher(teacherData);
      } catch (err) {
        console.error('خطأ في جلب بيانات المدرس:', err);
        setError('حدث خطأ أثناء جلب بيانات المدرس. يرجى المحاولة مرة أخرى لاحقًا.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchTeacher();
  }, [params.id]);
  
  // عرض حالة التحميل
  if (loading) {
    return (
      <div className="container mx-auto p-6 rtl">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }
  
  // عرض رسالة الخطأ
  if (error) {
    return (
      <div className="container mx-auto p-6 rtl">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">خطأ!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      </div>
    );
  }
  
  // عرض رسالة في حالة عدم وجود بيانات المدرس
  if (!teacher) {
    return (
      <div className="container mx-auto p-6 rtl">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">تنبيه!</strong>
          <span className="block sm:inline"> لم يتم العثور على بيانات المدرس.</span>
        </div>
      </div>
    );
  }
  
  // عرض بيانات المدرس
  return (
    <div className="container mx-auto p-6 rtl">
      <TeacherHeader />
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <TeacherBasicInfo teacher={teacher} />
        
        <div className="p-6">
          <TeacherEducationalProfile teacher={teacher} />
          <TeacherExperiance teacher={teacher} />
          <TeacherContactInfo teacher={teacher} />
          <TeacherBookingSection teacher={teacher} />
        </div>
      </div>
    </div>
  );
}
