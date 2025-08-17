'use client';

import { useState, useCallback, useEffect } from 'react';
import { checkAuth, getCurrentUser } from '../../services/auth/index';
import toast from 'react-hot-toast';
import { UserProfile } from '../../services/auth/types';
import { useInterval } from '../useInterval';

/**
 * هوك للتحقق من صلاحية جلسة المستخدم
 */
export function useSession() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // دالة للتحقق من حالة المصادقة
  const verifyAuth = useCallback(async () => {
    // لا نقوم بالتحقق إذا لم يكن المستخدم مسجل الدخول أصلاً
    if (!isAuthenticated && !isLoading) return;
    
    try {
      const isAuth = await checkAuth();
      
      if (isAuth) {
        if (!user) {
          const userData = await getCurrentUser();
          setUser(userData);
        }
        setIsAuthenticated(true);
      } else {
        // إذا كان المستخدم مسجل الدخول سابقًا ولكن الآن غير مصادق عليه
        if (isAuthenticated) {
          setUser(null);
          setIsAuthenticated(false);
          toast.error('انتهت صلاحية جلستك. يرجى تسجيل الدخول مرة أخرى.');
        } else {
          setUser(null);
          setIsAuthenticated(false);
        }
      }
    } catch (error: unknown) {
      console.error('خطأ في التحقق من المصادقة:', error);
      
      // إذا كان المستخدم مسجل الدخول سابقًا، نقوم بتسجيل خروجه وعرض رسالة
      if (isAuthenticated) {
        setUser(null);
        setIsAuthenticated(false);
        
        // عرض رسالة toast للمستخدم عند فشل تجديد التوكن
        if (error instanceof Error) {
          if (error.message.includes('تم تسجيل دخولك من جهاز آخر')) {
            toast.error('تم تسجيل دخولك من جهاز آخر. يرجى تسجيل الدخول مرة أخرى.');
          } else {
            toast.error(error.message);
          }
        } else {
          toast.error('حدث خطأ في المصادقة. يرجى تسجيل الدخول مرة أخرى.');
        }
      }
    } finally {
      if (isLoading) {
        setIsLoading(false);
      }
    }
  }, [isAuthenticated, isLoading, user]);

  // التحقق من حالة المصادقة عند تحميل التطبيق
  useEffect(() => {
    verifyAuth();
  }, []);  
  
  // فحص دوري لصلاحية الجلسة كل 5 دقائق
  useInterval(() => {
    if (isAuthenticated) {
      verifyAuth();
    }
  }, isAuthenticated ? 300000 : null); // 300000 مللي ثانية = 5 دقائق

  // مستمع للكشف عن تسجيل الدخول من نافذة أخرى
  useEffect(() => {
    // معالج لأحداث التخزين
    const handleStorageChange = (event: StorageEvent) => {
      // التحقق من أن الحدث يتعلق بمعرف الجلسة
      if (event.key === 'sessionId') {
        if (isAuthenticated) {
          // إذا كان المستخدم مسجل الدخول وتغير معرف الجلسة
          if (event.newValue !== null && event.oldValue !== null && event.newValue !== event.oldValue) {
            // تم تسجيل الدخول من نافذة أخرى
            setUser(null);
            setIsAuthenticated(false);
            // إظهار رسالة للمستخدم باستخدام نظام الإشعارات
            toast.error('تم تسجيل دخولك من جهاز آخر. تم تسجيل خروجك من هذه النافذة لأسباب أمنية.');
          } else if (event.newValue === null) {
            // تم تسجيل الخروج من نافذة أخرى
            setUser(null);
            setIsAuthenticated(false);
          }
        }
      }
    };

    // إضافة مستمع للأحداث
    window.addEventListener('storage', handleStorageChange);

    // إزالة المستمع عند تدمير المكون
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [isAuthenticated]);

  // تسجيل الدخول
  const handleLogin = (userData: UserProfile) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  // تحديث بيانات المستخدم
  const handleRefreshUserData = async () => {
    try {
      const userData = await getCurrentUser();
      setUser(userData);
      return userData;
    } catch (error) {
      console.error('خطأ في تحديث بيانات المستخدم:', error);
      return null;
    }
  };

  return {
    user,
    setUser,
    isAuthenticated,
    setIsAuthenticated,
    isLoading,
    handleLogin,
    handleRefreshUserData,
    verifyAuth
  };
}

export default useSession;
