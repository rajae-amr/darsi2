import React from 'react';
import { UserProfile, ContactInfo as ContactInfoType } from '@/app/services/auth/types';

interface ContactInfoProps {
  user: UserProfile | null;
  isEditing: boolean;
  formData: Partial<UserProfile>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

/**
 * مكون معلومات الاتصال للمستخدم
 */
const ContactInfo: React.FC<ContactInfoProps> = ({ user, isEditing, formData, handleChange }) => {
  // استخراج بيانات الاتصال من formData أو من user
  const contactData = formData.contact_info || user?.contact_info || {};
  
  // معالجة تغيير حقول معلومات الاتصال
  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const updatedContactInfo = {
      ...formData.contact_info,
      [name]: value,
    };
    
    // استدعاء handleChange الأصلي مع تحديث كامل لـ contact_info
    const syntheticEvent = {
      target: {
        name: 'contact_info',
        value: updatedContactInfo,
      },
    } as unknown as React.ChangeEvent<HTMLInputElement>;
    
    handleChange(syntheticEvent);
  };
  return (
    <div className="mb-4 overflow-hidden rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
      <h2 className="mb-3 text-sm font-semibold text-gray-900 dark:text-gray-100">معلومات الاتصال</h2>
      
      {isEditing ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-300">
              رقم الهاتف
            </label>
            <input
              type="tel"
              name="phone_number"
              value={formData.phone_number || ''}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
            />
          </div>
          
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-300">
              الموقع الإلكتروني
            </label>
            <input
              type="url"
              name="website"
              value={contactData.website || ''}
              onChange={handleContactChange}
              className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
              placeholder="https://example.com"
            />
          </div>
          
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-300">
              المدينة
            </label>
            <input
              type="text"
              name="city"
              value={contactData.city || ''}
              onChange={handleContactChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-300">
              الدولة
            </label>
            <input
              type="text"
              name="country"
              value={contactData.country || ''}
              onChange={handleContactChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-300">
              العنوان
            </label>
            <input
              type="text"
              name="address"
              value={contactData.address || ''}
              onChange={handleContactChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-300">
              الرمز البريدي
            </label>
            <input
              type="text"
              name="postal_code"
              value={contactData.postal_code || ''}
              onChange={handleContactChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-300">
              المنطقة الزمنية
            </label>
            <input
              type="text"
              name="timezone"
              value={contactData.timezone || ''}
              onChange={handleContactChange}
              className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
              placeholder="Asia/Dubai"
            />
          </div>
          
          <div className="col-span-2">
            <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-300">
              نبذة شخصية
            </label>
            <textarea
              name="bio"
              value={formData.bio || ''}
              onChange={handleChange}
              rows={4}
              className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
            />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400">رقم الهاتف</h3>
            <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">{user?.phone_number || '-'}</p>
          </div>
          
          <div>
            <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400">الموقع الإلكتروني</h3>
            <p className="mt-1">
              {user?.contact_info?.website ? (
                <a 
                  href={user.contact_info.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {user.contact_info.website}
                </a>
              ) : '-'}
            </p>
          </div>
          
          <div>
            <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400">المدينة</h3>
            <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">{user?.contact_info?.city || '-'}</p>
          </div>
          
          <div>
            <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400">الدولة</h3>
            <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">{user?.contact_info?.country || '-'}</p>
          </div>
          
          <div>
            <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400">العنوان</h3>
            <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">{user?.contact_info?.address || '-'}</p>
          </div>
          
          <div>
            <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400">الرمز البريدي</h3>
            <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">{user?.contact_info?.postal_code || '-'}</p>
          </div>
          
          <div>
            <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400">المنطقة الزمنية</h3>
            <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">{user?.contact_info?.timezone || '-'}</p>
          </div>
          
          <div className="col-span-2">
            <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400">نبذة شخصية</h3>
            <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">{user?.bio || '-'}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactInfo;
