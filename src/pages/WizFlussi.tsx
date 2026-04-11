import Header from "@/components/landing/Header";
import HeroSection from "@/components/landing/HeroSection";
import ProblemSection from "@/components/landing/ProblemSection";
import SolutionSection from "@/components/landing/SolutionSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import SecuritySection from "@/components/landing/SecuritySection";
import AudienceSection from "@/components/landing/AudienceSection";
import TechSection from "@/components/landing/TechSection";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";
import SEOHead from "@/components/wizionar/SEOHead";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  SEO_PATHS,
  createBreadcrumbSchema,
  createSoftwareApplicationSchema,
  createWebPageSchema,
  getPageSeo,
  getSeoLabel,
} from "@/lib/seo";

const WizFlussi = () => {
  const { language } = useLanguage();
  const seo = getPageSeo("wizflussi", language);

  return (
    <div className="wizflussi-theme min-h-screen bg-background text-foreground">
      <SEOHead
        title={seo.title}
        description={seo.description}
        schema={[
          createSoftwareApplicationSchema({
            language,
            name: "WizFlussi",
            description: seo.description,
            path: SEO_PATHS.wizflussi,
            category: "BusinessApplication",
          }),
          createWebPageSchema({
            language,
            path: SEO_PATHS.wizflussi,
            title: seo.title,
            description: seo.description,
          }),
          createBreadcrumbSchema(language, [
            { name: getSeoLabel(language, "home"), path: SEO_PATHS.home },
            { name: "WizFlussi", path: SEO_PATHS.wizflussi },
          ]),
        ]}
      />
      <Header />
      <main>
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <FeaturesSection />
        <SecuritySection />
        <AudienceSection />
        <TechSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default WizFlussi;
