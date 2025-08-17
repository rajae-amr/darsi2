/**
 * خدمات إدارة الجلسات والتحقق من المصادقة
 */

import { AUTH_ENDPOINTS, STORAGE_KEYS } from './config';
import { getAccessToken, getSessionId, refreshToken, removeToken } from './tokenService';
import { getWithAuth } from './apiService';

/**
 * التحقق من وجود معرف الجلسة في التخزين
 * @returns معرف الجلسة أو null إذا لم يكن موجودًا
 */
const verifySessionIdExists = (): string | null => {
  // الحصول على معرف الجلسة من التخزين
  let sessionId = getSessionId();
  
  // إذا لم يكن هناك معرف جلسة، نحاول الحصول عليه من التخزين مرة أخرى
  if (!sessionId) {
    console.warn('لم يتم العثور على معرف الجلسة في التخزين');
    
    // محاولة الحصول على معرف الجلسة من التخزين المحلي أو تخزين الجلسة مرة أخرى
    sessionId = localStorage.getItem(STORAGE_KEYS.SESSION_ID) || sessionStorage.getItem(STORAGE_KEYS.SESSION_ID);
    
    if (!sessionId) {
      console.error('لم يتم العثور على معرف الجلسة في أي مكان');
      return null;
    } else {
      console.log('تم العثور على معرف الجلسة في محاولة ثانية:', sessionId);
    }
  }
  
  return sessionId;
};

/**
 * التحقق من صحة التوكن مع الخادم
 * @param sessionId معرف الجلسة
 * @returns وعد يحتوي على نتيجة التحقق
 */
const verifyTokenWithServer = async (sessionId: string): Promise<boolean> => {
  console.log('إرسال طلب التحقق من التوكن مع معرف الجلسة:', sessionId);
  
  try {
    // استخدام getWithAuth للتحقق من صحة التوكن
    const data = await getWithAuth(AUTH_ENDPOINTS.VERIFY_TOKEN);
    
    console.log('التوكن صالح');
    
    // التحقق من معرف الجلسة
    if (data.session_id && data.session_id !== sessionId) {
      console.warn('معرف الجلسة مختلف عن المخزن:', { stored: sessionId, received: data.session_id });
      // تم تسجيل الدخول من مكان آخر
      removeToken(); // حذف التوكن الحالي
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('خطأ في التحقق من صحة التوكن:', error);
    return false;
  }
};

/**
 * محاولة تجديد التوكن عند انتهاء صلاحيته
 * @returns وعد يحتوي على نتيجة تجديد التوكن
 */
const attemptTokenRefresh = async (): Promise<boolean> => {
  console.log('التوكن غير صالح، محاولة تجديده');
  
  try {
    const refreshResult = await refreshToken();
    
    // إذا كانت الاستجابة تحتوي على معرف جلسة، قم بتحديثه في كل من التخزين المحلي وتخزين الجلسة
    if (refreshResult && refreshResult.session_id) {
      console.log('تم تحديث معرف الجلسة بعد تجديد التوكن:', refreshResult.session_id);
      // حفظ معرف الجلسة الجديد في كل من التخزين المحلي وتخزين الجلسة
      localStorage.setItem(STORAGE_KEYS.SESSION_ID, refreshResult.session_id);
      sessionStorage.setItem(STORAGE_KEYS.SESSION_ID, refreshResult.session_id);
    } else {
      console.log('تم تجديد التوكن لكن لم يتم استلام معرف جلسة جديد');
    }
    
    return true;
  } catch (error: any) {
    console.error('خطأ في تجديد التوكن:', error);
    
    // إعادة إلقاء الاستثناء إذا كان متعلقًا بجلسة غير صالحة
    if (error.message && error.message.includes('تم تسجيل دخولك من جهاز آخر')) {
      throw error; // إعادة إلقاء الاستثناء ليتم التقاطه في AuthContext
    }
    
    return false;
  }
};

/**
 * التحقق من حالة المصادقة للمستخدم
 * @returns وعد يحتوي على حالة المصادقة
 */
export const checkAuth = async (): Promise<boolean> => {
  try {
    // الحصول على توكن الوصول من التخزين
    const accessToken = getAccessToken();
    
    console.log('التحقق من حالة المصادقة:', { accessToken: accessToken ? 'موجود' : 'غير موجود' });
    
    // إذا لم يكن هناك توكن، فالمستخدم غير مسجل الدخول
    if (!accessToken) {
      console.log('لم يتم العثور على توكن الوصول');
      return false;
    }
    
    // التحقق من وجود معرف الجلسة
    const sessionId = verifySessionIdExists();
    if (!sessionId) {
      return false;
    }

    // التحقق من صحة التوكن مع الخادم
    const isTokenValid = await verifyTokenWithServer(sessionId);
    if (isTokenValid) {
      return true;
    }

    // محاولة تجديد التوكن إذا كان غير صالح
    return await attemptTokenRefresh();
  } catch (error) {
    console.error('خطأ في التحقق من المصادقة:', error);
    return false;
  }
};
