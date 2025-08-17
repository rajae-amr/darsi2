'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Button from '@/app/components/ui/Button';
import { toast } from 'react-hot-toast';
import { login, LoginCredentials } from '@/app/services/auth';
import { useAuth } from '@/app/hooks/auth';
import SocialLoginSection from '@/app/components/auth/login/SocialLoginSection';

export const TeacherLoginForm: React.FC = () => {
  const router = useRouter();
  const { login: authLogin } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<LoginCredentials>({
    email: '',
    password: '',
    remember: false,
    user_type: 'teacher',
    is_student: false,
    is_teacher: true
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
    
    try {
      // استدعاء خدمة تسجيل الدخول
      const response = await login(formData);
      
      // التحقق من وجود رسالة خطأ
      if ('error' in response) {
        setIsLoading(false);
        const errorMessage = response.error;
        
        // التحقق من وجود مسار إعادة توجيه لنوع المستخدم غير المطابق
        if ('redirectTo' in response && response.redirectTo) {
          // إذا كان المستخدم طالبًا
          if ('userType' in response && response.userType === 'student') {
            toast.error('هذا الحساب خاص بطالب. سيتم توجيهك إلى صفحة تسجيل دخول الطلاب.');
            router.push('/auth/login/student');
          } else {
            toast.error(errorMessage);
            router.push(response.redirectTo);
          }
          return;
        }
        
        // معالجة أنواع مختلفة من رسائل الخطأ
        if (errorMessage.includes('لم يتم العثور على حساب')) {
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
        
        // عرض رسالة الخطأ إذا لم يتم عرضها بالفعل
        if (!('redirectTo' in response)) {
          toast.error(errorMessage);
        }
        return;
      }
      
      // التحقق من نوع المستخدم قبل تحديث سياق المصادقة
      if (response.user && typeof response.user === 'object') {
        if (response.user.is_teacher) {
          // إذا كان المستخدم معلمًا، نقوم بتسجيل دخوله وتوجيهه إلى لوحة التحكم الخاصة بالمعلم
          authLogin(response.user);
          toast.success('تم تسجيل الدخول بنجاح');
          router.push('/dashboard/teacher');
        } else {
          // إذا لم يكن معلمًا، نعرض رسالة خطأ ولا نقوم بتسجيل دخوله
          setIsLoading(false);
          toast.error('هذا الحساب ليس حساب معلم');
          
          // التحقق من نوع المستخدم وتوجيهه إلى النموذج المناسب
          if (response.user.is_student) {
            router.push('/auth/login/student');
          } else {
            router.push('/auth/login/type');
          }
          return; // إيقاف تنفيذ الدالة هنا لمنع تسجيل الدخول
        }
      } else {
        router.push('/dashboard');
      }
    } catch (error: unknown) {
      setIsLoading(false);
      toast.error('حدث خطأ أثناء تسجيل الدخول: ' + (error instanceof Error ? error.message : 'خطأ غير معروف'));
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {/* البريد الإلكتروني */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          البريد الإلكتروني
        </label>
        <div className="mt-1">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className={`appearance-none block w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white`}
            dir="ltr"
            value={formData.email}
            onChange={handleChange}
            disabled={isLoading}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>
      </div>

      {/* كلمة المرور */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          كلمة المرور
        </label>
        <div className="mt-1">
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className={`appearance-none block w-full px-3 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white`}
            dir="ltr"
            value={formData.password}
            onChange={handleChange}
            disabled={isLoading}
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password}</p>
          )}
        </div>
      </div>

      {/* خيارات إضافية */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember"
            type="checkbox"
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            checked={formData.remember}
            onChange={handleChange}
            disabled={isLoading}
          />
          <label htmlFor="remember-me" className="mr-2 rtl:ml-2 rtl:mr-0 block text-sm text-gray-900 dark:text-gray-300">
            تذكرني
          </label>
        </div>

        <div className="text-sm">
          <Link href="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">
            نسيت كلمة المرور؟
          </Link>
        </div>
      </div>

      {/* زر تسجيل الدخول */}
      <div>
        <Button
          type="submit"
          variant="primary"
          fullWidth={true}
          size="lg"
          disabled={isLoading}
          loading={isLoading}
        >
          {isLoading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
        </Button>
      </div>
      
      {/* قسم تسجيل الدخول باستخدام وسائل التواصل الاجتماعي */}
      <SocialLoginSection />
    </form>
  );
};

export default TeacherLoginForm;
