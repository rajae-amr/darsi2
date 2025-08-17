"use client";

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Badge from '../ui/Badge';
import { HomePageService } from '@/app/services/homepage/homepageService';
import AddTestimonial from './AddTestimonial';
import { getFullImageUrl } from '@/utils/imageUtils';
import { Testimonial } from '@/app/services/testimonials/types';



export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  
  // جلب الشهادات من خدمة الصفحة الرئيسية عند تحميل المكون
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        
        // إنشاء كائن من خدمة الصفحة الرئيسية
        const homepageService = new HomePageService();
        
        // استدعاء دالة جلب بيانات الصفحة الرئيسية
        const homepageData = await homepageService.getHomePageData();
        
        // استخراج الشهادات من بيانات الصفحة الرئيسية
        const testimonialsData = homepageData.testimonials;
        console.log('الشهادات المستلمة من خدمة الصفحة الرئيسية:', testimonialsData);
        
        if (Array.isArray(testimonialsData) && testimonialsData.length > 0) {
          // إضافة image_url للبيانات المستلمة
          const testimonialsWithImageUrl = testimonialsData.map((item: Partial<Testimonial>) => {
            // التأكد من أن جميع الحقول المطلوبة موجودة
            return {
              id: item.id || 0,
              name: item.name || '',
              role: item.role || '',
              content: item.content || '',
              image: item.image || null,
              image_url: item.image || null,
              rating: item.rating || 0,
              created_at: item.created_at || new Date().toISOString(),
              user: item.user || null
            };
          });
          
          setTestimonials(testimonialsWithImageUrl);
          console.log('تم تعيين الشهادات بنجاح:', testimonialsWithImageUrl.length);
          setError(null);
        } else {
          console.warn('لم يتم العثور على شهادات معتمدة');
          // لا نقوم بتعيين الشهادات إلى مصفوفة فارغة لكي يظهر المحتوى الاحتياطي
          setTestimonials([]);
        }
      } catch (err) {
        console.error('خطأ في جلب الشهادات:', err);
        setError('حدث خطأ أثناء جلب الشهادات. يرجى المحاولة مرة أخرى لاحقاً.');
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);



  // استخدام البيانات الاحتياطية إذا كانت البيانات من الباك إند فارغة
  const displayTestimonials = useMemo(() => {
    return testimonials.length > 0 ? testimonials : [];
  }, [testimonials]);
  
  // طباعة البيانات للتصحيح
  useEffect(() => {
    console.log('الشهادات من الباك إند:', testimonials);
    console.log('الشهادات المعروضة:', displayTestimonials);
  }, [testimonials, displayTestimonials]);

  const [activeIndex, setActiveIndex] = useState(0);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(displayTestimonials.length / itemsPerPage);

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % totalPages);
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + totalPages) % totalPages);
  };

  const visibleTestimonials = displayTestimonials.slice(
    activeIndex * itemsPerPage,
    (activeIndex + 1) * itemsPerPage
  );



  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <svg
        key={index}
        xmlns="http://www.w3.org/2000/svg"
        className={`h-4 w-4 ${
          index < rating ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"
        }`}
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
      </svg>
    ));
  };

  // إعادة تحميل الشهادات بعد إضافة شهادة جديدة
  const handleTestimonialAdded = () => {
    // إعادة تحميل الشهادات بعد فترة قصيرة للسماح للخادم بمعالجة الإضافة
    setTimeout(() => {
      const fetchTestimonials = async () => {
        try {
          setLoading(true);
          // استخدام HomePageService بدلاً من testimonialService
          const homepageService = new HomePageService();
          const homepageData = await homepageService.getHomePageData();
          const data = homepageData.testimonials;
          console.log('الشهادات المستلمة:', data);
          if (data && data.length > 0) {
            // تصحيح مسارات الصور قبل تعيين الشهادات
            const fixImageUrl = (url: string | null): string => {
              if (!url) return "/images/default-avatar.png";
              
              // إذا كان المسار يحتوي على localhost:8000/api/testimonials/media
              if (url.includes('/api/testimonials/media')) {
                // استبدال المسار غير الصحيح بالمسار الصحيح
                return url.replace('/api/testimonials/media', '/media');
              }
              
              return url;
            };

            const fixedData = data.map((testimonial: Partial<Testimonial>) => {
              // تأكد من أن البيانات تطابق واجهة Testimonial
              const fixedTestimonial: Testimonial = {
                id: testimonial.id || 0,
                name: testimonial.name || '',
                role: testimonial.role || '',
                content: testimonial.content || '',
                rating: testimonial.rating || 0,
                created_at: testimonial.created_at || new Date().toISOString(),
                user: testimonial.user || null,
                image_url: testimonial.image_url ? fixImageUrl(testimonial.image_url) : (testimonial.image || null),
                image: testimonial.image ? fixImageUrl(testimonial.image) : null
              };
              return fixedTestimonial;
            });
            setTestimonials(fixedData);
          }
        } catch (error) {
          console.error('خطأ في جلب الشهادات:', error);
          setError('حدث خطأ أثناء تحميل الشهادات');
        } finally {
          setLoading(false);
        }
      };

      fetchTestimonials();
    }, 1000);
    
    // إخفاء نموذج الإضافة
    setShowAddForm(false);
  };

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge  className="mb-4">آراء الطلاب</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            ماذا يقول طلابنا عن تجربتهم
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            استمع إلى تجارب الطلاب الحقيقية مع منصة TeachSpace وكيف ساعدتهم الجلسات التعليمية عبر الإنترنت
          </p>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="mt-6 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-700 dark:hover:bg-blue-800"
          >
            {showAddForm ? 'إلغاء' : 'أضف شهادتك'}
          </button>
        </div>

        {showAddForm && (
          <AddTestimonial 
            onSuccess={handleTestimonialAdded} 
            onCancel={() => setShowAddForm(false)} 
          />
        )}

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-500">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              إعادة المحاولة
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {visibleTestimonials.length > 0 ? (
            visibleTestimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex flex-col h-full"
              >
              <div className="flex items-center mb-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                  <Image
                    src={getFullImageUrl(testimonial.image_url || testimonial.image)}
                    alt={testimonial.name}
                    fill
                    sizes="48px"
                    className="object-cover"
                    onError={(e) => {
                      // استخدام صورة افتراضية في حالة فشل تحميل الصورة
                      const target = e.target as HTMLImageElement;
                      target.src = "/images/default-avatar.png";
                    }}
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {testimonial.role}
                  </p>
                </div>
              </div>

              <div className="flex mb-4">{renderStars(testimonial.rating)}</div>

              <blockquote className="text-gray-700 dark:text-gray-300 mb-4 flex-grow">
                &ldquo;{testimonial.content}&rdquo;
              </blockquote>
            </div>
            ))
          ) : (
            <div className="col-span-3 text-center py-10">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
                <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 14h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  لا توجد شهادات حتى الآن
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  لم يتم إضافة أي شهادات من الطلاب بعد. ستظهر الشهادات هنا بمجرد إضافتها واعتمادها.
                </p>
                <button
                  onClick={() => setShowAddForm(true)}
                  className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-md transition duration-300"
                >
                  أضف شهادتك الآن
                </button>
              </div>
            </div>
          )}
        </div>
        )}

        {totalPages > 1 && (
          <div className="flex justify-center mt-8">
            <button
              onClick={handlePrev}
              className="mx-2 p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
              aria-label="Previous testimonials"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-600 dark:text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <div className="flex items-center">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`mx-1 w-2 h-2 rounded-full ${
                    index === activeIndex
                      ? "bg-blue-600 w-4"
                      : "bg-gray-300 dark:bg-gray-600"
                  } transition-all duration-300`}
                  aria-label={`Go to page ${index + 1}`}
                ></button>
              ))}
            </div>
            <button
              onClick={handleNext}
              className="mx-2 p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
              aria-label="Next testimonials"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-600 dark:text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
