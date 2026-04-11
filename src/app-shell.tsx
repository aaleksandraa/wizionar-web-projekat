import { useEffect, useState, type ReactNode } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/contexts/LanguageContext";
import HreflangTags from "@/components/wizionar/HreflangTags";
import GoogleAnalytics from "@/components/wizionar/GoogleAnalytics";

const DeferredUiOverlays = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <Toaster />
      <Sonner />
    </>
  );
};

export const AppShell = ({ children }: { children: ReactNode }) => (
  <LanguageProvider>
    <HreflangTags />
    <GoogleAnalytics />
    <TooltipProvider>
      <DeferredUiOverlays />
      {children}
    </TooltipProvider>
  </LanguageProvider>
);
