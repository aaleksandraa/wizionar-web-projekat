import { motion, AnimatePresence } from "framer-motion";
import {
  Palette,
  PenTool,
  Image,
  Layers,
  FileText,
  Share2,
  Package,
  BookOpen,
  ArrowRight,
  Mail,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import WizionarHeader from "@/components/wizionar/WizionarHeader";
import WizionarFooter from "@/components/wizionar/WizionarFooter";
import SEOHead from "@/components/wizionar/SEOHead";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState, useCallback } from "react";
import { grafickiDizajnTranslations } from "@/lib/graficki-dizajn-translations";
import {
  SEO_PATHS,
  createBreadcrumbSchema,
  createFaqSchema,
  createServiceSchema,
  createWebPageSchema,
  getPageSeo,
  getSeoLabel,
} from "@/lib/seo";

import logo1 from "@/assets/design/logo-1.jpg";
import logo2 from "@/assets/design/logo-2.jpg";
import logo3 from "@/assets/design/logo-3.jpg";
import logo4 from "@/assets/design/logo-4.jpg";
import print1 from "@/assets/design/print-1.jpg";
import print2 from "@/assets/design/print-2.jpg";
import print3 from "@/assets/design/print-3.jpg";
import print4 from "@/assets/design/print-4.jpg";
import social1 from "@/assets/design/social-1.jpg";
import social2 from "@/assets/design/social-2.jpg";
import social3 from "@/assets/design/social-3.jpg";
import social4 from "@/assets/design/social-4.jpg";
import packaging1 from "@/assets/design/packaging-1.jpg";
import packaging2 from "@/assets/design/packaging-2.jpg";
import packaging3 from "@/assets/design/packaging-3.jpg";
import packaging4 from "@/assets/design/packaging-4.jpg";
import presentation1 from "@/assets/design/presentation-1.jpg";
import presentation2 from "@/assets/design/presentation-2.jpg";
import presentation3 from "@/assets/design/presentation-3.jpg";
import presentation4 from "@/assets/design/presentation-4.jpg";
import illustration1 from "@/assets/design/illustration-1.jpg";
import illustration2 from "@/assets/design/illustration-2.jpg";
import illustration3 from "@/assets/design/illustration-3.jpg";
import illustration4 from "@/assets/design/illustration-4.jpg";
import webgraphic1 from "@/assets/design/webgraphic-1.jpg";
import webgraphic2 from "@/assets/design/webgraphic-2.jpg";
import webgraphic3 from "@/assets/design/webgraphic-3.jpg";
import webgraphic4 from "@/assets/design/webgraphic-4.jpg";
import branding1 from "@/assets/design/branding-1.jpg";
import branding2 from "@/assets/design/branding-2.jpg";
import branding3 from "@/assets/design/branding-3.jpg";
import branding4 from "@/assets/design/branding-4.jpg";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const serviceIcons = [Palette, FileText, Share2, Package, BookOpen, Image, PenTool, Layers];
const serviceImages = [
  [logo1, logo2, logo3, logo4],
  [print1, print2, print3, print4],
  [social1, social2, social3, social4],
  [packaging1, packaging2, packaging3, packaging4],
  [presentation1, presentation2, presentation3, presentation4],
  [illustration1, illustration2, illustration3, illustration4],
  [webgraphic1, webgraphic2, webgraphic3, webgraphic4],
  [branding1, branding2, branding3, branding4],
];

const MiniCarousel = ({
  images,
  onImageClick,
  altText,
  language,
}: {
  images: string[];
  onImageClick: (images: string[], index: number) => void;
  altText: string;
  language: string;
}) => {
  const [visibleCount, setVisibleCount] = useState(() => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      return 4;
    }

    return 6;
  });

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const step = isMobile ? 4 : 6;
  const visible = images.slice(0, visibleCount);
  const hasMore = visibleCount < images.length;

  return (
    <div className="mt-4">
      <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
        {visible.map((image, index) => (
          <button
            key={image}
            type="button"
            className="group/thumb aspect-square cursor-pointer overflow-hidden rounded-lg"
            onClick={() => onImageClick(images, index)}
          >
            <img
              src={image}
              alt={`${altText} ${index + 1}`}
              loading="lazy"
              decoding="async"
              sizes="(max-width: 768px) 50vw, 33vw"
              className="h-full w-full object-cover transition-transform duration-300 group-hover/thumb:scale-105"
            />
          </button>
        ))}
      </div>
      {hasMore && (
        <button
          type="button"
          onClick={() => setVisibleCount((count) => count + step)}
          className="mt-3 w-full text-xs font-medium text-primary transition-all hover:underline"
        >
          {language === "en"
            ? "Load more"
            : language === "de"
              ? "Mehr laden"
              : language === "it"
                ? "Carica altro"
                : "Učitaj više"}{" "}
          ↓
        </button>
      )}
    </div>
  );
};

const Lightbox = ({
  images,
  index,
  onClose,
  altText,
}: {
  images: string[];
  index: number;
  onClose: () => void;
  altText: string;
}) => {
  const [current, setCurrent] = useState(index);
  const prev = () => setCurrent((value) => (value === 0 ? images.length - 1 : value - 1));
  const next = () => setCurrent((value) => (value === images.length - 1 ? 0 : value + 1));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close gallery"
        className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
      >
        <X className="h-5 w-5 text-white" />
      </button>
      <div className="relative mx-4 w-full max-w-4xl" onClick={(event) => event.stopPropagation()}>
        <motion.img
          key={current}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
          src={images[current]}
          alt={altText}
          decoding="async"
          className="max-h-[80vh] w-full rounded-xl object-contain"
        />
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Previous image"
              className="absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
            >
              <ChevronLeft className="h-5 w-5 text-white" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next image"
              className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
            >
              <ChevronRight className="h-5 w-5 text-white" />
            </button>
            <div className="absolute -bottom-8 left-1/2 flex -translate-x-1/2 gap-2">
              {images.map((image, dotIndex) => (
                <button
                  key={`${image}-${dotIndex}`}
                  type="button"
                  onClick={() => setCurrent(dotIndex)}
                  aria-label={`Go to image ${dotIndex + 1}`}
                  className={`h-2 rounded-full transition-all ${
                    dotIndex === current ? "w-4 bg-white" : "w-2 bg-white/40"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
};

const FaqItem = ({ q, a }: { q: string; a: string }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="overflow-hidden rounded-xl border border-border">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between p-5 text-left transition-colors hover:bg-muted/50"
      >
        <span className="pr-4 font-semibold">{q}</span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      {open && <div className="px-5 pb-5 leading-relaxed text-muted-foreground">{a}</div>}
    </div>
  );
};

const GrafickiDizajn = () => {
  const { language } = useLanguage();
  const t = grafickiDizajnTranslations[language];
  const seo = getPageSeo("graphicDesign", language);
  const [lightbox, setLightbox] = useState<{ images: string[]; index: number } | null>(null);
  const openLightbox = useCallback(
    (images: string[], index: number) => setLightbox({ images, index }),
    []
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title={seo.title}
        description={seo.description}
        schema={[
          createServiceSchema({
            language,
            name: seo.title,
            description: seo.description,
            path: SEO_PATHS.graphicDesign,
            serviceType: getSeoLabel(language, "graphicDesign"),
          }),
          createWebPageSchema({
            language,
            path: SEO_PATHS.graphicDesign,
            title: seo.title,
            description: seo.description,
          }),
          createBreadcrumbSchema(language, [
            { name: getSeoLabel(language, "home"), path: SEO_PATHS.home },
            { name: getSeoLabel(language, "services"), path: SEO_PATHS.usluge },
            { name: getSeoLabel(language, "graphicDesign"), path: SEO_PATHS.graphicDesign },
          ]),
          createFaqSchema(t.faqs.map((item) => ({ question: item.q, answer: item.a }))),
        ]}
      />
      <WizionarHeader />
      <main>
        <section className="relative overflow-hidden pb-20 pt-32">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
          <div className="container relative z-10 mx-auto px-3 text-center md:px-6">
            <motion.span
              {...fadeUp}
              className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-primary"
            >
              {t.meta.badge}
            </motion.span>
            <motion.h1
              {...fadeUp}
              transition={{ delay: 0.1 }}
              className="mb-6 text-4xl font-bold leading-tight md:text-6xl"
            >
              {t.meta.title1} <br />
              <span className="text-gradient">{t.meta.title2}</span>
            </motion.h1>
            <motion.p
              {...fadeUp}
              transition={{ delay: 0.2 }}
              className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground"
            >
              {t.meta.subtitle}
            </motion.p>
            <motion.a
              {...fadeUp}
              transition={{ delay: 0.3 }}
              href="mailto:info@wizionar.com"
              className="inline-flex items-center gap-2 font-semibold text-primary transition-all hover:gap-3"
            >
              <Mail className="h-5 w-5" />
              {t.meta.cta}
              <ArrowRight className="h-4 w-4" />
            </motion.a>
          </div>
        </section>

        <section className="pb-24">
          <div className="container mx-auto px-3 md:px-6">
            <motion.div {...fadeUp} className="mb-16 text-center">
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                {t.servicesTitle} <span className="text-gradient">{t.servicesTitleHighlight}</span>
              </h2>
              <p className="mx-auto max-w-xl text-muted-foreground">{t.servicesSubtitle}</p>
            </motion.div>
            <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
              {t.services.map((service, index) => {
                const Icon = serviceIcons[index];
                const images = serviceImages[index];

                return (
                  <motion.div
                    key={service.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                    className="group rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/20 hover:shadow-lg"
                  >
                    <div className="mb-3 flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="text-lg font-bold">{service.title}</h3>
                    </div>
                    <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                      {service.description}
                    </p>
                    <div className="mb-1 flex flex-wrap gap-2">
                      {service.examples.map((example) => (
                        <span
                          key={example}
                          className="rounded-full bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary"
                        >
                          {example}
                        </span>
                      ))}
                    </div>
                    <MiniCarousel
                      images={images}
                      onImageClick={openLightbox}
                      altText={t.imageAlt}
                      language={language}
                    />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="pb-24">
          <div className="container mx-auto px-3 md:px-6">
            <motion.div {...fadeUp} className="mb-16 text-center">
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                {t.processTitle} <span className="text-gradient">{t.processTitleHighlight}</span>
              </h2>
              <p className="mx-auto max-w-xl text-muted-foreground">{t.processSubtitle}</p>
            </motion.div>
            <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {t.process.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="rounded-2xl border border-border bg-card p-6"
                >
                  <span className="mb-2 block text-3xl font-bold text-primary/20">{step.step}</span>
                  <h3 className="mb-2 text-lg font-bold">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="pb-24">
          <div className="container mx-auto px-3 md:px-6">
            <motion.div {...fadeUp} className="mb-12 text-center">
              <h2 className="text-3xl font-bold md:text-4xl">
                {t.faqTitle} <span className="text-gradient">{t.faqTitleHighlight}</span>
              </h2>
            </motion.div>
            <div className="mx-auto max-w-3xl space-y-3">
              {t.faqs.map((faq) => (
                <FaqItem key={faq.q} q={faq.q} a={faq.a} />
              ))}
            </div>
          </div>
        </section>

        <section className="pb-32">
          <div className="container mx-auto px-3 md:px-6">
            <motion.div
              {...fadeUp}
              className="rounded-3xl border border-primary/10 bg-gradient-to-br from-primary/10 to-primary/5 p-12 text-center"
            >
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">{t.ctaTitle}</h2>
              <p className="mx-auto mb-8 max-w-lg text-muted-foreground">{t.ctaSubtitle}</p>
              <a
                href="mailto:info@wizionar.com"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                <Mail className="h-5 w-5" />
                info@wizionar.com
              </a>
            </motion.div>
          </div>
        </section>
      </main>
      <WizionarFooter />

      <AnimatePresence>
        {lightbox && (
          <Lightbox
            images={lightbox.images}
            index={lightbox.index}
            onClose={() => setLightbox(null)}
            altText={t.imageAlt}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default GrafickiDizajn;
