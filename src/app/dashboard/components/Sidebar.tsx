'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/app/hooks/auth';
import { 
  FiHome, FiCalendar, FiBook, FiClock, FiSettings, 
  FiDollarSign, FiUser, FiGrid, FiBarChart2 
} from 'react-icons/fi';
import Image from 'next/image';

type MenuItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
  children?: MenuItem[];
};

type SidebarProps = {
  userType: 'student' | 'teacher';
};

export default function Sidebar({ userType }: SidebarProps) {
  const pathname = usePathname();
  const { user } = useAuth();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  
  useEffect(() => {
    // تحديد عناصر القائمة بناءً على نوع المستخدم
    if (userType === 'student') {
      setMenuItems([
        {
          label: 'لوحة التحكم',
          href: '/dashboard/student',
          icon: <FiHome className="ml-2" />,
        },
        {
          label: 'الحجوزات',
          href: '/dashboard/student/bookings',
          icon: <FiCalendar className="ml-2" />,
        },
        {
          label: 'الجلسات',
          href: '/dashboard/student/sessions',
          icon: <FiBook className="ml-2" />,
        },
        {
          label: 'المدفوعات',
          href: '/dashboard/student/payments',
          icon: <FiDollarSign className="ml-2" />,
        },
        {
          label: 'الملف الشخصي',
          href: '/dashboard/student/profile',
          icon: <FiUser className="ml-2" />,
        },
      ]);
    } else if (userType === 'teacher') {
      setMenuItems([
        {
          label: 'لوحة التحكم',
          href: '/dashboard/teacher',
          icon: <FiHome className="ml-2" />,
        },
        {
          label: 'الحجوزات',
          href: '/dashboard/teacher/bookings',
          icon: <FiCalendar className="ml-2" />,
        },
        {
          label: 'الجلسات',
          href: '/dashboard/teacher/sessions',
          icon: <FiBook className="ml-2" />,
        },
        {
          label: 'الأوقات المتاحة',
          href: '/dashboard/teacher/availability',
          icon: <FiClock className="ml-2" />,
        },
        {
          label: 'الخدمات',
          href: '/dashboard/teacher/services',
          icon: <FiGrid className="ml-2" />,
        },
        {
          label: 'المدفوعات',
          href: '/dashboard/teacher/payouts',
          icon: <FiDollarSign className="ml-2" />,
        },
        {
          label: 'التقارير',
          href: '/dashboard/teacher/reports',
          icon: <FiBarChart2 className="ml-2" />,
        },
        {
          label: 'الملف الشخصي',
          href: '/dashboard/teacher/profile',
          icon: <FiUser className="ml-2" />,
        },


        {
          label: 'الإعدادات',
          href: '/dashboard/teacher/settings',
          icon: <FiSettings className="ml-2" />,
        },
      ]);
    }
  }, [userType]);

  // استخدام صورة افتراضية إذا لم تكن هناك صورة للمستخدم
  const userImage = user?.profile_image || '/images/default-avatar.png';

  return (
    <div className="min-h-screen w-full bg-white dark:bg-gray-800 flex flex-col overflow-y-auto shadow-lg">
      <div className="p-4 border-b dark:border-gray-700 flex items-center justify-center">
        <Link href="/" className="flex items-center">
          <Image 
            src="/images/logo.png" 
            alt="TeachSpace" 
            width={150} 
            height={40} 
            className="h-8 w-auto" 
          />
        </Link>
      </div>
      
      <div className="p-4">
        <div className="flex items-center space-x-3 space-x-reverse mb-6">
          <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center overflow-hidden">
            {user?.profile_image ? (
              <Image 
                src={userImage} 
                alt={user?.first_name || user?.username || 'المستخدم'} 
                width={40} 
                height={40} 
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-lg font-semibold">
                {user?.first_name?.charAt(0) || user?.username?.charAt(0) || '؟'}
              </span>
            )}
          </div>
          <div>
            <p className="font-medium">{user?.first_name || user?.username}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {userType === 'teacher' ? 'مدرس' : 'طالب'}
            </p>
          </div>
        </div>
        
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center space-x-3 space-x-reverse px-3 py-2 rounded-md text-sm font-medium ${
                pathname === item.href
                  ? 'bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                  : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
      

    </div>
  );
}
