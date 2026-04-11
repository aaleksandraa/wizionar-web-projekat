import { motion } from "framer-motion";
import { Mail, Phone, Package, Palette, Handshake } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const ContactSection = () => {
  const { t } = useLanguage();

  const categories = [
    {
      icon: Package,
      title: t.contact.categories.products,
      desc: t.contact.categories.productsDesc,
    },
    {
      icon: Palette,
      title: t.contact.categories.services,
      desc: t.contact.categories.servicesDesc,
    },
    {
      icon: Handshake,
      title: t.contact.categories.partnership,
      desc: t.contact.categories.partnershipDesc,
    },
  ];

  return (
    <section id="contact" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t.contact.title}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t.contact.subtitle}
          </p>
        </motion.div>

        {/* Categories */}
        <div className="grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto mb-10">
          {categories.map((cat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="p-5 rounded-2xl bg-background border border-border text-center"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <cat.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold text-sm mb-1">{cat.title}</h3>
              <p className="text-xs text-muted-foreground">{cat.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Contact cards */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-8"
        >
          <div className="p-6 rounded-2xl bg-background border border-border text-center">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Mail className="w-6 h-6 text-primary" />
            </div>
            <p className="text-sm text-muted-foreground mb-2">{t.contact.emailLabel}</p>
            <a
              href="mailto:info@wizionar.com"
              className="text-lg md:text-xl font-bold text-primary hover:text-primary/80 transition-colors"
            >
              {t.contact.email}
            </a>
          </div>

          <div className="p-6 rounded-2xl bg-background border border-border text-center">
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
              <Phone className="w-6 h-6 text-accent" />
            </div>
            <p className="text-sm text-muted-foreground mb-2">{t.contact.phoneLabel}</p>
            <a
              href="https://wa.me/38766882702"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg md:text-xl font-bold text-accent hover:text-accent/80 transition-colors"
            >
              {t.contact.phone}
            </a>
          </div>
        </motion.div>

        {/* CTA line */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center text-sm text-muted-foreground max-w-xl mx-auto"
        >
          {t.contact.cta}
        </motion.p>
      </div>
    </section>
  );
};

export default ContactSection;
