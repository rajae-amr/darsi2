'use client';

import React from 'react';
import SocialLoginButtons from '@/app/components/auth/login/SocialLoginButtons';

export const SocialLoginSection: React.FC = () => {
  return (
    <div className="mt-6">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
            أو الاستمرار باستخدام
          </span>
        </div>
      </div>
      <div className="mt-6">
        <SocialLoginButtons />
      </div>
    </div>
  );
};

export default SocialLoginSection;
