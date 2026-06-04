import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import LocalizedLink from "@/components/LocalizedLink";
import { Menu, X, ChevronRight, ArrowUpRight, Mail, Facebook, Instagram, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import wizionarLogo from "@/assets/wizionar-logo.png";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";
import { PROJECT_INQUIRY_PATH } from "@/lib/project-inquiry-schema";

const WizionarHeader = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t, language } = useLanguage();
  const location = useLocation();
  const localizedPath = useLocalizedPath();

  const isHomePage = location.pathname === "/" || /^\/(en|de|it)\/?$/.test(location.pathname);
  const inquiryLabel = {
    sr: "Upitnik",
    en: "Inquiry",
    de: "Fragebogen",
    it: "Questionario",
  }[language];

  const closeMobileMenu = () => setMobileMenuOpen(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;

    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };
  }, [mobileMenuOpen]);

  const navItems = [
    {
      label: t.nav.products,
      href: isHomePage ? "#products" : "/#products",
      isRouterLink: !isHomePage,
    },
    {
      label: t.nav.services,
      href: "/usluge",
      isRouterLink: true,
    },
    {
      label: inquiryLabel,
      href: PROJECT_INQUIRY_PATH,
      isRouterLink: true,
    },
    {
      label: t.nav.contact,
      href: isHomePage ? "#contact" : "/#contact",
      isRouterLink: !isHomePage,
    },
  ];

  const getResolvedPath = (href: string) => localizedPath(href).split(/[?#]/)[0] || "/";
  const isNavItemActive = (href: string, isRouterLink: boolean) => {
    if (!isRouterLink) return false;

    const resolvedPath = getResolvedPath(href);
    return href === "/usluge"
      ? location.pathname === resolvedPath || location.pathname.startsWith(`${resolvedPath}/`)
      : location.pathname === resolvedPath;
  };

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/95 backdrop-blur-xl border-b border-border/50 shadow-sm"
            : "bg-background/80 backdrop-blur-md border-b border-transparent"
        }`}
      >
        <div className="container mx-auto flex items-center justify-between px-6 py-3">
          <LocalizedLink to="/" className="flex items-center gap-3">
            <img
              src={wizionarLogo}
              alt="Wizionar"
              decoding="async"
              fetchpriority="high"
              className="h-11 w-auto md:h-12"
            />
          </LocalizedLink>

          <nav className="hidden items-center md:flex">
            <div className="flex items-center gap-1 rounded-full bg-secondary/50 px-1.5 py-1.5">
              {navItems.map((item) => {
                const isActive = isNavItemActive(item.href, item.isRouterLink);

                const className = `relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                  isActive
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                }`;

                return item.isRouterLink ? (
                  <LocalizedLink key={item.href} to={item.href} className={className}>
                    {item.label}
                  </LocalizedLink>
                ) : (
                  <a key={item.href} href={item.href} className={className}>
                    {item.label}
                  </a>
                );
              })}
            </div>
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <LanguageSwitcher />
            <Button size="default" className="rounded-full shadow-orange gap-1.5" asChild>
              <LocalizedLink to={PROJECT_INQUIRY_PATH}>
                {t.nav.requestDemo}
                <ArrowUpRight className="w-4 h-4" />
              </LocalizedLink>
            </Button>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <LanguageSwitcher />
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-secondary/60 transition-colors hover:bg-secondary"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[60] bg-foreground/20 backdrop-blur-sm md:hidden"
              onClick={closeMobileMenu}
              aria-label="Close menu overlay"
            />

            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-y-0 right-0 z-[70] flex w-[86%] max-w-sm flex-col border-l border-border bg-background shadow-2xl md:hidden"
            >
              <div className="flex items-center justify-between border-b border-border/60 bg-background px-5 py-4">
                <LocalizedLink to="/" className="flex items-center" onClick={closeMobileMenu}>
                  <img src={wizionarLogo} alt="Wizionar" decoding="async" className="h-10 w-auto" />
                </LocalizedLink>

                <button
                  type="button"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-secondary transition-colors hover:bg-secondary/80"
                  onClick={closeMobileMenu}
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="flex-1 bg-background px-4 py-5">
                <div className="space-y-1">
                  {navItems.map((item, index) => {
                    const isActive = isNavItemActive(item.href, item.isRouterLink);

                    const linkClassName = `flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-medium transition-colors ${
                      isActive
                        ? "bg-primary/5 text-primary"
                        : "text-foreground hover:bg-secondary/60"
                    }`;

                    const content = (
                      <>
                        <span>{item.label}</span>
                        <ChevronRight className={`h-4 w-4 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
                      </>
                    );

                    return (
                      <motion.div
                        key={item.href}
                        initial={{ opacity: 0, x: 12 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 12 }}
                        transition={{ delay: 0.05 + index * 0.05, duration: 0.2 }}
                      >
                        {item.isRouterLink ? (
                          <LocalizedLink to={item.href} className={linkClassName} onClick={closeMobileMenu}>
                            {content}
                          </LocalizedLink>
                        ) : (
                          <a href={item.href} className={linkClassName} onClick={closeMobileMenu}>
                            {content}
                          </a>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </nav>

              <div className="border-t border-border/60 bg-background px-5 py-5">
                <div className="flex flex-col items-center gap-3 mb-4">
                  <a
                    href="mailto:info@wizionar.com"
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    info@wizionar.com
                  </a>
                  <div className="flex items-center gap-4">
                    <a href="https://facebook.com/wizionar" target="_blank" rel="noopener noreferrer" className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-secondary/60 text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors" aria-label="Facebook">
                      <Facebook className="w-4 h-4" />
                    </a>
                    <a href="https://instagram.com/wizionar.app" target="_blank" rel="noopener noreferrer" className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-secondary/60 text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors" aria-label="Instagram">
                      <Instagram className="w-4 h-4" />
                    </a>
                    <a href="https://wa.me/38766882702" target="_blank" rel="noopener noreferrer" className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-secondary/60 text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors" aria-label="WhatsApp">
                      <Phone className="w-4 h-4" />
                    </a>
                  </div>
                </div>
                <Button asChild size="lg" className="w-full rounded-xl shadow-orange gap-1.5">
                  <LocalizedLink to={PROJECT_INQUIRY_PATH} onClick={closeMobileMenu}>
                    {t.nav.requestDemo}
                    <ArrowUpRight className="w-4 h-4" />
                  </LocalizedLink>
                </Button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default WizionarHeader;
