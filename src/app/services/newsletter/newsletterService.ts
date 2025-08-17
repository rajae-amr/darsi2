import { API_BASE_URL } from '@/app/config/api';

/**
 * خدمة الاشتراك في النشرة البريدية
 * Newsletter subscription service
 */

/**
 * واجهة استجابة الاشتراك في النشرة البريدية
 */
export interface NewsletterResponse {
  message: string;
  status?: 'subscribed' | 'already_subscribed' | 'unsubscribed';
  email?: string;
  unsubscribe_link?: string;
}

/**
 * الاشتراك في النشرة البريدية
 * @param email البريد الإلكتروني للمشترك
 * @returns وعد يحتوي على بيانات الاستجابة
 */
export const subscribeToNewsletter = async (email: string): Promise<NewsletterResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/newsletter/subscribe/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();
    
    // التحقق من وجود البريد الإلكتروني بالفعل
    if (data.status === 'already_subscribed') {
      return {
        message: data.message || 'شكرًا لك! أنت مشترك بالفعل في النشرة البريدية',
        status: 'already_subscribed',
        email: data.email || email
      };
    }

    if (!response.ok) {
      // التحقق من وجود رسالة خطأ محددة
      let errorMessage = 'فشل الاشتراك في النشرة البريدية';
      
      if (data && typeof data === 'object') {
        // التحقق من وجود رسالة خطأ من الخادم
        if (data.message) {
          errorMessage = data.message;
        } else if (data.email && Array.isArray(data.email) && data.email.length > 0) {
          // رسالة خطأ من Django REST Framework
          errorMessage = data.email[0];
        } else if (data.non_field_errors && Array.isArray(data.non_field_errors) && data.non_field_errors.length > 0) {
          errorMessage = data.non_field_errors[0];
        }
      }
      
      throw new Error(errorMessage);
    }

    // التأكد من أن البيانات تتوافق مع واجهة NewsletterResponse
    const newsletterResponse: NewsletterResponse = {
      message: data.message || 'تم الاشتراك بنجاح',
      status: data.status || 'subscribed',
      email: data.email,
      unsubscribe_link: data.unsubscribe_link
    };

    return newsletterResponse;
  } catch (error) {
    console.error('خطأ في الاشتراك في النشرة البريدية:', error);
    throw error;
  }
};

/**
 * إلغاء الاشتراك من النشرة البريدية
 * @param email البريد الإلكتروني للمشترك (لطلبات POST)
 * @param token رمز البريد الإلكتروني المشفر (لطلبات GET)
 * @returns وعد يحتوي على بيانات الاستجابة
 */
export const unsubscribeFromNewsletter = async (email?: string, token?: string): Promise<NewsletterResponse> => {
  try {
    let url = `${API_BASE_URL}/newsletter/unsubscribe/`;
    let options: RequestInit = {};
    
    // نستخدم دائمًا طريقة POST لإلغاء الاشتراك
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    };
    
    if (email) {
      // إذا تم توفير البريد الإلكتروني (من نموذج الموقع)
      options.body = JSON.stringify({ email });
    } else if (token) {
      // إذا تم توفير التوكن (من صفحة إلغاء الاشتراك الديناميكية)
      // نستخدم نفس المسار ولكن نرسل التوكن في جسم الطلب
      options.body = JSON.stringify({ token });
    } else {
      throw new Error('يجب توفير إما البريد الإلكتروني أو الرمز المشفر');
    }
    
    // طباعة الطلب للتصحيح
    console.log('Unsubscribe request:', { url, method: options.method, body: options.body });
    
    const response = await fetch(url, options);
    const data = await response.json();
    
    if (!response.ok) {
      // التحقق من وجود رسالة خطأ محددة
      let errorMessage = 'فشل إلغاء الاشتراك من النشرة البريدية';
      
      if (data && typeof data === 'object') {
        if (data.message) {
          errorMessage = data.message;
        } else if (data.error) {
          errorMessage = data.error;
        }
      }
      
      throw new Error(errorMessage);
    }
    
    // التأكد من أن البيانات تتوافق مع واجهة NewsletterResponse
    const newsletterResponse: NewsletterResponse = {
      message: data.message || 'تم إلغاء الاشتراك بنجاح',
      status: data.status || 'unsubscribed',
      email: data.email
    };
    
    return newsletterResponse;
  } catch (error) {
    console.error('خطأ في إلغاء الاشتراك من النشرة البريدية:', error);
    throw error;
  }
};
