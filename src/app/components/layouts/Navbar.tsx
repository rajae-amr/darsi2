
"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { Logo } from '@/app/components/layouts/Logo';
import Button from '@/app/components/ui/Button';
import { useAuth } from '@/app/hooks/auth';
import { BiUserCircle, BiLogOut } from 'react-icons/bi';
import Image from 'next/image';
type NavbarProps = {
  showAuthButtons?: boolean;
  transparent?: boolean;
  className?: string;
  isAuthenticated?: boolean;
  userType?: 'teacher' | 'general';
};

/**
 * مكون شريط التنقل الرئيسي للتطبيق
 * يمكن استخدامه في الصفحة الرئيسية وصفحات لوحة التحكم
 */
const Navbar: React.FC<NavbarProps> = ({
  showAuthButtons = true,
  transparent = false,
  className = '',
  isAuthenticated: isAuthProp,
  userType = 'general',
}) => {
  // استخدام القيم من السياق إذا لم يتم تمريرها كخصائص
  const authContext = useAuth();
  const isAuthenticated = isAuthProp !== undefined ? isAuthProp : authContext.isAuthenticated;
  const user = authContext.user;
  const logout = authContext.logout;
  
  // تحديد نوع المستخدم بناءً على بيانات المستخدم الفعلية
  const actualUserType = user?.is_teacher ? 'teacher' : 'general';
  // استخدام نوع المستخدم المحدد من الخصائص أو تحديده تلقائيًا
  const effectiveUserType = userType !== 'general' ? userType : actualUserType;
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header 
      className={`navbar ${transparent ? 'navbar-transparent' : 'navbar-solid'} ${className}`}
    >
      <div className="navbar-container">
        {/* في واجهة RTL، نضع الشعار على اليمين */}
        <div className="navbar-logo">
          <Logo variant="full" size="md" />
        </div>
        
        {/* القائمة الرئيسية للشاشات المتوسطة والكبيرة */}
        <div className="navbar-menu">
          {/* روابط للزوار والمستخدمين غير المسجلين */}
          {!isAuthenticated && (
            <>

              <Link href="/teachers" className="navbar-link">
                المعلمين
              </Link>


              <Link href="/#faq" className="navbar-link">
                الأسئلة الشائعة
              </Link>

              <Link href="/contact" className="navbar-link">
                تواصل معنا
              </Link>
            </>
          )}

          {/* روابط للمعلمين */}
          {isAuthenticated && effectiveUserType === 'teacher' && (
            <>
              <Link href="/dashboard/teacher" className="navbar-link">
                لوحة التحكم
              </Link>

            </>
          )}

          {/* تم إزالة روابط الطلاب */}


        </div>
        
        {/* أزرار تسجيل الدخول والتسجيل أو معلومات المستخدم */}
        {showAuthButtons && (
          <div className="navbar-auth">
            {isAuthenticated ? (
              <div className="navbar-user">
                <div className="navbar-user-info">
                  <Image 
                    src={user?.profile_image || "/images/default-avatar.png"} 
                    alt="Profile" 
                    width={40} 
                    height={40} 
                    className="navbar-user-image"
                  />
                  <span>{user?.first_name || user?.username || user?.email || 'المستخدم'}</span>
                </div>
                <Button 
                  variant="flat" 
                  size="sm" 
                  onClick={logout}
                  icon={<BiLogOut />}
                >
                  تسجيل الخروج
                </Button>
              </div>
            ) : (
              <>
                <Button variant="flat" size="sm"><Link href="/auth/login/teacher">تسجيل الدخول</Link></Button>
                <Button variant="flat" size="sm"><Link href="/teacher-application" className="text-white">انضم كمعلم</Link></Button>
              </>
            )}
          </div>
        )}
        
        {/* زر القائمة للشاشات الصغيرة */}
        <button 
          onClick={toggleMobileMenu}
          className="navbar-mobile-button"
          aria-label="فتح القائمة"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* القائمة المنسدلة للشاشات الصغيرة */}
      {mobileMenuOpen && (
        <div className="navbar-mobile-menu">
          <div className="navbar-mobile-links">
            {/* روابط للزوار والمستخدمين غير المسجلين */}
            {!isAuthenticated && (
              <>

                <Link href="/teachers" className="navbar-mobile-link">
                  المعلمين
                </Link>
  

                <Link href="/#faq" className="navbar-mobile-link">
                  الأسئلة الشائعة
                </Link>
                <Link href="/contact" className="navbar-mobile-link">
                  تواصل معنا
                </Link>
              </>
            )}

            {/* روابط للمعلمين */}
            {isAuthenticated && userType === 'teacher' && (
              <>
                <Link href="/dashboard/teacher" className="navbar-mobile-link">
                  لوحة التحكم
                </Link>

              </>
            )}

            {/* تم إزالة روابط الطلاب */}


          </div>
          {showAuthButtons && (
            <div className="navbar-mobile-auth">
              {isAuthenticated ? (
                <>
                  <div className="navbar-mobile-user">
                    <BiUserCircle className="w-5 h-5 ml-1" />
                    <span>{user?.first_name || 'المستخدم'}</span>
                  </div>
                  <Button 
                    variant="flat" 
                    size="sm" 
                    className="w-full justify-center"
                    onClick={logout}
                    icon={<BiLogOut />}
                  >
                    تسجيل الخروج
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="flat" size="sm" className="w-full justify-center"><Link href="/auth/login/teacher">تسجيل الدخول</Link></Button>
                  <Button variant="flat" size="sm" className="w-full justify-center"><Link href="/teacher-application" className="text-white">انضم كمعلم</Link></Button>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;


