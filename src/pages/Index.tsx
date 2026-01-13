import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import React, { Suspense } from "react";
const AboutSection = React.lazy(() => import("@/components/AboutSection"));
const HobbiesSection = React.lazy(() => import("@/components/HobbiesSection"));
const ActivitiesSection = React.lazy(
  () => import("@/components/ActivitiesSection")
);
const AchievementsSection = React.lazy(
  () => import("@/components/AchievementsSection")
);
const ContactSection = React.lazy(() => import("@/components/ContactSection"));
const Footer = React.lazy(() => import("@/components/Footer"));

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <Suspense
          fallback={<div className="py-20 text-center">Loading...</div>}
        >
          <AboutSection />
        </Suspense>
        <Suspense
          fallback={<div className="py-20 text-center">Loading...</div>}
        >
          <HobbiesSection />
        </Suspense>
        <Suspense
          fallback={
            <div className="py-20 text-center">Loading activities…</div>
          }
        >
          <ActivitiesSection />
        </Suspense>
        <Suspense
          fallback={
            <div className="py-20 text-center">Loading achievements…</div>
          }
        >
          <AchievementsSection />
        </Suspense>
        <Suspense
          fallback={<div className="py-20 text-center">Loading contact…</div>}
        >
          <ContactSection />
        </Suspense>
      </main>
      <Suspense fallback={<div className="py-4 text-center">Loading...</div>}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Index;
