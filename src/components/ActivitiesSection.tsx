import {
  ChevronRight,
  X,
  ArrowLeft,
  ArrowRight,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { useState, useEffect } from "react";
import OptimizedImage, { usePrefetchImages } from "./ui/image";

const activities = [
  {
    name: "Educational Tour Cebu-Bohol 2025",
    images: Array.from(
      { length: 26 },
      (_, i) => `/src/assets/educ${i + 1}.jpg`
    ),
    journal: {
      title: "Journal",
      entries: [
        {
          image: "/src/assets/p1.jpg",
          content: (
            <>
              <strong>Learning Journal</strong>
              <br />
              Cebu-Bohol Educational Tour
              <br />
              November 12-15, 2025
              <br />
              Name: Joevinyll Jan O. Palabrica
            </>
          ),
        },
        {
          image: "/src/assets/p2.jpg",
          content: (
            <>
              <strong>Itinerary</strong>
              <br />
              Day 1: Cebu Heritage Tour, UP Cebu
              <br />
              Day 2: Alliance Software, Rivan IT, Dynata, Tecdia
              <br />
              Day 3: Mata Technologies
              <br />
              Day 4: Tarsier 117, Loboc River
            </>
          ),
        },
        {
          image: "/src/assets/p3.jpg",
          content: (
            <>
              <strong>Tour Highlights</strong>
              <br />
              Exploring the beautiful landscapes and technological hubs of Cebu
              and Bohol.
            </>
          ),
        },
        {
          image: "/src/assets/p4.jpg",
          content: (
            <>
              Date: Nov 14 2023
              <br />
              Facilitator: Kevin Lu
              <br />
              Name of Company: RIVAN IT CEBU
              <br />
              <br />
              <strong>Observations:</strong>
              <br />
              Being in Rivan IT Cebu, I find it very interesting.
              <br />
              When we entered their office, I found many analog phones and
              personal computers. I find it very immersive.
              <br />
              <br />
              <strong>Learnings:</strong>
              <br />
              During the discussion with Mr. Kevin, I have learned many things
              which involve life and skills. This learning changed my
              perspective completely. I have learned that you need to be
              thoughtful and have fun in learning and avoid panic actions in
              order to progress in developing yourself and skills.
            </>
          ),
        },
        {
          image: "/src/assets/p5.jpg",
          content: (
            <>
              Date: Nov 13
              <br />
              Facilitator: Sir Anton, Sir Joseph and Miss Valerie
              <br />
              Name of Company: DYNATA PHILIPPINES INC.
              <br />
              <br />
              <strong>Observations:</strong>
              <br />
              When we arrive the Dynata Philippines, we've seen their huge
              company and neat lobby and production area. I find their team very
              organize and effective in different aspect in the office such as
              security, efficiency and stress-free environment.
              <br />
              <br />
              <strong>Learnings:</strong>
              <br />
              The lesson the different things that you need to consider in a
              workplace, I learned how to do part or important knowledge to make
              when calamity hits and how to use prepared at all times. I also
              learned that Dynata is global are already which helps every
              companies to gathered data's / survey to make meaningful
              information.
            </>
          ),
        },
        {
          image: "/src/assets/p6.jpg",
          content: (
            <>
              Date: Nov 12 2025
              <br />
              Facilitator: Jason Nieva
              <br />
              Name of Company: UP BUSINESS INCUBATOR FOR IT
              <br />
              <br />
              <strong>Observations:</strong>
              <br />
              The UP Cebu Business Incubation for IT is small building or place
              where to support IT companies, however, the place is currently
              renovating and full of equipment which make it more fun and
              enjoyable.
              <br />
              <br />
              <strong>Learnings:</strong>
              <br />I learned that being an IT student who learn what knew
              already the definition of IT is not enough. Being an IT student
              you need to learn about different aspects and factors since
              information technology is a broad career. You need to have
              resilient as well and be eager to learn every day.
            </>
          ),
        },
        {
          image: "/src/assets/p8.jpg",
          content: (
            <>
              Date: Nov 14
              <br />
              Name of Company: MATA TECHNOLOGIES, INC.
              <br />
              <br />
              <strong>Observations:</strong>
              <br />
              I observe that the place or their office is hard to find because
              of having no signs that the Mata Office is there. The events will
              have a hard time finding their office without using the internet.
              However their office is well organized and clean/tidy.
              <br />
              <br />
              <strong>Learnings:</strong>
              <br />
              Using their talent in creating immersive projects can help
              different users in terms of visualization and immersive projects.
              I learned also that using technology can promote our culture and
              help the tourism to navigate using immersive games and VRs.
            </>
          ),
        },
        {
          image: "/src/assets/p9.jpg",
          content: (
            <>
              Date: November 15 2025
              <br />
              Facilitator: Darwin Bernasor
              <br />
              Name of Company: T.A.R.S.I.E.R. 117
              <br />
              <br />
              <strong>Observations:</strong>
              <br />
              The process of their rescue and in terms of emergencies is
              excellent and fast. T.A.R.S.I.E.R 117 have their reliable
              equipment and vehicles always to be faster in charge of
              emergencies. The vehicles are park at the most convenient place
              for faster respond. Also they always monitor the the people in
              Bohol.
              <br />
              <br />
              <strong>Learnings:</strong>
              <br />I learned that being prepared always in calamities and being
              knowledgeable is very important and necessity to be able to save
              lives and protect the lives of every individual no matter where
              you are.
            </>
          ),
        },
        {
          image: "/src/assets/p10.jpg",
          content: (
            <>
              <strong>Impression Sheet</strong>
              <br />
              <br />
              <strong>Tour:</strong>
              <strong> Excellent. </strong>
              <br />
              The tour was very memorable and I enjoyed every moment and
              memories.
              <br />
              <strong>Hotel:</strong>
              <strong> Excellent. </strong>
              <br />
              The place was excellent in every fields.
              <br />
              <strong>Meals:</strong>
              <strong> Excellent. </strong>
              <br />
              The meals is super good and tasty.
              <br />
              <strong>Bus/Coaster/Van:</strong>
              <strong> Excellent. </strong>
              <br />
              The bus/coaster/vanThe driver it self is super friendly and the
              bus is excellent.
              <br />
              <strong>Tour Guide:</strong>
              <strong> Excellent. </strong>
              <br />
              The tour guide, Ate Gab is super friendly and very jolly, she's
              the best.
              <br />
              <strong>Companies:</strong>
              <strong> Excellent. </strong>
              <br />I learned a lot and experienced the real world of IT
              industry.
              <br />
              <strong>Overall Experience:</strong>
              <strong> Excellent. </strong>
              <br />
              Memorable and the best!!!
            </>
          ),
        },
      ],
    },
  },
  {
    name: "Codm Department Tournament",
    images: ["/src/assets/codm1.jpg", "/src/assets/codm2.jpg"],
  },
  {
    name: "Department Activities",
    images: ["/src/assets/event1.jpg", "/src/assets/event2.jpg"],
  },
];

const JournalEntry = ({
  journal,
  openLightbox,
}: {
  journal: { title: string; entries: { image: string; content: any }[] };
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
            width={800}
            height={600}
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
                  width={240}
                  height={240}
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
  const adjacentToPrefetch =
    lightboxOpen && images.length > 0
      ? [
          images[(index + 1) % images.length],
          images[(index - 1 + images.length) % images.length],
        ]
      : undefined;
  usePrefetchImages(adjacentToPrefetch);

  const openLightbox = (imgs: string[], i: number) => {
    setImages(imgs);
    setIndex(i);
    setZoom(1);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  const nextImage = (e?: any) => {
    e?.stopPropagation();
    setIndex((i) => (i + 1) % images.length);
    setZoom(1);
  };

  const prevImage = (e?: any) => {
    e?.stopPropagation();
    setIndex((i) => (i - 1 + images.length) % images.length);
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
  }, [lightboxOpen, images.length]);

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
                src={images[index]}
                alt={`Image ${index + 1}`}
                className="max-w-[80vw] max-h-[80vh] object-contain"
                priority
                style={{ transform: `scale(${zoom})` }}
                onError={(e) => {
                  const target = e.currentTarget as HTMLImageElement;
                  target.onerror = null;
                  target.src = "/src/assets/profile.jpg";
                }}
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
                        {activity.images.map((image, index) => (
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
                                openLightbox(activity.images, index)
                              }
                              width={800}
                              height={800}
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
                    {activity.images.map((image, index) => (
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
                                openLightbox(activity.images, index)
                              }
                              onError={(e) => {
                                const target =
                                  e.currentTarget as HTMLImageElement;
                                target.onerror = null;
                                target.src = "/src/assets/profile.jpg";
                              }}
                              width={480}
                              height={480}
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
