'use client';

import { useState } from 'react';
import { registerWithGoogle, registerWithFacebook } from '../../services/auth/index';

/**
 * هوك لإدارة عمليات المصادقة الاجتماعية
 */
export function useSocialAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // التسجيل باستخدام Google
  const handleRegisterWithGoogle = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      return await registerWithGoogle();
    } catch (error: unknown) {
      console.error('خطأ في التسجيل باستخدام Google:', error);
      setError(error instanceof Error ? error.message : 'حدث خطأ أثناء التسجيل باستخدام Google');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // التسجيل باستخدام Facebook
  const handleRegisterWithFacebook = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      return await registerWithFacebook();
    } catch (error: unknown) {
      console.error('خطأ في التسجيل باستخدام Facebook:', error);
      setError(error instanceof Error ? error.message : 'حدث خطأ أثناء التسجيل باستخدام Facebook');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleRegisterWithGoogle,
    handleRegisterWithFacebook,
    isLoading,
    error
  };
}

export default useSocialAuth;
