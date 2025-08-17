/**
 * خدمة API مشتركة لإدارة الطلبات مع إضافة رؤوس مصادقة
 * تستخدم axiosInstance للاستفادة من معالجة الأخطاء وتجديد التوكن التلقائي
 */

import axiosInstance from '../api/axiosConfig';
import { STORAGE_KEYS } from './config';
import { getAccessToken, getSessionId } from './tokenService';

/**
 * إنشاء رؤوس الطلب مع إضافة توكن المصادقة ومعرف الجلسة
 * @returns رؤوس الطلب مع معلومات المصادقة
 */
export const getAuthHeaders = (): Record<string, string> => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  // إضافة توكن الوصول إذا كان موجودًا
  const accessToken = getAccessToken();
  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`;
  }

  // إضافة معرف الجلسة إذا كان موجودًا
  const sessionId = getSessionId();
  if (sessionId) {
    headers['X-Session-ID'] = sessionId;
    console.log('تم إضافة معرف الجلسة إلى رؤوس الطلب:', sessionId);
  } else {
    console.warn('لم يتم العثور على معرف جلسة لإضافته إلى رؤوس الطلب');
  }

  return headers;
};

/**
 * إرسال طلب API مع إضافة رؤوس المصادقة باستخدام axiosInstance
 * @param url عنوان URL للطلب
 * @param options خيارات الطلب
 * @returns وعد يحتوي على استجابة الطلب
 */
export const fetchWithAuth = async (url: string, options: any = {}): Promise<any> => {
  // axiosInstance يضيف رؤوس المصادقة تلقائيًا من خلال معترض الطلبات
  // لذلك لا نحتاج إلى إضافة الرؤوس يدويًا هنا
  try {
    const response = await axiosInstance({
      url,
      ...options,
    });
    
    return response;
  } catch (error) {
    console.error('خطأ في طلب API:', error);
    throw error;
  }
};

/**
 * إرسال طلب GET مع رؤوس المصادقة
 * @param url عنوان URL للطلب
 * @returns وعد يحتوي على استجابة الطلب
 */
export const getWithAuth = async (url: string): Promise<any> => {
  try {
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    console.error('خطأ في طلب GET:', error);
    throw error;
  }
};

/**
 * إرسال طلب POST مع رؤوس المصادقة
 * @param url عنوان URL للطلب
 * @param data البيانات المراد إرسالها
 * @returns وعد يحتوي على استجابة الطلب
 */
export const postWithAuth = async (url: string, data: any): Promise<any> => {
  try {
    const response = await axiosInstance.post(url, data);
    return response.data;
  } catch (error) {
    console.error('خطأ في طلب POST:', error);
    throw error;
  }
};
