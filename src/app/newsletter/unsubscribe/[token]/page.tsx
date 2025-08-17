'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { unsubscribeFromNewsletter } from '@/app/services/newsletter/newsletterService';
import Link from 'next/link';

/**
 * صفحة إلغاء الاشتراك من النشرة البريدية
 * تستخدم رمز التوكن من عنوان URL للتحقق من البريد الإلكتروني وإلغاء الاشتراك
 */
export default function UnsubscribePage() {
  const params = useParams();
  const token = params?.token as string;
  
  const [loading, setLoading] = useState<boolean>(true);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  
  useEffect(() => {
    // التحقق من وجود توكن صالح
    if (!token) {
      setError('رمز إلغاء الاشتراك غير صالح');
      setLoading(false);
      return;
    }
    
    // استدعاء واجهة إلغاء الاشتراك
    const handleUnsubscribe = async () => {
      try {
        setLoading(true);
        // استخدام الطريقة الجديدة التي ترسل التوكن في جسم الطلب POST
        const response = await unsubscribeFromNewsletter(undefined, token);
        setSuccess(true);
        setEmail(response.email || null);
      } catch (err: any) {
        console.error('خطأ في إلغاء الاشتراك:', err);
        setError(err.message || 'حدث خطأ أثناء إلغاء الاشتراك');
      } finally {
        setLoading(false);
      }
    };
    
    handleUnsubscribe();
  }, [token]);
  
  return (
    <div className="container mx-auto py-16 px-4 text-center">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-6">إلغاء الاشتراك من النشرة البريدية</h1>
        
        {loading ? (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            <p className="mt-4">جاري معالجة طلب إلغاء الاشتراك...</p>
          </div>
        ) : error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            <p>{error}</p>
            <p className="mt-4">
              يمكنك محاولة إلغاء الاشتراك مرة أخرى باستخدام نموذج إلغاء الاشتراك في{' '}
              <Link href="/newsletter" className="text-blue-600 hover:underline">
                صفحة النشرة البريدية
              </Link>
            </p>
          </div>
        ) : (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
            <p className="font-bold">تم إلغاء اشتراكك بنجاح!</p>
            {email && <p className="mt-2">تم إلغاء اشتراك البريد الإلكتروني: {email}</p>}
            <p className="mt-4">
              يمكنك الاشتراك مرة أخرى في أي وقت من خلال{' '}
              <Link href="/newsletter" className="text-blue-600 hover:underline">
                صفحة النشرة البريدية
              </Link>
            </p>
          </div>
        )}
        
        <div className="mt-8">
          <Link href="/" className="text-blue-600 hover:underline">
            العودة إلى الصفحة الرئيسية
          </Link>
        </div>
      </div>
    </div>
  );
}
