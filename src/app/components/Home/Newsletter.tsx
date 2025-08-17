"use client";

import React from 'react';
import NewsletterSubscription from '@/app/components/layouts/NewsletterSubscription';

export default function Newsletter() {
  return (
    <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-800 dark:to-indigo-900">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            ابق على اطلاع بأحدث المستجدات
          </h2>
          <p className="text-blue-100 mb-8">
            اشترك في نشرتنا البريدية للحصول على آخر الأخبار والنصائح التعليمية وعروض خاصة للجلسات التعليمية عبر الإنترنت
          </p>
          
          <div className="max-w-md mx-auto">
            <NewsletterSubscription 
              buttonText="اشترك الآن"
              placeholderText="أدخل بريدك الإلكتروني"
              direction="row"
              className="newsletter-home"
              successText="تم تسجيلك بنجاح في النشرة البريدية!"
            />
          </div>
          
          <p className="text-xs text-blue-200 mt-4">
            من خلال الاشتراك، أنت توافق على سياسة الخصوصية الخاصة بنا ولن نشارك بريدك الإلكتروني مع أي جهة خارجية.
          </p>
        </div>
      </div>
    </section>
  );
}
