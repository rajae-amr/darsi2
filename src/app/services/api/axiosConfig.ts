/**
 * ملف إعداد axios لإدارة طلبات API مع دعم المصادقة
 * يوفر هذا الملف نسخة مكونة من axios مع إضافة رمز المصادقة تلقائيًا لجميع الطلبات
 * ويتعامل مع أخطاء المصادقة مثل انتهاء صلاحية التوكن عن طريق تجديده تلقائيًا
 */

import axios from 'axios';
import { getAccessToken, refreshToken, getSessionId } from '../auth/tokenService';
import { API_URL } from '../auth/config';
import { getCsrfToken as fetchCsrfToken } from '../auth/csrfService';

// دالة للحصول على توكن CSRF من ملفات تعريف الارتباط
function getCsrfToken(): string | null {
  if (typeof document === 'undefined') return null;
  
  // الحصول على توكن CSRF من ملفات تعريف الارتباط
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === 'csrftoken') {
      console.log('تم العثور على توكن CSRF في ملفات تعريف الارتباط:', value.substring(0, 10) + '...');
      return value;
    }
  }
  console.log('لم يتم العثور على توكن CSRF في ملفات تعريف الارتباط');
  return null;
}

// إنشاء نسخة من axios مع الإعدادات الافتراضية
const axiosInstance = axios.create({
  baseURL: API_URL,  // استخدام عنوان API المعرف في ملف التكوين
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true, // مهم لإرسال ملفات تعريف الارتباط مع كل طلب
});

/**
 * معترض الطلبات - يضيف رؤوس المصادقة ومعرف الجلسة لكل طلب
 */
axiosInstance.interceptors.request.use(
  async (config) => {
    // إضافة رأس المصادقة إذا كان التوكن موجودًا
    const accessToken = getAccessToken();
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    
    // إضافة معرف الجلسة إذا كان موجودًا
    const sessionId = getSessionId();
    if (sessionId) {
      config.headers['X-Session-ID'] = sessionId;
    }
    
    // إضافة توكن CSRF لطلبات POST, PUT, DELETE, PATCH
    if (['post', 'put', 'delete', 'patch'].includes(config.method?.toLowerCase() || '')) {
      try {
        // نحاول الحصول على التوكن من ملفات تعريف الارتباط أولاً
        let csrfToken = getCsrfToken();
        
        // إذا لم يكن التوكن موجودًا، نقوم بطلبه من الخادم
        if (!csrfToken) {
          console.log('توكن CSRF غير موجود، جاري طلبه من الخادم...');
          // استدعاء API للحصول على توكن CSRF
          const token = await fetchCsrfToken();
          
          if (token) {
            // استخدام التوكن المسترجع مباشرة
            csrfToken = token;
            console.log('تم الحصول على توكن CSRF من الخادم مباشرة');
          } else {
            // محاولة أخرى للحصول على التوكن من ملفات تعريف الارتباط
            csrfToken = getCsrfToken();
            console.log('محاولة استرجاع توكن CSRF من ملفات تعريف الارتباط بعد الطلب');
          }
        }
        
        if (csrfToken) {
          console.log('إضافة توكن CSRF للطلب:', csrfToken.substring(0, 10) + '...');
          config.headers['X-CSRFToken'] = csrfToken;
        } else {
          console.warn('فشل في الحصول على توكن CSRF. قد تفشل بعض الطلبات التي تتطلب حماية CSRF.');
        }
      } catch (error) {
        console.error('خطأ أثناء معالجة توكن CSRF:', error);
      }
    }
    
    return config;
  },
  (error) => {
    console.error('خطأ في إعداد طلب API:', error);
    return Promise.reject(error);
  }
);

/**
 * معترض الاستجابات - يتعامل مع أخطاء المصادقة ويجدد التوكن تلقائيًا
 */
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // التحقق من أن الخطأ هو 401 (غير مصرح) وأن الطلب لم يتم تجديده من قبل
    if (error.response?.status === 401 && !originalRequest._retry) {
      console.log('تم رصد خطأ 401 غير مصرح، محاولة تجديد التوكن...');
      originalRequest._retry = true;
      
      try {
        // محاولة تجديد التوكن
        const tokenResponse = await refreshToken();
        if (tokenResponse && tokenResponse.access) {
          console.log('تم تجديد التوكن بنجاح، إعادة إرسال الطلب الأصلي');
          
          // إعادة تعيين رأس المصادقة مع التوكن الجديد
          const newToken = tokenResponse.access;
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          
          // إعادة إرسال الطلب الأصلي
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        console.error('فشل في تجديد التوكن:', refreshError);
        
        // يمكن إضافة منطق لتوجيه المستخدم إلى صفحة تسجيل الدخول هنا
        // على سبيل المثال، إعادة توجيه المستخدم إلى صفحة تسجيل الدخول
        // window.location.href = '/auth/login';
      }
    }
    
    // إذا كان الخطأ ليس 401 أو فشلت محاولة تجديد التوكن، إرجاع الخطأ
    return Promise.reject(error);
  }
);

export default axiosInstance;
