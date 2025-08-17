/**
 * ملف التكوين الرئيسي للتطبيق
 * يقوم بتصدير جميع الثوابت من مجلد config
 */

// تصدير جميع الثوابت من مجلد config
export * from './config/api';
export * from './config/ui';
export * from './config/app';
export * from './config/localization';

// تصدير مباشر للثوابت الرئيسية للتوافق مع الكود القديم
import { API_BASE_URL, API_ROOT_URL } from './config/api';
import { APP_NAME, APP_VERSION, APP_DESCRIPTION } from './config/app';
import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from './config/localization';
import { ITEMS_PER_PAGE, DEFAULT_PROFILE_IMAGE } from './config/ui';

// إعادة تصدير الثوابت الرئيسية
export { API_BASE_URL, API_ROOT_URL };
export { APP_NAME, APP_VERSION, APP_DESCRIPTION };
export { DEFAULT_LOCALE, SUPPORTED_LOCALES };
export { ITEMS_PER_PAGE, DEFAULT_PROFILE_IMAGE };

// إعدادات التطبيق العامة
export const APP_CONFIG = {
  siteName: 'TeachSpace',
  siteDescription: 'منصة تعليمية عبر الإنترنت',
  defaultLocale: 'ar',
  supportedLocales: ['ar', 'en'],
  itemsPerPage: 10,
};

// إعدادات التحميل والملفات
export const UPLOAD_CONFIG = {
  maxFileSize: 5 * 1024 * 1024, // 5 ميجابايت
  allowedImageTypes: ['image/jpeg', 'image/png', 'image/webp'],
  allowedDocumentTypes: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
};
