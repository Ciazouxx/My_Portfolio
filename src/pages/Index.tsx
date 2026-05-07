import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";

const HobbiesSection = lazy(() => import("@/components/HobbiesSection"));
const ProjectsSection = lazy(() => import("@/components/ProjectsSection"));
const ActivitiesSection = lazy(() => import("@/components/ActivitiesSection"));
const AchievementsSection = lazy(
  () => import("@/components/AchievementsSection")
);
const ContactSection = lazy(() => import("@/components/ContactSection"));

const Index = () => {
  return (
    <div className="min-h-screen bg-transparent">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <Suspense
          fallback={
            <div className="px-4 py-16 text-center text-muted-foreground">
              Loading portfolio sections...
            </div>
          }
        >
          <ProjectsSection />
          <HobbiesSection />
          <ActivitiesSection />
          <AchievementsSection />
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
