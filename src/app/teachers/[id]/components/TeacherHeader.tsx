import Link from 'next/link';
import { BiInfoCircle } from 'react-icons/bi';
import Alert from '@/app/components/ui/Alert';

/**
 * مكون رأس صفحة المدرس الفردي
 */
export default function TeacherHeader() {
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <Link href="/teachers" className="inline-block text-blue-600 hover:underline">
          &larr; العودة إلى قائمة المدرسين
        </Link>
        <h1 className="text-2xl font-bold">صفحة المدرس</h1>
      </div>
      
      <Alert 
        variant="info" 
        icon={<BiInfoCircle className="w-5 h-5" />}
        className="mb-6"
      >
        <p>تقدم منصة درسي جلسات تعليمية عبر الإنترنت فقط. يمكنك حجز جلسة مع المدرس وسيتم توفير رابط الاجتماع عبر Zoom أو Google Meet.</p>
      </Alert>
    </>
  );
}
