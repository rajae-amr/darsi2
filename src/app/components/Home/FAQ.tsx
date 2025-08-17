"use client";

import React, { useState } from 'react';
import Badge from '@/app/components/ui/Badge';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  toggleOpen: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, toggleOpen }) => {
  return (
    <div className="border-b border-gray-200 dark:border-gray-700 py-4">
      <button
        className="flex justify-between items-center w-full text-right focus:outline-none"
        onClick={toggleOpen}
      >
        <span className="text-lg font-medium text-gray-900 dark:text-white">{question}</span>
        <svg
          className={`w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform ${
            isOpen ? 'transform rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>
      <div
        className={`mt-2 text-gray-600 dark:text-gray-300 transition-all duration-300 ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <p className="pb-4">{answer}</p>
      </div>
    </div>
  );
};

export default function FAQ() {
  const faqItems = [
    {
      question: "كيف يمكنني حجز جلسة تعليمية مع معلم؟",
      answer: "يمكنك حجز جلسة تعليمية بسهولة من خلال البحث عن المعلم المناسب، ثم الاطلاع على ملفه الشخصي، والضغط على زر 'حجز جلسة'. سيتم توجيهك إلى صفحة الاتصال حيث يمكنك التواصل مع إدارة المنصة عبر الواتساب أو التيليجرام لتنسيق موعد الجلسة وإتمام عملية الحجز."
    },
    {
      question: "ما هي المتطلبات التقنية للجلسات التعليمية عبر الإنترنت؟",
      answer: "تحتاج إلى جهاز كمبيوتر أو جهاز لوحي أو هاتف ذكي متصل بالإنترنت، وكاميرا وميكروفون للتواصل مع المعلم. نوصي باستخدام متصفح حديث مثل Chrome أو Firefox أو Edge. كما يفضل استخدام اتصال إنترنت مستقر بسرعة لا تقل عن 5 ميجابت/ثانية للحصول على تجربة أفضل."
    },
    {
      question: "كيف يتم الدفع مقابل الجلسات التعليمية؟",
      answer: "يتم تحديد طريقة الدفع وإتمام العملية من خلال التواصل المباشر مع إدارة المنصة عبر الواتساب أو التيليجرام. ستقوم الإدارة بتوجيهك خلال عملية الدفع وتزويدك بجميع المعلومات اللازمة."
    },
    {
      question: "هل يمكنني إلغاء جلسة تعليمية محجوزة؟",
      answer: "نعم، يمكنك إلغاء أو إعادة جدولة الجلسة من خلال التواصل مع إدارة المنصة قبل 24 ساعة على الأقل من موعدها المقرر. الإلغاءات التي تتم قبل أقل من 24 ساعة قد تخضع لسياسة الإلغاء الخاصة بالمنصة."
    },
    {
      question: "كيف يمكنني التسجيل كمعلم في المنصة؟",
      answer: "يمكنك التسجيل كمعلم في المنصة من خلال النقر على زر 'سجل كمعلم' في الصفحة الرئيسية، ثم ملء نموذج التسجيل بمعلوماتك الشخصية والمهنية. سيتم مراجعة طلبك من قبل فريق الإدارة وسيتم التواصل معك في أقرب وقت ممكن."
    },
    {
      question: "كيف يمكنني معرفة المزيد عن المعلم قبل حجز جلسة؟",
      answer: "يمكنك الاطلاع على الملف الشخصي للمعلم الذي يتضمن معلومات عن خبراته، تخصصاته، المستويات التعليمية التي يدرسها، وتقييمات الطلاب السابقين. كما يمكنك طرح أي أسئلة لديك عن المعلم من خلال التواصل مع إدارة المنصة."
    },
    {
      question: "هل يمكنني طلب معلم متخصص في مادة معينة؟",
      answer: "نعم، يمكنك البحث عن معلمين متخصصين في مواد محددة باستخدام خاصية البحث في المنصة. إذا لم تجد المعلم المناسب، يمكنك التواصل مع إدارة المنصة وسنساعدك في العثور على معلم يلبي احتياجاتك التعليمية."
    },
    {
      question: "كيف يتم تحديد مواعيد الجلسات التعليمية؟",
      answer: "يتم تحديد مواعيد الجلسات التعليمية بالتنسيق بين الطالب والمعلم من خلال إدارة المنصة. نحن نسعى لتوفير أوقات مرنة تناسب جميع الأطراف وضمان توفر المعلم في الوقت المحدد للجلسة."
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-white dark:bg-gray-800" id="faq">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="amber" className="mb-4">الأسئلة الشائعة</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            إجابات لأسئلتك الشائعة
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            نجيب على الأسئلة الأكثر شيوعاً حول كيفية عمل منصة درسي والجلسات التعليمية عبر الإنترنت
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqItems.map((item, index) => (
            <FAQItem
              key={index}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === index}
              toggleOpen={() => toggleFAQ(index)}
            />
          ))}
        </div>

        <div className="text-center mt-10">
          <p className="text-gray-600 dark:text-gray-300">
            لم تجد إجابة لسؤالك؟{' '}
            <a href="/contact" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium">
              تواصل مع فريق الدعم
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
