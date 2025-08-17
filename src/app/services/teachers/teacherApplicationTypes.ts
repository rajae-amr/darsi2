// أنواع البيانات المستخدمة في طلبات انضمام المعلمين

// حالات طلب الانضمام
export enum ApplicationStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected'
}

// نموذج خبرة تدريسية مفصلة
export interface TeacherExperienceDetail {
  title: string;           // عنوان الخبرة
  institution?: string;    // المؤسسة/الشركة
  description: string;     // وصف الخبرة
  start_date?: string;     // تاريخ البداية
  end_date?: string;       // تاريخ النهاية
  is_current?: boolean;    // هل هي الوظيفة الحالية؟
  years?: number;          // عدد سنوات الخبرة في هذه الوظيفة
}

// نموذج طلب انضمام المعلم
export interface TeacherApplication {
  id?: number;
  user?: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  whatsapp_number: string;
  telegram_username: string;
  qualifications: string;
  experience: string;
  specialization: string;
  teaching_levels: string;
  cv_file?: File | null;
  certificates_file?: File | null;
  motivation: string;
  status?: ApplicationStatus;
  admin_notes?: string;
  created_at?: string;
  updated_at?: string;
}

// نموذج إرسال طلب انضمام جديد
export interface TeacherApplicationSubmit {
  // معلومات الحساب
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string; // يتم تحويله إلى phone_number في الباك إند
  whatsapp_number: string; // يتم تحويله إلى whatsapp_number في الباك إند
  telegram_username: string; // يتم تحويله إلى telegram_number في الباك إند
  
  // معلومات طلب الانضمام
  qualifications: string;
  experience: string; // للتوافق مع النظام القديم
  experiences?: TeacherExperienceDetail[]; // مصفوفة من الخبرات المفصلة
  specialization: string;
  teaching_levels: string;
  years_of_experience?: number; // إجمالي سنوات الخبرة
  cv_file?: File | null;
  certificates_file?: File | null; // يتم تحويله إلى certificates في الباك إند
  motivation: string;
}

// نموذج استجابة حالة الطلب
export interface ApplicationStatusResponse {
  id: number;
  status: ApplicationStatus;
  admin_notes?: string;
  created_at: string;
  updated_at: string;
}

// نموذج استجابة التحقق من إمكانية تقديم طلب
export interface ApplicationCheckResponse {
  can_apply: boolean;
  reason?: string;
  status?: ApplicationStatus;
  created_at?: string;
}

// نموذج استجابة تتبع الطلب باستخدام الرقم المميز
export interface ApplicationTrackingResponse {
  found: boolean;
  message?: string;
  status?: ApplicationStatus;
  created_at?: string;
  application_id?: number;
  tracking_id?: string;
  admin_notes?: string;
}
