// أنواع البيانات المستخدمة في خدمة المعلمين

// نموذج ملف المعلم الشخصي
export interface TeacherProfile {
  specialization: string | null;
  qualifications: string | null;
  years_of_experience: number | null;
  teaching_levels: string | null;
  subdomain: string | null;
  average_rating: number | null;
  rating_count: number | null;
  teaching_quality_avg: number | null;
  communication_avg: number | null;
  punctuality_avg: number | null;
  is_featured: boolean;
  is_verified: boolean;
  telegram_username?: string | null;
  whatsapp_number?: string | null;
}

// نموذج جدول التوفر
export interface AvailabilitySchedule {
  id: number;
  title: string;
  day_of_week: number;
  day_of_week_display: string;
  start_time: string;
  end_time: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// نموذج خبرة المعلم المفصلة
export interface TeacherExperienceDetail {
  id?: number;
  title: string;
  institution?: string;
  description: string;
  years: number;
  start_date?: string;
  end_date?: string;
  is_current?: boolean;
}

// نموذج المعلم
export interface Teacher {
  id: number;
  username: string;
  display_name: string;
  bio: string | null;
  profile_image: string | null;
  phone_number: string | null;
  teacher_profile: TeacherProfile;
  experiences?: TeacherExperienceDetail[];
  contact_info?: {
    website?: string;
    city?: string;
    country?: string;
    address?: string;
    postal_code?: string;
  };
  social_links?: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
  services?: Service[];
  availability_schedules?: AvailabilitySchedule[];
}

// نموذج الخدمة التعليمية
export interface Service {
  id: number;
  name: string;
  description: string;
  duration: number; // المدة بالدقائق
  price: number;
  is_active: boolean;
}

// نموذج فلترة المعلمين
export interface TeacherFilters {
  specialization?: string;
  teaching_level?: string;
  search?: string;
  page?: number;
  average_rating?: string;
  experience?: string;
  min_price?: string;
  max_price?: string;
}

// نموذج الاستجابة المقسمة إلى صفحات
export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
