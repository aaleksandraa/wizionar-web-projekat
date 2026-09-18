import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { getV2Translations } from "@/lib/v2-translations";

const V2Impact = () => {
  const { language } = useLanguage();
  const v2 = getV2Translations(language);

  return (
    <section className="relative overflow-hidden border-y border-border/60 py-20 md:py-24">
      <div className="v2-aurora absolute inset-0 -z-10 opacity-60" aria-hidden="true" />

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-14 text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">
            {v2.impact.label}
          </span>
          <h2 className="mt-4 text-[clamp(1.6rem,3.6vw,2.5rem)] font-bold">{v2.impact.title}</h2>
        </motion.div>

        <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {v2.impact.items.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="v2-frame v2-shine group relative overflow-hidden rounded-3xl border border-border/60 bg-background/40 p-7 text-center transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="v2-text-gradient text-4xl font-bold md:text-5xl">{item.value}</div>
              <div className="mt-3 text-sm font-semibold text-foreground">{item.label}</div>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default V2Impact;
