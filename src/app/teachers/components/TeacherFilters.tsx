import { useState, useEffect } from 'react';
import { TeacherFilters } from '../../services/teachers/types';
import { FunnelIcon, MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import './TeacherFilters.css';
import { getSpecializationText, formatPrice } from '@/utils/constants';

interface TeacherFiltersProps {
  filters: TeacherFilters;
  specializations: Array<string | { value: string; label: string }>;
  teachingLevels: string[];
  onFilterChange: (key: string, value: string | number | undefined) => void;
  onSearch: (query: string) => void;
  onResetFilters?: () => void; // دالة إعادة ضبط جميع الفلاتر (اختيارية)
}

export default function TeacherFiltersComponent({
  filters,
  specializations,
  teachingLevels,
  onFilterChange,
  onSearch,
  onResetFilters
}: TeacherFiltersProps) {
  const [searchText, setSearchText] = useState('');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [localFilters, setLocalFilters] = useState<TeacherFilters>(filters);
  
  // تحديث الفلاتر المحلية عند تغيير الفلاتر الخارجية
  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);
  
  // معالجة إرسال البحث
  const handleSubmitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchText);
  };
  
  // إعادة ضبط جميع الفلاتر
  const handleResetFilters = () => {
    // إعادة ضبط النص في حقل البحث
    setSearchText('');
    
    // إعادة ضبط الفلاتر المحلية
    setLocalFilters({});
    
    // إذا كانت دالة إعادة الضبط متوفرة، استخدمها لإعادة ضبط جميع الفلاتر دفعة واحدة
    if (onResetFilters) {
      onResetFilters();
      console.log('تم إعادة ضبط جميع الفلاتر باستخدام الدالة المركزية');
      return;
    }
    
    // إعادة ضبط البحث
    onSearch('');
    
    // إعادة ضبط جميع الفلاتر الرئيسية بشكل صريح
    // الفلاتر الأساسية
    onFilterChange('specialization', '');
    onFilterChange('teaching_level', '');
    
    // الفلاتر الجديدة
    onFilterChange('average_rating', '');
    onFilterChange('experience', '');
    onFilterChange('min_price', '');
    onFilterChange('max_price', '');
    
    // الفلاتر القديمة التي قد تكون موجودة في الصفحة الرئيسية
    onFilterChange('rating', '');
    onFilterChange('hourly_rate', '');
    
    // طباعة رسالة تأكيد في وحدة التحكم
    console.log('تم إعادة ضبط جميع الفلاتر');
  };
  
  // تطبيق الفلاتر
  const applyFilters = () => {
    // تطبيق جميع الفلاتر المحلية على الفلاتر الرئيسية
    Object.entries(localFilters).forEach(([key, value]) => {
      if (value !== undefined && value !== '') {
        onFilterChange(key, value);
      }
    });
    
    // إغلاق الفلاتر المتقدمة بعد التطبيق
    if (showAdvancedFilters) {
      setShowAdvancedFilters(false);
    }
  };
  
  // تحديث الفلاتر المحلية
  const updateLocalFilter = (key: string, value: string | number | undefined) => {
    setLocalFilters(prev => ({
      ...prev,
      [key]: value === '' ? undefined : value
    }));
  };
  
  // تحويل المستوى التعليمي إلى نص مفهوم بالعربية
  const getTeachingLevelText = (level: string) => {
    const levelMap: Record<string, string> = {
      'ابتدائي': 'ابتدائي',
      'middle': 'متوسط',
      'secondary': 'ثانوي',
      'university': 'جامعي',
      'other': 'أخرى'
    };
    
    return levelMap[level] || level;
  };
  
  return (
    <div className="teacher-filters">
      {/* شريط البحث المحسن */}
      <form onSubmit={handleSubmitSearch} className="teacher-filters-search-form">
        <div className="teacher-filters-search-input-wrapper">
          <div className="teacher-filters-search-icon">
            <MagnifyingGlassIcon className="h-5 w-5" />
          </div>
          <input
            type="text"
            value={searchText}
            placeholder="ابحث عن معلم حسب الاسم أو التخصص"
            className="teacher-filters-search-input"
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
        <button 
          type="submit"
          className="teacher-filters-search-button"
        >
          <span>بحث</span>
        </button>
      </form>
      
      {/* الفلاتر السريعة */}
      <div className="teacher-filters-options">
        <div className="teacher-filters-header">
          <FunnelIcon className="teacher-filters-header-icon" />
          <span className="teacher-filters-header-text">تصفية النتائج:</span>
        </div>
        
        {/* فلتر التخصص */}
        <div className="teacher-filters-select-wrapper">
          <select
            className="teacher-filters-select"
            value={localFilters.specialization || ''}
            onChange={(e) => updateLocalFilter('specialization', e.target.value)}
          >
            <option value="">جميع التخصصات</option>
            {specializations.map((spec) => (
              <option key={typeof spec === 'object' ? spec.value : spec} value={typeof spec === 'object' ? spec.value : spec}>
                {typeof spec === 'object' ? spec.label : spec}
              </option>
            ))}
          </select>
        </div>
        
        {/* فلتر المستوى التعليمي */}
        <div className="teacher-filters-select-wrapper">
          <select
            className="teacher-filters-select"
            value={localFilters.teaching_level || ''}
            onChange={(e) => updateLocalFilter('teaching_level', e.target.value)}
          >
            <option value="">جميع المستويات</option>
            {teachingLevels.map((level) => (
              <option key={level} value={level}>
                {getTeachingLevelText(level)}
              </option>
            ))}
          </select>
        </div>
        
        {/* زر تطبيق الفلاتر */}
        <button
          onClick={applyFilters}
          className="teacher-filters-button-apply"
        >
          تطبيق الفلاتر
        </button>
        
        {/* زر إعادة ضبط الفلاتر */}
        <button
          onClick={handleResetFilters}
          className="teacher-filters-button-reset"
        >
          <XMarkIcon className="h-5 w-5" />
          إعادة ضبط
        </button>
        
        {/* زر إظهار/إخفاء الفلاتر المتقدمة */}
        <button
          onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
          className="teacher-filters-button-advanced"
        >
          {showAdvancedFilters ? 'إخفاء الفلاتر المتقدمة' : 'عرض الفلاتر المتقدمة'}
        </button>
      </div>
      
      {/* قسم الفلاتر المتقدمة */}
      {showAdvancedFilters && (
        <div className="teacher-filters-advanced">
          <div className="teacher-filters-advanced-grid">
            {/* يمكن إضافة فلاتر متقدمة إضافية هنا */}
            <div className="teacher-filters-field">
              <label className="teacher-filters-label">التقييم</label>
              <select 
                className="teacher-filters-select"
                value={localFilters.average_rating || ''}
                onChange={(e) => updateLocalFilter('average_rating', e.target.value)}
              >
                <option value="">جميع التقييمات</option>
                <option value="5">5 نجوم</option>
                <option value="4">4 نجوم وأعلى</option>
                <option value="3">3 نجوم وأعلى</option>
              </select>
            </div>
            
            <div className="teacher-filters-field">
              <label className="teacher-filters-label">الخبرة</label>
              <select 
                className="teacher-filters-select"
                value={localFilters.experience || ''}
                onChange={(e) => updateLocalFilter('experience', e.target.value)}
              >
                <option value="">جميع مستويات الخبرة</option>
                <option value="beginner">مبتدئ (أقل من سنتين)</option>
                <option value="intermediate">متوسط (2-5 سنوات)</option>
                <option value="expert">خبير (أكثر من 5 سنوات)</option>
              </select>
            </div>
            
            <div className="teacher-filters-field">
              <label className="teacher-filters-label">سعر الخدمة</label>
              <div className="teacher-filters-price-range">
                <div className="teacher-filters-price-input">
                  <label>من</label>
                  <input 
                    type="number" 
                    className="teacher-filters-input" 
                    placeholder="الحد الأدنى"
                    value={localFilters.min_price || ''}
                    onChange={(e) => updateLocalFilter('min_price', e.target.value)}
                    min="0"
                  />
                </div>
                <div className="teacher-filters-price-input">
                  <label>إلى</label>
                  <input 
                    type="number" 
                    className="teacher-filters-input" 
                    placeholder="الحد الأقصى"
                    value={localFilters.max_price || ''}
                    onChange={(e) => updateLocalFilter('max_price', e.target.value)}
                    min="0"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* عرض الفلاتر النشطة */}
          {Object.entries(localFilters).length > 0 && (
            <div className="teacher-filters-active-filters">
              <span className="teacher-filters-label">الفلاتر النشطة:</span>
              {Object.entries(localFilters).map(([key, value]) => {
                if (!value) return null;
                
                let displayText = '';
                
                // تحويل مفاتيح الفلتر إلى نص مفهوم
                switch(key) {
                  case 'specialization':
                    displayText = `التخصص: ${getSpecializationText(value as string)}`;
                    break;
                  case 'teaching_level':
                    displayText = `المستوى: ${getTeachingLevelText(value as string)}`;
                    break;
                  case 'average_rating':
                    displayText = `التقييم: ${value} نجوم وأعلى`;
                    break;
                  case 'experience':
                    const expMap: Record<string, string> = {
                      'beginner': 'مبتدئ',
                      'intermediate': 'متوسط',
                      'expert': 'خبير'
                    };
                    displayText = `الخبرة: ${expMap[value as string] || value}`;
                    break;
                  case 'min_price':
                    displayText = `السعر من: ${formatPrice(value)}`;
                    break;
                  case 'max_price':
                    displayText = `السعر إلى: ${formatPrice(value)}`;
                    break;
                  default:
                    displayText = `${key}: ${value}`;
                }
                
                return (
                  <div key={key} className="teacher-filters-badge">
                    {displayText}
                    <span 
                      className="teacher-filters-badge-remove"
                      onClick={() => updateLocalFilter(key, '')}
                    >
                      <XMarkIcon />
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
