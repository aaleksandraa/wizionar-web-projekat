import { motion } from "framer-motion";
import LocalizedLink from "@/components/LocalizedLink";
import {
  Wallet,
  Stethoscope,
  Scissors,
  Cat,
  Building2,
  CreditCard,
  MessageCircle,
  Mail,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const ProductsSection = () => {
  const { t } = useLanguage();

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
      featured: true,
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
      featured: true,
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
      featured: false,
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
      featured: false,
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
      featured: true,
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
      featured: true,
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
      featured: true,
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
      featured: false,
    },
  ];

  return (
    <section id="products" className="bg-secondary/30 py-32">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-primary">
            {t.products.label}
          </span>
          <h2 className="mb-6 text-4xl font-bold md:text-5xl">{t.products.title}</h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">{t.products.subtitle}</p>
        </motion.div>

        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative flex flex-col rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/20 hover:shadow-md"
            >
              <div className="mb-4 flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                  <product.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{product.name}</h3>
                  <p className="text-sm font-medium text-primary">{product.tagline}</p>
                </div>
              </div>

              <p className="mb-4 flex-grow text-sm leading-relaxed text-muted-foreground">
                {product.description}
              </p>

              <div className="mb-6 flex flex-wrap gap-2">
                {product.features.map((feature) => (
                  <span
                    key={feature}
                    className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground"
                  >
                    {feature}
                  </span>
                ))}
              </div>

              <div className="mt-auto flex items-center justify-between border-t border-border/50 pt-4">
                <a
                  href="mailto:info@wizionar.com"
                  className="inline-flex items-center gap-2 text-sm text-primary transition-colors hover:text-primary/80"
                >
                  <Mail className="h-4 w-4" />
                  {t.products.contactUs}
                </a>
                {product.available && product.link !== "#" && (
                  <LocalizedLink
                    to={product.link}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Pogledaj →
                  </LocalizedLink>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
