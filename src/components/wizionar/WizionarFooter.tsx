import LocalizedLink from "@/components/LocalizedLink";
import wizionarLogo from "@/assets/wizionar-logo.png";
import { useLanguage } from "@/contexts/LanguageContext";
import { Mail, Facebook, Instagram, Phone } from "lucide-react";

const WizionarFooter = () => {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto px-6 py-12 md:py-16 flex flex-col items-center text-center gap-6">
        {/* Email */}
        <a
          href="mailto:info@wizionar.com"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          info@wizionar.com
        </a>

        {/* Social Icons */}
        <div className="flex items-center gap-5">
          <a
            href="https://facebook.com/wizionar"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Facebook"
          >
            <Facebook className="w-5 h-5" />
          </a>
          <a
            href="https://instagram.com/wizionar.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Instagram"
          >
            <Instagram className="w-5 h-5" />
          </a>
          <a
            href="https://wa.me/38766882702"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="WhatsApp"
          >
            <Phone className="w-5 h-5" />
          </a>
        </div>

        {/* Logo */}
        <LocalizedLink to="/" className="inline-block">
          <img src={wizionarLogo} alt="Wizionar" loading="lazy" decoding="async" className="h-16 w-auto" />
        </LocalizedLink>

        {/* Copyright */}
        <p className="text-sm text-muted-foreground">
          {t.footer.copyright}
        </p>
      </div>
    </footer>
  );
};

export default WizionarFooter;
