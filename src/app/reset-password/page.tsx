'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  CircularProgress,
} from '@mui/material';

// Component to handle search params (isolated to use client-side hooks)
function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams?.get('email');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (!email) {
      setError('لم يتم توفير عنوان البريد الإلكتروني. يرجى التحقق من الرابط المرسل إليك.');
    }
  }, [email]);

  const getCsrfToken = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/auth/csrf-token/`, {
        method: 'GET',
        credentials: 'include',
      });
      const data = await response.json();
      return data.csrfToken;
    } catch (error) {
      console.error('Error fetching CSRF token:', error);
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('كلمات المرور غير متطابقة');
      return;
    }

    if (password.length < 8) {
      setError('يجب أن تكون كلمة المرور 8 أحرف على الأقل');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/auth/password-reset/confirm/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          email: email,
          password: password,
          password_confirm: confirmPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || data.error || 'حدث خطأ أثناء تغيير كلمة المرور');
      }

      setSuccess('تم تغيير كلمة المرور بنجاح. يمكنك الآن تسجيل الدخول باستخدام كلمة المرور الجديدة.');
    } catch (err: any) {
      setError(err.message || 'حدث خطأ أثناء تغيير كلمة المرور');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          تغيير كلمة المرور
        </Typography>

        <Typography variant="body1" paragraph align="center" color="text.secondary">
          مرحبًا بك في منصة درسي! يرجى إنشاء كلمة مرور جديدة لحسابك.
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {success ? (
          <Box sx={{ textAlign: 'center' }}>
            <Alert severity="success" sx={{ mb: 3 }}>
              {success}
            </Alert>
            <Button
              component={Link}
              href="/auth/login"
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
            >
              تسجيل الدخول
            </Button>
          </Box>
        ) : (
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="البريد الإلكتروني"
              name="email"
              autoComplete="email"
              value={email || ''}
              disabled
              sx={{ mb: 2 }}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="كلمة المرور الجديدة"
              type="password"
              id="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ mb: 2 }}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="تأكيد كلمة المرور"
              type="password"
              id="confirmPassword"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              sx={{ mb: 3 }}
            />

            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                disabled={isSubmitting || !email}
                sx={{ minWidth: 200, py: 1.5 }}
              >
                {isSubmitting ? <CircularProgress size={24} /> : 'تغيير كلمة المرور'}
              </Button>
            </Box>
          </Box>
        )}
      </Paper>
    </Container>
  );
}

// Main page component with Suspense
export default function TeacherResetPasswordPage() {
  return (
    <Suspense fallback={
      <Container maxWidth="sm" sx={{ py: 8, textAlign: 'center' }}>
        <CircularProgress />
        <Typography variant="body1" sx={{ mt: 2 }}>
          جاري التحميل...
        </Typography>
      </Container>
    }>
      <ResetPasswordContent />
    </Suspense>
  );
}