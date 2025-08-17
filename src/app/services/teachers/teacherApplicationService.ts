import { API_BASE_URL } from '@/app/config/api';
import { 
  TeacherApplication, 
  TeacherApplicationSubmit, 
  ApplicationStatusResponse,
  ApplicationCheckResponse,
  ApplicationTrackingResponse
} from './teacherApplicationTypes';

// ثوابت API
const TEACHER_APPLICATION_URL = `${API_BASE_URL}/auth/teacher-application`;

/**
 * خدمة التعامل مع طلبات انضمام المعلمين
 */
export class TeacherApplicationService {
  /**
   * التحقق من إمكانية تقديم طلب انضمام
   * @param email البريد الإلكتروني للتحقق
   * @returns استجابة التحقق
   */
  async checkApplicationEligibility(email?: string): Promise<ApplicationCheckResponse> {
    try {
      // إضافة معلمة البريد الإلكتروني إذا تم توفيرها
      const url = email 
        ? `${TEACHER_APPLICATION_URL}/check/?email=${encodeURIComponent(email)}` 
        : `${TEACHER_APPLICATION_URL}/check/`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        // لم يعد مطلوبًا إرسال معلومات الجلسة
        // credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`فشل في التحقق من إمكانية تقديم الطلب: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('خطأ في التحقق من إمكانية تقديم الطلب:', error);
      throw error;
    }
  }

  /**
   * تتبع حالة طلب الانضمام باستخدام الرقم المميز
   * @param trackingId الرقم المميز للطلب
   * @returns استجابة حالة الطلب
   */
  static async trackApplication(trackingId: string): Promise<ApplicationTrackingResponse> {
    try {
      const response = await fetch(`${TEACHER_APPLICATION_URL}/track/${trackingId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        // إذا كان الرد 404، فهذا يعني أن الطلب غير موجود
        if (response.status === 404) {
          return {
            found: false,
            message: 'لم يتم العثور على طلب بهذا الرقم المميز'
          };
        }
        throw new Error(`فشل في تتبع حالة الطلب: ${response.status}`);
      }

      const data = await response.json();
      return {
        found: true,
        ...data
      };
    } catch (error) {
      console.error('خطأ في تتبع حالة الطلب:', error);
      throw error;
    }
  }

  /**
   * إرسال طلب انضمام جديد
   * @param application بيانات طلب الانضمام
   * @returns استجابة الإرسال
   */
  async submitApplication(application: TeacherApplicationSubmit): Promise<TeacherApplication> {
    try {
      // إنشاء FormData لإرسال الملفات
      const formData = new FormData();
      
      // إضافة بيانات الحساب
      formData.append('first_name', application.first_name);
      formData.append('last_name', application.last_name);
      formData.append('email', application.email);
      formData.append('phone_number', application.phone_number); // تحويل phone إلى phone_number
      formData.append('whatsapp_number', application.whatsapp_number); // تحويل whatsapp إلى whatsapp_number
      formData.append('telegram_username', application.telegram_username); // تحويل telegram إلى telegram_username
      
      // إضافة البيانات النصية للطلب
      formData.append('qualifications', application.qualifications);
      formData.append('experience', application.experience);
      formData.append('specialization', application.specialization);
      formData.append('teaching_levels', application.teaching_levels);
      formData.append('motivation', application.motivation);
      
      // إضافة سنوات الخبرة
      formData.append('years_of_experience', (application.years_of_experience || 0).toString());
      
      // إضافة الخبرات المفصلة إذا وجدت
      if (application.experiences && application.experiences.length > 0) {
        // تحويل الخبرات المفصلة إلى نص منسق للتوافق مع النظام الحالي
        const detailedExperience = application.experiences.map(exp => {
          const years = exp.years ? `\n- عدد سنوات الخبرة: ${exp.years} سنة` : '';
          const institution = exp.institution ? `\n- المؤسسة: ${exp.institution}` : '';
          const period = exp.start_date ? 
            `\n- الفترة: ${exp.start_date} - ${exp.is_current ? 'حتى الآن' : exp.end_date || ''}` : '';
          
          return `## ${exp.title}${institution}${years}${period}\n${exp.description}\n`;
        }).join('\n---\n');
        
        // إذا كان هناك خبرات مفصلة، نستخدمها بدلاً من حقل الخبرة النصي
        if (detailedExperience) {
          formData.set('experience', detailedExperience);
        }
        
        // إضافة الخبرات كملف JSON للاستخدام المستقبلي
        const experiencesBlob = new Blob([JSON.stringify(application.experiences)], { type: 'application/json' });
        formData.append('experiences_json', experiencesBlob, 'experiences.json');
      }
      
      // إضافة الملفات إذا وجدت
      if (application.cv_file) {
        formData.append('cv_file', application.cv_file);
      }
      
      if (application.certificates_file) {
        formData.append('certificates', application.certificates_file);
      }

      // استخدام نقطة نهاية API الصحيحة لتقديم الطلب بدون تسجيل دخول
      // المسار الصحيح هو /teacher-application/register/ وليس /register/
      const response = await fetch(`${API_BASE_URL}/auth/teacher-application/register-direct/`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || `فشل في إرسال طلب الانضمام: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('خطأ في إرسال طلب الانضمام:', error);
      throw error;
    }
  }

  /**
   * جلب حالة طلب الانضمام باستخدام البريد الإلكتروني
   * @param email البريد الإلكتروني المستخدم في الطلب
   * @returns حالة الطلب
   */
  async getApplicationStatus(email: string): Promise<ApplicationStatusResponse> {
    try {
      const response = await fetch(`${TEACHER_APPLICATION_URL}/status/?email=${encodeURIComponent(email)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('لم تقم بتقديم طلب انضمام كمعلم بعد.');
        }
        throw new Error(`فشل في جلب حالة الطلب: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('خطأ في جلب حالة الطلب:', error);
      throw error;
    }
  }
}
