"use client";

import React from 'react';
import Badge from '@/app/components/ui/Badge';

export default function HowItWorks() {
  const steps = [
    {
      title: "ابحث عن معلم",
      description: "ابحث عن معلم متخصص في المادة التي تحتاج المساعدة فيها",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="step-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      )
    },
    {
      title: "تواصل مع الإدارة",
      description: "تواصل مع إدارة المنصة عبر الواتساب أو التيليجرام لحجز موعد",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="step-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      )
    },
    {
      title: "تنسيق الجلسة",
      description: "ستقوم الإدارة بتنسيق موعد الجلسة مع المعلم المناسب",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="step-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: "حضور الدرس",
      description: "استمتع بجلسة تعليمية متميزة مع أفضل المعلمين المتخصصين",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="step-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    }
  ];

  return (
    <section className="how-it-works-section">
      <div className="how-it-works-container">
        <div className="how-it-works-header">
          <Badge variant="primary" className="mb-4">كيف تعمل المنصة</Badge>
          <h2 className="how-it-works-title">
            خطوات بسيطة للبدء في التعلم عبر الإنترنت
          </h2>
          <p className="how-it-works-description">
            منصة درسي توفر تجربة تعليمية سلسة وفعالة من خلال جلسات تعليمية مباشرة عبر الإنترنت
          </p>
        </div>

        <div className="how-it-works-grid">
          {steps.map((step, index) => (
            <div key={index} className="step-item">
              <div className="step-icon-wrapper">
                <div className="step-icon-container">
                  {step.icon}
                </div>
                {index < steps.length - 1 && (
                  <div className="step-connector"></div>
                )}
                <div className="step-number">
                  {index + 1}
                </div>
              </div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-description">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
