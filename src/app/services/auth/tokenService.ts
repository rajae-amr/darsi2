/**
 * خدمات إدارة التوكن
 */

import { AUTH_ENDPOINTS, STORAGE_KEYS } from './config';
import { TokenResponse } from './types';
import { getCsrfToken } from './csrfService';

/**
 * تخزين التوكن في التخزين المحلي أو تخزين الجلسة
 * @param accessToken توكن الوصول
 * @param refreshToken توكن التجديد
 * @param sessionId معرف الجلسة
 * @param rememberMe إذا كان يجب تخزين التوكن في التخزين المحلي
 */
export const storeToken = (accessToken: string, refreshToken: string, sessionId: string, rememberMe: boolean) => {
  console.log('تخزين التوكنات ومعرف الجلسة:', { accessToken: accessToken?.substring(0, 10) + '...', refreshToken: refreshToken?.substring(0, 10) + '...', sessionId });
  
  if (!sessionId) {
    console.error('محاولة تخزين توكن بدون معرف جلسة!');
    return;
  }
  
  // تحديد التخزين المستخدم بناءً على خيار "تذكرني"
  const storage = rememberMe ? localStorage : sessionStorage;
  
  // تخزين التوكنات في التخزين المحدد
  storage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
  storage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
  
  // تخزين معرف الجلسة في كلا التخزينين لضمان استمرارية الجلسة
  localStorage.setItem(STORAGE_KEYS.SESSION_ID, sessionId);
  sessionStorage.setItem(STORAGE_KEYS.SESSION_ID, sessionId);
  
  // تخزين خيار "تذكرني"
  localStorage.setItem('rememberMe', rememberMe.toString());
  
  // إرسال حدث لإعلام النوافذ الأخرى بتغيير الجلسة
  const storageArea = rememberMe ? localStorage : sessionStorage;
  const event = new StorageEvent('storage', {
    key: STORAGE_KEYS.SESSION_ID,
    newValue: sessionId,
    storageArea: storageArea
  });
  window.dispatchEvent(event);
  
  console.log('تم تخزين معرف الجلسة بنجاح في كلا التخزينين:', sessionId);
};


/**
 * الحصول على توكن الوصول من التخزين
 * @returns توكن الوصول أو null إذا لم يكن موجودًا
 */
export const getAccessToken = (): string | null => {
  return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN) || 
         sessionStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
};

/**
 * الحصول على توكن التجديد من التخزين
 * @returns توكن التجديد أو null إذا لم يكن موجودًا
 */
export const getRefreshToken = (): string | null => {
  return localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN) || 
         sessionStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
};

/**
 * الحصول على معرف الجلسة من التخزين المحلي أو تخزين الجلسة
 * @returns معرف الجلسة أو null إذا لم يكن موجودًا
 */
export const getSessionId = () => {
  console.log('محاولة استرجاع معرف الجلسة');
  // محاولة الحصول على معرف الجلسة من التخزين المحلي أولاً
  let sessionId = localStorage.getItem(STORAGE_KEYS.SESSION_ID);
  
  // إذا لم يتم العثور عليه في التخزين المحلي، حاول الحصول عليه من تخزين الجلسة
  if (!sessionId) {
    sessionId = sessionStorage.getItem(STORAGE_KEYS.SESSION_ID);
  }
  
  if (sessionId) {
    console.log('تم العثور على معرف الجلسة:', sessionId);
  } else {
    console.warn('لم يتم العثور على معرف الجلسة');
    // لا نقوم بإنشاء معرف جلسة مؤقت هنا لأنه يجب أن يأتي من الخادم
  }
  
  return sessionId;
};

/**
 * حذف التوكن ومعرف الجلسة من التخزين
 */
export const removeToken = (): void => {
  localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
  localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
  localStorage.removeItem(STORAGE_KEYS.SESSION_ID);
  sessionStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
  sessionStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
  sessionStorage.removeItem(STORAGE_KEYS.SESSION_ID);
  
  // إرسال حدث لإعلام النوافذ الأخرى بحذف الجلسة
  const event = new StorageEvent('storage', {
    key: STORAGE_KEYS.SESSION_ID,
    newValue: null,
    storageArea: localStorage
  });
  window.dispatchEvent(event);
};

/**
 * تجديد توكن الوصول باستخدام توكن التجديد
 * @returns وعد يحتوي على التوكن الجديد
 */
export const refreshToken = async (): Promise<TokenResponse> => {
  try {
    // الحصول على رمز CSRF أولاً
    const csrfToken = await getCsrfToken();
    
    // الحصول على توكن التجديد من التخزين
    const refreshTokenValue = getRefreshToken();
    
    if (!refreshTokenValue) {
      throw new Error('لم يتم العثور على توكن التجديد');
    }
    
    // الحصول على معرف الجلسة
    const sessionId = getSessionId();
    
    // إنشاء رؤوس الطلب
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
    
    // إضافة معرف الجلسة إلى رؤوس الطلب
    if (sessionId) {
      console.log('إرسال معرف الجلسة في طلب تجديد التوكن:', sessionId);
      headers['X-Session-ID'] = sessionId;
    } else {
      console.warn('لم يتم العثور على معرف جلسة لإضافته إلى طلب تجديد التوكن');
    }
    
    // إضافة رمز CSRF إذا كان موجوداً
    if (csrfToken) {
      headers['X-CSRFToken'] = csrfToken;
    }
    
    // إرسال طلب تجديد التوكن
    const response = await fetch(AUTH_ENDPOINTS.REFRESH_TOKEN, {
      method: 'POST',
      headers,
      credentials: 'include',
      body: JSON.stringify({ refresh: refreshTokenValue }),
    });

    // محاولة الحصول على بيانات الاستجابة حتى في حالة الخطأ
    const data = await response.json().catch(() => ({}));
    
    if (!response.ok) {
      // في حالة فشل تجديد التوكن، قم بتسجيل الخروج
      removeToken();
      
      // التحقق من نوع الخطأ
      if (data && data.code === 'invalid_session') {
        throw new Error('تم تسجيل دخولك من جهاز آخر. يرجى تسجيل الدخول مرة أخرى.');
      } else if (data && data.error) {
        throw new Error(data.error);
      } else {
        throw new Error('فشل في تجديد التوكن، يرجى تسجيل الدخول مرة أخرى');
      }
    }
    
    if (!data.access || !data.refresh) {
      throw new Error('فشل في تجديد التوكن، يرجى تسجيل الدخول مرة أخرى.');
    }
    
    // إذا كانت الاستجابة تحتوي على معرف جلسة، قم بتخزينه
    if (data.session_id) {
      console.log('تم استلام معرف جلسة جديد من الخادم:', data.session_id);
      // تخزين معرف الجلسة في كل من التخزين المحلي وتخزين الجلسة
      localStorage.setItem(STORAGE_KEYS.SESSION_ID, data.session_id);
      sessionStorage.setItem(STORAGE_KEYS.SESSION_ID, data.session_id);
    } else {
      console.warn('لم يتم استلام معرف جلسة من الخادم عند تجديد التوكن');
    }
    
    // تخزين التوكن الجديد
    const isRememberMe = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN) !== null;
    const storage = isRememberMe ? localStorage : sessionStorage;
    storage.setItem(STORAGE_KEYS.ACCESS_TOKEN, data.access);
    storage.setItem(STORAGE_KEYS.REFRESH_TOKEN, data.refresh);

    return data;
  } catch (error) {
    console.error('خطأ في تجديد التوكن:', error);
    throw error;
  }
};
