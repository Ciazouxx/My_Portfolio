import {
  ChevronRight,
  X,
  ArrowLeft,
  ArrowRight,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import {
  useCallback,
  useEffect,
  useState,
  type MouseEvent,
  type ReactNode,
} from "react";

// Define the type for a journal entry
type JournalEntryData = {
  image: string;
  content: React.ReactNode;
};

const INITIAL_GALLERY_COUNT = 6;

const JournalEntry = ({
  journal,
  openLightbox,
}: {
  journal: { title: string; entries: { image: string; content: ReactNode }[] };
  openLightbox: (images: string[], index: number) => void;
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const currentEntry = journal.entries[selectedIndex];
  const allImages = journal.entries.map((e) => e.image);

  return (
    <div className="flex h-full w-full min-w-0 flex-col lg:w-1/2">
      <h4 className="mb-2 text-center font-display text-lg font-semibold sm:text-xl">
        {journal.title}
      </h4>
      <div className="glass-card mb-4 h-44 overflow-y-auto p-4 sm:h-48">
        <p className="font-body text-sm text-muted-foreground">
          {currentEntry.content}
        </p>
      </div>
      <div className="glass-card flex w-full flex-col gap-3 overflow-hidden rounded-lg p-2 sm:aspect-[4/3] sm:flex-row sm:gap-4">
        {/* Left: Main Display Image */}
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border border-border/10 sm:h-full sm:w-1/2 group">
          <img
            src={currentEntry.image}
            alt="Journal Display"
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover cursor-pointer"
            onClick={() => openLightbox(allImages, selectedIndex)}
          />
        </div>

        {/* Right: Gallery Grid */}
        <div className="max-h-64 w-full overflow-y-auto pr-1 sm:h-full sm:max-h-none sm:w-1/2">
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
  const [expandedGalleries, setExpandedGalleries] = useState<
    Record<string, boolean>
  >({});

  const openLightbox = (imgs: string[], i: number) => {
    setImages(imgs);
    setIndex(i);
    setZoom(1);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  const toggleGallery = (name: string) => {
    setExpandedGalleries((current) => ({
      ...current,
      [name]: !current[name],
    }));
  };

  const nextImage = useCallback((e?: MouseEvent<HTMLButtonElement>) => {
    e?.stopPropagation();
    setIndex((i) => (i + 1) % images.length);
    setZoom(1);
  }, [images.length]);

  const prevImage = useCallback((e?: MouseEvent<HTMLButtonElement>) => {
    e?.stopPropagation();
    setIndex((i) => (i - 1 + images.length) % images.length);
    setZoom(1);
  }, [images.length]);

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
    <section id="activities" className="py-16 md:py-24 relative">
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
              className="flex items-center justify-center w-[80vw] h-[80vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <OptimizedImage
                src={images[index]}
                alt={`Image ${index + 1}`}
                className="max-h-[88vh] max-w-[92vw] rounded-lg object-contain sm:max-h-[86vh] sm:max-w-[86vw]"
                style={{ transform: `scale(${zoom})` }}
                width={1600}
                height={1200}
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
            <span className="text-foreground">ACTIVITIES</span>{" "}
            <span className="text-foreground">& INVOLVEMENT</span>
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full" />
        </div>

        <div className="max-w-5xl mx-auto space-y-12">
          {activities.map((activity) => {
            const isExpanded = expandedGalleries[activity.name];
            const visibleImages = isExpanded
              ? activity.images
              : activity.images.slice(0, INITIAL_GALLERY_COUNT);
            const hasMoreImages =
              activity.images.length > INITIAL_GALLERY_COUNT;

            return (
            <div key={activity.name} className="relative">
              <div className="mb-6 flex items-start gap-3">
                <ChevronRight className="mt-0.5 h-5 w-5 shrink-0 text-foreground sm:h-6 sm:w-6" />
                <h3 className="min-w-0 font-display text-xl font-bold text-foreground sm:text-2xl md:text-3xl">
                  {activity.name}
                </h3>
              </div>

              {activity.journal ? (
                <div className="ml-0 flex flex-col gap-6 md:ml-9 lg:min-h-[520px] lg:flex-row">
                  {/* Left Side: Images Container */}
                  <div className="relative w-full min-w-0 lg:w-1/2">
                    <div className="glass-card max-h-[500px] overflow-y-auto rounded-lg p-3 sm:p-4 lg:absolute lg:inset-0 lg:max-h-none">
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                        {visibleImages.map((image, index) => (
                          <div
                            key={index}
                            className="aspect-square rounded-lg overflow-hidden border border-border/10 relative group"
                          >
                            <OptimizedImage
                              src={image}
                              alt={`${activity.name} - Image ${index + 1}`}
                              loading="lazy"
                              decoding="async"
                              className="w-full h-full object-cover cursor-pointer"
                              onClick={() =>
                                openLightbox(activity.images as string[], index)
                              }
                            />
                          </div>
                        ))}
                      </div>
                      {hasMoreImages && (
                        <button
                          type="button"
                          className="mt-4 w-full rounded-lg border border-primary/40 px-4 py-3 font-body font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                          onClick={() => toggleGallery(activity.name)}
                        >
                          {isExpanded ? "Show fewer photos" : "Show all photos"}
                        </button>
                      )}
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
                  className="ml-0 overflow-x-visible pb-4 md:ml-9 sm:overflow-x-auto"
                  style={{ scrollBehavior: "smooth" }}
                >
                  <div className="grid min-w-0 grid-cols-2 items-stretch gap-3 sm:flex sm:min-w-min sm:gap-4">
                    {visibleImages.map((image, index) => (
                      <div
                        key={index}
                        className="aspect-square w-full flex-shrink-0 rounded-lg border border-border bg-card p-2 transition-colors duration-200 hover:border-primary/40 sm:h-48 sm:w-48"
                      >
                        <div className="w-full h-full overflow-hidden rounded-lg p-2">
                          <div className="w-full h-full overflow-hidden rounded-lg border border-border">
                            <img
                              src={image}
                              alt={`${activity.name} - Image ${index + 1}`}
                              loading="lazy"
                              decoding="async"
                              className="w-full h-full object-cover rounded-lg cursor-pointer"
                              onClick={() =>
                                openLightbox(activity.images as string[], index)
                              }
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {hasMoreImages && (
                    <button
                      type="button"
                      className="mt-4 rounded-lg border border-primary/40 px-4 py-3 font-body font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                      onClick={() => toggleGallery(activity.name)}
                    >
                      {isExpanded ? "Show fewer photos" : "Show all photos"}
                    </button>
                  )}
                </div>
              )}
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ActivitiesSection;
