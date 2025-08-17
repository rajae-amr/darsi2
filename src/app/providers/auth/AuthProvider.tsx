'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { logout } from '../../services/auth/index';
import { storeToken } from '../../services/auth/tokenService';
import AuthContext from './AuthContext';
import { useSession } from '../../hooks/auth/useSession';
import { useRegistration } from '../../hooks/auth/useRegistration';
import { useSocialAuth } from '../../hooks/auth/useSocialAuth';
import { RegistrationData } from './types';
import { UserProfile, RegisterResponse } from '../../services/auth/types';

/**
 * مزود سياق المصادقة
 * يوفر حالة المصادقة والوظائف المتعلقة بها لجميع المكونات الفرعية
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  
  // استخدام الهوكات المخصصة
  const { 
    user, 
    isAuthenticated, 
    isLoading, 
    handleLogin, 
    handleRefreshUserData,
    setIsAuthenticated,
    setUser
  } = useSession();
  
  const { handleRegister } = useRegistration();
  const { handleRegisterWithGoogle, handleRegisterWithFacebook } = useSocialAuth();

  // تسجيل الخروج
  const handleLogout = async () => {
    try {
      // استدعاء دالة تسجيل الخروج غير المتزامنة
      const logoutSuccess = await logout();
      
      // إعادة تعيين حالة المستخدم والمصادقة
      setUser(null);
      setIsAuthenticated(false);
      
      // توجيه المستخدم إلى الصفحة الرئيسية
      router.push('/');
      
      // يمكن إضافة إشعار نجاح هنا باستخدام مكتبة الإشعارات مثل react-hot-toast
      // toast.success('تم تسجيل الخروج بنجاح');
    } catch (error) {
      console.error('خطأ في تسجيل الخروج:', error);
      
      // إعادة تعيين حالة المستخدم والمصادقة حتى في حالة الخطأ
      setUser(null);
      setIsAuthenticated(false);
      router.push('/');
      
      // يمكن إضافة إشعار خطأ هنا باستخدام مكتبة الإشعارات مثل react-hot-toast
      // toast.error('حدث خطأ أثناء تسجيل الخروج');
    }
  };

  // تسجيل مستخدم جديد مع تسجيل الدخول التلقائي
  const registerWithAutoLogin = async (userData: RegistrationData): Promise<UserProfile | null> => {
    try {
      const response = await handleRegister(userData);
      
      // التحقق من وجود خطأ في الاستجابة
      if ('error' in response) {
        console.error('خطأ في التسجيل:', response.error);
        throw new Error(response.error);
      }
      
      // التعامل مع الاستجابة كنوع RegisterResponse
      const registerResponse = response as RegisterResponse;
      
      // تسجيل الدخول تلقائيًا بعد التسجيل الناجح
      if (registerResponse.user) {
        // التحقق من وجود التوكن في الاستجابة
        if (registerResponse.access && registerResponse.refresh) {
          console.log('تم استلام التوكن بعد التسجيل، تسجيل الدخول تلقائيًا');
          
          // تخزين التوكن بشكل صريح هنا لضمان تخزينه بشكل صحيح
          const sessionId = registerResponse.session_id || 'register-session';
          storeToken(registerResponse.access, registerResponse.refresh, sessionId, true);
          
          // تسجيل الدخول بعد تخزين التوكن
          handleLogin(registerResponse.user);
          
          // توجيه المستخدم إلى لوحة التحكم المناسبة بناءً على نوع المستخدم
          setTimeout(() => {
            if (registerResponse.user.is_teacher) {
              router.push('/dashboard/teacher');
            } else if (registerResponse.user.is_student) {
              router.push('/dashboard/student');
            } else {
              router.push('/dashboard');
            }
          }, 500); // تأخير قليل للسماح بتحديث حالة المصادقة
        } else {
          console.warn('تم التسجيل بنجاح ولكن لم يتم استلام توكن');
          // تسجيل الدخول بدون توكن
          handleLogin(registerResponse.user);
        }
      }
      
      // تحويل الاستجابة إلى نوع UserProfile المتوقع
      return registerResponse.user || null;
    } catch (error) {
      console.error('خطأ في التسجيل:', error);
      throw error;
    }
  };

  // وظائف المصادقة الاجتماعية مع تحويل النوع
  const registerWithGoogleWrapper = async (): Promise<UserProfile | null> => {
    try {
      const response = await handleRegisterWithGoogle();
      
      // التحقق من وجود خطأ في الاستجابة
      if ('error' in response) {
        console.error('خطأ في التسجيل باستخدام Google:', response.error);
        return null;
      }
      
      // إذا كانت الاستجابة ناجحة، أعد بيانات المستخدم
      return response.user || null;
    } catch (error) {
      console.error('خطأ في التسجيل باستخدام Google:', error);
      return null;
    }
  };
  
  const registerWithFacebookWrapper = async (): Promise<UserProfile | null> => {
    try {
      const response = await handleRegisterWithFacebook();
      
      // التحقق من وجود خطأ في الاستجابة
      if ('error' in response) {
        console.error('خطأ في التسجيل باستخدام Facebook:', response.error);
        return null;
      }
      
      // إذا كانت الاستجابة ناجحة، أعد بيانات المستخدم
      return response.user || null;
    } catch (error) {
      console.error('خطأ في التسجيل باستخدام Facebook:', error);
      return null;
    }
  };

  // قيمة السياق
  const value = {
    user,
    isAuthenticated,
    isLoading,
    login: handleLogin,
    logout: handleLogout,
    register: registerWithAutoLogin,
    registerWithGoogle: registerWithGoogleWrapper,
    registerWithFacebook: registerWithFacebookWrapper,
    refreshUserData: handleRefreshUserData,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
