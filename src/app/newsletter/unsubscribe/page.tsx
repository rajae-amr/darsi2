'use client';

import { useEffect, useState, Suspense } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { unsubscribeFromNewsletter } from '@/app/services/newsletter/newsletterService';
import Link from 'next/link';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';

// Component to handle search params (isolated to use client-side hooks)
function UnsubscribeContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const token = params?.token as string || searchParams?.get('token');

  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      return;
    }

    const handleUnsubscribe = async () => {
      try {
        setLoading(true);
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
    <>
      {token ? (
        loading ? (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            <p className="mt-4">جاري معالجة طلب إلغاء الاشتراك...</p>
          </div>
        ) : error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            <p>{error}</p>
            <div className="mt-6 border-t pt-6">
              <h2 className="text-xl font-semibold mb-4">جرب إلغاء الاشتراك بالبريد الإلكتروني</h2>
              <UnsubscribeForm />
            </div>
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
        )
      ) : (
        <div>
          <p className="mb-6 text-center">
            أدخل بريدك الإلكتروني أدناه لإلغاء اشتراكك من النشرة البريدية:  
          </p>
          <UnsubscribeForm />
        </div>
      )}
    </>
  );
}

// UnsubscribeForm component (unchanged)
function UnsubscribeForm() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleUnsubscribe = async () => {
    setError('');
    setSuccess('');
    
    if (!email.trim()) {
      setError('الرجاء إدخال البريد الإلكتروني');
      return;
    }
    
    if (!isValidEmail(email)) {
      setError('الرجاء إدخال بريد إلكتروني صحيح');
      return;
    }
    
    try {
      setLoading(true);
      const response = await unsubscribeFromNewsletter(email, undefined);
      setSuccess(response.message || 'تم إلغاء اشتراكك بنجاح من النشرة البريدية');
      setEmail('');
    } catch (err: any) {
      console.error('خطأ في إلغاء الاشتراك:', err);
      let errorMessage = 'حدث خطأ أثناء إلغاء الاشتراك. الرجاء المحاولة مرة أخرى.';
      if (err.message) {
        errorMessage = err.message;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="flex flex-col space-y-3">
        <div className="relative flex-grow w-full">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="البريد الإلكتروني"
            className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            disabled={loading}
          />
        </div>
        <button
          type="button"
          onClick={handleUnsubscribe}
          disabled={loading}
          className="w-full px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-colors"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              جاري المعالجة...
            </span>
          ) : 'إلغاء الاشتراك'}
        </button>
      </div>

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

// Main UnsubscribePage component
export default function UnsubscribePage() {
  return (
    <div className="container mx-auto py-16 px-4 text-center">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-6">إلغاء الاشتراك من النشرة البريدية</h1>
        <Suspense fallback={<div className="flex flex-col items-center justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          <p className="mt-4">جاري التحميل...</p>
        </div>}>
          <UnsubscribeContent />
        </Suspense>
        <div className="mt-8">
          <Link href="/newsletter" className="text-blue-600 hover:underline mx-2">
            العودة إلى صفحة النشرة البريدية
          </Link>
          <span className="text-gray-400">|</span>
          <Link href="/" className="text-blue-600 hover:underline mx-2">
            العودة إلى الصفحة الرئيسية
          </Link>
        </div>
      </div>
    </div>
  );
}