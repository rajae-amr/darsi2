import { FcGoogle } from 'react-icons/fc';
import { FaFacebookF } from 'react-icons/fa';
import Button from '@/app/components/ui/Button';

export default function SocialLoginButtons() {
  return (
    <div className="mt-6 space-y-2">
      <Button
        type="button"
        variant="flat"
        fullWidth={true}
        icon={<FcGoogle className="text-xl" />}
        iconPosition="left"
        className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700"
      >
        تسجيل الدخول باستخدام جوجل
      </Button>

      <Button
        type="button"
        variant="flat"
        fullWidth={true}
        icon={<FaFacebookF className="text-xl" />}
        iconPosition="left"
        className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700"
      >
        تسجيل الدخول باستخدام فيسبوك
      </Button>
    </div>
  );
}
