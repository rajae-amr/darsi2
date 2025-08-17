'use client';

import { useState, useEffect, useRef } from 'react';
import { 
  FiUser, FiHome, FiCalendar, FiBook, FiClock, 
  FiGrid, FiDollarSign, FiBarChart2, FiSettings,
  FiChevronDown, FiMenu, FiBell, FiSearch, FiX 
} from 'react-icons/fi';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/app/hooks/auth';

type DashboardLayoutProps = {
  children: React.ReactNode;
  userType: 'student' | 'teacher';
  title?: string;
};

type MenuItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
  active?: boolean;
};

export default function ModernDashboardLayout({ 
  children, 
  userType,
  title 
}: DashboardLayoutProps) {
  const { user } = useAuth();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const profileButtonRef = useRef<HTMLButtonElement>(null);
  
  // تحديد عناصر القائمة بناءً على نوع المستخدم
  useEffect(() => {
    if (userType === 'teacher') {
      setMenuItems([
        {
          label: 'لوحة التحكم',
          href: '/dashboard/teacher',
          icon: <FiHome size={20} />,
          active: pathname === '/dashboard/teacher'
        },
        {
          label: 'الحجوزات',
          href: '/dashboard/teacher/bookings',
          icon: <FiCalendar size={20} />,
          active: pathname === '/dashboard/teacher/bookings'
        },
        {
          label: 'الجلسات',
          href: '/dashboard/teacher/sessions',
          icon: <FiBook size={20} />,
          active: pathname === '/dashboard/teacher/sessions'
        },
        {
          label: 'الأوقات المتاحة',
          href: '/dashboard/teacher/availability',
          icon: <FiClock size={20} />,
          active: pathname === '/dashboard/teacher/availability'
        },
        {
          label: 'الخدمات',
          href: '/dashboard/teacher/services',
          icon: <FiGrid size={20} />,
          active: pathname === '/dashboard/teacher/services'
        },
        {
          label: 'المدفوعات',
          href: '/dashboard/teacher/payouts',
          icon: <FiDollarSign size={20} />,
          active: pathname === '/dashboard/teacher/payouts'
        },
        {
          label: 'التقارير',
          href: '/dashboard/teacher/reports',
          icon: <FiBarChart2 size={20} />,
          active: pathname === '/dashboard/teacher/reports'
        },
        {
          label: 'الملف الشخصي',
          href: '/dashboard/teacher/profile',
          icon: <FiUser size={20} />,
          active: pathname === '/dashboard/teacher/profile'
        },
        {
          label: 'الإعدادات',
          href: '/dashboard/teacher/settings',
          icon: <FiSettings size={20} />,
          active: pathname === '/dashboard/teacher/settings'
        },
      ]);
    }
  }, [userType, pathname]);
  
  // إغلاق قائمة الملف الشخصي عند النقر خارجها
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        profileMenuRef.current && 
        !profileMenuRef.current.contains(event.target as Node) &&
        profileButtonRef.current &&
        !profileButtonRef.current.contains(event.target as Node)
      ) {
        setProfileMenuOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // استخدام صورة افتراضية إذا لم تكن هناك صورة للمستخدم
  const userImage = user?.profile_image || '/images/default-avatar.png';
  
  // تحديد العنوان الافتراضي بناءً على نوع المستخدم إذا لم يتم توفيره
  const headerTitle = title || (
    userType === 'teacher' ? 'لوحة تحكم المدرس' : 'لوحة التحكم'
  );
  
  // العثور على العنصر النشط في القائمة
  const activeMenuItem = menuItems.find(item => item.active);
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* الشريط العلوي */}
      <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* الشعار وزر القائمة المتنقلة */}
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <Link href="/">
                  <Image 
                    src="/images/logo.png" 
                    alt="درسي" 
                    width={120} 
                    height={40} 
                    className="h-8 w-auto" 
                  />
                </Link>
              </div>
              
              {/* زر القائمة المتنقلة */}
              <button 
                className="mr-4 inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <span className="sr-only">فتح القائمة الرئيسية</span>
                {mobileMenuOpen ? (
                  <FiX className="block h-6 w-6" />
                ) : (
                  <FiMenu className="block h-6 w-6" />
                )}
              </button>
            </div>
            
            {/* القائمة الرئيسية للشاشات المتوسطة والكبيرة */}
            <nav className="hidden md:flex space-x-8 space-x-reverse">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium
                    ${item.active 
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400 dark:border-blue-400' 
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-300 dark:hover:text-white dark:hover:border-gray-600'}
                  `}
                >
                  <span className="ml-1">{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </nav>
            
            {/* أزرار الإجراءات السريعة */}
            <div className="flex items-center">
              {/* زر البحث */}
              <button className="p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <FiSearch className="h-5 w-5" />
              </button>
              
              {/* زر الإشعارات */}
              <button className="p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <FiBell className="h-5 w-5" />
              </button>
              
              {/* قائمة الملف الشخصي */}
              <div className="mr-3 relative">
                <button
                  ref={profileButtonRef}
                  className="flex items-center space-x-3 space-x-reverse focus:outline-none"
                  onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                >
                  <div className="relative w-8 h-8 rounded-full overflow-hidden bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                    {user?.profile_image ? (
                      <Image 
                        src={userImage} 
                        alt={user?.first_name || user?.username || 'المستخدم'} 
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <span className="text-sm font-semibold">
                        {user?.first_name?.charAt(0) || user?.username?.charAt(0) || '؟'}
                      </span>
                    )}
                  </div>
                  <div className="hidden md:flex md:items-center">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {user?.first_name || user?.username}
                    </span>
                    <FiChevronDown className="mr-1 h-4 w-4 text-gray-500 dark:text-gray-400" />
                  </div>
                </button>
                
                {/* قائمة منسدلة للملف الشخصي */}
                {profileMenuOpen && (
                  <div 
                    ref={profileMenuRef}
                    className="origin-top-left absolute left-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none"
                  >
                    <div className="px-4 py-2 border-b dark:border-gray-700">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {user?.first_name || user?.username}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {userType === 'teacher' ? 'مدرس' : 'مستخدم'}
                      </p>
                    </div>
                    <Link 
                      href="/dashboard/teacher/profile" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                    >
                      الملف الشخصي
                    </Link>
                    <Link 
                      href="/dashboard/teacher/settings" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                    >
                      الإعدادات
                    </Link>
                    <button 
                      className="w-full text-right block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                    >
                      تسجيل الخروج
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* القائمة المتنقلة للشاشات الصغيرة */}
        <div className={`${mobileMenuOpen ? 'block' : 'hidden'} md:hidden`}>
          <div className="pt-2 pb-3 space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex items-center px-4 py-2 text-base font-medium
                  ${item.active 
                    ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-200' 
                    : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700'}
                `}
              >
                <span className="ml-3">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </header>
      
      {/* المحتوى الرئيسي */}
      <main>
        {/* عنوان الصفحة والإجراءات */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                {headerTitle}
              </h1>
              {activeMenuItem && (
                <div className="mt-1 flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <span className="ml-1">{activeMenuItem.icon}</span>
                  <span>{activeMenuItem.label}</span>
                </div>
              )}
            </div>
            <div className="mt-4 flex md:mt-0 md:mr-4">
              {/* يمكن إضافة أزرار إجراءات هنا */}
            </div>
          </div>
        </div>
        
        {/* محتوى الصفحة */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          {children}
        </div>
      </main>
      
      {/* الشريط السفلي */}
      <footer className="bg-white dark:bg-gray-800 border-t dark:border-gray-700">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} درسي - جميع الحقوق محفوظة
          </p>
        </div>
      </footer>
    </div>
  );
}
