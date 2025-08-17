/**
 * خدمات تسجيل الدخول
 */

import { AUTH_ENDPOINTS } from './config';
import { storeToken } from './tokenService';
import { LoginCredentials, LoginResponse, LoginErrorResponse } from './types';
import { getCsrfToken } from './csrfService';
import { getWithAuth, postWithAuth } from './apiService';

/**
 * تحديد نقطة نهاية تسجيل الدخول بناءً على نوع المستخدم
 * @param credentials بيانات تسجيل الدخول
 * @returns عنوان نقطة نهاية تسجيل الدخول
 */
const getLoginEndpoint = (credentials: LoginCredentials): string => {
  if (credentials.user_type === 'teacher' || credentials.is_teacher) {
    return AUTH_ENDPOINTS.LOGIN_TEACHER;
  } else if (credentials.user_type === 'student' || credentials.is_student) {
    return AUTH_ENDPOINTS.LOGIN_STUDENT;
  }
  return AUTH_ENDPOINTS.LOGIN;
};

/**
 * معالجة أخطاء تسجيل الدخول
 * @param response استجابة الخادم
 * @param errorData بيانات الخطأ
 * @returns كائن يحتوي على رسالة الخطأ
 */
const handleLoginError = async (response: any, errorData: any): Promise<LoginErrorResponse> => {
  // معالجة الخطأ 403 لنوع المستخدم غير المطابق
  if (response.status === 403 && errorData.detail) {
    // التحقق من نوع المستخدم الصحيح
    if (errorData.user_type === 'teacher') {
      return { 
        error: errorData.detail,
        userType: 'teacher',
        redirectTo: '/auth/login/teacher'
      };
    } else if (errorData.user_type === 'student') {
      return { 
        error: errorData.detail,
        userType: 'student',
        redirectTo: '/auth/login/student'
      };
    } else {
      return { 
        error: errorData.detail,
        redirectTo: '/auth/login/type'
      };
    }
  }
  
  // معالجة الخطأ 401 بشكل موحد
  if (response.status === 401) {
    // تحقق من وجود رسالة خطأ محددة
    if (errorData.detail && errorData.detail.includes('No active account found')) {
      return { error: 'لم يتم العثور على حساب نشط بهذه البيانات. تأكد من صحة البريد الإلكتروني وكلمة المرور أو قم بإنشاء حساب جديد.' };
    } else if (errorData.detail) {
      return { error: 'البريد الإلكتروني أو كلمة المرور غير صحيحة. يرجى التحقق من بياناتك.' };
    } else {
      return { error: 'فشل في تسجيل الدخول. يرجى التحقق من بياناتك والمحاولة مرة أخرى.' };
    }
  }
  
  // معالجة خاصة لأخطاء CSRF
  if (errorData.detail && errorData.detail.includes('CSRF')) {
    return { error: 'حدث خطأ في التحقق من الأمان. يرجى تحديث الصفحة والمحاولة مرة أخرى.' };
  }
  
  // للأخطاء الأخرى مع تفاصيل
  if (errorData.detail) {
    return { error: `خطأ في تسجيل الدخول: ${errorData.detail}` };
  }
  
  // رسالة خطأ عامة
  return { error: 'فشل في تسجيل الدخول. يرجى المحاولة مرة أخرى.' };
};

/**
 * جلب بيانات المستخدم بعد تسجيل الدخول
 * @returns بيانات المستخدم
 */
const fetchUserProfile = async (): Promise<any> => {
  try {
    // استخدام getWithAuth للحصول على بيانات المستخدم
    const userData = await getWithAuth(AUTH_ENDPOINTS.PROFILE);
    
    // التحقق من وجود حقول المستخدم المطلوبة
    if (!userData || typeof userData !== 'object') {
      throw new Error('بيانات المستخدم غير صالحة');
    }
    
    // التحقق من وجود الحقول المطلوبة
    if (!userData.id || !userData.email) {
      console.error('بيانات المستخدم غير مكتملة:', userData);
      throw new Error('بيانات المستخدم غير مكتملة');
    }
    
    // إضافة حقول افتراضية إذا لم تكن موجودة
    userData.first_name = userData.first_name || '';
    userData.last_name = userData.last_name || '';
    userData.is_teacher = !!userData.is_teacher;
    userData.is_student = !!userData.is_student;
    
    // إرجاع بيانات المستخدم
    return userData;
  } catch (error) {
    console.error(`فشل في الحصول على بيانات المستخدم:`, error);
    throw new Error(`فشل في الحصول على بيانات المستخدم`);
  }
};

/**
 * تسجيل الدخول باستخدام البريد الإلكتروني وكلمة المرور
 * @param credentials بيانات تسجيل الدخول
 * @returns وعد يحتوي على بيانات المستخدم والتوكن أو رسالة خطأ
 */
export const login = async (credentials: LoginCredentials): Promise<LoginResponse | LoginErrorResponse> => {
  try {
    // الحصول على رمز CSRF أولاً
    // ملاحظة: axiosInstance يتعامل مع CSRF تلقائيًا لكن نحصل عليه هنا للتأكد
    await getCsrfToken();
    
    // تحديد مسار تسجيل الدخول بناءً على نوع المستخدم
    const loginEndpoint = getLoginEndpoint(credentials);
    
    try {
      // إرسال طلب تسجيل الدخول باستخدام postWithAuth
      const tokenData = await postWithAuth(loginEndpoint, {
        username: credentials.email,
        email: credentials.email,
        password: credentials.password,
        is_student: credentials.is_student !== undefined ? credentials.is_student : (credentials.user_type === 'student'),
        is_teacher: credentials.is_teacher !== undefined ? credentials.is_teacher : (credentials.user_type === 'teacher'),
      });
    
    // التحقق من وجود معرف جلسة في الاستجابة
    if (!tokenData.session_id) {
      console.error('لم يتم استلام معرف جلسة من الخادم عند تسجيل الدخول');
      return { error: 'حدث خطأ في تسجيل الدخول. يرجى المحاولة مرة أخرى.' };
    }
    
    console.log('تم استلام معرف جلسة من الخادم:', tokenData.session_id);
    
    // تخزين التوكن في التخزين المحلي أو تخزين الجلسة حسب خيار "تذكرني"
      storeToken(tokenData.access, tokenData.refresh, tokenData.session_id, !!credentials.remember);
      
      // جلب بيانات المستخدم بعد تسجيل الدخول بنجاح
      const userData = await fetchUserProfile();
      
      // إرجاع بيانات التوكن والمستخدم معاً
      return {
        access: tokenData.access,
        refresh: tokenData.refresh,
        session_id: tokenData.session_id,
        user: userData
      };
    } catch (error: any) {
      // معالجة أخطاء الاستجابة
      if (error.response) {
        return handleLoginError(error.response, error.response.data);
      }
      
      console.error('خطأ في تسجيل الدخول:', error);
      return {
        error: 'حدث خطأ أثناء محاولة تسجيل الدخول. يرجى المحاولة مرة أخرى.',
      };
    }
  } catch (error) {
    console.error('خطأ في تسجيل الدخول:', error);
    return {
      error: 'حدث خطأ أثناء محاولة تسجيل الدخول. يرجى المحاولة مرة أخرى.',
    };
  }
};
