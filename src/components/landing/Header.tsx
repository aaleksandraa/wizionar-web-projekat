import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import LocalizedLink from "@/components/LocalizedLink";
import LanguageSwitcher from "@/components/wizionar/LanguageSwitcher";
import { useWizflussiTranslations } from "@/hooks/useWizflussiTranslations";

const Header = () => {
  const t = useWizflussiTranslations();

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-wf-border bg-wf-background/80 backdrop-blur-xl"
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <LocalizedLink to="/wizflussi" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald flex items-center justify-center">
            <span className="text-wf-background font-bold text-lg">W</span>
          </div>
          <span className="text-xl font-bold text-wf-foreground">WizFlussi</span>
        </LocalizedLink>

        <nav className="hidden md:flex items-center gap-8">
          <a href="#problem" className="text-sm text-wf-muted-foreground hover:text-wf-foreground transition-colors">
            {t.header.problem}
          </a>
          <a href="#solution" className="text-sm text-wf-muted-foreground hover:text-wf-foreground transition-colors">
            {t.header.solution}
          </a>
          <a href="#features" className="text-sm text-wf-muted-foreground hover:text-wf-foreground transition-colors">
            {t.header.features}
          </a>
          <a href="#security" className="text-sm text-wf-muted-foreground hover:text-wf-foreground transition-colors">
            {t.header.security}
          </a>
          <a href="#audience" className="text-sm text-wf-muted-foreground hover:text-wf-foreground transition-colors">
            {t.header.audience}
          </a>
          <LocalizedLink to="/" className="text-sm text-emerald hover:text-emerald-glow transition-colors">
            {t.header.backToWizionar}
          </LocalizedLink>
        </nav>

        <LanguageSwitcher />
      </div>
    </motion.header>
  );
};

export default Header;

