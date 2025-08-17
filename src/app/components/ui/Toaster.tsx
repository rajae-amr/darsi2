'use client';

import { Toaster as HotToaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';

/**
 * مكون عرض الإشعارات باستخدام react-hot-toast
 * يتم استخدامه في تطبيق Next.js على مستوى التطبيق
 * تم توحيد المظهر باستخدام متغيرات CSS من ملف components.css
 */

export default function Toaster() {
  // استخدام قيمة افتراضية للمسافة بين الإشعارات
  const [toastGap, setToastGap] = useState(8);
  
  // قراءة قيمة المتغير من CSS بعد تحميل الصفحة
  useEffect(() => {
    const gap = getComputedStyle(document.documentElement)
      .getPropertyValue('--toast-gap')
      .trim();
    if (gap) {
      setToastGap(parseInt(gap) || 8);
    }
  }, []);

  return (
    <HotToaster
      position="bottom-center"
      reverseOrder={false}
      gutter={toastGap}
      toastOptions={{
        // تخصيص مظهر الإشعارات العامة
        duration: 5000,
        style: {
          background: 'var(--toast-bg)',
          color: 'var(--toast-color)',
          borderRadius: 'var(--toast-border-radius)',
          padding: 'var(--toast-padding)',
          boxShadow: 'var(--toast-shadow)',
          border: '1px solid var(--toast-border)'
        },
        // تخصيص مظهر إشعارات النجاح
        success: {
          style: {
            background: 'var(--toast-success-bg)',
            color: 'var(--toast-success-color)',
            border: '1px solid var(--toast-success-border)'
          },
          iconTheme: {
            primary: 'var(--toast-success-icon-primary)',
            secondary: 'var(--toast-success-icon-secondary)',
          },
        },
        // تخصيص مظهر إشعارات الخطأ
        error: {
          style: {
            background: 'var(--toast-error-bg)',
            color: 'var(--toast-error-color)',
            border: '1px solid var(--toast-error-border)'
          },
          iconTheme: {
            primary: 'var(--toast-error-icon-primary)',
            secondary: 'var(--toast-error-icon-secondary)',
          },
        },
        // تخصيص مظهر إشعارات التحميل
        loading: {
          style: {
            background: 'var(--toast-info-bg)',
            color: 'var(--toast-info-color)',
            border: '1px solid var(--toast-info-border)'
          },
          iconTheme: {
            primary: 'var(--toast-info-icon-primary)',
            secondary: 'var(--toast-info-icon-secondary)',
          },
        },
        // تخصيص مظهر الإشعارات المخصصة
        custom: {
          style: {
            background: 'var(--toast-info-bg)',
            color: 'var(--toast-info-color)',
            border: '1px solid var(--toast-info-border)'
          },
        },
      }}
    />
  );
}
