/**
 * خدمات إدارة بيانات المستخدم
 */

import { AUTH_ENDPOINTS } from './config';
import { UserProfile } from './types';
import { getAccessToken, refreshToken } from './tokenService';
import { getCsrfToken } from './csrfService';

/**
 * الحصول على بيانات المستخدم الحالي
 * @returns وعد يحتوي على بيانات المستخدم
 */
export const getCurrentUser = async (): Promise<UserProfile> => {
  try {
    // الحصول على توكن الوصول من التخزين
    const accessToken = getAccessToken();
    
    if (!accessToken) {
      throw new Error('المستخدم غير مصادق');
    }

    // إنشاء رؤوس الطلب
    const headers: Record<string, string> = {
      'Authorization': `Bearer ${accessToken}`,
      'Accept': 'application/json',
    };

    // طلب بيانات الملف الشخصي
    const response = await fetch(AUTH_ENDPOINTS.PROFILE, {
      method: 'GET',
      headers,
      credentials: 'include',
    });

    if (!response.ok) {
      // إذا كان التوكن غير صالح، حاول تجديده وإعادة الطلب
      if (response.status === 401) {
        await refreshToken();
        return getCurrentUser();
      }
      throw new Error('فشل في الحصول على بيانات المستخدم');
    }

    return await response.json();
  } catch (error) {
    console.error('خطأ في الحصول على بيانات المستخدم:', error);
    throw error;
  }
};

/**
 * تحديث بيانات المستخدم
 * @param userData بيانات المستخدم المحدثة
 * @returns وعد يحتوي على بيانات المستخدم بعد التحديث
 */
export const updateUserProfile = async (userData: Partial<UserProfile>): Promise<UserProfile> => {
  try {
    // الحصول على توكن الوصول من التخزين
    const accessToken = getAccessToken();
    
    if (!accessToken) {
      throw new Error('المستخدم غير مصادق');
    }

    // الحصول على رمز CSRF أولاً
    const csrfToken = await getCsrfToken();
    console.log('تم الحصول على رمز CSRF:', csrfToken);
    
    // استخراج رمز CSRF من ملفات تعريف الارتباط
    const getCookie = (name: string): string => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) {
        return parts.pop()?.split(';').shift() || '';
      }
      return '';
    };
    
    const csrfCookie = getCookie('csrftoken');
    console.log('رمز CSRF من ملف تعريف الارتباط:', csrfCookie);
    
    // إنشاء رؤوس الطلب
    const headers: Record<string, string> = {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-CSRFToken': csrfCookie || csrfToken, // إضافة رمز CSRF في رأس الطلب
    };

    console.log('جاري إرسال طلب تحديث الملف الشخصي مع CSRF');
    
    // طباعة البيانات المرسلة للتصحيح
    console.log('البيانات المرسلة للتحديث:', userData);
    
    // طلب تحديث بيانات الملف الشخصي
    const response = await fetch(AUTH_ENDPOINTS.PROFILE, {
      method: 'PATCH',
      headers,
      credentials: 'include', // مهم لإرسال ملفات تعريف الارتباط
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      // إذا كان التوكن غير صالح، حاول تجديده وإعادة الطلب
      if (response.status === 401) {
        await refreshToken();
        return updateUserProfile(userData);
      }
      
      // نسخ الاستجابة للتمكن من قراءتها مرتين
      const responseClone = response.clone();
      
      // محاولة الحصول على تفاصيل الخطأ
      try {
        const errorData = await response.json();
        console.error('تفاصيل الخطأ من الخادم:', errorData);
        
        // إنشاء كائن خطأ مخصص مع البيانات الأصلية
        const customError: any = new Error(`فشل في تحديث بيانات المستخدم`);
        customError.errorData = errorData;
        customError.statusCode = response.status;
        throw customError;
      } catch (jsonError) {
        // إذا لم يكن هناك JSON في الاستجابة
        try {
          const errorText = await responseClone.text();
          console.error('نص الخطأ من الخادم:', errorText);
          throw new Error(`فشل في تحديث بيانات المستخدم: ${errorText}`);
        } catch (textError) {
          // إذا فشلت كل المحاولات
          console.error('لم يمكن قراءة محتوى الخطأ:', response.status, response.statusText);
          throw new Error(`فشل في تحديث بيانات المستخدم: ${response.status} ${response.statusText}`);
        }
      }
    }

    return await response.json();
  } catch (error) {
    console.error('خطأ في تحديث بيانات المستخدم:', error);
    throw error;
  }
};
