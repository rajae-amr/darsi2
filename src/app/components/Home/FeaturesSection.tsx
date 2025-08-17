"use client";

import Badge from "@/app/components/ui/Badge";
import {Card} from "@/app/components/ui/Card";
import {CardBody} from "@/app/components/ui/Card";

const FeaturesSection = () => {
  return (
    <section className="features-section">
      <div className="features-container">
        <div className="features-header">
          <Badge variant="amber" className="mb-4">ميزات فريدة</Badge>
          <h2 className="features-title">
            تجربة تعليمية متكاملة عبر الإنترنت
          </h2>
          <p className="features-description">
            توفر منصة درسي كل ما تحتاجه للاستفادة من جلسات تعليمية عبر الإنترنت مع أفضل المعلمين والخبراء في مختلف المجالات.
          </p>
        </div>

        <div className="features-grid">
          {/* Feature 1 */}
          <Card hover={true}>
            <CardBody>
              <div className="feature-item">
                <div className="feature-icon-container feature-icon-blue">
                  <svg className="feature-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="feature-title">جلسات فيديو عالية الجودة</h3>
                <p className="feature-description">
                  استمتع بجلسات تعليمية عبر الإنترنت بجودة فيديو وصوت عالية مع دعم كامل للمشاركة التفاعلية.
                </p>
              </div>
            </CardBody>
          </Card>

          {/* Feature 2 */}
          <Card hover={true}>
            <CardBody>
              <div className="feature-item">
                <div className="feature-icon-container feature-icon-green">
                  <svg className="feature-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="feature-title">حجز مرن للجلسات</h3>
                <p className="feature-description">
                  احجز جلسات تعليمية في الأوقات التي تناسبك مع إمكانية إعادة الجدولة بسهولة حسب احتياجاتك.
                </p>
              </div>
            </CardBody>
          </Card>

          {/* Feature 3 */}
          <Card hover={true}>
            <CardBody>
              <div className="feature-item">
                <div className="feature-icon-container feature-icon-purple">
                  <svg className="feature-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="feature-title">مشاركة الموارد التعليمية</h3>
                <p className="feature-description">
                  تبادل المستندات والملفات والموارد التعليمية بسهولة أثناء الجلسة وبعدها للاستفادة القصوى.
                </p>
              </div>
            </CardBody>
          </Card>

          {/* Feature 4 */}
          <Card hover={true}>
            <CardBody>
              <div className="feature-item">
                <div className="feature-icon-container feature-icon-amber">
                  <svg className="feature-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="feature-title">تسجيل الجلسات</h3>
                <p className="feature-description">
                  الوصول إلى تسجيلات الجلسات السابقة لمراجعة المحتوى التعليمي في أي وقت ومن أي مكان.
                </p>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
