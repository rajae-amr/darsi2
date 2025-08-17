/**
 * خدمات تسجيل الخروج
 */

import { AUTH_ENDPOINTS } from './config';
import { getRefreshToken, getSessionId, removeToken } from './tokenService';
import { getCsrfToken } from './csrfService';
import { postWithAuth } from './apiService';

/**
 * تسجيل الخروج وحذف التوكن
 * يقوم بإرسال طلب إلى الباك اند لإبطال الجلسة وإضافة التوكن إلى القائمة السوداء
 * ثم يقوم بحذف التوكنات المحلية
 * @returns وعد يشير إلى نجاح أو فشل عملية تسجيل الخروج
 */
export const logout = async (): Promise<boolean> => {
  try {
    const refreshToken = getRefreshToken();
    const sessionId = getSessionId();
    
    // إذا كان هناك توكن تجديد وجلسة، نقوم بإرسال طلب تسجيل الخروج إلى الباك اند
    if (refreshToken && sessionId) {
      // الحصول على توكن CSRF للحماية من هجمات CSRF
      // ملاحظة: axiosInstance يتعامل مع CSRF تلقائيًا لكن نحصل عليه هنا للتأكد
      await getCsrfToken();
      
      try {
        // استخدام postWithAuth لإرسال طلب تسجيل الخروج
        await postWithAuth(AUTH_ENDPOINTS.LOGOUT, { refresh: refreshToken });
      } catch (error) {
        console.warn('فشل في تسجيل الخروج من الخادم:', error);
        // نستمر بحذف التوكنات المحلية حتى لو فشل الطلب
      }
    }
    
    // حذف التوكنات المحلية بغض النظر عن نجاح الطلب
    removeToken();
    return true;
  } catch (error) {
    console.error('خطأ في تسجيل الخروج:', error);
    // حذف التوكنات المحلية حتى في حالة حدوث خطأ
    removeToken();
    return false;
  }
};
