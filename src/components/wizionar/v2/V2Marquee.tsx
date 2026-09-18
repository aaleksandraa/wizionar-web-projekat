import { Database, Zap, Shield, FileDown, Layers } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { getV2Translations } from "@/lib/v2-translations";

const V2Marquee = () => {
  const { t, language } = useLanguage();
  const v2 = getV2Translations(language);

  const signals = [
    { icon: Database, label: t.trust.centralization },
    { icon: Zap, label: t.trust.automation },
    { icon: Shield, label: t.trust.rbac },
    { icon: FileDown, label: t.trust.export },
    { icon: Layers, label: t.trust.modular },
  ];

  const items = [
    ...signals.map((signal) => ({ icon: signal.icon, label: signal.label })),
    ...v2.marquee.items.map((label) => ({ icon: null, label })),
  ];

  return (
    <section
      id="trust"
      className="v2-marquee relative overflow-hidden border-y border-border/60 bg-background/40 py-6"
    >
      <div className="v2-mask-x flex w-full overflow-hidden">
        {/* Two identical tracks make the -50% translation loop seamlessly. */}
        <div className="v2-marquee-track flex shrink-0 items-center gap-3 pr-3">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center gap-3 pr-3" aria-hidden={copy === 1}>
              {items.map((item, index) => (
                <span
                  key={`${copy}-${item.label}-${index}`}
                  className="v2-glass inline-flex shrink-0 items-center gap-2 rounded-full border border-border/60 px-5 py-2.5 text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
                >
                  {item.icon ? (
                    <item.icon className="h-4 w-4 text-primary" />
                  ) : (
                    <span className="h-1.5 w-1.5 rounded-full bg-primary/70" />
                  )}
                  <span className="whitespace-nowrap font-medium">{item.label}</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default V2Marquee;
