/**
 * ثوابت واجهة المستخدم
 * UI constants
 */

// ثوابت الصور الافتراضية
export const DEFAULT_PROFILE_IMAGE = '/images/default-profile.png';
export const DEFAULT_TEACHER_IMAGE = '/images/teachers/teacher1.jpg';
export const DEFAULT_STUDENT_IMAGE = '/images/students/student1.jpg';
export const DEFAULT_COURSE_IMAGE = '/images/courses/default-course.jpg';
export const DEFAULT_LOGO = '/images/logo.svg';

// ثوابت الصفحات والترقيم
export const ITEMS_PER_PAGE = 10;
export const MAX_ITEMS_PER_PAGE = 50;
export const DEFAULT_PAGE_SIZE_OPTIONS = [5, 10, 20, 50];

// ثوابت العرض والتخطيط
export const MOBILE_BREAKPOINT = 768; // بكسل
export const TABLET_BREAKPOINT = 1024; // بكسل
export const DESKTOP_BREAKPOINT = 1280; // بكسل

// ثوابت الألوان الرئيسية (متوافقة مع متغيرات CSS و Tailwind CSS)
export const THEME_COLORS = {
  // الألوان الرئيسية
  PRIMARY: {
    DEFAULT: 'blue-600', // يتوافق مع --color-primary
    HOVER: 'blue-700',   // يتوافق مع --color-primary-hover
    LIGHT: 'blue-100'    // يتوافق مع --color-primary-light
  },
  SECONDARY: {
    DEFAULT: 'gray-200',
    HOVER: 'gray-300',
    LIGHT: 'gray-50'
  },
  SUCCESS: {
    DEFAULT: 'green-500', // يتوافق مع --color-success
    HOVER: 'green-600',   // يتوافق مع --color-success-hover
    LIGHT: 'green-100'    // يتوافق مع --color-success-light
  },
  WARNING: {
    DEFAULT: 'amber-500', // يتوافق مع --color-warning
    HOVER: 'amber-600',   // يتوافق مع --color-warning-hover
    LIGHT: 'amber-100'    // يتوافق مع --color-warning-light
  },
  DANGER: {
    DEFAULT: 'red-500', // يتوافق مع --color-danger
    HOVER: 'red-600',   // يتوافق مع --color-danger-hover
    LIGHT: 'red-100'    // يتوافق مع --color-danger-light
  },
  INFO: {
    DEFAULT: 'blue-400',
    HOVER: 'blue-500',
    LIGHT: 'blue-50'
  }
};
