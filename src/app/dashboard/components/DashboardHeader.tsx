'use client';

// Removed unused imports
import { FiMenu, FiX } from 'react-icons/fi';

type DashboardHeaderProps = {
  title?: string;
  userType: 'student' | 'teacher' | 'general';
  toggleSidebar?: () => void;
  sidebarOpen?: boolean;
};

export default function DashboardHeader({ 
  title, 
  userType, 
  toggleSidebar,
  sidebarOpen
}: DashboardHeaderProps) {
  

  
  // تحديد العنوان الافتراضي بناءً على نوع المستخدم إذا لم يتم توفيره
  const headerTitle = title || (
    userType === 'teacher' ? 'لوحة تحكم المدرس' : 
    userType === 'student' ? 'لوحة تحكم الطالب' : 
    'لوحة التحكم'
  );
  
  return (
    <header className="py-4 px-6 flex items-center justify-between bg-white dark:bg-gray-800 shadow-sm">
      <div className="flex items-center">
        <button 
          onClick={toggleSidebar}
          className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none"
          aria-label="تبديل الشريط الجانبي"
        >
          {sidebarOpen ? (
            <FiX className="w-6 h-6 md:hidden" />
          ) : (
            <FiMenu className="w-6 h-6" />
          )}
        </button>
        <h1 className="text-xl font-semibold text-gray-800 dark:text-white mr-4">
          {headerTitle}
        </h1>
      </div>
      

    </header>
  );
}
