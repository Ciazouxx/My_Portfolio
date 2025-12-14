import {
  X,
  ArrowLeft,
  ArrowRight,
  ZoomIn,
  ZoomOut,
  Trophy,
} from "lucide-react";
import { useState, useEffect } from "react";
import OptimizedImage from "./ui/image";
import profile from "@/assets/profile.jpg";
import p1 from "@/assets/p1.jpg";
import p2 from "@/assets/p2.jpg";
import p3 from "@/assets/p3.jpg";
import p4 from "@/assets/p4.jpg";
import p5 from "@/assets/p5.jpg";
import p6 from "@/assets/p6.jpg";
import p8 from "@/assets/p8.jpg";
import p9 from "@/assets/p9.jpg";
import p10 from "@/assets/p10.jpg";

const achievements = [
  {
    title: "Dean's Lister",
    description: "Academic Excellence Award",
    year: "2023-2024",
    icon: Trophy,
    color: "primary",
  },
  // {
  //   title: "Outstanding Student Leader",
  //   description: "Student Council Award",
  //   year: "2023",
  //   icon: Star,
  //   color: "primary",
  // },
];

const colorConfig: {
  [key: string]: { border: string; bg: string; text: string };
} = {
  primary: {
    border: "border-primary/20 hover:border-primary",
    bg: "bg-primary/10",
    text: "text-primary",
  },
  secondary: {
    border: "border-secondary/20 hover:border-secondary",
    bg: "bg-secondary/10",
    text: "text-secondary",
  },
  // Add other colors if needed
};

import type { MouseEvent } from "react";

const certificateImages = [p1, p2, p3, p4, p5, p6, p8, p9, p10];

function usePrefetchImages(urls?: string[] | undefined) {
  useEffect(() => {
    if (!urls) return;
    const imgs: HTMLImageElement[] = [];
    urls.forEach((src) => {
      const i = new Image();
      i.src = src;
      imgs.push(i);
    });
    return () => imgs.forEach((i) => (i.src = ""));
  }, [urls]);
}

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

  const nextImage = (e?: MouseEvent) => {
    e?.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % certificateImages.length);
    setZoom(1);
  };

  const prevImage = (e?: MouseEvent) => {
    e?.stopPropagation();
    setCurrentImageIndex(
      (prev) => (prev - 1 + certificateImages.length) % certificateImages.length
    );
    setZoom(1);
  };

  const adjacentToPrefetch = lightboxOpen
    ? [
        certificateImages[(currentImageIndex + 1) % certificateImages.length],
        certificateImages[
          (currentImageIndex - 1 + certificateImages.length) %
            certificateImages.length
        ],
      ]
    : undefined;
  usePrefetchImages(adjacentToPrefetch);

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
                  target.src = profile;
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
                      src={img.replace(/\.jpg$/, "-sm.jpg")}
                      alt={`Certificate ${index + 1}`}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover cursor-pointer hover:scale-110 transition-transform duration-300"
                      onClick={() => openLightbox(index)}
                      onError={(e) => {
                        const target = e.currentTarget as HTMLImageElement;
                        target.onerror = null;
                        target.src = profile;
                      }}
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
            {achievements.map((achievement, index) => {
              const colors =
                colorConfig[achievement.color] || colorConfig.primary;
              const isDean = achievement.title === "Dean's Lister";
              return (
                <div
                  key={achievement.title}
                  className={
                    isDean ? "sm:col-span-2 flex justify-center" : undefined
                  }
                >
                  <div
                    className={`glass-card p-6 ${colors.border} transition-all duration-300 group hover:scale-105`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-14 h-14 rounded-xl ${colors.bg} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}
                      >
                        <achievement.icon
                          className={`w-7 h-7 ${colors.text}`}
                        />
                      </div>
                      <div>
                        <h4 className="font-display text-lg font-semibold text-foreground mb-1">
                          {achievement.title}
                        </h4>
                        <p className="font-body text-muted-foreground text-sm">
                          {achievement.description}
                        </p>
                        <p className={`font-body ${colors.text} text-sm mt-2`}>
                          {achievement.year}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;
