import { useEffect } from "react";
import WizionarHeader from "@/components/wizionar/WizionarHeader";
import WizionarFooter from "@/components/wizionar/WizionarFooter";
import SEOHead from "@/components/wizionar/SEOHead";
import V2Hero from "@/components/wizionar/v2/V2Hero";
import V2Marquee from "@/components/wizionar/v2/V2Marquee";
import V2Value from "@/components/wizionar/v2/V2Value";
import V2Impact from "@/components/wizionar/v2/V2Impact";
import V2Products from "@/components/wizionar/v2/V2Products";
import V2Process from "@/components/wizionar/v2/V2Process";
import V2Security from "@/components/wizionar/v2/V2Security";
import V2Audience from "@/components/wizionar/v2/V2Audience";
import V2CTA from "@/components/wizionar/v2/V2CTA";
import { useLanguage } from "@/contexts/LanguageContext";
import { getPageSeo } from "@/lib/seo";

/**
 * Homepage v2 — a darker, more futuristic take on the landing page.
 * Runs on its own route so v1 stays untouched while the two are compared.
 * Kept out of the sitemap and marked noindex to avoid duplicate content.
 */
const IndexV2 = () => {
  const { language } = useLanguage();
  const seo = getPageSeo("home", language);

  // The v2 palette is dark; paint the document background to match so
  // overscroll and the mobile browser chrome do not flash white.
  useEffect(() => {
    const root = document.documentElement;
    const previousBackground = root.style.backgroundColor;
    const previousColorScheme = root.style.colorScheme;

    root.style.backgroundColor = "hsl(240, 16%, 4%)";
    root.style.colorScheme = "dark";

    return () => {
      root.style.backgroundColor = previousBackground;
      root.style.colorScheme = previousColorScheme;
    };
  }, []);

  return (
    <>
      <SEOHead title={`${seo.title} · v2`} description={seo.description} keywords={seo.keywords} noIndex />

      <div className="wizionar-v2-theme min-h-screen bg-background text-foreground">
        <WizionarHeader logo="light" />
        <main>
          <V2Hero />
          <V2Marquee />
          <V2Value />
          <V2Impact />
          <V2Products />
          <V2Process />
          <V2Security />
          <V2Audience />
          <V2CTA />
        </main>
        <WizionarFooter logo="light" />
      </div>
    </>
  );
};

export default IndexV2;
