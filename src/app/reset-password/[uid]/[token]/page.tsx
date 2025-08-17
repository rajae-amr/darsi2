'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { verifyPasswordResetToken, confirmPasswordReset } from '@/app/services/auth';
import Button from '@/app/components/ui/Button';
import Alert from '@/app/components/ui/Alert';
import { Spinner } from '@/app/components/ui/Spinner';

export default function ResetPasswordPage() {
  const router = useRouter();
  const params = useParams();
  const uid = params?.uid as string;
  const token = params?.token as string;
  
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isTokenValid, setIsTokenValid] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      if (!uid || !token) {
        setError('رابط إعادة تعيين كلمة المرور غير صالح');
        setIsTokenValid(false);
        setIsLoading(false);
        return;
      }

      try {
        await verifyPasswordResetToken(uid, token);
        setIsTokenValid(true);
      } catch (err: any) {
        setError(err.message || 'رابط إعادة تعيين كلمة المرور غير صالح أو منتهي الصلاحية');
        setIsTokenValid(false);
      } finally {
        setIsLoading(false);
      }
    };

    verifyToken();
  }, [uid, token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      setError('كلمتا المرور غير متطابقتين');
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      await confirmPasswordReset(uid, token, newPassword, confirmPassword);
      setSuccess('تم إعادة تعيين كلمة المرور بنجاح');
      
      // توجيه المستخدم إلى صفحة تسجيل الدخول بعد 3 ثوانٍ
      setTimeout(() => {
        router.push('/auth/login');
      }, 3000);
    } catch (err: any) {
      setError(err.message || 'حدث خطأ أثناء إعادة تعيين كلمة المرور');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Spinner size="md" />
          <p className="mt-2 text-gray-600">جاري التحقق من رابط إعادة تعيين كلمة المرور...</p>
        </div>
      </div>
    );
  }

  if (isTokenValid === false) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              رابط غير صالح
            </h2>
          </div>
          
          <Alert 
            variant="error" 
            dismissible={false}
          >
            <p className="text-sm font-medium">{error || 'رابط إعادة تعيين كلمة المرور غير صالح أو منتهي الصلاحية'}</p>
          </Alert>
          
          <div className="text-center">
            <Link href="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500">
              طلب رابط جديد
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            إعادة تعيين كلمة المرور
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            أدخل كلمة المرور الجديدة
          </p>
        </div>
        
        {success && (
          <Alert 
            variant="success" 
            dismissible={false}
          >
            <div>
              <p className="text-sm font-medium">{success}</p>
              <p className="text-sm">سيتم توجيهك إلى صفحة تسجيل الدخول...</p>
            </div>
          </Alert>
        )}
        
        {error && !success && (
          <Alert 
            variant="error" 
            dismissible={true} 
            onDismiss={() => setError(null)}
          >
            <p className="text-sm font-medium">{error}</p>
          </Alert>
        )}
        
        {!success && (
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div className="mb-4">
                <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 mb-1">
                  كلمة المرور الجديدة
                </label>
                <input
                  id="new-password"
                  name="newPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="كلمة المرور الجديدة"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  disabled={isSubmitting}
                  minLength={8}
                />
              </div>
              <div>
                <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
                  تأكيد كلمة المرور
                </label>
                <input
                  id="confirm-password"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="تأكيد كلمة المرور"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={isSubmitting}
                  minLength={8}
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
                {isSubmitting ? 'جاري المعالجة...' : 'إعادة تعيين كلمة المرور'}
              </Button>
            </div>
            
            <div className="text-center">
              <Link href="/auth/login" className="font-medium text-blue-600 hover:text-blue-500">
                العودة إلى تسجيل الدخول
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
