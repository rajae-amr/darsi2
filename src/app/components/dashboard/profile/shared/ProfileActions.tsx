import React from 'react';
import Button from '@/app/components/ui/Button';

interface ProfileActionsProps {
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
  handleSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
}

/**
 * مكون أزرار التحكم في الملف الشخصي
 */
const ProfileActions: React.FC<ProfileActionsProps> = ({ 
  isEditing, 
  setIsEditing, 
  handleSubmit,
  isSubmitting 
}) => {
  // دالة لمعالجة النقر على زر الحفظ
  const handleSaveClick = () => {
    // إنشاء كائن FormEvent وهمي لتمريره إلى handleSubmit
    const formEvent = new Event('submit') as unknown as React.FormEvent;
    handleSubmit(formEvent);
  };

  return (
    <div className="mb-4 flex justify-end space-x-2 rtl:space-x-reverse">
      {isEditing ? (
        <>
          <Button
            variant="flat"
            onClick={() => setIsEditing(false)}
            disabled={isSubmitting}
            className="rounded-md border border-gray-200 bg-white px-3 py-2 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200"
          >
            إلغاء
          </Button>
          <Button
            variant="primary"
            onClick={handleSaveClick}
            disabled={isSubmitting}
            loading={isSubmitting}
          >
            {isSubmitting ? 'جاري الحفظ...' : 'حفظ التغييرات'}
          </Button>
        </>
      ) : (
        <Button
          variant="primary"
          onClick={() => setIsEditing(true)}
        >
          تعديل الملف الشخصي
        </Button>
      )}
    </div>
  );
};

export default ProfileActions;
