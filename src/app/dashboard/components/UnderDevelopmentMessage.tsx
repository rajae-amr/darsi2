import React from 'react';
import { FiTool } from 'react-icons/fi';

type UnderDevelopmentMessageProps = {
  pageName?: string;
  className?: string;
};

/**
 * مكون لعرض رسالة أن الصفحة قيد التطوير
 */
const UnderDevelopmentMessage: React.FC<UnderDevelopmentMessageProps> = ({
  pageName = 'هذه الصفحة',
  className = '',
}) => {
  return (
    <div className={`flex flex-col items-center justify-center p-8 text-center ${className}`}>
      <div className="bg-blue-50 dark:bg-blue-900/30 p-10 rounded-lg shadow-sm border border-blue-100 dark:border-blue-800 max-w-lg w-full">
        <div className="flex justify-center mb-4">
          <div className="bg-blue-100 dark:bg-blue-800 p-3 rounded-full">
            <FiTool className="h-8 w-8 text-blue-600 dark:text-blue-300" />
          </div>
        </div>
        
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
          {pageName} قيد التطوير
        </h2>
        
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          نعمل حاليًا على تطوير هذه الصفحة لتوفير تجربة أفضل لك. يرجى العودة قريبًا للاطلاع على التحديثات الجديدة.
        </p>
        
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-2">
          <div className="bg-blue-600 dark:bg-blue-500 h-2.5 rounded-full w-1/2"></div>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          اكتمال التطوير: 50
        </p>
      </div>
    </div>
  );
};

export default UnderDevelopmentMessage;
