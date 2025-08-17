"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Badge from '@/app/components/ui/Badge';
import Button from '@/app/components/ui/Button';
import { Card, CardBody } from '@/app/components/ui/Card';
import { HomePageService } from '@/app/services/homepage/homepageService';
import { Teacher } from '@/app/services/teachers/types';
import { getFullImageUrl } from '@/utils/imageUtils';
import { SPECIALIZATION_MAP } from '@/utils/constants';

export default function FeaturedTeachers() {
  // حالة تخزين بيانات المعلمين
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  // حالة التحميل
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // حالة الخطأ
  const [error, setError] = useState<string | null>(null);

  // استخدام صورة افتراضية في حالة عدم وجود الصورة
  const defaultImage = "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";

  // جلب بيانات المعلمين المميزين من الباكاند باستخدام خدمة الصفحة الرئيسية
  useEffect(() => {
    const fetchFeaturedTeachers = async () => {
      try {
        setIsLoading(true);
        
        // إنشاء كائن من خدمة الصفحة الرئيسية
        const homepageService = new HomePageService();
        
        // استدعاء دالة جلب بيانات الصفحة الرئيسية
        const homepageData = await homepageService.getHomePageData();
        
        // استخراج المعلمين المميزين من بيانات الصفحة الرئيسية
        // فلترة المعلمين للتأكد من أنهم مميزون فعلاً (is_featured=true)
        const featuredTeachers = homepageData.featured_teachers.filter(teacher => 
          teacher.teacher_profile && teacher.teacher_profile.is_featured
        );
        
        setTeachers(featuredTeachers);
        setError(null);
      } catch (err) {
        console.error('خطأ في جلب بيانات المعلمين المميزين:', err);
        setError('حدث خطأ أثناء جلب بيانات المعلمين. يرجى المحاولة مرة أخرى لاحقاً.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedTeachers();
  }, []);

  // عرض حالة التحميل
  if (isLoading) {
    return (
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="primary" className="mb-4">معلمون مميزون</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              تعلم مع نخبة من أفضل المعلمين
            </h2>
          </div>
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        </div>
      </section>
    );
  }

  // عرض رسالة الخطأ إذا وجدت
  if (error) {
    return (
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="primary" className="mb-4">معلمون مميزون</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              تعلم مع نخبة من أفضل المعلمين
            </h2>
          </div>
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
            <p className="text-center">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="primary" className="mb-4">معلمون مميزون</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            نخبة من أفضل المعلمين لجلساتك التعليمية
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            اختر من بين مئات المعلمين المؤهلين ذوي الخبرة وتواصل مع إدارة المنصة لحجز جلستك التعليمية
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teachers.map((teacher: Teacher) => (
            <Card key={teacher.id} hover={true} className="h-full">
              <CardBody className="flex flex-col h-full">
                <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-50 z-10"></div>
                  <Image 
                    src={getFullImageUrl(teacher.profile_image)} 
                    alt={teacher.display_name}
                    fill
                    style={{ objectFit: 'cover' }}
                    onError={(e) => {
                      // استخدام صورة افتراضية في حالة فشل تحميل الصورة
                      const target = e.target as HTMLImageElement;
                      target.src = defaultImage;
                    }}
                  />
                  {/* عرض التقييم إذا كان متاحاً */}
                  {teacher.teacher_profile && teacher.teacher_profile.average_rating !== null && (
                    <div className="absolute bottom-2 left-2 z-20 flex items-center">
                      <span className="bg-yellow-400 text-gray-900 text-xs font-bold px-2 py-1 rounded-full flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                        {Number(teacher.teacher_profile.average_rating).toFixed(1)}
                      </span>
                      <span className="text-white text-xs mr-2">({teacher.teacher_profile.rating_count || 0} تقييم)</span>
                    </div>
                  )}
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{teacher.display_name}</h3>
                
                <div className="flex flex-wrap gap-1 mb-3">
                  {teacher.teacher_profile && teacher.teacher_profile.specialization && (
                    <Badge variant="primary" className="mb-4">{SPECIALIZATION_MAP[teacher.teacher_profile.specialization] || teacher.teacher_profile.specialization}</Badge>
                  )}
                  {teacher.teacher_profile && teacher.teacher_profile.is_featured && (
                    <Badge variant="success" className="mb-4">معلم مميز</Badge>
                  )}
                </div>
                
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 flex-grow">{teacher.bio || 'لا توجد نبذة متاحة'}</p>
                
                <div className="mt-auto">
                  <div className="flex justify-between items-center mb-4">
                    {teacher.availability_schedules && teacher.availability_schedules.length > 0 && (
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-sm text-gray-600 dark:text-gray-300">{teacher.availability_schedules[0].title}</span>
                      </div>
                    )}
                    {teacher.services && teacher.services.length > 0 && (
                      <div className="text-lg font-bold text-gray-900 dark:text-white">
                        {teacher.services[0].price} ر.س<span className="text-sm font-normal text-gray-500 dark:text-gray-400">/ساعة</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    
                      <Button 
                       href={`/teachers/${teacher.id}`}
                        variant="outline" 
                         size="sm"
                        className="w-full bg-white hover:bg-blue-50 text-blue-600 border-blue-500 hover:border-blue-600 transition-all duration-200 flex items-center justify-center gap-1 py-2"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        ملف المدرس
                      </Button>



                      <Button
                              variant="primary"
                              size="sm"
                              className="w-full"
                              onClick={() => {
                                const username = teacher.teacher_profile.telegram_username 
                                  ? teacher.teacher_profile.telegram_username 
                                  : "M_Y_H_A"; // الحساب الافتراضي
                                window.open("https://t.me/" + username, "_blank");
                              }}
                            >
                              تواصل عبر التيليجرام
                            </Button>



                            <Button
                            variant="success"
                            size="sm"
                            className="w-full"
                            onClick={() => {
                              const whatsappNumber = teacher.teacher_profile.whatsapp_number
                                ? teacher.teacher_profile.whatsapp_number
                                : "971521565010"; // الرقم الافتراضي
                              
                              window.open(
                                "https://wa.me/" +
                                  whatsappNumber +
                                  "?text=" +
                                  encodeURIComponent("مرحباً، أود الاستفسار عن دروسك."),
                                "_blank"
                              );
                            }}
                          >
                            تواصل عبر الواتساب
                          </Button>


           

                     

                    

                    
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Link href="/teachers">
            <Button 
              variant="secondary" 
              size="lg"
              icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>}
              iconPosition="left"
            >
              عرض جميع المعلمين
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
