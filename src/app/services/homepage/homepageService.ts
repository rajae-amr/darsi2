import { Teacher } from '../teachers/types';

// تعريف أنواع البيانات المستخدمة في الصفحة الرئيسية
export interface HomePageData {
  featured_teachers: Teacher[];
  specializations: string[];
  teaching_levels: string[];
  stats: {
    teachers_count: number;
    completed_sessions: number;
    students_count: number;
    average_rating: number;
  };
  popular_services: {
    id: number;
    name: string;
    description: string;
    duration: number;
    price: number;
    is_active: boolean;
    teacher: {
      id: number;
      display_name: string;
      profile_image: string | null;
    };
  }[];
  testimonials: {
    id: number;
    name: string;
    role: string;
    content: string;
    image: string | null;
    rating: number;
    created_at: string;
    user: {
      id: number;
      display_name: string;
    } | null;
  }[];
}

// ثوابت API
import { API_BASE_URL } from '@/app/config/api';
const HOMEPAGE_URL = `${API_BASE_URL}/homepage/`;

/**
 * خدمة الصفحة الرئيسية
 * تقوم بجلب جميع بيانات الصفحة الرئيسية من نهاية API واحدة
 */
export class HomePageService {
  /**
   * جلب جميع بيانات الصفحة الرئيسية
   * @returns بيانات الصفحة الرئيسية
   */
  async getHomePageData(): Promise<HomePageData> {
    try {
      console.log('جلب بيانات الصفحة الرئيسية');
      const response = await fetch(HOMEPAGE_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        // لا نحتاج إلى credentials لأن نهاية API الصفحة الرئيسية مفتوحة للجميع
      });
      
      if (!response.ok) {
        throw new Error(`فشل في جلب بيانات الصفحة الرئيسية: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('بيانات الصفحة الرئيسية المستلمة:', data);
      return data;
    } catch (error) {
      console.error('خطأ في جلب بيانات الصفحة الرئيسية:', error);
      // إرجاع بيانات فارغة في حالة الخطأ
      return {
        featured_teachers: [],
        specializations: [],
        teaching_levels: [],
        stats: {
          teachers_count: 0,
          completed_sessions: 0,
          students_count: 0,
          average_rating: 0
        },
        popular_services: [],
        testimonials: []
      };
    }
  }
}
