'use client';

import { useState } from 'react';
import { register } from '../../services/auth/index';
import { RegistrationData } from '../../providers/auth/types';
import { RegisterResponse } from '../../services/auth/types';

/**
 * هوك لإدارة عمليات تسجيل المستخدمين
 */
export function useRegistration() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // تحويل بيانات التسجيل من RegistrationData إلى RegisterData
  const convertToRegisterData = (userData: RegistrationData): Record<string, any> => {
    // إنشاء كائن لتخزين جميع البيانات
    const registerData: Record<string, any> = {
      username: userData.username || userData.email.split('@')[0],
      email: userData.email,
      password: userData.password,
      password_confirm: userData.password_confirm,
      first_name: userData.first_name,
      last_name: userData.last_name,
      user_type: userData.user_type,
      is_student: userData.is_student,
      is_teacher: userData.is_teacher,
      remember: true, // تعيين قيمة افتراضية لتذكر المستخدم
      terms_accepted: userData.terms_accepted || false
    };
    
    // إضافة بيانات الملف الشخصي للمعلم إذا كانت موجودة
    if (userData.specialization) {
      registerData.specialization = userData.specialization;
    }
    
    if (userData.years_of_experience !== undefined) {
      registerData.years_of_experience = userData.years_of_experience;
    }
    
    if (userData.teaching_levels) {
      registerData.teaching_levels = userData.teaching_levels;
    }
    
    // إضافة بيانات الملف الشخصي للطالب إذا كانت موجودة
    if (userData.education_level) {
      registerData.education_level = userData.education_level;
    }
    
    if (userData.institution) {
      registerData.institution = userData.institution;
    }
    
    console.log('بيانات التسجيل المحولة:', registerData);
    return registerData;
  };

  // تسجيل مستخدم جديد
  const handleRegister = async (userData: RegistrationData): Promise<RegisterResponse | { error?: string }> => {
    setIsRegistering(true);
    setError(null);
    
    try {
      // تحويل البيانات إلى النوع المناسب
      const registerData = convertToRegisterData(userData);
      const response = await register(registerData as any);
      
      if ('error' in response) {
        setError(response.error);
        throw new Error(response.error);
      }
      
      return response;
    } catch (error: unknown) {
      console.error('خطأ في التسجيل:', error);
      setError(error instanceof Error ? error.message : 'حدث خطأ أثناء التسجيل');
      throw error;
    } finally {
      setIsRegistering(false);
    }
  };

  return {
    handleRegister,
    isRegistering,
    error
  };
}

export default useRegistration;
