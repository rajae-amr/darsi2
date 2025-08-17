"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Button from '../ui/Button';
import { SPECIALIZATION_MAP } from '../../../utils/constants';

interface TeacherSearchProps {
  variant?: 'full' | 'compact'; // full: للصفحة الرئيسية، compact: للوحة التحكم
  showRecommended?: boolean;
  className?: string;
}

export default function TeacherSearch({ 
  variant = 'full', 
  showRecommended = false,
  className = ''
}: TeacherSearchProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [subject, setSubject] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const queryParams = new URLSearchParams();
    
    if (searchQuery) {
      queryParams.append('search', searchQuery);
    }
    
    if (subject) {
      queryParams.append('teacher_profile__specialization', subject);
    }
    
    router.push(`/teachers?${queryParams.toString()}`);
  };

  // قائمة التخصصات المتاحة - تم إنشاؤها من قاموس التخصصات المشترك
  const [subjects, setSubjects] = useState<{value: string, label: string}[]>([{ value: '', label: 'اختر التخصص' }]);
  
  // المواضيع الشائعة مع عرضها بالعربية
  const [popularTopics, setPopularTopics] = useState<{value: string, label: string}[]>([]);
  
  // تهيئة قوائم التخصصات من قاموس التخصصات المشترك
  useEffect(() => {
    // إنشاء قائمة التخصصات من القاموس
    const subjectsList = [{ value: '', label: 'اختر التخصص' }];
    
    // إضافة جميع التخصصات من القاموس
    Object.entries(SPECIALIZATION_MAP).forEach(([key, value]) => {
      subjectsList.push({ value: key, label: value });
    });
    
    setSubjects(subjectsList);
    
    // إنشاء قائمة المواضيع الشائعة
    const popularList = [
      { value: 'math', label: SPECIALIZATION_MAP['math'] || 'رياضيات' },
      { value: 'physics', label: SPECIALIZATION_MAP['physics'] || 'فيزياء' },
      { value: 'english', label: SPECIALIZATION_MAP['english'] || 'لغة إنجليزية' },
      { value: 'arabic', label: SPECIALIZATION_MAP['arabic'] || 'لغة عربية' },
      { value: 'programming', label: SPECIALIZATION_MAP['programming'] || 'برمجة' },
      { value: 'chemistry', label: SPECIALIZATION_MAP['chemistry'] || 'كيمياء' }
    ];
    
    setPopularTopics(popularList);
  }, []);

  // التنقل إلى صفحة المعلمين مع تطبيق فلتر التخصص
  const handleTopicClick = (topic: { value: string, label: string }) => {
    router.push(`/teachers?teacher_profile__specialization=${encodeURIComponent(topic.value)}`);
  };

  // عرض نموذج البحث الكامل (للصفحة الرئيسية)
  if (variant === 'full') {
    return (
      <section className={`teacher-search-section ${className}`}>
        <div className="teacher-search-container">
          <div className="teacher-search-box">
            <h2 className="teacher-search-title">
              ابحث عن معلم واحجز جلسة تعليمية عبر منصة دَرْسي
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              اختر المعلم المناسب لاحتياجاتك وتواصل مع إدارة المنصة لحجز جلستك التعليمية
            </p>
            
            <form onSubmit={handleSearch} className="teacher-search-form">
              <div className="teacher-search-grid">
                <div className="teacher-search-field">
                  <label htmlFor="search" className="teacher-search-label">
                    ابحث باسم المعلم أو الموضوع
                  </label>
                  <input
                    type="text"
                    id="search"
                    className="teacher-search-input"
                    placeholder="اكتب اسم المعلم أو كلمات مفتاحية..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div className="teacher-search-field">
                  <label htmlFor="subject" className="teacher-search-label">
                    المادة الدراسية
                  </label>
                  <select
                    id="subject"
                    className="teacher-search-input"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  >
                    {subjects.map((subject) => (
                      <option key={subject.value} value={subject.value}>
                        {subject.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="teacher-search-button-container">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  }
                >
                  ابحث عن معلم
                </Button>
              </div>
            </form>
            
            <div className="teacher-search-topics">
              <span>بحث شائع:</span>
              {popularTopics.slice(0, 4).map((topic: { value: string; label: string }) => (
                <button
                  key={topic.value}
                  type="button"
                  className="teacher-search-topic-button"
                  onClick={() => handleTopicClick(topic)}
                >
                  {topic.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // عرض نموذج البحث المختصر (للوحة التحكم)
  return (
    <div className={`teacher-search-compact ${className}`}>
      <div className="teacher-search-compact-header">
        <h3 className="teacher-search-compact-title">البحث عن معلمين</h3>
      </div>
      
      <div className="teacher-search-compact-box">
        <p className="teacher-search-compact-text">ابحث عن معلمين متميزين في مختلف المجالات وتواصل مع إدارة المنصة لحجز جلستك التعليمية.</p>
        
        <div className="teacher-search-compact-buttons">
          <Button 
            variant="primary"
            className="w-full md:w-auto"
            onClick={() => router.push('/teachers')}
          >
            استكشف المعلمين
          </Button>
          
          <p className="teacher-search-compact-hint">
            يمكنك البحث عن المعلمين حسب التخصص، المستوى التعليمي، أو التقييمات
          </p>
        </div>
      </div>
      
      {showRecommended && (
        <div className="teacher-search-compact-box">
          <h4 className="teacher-search-compact-title">المعلمون الموصى بهم</h4>
          <p className="teacher-search-compact-hint">
            سيتم عرض قائمة بالمعلمين الموصى بهم بناءً على اهتماماتك واحتياجاتك التعليمية قريبًا.
          </p>
        </div>
      )}
      
      <div className="teacher-search-compact-box">
        <h4 className="teacher-search-compact-title">المواضيع الشائعة</h4>
        <div className="teacher-search-compact-topics">
          {popularTopics.map((topic) => (
            <button 
              key={topic.value}
              className="teacher-search-compact-topic"
              onClick={() => handleTopicClick(topic)}
            >
              {topic.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
