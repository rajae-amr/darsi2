import { UserProfile } from '../../services/auth/types';

/**
 * واجهة سياق المصادقة
 */
export interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (userData: UserProfile) => void;
  logout: () => void;
  register: (userData: RegistrationData) => Promise<UserProfile | null>;
  registerWithGoogle: () => Promise<UserProfile | null>;
  registerWithFacebook: () => Promise<UserProfile | null>;
  refreshUserData: () => Promise<UserProfile | null>;
}

/**
 * بيانات التسجيل
 */
export interface RegistrationData {
  first_name: string;
  last_name: string;
  email: string;
  username?: string;
  subdomain?: string;
  password: string;
  password_confirm: string;
  terms_accepted?: boolean;
  is_teacher?: boolean;
  is_student?: boolean;
  user_type?: 'student' | 'teacher'; // إضافة نوع المستخدم
  specialization?: string; // للمعلمين
  years_of_experience?: number; // للمعلمين
  teaching_levels?: string; // للمعلمين - مستويات التدريس
  education_level?: string; // للطلاب - المستوى التعليمي
  institution?: string; // للطلاب - المؤسسة التعليمية
}
