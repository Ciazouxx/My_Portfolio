import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import HobbiesSection from "@/components/HobbiesSection";
import React, { Suspense } from "react";
const ActivitiesSection = React.lazy(
  () => import("@/components/ActivitiesSection")
);
const AchievementsSection = React.lazy(
  () => import("@/components/AchievementsSection")
);
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <HobbiesSection />
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
      </main>
      <Footer />
    </div>
  );
};

export default Index;
