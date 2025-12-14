import {
  Award,
  Medal,
  Trophy,
  Star,
  FileCheck,
  BadgeCheck,
  X,
  ArrowLeft,
  ArrowRight,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { useState, useEffect } from "react";
import OptimizedImage from "./ui/image";

/* const certificates = [
  {
    title: "Web Development Fundamentals",
    issuer: "Coursera",
    year: "2023",
    icon: FileCheck,
  },
  {
    title: "Python Programming",
    issuer: "Udemy",
    year: "2023",
    icon: FileCheck,
  },
  {
    title: "Database Management",
    issuer: "LinkedIn Learning",
    year: "2024",
    icon: FileCheck,
  },
  {
    title: "Cloud Computing Basics",
    issuer: "AWS Academy",
    year: "2024",
    icon: BadgeCheck,
  },
]; */

const certificateImages = Array.from(
  { length: 5 },
  (_, i) => `/src/assets/ac${i + 1}.jpg`
);

const achievements = [
  {
    title: "Dean's Lister",
    description: "Academic Excellence Award",
    year: "2023-2024",
    icon: Trophy,
    color: "primary",
  },
  // {
  //   title: "1st Place Hackathon",
  //   description: "University Tech Competition",
  //   year: "2024",
  //   icon: Medal,
  //   color: "secondary",
  // },
  // {
  //   title: "Best Capstone Project",
  //   description: "Departmental Recognition",
  //   year: "2024",
  //   icon: Award,
  //   color: "accent",
  // },
  {
    title: "Outstanding Student Leader",
    description: "Student Council Award",
    year: "2023",
    icon: Star,
    color: "primary",
  },
];

const AchievementsSection = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [zoom, setZoom] = useState(1);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setZoom(1);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  const nextImage = (e?: any) => {
    e?.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % certificateImages.length);
    setZoom(1);
  };

  const prevImage = (e?: any) => {
    e?.stopPropagation();
    setCurrentImageIndex(
      (prev) => (prev - 1 + certificateImages.length) % certificateImages.length
    );
    setZoom(1);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "+") setZoom((z) => Math.min(3, z + 0.25));
      if (e.key === "-") setZoom((z) => Math.max(1, z - 0.25));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxOpen]);

  return (
    <section id="achievements" className="py-20 md:py-32 relative">
      {/* Lightbox modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
          onClick={closeLightbox}
        >
          <div className="relative max-w-[90vw] max-h-[90vh] p-4">
            <button
              className="absolute top-2 right-2 p-2 bg-card/60 rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                closeLightbox();
              }}
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <button
              className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-card/60 rounded-full"
              onClick={(e) => prevImage(e)}
              aria-label="Previous"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <div
              className="flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <OptimizedImage
                src={certificateImages[currentImageIndex]}
                alt={`Certificate ${currentImageIndex + 1}`}
                className="max-w-[80vw] max-h-[80vh] object-contain"
                priority
                style={{ transform: `scale(${zoom})` }}
                onError={(e) => {
                  const target = e.currentTarget as HTMLImageElement;
                  target.onerror = null;
                  target.src = "/src/assets/profile.jpg";
                }}
                width={1200}
                height={900}
              />
            </div>

            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-card/60 rounded-full"
              onClick={(e) => nextImage(e)}
              aria-label="Next"
            >
              <ArrowRight className="w-5 h-5" />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              <button
                className="p-2 bg-card/60 rounded-full"
                onClick={(e) => {
                  e.stopPropagation();
                  setZoom((z) => Math.max(1, +(z - 0.25).toFixed(2)));
                }}
                aria-label="Zoom out"
              >
                <ZoomOut className="w-5 h-5" />
              </button>
              <button
                className="p-2 bg-card/60 rounded-full"
                onClick={(e) => {
                  e.stopPropagation();
                  setZoom((z) => Math.min(3, +(z + 0.25).toFixed(2)));
                }}
                aria-label="Zoom in"
              >
                <ZoomIn className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Background accents */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">CERTIFICATES</span>{" "}
            <span className="text-foreground">&</span>{" "}
            <span className="text-secondary neon-text-magenta">
              ACHIEVEMENTS
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary via-secondary to-accent mx-auto rounded-full" />
        </div>

        {/* Certificates */}
        <div className="mb-20">
          <h3 className="font-display text-2xl font-semibold text-primary mb-8 text-center">
            CERTIFICATES
          </h3>
          {/* <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {certificates.map((cert, index) => (
              <div
                key={cert.title}
                className="glass-card p-6 border-primary/20 hover:border-primary transition-all duration-300 group hover:neon-border-cyan"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <cert.icon className="w-10 h-10 text-primary mb-4 group-hover:animate-pulse" />
                <h4 className="font-display text-lg font-semibold text-foreground mb-2">
                  {cert.title}
                </h4>
                <p className="font-body text-muted-foreground text-sm">
                  {cert.issuer}
                </p>
                <p className="font-body text-primary text-sm mt-2">
                  {cert.year}
                </p>
              </div>
            ))}
          </div> */}

          {/* Certificate Images Horizontal Scroll */}
          <div
            className="overflow-x-auto pb-4"
            style={{ scrollBehavior: "smooth" }}
          >
            <div className="flex gap-4 min-w-min">
              {certificateImages.map((img, index) => (
                <div
                  key={index}
                  className="bg-transparent border border-primary/20 p-2 hover:scale-105 transition-transform duration-300 flex-shrink-0 w-64 h-48 rounded-lg group"
                >
                  <div className="w-full h-full overflow-hidden rounded-lg border border-primary/10 bg-transparent relative">
                    <OptimizedImage
                      src={img}
                      alt={`Certificate ${index + 1}`}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover cursor-pointer hover:scale-110 transition-transform duration-300"
                      onClick={() => openLightbox(index)}
                      onError={(e) => {
                        const target = e.currentTarget as HTMLImageElement;
                        target.onerror = null;
                        target.src = "/src/assets/profile.jpg";
                      }}
                      width={800}
                      height={600}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div>
          <h3 className="font-display text-2xl font-semibold text-secondary mb-8 text-center">
            ACHIEVEMENTS
          </h3>
          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {achievements.map((achievement, index) => (
              <div
                key={achievement.title}
                className={`glass-card p-6 border-${achievement.color}/20 hover:border-${achievement.color} transition-all duration-300 group hover:scale-105`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-14 h-14 rounded-xl bg-${achievement.color}/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}
                  >
                    <achievement.icon
                      className={`w-7 h-7 text-${achievement.color}`}
                    />
                  </div>
                  <div>
                    <h4 className="font-display text-lg font-semibold text-foreground mb-1">
                      {achievement.title}
                    </h4>
                    <p className="font-body text-muted-foreground text-sm">
                      {achievement.description}
                    </p>
                    <p
                      className={`font-body text-${achievement.color} text-sm mt-2`}
                    >
                      {achievement.year}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;
