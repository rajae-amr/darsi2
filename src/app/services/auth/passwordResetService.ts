import { AUTH_ENDPOINTS } from './config';
import { getCsrfToken } from './csrfService';

/**
 * إرسال طلب إعادة تعيين كلمة المرور
 * @param email البريد الإلكتروني للمستخدم
 * @returns وعد يحتوي على استجابة الخادم
 */
export const requestPasswordReset = async (email: string): Promise<any> => {
  try {
    // الحصول على توكن CSRF
    const csrfToken = await getCsrfToken();
    
    const response = await fetch(AUTH_ENDPOINTS.PASSWORD_RESET_REQUEST, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken,
      },
      credentials: 'include',
      body: JSON.stringify({ email }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.detail || 'حدث خطأ أثناء طلب إعادة تعيين كلمة المرور');
    }
    
    return data;
  } catch (error) {
    console.error('خطأ في طلب إعادة تعيين كلمة المرور:', error);
    throw error;
  }
};

/**
 * التحقق من صحة رابط إعادة تعيين كلمة المرور
 * @param uid معرف المستخدم المشفر
 * @param token توكن إعادة تعيين كلمة المرور
 * @returns وعد يحتوي على استجابة الخادم
 */
export const verifyPasswordResetToken = async (uid: string, token: string): Promise<any> => {
  try {
    // الحصول على توكن CSRF
    const csrfToken = await getCsrfToken();
    
    const response = await fetch(AUTH_ENDPOINTS.PASSWORD_RESET_VERIFY, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken,
      },
      credentials: 'include',
      body: JSON.stringify({ uid, token }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.detail || 'رابط إعادة تعيين كلمة المرور غير صالح أو منتهي الصلاحية');
    }
    
    return data;
  } catch (error) {
    console.error('خطأ في التحقق من رابط إعادة تعيين كلمة المرور:', error);
    throw error;
  }
};

/**
 * تأكيد إعادة تعيين كلمة المرور وتعيين كلمة مرور جديدة
 * @param uid معرف المستخدم المشفر
 * @param token توكن إعادة تعيين كلمة المرور
 * @param newPassword كلمة المرور الجديدة
 * @param newPassword2 تأكيد كلمة المرور الجديدة
 * @returns وعد يحتوي على استجابة الخادم
 */
export const confirmPasswordReset = async (
  uid: string,
  token: string,
  newPassword: string,
  newPassword2: string
): Promise<any> => {
  try {
    // الحصول على توكن CSRF
    const csrfToken = await getCsrfToken();
    
    const response = await fetch(AUTH_ENDPOINTS.PASSWORD_RESET_CONFIRM, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken,
      },
      credentials: 'include',
      body: JSON.stringify({
        uid,
        token,
        new_password: newPassword,
        new_password2: newPassword2,
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.detail || 'حدث خطأ أثناء إعادة تعيين كلمة المرور');
    }
    
    return data;
  } catch (error) {
    console.error('خطأ في تأكيد إعادة تعيين كلمة المرور:', error);
    throw error;
  }
};
