import Hero from "./components/Home/Hero";
import FeaturesSection from "./components/Home/FeaturesSection";
import CallToAction from "./components/Home/CallToAction";
import TeacherSearch from "./components/Home/TeacherSearch";
import FeaturedTeachers from "./components/Home/FeaturedTeachers";
import HowItWorks from "./components/Home/HowItWorks";
import Newsletter from "./components/Home/Newsletter";
import FAQ from "./components/Home/FAQ";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Hero />
      <TeacherSearch />
      <HowItWorks />
      <FeaturedTeachers />
      <FeaturesSection />
      <Newsletter />
      <FAQ />
      <CallToAction />
    </div>
  );
}
