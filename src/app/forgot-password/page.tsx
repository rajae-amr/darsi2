'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { requestPasswordReset } from '../services/auth';
import Button from '../components/ui/Button';
import Alert from '../components/ui/Alert';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      await requestPasswordReset(email);
      setSuccess('إذا كان البريد الإلكتروني مرتبطاً بحساب، فسيتم إرسال رابط إعادة تعيين كلمة المرور.');
      setEmail('');
    } catch (err: any) {
      setError(err.message || 'حدث خطأ أثناء طلب إعادة تعيين كلمة المرور');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            استعادة كلمة المرور
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            أدخل بريدك الإلكتروني وسنرسل لك رابطاً لإعادة تعيين كلمة المرور
          </p>
        </div>
        
        {success && (
          <Alert 
            variant="success" 
            dismissible={true} 
            onDismiss={() => setSuccess(null)}
          >
            <p className="text-sm font-medium">{success}</p>
          </Alert>
        )}
        
        {error && (
          <Alert 
            variant="error" 
            dismissible={true} 
            onDismiss={() => setError(null)}
          >
            <p className="text-sm font-medium">{error}</p>
          </Alert>
        )}
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">البريد الإلكتروني</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="البريد الإلكتروني"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div>
            <Button
              type="submit"
              variant="primary"
              disabled={isSubmitting}
              loading={isSubmitting}
              fullWidth={true}
            >
              {isSubmitting ? 'جاري الإرسال...' : 'إرسال رابط إعادة التعيين'}
            </Button>
          </div>
          
          <div className="text-center">
            <Link href="/auth/login" className="font-medium text-blue-600 hover:text-blue-500">
              العودة إلى تسجيل الدخول
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
