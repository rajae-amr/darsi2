'use client';

import { createContext } from 'react';
import { AuthContextType } from './types';

/**
 * سياق المصادقة
 * يستخدم لمشاركة حالة المصادقة بين المكونات
 */
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default AuthContext;
