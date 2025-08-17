"use client";

import React, { useState, useEffect } from 'react';
import testimonialService, { TestimonialCreateRequest } from '@/app/services/testimonials/testimonialService';
import { useRouter } from 'next/navigation';
import { getAccessToken } from '@/app/services/auth/tokenService';

interface AddTestimonialProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function AddTestimonial({ onSuccess, onCancel }: AddTestimonialProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<TestimonialCreateRequest>({
    name: '',
    role: '',
    content: '',
    rating: 5,
  });
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'rating' ? parseInt(value, 10) : value
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  // التحقق من حالة تسجيل الدخول عند تحميل المكون
  useEffect(() => {
    const checkLoginStatus = () => {
      const token = getAccessToken();
      setIsLoggedIn(!!token);
    };
    
    checkLoginStatus();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    if (!isLoggedIn) {
      setError('يجب تسجيل الدخول أولاً لإضافة شهادة');
      setLoading(false);
      return;
    }

    try {
      const testimonialData: TestimonialCreateRequest = {
        ...formData
      };

      if (image) {
        testimonialData.image = image;
      }

      const result = await testimonialService.createTestimonial(testimonialData);
      
      if (result) {
        setSuccess(true);
        setFormData({
          name: '',
          role: '',
          content: '',
          rating: 5,
        });
        setImage(null);
        
        if (onSuccess) {
          onSuccess();
        }
        
        // إعادة تحميل الصفحة بعد فترة قصيرة لعرض الشهادة الجديدة (إذا تمت الموافقة عليها تلقائيًا)
        setTimeout(() => {
          router.refresh();
        }, 1500);
      } else {
        setError('حدث خطأ أثناء إرسال الشهادة. يرجى المحاولة مرة أخرى.');
      }
    } catch (err) {
      console.error('خطأ في إرسال الشهادة:', err);
      setError('حدث خطأ أثناء إرسال الشهادة. يرجى المحاولة مرة أخرى.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        {success ? 'تم إرسال شهادتك بنجاح!' : 'أضف شهادتك'}
      </h3>
      
      {success ? (
        <div className="text-green-600 dark:text-green-400 mb-4">
          شكراً لمشاركة تجربتك! سيتم مراجعة شهادتك ونشرها بعد الموافقة عليها.
        </div>
      ) : isLoggedIn === false ? (
        <div className="text-amber-600 dark:text-amber-400 p-4 border border-amber-200 dark:border-amber-800 rounded-md">
          <p className="mb-2">يجب تسجيل الدخول أولاً لإضافة شهادتك.</p>
          <button 
            onClick={() => router.push('/login')}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-700 dark:hover:bg-blue-800"
          >
            تسجيل الدخول
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="text-red-600 dark:text-red-400 p-2 border border-red-200 dark:border-red-800 rounded-md">
              {error}
            </div>
          )}
          
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              الاسم
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
              required
            />
          </div>
          
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              الدور <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              placeholder="مثال: طالب جامعي، ولي أمر، إلخ"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>
          
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              المحتوى <span className="text-red-500">*</span>
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="شاركنا تجربتك مع منصة TeachSpace..."
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>
          
          <div>
            <label htmlFor="rating" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              التقييم <span className="text-red-500">*</span>
            </label>
            <select
              id="rating"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            >
              <option value={5}>5 نجوم - ممتاز</option>
              <option value={4}>4 نجوم - جيد جداً</option>
              <option value={3}>3 نجوم - جيد</option>
              <option value={2}>2 نجوم - مقبول</option>
              <option value={1}>1 نجمة - ضعيف</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              الصورة الشخصية (اختياري)
            </label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleImageChange}
              accept="image/*"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              يفضل صورة مربعة بحجم 100×100 بكسل أو أكبر
            </p>
          </div>
          
          <div className="flex justify-end space-x-3 space-x-reverse">
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
                disabled={loading}
              >
                إلغاء
              </button>
            )}
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-700 dark:hover:bg-blue-800"
              disabled={loading}
            >
              {loading ? 'جارٍ الإرسال...' : 'إرسال الشهادة'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
