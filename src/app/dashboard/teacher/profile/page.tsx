'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/hooks/auth';
import { updateUserProfile } from '@/app/services/auth/userService';
import Button from '@/app/components/ui/Button';
import { UserProfile } from '@/app/services/auth/types';
import { Spinner } from '@/app/components/ui/Spinner';

// استيراد المكونات
// استيراد المكونات
import {
  BasicInfo,
  ContactInfo,
  SocialLinks,
  TeacherInfo,
  ProfilePicture,
  ProfileActions
} from '@/app/components/dashboard/profile/shared';

export default function ProfilePage() {
  const { user, isAuthenticated, isLoading, refreshUserData } = useAuth();
  const router = useRouter();
  
  const [formData, setFormData] = useState<Partial<UserProfile>>({
    first_name: '',
    last_name: '',
    email: '',
    username: '',
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
  // إضافة مؤقت لإخفاء الإشعارات بعد فترة معينة
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(null);
      }, 3000); // إخفاء رسالة النجاح بعد 3 ثوانٍ
      
      return () => clearTimeout(timer);
    }
  }, [successMessage]);
  
  // إضافة مؤقت لإخفاء رسائل الخطأ بعد فترة معينة
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 5000); // إخفاء رسالة الخطأ بعد 5 ثوانٍ
      
      return () => clearTimeout(timer);
    }
  }, [error]);

  // حماية المسار - التأكد من المصادقة
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/auth/login');
    }
  }, [isAuthenticated, isLoading, router]);

  // تحميل بيانات المستخدم عند تحميل الصفحة
  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        email: user.email || '',
        username: user.username || '',
      });
    }
  }, [user]);

  // تحميل بيانات المستخدم عند تحميل الصفحة
  useEffect(() => {
    if (user) {
      // تعبئة جميع البيانات المتاحة من المستخدم
      setFormData({
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        email: user.email || '',
        username: user.username || '',
        phone_number: user.phone_number || '',
        bio: user.bio || '',
        contact_info: {
          address: user.contact_info?.address || '',
          city: user.contact_info?.city || '',
          country: user.contact_info?.country || '',
          postal_code: user.contact_info?.postal_code || '',
          website: user.contact_info?.website || '',
          timezone: user.contact_info?.timezone || ''
        },
        social_links: user.social_links || {
          facebook: '',
          twitter: '',
          linkedin: '',
          instagram: ''
        },
        teacher_profile: user.teacher_profile || {},
        student_profile: user.student_profile || {}
      });
    }
  }, [user]);

  // معالجة حفظ التغييرات
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);
    setSuccessMessage(null);

    try {
      // طباعة البيانات قبل الإرسال للتصحيح
      console.log('البيانات التي سيتم إرسالها:', formData);
      
      await updateUserProfile(formData);
      setSuccessMessage('تم تحديث الملف الشخصي بنجاح');
      setIsEditing(false);
      
      // تحديث بيانات المستخدم في السياق
      if (refreshUserData) {
        await refreshUserData();
      }
    } catch (err: any) {
      // عرض رسالة خطأ أكثر تفصيلاً
      let errorMessage = 'حدث خطأ أثناء تحديث الملف الشخصي';
      
      console.log('تفاصيل الخطأ:', err);
      
      try {
        // التحقق من وجود بيانات الخطأ المخصصة
        if (err.errorData) {
          const errorData = err.errorData;
          
          // معالجة خاصة لخطأ النطاق الفرعي المكرر
          if (errorData.teacher_profile && errorData.teacher_profile.subdomain) {
            errorMessage = 'النطاق الفرعي مستخدم بالفعل من قبل معلم آخر. الرجاء اختيار نطاق فرعي آخر.';
          } else {
            // معالجة الأخطاء الأخرى
            errorMessage = 'حدث خطأ أثناء تحديث الملف الشخصي:';
            
            // تجميع جميع رسائل الخطأ من مختلف الحقول
            Object.entries(errorData).forEach(([key, value]) => {
              if (typeof value === 'object' && value !== null) {
                Object.entries(value as Record<string, any>).forEach(([subKey, subValue]) => {
                  if (Array.isArray(subValue) && subValue.length > 0) {
                    errorMessage += `\n${subKey}: ${subValue.join('، ')}`;
                  }
                });
              } else if (Array.isArray(value) && value.length > 0) {
                errorMessage += `\n${key}: ${value.join('، ')}`;
              }
            });
          }
        } else {
          // محاولة استخراج بيانات الخطأ من نص الخطأ
          if (err.message) {
            console.log('محاولة استخراج بيانات JSON من رسالة الخطأ:', err.message);
            
            // محاولة العثور على نص JSON في رسالة الخطأ
            const startIndex = err.message.indexOf('{');
            const endIndex = err.message.lastIndexOf('}');
            
            if (startIndex !== -1 && endIndex !== -1 && startIndex < endIndex) {
              try {
                const jsonStr = err.message.substring(startIndex, endIndex + 1);
                const errorData = JSON.parse(jsonStr);
                console.log('تم استخراج بيانات الخطأ:', errorData);
                
                // معالجة خاصة لخطأ النطاق الفرعي المكرر
                if (errorData.teacher_profile && errorData.teacher_profile.subdomain) {
                  errorMessage = 'النطاق الفرعي مستخدم بالفعل من قبل معلم آخر. الرجاء اختيار نطاق فرعي آخر.';
                }
              } catch (parseError) {
                console.error('خطأ في تحليل بيانات الخطأ:', parseError);
              }
            }
          }
          
          // إذا لم يتم تحديد رسالة خطأ مخصصة، نستخدم رسالة الخطأ العادية
          if (errorMessage === 'حدث خطأ أثناء تحديث الملف الشخصي' && err.message) {
            errorMessage = `خطأ في تحديث الملف الشخصي: ${err.message}`;
          }
        }
      } catch (parseError) {
        console.error('خطأ في معالجة الخطأ:', parseError);
        if (err.message) {
          errorMessage = `خطأ في تحديث الملف الشخصي: ${err.message}`;
        }
      }
      
      setError(errorMessage);
      console.error('خطأ في تحديث الملف الشخصي:', err);
    } finally {
      setIsSaving(false);
    }
  };

  // عرض شاشة تحميل أثناء التحقق من المصادقة
  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Spinner size="lg" className="text-blue-600 dark:text-blue-400" />
      </div>
    );
  }

  // معالجة تغيير جميع أنواع الحقول (نص، منطقة نص، قائمة منسدلة)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>, nestedField?: string) => {
    const { name, value } = e.target;
    
    if (nestedField) {
      // للحقول المتداخلة مثل social_links و teacher_profile و student_profile
      setFormData(prev => {
        const updatedData = { ...prev };
        
        if (nestedField === 'social_links') {
          updatedData.social_links = {
            ...(updatedData.social_links || {}),
            [name]: value
          };
        } else if (nestedField === 'teacher_profile') {
          updatedData.teacher_profile = {
            ...(updatedData.teacher_profile || {}),
            [name]: value
          };
        } else if (nestedField === 'student_profile') {
          updatedData.student_profile = {
            ...(updatedData.student_profile || {}),
            [name]: value
          };
        }
        
        return updatedData;
      });
    } else {
      // للحقول العادية
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  return (
    <div className="p-6">
      <div className="mx-auto max-w-4xl">
        <h1 className=" mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">الملف الشخصي</h1>
        
        {error && (
          <div className="relative mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-300">
            <span className="block pr-8">{error}</span>
            <Button
              variant="flat"
              onClick={() => setError(null)}
              className="absolute right-1 top-1 min-w-0 bg-transparent p-1 text-red-600 hover:text-red-700 dark:text-red-300"
              size="sm"
            >
              <span className="text-lg">&times;</span>
            </Button>
          </div>
        )}
        
        {successMessage && (
          <div className="relative mb-4 rounded-md border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-700 dark:border-green-800 dark:bg-green-900/20 dark:text-green-300">
            <span className="block pr-8">{successMessage}</span>
            <Button
              variant="flat"
              onClick={() => setSuccessMessage(null)}
              className="absolute right-1 top-1 min-w-0 bg-transparent p-1 text-green-600 hover:text-green-700 dark:text-green-300"
              size="sm"
            >
              <span className="text-lg">&times;</span>
            </Button>
          </div>
        )}
        
        {/* أزرار التحكم */}
        <ProfileActions 
          isEditing={isEditing} 
          setIsEditing={setIsEditing} 
          handleSubmit={handleSubmit}
          isSubmitting={isSaving}
        />
        
        {/* صورة الملف الشخصي */}
        <ProfilePicture user={user} />
        
        {/* المعلومات الأساسية */}
        <BasicInfo 
          user={user} 
          isEditing={isEditing} 
          formData={formData} 
          handleChange={handleChange} 
        />
        
        {/* معلومات الاتصال */}
        <ContactInfo 
          user={user} 
          isEditing={isEditing} 
          formData={formData} 
          handleChange={handleChange} 
        />
        
        {/* روابط التواصل الاجتماعي */}
        <SocialLinks 
          user={user} 
          isEditing={isEditing} 
          formData={formData} 
          handleChange={handleChange} 
        />
        
        {/* معلومات المعلم (تظهر فقط للمعلمين) */}
        <TeacherInfo 
          user={user} 
          isEditing={isEditing} 
          formData={formData} 
          handleChange={handleChange} 
        />
        
       
       
      </div>
    </div>
  );
}
