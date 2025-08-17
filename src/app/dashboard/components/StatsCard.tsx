import React from 'react';
import { 
  FiCalendar, FiCheckCircle, FiClock, FiDollarSign, 
  FiTrendingUp, FiUsers, FiActivity, FiUserPlus 
} from 'react-icons/fi';

type StatsCardProps = {
  title: string;
  value: string | number;
  icon: string;
  trend?: number;
  trendUp?: boolean;
  className?: string;
  variant?: 'primary' | 'secondary';
};

export default function StatsCard({ 
  title, 
  value, 
  icon, 
  trend, 
  trendUp = true,
  className = '',
  variant = 'primary'
}: StatsCardProps) {
  
  // تحديد أيقونة بناءً على النوع
  const renderIcon = () => {
    switch (icon) {
      case 'calendar':
        return <FiCalendar className="w-6 h-6" />;
      case 'check-circle':
        return <FiCheckCircle className="w-6 h-6" />;
      case 'clock':
        return <FiClock className="w-6 h-6" />;
      case 'dollar-sign':
        return <FiDollarSign className="w-6 h-6" />;
      case 'trending-up':
        return <FiTrendingUp className="w-6 h-6" />;
      case 'users':
        return <FiUsers className="w-6 h-6" />;
      case 'user-plus':
        return <FiUserPlus className="w-6 h-6" />;
      default:
        return <FiActivity className="w-6 h-6" />;
    }
  };
  
  return (
    <div className={`${variant === 'secondary' ? 'bg-gray-50 dark:bg-gray-900/40' : 'bg-white dark:bg-gray-900'} rounded-lg border border-gray-200 dark:border-gray-700 p-4 sm:p-5 ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400">{title}</p>
          <p className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">{value}</p>
          {trend !== undefined && (
            <div className={`mt-2 inline-flex items-center ${trendUp ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {trendUp ? (
                <FiTrendingUp className="ml-1 h-4 w-4" />
              ) : (
                <FiTrendingUp className="ml-1 h-4 w-4 rotate-180" />
              )}
              <span className="text-xs font-medium">{trend}%</span>
            </div>
          )}
        </div>
        <div className="rounded-md border border-gray-200 bg-blue-50 p-2.5 text-blue-600 dark:border-gray-700 dark:bg-blue-900/20 dark:text-blue-300">
          {renderIcon()}
        </div>
      </div>
    </div>
  );
}
