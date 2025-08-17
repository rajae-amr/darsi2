'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  
  // توجيه المستخدم مباشرة إلى صفحة تسجيل دخول المعلمين
  useEffect(() => {
    router.push('/auth/login/teacher');
  }, [router]);

  // لا نعرض أي محتوى لأننا نقوم بإعادة التوجيه مباشرة
  return null;
}
