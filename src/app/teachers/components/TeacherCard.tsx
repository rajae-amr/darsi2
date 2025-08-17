import { useRouter } from 'next/navigation';
import { Teacher } from '../../services/teachers/types';
import Image from 'next/image';
import { AcademicCapIcon, BookOpenIcon, ClockIcon, UserIcon, StarIcon } from '@heroicons/react/24/outline';
import { getSpecializationText, getTeachingLevelText } from '../../../utils/constants';
import { Button } from '@/app/components/ui/Button';
interface TeacherCardProps {
  teacher: Teacher;
  searchQuery?: string;
  activeFilters?: {
    specialization?: string;
    teaching_level?: string;
    average_rating?: string;
    experience?: string;
    min_price?: string;
    max_price?: string;
    country?: string;
    city?: string;
  };
}

export default function TeacherCard({ teacher, searchQuery, activeFilters }: TeacherCardProps) {
  const router = useRouter();
  
  // التحقق من تطابق الفلاتر مع بيانات المعلم
  const isSpecializationMatch = activeFilters?.specialization && teacher.teacher_profile?.specialization
    ? teacher.teacher_profile.specialization.toLowerCase().includes(activeFilters.specialization.toLowerCase())
    : false;
    
  const isTeachingLevelMatch = activeFilters?.teaching_level && teacher.teacher_profile?.teaching_levels
    ? teacher.teacher_profile.teaching_levels.toLowerCase().includes(activeFilters.teaching_level.toLowerCase())
    : false;
    
  const hasSearchMatch = searchQuery && (teacher.display_name || teacher.bio)
    ? (teacher.display_name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
       teacher.bio?.toLowerCase().includes(searchQuery.toLowerCase()))
    : false;
    
  // التحقق من تطابق الفلاتر المتقدمة
  const isCountryMatch = activeFilters?.country && teacher.contact_info?.country
    ? teacher.contact_info.country.toLowerCase().includes(activeFilters.country.toLowerCase())
    : false;
    
  const isCityMatch = activeFilters?.city && teacher.contact_info?.city
    ? teacher.contact_info.city.toLowerCase().includes(activeFilters.city.toLowerCase())
    : false;
  
  // التحقق من تطابق الفلاتر الجديدة
  const isRatingMatch = activeFilters?.average_rating && teacher.teacher_profile?.average_rating
    ? teacher.teacher_profile.average_rating >= parseFloat(activeFilters.average_rating)
    : false;
  
  const isExperienceMatch = activeFilters?.experience && teacher.teacher_profile?.years_of_experience
    ? (activeFilters.experience === 'beginner' && teacher.teacher_profile.years_of_experience < 2) ||
      (activeFilters.experience === 'intermediate' && teacher.teacher_profile.years_of_experience >= 2 && teacher.teacher_profile.years_of_experience < 5) ||
      (activeFilters.experience === 'expert' && teacher.teacher_profile.years_of_experience >= 5)
    : false;
  
  const getMinPrice = () => {
    if (!teacher.services || teacher.services.length === 0) return Infinity;
    return Math.min(...teacher.services.map(service => service.price));
  };
  
  const isPriceMatch = teacher.services && teacher.services.length > 0
    ? (activeFilters?.min_price && getMinPrice() >= parseFloat(activeFilters.min_price)) ||
      (activeFilters?.max_price && getMinPrice() <= parseFloat(activeFilters.max_price)) ||
      (activeFilters?.min_price && activeFilters?.max_price && 
        getMinPrice() >= parseFloat(activeFilters.min_price) && 
        getMinPrice() <= parseFloat(activeFilters.max_price))
    : false;
    
  // تحديد ما إذا كان هناك أي تطابق مع الفلاتر أو البحث
  const hasAnyMatch = isSpecializationMatch || isTeachingLevelMatch || hasSearchMatch || isCountryMatch || isCityMatch || isRatingMatch || isExperienceMatch || isPriceMatch;

  // تم نقل دوال تحويل التخصص والمستوى التعليمي إلى ملف الثوابت المشتركة
  
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden ${hasAnyMatch ? 'ring-2 ring-blue-400' : ''} hover:shadow-lg transition-all duration-300`}>
      <div className="flex flex-col md:flex-row">
        {/* صورة المعلم */}
        <div className="w-full md:w-1/4 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center p-6">
          <div className="relative">
            {teacher.profile_image ? (
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white dark:border-gray-700 shadow-md">
                <Image 
                  src='https://cdn-icons-png.flaticon.com/512/3135/3135715.png' 
                  alt={`صورة ${teacher.display_name}`} 
                  width={128}
                  height={128}
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-4xl font-bold shadow-md border-4 border-white dark:border-gray-700">
                {teacher.display_name.charAt(0)}
              </div>
            )}
            
            {/* شارات تطابق الفلاتر */}
            {hasAnyMatch && (
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-md">
                <span>✓</span>
              </div>
            )}
          </div>
        </div>
        
        {/* معلومات المعلم */}
        <div className="p-6 flex-grow">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <h2 className="text-xl font-bold">{teacher.display_name}</h2>
            
            {/* شارات المدرس المميز والموثق */}
            {teacher.teacher_profile?.is_featured && (
              <span className="inline-block bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                مدرس مميز
              </span>
            )}
            {teacher.teacher_profile?.is_verified && (
              <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                موثق
              </span>
            )}
            
            {/* شارات تطابق الفلاتر */}
            <div className="flex flex-wrap gap-1">
              {isSpecializationMatch && (
                <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                  تطابق التخصص
                </span>
              )}
              {isTeachingLevelMatch && (
                <span className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                  تطابق المستوى التعليمي
                </span>
              )}
              {hasSearchMatch && (
                <span className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                  تطابق البحث
                </span>
              )}
              {isCountryMatch && (
                <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                  تطابق البلد
                </span>
              )}
              {isCityMatch && (
                <span className="inline-block bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full">
                  تطابق المدينة
                </span>
              )}
            </div>
          </div>
          
          {/* نبذة تعريفية */}
          <div className="mb-4">
            <p className="text-gray-600 dark:text-gray-300">{teacher.bio || 'لا يوجد وصف'}</p>
          </div>
          
          {/* معلومات المعلم */}
          <div className="mb-5 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* التخصص */}
              <div className="flex items-center gap-2">
                <BookOpenIcon className="h-5 w-5 text-blue-500 dark:text-blue-400" />
                <div>
                  <span className="text-xs text-gray-500 dark:text-gray-400 block">التخصص</span>
                  <span className="font-medium">{getSpecializationText(teacher.teacher_profile?.specialization)}</span>
                </div>
              </div>
              
              {/* المستوى التعليمي */}
              {teacher.teacher_profile?.teaching_levels && (
                <div className="flex items-center gap-2">
                  <AcademicCapIcon className="h-5 w-5 text-blue-500 dark:text-blue-400" />
                  <div>
                    <span className="text-xs text-gray-500 dark:text-gray-400 block">المستوى التعليمي</span>
                    <span className="font-medium">{getTeachingLevelText(teacher.teacher_profile.teaching_levels)}</span>
                  </div>
                </div>
              )}
              
              {/* سنوات الخبرة */}
              {teacher.teacher_profile?.years_of_experience && (
                <div className="flex items-center gap-2">
                  <ClockIcon className="h-5 w-5 text-blue-500 dark:text-blue-400" />
                  <div>
                    <span className="text-xs text-gray-500 dark:text-gray-400 block">سنوات الخبرة</span>
                    <span className="font-medium">{teacher.teacher_profile.years_of_experience} سنة</span>
                  </div>
                </div>
              )}
              


              {/* التقييم */}
              {teacher.teacher_profile?.average_rating && (
                <div className="flex items-center gap-2">
                  <StarIcon className="h-5 w-5 text-yellow-500 dark:text-yellow-400" />
                  <div>
                    <span className="text-xs text-gray-500 dark:text-gray-400 block">متوسط التقييم</span>
                    <span className="font-medium">{teacher.teacher_profile.average_rating}/5.00</span>
                  </div>
                </div>
              )}
              
              {/* الموقع الجغرافي */}
              {(teacher.contact_info?.country || teacher.contact_info?.city) && (
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <span className="text-xs text-gray-500 dark:text-gray-400 block">العنوان</span>
                    <span className="font-medium">
                      {teacher.contact_info?.city && teacher.contact_info?.country 
                        ? `${teacher.contact_info.city}، ${teacher.contact_info.country}`
                        : teacher.contact_info?.city || teacher.contact_info?.country}
                    </span>
                  </div>
                </div>
              )}
              

            </div>
          </div>
          
          {/* أزرار العمل */}

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
      </div>
    </div>
  );
}
