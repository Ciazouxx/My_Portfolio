import { ChevronDown, Github, Mail, Facebook } from "lucide-react";

const HeroSection = () => {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-float" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] animate-float"
          style={{ animationDelay: "-3s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-accent/20 rounded-full blur-[100px] animate-float"
          style={{ animationDelay: "-1.5s" }}
        />
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      <div className="container mx-auto px-4 relative z-10 text-center">
        <div className="animate-slide-up">
          <p className="text-primary font-body text-lg md:text-xl mb-4 tracking-widest">
            HELLO, I'M
          </p>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6 animate-glow-pulse">
            <span className="text-primary">JOEVINYLL JAN</span>{" "}
            <span className="gradient-text">PALABRICA</span>
          </h1>
          <p className="font-body text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Aspiring IT Professional | Web Developer | Tech Enthusiast
          </p>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-6 mb-12">
            <a
              href="https://github.com/Ciazouxx"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-3 glass-card border-primary/30 hover:border-primary transition-all duration-300 hover:neon-border-cyan"
            >
              <Github className="w-6 h-6 text-foreground group-hover:text-primary transition-colors" />
            </a>
            <a
              href="https://www.facebook.com/dont.talk.to.mehh/"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-3 glass-card border-secondary/30 hover:border-secondary transition-all duration-300 hover:neon-border-magenta"
            >
              <Facebook className="w-6 h-6 text-foreground group-hover:text-secondary transition-colors" />
            </a>
            <a
              href="mailto:joevinylljan.palabrica@hcdc.edu.ph"
              className="group p-3 glass-card border-accent/30 hover:border-accent transition-all duration-300 hover:neon-border-purple"
            >
              <Mail className="w-6 h-6 text-foreground group-hover:text-accent transition-colors" />
            </a>
          </div>

          {/* CTA Button */}
          <a
            href="#about"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary/10 border border-primary text-primary font-display font-semibold rounded-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300 neon-border-cyan hover:scale-105"
          >
            EXPLORE MY JOURNEY
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-primary/60" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
