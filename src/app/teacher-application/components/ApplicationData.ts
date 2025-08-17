import { SPECIALIZATION_MAP, TEACHING_LEVEL_MAP } from '@/utils/constants';

// قائمة التخصصات من ملف الثوابت
export const specializations = Object.entries(SPECIALIZATION_MAP).map(([value, label]) => ({
  value,
  label
}));

// قائمة المستويات التعليمية من ملف الثوابت مع إضافة بعض المستويات الإضافية
export const teachingLevels = [
  ...Object.entries(TEACHING_LEVEL_MAP).map(([value, label]) => ({
    value,
    label: `المرحلة ${label}ية`
  })),
  { value: 'adult', label: 'تعليم الكبار' },
  { value: 'professional', label: 'التعليم المهني' },
  { value: 'all', label: 'جميع المستويات' }
];
