/**
 * نقطة دخول لخدمات المصادقة
 * تصدير كل الوظائف والأنواع من الملفات الفرعية
 */

// تصدير الأنواع الأساسية
export * from './types';

// تصدير الإعدادات
export * from './config';

// تصدير خدمات التوكن
export * from './tokenService';

// تصدير خدمات CSRF
export * from './csrfService';

// تصدير خدمات تسجيل الدخول
export * from './loginService';

// تصدير خدمات الجلسة
export * from './sessionService';

// تصدير خدمات تسجيل الخروج
export * from './logoutService';

// تصدير خدمات التسجيل (باستثناء RegisterData التي تم تصديرها من types.ts)
export { register, registerTeacher, registerStudent } from './registerService';

// تصدير خدمات المصادقة الاجتماعية
export * from './socialAuthService';

// تصدير خدمات المستخدم
export * from './userService';

// تصدير خدمات استعادة كلمة المرور
export * from './passwordResetService';

// تصدير الملف الرئيسي للمصادقة (للتوافق مع الكود القديم)
export * from './authService';
