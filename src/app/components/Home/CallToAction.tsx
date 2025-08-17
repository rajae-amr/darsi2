
import React from "react"
import Button from "@/app/components/ui/Button"
import Link from "next/link"

/**
 * مكون دعوة للعمل وفقًا للهوية البصرية لمنصة TeachSpace
 */
const CallToAction = () => {
  return (
    <section className="cta-section">
      <div className="cta-container">
        <h2 className="cta-title">
          كن جزءًا من مجتمع المعلمين المتميزين في منصة دَرْسي
        </h2>
        <p className="cta-description">
          انضم إلى مجتمع المعلمين المتميزين في منصة دَرْسي وقدم خدماتك التعليمية للطلاب عبر جلسات تعليمية مباشرة عالية الجودة
        </p>
        <div className="cta-buttons">

          <Link href="/teacher-application">
            <Button
              variant="flat"
              size="lg"
              icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>}
            >
              سجل كمعلم
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
};

export default CallToAction;
