import WizionarHeader from "@/components/wizionar/WizionarHeader";
import WizionarHero from "@/components/wizionar/WizionarHero";
import TrustSignals from "@/components/wizionar/TrustSignals";
import WhatWeDo from "@/components/wizionar/WhatWeDo";
import ProductsSection from "@/components/wizionar/ProductsSection";
import ProcessSection from "@/components/wizionar/ProcessSection";
import SecurityTrust from "@/components/wizionar/SecurityTrust";
import ForWhoSection from "@/components/wizionar/ForWhoSection";
import ContactSection from "@/components/wizionar/ContactSection";
import WizionarFooter from "@/components/wizionar/WizionarFooter";
import SEOHead from "@/components/wizionar/SEOHead";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  SEO_PATHS,
  createOrganizationSchema,
  createWebPageSchema,
  createWebsiteSchema,
  getPageSeo,
} from "@/lib/seo";

const Index = () => {
  const { language } = useLanguage();
  const seo = getPageSeo("home", language);

  return (
    <>
      <SEOHead
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        schema={[
          createOrganizationSchema(),
          createWebsiteSchema(language),
          createWebPageSchema({
            language,
            path: SEO_PATHS.home,
            title: seo.title,
            description: seo.description,
          }),
        ]}
      />
      <div className="min-h-screen bg-background text-foreground">
        <WizionarHeader />
        <main>
          <WizionarHero />
          <TrustSignals />
          <WhatWeDo />
          <ProductsSection />
          <ProcessSection />
          <SecurityTrust />
          <ForWhoSection />
          <ContactSection />
        </main>
        <WizionarFooter />
      </div>
    </>
  );
};

export default Index;
