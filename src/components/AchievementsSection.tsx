import {
  Trophy,
  Star,
  X,
  ArrowLeft,
  ArrowRight,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { useCallback, useEffect, useState, type MouseEvent } from "react";

const certificateImages = Array.from(
  { length: 5 },
  (_, i) => `/src/images/cert/ac${i + 1}.jpg`
);

const achievements = [
  {
    title: "Dean's Lister",
    description: "Academic Excellence Award",
    year: "2023-2024",
    icon: Trophy,
    color: "primary",
  },
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

  const nextImage = useCallback((e?: MouseEvent<HTMLButtonElement>) => {
    e?.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % certificateImages.length);
    setZoom(1);
  }, []);

  const prevImage = useCallback((e?: MouseEvent<HTMLButtonElement>) => {
    e?.stopPropagation();
    setCurrentImageIndex(
      (prev) => (prev - 1 + certificateImages.length) % certificateImages.length
    );
    setZoom(1);
  }, []);

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
  }, [lightboxOpen, nextImage, prevImage]);

  return (
    <section id="achievements" className="py-16 md:py-24 relative">
      {/* Lightbox modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-2 sm:p-4"
          onClick={closeLightbox}
        >
          <div className="relative flex max-h-[94vh] max-w-[96vw] items-center justify-center sm:max-h-[92vh] sm:max-w-[92vw]">
            <button
              className="absolute right-2 top-2 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-border/80 bg-card/90 text-foreground shadow-lg shadow-black/30 backdrop-blur transition-colors hover:bg-muted sm:right-3 sm:top-3 sm:h-11 sm:w-11"
              onClick={(e) => {
                e.stopPropagation();
                closeLightbox();
              }}
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <button
              className="absolute left-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border/80 bg-card/90 text-foreground shadow-lg shadow-black/30 backdrop-blur transition-colors hover:bg-muted sm:left-3 sm:h-11 sm:w-11"
              onClick={(e) => prevImage(e)}
              aria-label="Previous"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <div
              className="flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={certificateImages[currentImageIndex]}
                alt={`Certificate ${currentImageIndex + 1}`}
                className="max-h-[88vh] max-w-[92vw] rounded-lg object-contain sm:max-h-[86vh] sm:max-w-[86vw]"
                style={{ transform: `scale(${zoom})` }}
                onError={(e) => {
                  const target = e.currentTarget as HTMLImageElement;
                  target.onerror = null;
                  target.src = "/src/images/profile.jpg";
                }}
              />
            </div>

            <button
              className="absolute right-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border/80 bg-card/90 text-foreground shadow-lg shadow-black/30 backdrop-blur transition-colors hover:bg-muted sm:right-3 sm:h-11 sm:w-11"
              onClick={(e) => nextImage(e)}
              aria-label="Next"
            >
              <ArrowRight className="w-5 h-5" />
            </button>

            <div className="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 gap-2 sm:bottom-3">
              <button
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border/80 bg-card/90 text-foreground shadow-lg shadow-black/30 backdrop-blur transition-colors hover:bg-muted"
                onClick={(e) => {
                  e.stopPropagation();
                  setZoom((z) => Math.max(1, +(z - 0.25).toFixed(2)));
                }}
                aria-label="Zoom out"
              >
                <ZoomOut className="w-5 h-5" />
              </button>
              <button
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border/80 bg-card/90 text-foreground shadow-lg shadow-black/30 backdrop-blur transition-colors hover:bg-muted"
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

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">CERTIFICATES</span>{" "}
            <span className="text-foreground">&</span>{" "}
            <span className="text-secondary">ACHIEVEMENTS</span>
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full" />
        </div>

        {/* Certificates */}
        <div className="mb-20">
          <h3 className="font-display text-2xl font-semibold text-primary mb-8 text-center">
            CERTIFICATES
          </h3>
          {/* Certificate Images Horizontal Scroll */}
          <div
            className="overflow-x-visible pb-4 sm:overflow-x-auto"
            style={{ scrollBehavior: "smooth" }}
          >
            <div className="grid min-w-0 grid-cols-1 gap-4 sm:flex sm:min-w-min">
              {certificateImages.map((img, index) => (
                <div
                  key={index}
                  className="h-48 w-full flex-shrink-0 rounded-lg border border-border bg-card p-2 transition-colors duration-200 hover:border-primary/40 sm:w-64 group"
                >
                  <div className="w-full h-full overflow-hidden rounded-lg border border-border relative">
                    <img
                      src={img}
                      alt={`Certificate ${index + 1}`}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover cursor-pointer"
                      onClick={() => openLightbox(index)}
                      onError={(e) => {
                        const target = e.currentTarget as HTMLImageElement;
                        target.onerror = null;
                        target.src = "/src/images/profile.jpg";
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
            {achievements.map((achievement, index) => (
              <div
                key={achievement.title}
                className="glass-card p-6 transition-colors duration-200 group hover:border-primary/40"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-14 h-14 rounded-lg bg-${achievement.color}/10 flex items-center justify-center shrink-0`}
                  >
                    <achievement.icon
                      className={`w-7 h-7 text-${achievement.color}`}
                    />
                  </div>
                  <div className="min-w-0">
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
