'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { login, LoginCredentials, LoginResponse } from '@/app/services/auth';
import { useAuth } from '@/app/hooks/auth';

export const useLoginForm = () => {
  const router = useRouter();
  const { login: authLogin } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<LoginCredentials>({
    email: '',
    password: '',
    remember: false
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // التعامل مع تغيير قيم النموذج
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // إزالة الخطأ عند تغيير القيمة
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // التحقق من صحة النموذج
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.email) {
      newErrors.email = 'البريد الإلكتروني مطلوب';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'يرجى إدخال بريد إلكتروني صحيح';
    }
    
    if (!formData.password) {
      newErrors.password = 'كلمة المرور مطلوبة';
    } else if (formData.password.length < 8) {
      newErrors.password = 'كلمة المرور يجب أن تكون 8 أحرف على الأقل';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // معالجة تقديم النموذج
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    // استدعاء خدمة تسجيل الدخول
    const response = await login(formData);
    
    // التحقق من وجود خطأ
    if ('error' in response) {
      setIsLoading(false);
      
      // تحسين عرض رسائل الخطأ
      const errorMessage = response.error;
      
      // معالجة أنواع محددة من الأخطاء
      if (errorMessage.includes('لم يتم العثور على حساب نشط')) {
        setErrors({
          ...errors,
          email: 'تأكد من صحة البريد الإلكتروني',
          password: 'تأكد من صحة كلمة المرور'
        });
      } else if (errorMessage.includes('البريد الإلكتروني أو كلمة المرور غير صحيحة')) {
        setErrors({
          ...errors,
          email: 'تأكد من صحة البريد الإلكتروني',
          password: 'تأكد من صحة كلمة المرور'
        });
      }
      
      // عرض رسالة الخطأ
      toast.error(errorMessage);
      return;
    }
    
    // الآن نحن متأكدون من أن الاستجابة هي LoginResponse وليست كائن خطأ
    const loginResponse = response as LoginResponse;
    
    // تحديث سياق المصادقة
    authLogin(loginResponse.user);
    
    // عرض رسالة نجاح
    toast.success('تم تسجيل الدخول بنجاح');
    
    // التحقق من وجود بيانات المستخدم وتوجيهه حسب نوعه
    if (loginResponse.user && typeof loginResponse.user === 'object') {
      if (loginResponse.user.is_teacher) {
        router.push('/dashboard/teacher');
      } else if (loginResponse.user.is_student) {
        router.push('/dashboard/student');
      } else {
        router.push('/dashboard');
      }
    } else {
      router.push('/dashboard');
    }
  };

  return {
    formData,
    errors,
    isLoading,
    handleChange,
    handleSubmit
  };
};

export default useLoginForm;
