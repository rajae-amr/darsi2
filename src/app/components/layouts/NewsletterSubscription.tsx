"use client";

import React, { useState } from 'react';
import Button from '@/app/components/ui/Button';
import { subscribeToNewsletter } from '@/app/services/newsletter/newsletterService';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';

interface NewsletterSubscriptionProps {
  className?: string;
  buttonText?: string;
  placeholderText?: string;
  successText?: string;
  direction?: 'row' | 'column';
}

export default function NewsletterSubscription({
  className = '',
  buttonText = 'اشترك',
  placeholderText = 'البريد الإلكتروني',
  successText = 'شكرًا لك! تم الاشتراك بنجاح في النشرة البريدية',
  direction = 'row'
}: NewsletterSubscriptionProps) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // التحقق من صحة البريد الإلكتروني
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // معالجة الاشتراك في النشرة البريدية
  const handleSubscribe = async () => {
    // إعادة تعيين رسائل الحالة
    setError('');
    setSuccess('');
    
    // التحقق من إدخال البريد الإلكتروني
    if (!email.trim()) {
      setError('الرجاء إدخال البريد الإلكتروني');
      return;
    }
    
    // التحقق من صحة تنسيق البريد الإلكتروني
    if (!isValidEmail(email)) {
      setError('الرجاء إدخال بريد إلكتروني صحيح');
      return;
    }
    
    try {
      setLoading(true);
      
      // استدعاء خدمة الاشتراك في النشرة البريدية
      const response = await subscribeToNewsletter(email);
      
      // عرض رسالة النجاح من الاستجابة
      setSuccess(response.message || successText);
      
      // مسح حقل البريد الإلكتروني فقط في حالة الاشتراك الجديد
      if (response.status === 'subscribed') {
        setEmail('');
      }
    } catch (err: unknown) {
      // معالجة الخطأ وعرض رسالة مناسبة
      console.error('خطأ في الاشتراك:', err);
      
      // تعريف واجهة للخطأ للتعامل معه بشكل آمن
      interface ApiError {
        message?: string;
        response?: {
          data?: {
            message?: string;
            error?: string;
          };
        };
      }
      
      // التحقق من نوع الخطأ وعرض رسالة مناسبة
      let errorMessage = 'حدث خطأ أثناء الاشتراك. الرجاء المحاولة مرة أخرى.';
      
      const apiError = err as ApiError;
      
      if (apiError.message) {
        // إذا كانت رسالة الخطأ تتعلق باشتراك مسبق
        if (typeof apiError.message === 'string' && (
          apiError.message.includes('مشترك بالفعل') || 
          apiError.message.includes('already subscribed')
        )) {
          // إذا كان البريد مشتركًا بالفعل، نعرض رسالة نجاح بدلاً من خطأ
          setSuccess('شكرًا لك! أنت مشترك بالفعل في النشرة البريدية');
          return; // الخروج من الدالة لتجنب عرض رسالة خطأ
        }
        errorMessage = apiError.message;
      } else if (apiError.response && apiError.response.data && apiError.response.data.message) {
        errorMessage = apiError.response.data.message;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`newsletter-subscription ${className}`}>
      <div className={`flex ${direction === 'column' ? 'flex-col space-y-3' : 'flex-row'} items-center`}>
        <div className={`relative flex-grow ${direction === 'row' ? 'mr-2' : 'w-full'}`}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={placeholderText}
            className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            disabled={loading}
          />
        </div>
        <Button
          type="button"
          onClick={handleSubscribe}
          loading={loading}
          className={direction === 'column' ? 'w-full' : ''}
        >
          {buttonText}
        </Button>
      </div>

      {/* عرض رسائل الخطأ والنجاح */}
      {error && (
        <div className="flex items-center mt-2 text-red-600">
          <XCircleIcon className="w-5 h-5 ml-1" />
          <span>{error}</span>
        </div>
      )}
      
      {success && (
        <div className="flex items-center mt-2 text-green-600">
          <CheckCircleIcon className="w-5 h-5 ml-1" />
          <span>{success}</span>
        </div>
      )}
    </div>
  );
}
