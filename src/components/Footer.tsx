import { Code2, Github, Linkedin, Mail, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 border-t border-primary/20 relative">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <a
            href="#home"
            className="flex items-center gap-2 text-primary font-display font-bold text-lg neon-text-cyan"
          >
            <Code2 className="w-5 h-5" />
            <span>PORTFOLIO</span>
          </a>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="p-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="p-2 text-muted-foreground hover:text-secondary transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="p-2 text-muted-foreground hover:text-accent transition-colors"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>

          {/* Copyright */}
          <div className="flex flex-col items-center md:items-end gap-2">
            <a
              // href="mailto:hello@example.com"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              {/* hello@example.com */}
            </a>
            <p className="font-body text-sm text-muted-foreground flex items-center gap-1">
              © 2025 Joevinyll
              
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
