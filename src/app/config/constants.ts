/**
 * ملف الثوابت الأساسية للتطبيق
 * Application constants
 */

// عنوان API الأساسي
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// ثوابت أخرى للتطبيق
export const APP_NAME = 'TeachSpace';
export const DEFAULT_LOCALE = 'ar';
export const SUPPORTED_LOCALES = ['ar', 'en'];

// ثوابت الصور الافتراضية
export const DEFAULT_PROFILE_IMAGE = '/images/default-profile.png';
export const DEFAULT_TEACHER_IMAGE = '/images/teachers/teacher1.jpg';

// ثوابت الصفحات
export const ITEMS_PER_PAGE = 10;
