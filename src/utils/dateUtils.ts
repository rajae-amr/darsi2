/**
 * مجموعة من الدوال المساعدة للتعامل مع التواريخ والأوقات
 * ملف موحد يجمع جميع الدوال المتعلقة بالتواريخ والأوقات
 */

// ثوابت للغات والتنسيقات
const DEFAULT_LOCALE = 'en-AE'; // اللغة الافتراضية للتنسيق
const DEFAULT_UNDEFINED_TEXT = 'غير محدد'; // النص الافتراضي للقيم غير المحددة

/**
 * تنسيق التاريخ بصيغة DD/MM/YYYY
 * @param dateString التاريخ كنص
 * @returns التاريخ منسقاً أو "غير محدد" إذا كان فارغاً
 */
export const formatDateShort = (dateString?: string): string => {
  if (!dateString) return DEFAULT_UNDEFINED_TEXT;
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return DEFAULT_UNDEFINED_TEXT;
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // الشهور تبدأ من 0
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  } catch {
    return DEFAULT_UNDEFINED_TEXT;
  }
};

/**
 * تنسيق التاريخ بالصيغة العربية (DD/MM/YYYY)
 * @param dateString سلسلة التاريخ
 * @param emptyText النص الذي يظهر إذا كان التاريخ فارغاً
 * @returns التاريخ المنسق
 */
export const formatDate = (dateString?: string, emptyText: string = DEFAULT_UNDEFINED_TEXT): string => {
  if (!dateString) return emptyText;
  
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return emptyText;
    
    // تنسيق التاريخ بالعربية
    return date.toLocaleDateString(DEFAULT_LOCALE, {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      calendar: 'gregory' // تحديد التقويم الميلادي بشكل صريح
    });
  } catch {
    return emptyText;
  }
};

/**
 * تنسيق التاريخ بصيغة مفصلة (اليوم، التاريخ الكامل)
 * @param dateString التاريخ كنص
 * @param emptyText النص الذي يظهر إذا كان التاريخ فارغاً
 * @returns التاريخ منسقاً بشكل مفصل
 */
export const formatDateLong = (dateString?: string, emptyText: string = DEFAULT_UNDEFINED_TEXT): string => {
  if (!dateString) return emptyText;
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return emptyText;
    return date.toLocaleDateString(DEFAULT_LOCALE, { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      calendar: 'gregory' // تحديد التقويم الميلادي بشكل صريح
    });
  } catch {
    return emptyText;
  }
};

/**
 * تنسيق الوقت بصيغة HH:MM
 * @param timeString الوقت كنص
 * @param emptyText النص الذي يظهر إذا كان الوقت فارغاً
 * @returns الوقت منسقاً
 */
export const formatTime = (timeString?: string, emptyText: string = DEFAULT_UNDEFINED_TEXT): string => {
  if (!timeString) return emptyText;
  try {
    // استخراج الوقت فقط من التاريخ والوقت
    const date = new Date(timeString);
    if (isNaN(date.getTime())) {
      // إذا كان التنسيق مثل "HH:MM" أو "HH:MM:SS" بدون تاريخ
      if (typeof timeString === 'string' && timeString.includes(':')) {
        // تقسيم السلسلة بناءً على النقطتين
        const parts = timeString.split(':');
        if (parts.length >= 2) {
          // استخراج الساعات والدقائق فقط وتنسيقهما
          const hours = parts[0].padStart(2, '0');
          const minutes = parts[1].padStart(2, '0');
          return `${hours}:${minutes}`;
        }
      }
      return emptyText;
    }
    
    // تنسيق الوقت بصيغة HH:MM
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  } catch {
    return emptyText;
  }
};

/**
 * تنسيق الوقت بالصيغة العربية مع خيار 12/24 ساعة
 * @param timeString سلسلة الوقت
 * @param hour12 استخدام نظام 12 ساعة بدلاً من 24 ساعة
 * @param emptyText النص الذي يظهر إذا كان الوقت فارغاً
 * @returns الوقت المنسق
 */
export const formatTimeLocale = (timeString?: string, hour12: boolean = true, emptyText: string = DEFAULT_UNDEFINED_TEXT): string => {
  if (!timeString) return emptyText;
  
  try {
    let date: Date;
    
    // التحقق من تنسيق الوقت ومعالجته بشكل مناسب
    if (typeof timeString === 'string' && timeString.includes(':') && !timeString.includes('T')) {
      // إذا كان التنسيق مثل "HH:MM" أو "HH:MM:SS" بدون تاريخ
      const parts = timeString.split(':');
      if (parts.length >= 2) {
        // استخراج الساعات والدقائق فقط
        const hours = parts[0].padStart(2, '0');
        const minutes = parts[1].padStart(2, '0');
        // إنشاء تاريخ وهمي مع الوقت المستخرج
        date = new Date(`2023-01-01T${hours}:${minutes}:00`);
      } else {
        return emptyText;
      }
    } else {
      // محاولة تحليل التاريخ بالطريقة العادية
      date = new Date(timeString);
    }
    
    if (isNaN(date.getTime())) return emptyText;
    
    // تنسيق الوقت بالعربية
    return date.toLocaleTimeString(DEFAULT_LOCALE, {
      hour: '2-digit',
      minute: '2-digit',
      hour12: hour12,
      calendar: 'gregory' // تحديد التقويم الميلادي بشكل صريح
    });
  } catch {
    return emptyText;
  }
};

/**
 * تنسيق الوقت مع إضافة وصف توضيحي
 * @param timeString الوقت كنص
 * @param label وصف توضيحي اختياري
 * @param emptyText النص الذي يظهر إذا كان الوقت فارغاً
 * @returns الوقت منسقاً مع الوصف
 */
export const formatTimeWithLabel = (timeString?: string, label: string = '', emptyText: string = DEFAULT_UNDEFINED_TEXT): string => {
  const formattedTime = formatTime(timeString, emptyText);
  // إضافة الوصف التوضيحي إذا كان موجوداً وكان الوقت صالحاً
  return (label && formattedTime !== emptyText) ? `${formattedTime} (${label})` : formattedTime;
};

/**
 * تنسيق التاريخ والوقت معًا بالصيغة العربية
 * @param dateTimeString سلسلة التاريخ والوقت
 * @param emptyText النص الذي يظهر إذا كان التاريخ والوقت فارغين
 * @returns التاريخ والوقت المنسقين
 */
export const formatDateTime = (dateTimeString?: string, emptyText: string = DEFAULT_UNDEFINED_TEXT): string => {
  if (!dateTimeString) return emptyText;
  
  try {
    const date = new Date(dateTimeString);
    if (isNaN(date.getTime())) return emptyText;
    
    // تنسيق التاريخ والوقت بالعربية مع تحديد التقويم الميلادي بشكل صريح
    return date.toLocaleDateString(DEFAULT_LOCALE, {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      calendar: 'gregory' // تحديد التقويم الميلادي بشكل صريح
    });
  } catch {
    return emptyText;
  }
};

/**
 * حساب المدة بين وقتين بالدقائق
 * @param startTime وقت البداية
 * @param endTime وقت النهاية
 * @returns المدة بالدقائق أو صفر إذا كانت المدخلات غير صالحة
 */
export const calculateDurationMinutes = (startTime?: string, endTime?: string): number => {
  if (!startTime || !endTime) return 0;
  
  try {
    const start = new Date(startTime);
    const end = new Date(endTime);
    
    if (isNaN(start.getTime()) || isNaN(end.getTime())) return 0;
    
    const durationMs = end.getTime() - start.getTime();
    return Math.round(durationMs / (1000 * 60));
  } catch {
    return 0;
  }
};

/**
 * تحويل التاريخ إلى سلسلة بتنسيق ISO
 * @param date كائن التاريخ
 * @returns سلسلة التاريخ بتنسيق ISO
 */
export const toISOString = (date: Date): string => {
  return date.toISOString();
};

/**
 * الحصول على تاريخ اليوم بتنسيق YYYY-MM-DD
 * @returns تاريخ اليوم بتنسيق YYYY-MM-DD
 */
export const getTodayDateString = (): string => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * التحقق مما إذا كان التاريخ في المستقبل
 * @param dateString التاريخ كنص
 * @returns true إذا كان التاريخ في المستقبل
 */
export const isFutureDate = (dateString?: string): boolean => {
  if (!dateString) return false;
  
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return false;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0); // تعيين الوقت إلى بداية اليوم للمقارنة الدقيقة
    
    return date >= today;
  } catch {
    return false;
  }
};

/**
 * التحقق مما إذا كان التاريخ في الماضي
 * @param dateString التاريخ كنص
 * @returns true إذا كان التاريخ في الماضي
 */
export const isPastDate = (dateString?: string): boolean => {
  if (!dateString) return false;
  
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return false;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0); // تعيين الوقت إلى بداية اليوم للمقارنة الدقيقة
    
    return date < today;
  } catch {
    return false;
  }
};

// تحويل مدة الجلسة من دقائق إلى نص مقروء

export const formatDuration = (minutes: number): string => {
  if (minutes < 60) {
    return `${minutes} دقيقة`;
  } else {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    if (remainingMinutes === 0) {
      return `${hours} ${hours === 1 ? 'ساعة' : 'ساعات'}`;
    } else {
      return `${hours} ${hours === 1 ? 'ساعة' : 'ساعات'} و ${remainingMinutes} دقيقة`;
    }
  }
};