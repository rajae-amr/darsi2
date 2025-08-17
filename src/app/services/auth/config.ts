/**
 * ملف التكوين الموحد للتطبيق
 */

// عنوان API الأساسي
export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// مسارات API للمصادقة
export const AUTH_ENDPOINTS = {
  LOGIN: `${API_URL}/api/auth/login/`,  // تم تصحيح المسار ليتوافق مع الباك إند
  LOGIN_TEACHER: `${API_URL}/api/auth/login/teacher/`, // مسار تسجيل دخول المعلمين
  LOGIN_STUDENT: `${API_URL}/api/auth/login/student/`, // مسار تسجيل دخول الطلاب
  REGISTER: `${API_URL}/api/auth/register/`,
  REGISTER_TEACHER: `${API_URL}/api/auth/register/teacher/`, // مسار تسجيل المعلمين
  REGISTER_STUDENT: `${API_URL}/api/auth/register/student/`, // مسار تسجيل الطلاب
  LOGOUT: `${API_URL}/api/auth/logout/`,  // نقطة نهاية تسجيل الخروج
  REFRESH_TOKEN: `${API_URL}/api/auth/refresh-token/`,
  VERIFY_TOKEN: `${API_URL}/api/auth/verify-token/`,
  PROFILE: `${API_URL}/api/auth/profile/`,
  CSRF: `${API_URL}/api/auth/csrf-token/`,  // نقطة نهاية مخصصة للحصول على رمز CSRF
  GOOGLE_AUTH: `${API_URL}/api/auth/google/`,
  FACEBOOK_AUTH: `${API_URL}/api/auth/facebook/`,
  // إضافة مسارات إعادة تعيين كلمة المرور
  PASSWORD_RESET_REQUEST: `${API_URL}/api/auth/password-reset/request/`,
  PASSWORD_RESET_VERIFY: `${API_URL}/api/auth/password-reset/verify/`,
  PASSWORD_RESET_CONFIRM: `${API_URL}/api/auth/password-reset/confirm/`,
};

// مفاتيح التخزين
export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
  SESSION_ID: 'sessionId',
};

// إعدادات المصادقة
export const AUTH_TOKEN_NAME = 'auth_token';
export const REFRESH_TOKEN_NAME = 'refresh_token';

// مدة صلاحية التوكن (بالمللي ثانية)
export const ACCESS_TOKEN_LIFETIME = 15 * 60 * 1000; // 15 دقيقة
export const REFRESH_TOKEN_LIFETIME = 7 * 24 * 60 * 60 * 1000; // 7 أيام

// مسارات المصادقة
export const LOGIN_ROUTE = '/auth/login';
export const REGISTER_ROUTE = '/auth/register';
export const FORGOT_PASSWORD_ROUTE = '/auth/forgot-password';
export const RESET_PASSWORD_ROUTE = '/auth/reset-password';

// مسارات لوحة التحكم
export const DASHBOARD_ROUTE = '/dashboard';

// إعدادات المصادقة الاجتماعية
export const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '';
export const FACEBOOK_APP_ID = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID || '';

