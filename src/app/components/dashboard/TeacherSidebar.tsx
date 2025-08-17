'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
// تعريف أيقونات مؤقتة لحين تثبيت مكتبة lucide-react
interface IconProps {
  size?: number;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Calendar = (props: IconProps) => <span>📅</span>;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Clock = (props: IconProps) => <span>🕒</span>;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const CreditCard = (props: IconProps) => <span>💳</span>;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const BarChart = (props: IconProps) => <span>📈</span>;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Settings = (props: IconProps) => <span>⚙️</span>;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const BookOpen = (props: IconProps) => <span>📖</span>;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Menu = (props: IconProps) => <span>☰</span>;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const X = (props: IconProps) => <span>✕</span>;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Video = (props: IconProps) => <span>🎥</span>;

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick?: () => void;
}

const NavItem = ({ href, icon, label, active, onClick }: NavItemProps) => {
  return (
    <Link
      href={href}
      className={`flex items-center space-x-3 rtl:space-x-reverse px-4 py-3 rounded-md transition-colors ${
        active
          ? 'bg-blue-50 text-blue-600'
          : 'text-gray-700 hover:bg-gray-100'
      }`}
      onClick={onClick}
    >
      <span className="flex-shrink-0">{icon}</span>
      <span className="text-sm font-medium">{label}</span>
    </Link>
  );
};

export default function TeacherSidebar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => {
    return pathname === path;
  };

  const navItems = [
    {
      href: '/dashboard/teacher',
      icon: <BarChart size={20} />,
      label: 'لوحة التحكم',
      active: isActive('/dashboard/teacher')
    },
    {
      href: '/dashboard/teacher/bookings',
      icon: <Calendar size={20} />,
      label: 'الحجوزات',
      active: isActive('/dashboard/teacher/bookings')
    },
    {
      href: '/dashboard/teacher/services',
      icon: <BookOpen size={20} />,
      label: 'الخدمات',
      active: isActive('/dashboard/teacher/services')
    },
    {
      href: '/dashboard/teacher/availability',
      icon: <Clock size={20} />,
      label: 'جدول التوافر',
      active: isActive('/dashboard/teacher/availability')
    },
    {
      href: '/dashboard/teacher/session-settings',
      icon: <Video size={20} />,
      label: 'إعدادات الجلسات',
      active: isActive('/dashboard/teacher/session-settings')
    },
    {
      href: '/dashboard/teacher/payment-accounts',
      icon: <CreditCard size={20} />,
      label: 'حسابات الدفع',
      active: isActive('/dashboard/teacher/payment-accounts')
    },
    {
      href: '/dashboard/teacher/payouts',
      icon: <CreditCard size={20} />,
      label: 'المدفوعات والأرباح',
      active: isActive('/dashboard/teacher/payouts')
    },
    {
      href: '/dashboard/teacher/reports',
      icon: <BarChart size={20} />,
      label: 'التقارير والإحصائيات',
      active: isActive('/dashboard/teacher/reports')
    },
    {
      href: '/dashboard/teacher/settings',
      icon: <Settings size={20} />,
      label: 'الإعدادات',
      active: isActive('/dashboard/teacher/settings')
    }
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden p-4">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-md text-gray-700 hover:bg-gray-100"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar for Desktop */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-l rtl:border-r rtl:border-l-0 border-gray-200 h-screen sticky top-0">
        <div className="p-4">
          <h2 className="text-xl font-bold text-gray-800">لوحة تحكم المعلم</h2>
        </div>
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {navItems.map((item) => (
            <NavItem
              key={item.href}
              href={item.href}
              icon={item.icon}
              label={item.label}
              active={item.active}
            />
          ))}
        </nav>
      </aside>

      {/* Sidebar for Mobile */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-gray-800 bg-opacity-50">
          <aside className="flex flex-col w-64 bg-white h-full">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800">لوحة تحكم المعلم</h2>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-md text-gray-700 hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto p-4 space-y-1">
              {navItems.map((item) => (
                <NavItem
                  key={item.href}
                  href={item.href}
                  icon={item.icon}
                  label={item.label}
                  active={item.active}
                  onClick={() => setIsMobileMenuOpen(false)}
                />
              ))}
            </nav>
          </aside>
        </div>
      )}
    </>
  );
}
