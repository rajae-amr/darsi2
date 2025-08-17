"use client";

import React from 'react';
import Badge from '@/app/components/ui/Badge';
import Button from '@/app/components/ui/Button';
import Link from 'next/link';

/**
 * مكون Hero الرئيسي للصفحة الرئيسية
 * يعرض قسم الترحيب مع التركيز على جلسات التعليم عبر الإنترنت
 * يتبع الهوية البصرية الموحدة لمنصة TeachSpace
 */
export default function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="md:w-1/2 text-center md:text-left rtl:md:text-right">
            <Badge variant="primary" className="mb-4">منصة التعليم عن بعد الأولى</Badge>
            <h1 className="hero-title">
              جلسات تعليمية <span className="hero-title-highlight">عبر الإنترنت</span> مع أفضل المعلمين
            </h1>
            <p className="hero-description">
              منصة درسي تساعدك في العثور على أفضل المعلمين المتخصصين. تصفح المعلمين وتواصل مع الإدارة لحجز جلساتك التعليمية.
            </p>
            <div className="hero-buttons justify-center md:justify-start rtl:md:justify-end">
              <Link href="/teachers">
                <Button 
                  variant="primary" 
                  size="lg"
                  icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>}
                >
                  ابحث عن معلم
                </Button>
              </Link>
              <Link href="/teacher-application">
                <Button 
                  variant="warning" 
                  size="lg"
                  icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>}
                >
                  انضم كمعلم
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="md:w-1/2 flex items-center justify-center">
            <div className="hero-image-container">
              {/* صورة رئيسية توضح جلسة تعليمية عبر الإنترنت */}
              <div className="hero-image">
                <div className="hero-image-gradient">
                  <div className="relative w-full h-full bg-white dark:bg-gray-700 rounded-md overflow-hidden flex flex-col">
                    {/* شريط عنوان محاكاة لتطبيق مؤتمرات الفيديو */}
                    <div className="bg-gray-100 dark:bg-gray-800 p-2 flex justify-between items-center border-b border-gray-200 dark:border-gray-600">
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      </div>
                      <div className="text-xs font-medium text-gray-600 dark:text-gray-300">منصة درسي - جلسة تعليمية</div>
                      <div></div>
                    </div>
                    
                    {/* محتوى الجلسة */}
                    <div className="flex-1 p-4 flex">
                      {/* المعلم */}
                      <div className="w-1/3 flex flex-col items-center">
                        <div className="w-16 h-16 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center mb-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600 dark:text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                        <span className="text-xs text-gray-700 dark:text-gray-300">المعلم</span>
                      </div>
                      
                      {/* المحتوى التعليمي */}
                      <div className="w-2/3 flex flex-col">
                        <div className="flex-1 bg-gray-100 dark:bg-gray-600 rounded-md mb-2 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-500 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <div className="flex justify-center space-x-2 rtl:space-x-reverse">
                          <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                            </svg>
                          </div>
                          <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* بطاقة معلومات الجلسة */}
              <div className="hero-session-card">
                <div className="hero-session-title">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="hero-session-title-text">جلسة مباشرة</span>
                </div>
                <div className="hero-session-description">تعلم بسهولة من أي مكان مع دعم كامل للفيديو والصوت</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
