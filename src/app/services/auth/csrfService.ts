/**
 * خدمات إدارة توكنات CSRF
 */

import { AUTH_ENDPOINTS } from './config';

/**
 * الحصول على رمز CSRF من الخادم
 * @returns وعد يحتوي على رمز CSRF
 */
export const getCsrfToken = async (): Promise<string> => {
  try {
    console.log('جاري الحصول على CSRF token من:', AUTH_ENDPOINTS.CSRF);
    
    // إرسال طلب GET لنقطة نهاية CSRF للحصول على ملف تعريف CSRF
    const response = await fetch(AUTH_ENDPOINTS.CSRF, {
      method: 'GET',
      credentials: 'include', // مهم لتخزين ملفات تعريف الارتباط
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Origin': window.location.origin,
      },
      cache: 'no-cache', // منع التخزين المؤقت للتأكد من الحصول على الرمز الجديد
    });

    console.log(`استجابة طلب CSRF: ${response.status} ${response.statusText}`);
    
    if (!response.ok) {
      console.error('فشل الحصول على CSRF token:', response.status, response.statusText);
      return '';
    }

    // محاولة استخراج الرمز من الاستجابة
    const data = await response.json();
    
    if (data && data.csrfToken) {
      console.log('تم الحصول على CSRF token بنجاح:', data.csrfToken.substring(0, 10) + '...');
      // تخزين التوكن في ملفات تعريف الارتباط يدويًا للتأكد
      document.cookie = `csrftoken=${data.csrfToken}; path=/; SameSite=Lax`;
      return data.csrfToken;
    }
    
    // التحقق من وجود الرمز في رؤوس الاستجابة
    const csrfHeader = response.headers.get('X-CSRFToken');
    if (csrfHeader) {
      console.log('تم الحصول على CSRF token من رؤوس الاستجابة:', csrfHeader.substring(0, 10) + '...');
      // تخزين التوكن في ملفات تعريف الارتباط يدويًا للتأكد
      document.cookie = `csrftoken=${csrfHeader}; path=/; SameSite=Lax`;
      return csrfHeader;
    }

    // محاولة الحصول على الرمز من ملفات تعريف الارتباط
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const [name, value] = cookie.trim().split('=');
      if (name === 'csrftoken') {
        console.log('تم الحصول على CSRF token من ملفات تعريف الارتباط:', value.substring(0, 10) + '...');
        return value;
      }
    }

    console.warn('لم يتم العثور على CSRF token في الاستجابة أو ملفات تعريف الارتباط');
    return '';
  } catch (error) {
    console.error('خطأ أثناء الحصول على CSRF token:', error);
    return '';
  }
};

/**
 * إرسال طلب OPTIONS للتحقق من إعدادات CORS
 * @param url عنوان URL للتحقق منه
 */
export const sendOptionsRequest = async (url: string): Promise<void> => {
  try {
    await fetch(url, {
      method: 'OPTIONS',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
  } catch (optionsError) {
    console.warn('خطأ في طلب OPTIONS:', optionsError);
    // نتجاهل الخطأ ونستمر
  }
};
