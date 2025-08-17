import axios from 'axios';
import { API_BASE_URL } from '@/app/config/api';
import { getAccessToken } from '@/app/services/auth/tokenService';

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  image: string | null;
  image_url: string | null; // تعديل النوع ليكون string | null بدلاً من string | undefined
  rating: number;
  is_approved?: boolean;
  created_at?: string;
}

export interface TestimonialCreateRequest {
  name: string; // تغيير الاسم من اختياري إلى مطلوب
  role: string;
  content: string;
  image?: File;
  rating: number;
}

/**
 * خدمة للتعامل مع API الشهادات
 */
const testimonialService = {
  /**
   * جلب قائمة الشهادات المعتمدة
   */
  async getTestimonials(): Promise<Testimonial[]> {
    try {
      // لا نحتاج لرمز المصادقة للحصول على قائمة الشهادات المعتمدة
      console.log('جاري جلب الشهادات من:', `${API_BASE_URL}/testimonials/`);
      const response = await axios.get(`${API_BASE_URL}/testimonials/`);
      console.log('تم جلب الشهادات بنجاح:', response.data);
      
      // التحقق من بنية البيانات المستلمة
      if (response.data && response.data.results && Array.isArray(response.data.results)) {
        // إذا كانت البيانات تحتوي على حقل results
        console.log('استخراج النتائج من البيانات المستلمة');
        return response.data.results;
      } else {
        // إذا كانت البيانات مصفوفة مباشرة
        return Array.isArray(response.data) ? response.data : [];
      }
    } catch (error) {
      console.error('خطأ في جلب الشهادات:', error);
      return [];
    }
  },

  /**
   * إنشاء شهادة جديدة
   */
  async createTestimonial(testimonial: TestimonialCreateRequest): Promise<Testimonial | null> {
    try {
      // الحصول على رمز المصادقة
      const accessToken = getAccessToken();
      
      if (!accessToken) {
        console.error('لا يمكن إنشاء شهادة بدون تسجيل الدخول');
        return null;
      }
      
      // إذا كانت هناك صورة، نستخدم FormData
      if (testimonial.image) {
        const formData = new FormData();
        formData.append('name', testimonial.name); // الاسم مطلوب الآن
        formData.append('role', testimonial.role);
        formData.append('content', testimonial.content);
        formData.append('rating', testimonial.rating.toString());
        formData.append('image', testimonial.image);

        console.log('إرسال بيانات الشهادة مع صورة:', {
          name: testimonial.name,
          role: testimonial.role,
          content: testimonial.content.substring(0, 20) + '...',
          rating: testimonial.rating,
          hasImage: !!testimonial.image
        });

        const response = await axios.post(`${API_BASE_URL}/testimonials/create/`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${accessToken}`
          },
        });
        return response.data;
      } else {
        // إذا لم تكن هناك صورة، نرسل JSON عادي
        console.log('إرسال بيانات الشهادة بدون صورة:', {
          name: testimonial.name,
          role: testimonial.role,
          content: testimonial.content.substring(0, 20) + '...',
          rating: testimonial.rating
        });
        
        const response = await axios.post(`${API_BASE_URL}/testimonials/create/`, testimonial, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          },
        });
        return response.data;
      }
    } catch (error) {
      console.error('خطأ في إنشاء الشهادة:', error);
      return null;
    }
  },
};

export default testimonialService;
