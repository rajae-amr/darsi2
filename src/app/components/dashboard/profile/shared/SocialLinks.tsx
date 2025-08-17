import React from 'react';
import { UserProfile } from '@/app/services/auth/types';

interface SocialLinksProps {
  user: UserProfile | null;
  isEditing: boolean;
  formData: Partial<UserProfile>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>, nestedField?: string) => void;
}

/**
 * مكون روابط التواصل الاجتماعي للمستخدم
 */
const SocialLinks: React.FC<SocialLinksProps> = ({ user, isEditing, formData, handleChange }) => {
  return (
    <div className="mb-4 overflow-hidden rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
      <h2 className="mb-3 text-sm font-semibold text-gray-900 dark:text-gray-100">روابط التواصل الاجتماعي</h2>
      
      {isEditing ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-300">
              فيسبوك
            </label>
            <input
              type="url"
              name="facebook"
              value={formData.social_links?.facebook || ''}
              onChange={(e) => handleChange(e, 'social_links')}
              className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
              placeholder="https://facebook.com/username"
            />
          </div>
          
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-300">
              تويتر
            </label>
            <input
              type="url"
              name="twitter"
              value={formData.social_links?.twitter || ''}
              onChange={(e) => handleChange(e, 'social_links')}
              className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
              placeholder="https://twitter.com/username"
            />
          </div>
          
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-300">
              لينكد إن
            </label>
            <input
              type="url"
              name="linkedin"
              value={formData.social_links?.linkedin || ''}
              onChange={(e) => handleChange(e, 'social_links')}
              className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
              placeholder="https://linkedin.com/in/username"
            />
          </div>
          
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-300">
              انستغرام
            </label>
            <input
              type="url"
              name="instagram"
              value={formData.social_links?.instagram || ''}
              onChange={(e) => handleChange(e, 'social_links')}
              className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
              placeholder="https://instagram.com/username"
            />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400">فيسبوك</h3>
            <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
              {user?.social_links?.facebook ? (
                <a 
                  href={user.social_links.facebook} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
                >
                  {user.social_links.facebook}
                </a>
              ) : '-'}
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">تويتر</h3>
            <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
              {user?.social_links?.twitter ? (
                <a 
                  href={user.social_links.twitter} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
                >
                  {user.social_links.twitter}
                </a>
              ) : '-'}
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">لينكد إن</h3>
            <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
              {user?.social_links?.linkedin ? (
                <a 
                  href={user.social_links.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
                >
                  {user.social_links.linkedin}
                </a>
              ) : '-'}
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">انستغرام</h3>
            <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
              {user?.social_links?.instagram ? (
                <a 
                  href={user.social_links.instagram} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
                >
                  {user.social_links.instagram}
                </a>
              ) : '-'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SocialLinks;
