const HeroSection = () => {
  return (
    <section
      id="home"
      className="min-h-[85svh] flex items-center justify-center relative overflow-hidden px-0 pt-16"
    >
      <div className="container mx-auto px-4 relative z-10 text-center">
        <div>
          <p className="text-primary font-body text-sm font-semibold sm:text-base md:text-lg mb-4">
            HELLO, I'M
          </p>
          <h1 className="mx-auto mb-5 max-w-5xl break-words font-display text-3xl font-bold leading-tight sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="text-primary">JOEVINYLL JAN</span>{" "}
            <span className="gradient-text">PALABRICA</span>
          </h1>
          <p className="font-body text-base sm:text-lg md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Aspiring IT Professional | Web Developer | Tech Enthusiast
          </p>

          <a
            href="#about"
            className="inline-flex max-w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-center font-display text-sm font-semibold text-primary-foreground transition-colors duration-200 hover:bg-primary/90 sm:px-7 sm:text-base"
          >
            EXPLORE MY JOURNEY
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
