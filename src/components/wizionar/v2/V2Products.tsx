import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Building2,
  Cat,
  CreditCard,
  MessageCircle,
  Scissors,
  Stethoscope,
  Wallet,
} from "lucide-react";
import LocalizedLink from "@/components/LocalizedLink";
import { useLanguage } from "@/contexts/LanguageContext";
import { getV2Translations } from "@/lib/v2-translations";
import { PROJECT_INQUIRY_PATH } from "@/lib/project-inquiry-schema";
import { useSpotlight } from "./v2-hooks";

const V2Products = () => {
  const { t, language } = useLanguage();
  const v2 = getV2Translations(language);
  const onSpotlightMove = useSpotlight();

  const products = [
    {
      id: "wizflussi",
      name: "WizFlussi",
      icon: CreditCard,
      tagline: t.products.items.wizflussi.tagline,
      description: t.products.items.wizflussi.description,
      features: t.products.items.wizflussi.features,
      link: "/wizflussi",
      available: true,
    },
    {
      id: "wizmedik-reports",
      name: "WizMedikReports",
      icon: Stethoscope,
      tagline: "Izvještavanje za medicinske ustanove",
      description:
        "Dnevni, sedmični i mjesečni izvještaji. Praćenje zarade, osoblja, radnih sati i normativa, sve na jednom mjestu.",
      features: ["Praćenje zarade", "Upravljanje osobljem", "Automatski izvještaji"],
      link: "/wizmedik-reports",
      available: true,
    },
    {
      id: "wizmedik",
      name: "wizMedik",
      icon: Stethoscope,
      tagline: "Zdravstvo na jednom mjestu u BiH",
      description:
        "Platforma koja povezuje doktore, klinike, laboratorije, banje i domove za njegu. Online zakazivanje, stručni blog i anonimna pitanja.",
      features: ["Pretraga doktora", "Online zakazivanje", "Stručni blog"],
      link: "/wizmedik",
      available: true,
    },
    {
      id: "frizerino",
      name: "Frizerino",
      icon: Scissors,
      tagline: "Platforma za online zakazivanje salona",
      description:
        "Pronađite i rezervišite frizerski ili kozmetički salon. Pretraga po gradu, usluzi i slobodnim terminima, bez poziva i čekanja.",
      features: ["Pametna pretraga", "Online rezervacija", "Sistem za salone"],
      link: "/frizerino",
      available: true,
    },
    {
      id: "chatko",
      name: "Chatko",
      icon: MessageCircle,
      tagline: t.products.items.chatko.tagline,
      description: t.products.items.chatko.description,
      features: t.products.items.chatko.features,
      link: "/chatko",
      available: true,
    },
    {
      id: "wizfin",
      name: "WizFin",
      icon: Wallet,
      tagline: t.products.items.wizfin.tagline,
      description: t.products.items.wizfin.description,
      features: t.products.items.wizfin.features,
      link: "/wizfin",
      available: false,
    },
    {
      id: "wizbank",
      name: "WizBank",
      icon: Building2,
      tagline: t.products.items.wizbank.tagline,
      description: t.products.items.wizbank.description,
      features: t.products.items.wizbank.features,
      link: "/wizbank",
      available: false,
    },
    {
      id: "wizvet",
      name: "WizVet",
      icon: Cat,
      tagline: t.products.items.wizvet.tagline,
      description: t.products.items.wizvet.description,
      features: t.products.items.wizvet.features,
      link: "/wizvet",
      available: false,
    },
  ];

  return (
    <section id="products" className="relative overflow-hidden py-24 md:py-32">
      <div className="v2-grid absolute inset-0 -z-10 opacity-40" aria-hidden="true" />
      <div
        className="v2-orb absolute -right-32 top-10 -z-10 h-96 w-96 bg-[hsla(268,85%,60%,0.16)]"
        aria-hidden="true"
      />

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">
            {t.products.label}
          </span>
          <h2 className="mt-5 text-[clamp(1.9rem,4.5vw,3.25rem)] font-bold leading-[1.1]">
            <span className="v2-text-gradient">{t.products.title}</span>
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
            {t.products.subtitle}
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product, index) => (
            <motion.article
              key={product.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
              onMouseMove={onSpotlightMove}
              className="v2-frame v2-spotlight group relative flex flex-col overflow-hidden rounded-3xl border border-border/60 bg-background/45 p-6 transition-transform duration-300 hover:-translate-y-1.5"
            >
              <div className="relative z-10 flex h-full flex-col">
                <div className="mb-5 flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-primary/25 bg-primary/10 text-primary transition-all duration-300 group-hover:scale-105 group-hover:bg-primary/20">
                      <product.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold leading-tight">{product.name}</h3>
                      <p className="text-xs font-medium text-primary">{product.tagline}</p>
                    </div>
                  </div>

                  <span
                    className={`shrink-0 rounded-full border px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-wider ${
                      product.available
                        ? "border-emerald/40 bg-emerald/10 text-emerald"
                        : "border-border/70 bg-secondary/60 text-muted-foreground"
                    }`}
                  >
                    {product.available ? t.products.available : t.products.soon}
                  </span>
                </div>

                <p className="mb-5 flex-grow text-sm leading-relaxed text-muted-foreground">
                  {product.description}
                </p>

                <div className="mb-6 flex flex-wrap gap-2">
                  {product.features.map((feature) => (
                    <span
                      key={feature}
                      className="rounded-full border border-border/60 bg-secondary/50 px-3 py-1 text-[0.7rem] font-medium text-muted-foreground"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                <div className="mt-auto flex items-center justify-between border-t border-border/50 pt-4">
                  <LocalizedLink
                    to={PROJECT_INQUIRY_PATH}
                    className="text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {v2.products.inquiry}
                  </LocalizedLink>

                  {product.available && (
                    <LocalizedLink
                      to={product.link}
                      className="group/link inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-accent"
                    >
                      {v2.products.explore}
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                    </LocalizedLink>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default V2Products;
