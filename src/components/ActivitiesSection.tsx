import {
  ChevronRight,
  X,
  ArrowLeft,
  ArrowRight,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import type { MouseEvent } from "react";
import OptimizedImage from "./ui/image";
import { activities } from "@/lib/activities";

// Define the type for a journal entry
type JournalEntryData = {
  image: string;
  content: React.ReactNode;
};

const JournalEntry = ({
  journal,
  openLightbox,
}: {
  journal: {
    title: string;
    entries: JournalEntryData[];
  };
  openLightbox: (images: string[], index: number) => void;
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const currentEntry = journal.entries[selectedIndex];
  const allImages = journal.entries.map((e) => e.image);

  return (
    <div className="w-full lg:w-1/2 flex flex-col h-full">
      <h4 className="font-display text-xl font-semibold mb-2 text-center">
        {journal.title}
      </h4>
      <div className="glass-card p-4 border-border/20 bg-transparent mb-4 h-48 overflow-y-auto">
        <p className="font-body text-sm text-muted-foreground">
          {currentEntry.content}
        </p>
      </div>
      <div className="w-full aspect-[4/3] flex gap-4 glass-card p-2 border-border/20 bg-transparent rounded-lg overflow-hidden">
        {/* Left: Main Display Image */}
        <div className="w-1/2 h-full relative rounded-lg overflow-hidden border border-border/10 group">
          <OptimizedImage
            src={currentEntry.image}
            alt="Journal Display"
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover cursor-pointer transition-transform duration-300 group-hover:scale-105"
            onClick={() => openLightbox(allImages, selectedIndex)}
          />
        </div>

        {/* Right: Gallery Grid */}
        <div className="w-1/2 h-full overflow-y-auto pr-1">
          <div className="grid grid-cols-2 gap-2">
            {journal.entries.map((entry, idx) => (
              <div
                key={idx}
                className={`aspect-square rounded-md overflow-hidden cursor-pointer border ${
                  selectedIndex === idx
                    ? "border-primary ring-2 ring-primary/20"
                    : "border-border/10"
                }`}
                onClick={() => setSelectedIndex(idx)}
              >
                <OptimizedImage
                  src={entry.image}
                  alt={`Thumbnail ${idx + 1}`}
                  loading="lazy"
                  decoding="async"
                  className={`w-full h-full object-cover transition-opacity duration-300 ${
                    selectedIndex === idx
                      ? "opacity-100"
                      : "opacity-70 hover:opacity-100"
                  }`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const ActivitiesSection = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [index, setIndex] = useState(0);
  const [zoom, setZoom] = useState(1);

  const openLightbox = (imgs: string[], i: number) => {
    setImages(imgs);
    setIndex(i);
    setZoom(1);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  const nextImage = useCallback(
    (e?: MouseEvent) => {
      e?.stopPropagation();
      setIndex((i) => (i + 1) % images.length);
      setZoom(1);
    },
    [setIndex, setZoom, images.length]
  );

  const prevImage = useCallback(
    (e?: MouseEvent) => {
      e?.stopPropagation();
      setIndex((i) => (i - 1 + images.length) % images.length);
      setZoom(1);
    },
    [setIndex, setZoom, images.length]
  );

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
  }, [lightboxOpen, images.length, nextImage, prevImage]);

  return (
    <section id="activities" className="py-20 md:py-32 relative">
      {/* Background accent */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[150px]" />
      </div>
      {/* Lightbox modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
          onClick={closeLightbox}
        >
          <div className="relative max-w-[90vw] max-h-[90vh] p-4 bg-card/80 rounded-xl backdrop-blur-sm">
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
              className="flex items-center justify-center w-[80vw] h-[80vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <OptimizedImage
                src={images[index]}
                alt={`Image ${index + 1}`}
                className="max-w-full max-h-full object-contain"
                priority
                style={{ transform: `scale(${zoom})` }}
                width={1600}
                height={1200}
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

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            <span className="text-foreground">ACTIVITIES</span>{" "}
            <span className="text-foreground">& INVOLVEMENT</span>
          </h2>
          <div className="w-24 h-1 bg-border mx-auto rounded-full" />
        </div>

        <div className="max-w-5xl mx-auto space-y-12">
          {activities.map((activity) => (
            <div key={activity.name} className="relative">
              {/* Activity Name with Bullet */}
              <div className="flex items-center gap-3 mb-6">
                <ChevronRight className="w-6 h-6 text-foreground" />
                <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                  {activity.name}
                </h3>
              </div>

              {activity.journal ? (
                <div className="flex flex-col lg:flex-row gap-6 ml-0 md:ml-9">
                  {/* Left Side: Images Container */}
                  <div className="w-full lg:w-1/2 relative">
                    <div className="glass-card p-4 border-border/20 bg-transparent rounded-xl overflow-y-auto max-h-[500px] lg:max-h-none lg:absolute lg:inset-0">
                      <div className="grid grid-cols-2 gap-4">
                        {(activity.images as string[]).map((image, index) => (
                          <div
                            key={index}
                            className="aspect-square rounded-lg overflow-hidden border border-border/10 relative group"
                          >
                            <OptimizedImage
                              src={image}
                              alt={`${activity.name} - Image ${index + 1}`}
                              loading="lazy"
                              decoding="async"
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 cursor-pointer"
                              onClick={() =>
                                openLightbox(activity.images as string[], index)
                              }
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Side: Journal */}
                  <JournalEntry
                    journal={activity.journal}
                    openLightbox={openLightbox}
                  />
                </div>
              ) : (
                /* Image Collage in Rows - Horizontal Scroll for other activities */
                <div
                  className="ml-0 md:ml-9 overflow-x-auto pb-4"
                  style={{ scrollBehavior: "smooth" }}
                >
                  <div className="flex gap-4 min-w-min items-stretch">
                    {(activity.images as string[]).map((image, index) => (
                      <div
                        key={index}
                        className="bg-transparent border border-border/10 p-2 hover:scale-105 transition-transform duration-300 flex-shrink-0 w-48 h-48 rounded-lg"
                      >
                        <div className="w-full h-full overflow-hidden rounded-lg p-2 bg-transparent">
                          <div className="w-full h-full overflow-hidden rounded-lg border border-border/10 bg-transparent">
                            <OptimizedImage
                              src={image}
                              alt={`${activity.name} - Image ${index + 1}`}
                              loading="lazy"
                              decoding="async"
                              className="w-full h-full object-cover hover:scale-110 transition-transform duration-300 rounded-lg cursor-pointer"
                              onClick={() =>
                                openLightbox(activity.images as string[], index)
                              }
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ActivitiesSection;
