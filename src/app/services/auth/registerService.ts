/**
 * خدمات تسجيل المستخدمين الجدد
 */

import { AUTH_ENDPOINTS } from './config';
import { LoginResponse, RegisterErrorResponse, RegisterResponse } from './types';
import { storeToken } from './tokenService';
import { getCsrfToken, sendOptionsRequest } from './csrfService';
import { fetchWithAuth, getAuthHeaders } from './apiService';

/**
 * واجهة بيانات التسجيل
 */
export interface RegisterData {
  first_name: string;
  last_name: string;
  email: string;
  username?: string;
  subdomain?: string;
  password: string;
  password_confirm: string;
  terms_accepted: boolean;
  is_teacher?: boolean;
  is_student?: boolean;
  user_type?: 'teacher' | 'student';
  specialization?: string;
  years_of_experience?: number;
}

/**
 * تسجيل مستخدم جديد
 * @param userData بيانات المستخدم الجديد
 * @returns وعد يحتوي على بيانات المستخدم والتوكن أو رسالة خطأ
 */
export const register = async (userData: RegisterData): Promise<RegisterResponse | RegisterErrorResponse> => {
  try {
    // تحديد نقطة النهاية المناسبة بناءً على نوع المستخدم
    let registerEndpoint = AUTH_ENDPOINTS.REGISTER;
    
    if (userData.user_type === 'teacher' || userData.is_teacher) {
      registerEndpoint = AUTH_ENDPOINTS.REGISTER_TEACHER;
      console.log('استخدام نقطة نهاية تسجيل المعلمين:', registerEndpoint);
    } else if (userData.user_type === 'student' || userData.is_student) {
      registerEndpoint = AUTH_ENDPOINTS.REGISTER_STUDENT;
      console.log('استخدام نقطة نهاية تسجيل الطلاب:', registerEndpoint);
    }
    
    // إرسال طلب OPTIONS أولاً للتحقق من إعدادات CORS
    await sendOptionsRequest(registerEndpoint);
    
    // الحصول على CSRF token
    const csrfToken = await getCsrfToken();
    console.log('تم الحصول على CSRF token:', csrfToken || 'غير موجود');
    
    // إذا لم يتم الحصول على التوكن، نحاول مرة أخرى
    if (!csrfToken) {
      console.log('محاولة ثانية للحصول على CSRF token');
      // انتظار لحظة قبل المحاولة مرة أخرى
      await new Promise(resolve => setTimeout(resolve, 1000));
      const retryToken = await getCsrfToken();
      if (retryToken) {
        console.log('تم الحصول على CSRF token في المحاولة الثانية:', retryToken);
      }
    }

    // إعداد رؤوس الطلب
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      // إزالة رأس Origin لأنه يسبب خطأ في المتصفح
      // 'Origin': window.location.origin,
    };

    // إضافة CSRF token إذا كان متوفرًا
    if (csrfToken) {
      headers['X-CSRFToken'] = csrfToken;
    } else {
      console.warn('لم يتم العثور على CSRF token، سيتم محاولة التسجيل بدونه');
    }
    
    // طباعة عنوان نقطة النهاية للتأكد من صحته
    console.log('إرسال طلب التسجيل إلى:', registerEndpoint);
    
    // تعديل اسم حقل تأكيد كلمة المرور وإضافة نوع المستخدم ليتوافق مع ما يتوقعه الباك اند
    const { password_confirm, ...restData } = userData;
    const backendData = {
      ...restData,
      password2: password_confirm, // تغيير password_confirm إلى password2 للتوافق مع الباك اند
    };
    
    // التأكد من إرسال قيم is_teacher و is_student بشكل صريح
    // عند استخدام نقطة نهاية المعلم، يجب أن تكون is_teacher = true
    if (registerEndpoint.includes('/register/teacher/')) {
      backendData.is_teacher = true;
      backendData.is_student = false;
      backendData.user_type = 'teacher';
    } 
    // عند استخدام نقطة نهاية الطالب، يجب أن تكون is_student = true
    else if (registerEndpoint.includes('/register/student/')) {
      backendData.is_teacher = false;
      backendData.is_student = true;
      backendData.user_type = 'student';
    } 
    // في الحالات الأخرى، استخدم القيم المرسلة أو المشتقة من user_type
    else {
      backendData.is_teacher = userData.user_type === 'teacher' || userData.is_teacher === true ? true : false;
      backendData.is_student = userData.user_type === 'student' || userData.is_student === true ? true : false;
      backendData.user_type = userData.user_type || (backendData.is_teacher ? 'teacher' : 'student');
    }
    
    // طباعة بيانات التسجيل للتصحيح (مع إخفاء كلمات المرور)
    console.log('بيانات التسجيل:', {
      ...backendData,
      password: '***',
      password2: '***'
    });
    
    // طباعة معلومات الطلب للتصحيح
    console.log('إرسال طلب التسجيل مع الرؤوس:', {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-CSRFToken': csrfToken || '',
    });
    
    // إرسال طلب التسجيل باستخدام fetch مباشرة
    const response = await fetch(registerEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-CSRFToken': csrfToken || '',
      },
      credentials: 'include',
      body: JSON.stringify(backendData),
    });
    
    // طباعة معلومات الاستجابة للتصحيح
    console.log('استجابة الخادم:', {
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries([...response.headers]),
    });
    
    console.log(`استجابة التسجيل: ${response.status} ${response.statusText}`);
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('خطأ في التسجيل:', errorData);
      
      // التحقق من وجود معلومات إعادة التوجيه
      if (errorData.redirectTo) {
        return {
          error: errorData.error || 'نوع المستخدم غير متطابق مع مسار التسجيل',
          userType: errorData.userType,
          redirectTo: errorData.redirectTo,
          is_student: errorData.is_student,
          is_teacher: errorData.is_teacher
        };
      }
      
      // تنسيق رسائل الخطأ
      if (typeof errorData === 'object') {
        const errorMessages = Object.entries(errorData)
          .map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(', ') : value}`)
          .join('; ');
        return { 
          error: errorMessages,
          errors: errorData
        };
      }
      
      return { error: 'فشل التسجيل. يرجى التحقق من بياناتك والمحاولة مرة أخرى.' };
    }
    
    let responseData = await response.json();
    console.log('استجابة التسجيل الناجحة:', responseData);
    
    // التحقق من وجود التوكن في الاستجابة
    // التحقق من هيكل البيانات المستلمة (إما مباشرة أو في كائن tokens)
    const access = responseData.access || (responseData.tokens && responseData.tokens.access);
    const refresh = responseData.refresh || (responseData.tokens && responseData.tokens.refresh);
    
    if (!access || !refresh) {
      return { error: 'لم يتم استلام توكن في استجابة التسجيل' };
    }
    
    // التحقق من وجود معرف الجلسة في الاستجابة
    const session_id = responseData.session_id || (responseData.tokens && responseData.tokens.session_id) || '';
    
    // طباعة معرف الجلسة للتأكد من وجوده
    console.log('معرف الجلسة المستلم:', session_id);
    
    if (!session_id) {
      console.warn('لم يتم استلام معرف جلسة من الخادم. سيتم استخدام قيمة افتراضية.');
    }
    
    // تخزين التوكن مع معرف الجلسة في localStorage لضمان استمرارية الجلسة
    storeToken(access, refresh, session_id || 'register-session', true);
    
    return {
      access: access,
      refresh: refresh,
      session_id: session_id,
      user: responseData.user
    };
  } catch (error) {
    console.error('خطأ في التسجيل:', error);
    return { 
      error: error instanceof Error ? error.message : 'حدث خطأ أثناء الاتصال بالخادم',
      errors: { general: ['حدث خطأ أثناء الاتصال بالخادم'] }
    };
  }
};

/**
 * تسجيل معلم جديد
 * @param userData بيانات المعلم الجديد
 * @returns وعد يحتوي على بيانات المستخدم والتوكن أو رسالة خطأ
 */
export const registerTeacher = async (userData: RegisterData): Promise<LoginResponse | RegisterErrorResponse> => {
  // التأكد من أن المستخدم معلم
  const teacherData = {
    ...userData,
    is_teacher: true,
    is_student: false
  };
  
  return register(teacherData);
};

/**
 * تسجيل طالب جديد
 * @param userData بيانات الطالب الجديد
 * @returns وعد يحتوي على بيانات المستخدم والتوكن أو رسالة خطأ
 */
export const registerStudent = async (userData: RegisterData): Promise<LoginResponse | RegisterErrorResponse> => {
  // التأكد من أن المستخدم طالب
  const studentData = {
    ...userData,
    is_teacher: false,
    is_student: true
  };
  
  return register(studentData);
};
