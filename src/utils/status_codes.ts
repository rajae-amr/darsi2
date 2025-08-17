/**
 * أنواع وثوابت حالات الحجز والجلسات والدفعات
 * ملف مركزي لإدارة جميع حالات النظام
 */

// تعريف أنواع حالات الحجز
export type BookingStatusType = 
  | 'pending_teacher_confirmation' 
  | 'pending_payment'
  | 'confirmed'
  | 'completed'
  | 'cancelled'
  | 'rejected';

// تعريف أنواع حالات الجلسة
export type SessionStatusType = 
  | 'scheduled'
  | 'in_progress'
  | 'completed'
  | 'cancelled'
  | 'missed';

// تعريف أنواع حالات الدفعات
export type PaymentStatusType = 
  | 'completed'
  | 'pending'
  | 'failed'
  | 'refunded';

// كائن يحتوي على جميع حالات الحجز
export const BOOKING_STATUS = {
  PENDING_TEACHER_CONFIRMATION: 'pending_teacher_confirmation' as BookingStatusType,
  PENDING_PAYMENT: 'pending_payment' as BookingStatusType,
  CONFIRMED: 'confirmed' as BookingStatusType,
  COMPLETED: 'completed' as BookingStatusType,
  CANCELLED: 'cancelled' as BookingStatusType,
  REJECTED: 'rejected' as BookingStatusType,
};

// كائن يحتوي على جميع حالات الجلسة
export const SESSION_STATUS = {
  SCHEDULED: 'scheduled' as SessionStatusType,
  IN_PROGRESS: 'in_progress' as SessionStatusType,
  COMPLETED: 'completed' as SessionStatusType,
  CANCELLED: 'cancelled' as SessionStatusType,
  MISSED: 'missed' as SessionStatusType,
};

// كائن يحتوي على جميع حالات الدفعات
export const PAYMENT_STATUS = {
  COMPLETED: 'completed' as PaymentStatusType,
  PENDING: 'pending' as PaymentStatusType,
  FAILED: 'failed' as PaymentStatusType,
  REFUNDED: 'refunded' as PaymentStatusType,
};

// كائن يحتوي على النصوص العربية لحالات الحجز
export const BOOKING_STATUS_TEXT = {
  [BOOKING_STATUS.PENDING_TEACHER_CONFIRMATION]: 'قيد انتظار موافقتك',
  [BOOKING_STATUS.PENDING_PAYMENT]: 'بانتظار الدفع',
  [BOOKING_STATUS.CONFIRMED]: 'مؤكد',
  [BOOKING_STATUS.COMPLETED]: 'مكتمل',
  [BOOKING_STATUS.CANCELLED]: 'ملغي',
  [BOOKING_STATUS.REJECTED]: 'مرفوض',
};

// كائن يحتوي على النصوص العربية لحالات الجلسة
export const SESSION_STATUS_TEXT = {
  [SESSION_STATUS.SCHEDULED]: 'مجدولة',
  [SESSION_STATUS.IN_PROGRESS]: 'قيد التنفيذ',
  [SESSION_STATUS.COMPLETED]: 'مكتملة',
  [SESSION_STATUS.CANCELLED]: 'ملغية',
  [SESSION_STATUS.MISSED]: 'فائتة',
};

// كائن يحتوي على النصوص العربية لحالات الدفعات
export const PAYMENT_STATUS_TEXT = {
  [PAYMENT_STATUS.COMPLETED]: 'ناجح',
  [PAYMENT_STATUS.PENDING]: 'قيد المعالجة',
  [PAYMENT_STATUS.FAILED]: 'فشل',
  [PAYMENT_STATUS.REFUNDED]: 'مسترجع',
};

// كائن يحتوي على ألوان شارات حالات الحجز
export const BOOKING_STATUS_BADGE_COLORS = {
  [BOOKING_STATUS.PENDING_TEACHER_CONFIRMATION]: 'bg-yellow-100 text-yellow-800 border border-yellow-200',
  [BOOKING_STATUS.PENDING_PAYMENT]: 'bg-purple-100 text-purple-800 border border-purple-200',
  [BOOKING_STATUS.CONFIRMED]: 'bg-primary-100 text-primary-800 border border-primary-200',
  [BOOKING_STATUS.COMPLETED]: 'bg-green-100 text-green-800 border border-green-200',
  [BOOKING_STATUS.CANCELLED]: 'bg-red-100 text-red-800 border border-red-200',
  [BOOKING_STATUS.REJECTED]: 'bg-orange-100 text-orange-800 border border-orange-200',
};

// كائن يحتوي على ألوان شارات حالات الجلسة
export const SESSION_STATUS_BADGE_COLORS = {
  [SESSION_STATUS.SCHEDULED]: 'bg-blue-100 text-blue-800 border border-blue-200',
  [SESSION_STATUS.IN_PROGRESS]: 'bg-teal-100 text-teal-800 border border-teal-200',
  [SESSION_STATUS.COMPLETED]: 'bg-green-100 text-green-800 border border-green-200',
  [SESSION_STATUS.CANCELLED]: 'bg-red-100 text-red-800 border border-red-200',
  [SESSION_STATUS.MISSED]: 'bg-gray-100 text-gray-800 border border-gray-200',
};

// كائن يحتوي على ألوان شارات حالات الدفعات
export const PAYMENT_STATUS_BADGE_COLORS = {
  [PAYMENT_STATUS.COMPLETED]: 'bg-green-100 text-green-800 border border-green-200',
  [PAYMENT_STATUS.PENDING]: 'bg-yellow-100 text-yellow-800 border border-yellow-200',
  [PAYMENT_STATUS.FAILED]: 'bg-red-100 text-red-800 border border-red-200',
  [PAYMENT_STATUS.REFUNDED]: 'bg-blue-100 text-blue-800 border border-blue-200',
};

// دوال للحصول على النص العربي لحالة الحجز
export const getStatusBookingText = (status: string): string => {
  return BOOKING_STATUS_TEXT[status as BookingStatusType] || status;
};

// دوال للحصول على لون شارة حالة الحجز
export const getStatusBookingBadgeColor = (status: string): string => {
  return BOOKING_STATUS_BADGE_COLORS[status as BookingStatusType] || 'bg-gray-100 text-gray-800 border border-gray-200';
};

// دوال للحصول على النص العربي لحالة الجلسة
export const getSessionStatusText = (status: string): string => {
  return SESSION_STATUS_TEXT[status as SessionStatusType] || status;
};

// دوال للحصول على لون شارة حالة الجلسة
export const getSessionStatusBadgeColor = (status: string): string => {
  return SESSION_STATUS_BADGE_COLORS[status as SessionStatusType] || 'bg-gray-100 text-gray-800 border border-gray-200';
};

// دوال للحصول على النص العربي لحالة الدفعة
export const getPaymentStatusText = (status: string): string => {
  return PAYMENT_STATUS_TEXT[status as PaymentStatusType] || status;
};

// دوال للحصول على لون شارة حالة الدفعة
export const getPaymentStatusBadgeColor = (status: string): string => {
  return PAYMENT_STATUS_BADGE_COLORS[status as PaymentStatusType] || 'bg-gray-100 text-gray-800 border border-gray-200';
};