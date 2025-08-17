'use client';

import { useContext } from 'react';
import AuthContext from '../../providers/auth/AuthContext';

/**
 * هوك استخدام سياق المصادقة
 * يوفر وصولاً سهلاً لسياق المصادقة من أي مكون
 */
export function useAuth() {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('يجب استخدام useAuth داخل AuthProvider');
  }
  
  return context;
}

export default useAuth;
