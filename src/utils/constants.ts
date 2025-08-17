/**
 * ملف الثوابت المشتركة للتطبيق
 * يحتوي على القواميس والثوابت المستخدمة في عدة أماكن
 */

/**
 * قاموس تحويل التخصصات من الإنجليزية إلى العربية
 * مطابق للتخصصات المعرفة في نموذج TeacherProfile في الباك إند
 */
export const SPECIALIZATION_MAP: Record<string, string> = {
  'math': 'رياضيات',
  'physics': 'فيزياء',
  'chemistry': 'كيمياء',
  'biology': 'أحياء',
  'science': 'علوم عامة',
  'arabic': 'لغة عربية',
  'english': 'لغة إنجليزية',
  'french': 'لغة فرنسية',
  'german': 'لغة ألمانية',
  'spanish': 'لغة إسبانية',
  'history': 'تاريخ',
  'geography': 'جغرافيا',
  'social_studies': 'دراسات اجتماعية',
  'islamic_studies': 'دراسات إسلامية',
  'computer_science': 'علوم الحاسوب',
  'programming': 'برمجة',
  'art': 'فنون',
  'music': 'موسيقى',
  'physical_education': 'تربية بدنية',
  'special_education': 'تربية خاصة',
  'psychology': 'علم النفس',
  'economics': 'اقتصاد',
  'business': 'إدارة أعمال',
  'accounting': 'محاسبة',
  'engineering': 'هندسة',
  'medicine': 'طب',
  'pharmacy': 'صيدلة',
  'nursing': 'تمريض',
  'law': 'قانون',
  'philosophy': 'فلسفة',
  'other': 'أخرى'
};

/**
 * قاموس تحويل المستويات التعليمية من الإنجليزية إلى العربية
 */
export const TEACHING_LEVEL_MAP: Record<string, string> = {
  'primary': 'ابتدائي',
  'middle': 'متوسط',
  'secondary': 'ثانوي',
  'university': 'جامعي',
  'other': 'أخرى'
};

/**
 * دالة تحويل التخصص إلى اللغة العربية
 */
export const getSpecializationText = (specialization: string | null): string => {
  if (!specialization) return 'غير محدد';
  return SPECIALIZATION_MAP[specialization.toLowerCase()] || specialization;
};

/**
 * دالة تحويل المستوى التعليمي إلى اللغة العربية
 */
export const getTeachingLevelText = (level: string | null): string => {
  if (!level) return 'غير محدد';
  return TEACHING_LEVEL_MAP[level] || level;
};

/**
 * دالة تنسيق الأسعار بشكل موحد في جميع أنحاء التطبيق
 * @param price السعر كرقم أو نص
 * @param currency العملة (افتراضياً AED)
 * @returns السعر منسقاً مع رمز العملة
 */
export const formatPrice = (price: number | string | null | undefined, currency: string = 'AED'): string => {
  // التحقق من وجود قيمة للسعر
  if (price === null || price === undefined) {
    return `0 ${currency}`;
  }
  
  // تحويل السعر إلى رقم إذا كان نصاً
  const numericPrice = typeof price === 'string' ? parseFloat(price) : price;
  
  // التحقق من أن السعر رقم صحيح (ليس NaN)
  if (isNaN(numericPrice)) {
    return `0 ${currency}`;
  }
  
  // تنسيق الرقم بفاصلة للأرقام الكبيرة ورقمين عشريين
  const formattedPrice = numericPrice.toLocaleString('ar-AE', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  });
  
  // إرجاع السعر مع رمز العملة
  return `${formattedPrice} ${currency}`;
};


 // تنسيق النسبة المئوية
export const formatPercentage = (value: number) => {
    return new Intl.NumberFormat('ar-AE', {
      style: 'percent',
      minimumFractionDigits: 1,
      maximumFractionDigits: 1
    }).format(value / 100);
  };