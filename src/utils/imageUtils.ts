/**
 * وظائف مساعدة للتعامل مع الصور
 */

// استيراد عنوان API من ملف التكوين المركزي
import { API_ROOT_URL } from '@/app/config/api';

/**
 * تحويل مسار الصورة النسبي إلى مسار كامل
 * @param imagePath مسار الصورة النسبي من الباك إند
 * @returns مسار الصورة الكامل
 */
export const getFullImageUrl = (imagePath: string | null | undefined): string => {
  if (!imagePath) {
    return '/images/placeholder-user.jpg'; // صورة افتراضية محلية
  }

  // إذا كان المسار يبدأ بـ http أو https، فهو مسار كامل بالفعل
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }

  // إذا كان المسار يبدأ بـ /media، فهو مسار نسبي من الباك إند
  if (imagePath.startsWith('/media')) {
    return `${API_ROOT_URL}${imagePath}`;
  }

  // إذا كان المسار يبدأ بـ /، فهو مسار محلي
  if (imagePath.startsWith('/')) {
    return imagePath;
  }

  // في حالة أخرى، نفترض أنه مسار نسبي من الباك إند
  return `${API_ROOT_URL}/${imagePath}`;
};
