/**
 * ثوابت اللغات والترجمة
 * Localization constants
 */

// إعدادات اللغة
export const DEFAULT_LOCALE = 'ar';
export const SUPPORTED_LOCALES = ['ar', 'en'];
export const RTL_LOCALES = ['ar'];

// أسماء اللغات
export const LOCALE_NAMES = {
  ar: 'العربية',
  en: 'English'
};

// اتجاه النص حسب اللغة
export const getTextDirection = (locale: string): 'rtl' | 'ltr' => {
  return RTL_LOCALES.includes(locale) ? 'rtl' : 'ltr';
};

// تنسيق التاريخ حسب اللغة
export const DATE_FORMATS = {
  ar: {
    SHORT: 'dd/MM/yyyy',
    LONG: 'dd MMMM yyyy',
    TIME: 'HH:mm',
    DATETIME: 'dd/MM/yyyy HH:mm'
  },
  en: {
    SHORT: 'MM/dd/yyyy',
    LONG: 'MMMM dd, yyyy',
    TIME: 'h:mm a',
    DATETIME: 'MM/dd/yyyy h:mm a'
  }
};
