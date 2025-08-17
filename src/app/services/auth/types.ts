/**
 * أنواع وواجهات المصادقة
 */

/**
 * واجهة بيانات تسجيل الدخول
 */
export interface LoginCredentials {
  email: string;
  password: string;
  remember?: boolean;
  user_type?: 'student' | 'teacher'; // نوع المستخدم (طالب أو معلم)
  is_student?: boolean; // هل المستخدم طالب
  is_teacher?: boolean; // هل المستخدم معلم
}

/**
 * واجهة بيانات التسجيل
 */
export interface RegisterData {
  username: string;
  email: string;
  password: string;
  password_confirm: string;
  first_name?: string;
  last_name?: string;
  user_type?: 'student' | 'teacher';
  is_student?: boolean;
  is_teacher?: boolean;
  remember?: boolean;
  terms_accepted?: boolean;
}

/**
 * واجهة استجابة توكن JWT
 */
export interface TokenResponse {
  access: string;
  refresh: string;
  session_id: string;
}

/**
 * واجهة استجابة تسجيل الدخول
 */
export interface LoginResponse {
  access: string;
  refresh: string;
  session_id: string;
  user: UserProfile;
}

/**
 * واجهة استجابة التسجيل
 */
export interface RegisterResponse {
  access: string;
  refresh: string;
  session_id: string;
  user: UserProfile;
}

/**
 * واجهة استجابة خطأ تسجيل الدخول
 */
export interface LoginErrorResponse {
  error: string;
  userType?: 'student' | 'teacher';
  redirectTo?: string;
  is_student?: boolean;
  is_teacher?: boolean;
}

/**
 * واجهة استجابة خطأ التسجيل
 */
export interface RegisterErrorResponse {
  error: string;
  errors?: Record<string, string[]>;
  userType?: 'student' | 'teacher';
  redirectTo?: string;
  is_student?: boolean;
  is_teacher?: boolean;
}

/**
 * واجهة بيانات المستخدم
 */
/**
 * واجهة معلومات الاتصال
 */
export interface ContactInfo {
  website?: string;
  city?: string;
  country?: string;
  address?: string;
  postal_code?: string;
  timezone?: string;
}

/**
 * واجهة ملف المعلم
 */
export interface TeacherProfile {
  qualifications?: string;
  specialization?: string;
  years_of_experience?: number;
  teaching_levels?: string;
  subdomain?: string;
}

/**
 * واجهة ملف الطالب
 */
export interface StudentProfile {
  education_level?: string;
  institution?: string;
  enrolled_courses?: any[];
}

/**
 * واجهة روابط التواصل الاجتماعي
 */
export interface SocialLinks {
  facebook?: string;
  twitter?: string;
  linkedin?: string;
  instagram?: string;
}

/**
 * واجهة بيانات المستخدم
 */
export interface UserProfile {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  username?: string;
  profile_image?: string;
  is_teacher: boolean;
  is_student: boolean;
  is_staff?: boolean;
  is_active?: boolean;
  date_joined?: string;
  last_login?: string;
  phone_number?: string;
  bio?: string;
  
  // معلومات الاتصال
  contact_info?: ContactInfo;
  
  // روابط التواصل الاجتماعي
  social_links?: SocialLinks;
  
  // ملف المعلم (إذا كان المستخدم معلمًا)
  teacher_profile?: TeacherProfile;
  
  // ملف الطالب (إذا كان المستخدم طالبًا)
  student_profile?: StudentProfile;
}
