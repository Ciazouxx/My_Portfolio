import {
  Code2,
  Github,
  Facebook,
  Mail,
  Phone,
  MapPin,
  Heart,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-8 border-t border-primary/20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 items-center text-center md:text-left">
          {/* Logo */}
          <a
            href="#home"
            className="flex items-center justify-center md:justify-start gap-2 text-primary font-display font-bold text-lg neon-text-cyan"
          >
            <Code2 className="w-5 h-5" />
            <span>PORTFOLIO</span>
          </a>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-4">
            <a
              href="https://github.com/Ciazouxx"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://www.facebook.com/dont.talk.to.mehh/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-muted-foreground hover:text-secondary transition-colors"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href="mailto:joevinylljan.palabrica@hcdc.edu.ph"
              className="p-2 text-muted-foreground hover:text-accent transition-colors"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>

          {/* Contact Details */}
          <div className="flex flex-col items-center md:items-end gap-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span>0995-177-1794</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>Davao City</span>
            </div>
          </div>
        </div>
        <div className="text-center text-sm text-muted-foreground mt-8">
          <p className="flex items-center justify-center gap-1">
            © {new Date().getFullYear()} Joevinyll.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
