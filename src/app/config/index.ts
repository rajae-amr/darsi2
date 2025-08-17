/**
 * تصدير جميع ثوابت التكوين
 * Export all configuration constants
 */

// تصدير الثوابت من الملفات المتخصصة
export * from './api';
export * from './ui';
export * from './app';
export * from './localization';

// تصدير مباشر للثوابت الرئيسية للوصول السهل
// هذا يسمح باستيرادها مباشرة من @/app/config

// تصدير مباشر لعناوين API من ملف api.ts
import { API_BASE_URL, API_ROOT_URL } from './api';
export { API_BASE_URL, API_ROOT_URL };

// ملاحظة: لا نقوم بتصدير constants.ts هنا لتجنب تكرار التصدير
// سيتم تحديث جميع الاستيرادات في التطبيق لاستخدام الملفات الجديدة
