"use client";

import React from 'react';
import NewsletterSubscription from '@/app/components/layouts/NewsletterSubscription';


export default function NewsletterPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">اشترك في نشرتنا البريدية</h1>
        
        <div className="bg-white shadow-md rounded-lg p-8">
          <p className="text-lg mb-8 text-center">
            احصل على أحدث الأخبار والموارد التعليمية والنصائح المهنية للمعلمين مباشرة إلى بريدك الإلكتروني.
            نرسل رسائل إخبارية شهرية فقط ولن نرسل لك بريدًا مزعجًا أبدًا.
          </p>
          
          <div className="mb-8">
            <NewsletterSubscription 
              direction="row"
              buttonText="اشترك الآن"
              placeholderText="أدخل بريدك الإلكتروني"
            />
          </div>
          
          <div className="mt-12 text-center text-gray-600 text-sm">
            <p>بالاشتراك في نشرتنا البريدية، أنت توافق على سياسة الخصوصية الخاصة بنا.</p>
            <p>يمكنك إلغاء الاشتراك في أي وقت من خلال النقر على رابط إلغاء الاشتراك في أسفل أي رسالة بريد إلكتروني نرسلها.</p>
            <p className="mt-4">
              هل تريد إلغاء اشتراكك؟{' '}
              <a href="/newsletter/unsubscribe" className="text-blue-600 hover:underline">
                انتقل إلى صفحة إلغاء الاشتراك
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
