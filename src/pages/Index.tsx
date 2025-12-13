import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import HobbiesSection from "@/components/HobbiesSection";
import ActivitiesSection from "@/components/ActivitiesSection";
import AchievementsSection from "@/components/AchievementsSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <HobbiesSection />
        <ActivitiesSection />
        <AchievementsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
