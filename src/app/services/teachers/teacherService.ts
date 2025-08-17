import { Teacher, TeacherFilters, PaginatedResponse, Service } from './types';
import { API_BASE_URL } from '@/app/config/api';
import { SPECIALIZATION_MAP } from '../../../utils/constants';

// ثوابت API
const TEACHERS_URL = `${API_BASE_URL}/auth/teachers`; // المسار الصحيح وفقاً لهيكل الباك اند
const TEACHER_FEATURED_URL = `${TEACHERS_URL}/featured`;

/**
 * خدمة التعامل مع بيانات المعلمين
 */
export class TeacherService {
  /**
   * جلب قائمة المعلمين مع إمكانية التصفية
   * @param filters معايير التصفية
   * @returns قائمة المعلمين
   */
  async getTeachers(filters?: TeacherFilters): Promise<PaginatedResponse<Teacher>> {
    try {
      // بناء معلمات الاستعلام من الفلاتر
      let queryParams = '';
      if (filters) {
        const params = new URLSearchParams();
        
        // استخدام أسماء المعلمات المناسبة للباك اند
        // الباك اند يستخدم الفلترة اليدوية في get_queryset ويتوقع هذه المعلمات
        if (filters.specialization) params.append('teacher_profile__specialization', filters.specialization);
        if (filters.teaching_level) params.append('teacher_profile__teaching_levels', filters.teaching_level);
        if (filters.search) params.append('search', filters.search);
        if (filters.page) params.append('page', filters.page.toString());
        
        // إضافة دعم الفلاتر الجديدة
        if (filters.average_rating) params.append('average_rating', filters.average_rating);
        if (filters.experience) {
          // تحويل مستوى الخبرة إلى نطاق سنوات
          const expRanges: Record<string, [number, number]> = {
            'beginner': [0, 2],
            'intermediate': [2, 5],
            'expert': [5, 100]
          };
          
          if (expRanges[filters.experience]) {
            const [min, max] = expRanges[filters.experience];
            params.append('teacher_profile__years_of_experience__gte', min.toString());
            params.append('teacher_profile__years_of_experience__lt', max.toString());
          }
        }
        
        // فلتر السعر باستخدام الحد الأدنى والأقصى
        if (filters.min_price) {
          params.append('min_price', filters.min_price);
        }
        
        if (filters.max_price) {
          params.append('max_price', filters.max_price);
        }
        
        queryParams = `?${params.toString()}`;
        
        // سجلات تصحيح لعرض الفلاتر والاستعلام
        console.log('الفلاتر المطبقة:', filters);
        console.log('رابط الاستعلام:', `${TEACHERS_URL}${queryParams}`);
      }
      
      const response = await fetch(`${TEACHERS_URL}${queryParams}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      
      if (!response.ok) {
        throw new Error(`فشل في جلب بيانات المعلمين: ${response.status}`);
      }
      
      const data = await response.json();
      // عرض البيانات المستلمة من الباك اند
      console.log('البيانات المستلمة:', data);
      return data;
    } catch (error) {
      console.error('خطأ في جلب بيانات المعلمين:', error);
      throw error;
    }
  }

  
  /**
   * جلب بيانات معلم محدد
   * @param teacherId معرف المعلم
   * @returns بيانات المعلم
   */
  async getTeacherById(teacherId: number): Promise<Teacher | null> {
    try {
      console.log(`جلب بيانات المعلم بالمعرف: ${teacherId}`);
      const response = await fetch(`${TEACHERS_URL}/${teacherId}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      
      if (!response.ok) {
        if (response.status === 404) {
          console.error(`المعلم بالمعرف ${teacherId} غير موجود`);
          return null;
        }
        throw new Error(`فشل في جلب بيانات المعلم: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('بيانات المعلم المستلمة:', data);
      
      // التحقق من وجود الخدمات وجداول التوفر
      if (!data.services) {
        console.log('لم يتم العثور على خدمات للمعلم، سيتم تعيينها كمصفوفة فارغة');
        data.services = [];
      }
      
      if (!data.availability_schedules) {
        console.log('لم يتم العثور على جداول توفر للمعلم، سيتم تعيينها كمصفوفة فارغة');
        data.availability_schedules = [];
      }
      
      return data;
    } catch (error) {
      console.error(`خطأ في جلب بيانات المعلم بالمعرف ${teacherId}:`, error);
      return null;
    }
  }
  
  /**
   * جلب الخدمات المتاحة للمعلم
   * @param teacherId معرف المعلم
   * @returns قائمة الخدمات المتاحة
   */
  async getTeacherServices(teacherId: number): Promise<Service[]> {
    try {
      console.log(`جلب خدمات المعلم بالمعرف: ${teacherId}`);
      const response = await fetch(`${API_BASE_URL}/bookings/services/?teacher=${teacherId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      
      if (!response.ok) {
        throw new Error(`فشل في جلب خدمات المعلم: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('خدمات المعلم المستلمة:', data);
      return data.results || data;
    } catch (error) {
      console.error(`خطأ في جلب خدمات المعلم بالمعرف ${teacherId}:`, error);
      return [];
    }
  }
  
  /**
   * جلب التخصصات المتاحة
   * @returns قائمة التخصصات مع الأسماء العربية
   */
  async getSpecializations(): Promise<{ value: string, label: string }[]> {
    try {
      const response = await fetch(`${TEACHERS_URL}/specializations`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      
      if (!response.ok) {
        throw new Error(`فشل في جلب التخصصات: ${response.status}`);
      }
      
      // الحصول على التخصصات من الباك إند
      const specializations = await response.json();
      
      // تحويل التخصصات إلى كائنات مع القيمة والتسمية العربية
      // استخدام قاموس التخصصات من ملف الثوابت المشتركة
      
      return specializations.map((spec: string) => ({
        value: spec,
        label: SPECIALIZATION_MAP[spec.toLowerCase()] || spec // استخدام القيمة نفسها إذا لم يتم العثور على ترجمة
      }));
    } catch (error) {
      console.error('خطأ في جلب التخصصات:', error);
      return [];
    }
  }
  
  /**
   * جلب المستويات التعليمية المتاحة
   * @returns قائمة المستويات التعليمية
   */
  async getTeachingLevels(): Promise<string[]> {
    try {
      const response = await fetch(`${TEACHERS_URL}/teaching-levels`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      
      if (!response.ok) {
        throw new Error(`فشل في جلب المستويات التعليمية: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('خطأ في جلب المستويات التعليمية:', error);
      return [];
    }
  }

  /**
   * جلب المعلمين المميزين للعرض في الصفحة الرئيسية
   * @param limit عدد المعلمين المراد جلبهم (اختياري، الافتراضي 4)
   * @returns قائمة المعلمين المميزين
   */
  async getFeaturedTeachers(limit: number = 4): Promise<Teacher[]> {
    try {
      console.log(`جلب المعلمين المميزين (العدد: ${limit})`);
      // يمكن استخدام معلمة featured=true أو أي معلمة أخرى يدعمها الباك اند
      const response = await fetch(`${TEACHER_FEATURED_URL}?limit=${limit}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      
      if (!response.ok) {
        throw new Error(`فشل في جلب المعلمين المميزين: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('المعلمون المميزون المستلمون:', data);
      
      // إذا كانت البيانات مُصفحة (paginated)، استخرج النتائج
      return data.results || data;
    } catch (error) {
      console.error('خطأ في جلب المعلمين المميزين:', error);
      throw error;
    }
  }
}
