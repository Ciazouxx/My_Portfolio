import { Code2 } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 border-t border-primary/20 relative">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <a
            href="#home"
            className="flex items-center gap-2 text-primary font-display font-bold text-lg"
          >
            <Code2 className="w-5 h-5" />
            <span>PORTFOLIO</span>
          </a>

          {/* Copyright */}
          <div className="flex flex-col items-center md:items-end gap-2">
            <p className="font-body text-sm text-muted-foreground flex items-center gap-1">
              © 2025 Joevinyll Jan Palabrica
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
