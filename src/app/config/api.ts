/**
 * ثوابت API والنقاط النهائية
 * API constants and endpoints
 */

// عنوان API الأساسي
// تم توحيد عنوان API في جميع أنحاء التطبيق
// يمكن أن يكون إما http://localhost:8000 أو http://localhost:8000/api حسب تكوين الباك إند
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

// عنوان API الأساسي بدون /api (يستخدم للصور وموارد أخرى)
export const API_ROOT_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// فترات زمنية للطلبات (بالمللي ثانية)
export const API_TIMEOUT = 30000; // 30 ثانية
export const API_RETRY_DELAY = 1000; // ثانية واحدة

// رسائل أخطاء API الافتراضية
export const API_ERROR_MESSAGES = {
  DEFAULT: 'حدث خطأ أثناء الاتصال بالخادم. يرجى المحاولة مرة أخرى.',
  TIMEOUT: 'انتهت مهلة الاتصال بالخادم. يرجى التحقق من اتصالك بالإنترنت والمحاولة مرة أخرى.',
  NETWORK: 'تعذر الاتصال بالخادم. يرجى التحقق من اتصالك بالإنترنت.',
  UNAUTHORIZED: 'انتهت صلاحية الجلسة. يرجى تسجيل الدخول مرة أخرى.',
  FORBIDDEN: 'ليس لديك صلاحية للوصول إلى هذا المورد.',
  NOT_FOUND: 'المورد المطلوب غير موجود.',
  SERVER: 'حدث خطأ في الخادم. يرجى المحاولة مرة أخرى لاحقًا.'
};
