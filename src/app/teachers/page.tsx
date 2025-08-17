'use client';

import { useState, useEffect } from 'react';
import { TeacherService } from '../services/teachers/teacherService';
import { Teacher, TeacherFilters } from '../services/teachers/types';
import React from 'react';

// استيراد المكونات
import TeacherCard from './components/TeacherCard';
import TeacherFiltersComponent from './components/TeacherFilters';
import Pagination from './components/Pagination';

export default function TeachersPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<TeacherFilters>({});
  const [specializations, setSpecializations] = useState<{ value: string, label: string }[]>([]);
  const [teachingLevels, setTeachingLevels] = useState<string[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // جلب بيانات المعلمين عند تحميل الصفحة أو تغيير الفلاتر
  const fetchTeachers = async (currentFilters: TeacherFilters, query: string, page: number) => {
    try {
      setLoading(true);
      const teacherService = new TeacherService();
      // نجمع كل الفلاتر مع معلمات البحث والصفحة
      const allFilters: TeacherFilters = {
        ...currentFilters,
        search: query || undefined,
        page: page // إضافة معلمة الصفحة بعد تحديث نوع TeacherFilters
      };
      
      const response = await teacherService.getTeachers(allFilters);
      setTeachers(response.results);
      setTotalCount(response.count);
      setError(null);
    } catch (err) {
      setError('حدث خطأ أثناء جلب بيانات المعلمين');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // استخراج معلمات URL عند تحميل الصفحة
  useEffect(() => {
    // التحقق من أننا في بيئة المتصفح
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      
      // استخراج معلمات URL وتعيين الفلاتر
      const newFilters: TeacherFilters = {};
      
      // التخصص - معالجة كلا المعلمتين
      const specialization = urlParams.get('specialization') || urlParams.get('teacher_profile__specialization');
      if (specialization) newFilters.specialization = specialization;
      
      // المستوى التعليمي
      const teachingLevel = urlParams.get('teaching_level');
      if (teachingLevel) newFilters.teaching_level = teachingLevel;
      
      // التقييم
      const rating = urlParams.get('average_rating') || urlParams.get('rating');
      if (rating) newFilters.average_rating = rating;
      
      // الخبرة
      const experience = urlParams.get('experience');
      if (experience) newFilters.experience = experience;
      
      // سعر الخدمة
      const minPrice = urlParams.get('min_price');
      if (minPrice) newFilters.min_price = minPrice;
      
      const maxPrice = urlParams.get('max_price');
      if (maxPrice) newFilters.max_price = maxPrice;
      
      // دعم التوافق مع المعلمة القديمة hourly_rate
      const hourlyRate = urlParams.get('hourly_rate');
      if (hourlyRate && !minPrice && !maxPrice) {
        // تحويل نطاقات السعر القديمة إلى الجديدة
        if (hourlyRate === 'low') {
          newFilters.max_price = '50';
        } else if (hourlyRate === 'medium') {
          newFilters.min_price = '50';
          newFilters.max_price = '100';
        } else if (hourlyRate === 'high') {
          newFilters.min_price = '100';
        }
      }
      
      // البحث
      const search = urlParams.get('search');
      let newSearchQuery = '';
      if (search) {
        newSearchQuery = search;
        setSearchQuery(search);
      }
      
      // الصفحة
      const page = urlParams.get('page');
      let newPage = 1;
      if (page) {
        newPage = parseInt(page, 10);
        setCurrentPage(newPage);
      }
      
      // تعيين الفلاتر الجديدة
      console.log('معلمات URL المستخرجة:', newFilters);
      setFilters(newFilters);
      
      // جلب المعلمين مباشرة بعد استخراج معلمات URL
      fetchTeachers(newFilters, newSearchQuery, newPage);
    }
  }, []); // تنفيذ مرة واحدة عند تحميل الصفحة

  // جلب بيانات المعلمين عند تغيير الفلاتر
  useEffect(() => {
    // تجنب التحميل المزدوج عند التحميل الأولي
    if (Object.keys(filters).length > 0 || searchQuery || currentPage > 1) {
      fetchTeachers(filters, searchQuery, currentPage);
    }
  }, [filters, currentPage, searchQuery]);

  // جلب التخصصات والمستويات التعليمية عند تحميل الصفحة
  useEffect(() => {
    const fetchFiltersData = async () => {
      try {
        const teacherService = new TeacherService();
        const [specializationsData, teachingLevelsData] = await Promise.all([
          teacherService.getSpecializations(),
          teacherService.getTeachingLevels()
        ]);
        
        setSpecializations(specializationsData);
        setTeachingLevels(teachingLevelsData);
      } catch (err) {
        console.error('حدث خطأ أثناء جلب بيانات الفلاتر:', err);
      }
    };

    fetchFiltersData();
  }, []);

  // التعامل مع تغيير الفلاتر
  const handleFilterChange = (key: string, value: string | number | undefined) => {
    // إذا كانت القيمة undefined أو فارغة، قم بإزالة المفتاح من الفلاتر
    if (value === undefined || value === '') {
      const newFilters = { ...filters };
      delete newFilters[key as keyof TeacherFilters];
      setFilters(newFilters);
    } else {
      // إلا قم بتحديث الفلتر
      setFilters(prev => ({
        ...prev,
        [key]: value
      }));
    }
    
    // إعادة تعيين الصفحة الحالية عند تغيير الفلاتر
    setCurrentPage(1);
    
    // سجل الفلاتر الجديدة للتصحيح
    console.log(`تم تغيير الفلتر ${key} إلى ${value}`);
  };
  
  // دالة لإعادة ضبط جميع الفلاتر دفعة واحدة
  const handleResetAllFilters = () => {
    // إعادة ضبط جميع الفلاتر إلى قيم فارغة
    setFilters({});
    
    // إعادة ضبط البحث
    setSearchQuery('');
    
    // إعادة تعيين الصفحة الحالية
    setCurrentPage(1);
    
    // إعادة تحميل البيانات بشكل صريح بعد إعادة ضبط الفلاتر
    // استدعاء مباشر لدالة جلب البيانات بدون فلاتر
    fetchTeachers({}, '', 1);
    
    console.log('تم إعادة ضبط جميع الفلاتر وإعادة تحميل البيانات');
  };

  // التعامل مع تغيير الصفحة
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // التعامل مع البحث
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // إعادة تعيين الصفحة الحالية عند البحث
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">المعلمين</h1>
      
      {/* مكون الفلاتر */}
      <TeacherFiltersComponent
        filters={filters}
        specializations={specializations}
        teachingLevels={teachingLevels}
        onFilterChange={handleFilterChange}
        onSearch={handleSearch}
        onResetFilters={handleResetAllFilters}
      />
      
      {/* تم نقل عرض الفلاتر النشطة إلى مكون TeacherFilters */}
      
      {/* عرض المعلمين */}
      <div className="mt-6">
        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            <p className="mt-2">جاري تحميل البيانات...</p>
          </div>
        ) : error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        ) : teachers.length === 0 ? (
          <div className="text-center py-8">
            <p>لا يوجد معلمين متطابقين مع معايير البحث</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {teachers.map((teacher) => (
              <TeacherCard 
                key={teacher.id} 
                teacher={teacher} 
                searchQuery={searchQuery}
                activeFilters={{
                  specialization: filters.specialization,
                  teaching_level: filters.teaching_level,
                  average_rating: filters.average_rating,
                  experience: filters.experience,
                  min_price: filters.min_price,
                  max_price: filters.max_price
                }}
              />
            ))}
          </div>
        )}
        
        {/* مكون الترقيم */}
        <Pagination
          currentPage={currentPage}
          totalCount={totalCount}
          itemsPerPage={10} // تم تغييره من 10 إلى 2 حسب التعديلات السابقة
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
