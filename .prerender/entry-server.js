var _a;
import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server.mjs";
import { Route, Routes, useNavigate, useLocation, Link, useParams, Navigate } from "react-router-dom";
import * as React from "react";
import { createContext, useContext, useState, useEffect, useCallback, useMemo, lazy, forwardRef } from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { cva } from "class-variance-authority";
import { X, ArrowUpRight, Menu, ChevronRight, Mail, Facebook, Instagram, Phone, ArrowRight, Play, Briefcase, Database, Zap, Shield, FileDown, Layers, Eye, TrendingUp, CreditCard, Stethoscope, Wallet, Building2, Scissors, MessageCircle, Cat, Search, Monitor, Settings, TestTube, Rocket, FileCheck, Lock, Activity, CheckCircle, Calculator, Package, Palette, Handshake, BarChart3, Clock, FileSpreadsheet, AlertTriangle, CheckCircle2, LayoutDashboard, Users, CalendarClock, Globe, ShieldCheck, UserCheck, Key, Factory, Truck, Server, Gauge, Tag, FileText, DollarSign, Calendar, MapPin, FlaskConical, Heart, Home, MessageCircleQuestion, Star, Bell, Sparkles, Plug, ShoppingCart, MessageSquare, Smartphone, PenTool, Headphones, ChevronDown, Target, Link2, ClipboardList, Code2, Languages, Wrench, Image, LayoutGrid, Filter, ExternalLink, Share2, BookOpen, ChevronLeft, Check, ArrowLeft, Loader2 } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { useTheme } from "next-themes";
import { Toaster as Toaster$2 } from "sonner";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { Slot } from "@radix-ui/react-slot";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import useEmblaCarousel from "embla-carousel-react";
const identity = (page) => page;
const AppRoutes = ({
  pages: pages2,
  wrapPage = identity
}) => {
  const routeElements = /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Route, { index: true, element: wrapPage(/* @__PURE__ */ jsx(pages2.Index, {})) }),
    /* @__PURE__ */ jsx(Route, { path: "wizflussi", element: wrapPage(/* @__PURE__ */ jsx(pages2.WizFlussi, {})) }),
    /* @__PURE__ */ jsx(Route, { path: "wizmedik-reports", element: wrapPage(/* @__PURE__ */ jsx(pages2.WizMedikReports, {})) }),
    /* @__PURE__ */ jsx(Route, { path: "wizmedik", element: wrapPage(/* @__PURE__ */ jsx(pages2.WizMedik, {})) }),
    /* @__PURE__ */ jsx(Route, { path: "frizerino", element: wrapPage(/* @__PURE__ */ jsx(pages2.Frizerino, {})) }),
    /* @__PURE__ */ jsx(Route, { path: "chatko", element: wrapPage(/* @__PURE__ */ jsx(pages2.Chatko, {})) }),
    /* @__PURE__ */ jsx(Route, { path: "usluge", element: wrapPage(/* @__PURE__ */ jsx(pages2.Usluge, {})) }),
    /* @__PURE__ */ jsx(Route, { path: "usluge/izrada-web-stranica", element: wrapPage(/* @__PURE__ */ jsx(pages2.WebDevelopment, {})) }),
    /* @__PURE__ */ jsx(Route, { path: "usluge/seo-optimizacija", element: wrapPage(/* @__PURE__ */ jsx(pages2.SEOOptimizacija, {})) }),
    /* @__PURE__ */ jsx(Route, { path: "usluge/graficki-dizajn", element: wrapPage(/* @__PURE__ */ jsx(pages2.GrafickiDizajn, {})) }),
    /* @__PURE__ */ jsx(Route, { path: "projektni-upitnik", element: wrapPage(/* @__PURE__ */ jsx(pages2.ProjectInquiry, {})) }),
    /* @__PURE__ */ jsx(Route, { path: "project-inquiry", element: wrapPage(/* @__PURE__ */ jsx(pages2.ProjectInquiry, {})) }),
    /* @__PURE__ */ jsx(Route, { path: "portfolio/:slug", element: wrapPage(/* @__PURE__ */ jsx(pages2.ProjectDetail, {})) }),
    /* @__PURE__ */ jsx(Route, { path: "*", element: wrapPage(/* @__PURE__ */ jsx(pages2.NotFound, {})) })
  ] });
  return /* @__PURE__ */ jsxs(Routes, { children: [
    /* @__PURE__ */ jsx(Route, { path: "/en/*", children: /* @__PURE__ */ jsx(Route, { children: routeElements }) }),
    /* @__PURE__ */ jsx(Route, { path: "/de/*", children: /* @__PURE__ */ jsx(Route, { children: routeElements }) }),
    /* @__PURE__ */ jsx(Route, { path: "/it/*", children: /* @__PURE__ */ jsx(Route, { children: routeElements }) }),
    /* @__PURE__ */ jsx(Route, { path: "/*", children: /* @__PURE__ */ jsx(Route, { children: routeElements }) })
  ] });
};
const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 1e6;
let count = 0;
function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}
const toastTimeouts = /* @__PURE__ */ new Map();
const addToRemoveQueue = (toastId) => {
  if (toastTimeouts.has(toastId)) {
    return;
  }
  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({
      type: "REMOVE_TOAST",
      toastId
    });
  }, TOAST_REMOVE_DELAY);
  toastTimeouts.set(toastId, timeout);
};
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT)
      };
    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) => t.id === action.toast.id ? { ...t, ...action.toast } : t)
      };
    case "DISMISS_TOAST": {
      const { toastId } = action;
      if (toastId) {
        addToRemoveQueue(toastId);
      } else {
        state.toasts.forEach((toast2) => {
          addToRemoveQueue(toast2.id);
        });
      }
      return {
        ...state,
        toasts: state.toasts.map(
          (t) => t.id === toastId || toastId === void 0 ? {
            ...t,
            open: false
          } : t
        )
      };
    }
    case "REMOVE_TOAST":
      if (action.toastId === void 0) {
        return {
          ...state,
          toasts: []
        };
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId)
      };
  }
};
const listeners = [];
let memoryState = { toasts: [] };
function dispatch(action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => {
    listener(memoryState);
  });
}
function toast({ ...props }) {
  const id = genId();
  const update = (props2) => dispatch({
    type: "UPDATE_TOAST",
    toast: { ...props2, id }
  });
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id });
  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss();
      }
    }
  });
  return {
    id,
    dismiss,
    update
  };
}
function useToast() {
  const [state, setState] = React.useState(memoryState);
  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]);
  return {
    ...state,
    toast,
    dismiss: (toastId) => dispatch({ type: "DISMISS_TOAST", toastId })
  };
}
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const ToastProvider = ToastPrimitives.Provider;
const ToastViewport = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Viewport,
  {
    ref,
    className: cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      className
    ),
    ...props
  }
));
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;
const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "border bg-background text-foreground",
        destructive: "destructive group border-destructive bg-destructive text-destructive-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
const Toast = React.forwardRef(({ className, variant, ...props }, ref) => {
  return /* @__PURE__ */ jsx(ToastPrimitives.Root, { ref, className: cn(toastVariants({ variant }), className), ...props });
});
Toast.displayName = ToastPrimitives.Root.displayName;
const ToastAction = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Action,
  {
    ref,
    className: cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors group-[.destructive]:border-muted/40 hover:bg-secondary group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 group-[.destructive]:focus:ring-destructive disabled:pointer-events-none disabled:opacity-50",
      className
    ),
    ...props
  }
));
ToastAction.displayName = ToastPrimitives.Action.displayName;
const ToastClose = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Close,
  {
    ref,
    className: cn(
      "absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity group-hover:opacity-100 group-[.destructive]:text-red-300 hover:text-foreground group-[.destructive]:hover:text-red-50 focus:opacity-100 focus:outline-none focus:ring-2 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
      className
    ),
    "toast-close": "",
    ...props,
    children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" })
  }
));
ToastClose.displayName = ToastPrimitives.Close.displayName;
const ToastTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(ToastPrimitives.Title, { ref, className: cn("text-sm font-semibold", className), ...props }));
ToastTitle.displayName = ToastPrimitives.Title.displayName;
const ToastDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(ToastPrimitives.Description, { ref, className: cn("text-sm opacity-90", className), ...props }));
ToastDescription.displayName = ToastPrimitives.Description.displayName;
function Toaster$1() {
  const { toasts } = useToast();
  return /* @__PURE__ */ jsxs(ToastProvider, { children: [
    toasts.map(function({ id, title, description, action, ...props }) {
      return /* @__PURE__ */ jsxs(Toast, { ...props, children: [
        /* @__PURE__ */ jsxs("div", { className: "grid gap-1", children: [
          title && /* @__PURE__ */ jsx(ToastTitle, { children: title }),
          description && /* @__PURE__ */ jsx(ToastDescription, { children: description })
        ] }),
        action,
        /* @__PURE__ */ jsx(ToastClose, {})
      ] }, id);
    }),
    /* @__PURE__ */ jsx(ToastViewport, {})
  ] });
}
const Toaster = ({ ...props }) => {
  const { theme = "system" } = useTheme();
  return /* @__PURE__ */ jsx(
    Toaster$2,
    {
      theme,
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};
const TooltipProvider = TooltipPrimitive.Provider;
const TooltipContent = React.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(
  TooltipPrimitive.Content,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;
const translations = {
  sr: {
    // Header
    nav: {
      products: "Proizvodi",
      services: "Usluge",
      process: "Proces",
      security: "Sigurnost",
      contact: "Kontakt",
      requestDemo: "Popuni upitnik"
    },
    // Hero
    hero: {
      badge: "Product studio za B2B aplikacije",
      title1: "Poslovne aplikacije koje",
      titleHighlight: "automatizuju procese",
      title2: "i uvode kontrolu.",
      subtitle: "Gradimo specijalizovane B2B sisteme za finansije, zdravstvo i uslužne djelatnosti – od evidencije i planiranja do potpune automatizacije i izvještavanja.",
      cta1: "Zatraži demo",
      cta2: "Projekti",
      cta3: "Usluge",
      microcopy: "Odgovaramo u roku 24h · Demo bez obaveze · Besplatna konsultacija",
      stats: {
        projects: "Aktivni projekti",
        clients: "Klijenti",
        automations: "Automatizacije",
        savings: "Ušteda (h/mj)"
      }
    },
    // Trust signals
    trust: {
      centralization: "Centralizacija podataka",
      automation: "Automatizacija",
      rbac: "RBAC & Audit",
      export: "Export (Excel/PDF)",
      modular: "Modularno"
    },
    // What we do
    whatWeDo: {
      label: "Šta radimo",
      title1: "Manje haosa,",
      title2: "više kontrole.",
      description: "U većini firmi ključni procesi i dalje zavise od Excel tabela, mailova i ručnog praćenja. Wizionar proizvodi uvode red: centralizuju podatke, automatizuju ponavljajuće korake i omogućavaju jasan pregled obaveza, termina i izvještaja.",
      link: "Pogledaj naše proizvode",
      features: {
        automation: {
          title: "Automatizacija",
          description: "Smanjujemo ručni unos i greške. Ponavljajući zadaci se izvršavaju automatski."
        },
        control: {
          title: "Kontrola",
          description: "Uvodi se pregled stanja i odgovornosti. Svaka akcija je zabilježena."
        },
        scalability: {
          title: "Skalabilnost",
          description: "Rješenja rastu kako raste firma. Od stotina do miliona transakcija."
        }
      }
    },
    // Products
    products: {
      label: "Proizvodi",
      title: "Wizionar ekosistem",
      subtitle: "Svaki proizvod rješava specifične probleme u svom domenu – bez generičkih rješenja.",
      available: "Dostupno",
      soon: "Uskoro",
      interested: "Zainteresovan",
      learnMore: "Saznaj više",
      demo: "Demo",
      contactUs: "Za više detalja pišite nam",
      items: {
        wizflussi: {
          tagline: "Upravljanje plaćanjima dobavljačima",
          description: "Centralizuje plaćanja dobavljačima: rokovi, statusi, valute, planovi plaćanja i izvještaji – sve na jednom mjestu.",
          features: ["Multi-valuta", "RBAC + Audit", "Automatski podsjetnici"]
        },
        wizfin: {
          tagline: "Finansijska evidencija i izvještaji",
          description: "Sistem za internu finansijsku evidenciju – prihodi, rashodi, fakture i izvještaji bez Excel improvizacija.",
          features: ["Pregled po periodima", "Brza pretraga", "Export za računovodstvo"]
        },
        wizbank: {
          tagline: "Automatizacija bankovnih izvoda",
          description: "Automatizuje preuzimanje i obradu bankovnih izvoda, sortira i priprema za dalju obradu.",
          features: ["Auto-preuzimanje", "Klasifikacija", "Manje grešaka"]
        },
        wizmedik: {
          tagline: "Platforma za zdravstvene ustanove",
          description: "Organizuje podatke o ustanovama, uslugama i lokacijama za digitalno zakazivanje.",
          features: ["Lokacije", "Specijalizacije", "CRM ready"]
        },
        frizerino: {
          tagline: "Rezervacije za salone",
          description: "Alat za salone koji žele uredno zakazivanje i manje propuštenih termina.",
          features: ["Online rezervacije", "Podsjetnici", "Upravljanje timom"]
        },
        wizvet: {
          tagline: "Sistem za veterinarske ambulante",
          description: "Digitalizuje rad veterinarskih ambulanti: kartoni, pregledi, terapije i istorija.",
          features: ["Kartoni pacijenata", "Terapije", "Izvještaji"]
        },
        chatko: {
          tagline: "AI asistent za vaš web shop",
          description: "Chatko je AI chat asistent koji se integriše na vaš web sajt. Povežite ga sa proizvodima, detaljima dostave, plaćanja i prilagodite odgovore – sve automatski.",
          features: ["Integracija sa shopom", "Prilagodljivi odgovori", "24/7 podrška"]
        }
      }
    },
    // Process
    process: {
      label: "Proces",
      title: "Od demo-a do produkcije",
      subtitle: "Transparentan proces. Znate šta očekivati u svakoj fazi.",
      steps: {
        discovery: { title: "Discovery", description: "Kratki poziv – mapiramo procese i ciljeve." },
        demo: { title: "Demo", description: "Prezentacija i identifikacija modula." },
        setup: { title: "Setup", description: "Implementacija i migracija podataka." },
        testing: { title: "Testiranje", description: "Sigurnost, role i user acceptance." },
        golive: { title: "Go-live", description: "Produkcija, obuka i podrška." }
      }
    },
    // Security
    security: {
      label: "Sigurnost",
      title: "Sigurnost kao standard.",
      subtitle: "Svaki proizvod gradi se sa sigurnošću kao osnovnim principom.",
      features: {
        rbac: "Role-based access control (RBAC)",
        audit: "Audit trail – ko, kada, šta",
        protection: "Validacija i zaštita od napada",
        backup: "Backup i monitoring",
        gdpr: "GDPR-friendly pristup",
        encryption: "Enkripcija podataka"
      }
    },
    // For who
    forWho: {
      label: "Za koga",
      title: "Kome donosimo vrijednost",
      subtitle: "Naši proizvodi su za organizacije koje trebaju više od generičkih alata.",
      link: "Razgovarajmo o vašim potrebama",
      audiences: {
        finance: { label: "Finansije i računovodstvo", description: "Agencije i interne službe" },
        health: { label: "Zdravstvene ustanove", description: "Klinike i poliklinike" },
        services: { label: "Uslužne djelatnosti", description: "Saloni i studiji" },
        vet: { label: "Veterinarske ambulante", description: "Ambulante i klinike" },
        companies: { label: "Srednje i velike kompanije", description: "50+ zaposlenih" }
      }
    },
    // Contact
    contact: {
      title: "Razgovarajmo o vašem projektu",
      subtitle: "Bez obzira da li vam treba softversko rješenje, web stranica, SEO optimizacija ili grafički dizajn — tu smo da pomognemo.",
      emailLabel: "Pišite nam direktno",
      email: "info@wizionar.com",
      phoneLabel: "Pozovite nas ili pišite na WhatsApp",
      phone: "+387 66 882 702",
      categories: {
        products: "Proizvodi & softver",
        productsDesc: "Pitanja o WizFlussi, WizMedik, Chatko i drugim rješenjima",
        services: "Usluge & saradnja",
        servicesDesc: "Web development, SEO, grafički dizajn, digitalni marketing",
        partnership: "Partnerstvo",
        partnershipDesc: "Dugoročna saradnja, white-label ili integracije"
      },
      cta: "Opišite nam svoj projekat ili ideju — odgovaramo u roku od 24h."
    },
    // Footer
    footer: {
      description: "Product studio koji gradi specijalizovane B2B aplikacije za automatizaciju poslovnih procesa u finansijama, zdravstvu i uslužnim djelatnostima.",
      products: "Proizvodi",
      links: "Linkovi",
      contact: "Kontakt",
      privacy: "Privatnost",
      privacyPolicy: "Politika privatnosti",
      copyright: "© 2026 Wizionar · Step forward.",
      soon: "uskoro"
    }
  },
  en: {
    nav: {
      products: "Products",
      services: "Services",
      process: "Process",
      security: "Security",
      contact: "Contact",
      requestDemo: "Start inquiry"
    },
    hero: {
      badge: "Product studio for B2B applications",
      title1: "Business applications that",
      titleHighlight: "automate processes",
      title2: "and introduce control.",
      subtitle: "We build specialized B2B systems for finance, healthcare and service industries – from records and planning to full automation and reporting.",
      cta1: "Request demo",
      cta2: "Projects",
      cta3: "Services",
      microcopy: "We respond within 24h · No-obligation demo · Free consultation",
      stats: {
        projects: "Active projects",
        clients: "Clients",
        automations: "Automations",
        savings: "Savings (h/mo)"
      }
    },
    trust: {
      centralization: "Data centralization",
      automation: "Automation",
      rbac: "RBAC & Audit",
      export: "Export (Excel/PDF)",
      modular: "Modular"
    },
    whatWeDo: {
      label: "What we do",
      title1: "Less chaos,",
      title2: "more control.",
      description: "In most companies, key processes still depend on Excel spreadsheets, emails and manual tracking. Wizionar products bring order: they centralize data, automate repetitive steps and provide a clear overview of obligations, deadlines and reports.",
      link: "View our products",
      features: {
        automation: {
          title: "Automation",
          description: "We reduce manual input and errors. Repetitive tasks are executed automatically."
        },
        control: {
          title: "Control",
          description: "Status overview and accountability are introduced. Every action is logged."
        },
        scalability: {
          title: "Scalability",
          description: "Solutions grow as the company grows. From hundreds to millions of transactions."
        }
      }
    },
    products: {
      label: "Products",
      title: "Wizionar ecosystem",
      subtitle: "Each product solves specific problems in its domain – no generic solutions.",
      available: "Available",
      soon: "Coming soon",
      interested: "Interested",
      learnMore: "Learn more",
      demo: "Demo",
      contactUs: "For more details, write to us",
      items: {
        wizflussi: {
          tagline: "Supplier payment management",
          description: "Centralizes supplier payments: deadlines, statuses, currencies, payment plans and reports – all in one place.",
          features: ["Multi-currency", "RBAC + Audit", "Auto reminders"]
        },
        wizfin: {
          tagline: "Financial records and reports",
          description: "System for internal financial records – income, expenses, invoices and reports without Excel improvisation.",
          features: ["Period overview", "Quick search", "Accounting export"]
        },
        wizbank: {
          tagline: "Bank statement automation",
          description: "Automates downloading and processing of bank statements, sorts and prepares for further processing.",
          features: ["Auto-download", "Classification", "Fewer errors"]
        },
        wizmedik: {
          tagline: "Healthcare platform",
          description: "Organizes data about facilities, services and locations for digital scheduling.",
          features: ["Locations", "Specializations", "CRM ready"]
        },
        frizerino: {
          tagline: "Salon reservations",
          description: "Tool for salons that want organized scheduling and fewer missed appointments.",
          features: ["Online reservations", "Reminders", "Team management"]
        },
        wizvet: {
          tagline: "Veterinary clinic system",
          description: "Digitalizes veterinary clinic work: records, exams, therapies and history.",
          features: ["Patient records", "Therapies", "Reports"]
        },
        chatko: {
          tagline: "AI assistant for your web shop",
          description: "Chatko is an AI chat assistant that integrates into your website. Connect it with products, delivery details, payments and customize responses – all automatically.",
          features: ["Shop integration", "Custom responses", "24/7 support"]
        }
      }
    },
    process: {
      label: "Process",
      title: "From demo to production",
      subtitle: "Transparent process. You know what to expect at each stage.",
      steps: {
        discovery: { title: "Discovery", description: "Short call – we map processes and goals." },
        demo: { title: "Demo", description: "Presentation and module identification." },
        setup: { title: "Setup", description: "Implementation and data migration." },
        testing: { title: "Testing", description: "Security, roles and user acceptance." },
        golive: { title: "Go-live", description: "Production, training and support." }
      }
    },
    security: {
      label: "Security",
      title: "Security as standard.",
      subtitle: "Every product is built with security as a core principle.",
      features: {
        rbac: "Role-based access control (RBAC)",
        audit: "Audit trail – who, when, what",
        protection: "Validation and attack protection",
        backup: "Backup and monitoring",
        gdpr: "GDPR-friendly approach",
        encryption: "Data encryption"
      }
    },
    forWho: {
      label: "For whom",
      title: "Who we bring value to",
      subtitle: "Our products are for organizations that need more than generic tools.",
      link: "Let's discuss your needs",
      audiences: {
        finance: { label: "Finance and accounting", description: "Agencies and internal departments" },
        health: { label: "Healthcare facilities", description: "Clinics and polyclinics" },
        services: { label: "Service industries", description: "Salons and studios" },
        vet: { label: "Veterinary clinics", description: "Clinics and hospitals" },
        companies: { label: "Medium and large companies", description: "50+ employees" }
      }
    },
    contact: {
      title: "Let's talk about your project",
      subtitle: "Whether you need a software solution, website, SEO optimization, or graphic design — we're here to help.",
      emailLabel: "Write to us directly",
      email: "info@wizionar.com",
      phoneLabel: "Call us or message on WhatsApp",
      phone: "+387 66 882 702",
      categories: {
        products: "Products & software",
        productsDesc: "Questions about WizFlussi, WizMedik, Chatko and other solutions",
        services: "Services & collaboration",
        servicesDesc: "Web development, SEO, graphic design, digital marketing",
        partnership: "Partnership",
        partnershipDesc: "Long-term collaboration, white-label or integrations"
      },
      cta: "Describe your project or idea — we respond within 24h."
    },
    footer: {
      description: "Product studio building specialized B2B applications for business process automation in finance, healthcare and service industries.",
      products: "Products",
      links: "Links",
      contact: "Contact",
      privacy: "Privacy",
      privacyPolicy: "Privacy Policy",
      copyright: "© 2026 Wizionar · Step forward.",
      soon: "coming soon"
    }
  },
  de: {
    nav: {
      products: "Produkte",
      services: "Dienstleistungen",
      process: "Prozess",
      security: "Sicherheit",
      contact: "Kontakt",
      requestDemo: "Fragebogen starten"
    },
    hero: {
      badge: "Product Studio für B2B-Anwendungen",
      title1: "Geschäftsanwendungen, die",
      titleHighlight: "Prozesse automatisieren",
      title2: "und Kontrolle einführen.",
      subtitle: "Wir entwickeln spezialisierte B2B-Systeme für Finanzen, Gesundheitswesen und Dienstleistungsbranchen – von Aufzeichnungen und Planung bis zur vollständigen Automatisierung und Berichterstattung.",
      cta1: "Demo anfordern",
      cta2: "Projekte",
      cta3: "Dienstleistungen",
      microcopy: "Antwort innerhalb 24h · Unverbindliche Demo · Kostenlose Beratung",
      stats: {
        projects: "Aktive Projekte",
        clients: "Kunden",
        automations: "Automatisierungen",
        savings: "Ersparnis (Std/Mo)"
      }
    },
    trust: {
      centralization: "Datenzentralisierung",
      automation: "Automatisierung",
      rbac: "RBAC & Audit",
      export: "Export (Excel/PDF)",
      modular: "Modular"
    },
    whatWeDo: {
      label: "Was wir tun",
      title1: "Weniger Chaos,",
      title2: "mehr Kontrolle.",
      description: "In den meisten Unternehmen hängen Schlüsselprozesse immer noch von Excel-Tabellen, E-Mails und manueller Nachverfolgung ab. Wizionar-Produkte bringen Ordnung: Sie zentralisieren Daten, automatisieren sich wiederholende Schritte und bieten einen klaren Überblick über Verpflichtungen, Fristen und Berichte.",
      link: "Unsere Produkte ansehen",
      features: {
        automation: {
          title: "Automatisierung",
          description: "Wir reduzieren manuelle Eingaben und Fehler. Sich wiederholende Aufgaben werden automatisch ausgeführt."
        },
        control: {
          title: "Kontrolle",
          description: "Statusübersicht und Verantwortlichkeit werden eingeführt. Jede Aktion wird protokolliert."
        },
        scalability: {
          title: "Skalierbarkeit",
          description: "Lösungen wachsen mit dem Unternehmen. Von Hunderten zu Millionen von Transaktionen."
        }
      }
    },
    products: {
      label: "Produkte",
      title: "Wizionar Ökosystem",
      subtitle: "Jedes Produkt löst spezifische Probleme in seinem Bereich – keine generischen Lösungen.",
      available: "Verfügbar",
      soon: "Demnächst",
      interested: "Interessiert",
      learnMore: "Mehr erfahren",
      demo: "Demo",
      contactUs: "Für weitere Details schreiben Sie uns",
      items: {
        wizflussi: {
          tagline: "Lieferantenzahlungsverwaltung",
          description: "Zentralisiert Lieferantenzahlungen: Fristen, Status, Währungen, Zahlungspläne und Berichte – alles an einem Ort.",
          features: ["Multi-Währung", "RBAC + Audit", "Auto-Erinnerungen"]
        },
        wizfin: {
          tagline: "Finanzaufzeichnungen und Berichte",
          description: "System für interne Finanzaufzeichnungen – Einnahmen, Ausgaben, Rechnungen und Berichte ohne Excel-Improvisation.",
          features: ["Periodenübersicht", "Schnellsuche", "Buchhaltungsexport"]
        },
        wizbank: {
          tagline: "Kontoauszug-Automatisierung",
          description: "Automatisiert das Herunterladen und Verarbeiten von Kontoauszügen, sortiert und bereitet für weitere Verarbeitung vor.",
          features: ["Auto-Download", "Klassifizierung", "Weniger Fehler"]
        },
        wizmedik: {
          tagline: "Gesundheitsplattform",
          description: "Organisiert Daten über Einrichtungen, Dienste und Standorte für digitale Terminplanung.",
          features: ["Standorte", "Spezialisierungen", "CRM bereit"]
        },
        frizerino: {
          tagline: "Salonreservierungen",
          description: "Tool für Salons, die organisierte Terminplanung und weniger verpasste Termine wünschen.",
          features: ["Online-Reservierungen", "Erinnerungen", "Teamverwaltung"]
        },
        wizvet: {
          tagline: "Veterinärklinik-System",
          description: "Digitalisiert die Arbeit in Veterinärkliniken: Akten, Untersuchungen, Therapien und Verlauf.",
          features: ["Patientenakten", "Therapien", "Berichte"]
        },
        chatko: {
          tagline: "KI-Assistent für Ihren Webshop",
          description: "Chatko ist ein KI-Chat-Assistent, der sich in Ihre Website integriert. Verbinden Sie ihn mit Produkten, Lieferdetails, Zahlungen und passen Sie Antworten an – alles automatisch.",
          features: ["Shop-Integration", "Anpassbare Antworten", "24/7 Support"]
        }
      }
    },
    process: {
      label: "Prozess",
      title: "Von der Demo zur Produktion",
      subtitle: "Transparenter Prozess. Sie wissen, was Sie in jeder Phase erwartet.",
      steps: {
        discovery: { title: "Entdeckung", description: "Kurzer Anruf – wir kartieren Prozesse und Ziele." },
        demo: { title: "Demo", description: "Präsentation und Modulidentifikation." },
        setup: { title: "Einrichtung", description: "Implementierung und Datenmigration." },
        testing: { title: "Testen", description: "Sicherheit, Rollen und Benutzerakzeptanz." },
        golive: { title: "Go-live", description: "Produktion, Schulung und Support." }
      }
    },
    security: {
      label: "Sicherheit",
      title: "Sicherheit als Standard.",
      subtitle: "Jedes Produkt wird mit Sicherheit als Kernprinzip entwickelt.",
      features: {
        rbac: "Rollenbasierte Zugriffskontrolle (RBAC)",
        audit: "Audit-Trail – wer, wann, was",
        protection: "Validierung und Angriffsschutz",
        backup: "Backup und Überwachung",
        gdpr: "DSGVO-konformer Ansatz",
        encryption: "Datenverschlüsselung"
      }
    },
    forWho: {
      label: "Für wen",
      title: "Wem wir Mehrwert bieten",
      subtitle: "Unsere Produkte sind für Organisationen, die mehr als generische Tools benötigen.",
      link: "Lassen Sie uns über Ihre Bedürfnisse sprechen",
      audiences: {
        finance: { label: "Finanzen und Buchhaltung", description: "Agenturen und interne Abteilungen" },
        health: { label: "Gesundheitseinrichtungen", description: "Kliniken und Polikliniken" },
        services: { label: "Dienstleistungsbranchen", description: "Salons und Studios" },
        vet: { label: "Veterinärkliniken", description: "Kliniken und Krankenhäuser" },
        companies: { label: "Mittlere und große Unternehmen", description: "50+ Mitarbeiter" }
      }
    },
    contact: {
      title: "Lassen Sie uns über Ihr Projekt sprechen",
      subtitle: "Ob Sie eine Softwarelösung, Website, SEO-Optimierung oder Grafikdesign benötigen — wir sind für Sie da.",
      emailLabel: "Schreiben Sie uns direkt",
      email: "info@wizionar.com",
      phoneLabel: "Rufen Sie uns an oder schreiben Sie auf WhatsApp",
      phone: "+387 66 882 702",
      categories: {
        products: "Produkte & Software",
        productsDesc: "Fragen zu WizFlussi, WizMedik, Chatko und anderen Lösungen",
        services: "Dienstleistungen & Zusammenarbeit",
        servicesDesc: "Webentwicklung, SEO, Grafikdesign, digitales Marketing",
        partnership: "Partnerschaft",
        partnershipDesc: "Langfristige Zusammenarbeit, White-Label oder Integrationen"
      },
      cta: "Beschreiben Sie Ihr Projekt oder Ihre Idee — wir antworten innerhalb von 24 Stunden."
    },
    footer: {
      description: "Product Studio, das spezialisierte B2B-Anwendungen für die Automatisierung von Geschäftsprozessen in Finanzen, Gesundheitswesen und Dienstleistungsbranchen entwickelt.",
      products: "Produkte",
      links: "Links",
      contact: "Kontakt",
      privacy: "Datenschutz",
      privacyPolicy: "Datenschutzerklärung",
      copyright: "© 2026 Wizionar · Step forward.",
      soon: "demnächst"
    }
  },
  it: {
    nav: {
      products: "Prodotti",
      services: "Servizi",
      process: "Processo",
      security: "Sicurezza",
      contact: "Contatto",
      requestDemo: "Apri questionario"
    },
    hero: {
      badge: "Product studio per applicazioni B2B",
      title1: "Applicazioni aziendali che",
      titleHighlight: "automatizzano i processi",
      title2: "e introducono il controllo.",
      subtitle: "Costruiamo sistemi B2B specializzati per finanza, sanità e servizi – dalla registrazione e pianificazione all'automazione completa e reportistica.",
      cta1: "Richiedi demo",
      cta2: "Progetti",
      cta3: "Servizi",
      microcopy: "Rispondiamo entro 24h · Demo senza impegno · Consulenza gratuita",
      stats: {
        projects: "Progetti attivi",
        clients: "Clienti",
        automations: "Automazioni",
        savings: "Risparmio (ore/mese)"
      }
    },
    trust: {
      centralization: "Centralizzazione dati",
      automation: "Automazione",
      rbac: "RBAC & Audit",
      export: "Esportazione (Excel/PDF)",
      modular: "Modulare"
    },
    whatWeDo: {
      label: "Cosa facciamo",
      title1: "Meno caos,",
      title2: "più controllo.",
      description: "Nella maggior parte delle aziende, i processi chiave dipendono ancora da fogli Excel, email e tracciamento manuale. I prodotti Wizionar portano ordine: centralizzano i dati, automatizzano i passaggi ripetitivi e forniscono una visione chiara di obblighi, scadenze e report.",
      link: "Visualizza i nostri prodotti",
      features: {
        automation: {
          title: "Automazione",
          description: "Riduciamo l'inserimento manuale e gli errori. Le attività ripetitive vengono eseguite automaticamente."
        },
        control: {
          title: "Controllo",
          description: "Vengono introdotte panoramica dello stato e responsabilità. Ogni azione viene registrata."
        },
        scalability: {
          title: "Scalabilità",
          description: "Le soluzioni crescono con l'azienda. Da centinaia a milioni di transazioni."
        }
      }
    },
    products: {
      label: "Prodotti",
      title: "Ecosistema Wizionar",
      subtitle: "Ogni prodotto risolve problemi specifici nel suo dominio – nessuna soluzione generica.",
      available: "Disponibile",
      soon: "Prossimamente",
      interested: "Interessato",
      learnMore: "Scopri di più",
      demo: "Demo",
      contactUs: "Per maggiori dettagli scriveteci",
      items: {
        wizflussi: {
          tagline: "Gestione pagamenti fornitori",
          description: "Centralizza i pagamenti ai fornitori: scadenze, stati, valute, piani di pagamento e report – tutto in un unico posto.",
          features: ["Multi-valuta", "RBAC + Audit", "Promemoria automatici"]
        },
        wizfin: {
          tagline: "Registri finanziari e report",
          description: "Sistema per registri finanziari interni – entrate, uscite, fatture e report senza improvvisazioni Excel.",
          features: ["Panoramica periodi", "Ricerca rapida", "Export contabilità"]
        },
        wizbank: {
          tagline: "Automazione estratti conto",
          description: "Automatizza il download e l'elaborazione degli estratti conto bancari, ordina e prepara per ulteriore elaborazione.",
          features: ["Auto-download", "Classificazione", "Meno errori"]
        },
        wizmedik: {
          tagline: "Piattaforma sanitaria",
          description: "Organizza i dati su strutture, servizi e località per la programmazione digitale.",
          features: ["Località", "Specializzazioni", "CRM ready"]
        },
        frizerino: {
          tagline: "Prenotazioni per saloni",
          description: "Strumento per saloni che desiderano programmazione organizzata e meno appuntamenti persi.",
          features: ["Prenotazioni online", "Promemoria", "Gestione team"]
        },
        wizvet: {
          tagline: "Sistema cliniche veterinarie",
          description: "Digitalizza il lavoro delle cliniche veterinarie: cartelle, esami, terapie e storico.",
          features: ["Cartelle pazienti", "Terapie", "Report"]
        },
        chatko: {
          tagline: "Assistente AI per il tuo web shop",
          description: "Chatko è un assistente AI che si integra nel tuo sito web. Collegalo con prodotti, dettagli di consegna, pagamenti e personalizza le risposte – tutto automaticamente.",
          features: ["Integrazione shop", "Risposte personalizzate", "Supporto 24/7"]
        }
      }
    },
    process: {
      label: "Processo",
      title: "Dal demo alla produzione",
      subtitle: "Processo trasparente. Sapete cosa aspettarvi in ogni fase.",
      steps: {
        discovery: { title: "Scoperta", description: "Breve chiamata – mappiamo processi e obiettivi." },
        demo: { title: "Demo", description: "Presentazione e identificazione moduli." },
        setup: { title: "Setup", description: "Implementazione e migrazione dati." },
        testing: { title: "Testing", description: "Sicurezza, ruoli e accettazione utente." },
        golive: { title: "Go-live", description: "Produzione, formazione e supporto." }
      }
    },
    security: {
      label: "Sicurezza",
      title: "Sicurezza come standard.",
      subtitle: "Ogni prodotto è costruito con la sicurezza come principio fondamentale.",
      features: {
        rbac: "Controllo accesso basato su ruoli (RBAC)",
        audit: "Audit trail – chi, quando, cosa",
        protection: "Validazione e protezione dagli attacchi",
        backup: "Backup e monitoraggio",
        gdpr: "Approccio GDPR-friendly",
        encryption: "Crittografia dei dati"
      }
    },
    forWho: {
      label: "Per chi",
      title: "A chi portiamo valore",
      subtitle: "I nostri prodotti sono per organizzazioni che hanno bisogno di più di strumenti generici.",
      link: "Parliamo delle vostre esigenze",
      audiences: {
        finance: { label: "Finanza e contabilità", description: "Agenzie e dipartimenti interni" },
        health: { label: "Strutture sanitarie", description: "Cliniche e policlinici" },
        services: { label: "Settori dei servizi", description: "Saloni e studi" },
        vet: { label: "Cliniche veterinarie", description: "Cliniche e ospedali" },
        companies: { label: "Medie e grandi aziende", description: "50+ dipendenti" }
      }
    },
    contact: {
      title: "Parliamo del vostro progetto",
      subtitle: "Che abbiate bisogno di una soluzione software, sito web, ottimizzazione SEO o design grafico — siamo qui per aiutarvi.",
      emailLabel: "Scriveteci direttamente",
      email: "info@wizionar.com",
      phoneLabel: "Chiamateci o scriveteci su WhatsApp",
      phone: "+387 66 882 702",
      categories: {
        products: "Prodotti & software",
        productsDesc: "Domande su WizFlussi, WizMedik, Chatko e altre soluzioni",
        services: "Servizi & collaborazione",
        servicesDesc: "Sviluppo web, SEO, design grafico, marketing digitale",
        partnership: "Partnership",
        partnershipDesc: "Collaborazione a lungo termine, white-label o integrazioni"
      },
      cta: "Descrivete il vostro progetto o idea — rispondiamo entro 24 ore."
    },
    footer: {
      description: "Product studio che costruisce applicazioni B2B specializzate per l'automazione dei processi aziendali in finanza, sanità e settori dei servizi.",
      products: "Prodotti",
      links: "Link",
      contact: "Contatto",
      privacy: "Privacy",
      privacyPolicy: "Informativa sulla Privacy",
      copyright: "© 2026 Wizionar · Step forward.",
      soon: "prossimamente"
    }
  }
};
const NON_DEFAULT_LANGUAGES = ["en", "de", "it"];
const LANG_PREFIX_PATTERN = new RegExp("^/(?:".concat(NON_DEFAULT_LANGUAGES.join("|"), ")(?=/|$)"));
const ensureLeadingSlash = (path) => path.startsWith("/") ? path : "/".concat(path);
const splitPathSuffix = (path) => {
  const match = path.match(/^([^?#]*)(.*)$/);
  return {
    pathname: (match == null ? void 0 : match[1]) || "/",
    suffix: (match == null ? void 0 : match[2]) || ""
  };
};
const detectLanguageFromPathname = (pathname) => {
  const firstSegment = pathname.split("/")[1];
  if (firstSegment && NON_DEFAULT_LANGUAGES.includes(firstSegment)) {
    return firstSegment;
  }
  return "sr";
};
const stripAllLangPrefixes = (pathname) => {
  let normalizedPath = ensureLeadingSlash(pathname);
  while (LANG_PREFIX_PATTERN.test(normalizedPath)) {
    normalizedPath = normalizedPath.replace(LANG_PREFIX_PATTERN, "") || "/";
  }
  return normalizedPath || "/";
};
const localizePath = (path, language) => {
  if (path.startsWith("#")) return path;
  if (path.startsWith("http") || path.startsWith("mailto:") || path.startsWith("tel:")) return path;
  const { pathname, suffix } = splitPathSuffix(ensureLeadingSlash(path));
  const basePath = stripAllLangPrefixes(pathname);
  if (language === "sr") return "".concat(basePath).concat(suffix);
  if (basePath === "/") return "/".concat(language).concat(suffix);
  return "/".concat(language).concat(basePath).concat(suffix);
};
const buildLangPath = (path, language) => localizePath(path, language);
const normalizeLocalizedPathname = (pathname) => {
  const language = detectLanguageFromPathname(pathname);
  return localizePath(stripAllLangPrefixes(pathname), language);
};
const globalLanguageContext = globalThis;
const LanguageContext = (_a = globalLanguageContext.__wizionarLanguageContext__) != null ? _a : createContext(void 0);
globalLanguageContext.__wizionarLanguageContext__ = LanguageContext;
const LanguageProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const urlLanguage = detectLanguageFromPathname(location.pathname);
  const [language, setLanguageState] = useState(urlLanguage);
  useEffect(() => {
    setLanguageState(urlLanguage);
  }, [urlLanguage]);
  useEffect(() => {
    const normalizedPathname = normalizeLocalizedPathname(location.pathname);
    if (normalizedPathname !== location.pathname) {
      navigate("".concat(normalizedPathname).concat(location.search).concat(location.hash), { replace: true });
    }
  }, [location.hash, location.pathname, location.search, navigate]);
  const setLanguage = useCallback((newLang) => {
    const newPath = localizePath("".concat(location.pathname).concat(location.search).concat(location.hash), newLang);
    navigate(newPath, { replace: true });
    setLanguageState(newLang);
  }, [location.hash, location.pathname, location.search, navigate]);
  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t: translations[language]
    }),
    [language, setLanguage]
  );
  return /* @__PURE__ */ jsx(LanguageContext.Provider, { value, children });
};
const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
const BASE_URL = "https://wizionar.app";
const SITE_NAME = "Wizionar";
const DEFAULT_ROBOTS = "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";
const SUPPORTED_LANGUAGES = ["sr", "en", "de", "it"];
const LANGUAGE_SEO = {
  sr: { hreflang: "bs-BA", ogLocale: "bs_BA", htmlLang: "bs-BA" },
  en: { hreflang: "en", ogLocale: "en_US", htmlLang: "en" },
  de: { hreflang: "de-DE", ogLocale: "de_DE", htmlLang: "de-DE" },
  it: { hreflang: "it-IT", ogLocale: "it_IT", htmlLang: "it-IT" }
};
const SEO_PATHS = {
  home: "/",
  wizflussi: "/wizflussi",
  wizmedikReports: "/wizmedik-reports",
  wizmedik: "/wizmedik",
  frizerino: "/frizerino",
  chatko: "/chatko",
  usluge: "/usluge",
  webDevelopment: "/usluge/izrada-web-stranica",
  seoOptimization: "/usluge/seo-optimizacija",
  graphicDesign: "/usluge/graficki-dizajn",
  projectInquiry: "/projektni-upitnik"
};
const SEO_LABELS = {
  sr: {
    home: "Početna",
    services: "Usluge",
    webDevelopment: "Izrada web stranica",
    seo: "SEO optimizacija",
    graphicDesign: "Grafički dizajn",
    projectInquiry: "Projektni upitnik",
    portfolio: "Portfolio"
  },
  en: {
    home: "Home",
    services: "Services",
    webDevelopment: "Website Development",
    seo: "SEO Optimization",
    graphicDesign: "Graphic Design",
    projectInquiry: "Project Inquiry",
    portfolio: "Portfolio"
  },
  de: {
    home: "Startseite",
    services: "Leistungen",
    webDevelopment: "Webentwicklung",
    seo: "SEO-Optimierung",
    graphicDesign: "Grafikdesign",
    projectInquiry: "Projektfragebogen",
    portfolio: "Portfolio"
  },
  it: {
    home: "Home",
    services: "Servizi",
    webDevelopment: "Sviluppo web",
    seo: "Ottimizzazione SEO",
    graphicDesign: "Design grafico",
    projectInquiry: "Questionario progetto",
    portfolio: "Portfolio"
  }
};
const PAGE_SEO = {
  home: {
    sr: {
      title: "Poslovne aplikacije, web razvoj i SEO | Wizionar",
      description: "Wizionar razvija poslovne aplikacije, web stranice, web shopove, SEO strategije i grafički dizajn za firme u BiH, Njemačkoj i Italiji.",
      keywords: [
        "poslovne aplikacije",
        "izrada web stranica",
        "web shop development",
        "seo optimizacija",
        "grafički dizajn",
        "B2B softver"
      ]
    },
    en: {
      title: "Business Software, Web Development & SEO | Wizionar",
      description: "Wizionar builds business software, websites, web shops, SEO strategies and design systems for companies targeting Bosnia, Germany and Italy.",
      keywords: [
        "business software",
        "website development",
        "web shop development",
        "SEO agency",
        "graphic design",
        "B2B software"
      ]
    },
    de: {
      title: "Business-Software, Webentwicklung & SEO | Wizionar",
      description: "Wizionar entwickelt Business-Software, Websites, Webshops, SEO-Strategien und Designsysteme für Unternehmen in Bosnien, Deutschland und Italien.",
      keywords: [
        "Business-Software",
        "Webentwicklung",
        "Webshop Entwicklung",
        "SEO Agentur",
        "Grafikdesign",
        "B2B Software"
      ]
    },
    it: {
      title: "Software aziendale, sviluppo web e SEO | Wizionar",
      description: "Wizionar realizza software aziendale, siti web, web shop, strategie SEO e design per aziende che operano in Bosnia, Germania e Italia.",
      keywords: [
        "software aziendale",
        "sviluppo siti web",
        "sviluppo web shop",
        "agenzia SEO",
        "design grafico",
        "software B2B"
      ]
    }
  },
  wizflussi: {
    sr: {
      title: "WizFlussi | Upravljanje plaćanjima dobavljačima",
      description: "WizFlussi centralizuje plaćanja dobavljačima, rokove, valute i audit trag za timove kojima trebaju kontrola, pregled i automatizacija."
    },
    en: {
      title: "WizFlussi | Supplier Payment Management",
      description: "WizFlussi centralizes supplier payments, due dates, currencies and audit trails for teams that need control, visibility and automation."
    },
    de: {
      title: "WizFlussi | Lieferantenzahlungen digital verwalten",
      description: "WizFlussi zentralisiert Lieferantenzahlungen, Fristen, Währungen und Audit-Trails für Teams mit Fokus auf Kontrolle und Automatisierung."
    },
    it: {
      title: "WizFlussi | Gestione pagamenti fornitori",
      description: "WizFlussi centralizza pagamenti fornitori, scadenze, valute e audit trail per team che cercano controllo, visibilità e automazione."
    }
  },
  wizmedikReports: {
    sr: {
      title: "WizMedikReports | Izvještaji za klinike i ustanove",
      description: "WizMedikReports donosi centralizovane izvještaje, praćenje radnih sati i finansijsku analitiku za klinike i zdravstvene ustanove."
    },
    en: {
      title: "WizMedikReports | Reporting for Clinics",
      description: "WizMedikReports provides centralized reporting, staff time tracking and financial analytics for clinics and healthcare organizations."
    },
    de: {
      title: "WizMedikReports | Reporting für Kliniken",
      description: "WizMedikReports bietet zentrale Reports, Zeiterfassung und Finanzanalytik für Kliniken und Gesundheitseinrichtungen."
    },
    it: {
      title: "WizMedikReports | Report per cliniche",
      description: "WizMedikReports offre report centralizzati, monitoraggio orari e analisi finanziaria per cliniche e strutture sanitarie."
    }
  },
  wizmedik: {
    sr: {
      title: "WizMedik | Platforma za klinike i online zakazivanje",
      description: "WizMedik povezuje klinike, doktore i pacijente kroz pretragu, profile ustanova, online zakazivanje i pouzdane medicinske informacije."
    },
    en: {
      title: "WizMedik | Clinic Platform & Online Booking",
      description: "WizMedik connects clinics, doctors and patients through search, facility profiles, online booking and trusted medical content."
    },
    de: {
      title: "WizMedik | Plattform für Kliniken und Terminbuchung",
      description: "WizMedik verbindet Kliniken, Ärzte und Patienten über Suche, Praxisprofile, Online-Terminbuchung und verlässliche Inhalte."
    },
    it: {
      title: "WizMedik | Piattaforma cliniche e prenotazioni online",
      description: "WizMedik collega cliniche, medici e pazienti tramite ricerca, profili delle strutture, prenotazioni online e contenuti affidabili."
    }
  },
  frizerino: {
    sr: {
      title: "Frizerino | Rezervacije i upravljanje salonima",
      description: "Frizerino pomaže salonima da dobiju više rezervacija, manje propuštenih termina i jasniji pregled rasporeda, usluga i tima."
    },
    en: {
      title: "Frizerino | Salon Booking & Management",
      description: "Frizerino helps salons increase bookings, reduce missed appointments and manage schedules, services and teams more efficiently."
    },
    de: {
      title: "Frizerino | Buchungen und Salonverwaltung",
      description: "Frizerino hilft Salons, mehr Buchungen zu erhalten, Ausfälle zu reduzieren und Termine, Services und Teams besser zu verwalten."
    },
    it: {
      title: "Frizerino | Prenotazioni e gestione saloni",
      description: "Frizerino aiuta i saloni ad aumentare le prenotazioni, ridurre gli appuntamenti persi e gestire meglio agenda, servizi e team."
    }
  },
  chatko: {
    sr: {
      title: "Chatko | AI asistent za web shopove",
      description: "Chatko je AI asistent za web shopove koji odgovara na pitanja o proizvodima, dostavi, plaćanju i kupovini bez opterećenja vašeg tima."
    },
    en: {
      title: "Chatko | AI Assistant for Web Shops",
      description: "Chatko is an AI assistant for e-commerce stores that answers questions about products, delivery, payments and purchases around the clock."
    },
    de: {
      title: "Chatko | KI-Assistent für Webshops",
      description: "Chatko ist ein KI-Assistent für Webshops, der Fragen zu Produkten, Lieferung, Bezahlung und Kaufprozessen automatisch beantwortet."
    },
    it: {
      title: "Chatko | Assistente AI per web shop",
      description: "Chatko è un assistente AI per e-commerce che risponde automaticamente a domande su prodotti, consegna, pagamenti e acquisti."
    }
  },
  usluge: {
    sr: {
      title: "Digitalne usluge: web development, SEO i dizajn | Wizionar",
      description: "Web razvoj, SEO optimizacija i grafički dizajn za kompanije koje žele bolju vidljivost, više upita i profesionalniji nastup na tržištu."
    },
    en: {
      title: "Digital Services: Web Development, SEO & Design | Wizionar",
      description: "Web development, SEO optimization and graphic design for companies that want stronger visibility, more leads and a sharper market presence."
    },
    de: {
      title: "Digitale Services: Webentwicklung, SEO und Design | Wizionar",
      description: "Webentwicklung, SEO-Optimierung und Grafikdesign für Unternehmen, die mehr Sichtbarkeit, Anfragen und einen professionellen Auftritt wollen."
    },
    it: {
      title: "Servizi digitali: sviluppo web, SEO e design | Wizionar",
      description: "Sviluppo web, ottimizzazione SEO e design grafico per aziende che desiderano più visibilità, più richieste e una presenza più forte."
    }
  },
  webDevelopment: {
    sr: {
      title: "Izrada web stranica i web shopova | Wizionar",
      description: "Profesionalna izrada web stranica, landing stranica i web shopova. Moderan dizajn, brze performanse i SEO osnova za rast."
    },
    en: {
      title: "Website & Web Shop Development | Wizionar",
      description: "Professional website, landing page and web shop development with modern design, strong performance and a solid SEO foundation."
    },
    de: {
      title: "Websites und Webshops entwickeln lassen | Wizionar",
      description: "Professionelle Entwicklung von Websites, Landing Pages und Webshops mit modernem Design, Performance und sauberer SEO-Basis."
    },
    it: {
      title: "Sviluppo siti web e web shop | Wizionar",
      description: "Sviluppo professionale di siti web, landing page e web shop con design moderno, prestazioni veloci e base SEO solida."
    }
  },
  seoOptimization: {
    sr: {
      title: "SEO optimizacija | Wizionar",
      description: "SEO optimizacija za dugoročni rast: više relevantnih posjeta, više upita i jaču organsku vidljivost na domaćem, njemačkom i italijanskom tržištu."
    },
    en: {
      title: "SEO Optimization | Wizionar",
      description: "SEO optimization for long-term growth, stronger organic visibility and more qualified leads across local and international markets."
    },
    de: {
      title: "SEO-Optimierung | Wizionar",
      description: "SEO-Optimierung für langfristiges Wachstum, mehr qualifizierte Anfragen und bessere organische Sichtbarkeit in lokalen und internationalen Märkten."
    },
    it: {
      title: "Ottimizzazione SEO | Wizionar",
      description: "Ottimizzazione SEO per crescita duratura, maggiore visibilità organica e più richieste qualificate nei mercati locali e internazionali."
    }
  },
  graphicDesign: {
    sr: {
      title: "Grafički dizajn i brending | Wizionar",
      description: "Grafički dizajn, vizuelni identitet, ambalaža, social media vizuali i promotivni materijali za brendove koji žele ostaviti jači utisak."
    },
    en: {
      title: "Graphic Design & Branding | Wizionar",
      description: "Graphic design, visual identity, packaging, social media creatives and promotional materials for brands that want a stronger visual impact."
    },
    de: {
      title: "Grafikdesign und Branding | Wizionar",
      description: "Grafikdesign, visuelle Identität, Packaging, Social-Media-Grafiken und Werbematerialien für Marken mit Anspruch auf starke Wirkung."
    },
    it: {
      title: "Design grafico e branding | Wizionar",
      description: "Design grafico, identità visiva, packaging, creatività social e materiali promozionali per brand che vogliono distinguersi."
    }
  },
  projectInquiry: {
    sr: {
      title: "Projektni upitnik za web sajt, web shop ili aplikaciju | Wizionar",
      description: "Popunite projektni upitnik za web sajt, web shop, booking sistem, aplikaciju ili redizajn kako bismo pripremili jasne naredne korake.",
      keywords: ["projektni upitnik", "web sajt", "web shop", "web aplikacija", "booking sistem"]
    },
    en: {
      title: "Project inquiry for websites, shops and apps | Wizionar",
      description: "Complete a project inquiry for a website, online shop, booking system, app or redesign so we can prepare clear next steps.",
      keywords: ["project inquiry", "website", "online shop", "web application", "booking system"]
    },
    de: {
      title: "Projektfragebogen für Websites, Shops und Apps | Wizionar",
      description: "Füllen Sie einen Projektfragebogen für Website, Online-Shop, Buchungssystem, App oder Redesign aus, damit wir klare nächste Schritte vorbereiten können.",
      keywords: ["Projektfragebogen", "Website", "Online-Shop", "Webanwendung", "Buchungssystem"]
    },
    it: {
      title: "Questionario progetto per siti, shop e app | Wizionar",
      description: "Compila un questionario per sito web, shop online, sistema booking, app o redesign così possiamo preparare i prossimi passi.",
      keywords: ["questionario progetto", "sito web", "shop online", "applicazione web", "booking"]
    }
  }
};
const toAbsoluteUrl = (path) => new URL(path, BASE_URL).toString();
const getPageSeo = (page, language) => PAGE_SEO[page][language];
const getSeoLabel = (language, key) => SEO_LABELS[language][key];
const withContext = (schema) => ({
  "@context": "https://schema.org",
  ...schema
});
const createOrganizationSchema = () => withContext({
  "@type": "Organization",
  "@id": "".concat(BASE_URL, "/#organization"),
  name: SITE_NAME,
  url: BASE_URL,
  email: "info@wizionar.com",
  telephone: "+38766882702",
  areaServed: ["BA", "DE", "IT", "EU"],
  availableLanguage: ["bs", "en", "de", "it"],
  knowsAbout: [
    "Business software",
    "Web development",
    "SEO",
    "Graphic design",
    "E-commerce",
    "Healthcare platforms"
  ]
});
const createWebsiteSchema = (language) => withContext({
  "@type": "WebSite",
  "@id": "".concat(BASE_URL, "/#website"),
  url: BASE_URL,
  name: SITE_NAME,
  inLanguage: LANGUAGE_SEO[language].htmlLang,
  publisher: { "@id": "".concat(BASE_URL, "/#organization") }
});
const createWebPageSchema = ({
  language,
  path,
  title,
  description
}) => withContext({
  "@type": "WebPage",
  "@id": "".concat(toAbsoluteUrl(buildLangPath(path, language)), "#webpage"),
  url: toAbsoluteUrl(buildLangPath(path, language)),
  name: title,
  description,
  inLanguage: LANGUAGE_SEO[language].htmlLang,
  isPartOf: { "@id": "".concat(BASE_URL, "/#website") },
  about: { "@id": "".concat(BASE_URL, "/#organization") }
});
const createServiceSchema = ({
  language,
  name,
  description,
  path,
  serviceType
}) => withContext({
  "@type": "Service",
  "@id": "".concat(toAbsoluteUrl(buildLangPath(path, language)), "#service"),
  name,
  description,
  serviceType,
  url: toAbsoluteUrl(buildLangPath(path, language)),
  provider: { "@id": "".concat(BASE_URL, "/#organization") },
  areaServed: ["BA", "DE", "IT", "EU"],
  availableLanguage: ["bs", "en", "de", "it"]
});
const createSoftwareApplicationSchema = ({
  language,
  name,
  description,
  path,
  category,
  keywords
}) => withContext({
  "@type": "SoftwareApplication",
  "@id": "".concat(toAbsoluteUrl(buildLangPath(path, language)), "#app"),
  name,
  description,
  applicationCategory: category,
  operatingSystem: "Web",
  url: toAbsoluteUrl(buildLangPath(path, language)),
  publisher: { "@id": "".concat(BASE_URL, "/#organization") },
  inLanguage: LANGUAGE_SEO[language].htmlLang,
  keywords
});
const createCreativeWorkSchema = ({
  language,
  name,
  description,
  path,
  keywords
}) => withContext({
  "@type": "CreativeWork",
  "@id": "".concat(toAbsoluteUrl(buildLangPath(path, language)), "#creativework"),
  name,
  description,
  url: toAbsoluteUrl(buildLangPath(path, language)),
  creator: { "@id": "".concat(BASE_URL, "/#organization") },
  publisher: { "@id": "".concat(BASE_URL, "/#organization") },
  inLanguage: LANGUAGE_SEO[language].htmlLang,
  keywords
});
const createBreadcrumbSchema = (language, items) => withContext({
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: toAbsoluteUrl(buildLangPath(item.path, language))
  }))
});
const createFaqSchema = (items) => withContext({
  "@type": "FAQPage",
  mainEntity: items.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer
    }
  }))
});
const HreflangTags = () => {
  const location = useLocation();
  const { language } = useLanguage();
  useEffect(() => {
    document.querySelectorAll("link[hreflang]").forEach((el) => el.remove());
    const basePath = stripAllLangPrefixes(location.pathname);
    SUPPORTED_LANGUAGES.forEach((lang) => {
      const link = document.createElement("link");
      link.rel = "alternate";
      link.hreflang = LANGUAGE_SEO[lang].hreflang;
      link.href = "".concat(BASE_URL).concat(buildLangPath(basePath, lang));
      document.head.appendChild(link);
    });
    const xDefault = document.createElement("link");
    xDefault.rel = "alternate";
    xDefault.hreflang = "x-default";
    xDefault.href = "".concat(BASE_URL).concat(basePath);
    document.head.appendChild(xDefault);
    document.documentElement.lang = LANGUAGE_SEO[language].htmlLang;
    return () => {
      document.querySelectorAll("link[hreflang]").forEach((el) => el.remove());
    };
  }, [language, location.pathname]);
  return null;
};
const GoogleAnalytics = () => {
  const location = useLocation();
  const { language } = useLanguage();
  const measurementId = void 0;
  useEffect(() => {
    {
      return;
    }
  }, [measurementId]);
  useEffect(() => {
    {
      return;
    }
  }, [language, location.pathname, location.search, measurementId]);
  return null;
};
const DeferredUiOverlays = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Toaster$1, {}),
    /* @__PURE__ */ jsx(Toaster, {})
  ] });
};
const AppShell = ({ children }) => /* @__PURE__ */ jsxs(LanguageProvider, { children: [
  /* @__PURE__ */ jsx(HreflangTags, {}),
  /* @__PURE__ */ jsx(GoogleAnalytics, {}),
  /* @__PURE__ */ jsxs(TooltipProvider, { children: [
    /* @__PURE__ */ jsx(DeferredUiOverlays, {}),
    children
  ] })
] });
const seoTranslations = {
  sr: {
    meta: {
      title: "SEO optimizacija | Wizionar – Više klijenata sa Google-a",
      description: "Profesionalna SEO optimizacija za dugoročan rast. Više posjeta, više upita i više klijenata. Wizionar pristup SEO-u."
    },
    hero: {
      badge: "SEO Optimizacija",
      title1: "SEO optimizacija koja pretvara",
      titleHighlight: "pretragu u klijente",
      subtitle: "Vaši potencijalni klijenti već traže vaše usluge na Google Search — pitanje je samo da li će pronaći vas ili konkurenciju.",
      subtitleBold: "Mi osiguravamo da pronađu vas.",
      cta: "Zatražite SEO analizu"
    },
    context: {
      p1: "U digitalnom okruženju, pozicija na pretraživačima direktno utiče na",
      p1Bold: "prihod, reputaciju i rast",
      p1End: "biznisa.",
      p2: "Većina korisnika nikada ne ide dalje od prve stranice rezultata. Ako vaš web sajt nije tamo —",
      p2Bold: "praktično ne postojite",
      p3: "SEO optimizacija nije samo tehnički proces. To je kombinacija",
      p3Bold: "strategije, sadržaja, tehnologije i razumijevanja ponašanja korisnika",
      quote: "U Wizionaru SEO posmatramo kao dugoročan sistem rasta, a ne kao kratkoročnu taktiku."
    },
    meaning: {
      title: "Šta SEO zaista znači za vaš biznis",
      subtitle: "SEO nije samo „bolja pozicija na Google-u“. To je sistem koji dovodi klijente koji su već spremni na akciju.",
      items: [
        "Da vas pronalaze ljudi koji već imaju potrebu",
        "Da dobijate kvalitetnije upite",
        "Da smanjujete trošak oglašavanja",
        "Da gradite autoritet i povjerenje"
      ]
    },
    approach: {
      title: "Naš pristup SEO-u",
      subtitle: "Za razliku od generičkih pristupa, mi ne radimo SEO po šablonu. Svaki projekat tretiramo kao poseban sistem.",
      steps: [
        {
          title: "Dubinsko razumijevanje biznisa",
          desc: "Ne optimizujemo samo web — optimizujemo način na koji vas tržište pronalazi.",
          items: ["Vaše usluge ili proizvode", "Ciljne klijente", "Konkurenciju", "Tržišne prilike"]
        },
        {
          title: "Strategija ključnih riječi",
          desc: "Ne ciljamo samo „velike“ keyworde. Fokusiramo se na pretrage koje donose rezultate.",
          items: [
            "Komercijalne pretrage (koje donose klijente)",
            "Long-tail keyworde (manja konkurencija, veća konverzija)",
            "Lokalne pretrage"
          ],
          examples: [
            "„zubna ordinacija Sarajevo cijene“",
            "„izrada web shopa BiH“",
            "„ginekolog privatno Tuzla“"
          ],
          examplesLabel: "Primjeri pretraga"
        },
        {
          title: "On-page optimizacija",
          desc: "Optimizujemo svaki element sajta da Google jasno razumije šta nudite — i kome.",
          items: ["Struktura sadržaja (H1, H2, H3)", "Meta tagovi", "URL struktura", "Interni linkovi", "SEO tekstovi"]
        },
        {
          title: "Technical SEO",
          desc: "Bez tehnički ispravnog sajta nema ozbiljnog SEO-a.",
          items: ["Optimizacija brzine", "Mobile responsiveness", "Indexing i crawling", "Sitemap i robots konfiguracija", "Structured data (schema)"]
        },
        {
          title: "Sadržaj koji rangira i prodaje",
          desc: "SEO bez kvalitetnog sadržaja ne postoji. Kreiramo sadržaj za korisnike — ne samo za Google.",
          items: ["Landing stranice", "Blog članci", "Edukativni sadržaj", "SEO tekstovi za usluge"]
        },
        {
          title: "Autoritet i link building",
          desc: "Google rangira povjerenje. Gradimo ga sistematski.",
          items: ["Kvalitetni backlinkovi", "Medijske objave", "Relevantni izvori"]
        },
        {
          title: "Local SEO",
          desc: "Posebno za klinike, salone i uslužne djelatnosti — ključ za lokalnu vidljivost.",
          items: ["Google Business profile", "Lokalni rezultati", "Map prikazi", "Recenzije"]
        }
      ]
    },
    notForSeo: {
      title: "Ne radimo SEO radi SEO-a",
      notLabel: "Naš fokus NIJE",
      notItems: ["✘ „Više keyworda“", "✘ „Više posjeta“"],
      yesLabel: "Naš fokus JESTE",
      yesItems: ["✔ Više upita", "✔ Više poziva", "✔ Više prodaje"],
      bottom: "SEO je sredstvo —",
      bottomBold: "rezultat je cilj."
    },
    process: {
      title: "Proces saradnje",
      subtitle: "SEO nije jednokratan posao — već kontinuiran proces koji donosi rastuće rezultate.",
      steps: [
        "Analiza trenutnog stanja",
        "SEO audit (tehnički + sadržajni)",
        "Definisanje strategije",
        "Implementacija optimizacije",
        "Kreiranje sadržaja",
        "Praćenje i izvještavanje",
        "Kontinuirano unapređenje"
      ]
    },
    whyUs: {
      title: "Zašto Wizionar",
      items: [
        "Strateški pristup, ne generički SEO",
        "Kombinacija developmenta + marketinga",
        "Fokus na rezultate, ne metrike bez vrijednosti",
        "Iskustvo sa realnim projektima i tržištem",
        "Transparentna komunikacija"
      ]
    },
    faq: {
      title: "Česta pitanja",
      items: [
        { q: "Koliko traje SEO?", a: "SEO je dugoročan proces. Prvi rezultati se vide u 3–6 mjeseci, ali pravi efekti dolaze kroz kontinuitet. Svaka ozbiljna SEO strategija zahtijeva vrijeme, jer Google vrednuje kvalitet i doslednost." },
        { q: "Da li garantujete prvo mjesto na Google-u?", a: "Ne — jer to niko ozbiljan ne može garantovati. Ali garantujemo profesionalan pristup, transparentnost i realan, mjerljiv rast vaše online vidljivosti." },
        { q: "Da li je SEO potreban ako već radimo reklame?", a: "Da — SEO i reklame zajedno daju najbolje rezultate. SEO smanjuje dugoročne troškove oglašavanja i donosi organski saobraćaj koji ne prestaje kad isključite budžet." },
        { q: "Koliko košta SEO optimizacija?", a: "Cijena zavisi od obima projekta, konkurencije u vašoj branši i ciljeva. Kontaktirajte nas za besplatnu procjenu i prilagođenu ponudu." },
        { q: "Da li radite samo lokalni SEO?", a: "Ne — radimo i lokalni i regionalni i internacionalni SEO. Strategiju prilagođavamo vašem tržištu i ciljevima." }
      ]
    },
    cta: {
      pre: "Vaš sajt postoji.",
      title: "Vrijeme je da počne",
      titleHighlight: "donositi rezultate.",
      button: "Zatražite SEO analizu",
      allServices: "Sve usluge"
    }
  },
  en: {
    meta: {
      title: "SEO Optimization | Wizionar – More Clients from Google",
      description: "Professional SEO optimization for long-term growth. More visits, more inquiries, and more clients. Wizionar approach to SEO."
    },
    hero: {
      badge: "SEO Optimization",
      title1: "SEO optimization that turns",
      titleHighlight: "search into clients",
      subtitle: "Your potential clients are already searching for your services on Google Search — the only question is whether they will find you or your competition.",
      subtitleBold: "We make sure they find you.",
      cta: "Request SEO Analysis"
    },
    context: {
      p1: "In the digital environment, search engine ranking directly impacts",
      p1Bold: "revenue, reputation and growth",
      p1End: "of your business.",
      p2: "Most users never go past the first page of results. If your website isn’t there —",
      p2Bold: "you practically don’t exist",
      p3: "SEO optimization is not just a technical process. It’s a combination of",
      p3Bold: "strategy, content, technology and understanding user behavior",
      quote: "At Wizionar, we view SEO as a long-term growth system, not a short-term tactic."
    },
    meaning: {
      title: "What SEO really means for your business",
      subtitle: 'SEO is not just "better ranking on Google". It’s a system that brings clients who are already ready to take action.',
      items: [
        "People who already need your services find you",
        "You receive higher-quality inquiries",
        "You reduce advertising costs",
        "You build authority and trust"
      ]
    },
    approach: {
      title: "Our approach to SEO",
      subtitle: "Unlike generic approaches, we don’t do cookie-cutter SEO. Every project is treated as a unique system.",
      steps: [
        {
          title: "Deep business understanding",
          desc: "We don’t just optimize websites — we optimize how the market finds you.",
          items: ["Your services or products", "Target clients", "Competition", "Market opportunities"]
        },
        {
          title: "Keyword strategy",
          desc: "We don’t just target “big” keywords. We focus on searches that deliver results.",
          items: [
            "Commercial searches (that bring clients)",
            "Long-tail keywords (less competition, higher conversion)",
            "Local searches"
          ],
          examples: [
            "“dental clinic Sarajevo prices”",
            "“web shop development Bosnia”",
            "“private gynecologist Tuzla”"
          ],
          examplesLabel: "Search examples"
        },
        {
          title: "On-page optimization",
          desc: "We optimize every element of your site so Google clearly understands what you offer — and to whom.",
          items: ["Content structure (H1, H2, H3)", "Meta tags", "URL structure", "Internal links", "SEO copy"]
        },
        {
          title: "Technical SEO",
          desc: "Without a technically sound website, there’s no serious SEO.",
          items: ["Speed optimization", "Mobile responsiveness", "Indexing & crawling", "Sitemap & robots configuration", "Structured data (schema)"]
        },
        {
          title: "Content that ranks and sells",
          desc: "SEO without quality content doesn’t exist. We create content for users — not just for Google.",
          items: ["Landing pages", "Blog articles", "Educational content", "SEO copy for services"]
        },
        {
          title: "Authority & link building",
          desc: "Google ranks trust. We build it systematically.",
          items: ["Quality backlinks", "Media publications", "Relevant sources"]
        },
        {
          title: "Local SEO",
          desc: "Especially for clinics, salons and service businesses — the key to local visibility.",
          items: ["Google Business profile", "Local results", "Map listings", "Reviews"]
        }
      ]
    },
    notForSeo: {
      title: "We don’t do SEO for the sake of SEO",
      notLabel: "Our focus is NOT",
      notItems: ['✘ "More keywords"', '✘ "More visits"'],
      yesLabel: "Our focus IS",
      yesItems: ["✔ More inquiries", "✔ More calls", "✔ More sales"],
      bottom: "SEO is the means —",
      bottomBold: "results are the goal."
    },
    process: {
      title: "Collaboration process",
      subtitle: "SEO is not a one-time job — it’s an ongoing process that delivers growing results.",
      steps: [
        "Current state analysis",
        "SEO audit (technical + content)",
        "Strategy definition",
        "Optimization implementation",
        "Content creation",
        "Monitoring & reporting",
        "Continuous improvement"
      ]
    },
    whyUs: {
      title: "Why Wizionar",
      items: [
        "Strategic approach, not generic SEO",
        "Combination of development + marketing",
        "Focus on results, not vanity metrics",
        "Experience with real projects and markets",
        "Transparent communication"
      ]
    },
    faq: {
      title: "Frequently asked questions",
      items: [
        { q: "How long does SEO take?", a: "SEO is a long-term process. First results are visible in 3–6 months, but real effects come through consistency. Every serious SEO strategy requires time, as Google values quality and consistency." },
        { q: "Do you guarantee first place on Google?", a: "No — because no one serious can guarantee that. But we guarantee a professional approach, transparency and real, measurable growth of your online visibility." },
        { q: "Is SEO needed if we already run ads?", a: "Yes — SEO and ads together deliver the best results. SEO reduces long-term advertising costs and brings organic traffic that doesn’t stop when you turn off the budget." },
        { q: "How much does SEO optimization cost?", a: "The price depends on project scope, competition in your industry and goals. Contact us for a free estimate and customized offer." },
        { q: "Do you only do local SEO?", a: "No — we do local, regional and international SEO. We adapt the strategy to your market and goals." }
      ]
    },
    cta: {
      pre: "Your website exists.",
      title: "It’s time it started",
      titleHighlight: "delivering results.",
      button: "Request SEO Analysis",
      allServices: "All services"
    }
  },
  de: {
    meta: {
      title: "SEO-Optimierung | Wizionar – Mehr Kunden über Google",
      description: "Professionelle SEO-Optimierung für langfristiges Wachstum. Mehr Besucher, mehr Anfragen und mehr Kunden. Der Wizionar-Ansatz für SEO."
    },
    hero: {
      badge: "SEO-Optimierung",
      title1: "SEO-Optimierung, die",
      titleHighlight: "Suche in Kunden verwandelt",
      subtitle: "Ihre potenziellen Kunden suchen bereits nach Ihren Dienstleistungen bei Google — die Frage ist nur, ob sie Sie oder Ihre Konkurrenz finden.",
      subtitleBold: "Wir sorgen dafür, dass sie Sie finden.",
      cta: "SEO-Analyse anfordern"
    },
    context: {
      p1: "Im digitalen Umfeld wirkt sich die Position in Suchmaschinen direkt auf",
      p1Bold: "Umsatz, Reputation und Wachstum",
      p1End: "Ihres Unternehmens aus.",
      p2: "Die meisten Nutzer gehen nie über die erste Ergebnisseite hinaus. Wenn Ihre Website nicht dort ist —",
      p2Bold: "existieren Sie praktisch nicht",
      p3: "SEO-Optimierung ist nicht nur ein technischer Prozess. Es ist eine Kombination aus",
      p3Bold: "Strategie, Inhalt, Technologie und Verständnis des Nutzerverhaltens",
      quote: "Bei Wizionar betrachten wir SEO als langfristiges Wachstumssystem, nicht als kurzfristige Taktik."
    },
    meaning: {
      title: "Was SEO wirklich für Ihr Unternehmen bedeutet",
      subtitle: "SEO ist nicht nur „besseres Ranking bei Google“. Es ist ein System, das Kunden bringt, die bereits handlungsbereit sind.",
      items: [
        "Menschen, die Ihre Dienste bereits benötigen, finden Sie",
        "Sie erhalten qualitativ hochwertigere Anfragen",
        "Sie reduzieren Werbekosten",
        "Sie bauen Autorität und Vertrauen auf"
      ]
    },
    approach: {
      title: "Unser Ansatz für SEO",
      subtitle: "Im Gegensatz zu generischen Ansätzen machen wir kein SEO nach Schema. Jedes Projekt wird als einzigartiges System behandelt.",
      steps: [
        {
          title: "Tiefes Geschäftsverständnis",
          desc: "Wir optimieren nicht nur Websites — wir optimieren, wie der Markt Sie findet.",
          items: ["Ihre Dienstleistungen oder Produkte", "Zielkunden", "Wettbewerb", "Marktchancen"]
        },
        {
          title: "Keyword-Strategie",
          desc: "Wir zielen nicht nur auf „große“ Keywords ab. Wir konzentrieren uns auf Suchanfragen, die Ergebnisse liefern.",
          items: [
            "Kommerzielle Suchanfragen (die Kunden bringen)",
            "Long-Tail-Keywords (weniger Wettbewerb, höhere Konversion)",
            "Lokale Suchanfragen"
          ],
          examples: [
            "„Zahnarztpraxis Sarajevo Preise“",
            "„Webshop-Entwicklung Bosnien“",
            "„Privater Gynäkologe Tuzla“"
          ],
          examplesLabel: "Suchbeispiele"
        },
        {
          title: "On-Page-Optimierung",
          desc: "Wir optimieren jedes Element Ihrer Website, damit Google klar versteht, was Sie anbieten — und für wen.",
          items: ["Inhaltsstruktur (H1, H2, H3)", "Meta-Tags", "URL-Struktur", "Interne Verlinkung", "SEO-Texte"]
        },
        {
          title: "Technical SEO",
          desc: "Ohne eine technisch einwandfreie Website gibt es kein ernsthaftes SEO.",
          items: ["Geschwindigkeitsoptimierung", "Mobile Responsiveness", "Indexierung & Crawling", "Sitemap- & Robots-Konfiguration", "Strukturierte Daten (Schema)"]
        },
        {
          title: "Inhalte, die ranken und verkaufen",
          desc: "SEO ohne qualitativ hochwertige Inhalte gibt es nicht. Wir erstellen Inhalte für Nutzer — nicht nur für Google.",
          items: ["Landing Pages", "Blog-Artikel", "Bildungsinhalte", "SEO-Texte für Dienstleistungen"]
        },
        {
          title: "Autorität & Linkaufbau",
          desc: "Google bewertet Vertrauen. Wir bauen es systematisch auf.",
          items: ["Qualitative Backlinks", "Medienveröffentlichungen", "Relevante Quellen"]
        },
        {
          title: "Lokales SEO",
          desc: "Besonders für Kliniken, Salons und Dienstleistungsunternehmen — der Schlüssel zur lokalen Sichtbarkeit.",
          items: ["Google Business-Profil", "Lokale Ergebnisse", "Kartendarstellungen", "Bewertungen"]
        }
      ]
    },
    notForSeo: {
      title: "Wir machen kein SEO um des SEO willen",
      notLabel: "Unser Fokus ist NICHT",
      notItems: ["✘ „Mehr Keywords“", "✘ „Mehr Besucher“"],
      yesLabel: "Unser Fokus IST",
      yesItems: ["✔ Mehr Anfragen", "✔ Mehr Anrufe", "✔ Mehr Verkäufe"],
      bottom: "SEO ist das Mittel —",
      bottomBold: "Ergebnisse sind das Ziel."
    },
    process: {
      title: "Zusammenarbeitsprozess",
      subtitle: "SEO ist keine einmalige Aufgabe — es ist ein fortlaufender Prozess, der wachsende Ergebnisse liefert.",
      steps: [
        "Analyse des Ist-Zustands",
        "SEO-Audit (technisch + inhaltlich)",
        "Strategiedefinition",
        "Optimierungsimplementierung",
        "Content-Erstellung",
        "Überwachung & Berichterstattung",
        "Kontinuierliche Verbesserung"
      ]
    },
    whyUs: {
      title: "Warum Wizionar",
      items: [
        "Strategischer Ansatz, kein generisches SEO",
        "Kombination aus Entwicklung + Marketing",
        "Fokus auf Ergebnisse, nicht auf wertlose Metriken",
        "Erfahrung mit realen Projekten und Märkten",
        "Transparente Kommunikation"
      ]
    },
    faq: {
      title: "Häufig gestellte Fragen",
      items: [
        { q: "Wie lange dauert SEO?", a: "SEO ist ein langfristiger Prozess. Erste Ergebnisse sind in 3–6 Monaten sichtbar, aber die wirklichen Effekte kommen durch Kontinuität." },
        { q: "Garantieren Sie den ersten Platz bei Google?", a: "Nein — denn das kann niemand Seriöses garantieren. Aber wir garantieren einen professionellen Ansatz, Transparenz und reales, messbares Wachstum." },
        { q: "Braucht man SEO, wenn man bereits Werbung schaltet?", a: "Ja — SEO und Werbung zusammen liefern die besten Ergebnisse. SEO reduziert langfristige Werbekosten und bringt organischen Traffic." },
        { q: "Was kostet SEO-Optimierung?", a: "Der Preis hängt vom Projektumfang, dem Wettbewerb in Ihrer Branche und den Zielen ab. Kontaktieren Sie uns für eine kostenlose Einschätzung." },
        { q: "Machen Sie nur lokales SEO?", a: "Nein — wir machen lokales, regionales und internationales SEO. Wir passen die Strategie an Ihren Markt und Ihre Ziele an." }
      ]
    },
    cta: {
      pre: "Ihre Website existiert.",
      title: "Es ist Zeit, dass sie",
      titleHighlight: "Ergebnisse liefert.",
      button: "SEO-Analyse anfordern",
      allServices: "Alle Dienstleistungen"
    }
  },
  it: {
    meta: {
      title: "Ottimizzazione SEO | Wizionar – Più clienti da Google",
      description: "Ottimizzazione SEO professionale per una crescita a lungo termine. Più visite, più richieste e più clienti. L'approccio Wizionar al SEO."
    },
    hero: {
      badge: "Ottimizzazione SEO",
      title1: "Ottimizzazione SEO che trasforma",
      titleHighlight: "la ricerca in clienti",
      subtitle: "I vostri potenziali clienti stanno già cercando i vostri servizi su Google Search — la domanda è solo se troveranno voi o la concorrenza.",
      subtitleBold: "Noi ci assicuriamo che trovino voi.",
      cta: "Richiedi analisi SEO"
    },
    context: {
      p1: "Nell'ambiente digitale, la posizione nei motori di ricerca influisce direttamente su",
      p1Bold: "fatturato, reputazione e crescita",
      p1End: "della vostra azienda.",
      p2: "La maggior parte degli utenti non va mai oltre la prima pagina dei risultati. Se il vostro sito web non è lì —",
      p2Bold: "praticamente non esistete",
      p3: "L'ottimizzazione SEO non è solo un processo tecnico. È una combinazione di",
      p3Bold: "strategia, contenuti, tecnologia e comprensione del comportamento degli utenti",
      quote: "In Wizionar consideriamo il SEO come un sistema di crescita a lungo termine, non come una tattica a breve termine."
    },
    meaning: {
      title: "Cosa significa veramente il SEO per la vostra azienda",
      subtitle: 'Il SEO non è solo "un miglior posizionamento su Google". È un sistema che porta clienti già pronti ad agire.',
      items: [
        "Le persone che hanno già bisogno dei vostri servizi vi trovano",
        "Ricevete richieste di qualità superiore",
        "Riducete i costi pubblicitari",
        "Costruite autorità e fiducia"
      ]
    },
    approach: {
      title: "Il nostro approccio al SEO",
      subtitle: "A differenza degli approcci generici, non facciamo SEO standardizzato. Ogni progetto viene trattato come un sistema unico.",
      steps: [
        {
          title: "Comprensione approfondita del business",
          desc: "Non ottimizziamo solo i siti web — ottimizziamo il modo in cui il mercato vi trova.",
          items: ["I vostri servizi o prodotti", "Clienti target", "Concorrenza", "Opportunità di mercato"]
        },
        {
          title: "Strategia delle parole chiave",
          desc: "Non puntiamo solo alle keyword “grandi”. Ci concentriamo sulle ricerche che portano risultati.",
          items: [
            "Ricerche commerciali (che portano clienti)",
            "Parole chiave long-tail (meno concorrenza, maggiore conversione)",
            "Ricerche locali"
          ],
          examples: [
            "“clinica dentale Sarajevo prezzi”",
            "“sviluppo web shop Bosnia”",
            "“ginecologo privato Tuzla”"
          ],
          examplesLabel: "Esempi di ricerca"
        },
        {
          title: "Ottimizzazione on-page",
          desc: "Ottimizziamo ogni elemento del sito affinché Google capisca chiaramente cosa offrite — e a chi.",
          items: ["Struttura dei contenuti (H1, H2, H3)", "Meta tag", "Struttura URL", "Link interni", "Testi SEO"]
        },
        {
          title: "SEO tecnico",
          desc: "Senza un sito tecnicamente corretto non c'è SEO serio.",
          items: ["Ottimizzazione della velocità", "Responsività mobile", "Indicizzazione e crawling", "Configurazione sitemap e robots", "Dati strutturati (schema)"]
        },
        {
          title: "Contenuti che si posizionano e vendono",
          desc: "Il SEO senza contenuti di qualità non esiste. Creiamo contenuti per gli utenti — non solo per Google.",
          items: ["Landing page", "Articoli del blog", "Contenuti educativi", "Testi SEO per servizi"]
        },
        {
          title: "Autorità e link building",
          desc: "Google classifica la fiducia. La costruiamo sistematicamente.",
          items: ["Backlink di qualità", "Pubblicazioni sui media", "Fonti rilevanti"]
        },
        {
          title: "SEO locale",
          desc: "Soprattutto per cliniche, saloni e attività di servizi — la chiave per la visibilità locale.",
          items: ["Profilo Google Business", "Risultati locali", "Visualizzazioni mappa", "Recensioni"]
        }
      ]
    },
    notForSeo: {
      title: "Non facciamo SEO per il gusto del SEO",
      notLabel: "Il nostro focus NON è",
      notItems: ["✘ “Più keyword”", "✘ “Più visite”"],
      yesLabel: "Il nostro focus È",
      yesItems: ["✔ Più richieste", "✔ Più chiamate", "✔ Più vendite"],
      bottom: "Il SEO è il mezzo —",
      bottomBold: "il risultato è l'obiettivo."
    },
    process: {
      title: "Processo di collaborazione",
      subtitle: "Il SEO non è un lavoro una tantum — è un processo continuo che porta risultati crescenti.",
      steps: [
        "Analisi dello stato attuale",
        "Audit SEO (tecnico + contenuti)",
        "Definizione della strategia",
        "Implementazione dell'ottimizzazione",
        "Creazione dei contenuti",
        "Monitoraggio e reportistica",
        "Miglioramento continuo"
      ]
    },
    whyUs: {
      title: "Perché Wizionar",
      items: [
        "Approccio strategico, non SEO generico",
        "Combinazione di sviluppo + marketing",
        "Focus sui risultati, non su metriche senza valore",
        "Esperienza con progetti e mercati reali",
        "Comunicazione trasparente"
      ]
    },
    faq: {
      title: "Domande frequenti",
      items: [
        { q: "Quanto tempo richiede il SEO?", a: "Il SEO è un processo a lungo termine. I primi risultati sono visibili in 3-6 mesi, ma i veri effetti arrivano con la continuità." },
        { q: "Garantite il primo posto su Google?", a: "No — perché nessuno serio può garantirlo. Ma garantiamo un approccio professionale, trasparenza e una crescita reale e misurabile." },
        { q: "Serve il SEO se facciamo già pubblicità?", a: "Sì — SEO e pubblicità insieme danno i migliori risultati. Il SEO riduce i costi pubblicitari a lungo termine e porta traffico organico." },
        { q: "Quanto costa l'ottimizzazione SEO?", a: "Il prezzo dipende dall'ambito del progetto, dalla concorrenza nel vostro settore e dagli obiettivi. Contattateci per una stima gratuita." },
        { q: "Fate solo SEO locale?", a: "No — facciamo SEO locale, regionale e internazionale. Adattiamo la strategia al vostro mercato e ai vostri obiettivi." }
      ]
    },
    cta: {
      pre: "Il vostro sito web esiste.",
      title: "È ora che inizi a",
      titleHighlight: "portare risultati.",
      button: "Richiedi analisi SEO",
      allServices: "Tutti i servizi"
    }
  }
};
const grafickiDizajnTranslations = {
  sr: {
    meta: { badge: "Grafički dizajn", title1: "Vizuelna rješenja koja", title2: "ostavljaju utisak", subtitle: "Od logotipa i brendinga do štampanih materijala i digitalnih grafika – kreiramo vizuelni identitet koji komunicira vašu priču i privlači pažnju.", cta: "Zatražite ponudu" },
    servicesTitle: "Šta sve",
    servicesTitleHighlight: "radimo",
    servicesSubtitle: "Pokrivamo sve aspekte grafičkog dizajna – od identiteta brenda do štampanih i digitalnih materijala.",
    services: [
      { title: "Logo & vizuelni identitet", description: "Kreiranje jedinstvenog logotipa i kompletnog vizuelnog identiteta koji predstavlja vaš brend.", examples: ["Logotip dizajn", "Brand book", "Paleta boja", "Tipografija", "Ikone & grafički elementi"] },
      { title: "Štampani materijali", description: "Profesionalni dizajn za sve vrste štampanih materijala – od vizitki do velikih formata.", examples: ["Vizitke", "Flajeri & brošure", "Plakati", "Katalozi", "Roll-up baneri"] },
      { title: "Social media grafike", description: "Vizualno privlačne grafike za društvene mreže koje povećavaju engagement i prepoznatljivost.", examples: ["Instagram postovi & stories", "Facebook coveri & oglasi", "LinkedIn grafike", "YouTube thumbnails", "TikTok vizuali"] },
      { title: "Packaging dizajn", description: "Atraktivan dizajn pakovanja koji privlači pažnju kupaca i ističe vaš proizvod na polici.", examples: ["Kutije & ambalaža", "Etikete", "Vrećice & kese", "Gift packaging", "Eco pakovanja"] },
      { title: "Prezentacije & dokumenti", description: "Profesionalne prezentacije i poslovni dokumenti koji ostavljaju snažan utisak.", examples: ["PowerPoint/Keynote prezentacije", "Ponude & prijedlozi", "Godišnji izvještaji", "E-knjige", "Infografike"] },
      { title: "Ilustracije & grafike", description: "Originalne ilustracije i grafički elementi prilagođeni vašem brendu i komunikaciji.", examples: ["Brendirane ilustracije", "Ikonice setovi", "Maskote", "Infografike", "Digitalne ilustracije"] },
      { title: "UI elementi & web grafike", description: "Grafički elementi za web stranice, aplikacije i digitalne platforme.", examples: ["Web baneri", "Newsletter dizajn", "App grafike", "Landing page vizuali", "Animirane grafike"] },
      { title: "Brendiranje prostora", description: "Vizuelni identitet primijenjen na fizičke prostore – od kancelarija do maloprodajnih objekata.", examples: ["Signalizacija & natpisi", "Brendiranje vozila", "Uniforma dizajn", "Izlozi", "Sajamski štandovi"] }
    ],
    process: [
      { step: "01", title: "Brifing", description: "Razumijevanje vaših potreba, ciljne grupe i vizije brenda." },
      { step: "02", title: "Istraživanje", description: "Analiza tržišta, konkurencije i aktuelnih trendova u dizajnu." },
      { step: "03", title: "Koncepti", description: "Kreiranje više konceptualnih rješenja za odabir pravca." },
      { step: "04", title: "Razrada", description: "Detaljna razrada odabranog koncepta sa svim varijacijama." },
      { step: "05", title: "Revizije", description: "Prilagodbe na osnovu vaših povratnih informacija." },
      { step: "06", title: "Finalizacija", description: "Priprema finalnih datoteka u svim potrebnim formatima." }
    ],
    processTitle: "Naš",
    processTitleHighlight: "proces",
    processSubtitle: "Strukturiran pristup koji garantuje kvalitetan rezultat u svakom koraku.",
    faqTitle: "Često postavljana",
    faqTitleHighlight: "pitanja",
    faqs: [
      { q: "Koliko traje izrada logotipa?", a: "Izrada logotipa obično traje 5-10 radnih dana, uključujući inicijalne koncepte i do 3 runde revizija." },
      { q: "Koje formate datoteka dobijam?", a: "Dobijate sve potrebne formate: AI, EPS, SVG, PDF za vektorske, te PNG i JPG u različitim rezolucijama za digitalne potrebe." },
      { q: "Da li radite kompletne brand bookove?", a: "Da, kreiramo kompletne brand bookove koji definišu pravila korištenja logotipa, boja, tipografije i vizuelnog stila." },
      { q: "Mogu li naručiti samo jednu grafiku za social media?", a: "Naravno! Radimo i pojedinačne grafike, ali nudimo i mjesečne pakete za redovnu produkciju social media sadržaja." },
      { q: "Radite li dizajn za štampu i digitalne medije?", a: "Da, pokrivamo oba područja – od vizitki i plakata za štampu do web banera i social media grafika za digitalni marketing." }
    ],
    ctaTitle: "Spremni za novi vizuelni identitet?",
    ctaSubtitle: "Kontaktirajte nas i zajedno ćemo kreirati dizajn koji će vaš brend učiniti prepoznatljivim.",
    imageAlt: "Primjer dizajna"
  },
  en: {
    meta: { badge: "Graphic Design", title1: "Visual solutions that", title2: "make an impact", subtitle: "From logos and branding to print materials and digital graphics – we create visual identity that communicates your story and captures attention.", cta: "Request a quote" },
    servicesTitle: "What we",
    servicesTitleHighlight: "do",
    servicesSubtitle: "We cover all aspects of graphic design – from brand identity to print and digital materials.",
    services: [
      { title: "Logo & Visual Identity", description: "Creating a unique logo and complete visual identity that represents your brand.", examples: ["Logo design", "Brand book", "Color palette", "Typography", "Icons & graphic elements"] },
      { title: "Print Materials", description: "Professional design for all types of print materials – from business cards to large formats.", examples: ["Business cards", "Flyers & brochures", "Posters", "Catalogs", "Roll-up banners"] },
      { title: "Social Media Graphics", description: "Visually appealing graphics for social networks that increase engagement and recognition.", examples: ["Instagram posts & stories", "Facebook covers & ads", "LinkedIn graphics", "YouTube thumbnails", "TikTok visuals"] },
      { title: "Packaging Design", description: "Attractive packaging design that catches buyers' attention and highlights your product on the shelf.", examples: ["Boxes & packaging", "Labels", "Bags", "Gift packaging", "Eco packaging"] },
      { title: "Presentations & Documents", description: "Professional presentations and business documents that leave a strong impression.", examples: ["PowerPoint/Keynote presentations", "Proposals", "Annual reports", "E-books", "Infographics"] },
      { title: "Illustrations & Graphics", description: "Original illustrations and graphic elements tailored to your brand and communication.", examples: ["Branded illustrations", "Icon sets", "Mascots", "Infographics", "Digital illustrations"] },
      { title: "UI Elements & Web Graphics", description: "Graphic elements for websites, applications, and digital platforms.", examples: ["Web banners", "Newsletter design", "App graphics", "Landing page visuals", "Animated graphics"] },
      { title: "Space Branding", description: "Visual identity applied to physical spaces – from offices to retail locations.", examples: ["Signage", "Vehicle branding", "Uniform design", "Window displays", "Exhibition stands"] }
    ],
    process: [
      { step: "01", title: "Briefing", description: "Understanding your needs, target audience, and brand vision." },
      { step: "02", title: "Research", description: "Market analysis, competition, and current design trends." },
      { step: "03", title: "Concepts", description: "Creating multiple conceptual solutions to choose a direction." },
      { step: "04", title: "Development", description: "Detailed development of the chosen concept with all variations." },
      { step: "05", title: "Revisions", description: "Adjustments based on your feedback." },
      { step: "06", title: "Finalization", description: "Preparing final files in all required formats." }
    ],
    processTitle: "Our",
    processTitleHighlight: "process",
    processSubtitle: "A structured approach that guarantees quality results at every step.",
    faqTitle: "Frequently asked",
    faqTitleHighlight: "questions",
    faqs: [
      { q: "How long does logo creation take?", a: "Logo creation typically takes 5-10 business days, including initial concepts and up to 3 rounds of revisions." },
      { q: "What file formats do I receive?", a: "You receive all necessary formats: AI, EPS, SVG, PDF for vector, and PNG and JPG in various resolutions for digital needs." },
      { q: "Do you create complete brand books?", a: "Yes, we create complete brand books that define the rules for using logos, colors, typography, and visual style." },
      { q: "Can I order just one social media graphic?", a: "Of course! We do individual graphics, but we also offer monthly packages for regular social media content production." },
      { q: "Do you design for both print and digital media?", a: "Yes, we cover both areas – from business cards and posters for print to web banners and social media graphics for digital marketing." }
    ],
    ctaTitle: "Ready for a new visual identity?",
    ctaSubtitle: "Contact us and together we'll create a design that will make your brand recognizable.",
    imageAlt: "Design example"
  },
  de: {
    meta: { badge: "Grafikdesign", title1: "Visuelle Lösungen, die", title2: "Eindruck hinterlassen", subtitle: "Von Logos und Branding bis hin zu Druckmaterialien und digitalen Grafiken – wir schaffen visuelle Identität, die Ihre Geschichte kommuniziert und Aufmerksamkeit erregt.", cta: "Angebot anfordern" },
    servicesTitle: "Was wir",
    servicesTitleHighlight: "machen",
    servicesSubtitle: "Wir decken alle Aspekte des Grafikdesigns ab – von der Markenidentität bis zu Print- und Digitalmedien.",
    services: [
      { title: "Logo & visuelle Identität", description: "Erstellung eines einzigartigen Logos und einer vollständigen visuellen Identität, die Ihre Marke repräsentiert.", examples: ["Logo-Design", "Brand Book", "Farbpalette", "Typografie", "Icons & grafische Elemente"] },
      { title: "Druckmaterialien", description: "Professionelles Design für alle Arten von Druckmaterialien – von Visitenkarten bis Großformate.", examples: ["Visitenkarten", "Flyer & Broschüren", "Plakate", "Kataloge", "Roll-up-Banner"] },
      { title: "Social-Media-Grafiken", description: "Visuell ansprechende Grafiken für soziale Netzwerke, die Engagement und Wiedererkennung steigern.", examples: ["Instagram-Posts & Stories", "Facebook-Cover & Anzeigen", "LinkedIn-Grafiken", "YouTube-Thumbnails", "TikTok-Visuals"] },
      { title: "Verpackungsdesign", description: "Attraktives Verpackungsdesign, das die Aufmerksamkeit der Käufer auf sich zieht.", examples: ["Schachteln & Verpackungen", "Etiketten", "Tüten", "Geschenkverpackungen", "Öko-Verpackungen"] },
      { title: "Präsentationen & Dokumente", description: "Professionelle Präsentationen und Geschäftsdokumente, die einen starken Eindruck hinterlassen.", examples: ["PowerPoint/Keynote-Präsentationen", "Angebote", "Jahresberichte", "E-Books", "Infografiken"] },
      { title: "Illustrationen & Grafiken", description: "Originale Illustrationen und grafische Elemente, die auf Ihre Marke zugeschnitten sind.", examples: ["Markenillustrationen", "Icon-Sets", "Maskottchen", "Infografiken", "Digitale Illustrationen"] },
      { title: "UI-Elemente & Web-Grafiken", description: "Grafische Elemente für Websites, Anwendungen und digitale Plattformen.", examples: ["Web-Banner", "Newsletter-Design", "App-Grafiken", "Landing-Page-Visuals", "Animierte Grafiken"] },
      { title: "Raumbranding", description: "Visuelle Identität für physische Räume – von Büros bis zu Einzelhandelsgeschäften.", examples: ["Beschilderung", "Fahrzeugbranding", "Uniformdesign", "Schaufenster", "Messestände"] }
    ],
    process: [
      { step: "01", title: "Briefing", description: "Verstehen Ihrer Bedürfnisse, Zielgruppe und Markenvision." },
      { step: "02", title: "Recherche", description: "Marktanalyse, Wettbewerb und aktuelle Designtrends." },
      { step: "03", title: "Konzepte", description: "Erstellung mehrerer konzeptioneller Lösungen zur Richtungswahl." },
      { step: "04", title: "Ausarbeitung", description: "Detaillierte Ausarbeitung des gewählten Konzepts mit allen Variationen." },
      { step: "05", title: "Revisionen", description: "Anpassungen basierend auf Ihrem Feedback." },
      { step: "06", title: "Finalisierung", description: "Vorbereitung der finalen Dateien in allen erforderlichen Formaten." }
    ],
    processTitle: "Unser",
    processTitleHighlight: "Prozess",
    processSubtitle: "Ein strukturierter Ansatz, der in jedem Schritt qualitativ hochwertige Ergebnisse garantiert.",
    faqTitle: "Häufig gestellte",
    faqTitleHighlight: "Fragen",
    faqs: [
      { q: "Wie lange dauert die Logo-Erstellung?", a: "Die Logo-Erstellung dauert in der Regel 5-10 Werktage, einschließlich erster Konzepte und bis zu 3 Überarbeitungsrunden." },
      { q: "Welche Dateiformate erhalte ich?", a: "Sie erhalten alle benötigten Formate: AI, EPS, SVG, PDF für Vektoren sowie PNG und JPG in verschiedenen Auflösungen." },
      { q: "Erstellen Sie komplette Brand Books?", a: "Ja, wir erstellen komplette Brand Books, die die Regeln für Logo, Farben, Typografie und visuellen Stil definieren." },
      { q: "Kann ich nur eine einzelne Social-Media-Grafik bestellen?", a: "Natürlich! Wir erstellen auch einzelne Grafiken, bieten aber auch Monatspakete für regelmäßige Social-Media-Inhalte an." },
      { q: "Gestalten Sie für Print und digitale Medien?", a: "Ja, wir decken beide Bereiche ab – von Visitenkarten und Plakaten für den Druck bis hin zu Web-Bannern und Social-Media-Grafiken." }
    ],
    ctaTitle: "Bereit für eine neue visuelle Identität?",
    ctaSubtitle: "Kontaktieren Sie uns und gemeinsam schaffen wir ein Design, das Ihre Marke unverwechselbar macht.",
    imageAlt: "Designbeispiel"
  },
  it: {
    meta: { badge: "Design Grafico", title1: "Soluzioni visive che", title2: "lasciano il segno", subtitle: "Dai loghi e branding ai materiali stampati e grafiche digitali – creiamo identità visiva che comunica la vostra storia e cattura l'attenzione.", cta: "Richiedi un preventivo" },
    servicesTitle: "Cosa",
    servicesTitleHighlight: "facciamo",
    servicesSubtitle: "Copriamo tutti gli aspetti del design grafico – dall'identità del marchio ai materiali stampati e digitali.",
    services: [
      { title: "Logo & Identità visiva", description: "Creazione di un logo unico e un'identità visiva completa che rappresenta il vostro marchio.", examples: ["Design del logo", "Brand book", "Palette colori", "Tipografia", "Icone & elementi grafici"] },
      { title: "Materiali stampati", description: "Design professionale per tutti i tipi di materiali stampati – dai biglietti da visita ai grandi formati.", examples: ["Biglietti da visita", "Volantini & brochure", "Poster", "Cataloghi", "Banner roll-up"] },
      { title: "Grafiche social media", description: "Grafiche visivamente accattivanti per i social network che aumentano engagement e riconoscibilità.", examples: ["Post & stories Instagram", "Cover & inserzioni Facebook", "Grafiche LinkedIn", "Miniature YouTube", "Visual TikTok"] },
      { title: "Design packaging", description: "Design attraente del packaging che cattura l'attenzione degli acquirenti.", examples: ["Scatole & confezioni", "Etichette", "Sacchetti", "Confezioni regalo", "Packaging ecologico"] },
      { title: "Presentazioni & documenti", description: "Presentazioni professionali e documenti aziendali che lasciano una forte impressione.", examples: ["Presentazioni PowerPoint/Keynote", "Proposte", "Report annuali", "E-book", "Infografiche"] },
      { title: "Illustrazioni & grafiche", description: "Illustrazioni originali ed elementi grafici su misura per il vostro marchio.", examples: ["Illustrazioni brandizzate", "Set di icone", "Mascotte", "Infografiche", "Illustrazioni digitali"] },
      { title: "Elementi UI & grafiche web", description: "Elementi grafici per siti web, applicazioni e piattaforme digitali.", examples: ["Banner web", "Design newsletter", "Grafiche app", "Visual landing page", "Grafiche animate"] },
      { title: "Branding degli spazi", description: "Identità visiva applicata agli spazi fisici – dagli uffici ai punti vendita.", examples: ["Segnaletica", "Branding veicoli", "Design uniformi", "Vetrine", "Stand fieristici"] }
    ],
    process: [
      { step: "01", title: "Briefing", description: "Comprensione delle vostre esigenze, target e visione del marchio." },
      { step: "02", title: "Ricerca", description: "Analisi del mercato, concorrenza e tendenze attuali nel design." },
      { step: "03", title: "Concetti", description: "Creazione di molteplici soluzioni concettuali per scegliere una direzione." },
      { step: "04", title: "Sviluppo", description: "Sviluppo dettagliato del concetto scelto con tutte le variazioni." },
      { step: "05", title: "Revisioni", description: "Adattamenti basati sul vostro feedback." },
      { step: "06", title: "Finalizzazione", description: "Preparazione dei file finali in tutti i formati necessari." }
    ],
    processTitle: "Il nostro",
    processTitleHighlight: "processo",
    processSubtitle: "Un approccio strutturato che garantisce risultati di qualità in ogni fase.",
    faqTitle: "Domande",
    faqTitleHighlight: "frequenti",
    faqs: [
      { q: "Quanto tempo richiede la creazione di un logo?", a: "La creazione di un logo richiede generalmente 5-10 giorni lavorativi, inclusi i concetti iniziali e fino a 3 cicli di revisione." },
      { q: "Quali formati di file ricevo?", a: "Ricevete tutti i formati necessari: AI, EPS, SVG, PDF per vettoriali, e PNG e JPG in varie risoluzioni per esigenze digitali." },
      { q: "Create brand book completi?", a: "Sì, creiamo brand book completi che definiscono le regole per l'uso di logo, colori, tipografia e stile visivo." },
      { q: "Posso ordinare una sola grafica per social media?", a: "Certamente! Realizziamo anche grafiche singole, ma offriamo anche pacchetti mensili per la produzione regolare di contenuti social." },
      { q: "Progettate per stampa e media digitali?", a: "Sì, copriamo entrambe le aree – dai biglietti da visita e poster per la stampa ai banner web e grafiche social per il marketing digitale." }
    ],
    ctaTitle: "Pronti per una nuova identità visiva?",
    ctaSubtitle: "Contattateci e insieme creeremo un design che renderà il vostro marchio riconoscibile.",
    imageAlt: "Esempio di design"
  }
};
const webdevTranslations = {
  sr: {
    meta: {
      title: "Izrada web stranica i web shopova | Wizionar",
      description: "Profesionalna izrada web stranica, landing stranica i web shopova. Moderan dizajn, brze performanse, SEO optimizacija. Wizionar digitalna agencija."
    },
    hero: {
      badge: "Izrada web stranica & web shopova",
      title1: "Vaš biznis zaslužuje web prisustvo koje",
      titleHighlight: "donosi rezultate",
      subtitle: "Ne pravimo „samo sajtove“. Gradimo digitalna rješenja koja privlače klijente, grade povjerenje i pretvaraju posjetioce u kupce – bilo da vam treba prezentacioni sajt, landing stranica ili kompletan web shop.",
      cta1: "Zatražite besplatnu ponudu",
      cta2: "Pogledajte naše radove",
      microcopy: "Odgovaramo u roku 24h · Besplatna konsultacija · Bez skrivenih troškova"
    },
    whyNeeded: {
      title: "Zašto je profesionalan web sajt",
      titleHighlight: "neophodan",
      titleEnd: "za ozbiljan biznis?",
      subtitle: "U digitalnom dobu, vaš web sajt je često prvi kontakt koji potencijalni klijent ima sa vašim brendom. Loš ili zastarjeo sajt ne samo da odbija posjetioce – on aktivno šteti vašem poslovanju. Profesionalna web prezentacija gradi kredibilitet, privlači nove klijente i radi za vas 24/7.",
      items: [
        { title: "Vidljivost", text: "93% kupovnih odluka počinje online pretragom. Ako vas nema na internetu – za vaše klijente, vi ne postojite." },
        { title: "Kredibilitet", text: "75% korisnika procjenjuje pouzdanost firme na osnovu dizajna njenog web sajta. Prvi utisak se stvara za 0.05 sekundi." },
        { title: "Rast", text: "Profesionalan sajt je najisplativija investicija u marketing. Radi za vas non-stop, generiše upite i gradi brend." }
      ]
    },
    siteTypes: {
      badge: "Šta radimo",
      title: "Tipovi web rješenja koja nudimo",
      subtitle: "Svaki projekat pristupamo individualno – od jednostavnih prezentacija do kompleksnih e-commerce platformi.",
      items: [
        { title: "Prezentacione web stranice", desc: "Profesionalna online vizit-karta vašeg biznisa. Jasna struktura, moderan dizajn i sve informacije koje potencijalnom klijentu trebaju – na dohvat klika." },
        { title: "Korporativni sajtovi", desc: "Kompleksni višestranični sajtovi za veće kompanije. Interni portali, višejezičnost, napredne integracije i sadržaj koji gradi autoritet brenda." },
        { title: "Landing page stranice", desc: "Fokusirane stranice dizajnirane za jednu stvar – konverziju. Idealne za kampanje, promocije, lansiranja proizvoda ili prikupljanje upita." },
        { title: "Kataloški sajtovi", desc: "Prikazujte proizvode ili usluge u elegantnom digitalnom katalogu – bez online plaćanja, ali sa svim informacijama koje klijent treba." },
        { title: "Web shopovi / E-commerce", desc: "Kompletna rješenja za online prodaju. Od pregleda proizvoda, korpe i checkout-a do integracije plaćanja i automatskog praćenja narudžbi." }
      ]
    },
    cmsVsCustom: {
      title: "CMS ili Custom razvoj?",
      subtitle: "Nema univerzalnog odgovora. Pravo rješenje zavisi od vaših potreba, budžeta i faze razvoja biznisa.",
      cms: {
        title: "CMS rješenja",
        badge: "WordPress, Shopify i slični sistemi",
        desc: "Idealna opcija kada vam treba brzo, provjereno i ekonomično rješenje. CMS platforme nude bogat ekosistem dodataka, lako upravljanje sadržajem i brži time-to-market. Savršeno za prezentacione sajtove, blogove i standardne web shopove.",
        features: ["Brža realizacija", "Niži početni troškovi", "Lako upravljanje sadržajem", "Hiljade gotovih dodataka", "Dobro za standardne potrebe"]
      },
      custom: {
        title: "Custom razvoj",
        badge: "Potpuno prilagođena rješenja",
        label: "Premium",
        desc: "Kada vam treba nešto što gotovi sistemi ne mogu ponuditi. Custom razvoj znači potpunu kontrolu nad dizajnom, funkcionalnošću i performansama. Idealno za kompleksne poslovne platforme, specifične integracije i projekte koji trebaju rasti bez ograničenja.",
        features: ["Potpuna prilagodba vašim procesima", "Neograničena skalabilnost", "Maksimalne performanse", "Jedinstveno korisničko iskustvo", "Dugoročna investicija"]
      }
    },
    whatYouGet: {
      title: "Šta sve dobijate?",
      subtitle: "Svaki projekat uključuje komplet profesionalnih usluga – od dizajna i razvoja do optimizacije i podrške.",
      items: ["UI/UX dizajn", "Responzivan izgled", "SEO osnova", "Brzina & optimizacija", "Kontakt forme", "Integracije", "Blog", "Višejezičnost", "Online plaćanje", "Upravljanje proizvodima", "Analitika", "Sigurnost", "Podrška & održavanje", "Optimizirane slike"]
    },
    shop: {
      badge: "E-commerce",
      title: "Sve što vaš web shop treba",
      subtitle: "Gradimo online prodavnice koje ne samo da izgledaju profesionalno, već su optimizirane za konverziju i jednostavno upravljanje.",
      items: [
        { label: "Pregled proizvoda", desc: "Galerije, varijante, brz pregled" },
        { label: "Kategorije & filteri", desc: "Navigacija koja olakšava kupovinu" },
        { label: "Korpa & checkout", desc: "Jednostavan tok narudžbe" },
        { label: "Načini plaćanja", desc: "Kartice, pouzeće, transfer" },
        { label: "Dostava", desc: "Integracija kurirskih službi" },
        { label: "Akcije & popusti", desc: "Kuponi, sezonske ponude" },
        { label: "Administracija", desc: "Jednostavan backend panel" },
        { label: "Praćenje narudžbi", desc: "Status od narudžbe do isporuke" }
      ]
    },
    results: {
      title1: "Ne pravimo samo „lijep sajt“.",
      title2: "Pravimo",
      titleHighlight: "digitalni alat za rast.",
      items: [
        "Više telefonskih upita i kontakata",
        "Više poruka i zahtjeva za ponudu",
        "Više online prodaje i narudžbi",
        "Jače povjerenje i kredibilitet brenda",
        "Bolja prezentacija pred klijentima",
        "Mjerljivi rezultati i ROI"
      ]
    },
    process: {
      badge: "Proces",
      title: "Kako izgleda proces saradnje?",
      subtitle: "Svaki projekat prolazi kroz jasno definisane faze – od prvog razgovora do lansiranja i podrške.",
      steps: [
        { title: "Upoznavanje", desc: "Razgovaramo o vašim ciljevima, ciljnoj publici, konkurenciji i viziji. Razumijemo vaš biznis prije nego uopšte krenemo." },
        { title: "Analiza & prijedlog", desc: "Na osnovu vaših potreba kreiramo detaljan prijedlog – strukturu, funkcionalnosti, tehnologiju i okvirni budžet." },
        { title: "Dizajn & struktura", desc: "Kreiramo wireframe i vizualni dizajn. Vi vidite kako će sajt izgledati prije nego se napiše i jedna linija koda." },
        { title: "Razvoj & implementacija", desc: "Pretvaramo dizajn u funkcionalan sajt. Svaka stranica, svaka animacija, svaka integracija – precizno i po planu." },
        { title: "Testiranje", desc: "Testiramo na svim uređajima i browserima. Provjeravamo brzinu, sigurnost, SEO i korisničko iskustvo." },
        { title: "Lansiranje", desc: "Postavljamo sajt na server, konfiguarišemo domenu, SSL i sve tehničke detalje. Vaš sajt je live." },
        { title: "Podrška & razvoj", desc: "Ne ostavljamo vas nakon lansiranja. Nudimo tehničku podršku, update-e, nove funkcionalnosti i savjete za rast." }
      ]
    },
    advantages: {
      title: "Zašto baš mi?",
      subtitle: "Prednosti saradnje sa Wizionar timom.",
      items: [
        { title: "Iskustvo u različitim industrijama", desc: "Zdravstvo, finansije, usluge, e-commerce – razumijemo specifičnosti svake branše." },
        { title: "Fokus na rezultate", desc: "Ne pravimo sajtove radi sajtova. Svaki projekat je osmišljen da donosi upite, pozive i prodaju." },
        { title: "Direktna komunikacija", desc: "Radite sa timom, ne sa automatskim email-ovima. Brzi odgovori, jasna komunikacija, transparentan proces." },
        { title: "Skalabilna rješenja", desc: "Gradimo sisteme koji rastu sa vašim biznisom – od jednostavnog sajta do kompleksne platforme." },
        { title: "Poštovanje rokova", desc: "Jasne faze, realni rokovi i redovna izvještavanja o napretku projekta." },
        { title: "Sigurnost & pouzdanost", desc: "HTTPS, backup, zaštita od napada i redovno održavanje – vaši podaci su sigurni." }
      ]
    },
    portfolio: {
      badge: "Portfolio",
      title: "Neki od naših radova",
      subtitle: "Pogledajte primjere projekata koje smo realizovali za naše klijente.",
      visitSite: "Posjeti sajt"
    },
    faq: {
      title: "Česta pitanja",
      subtitle: "Odgovori na najčešća pitanja naših klijenata.",
      items: [
        { q: "Koliko košta izrada web stranice?", a: "Cijena zavisi od kompleksnosti, broja stranica, funkcionalnosti i dizajna. Prezentacioni sajt kreće od 500 KM, dok kompleksni web shopovi mogu koštati više. Kontaktirajte nas za besplatnu procjenu." },
        { q: "Koliko traje izrada sajta?", a: "Jednostavna prezentaciona stranica može biti gotova za 2-3 sedmice. Kompleksniji projekti i web shopovi obično traju 4-8 sedmica. Tačan rok dogovaramo nakon analize zahtjeva." },
        { q: "Da li mogu sam upravljati sadržajem nakon izrade?", a: "Apsolutno. Svaki sajt dolazi sa admin panelom (CMS) putem kojeg možete sami uređivati tekstove, slike, proizvode i ostali sadržaj – bez tehničkog znanja." },
        { q: "Šta je razlika između CMS i custom rješenja?", a: "CMS (npr. WordPress) je brže i jeftinije za standardne potrebe. Custom rješenje se gradi od nule, potpuno prilagođeno vašim procesima – idealno kada trebate nešto što gotovi sistemi ne nude." },
        { q: "Da li pružate podršku nakon izrade?", a: "Da. Nudimo pakete tehničke podrške koji uključuju ažuriranja, backup, sigurnosne zakrpe, nove funkcionalnosti i savjetovanje za dalji digitalni rast." },
        { q: "Da li sajt uključuje SEO optimizaciju?", a: "Da. Svaki projekat uključuje tehničku SEO osnovu – brzina, meta tagovi, strukturirani podaci, mobile-friendly dizajn. Za napredne SEO kampanje nudimo posebnu uslugu." },
        { q: "Da li radite i redizajn postojećih sajtova?", a: "Da. Analiziramo vaš trenutni sajt, identificiramo slabosti i predlažemo moderna rješenja – od vizualnog osvježenja do kompletne rekonstrukcije." }
      ]
    },
    cta: {
      title: "Spremni da pokrenete svoj",
      titleHighlight: "digitalni projekat?",
      subtitle: "Bez obzira da li vam treba jednostavan prezentacioni sajt ili kompleksan web shop – tu smo da pretvorimo vašu ideju u profesionalno digitalno rješenje koje donosi rezultate.",
      email: "info@wizionar.com",
      phone: "Pozovite me",
      quote: "Zatraži ponudu",
      microcopy: "Besplatna konsultacija · Odgovaramo u roku 24h · Ponuda bez obaveze"
    }
  },
  en: {
    meta: {
      title: "Website & Web Shop Development | Wizionar",
      description: "Professional website, landing page and web shop development. Modern design, fast performance, SEO optimization. Wizionar digital agency."
    },
    hero: {
      badge: "Website & Web Shop Development",
      title1: "Your business deserves a web presence that",
      titleHighlight: "delivers results",
      subtitle: "We don’t just build websites. We create digital solutions that attract clients, build trust and turn visitors into customers – whether you need a presentation site, landing page or a complete web shop.",
      cta1: "Request a free quote",
      cta2: "View our work",
      microcopy: "We respond within 24h · Free consultation · No hidden costs"
    },
    whyNeeded: {
      title: "Why a professional website is",
      titleHighlight: "essential",
      titleEnd: "for serious business?",
      subtitle: "In the digital age, your website is often the first contact a potential client has with your brand. A poor or outdated site doesn’t just repel visitors – it actively harms your business. A professional web presence builds credibility, attracts new clients and works for you 24/7.",
      items: [
        { title: "Visibility", text: "93% of purchasing decisions begin with an online search. If you’re not on the internet – for your clients, you don’t exist." },
        { title: "Credibility", text: "75% of users judge a company’s reliability based on its website design. First impressions are formed in 0.05 seconds." },
        { title: "Growth", text: "A professional website is the most cost-effective marketing investment. It works for you non-stop, generates inquiries and builds your brand." }
      ]
    },
    siteTypes: {
      badge: "What we do",
      title: "Types of web solutions we offer",
      subtitle: "We approach every project individually – from simple presentations to complex e-commerce platforms.",
      items: [
        { title: "Presentation websites", desc: "A professional online business card for your company. Clear structure, modern design and all the information a potential client needs – at their fingertips." },
        { title: "Corporate websites", desc: "Complex multi-page sites for larger companies. Internal portals, multilingual support, advanced integrations and content that builds brand authority." },
        { title: "Landing pages", desc: "Focused pages designed for one thing – conversion. Ideal for campaigns, promotions, product launches or collecting inquiries." },
        { title: "Catalog websites", desc: "Display products or services in an elegant digital catalog – without online payment, but with all the information a client needs." },
        { title: "Web shops / E-commerce", desc: "Complete solutions for online sales. From product browsing, cart and checkout to payment integration and automatic order tracking." }
      ]
    },
    cmsVsCustom: {
      title: "CMS or Custom development?",
      subtitle: "There’s no universal answer. The right solution depends on your needs, budget and business development stage.",
      cms: {
        title: "CMS solutions",
        badge: "WordPress, Shopify and similar systems",
        desc: "The ideal option when you need a fast, proven and economical solution. CMS platforms offer a rich plugin ecosystem, easy content management and faster time-to-market. Perfect for presentation sites, blogs and standard web shops.",
        features: ["Faster implementation", "Lower initial costs", "Easy content management", "Thousands of ready plugins", "Good for standard needs"]
      },
      custom: {
        title: "Custom development",
        badge: "Fully tailored solutions",
        label: "Premium",
        desc: "When you need something that ready-made systems can’t offer. Custom development means full control over design, functionality and performance. Ideal for complex business platforms, specific integrations and projects that need to scale without limits.",
        features: ["Full adaptation to your processes", "Unlimited scalability", "Maximum performance", "Unique user experience", "Long-term investment"]
      }
    },
    whatYouGet: {
      title: "What do you get?",
      subtitle: "Every project includes a complete set of professional services – from design and development to optimization and support.",
      items: ["UI/UX design", "Responsive layout", "SEO foundation", "Speed & optimization", "Contact forms", "Integrations", "Blog", "Multilingual", "Online payment", "Product management", "Analytics", "Security", "Support & maintenance", "Optimized images"]
    },
    shop: {
      badge: "E-commerce",
      title: "Everything your web shop needs",
      subtitle: "We build online stores that not only look professional but are optimized for conversion and easy management.",
      items: [
        { label: "Product browsing", desc: "Galleries, variants, quick view" },
        { label: "Categories & filters", desc: "Navigation that makes shopping easy" },
        { label: "Cart & checkout", desc: "Simple order flow" },
        { label: "Payment methods", desc: "Cards, cash on delivery, transfer" },
        { label: "Delivery", desc: "Courier service integration" },
        { label: "Promotions & discounts", desc: "Coupons, seasonal offers" },
        { label: "Administration", desc: "Simple backend panel" },
        { label: "Order tracking", desc: "Status from order to delivery" }
      ]
    },
    results: {
      title1: 'We don’t just make "a pretty website".',
      title2: "We build a",
      titleHighlight: "digital growth tool.",
      items: [
        "More phone inquiries and contacts",
        "More messages and quote requests",
        "More online sales and orders",
        "Stronger trust and brand credibility",
        "Better presentation to clients",
        "Measurable results and ROI"
      ]
    },
    process: {
      badge: "Process",
      title: "What does the collaboration process look like?",
      subtitle: "Every project goes through clearly defined phases – from the first conversation to launch and support.",
      steps: [
        { title: "Discovery", desc: "We discuss your goals, target audience, competition and vision. We understand your business before we even start." },
        { title: "Analysis & proposal", desc: "Based on your needs, we create a detailed proposal – structure, features, technology and estimated budget." },
        { title: "Design & structure", desc: "We create wireframes and visual design. You see how the site will look before a single line of code is written." },
        { title: "Development & implementation", desc: "We turn design into a functional website. Every page, every animation, every integration – precise and on plan." },
        { title: "Testing", desc: "We test on all devices and browsers. We check speed, security, SEO and user experience." },
        { title: "Launch", desc: "We deploy the site, configure the domain, SSL and all technical details. Your site is live." },
        { title: "Support & growth", desc: "We don’t leave you after launch. We offer technical support, updates, new features and growth advice." }
      ]
    },
    advantages: {
      title: "Why choose us?",
      subtitle: "Advantages of working with the Wizionar team.",
      items: [
        { title: "Experience across industries", desc: "Healthcare, finance, services, e-commerce – we understand the specifics of each industry." },
        { title: "Focus on results", desc: "We don’t make websites for the sake of it. Every project is designed to generate inquiries, calls and sales." },
        { title: "Direct communication", desc: "You work with a team, not automated emails. Fast responses, clear communication, transparent process." },
        { title: "Scalable solutions", desc: "We build systems that grow with your business – from a simple site to a complex platform." },
        { title: "Deadline respect", desc: "Clear phases, realistic deadlines and regular progress reports." },
        { title: "Security & reliability", desc: "HTTPS, backup, attack protection and regular maintenance – your data is safe." }
      ]
    },
    portfolio: {
      badge: "Portfolio",
      title: "Some of our work",
      subtitle: "View examples of projects we’ve completed for our clients.",
      visitSite: "Visit site"
    },
    faq: {
      title: "Frequently asked questions",
      subtitle: "Answers to the most common questions from our clients.",
      items: [
        { q: "How much does a website cost?", a: "The price depends on complexity, number of pages, features and design. A presentation site starts from 500 BAM, while complex web shops may cost more. Contact us for a free estimate." },
        { q: "How long does it take to build a website?", a: "A simple presentation page can be ready in 2-3 weeks. More complex projects and web shops usually take 4-8 weeks. The exact deadline is agreed upon after requirements analysis." },
        { q: "Can I manage the content myself after development?", a: "Absolutely. Every site comes with an admin panel (CMS) through which you can edit texts, images, products and other content – without technical knowledge." },
        { q: "What’s the difference between CMS and custom solutions?", a: "CMS (e.g. WordPress) is faster and cheaper for standard needs. A custom solution is built from scratch, fully adapted to your processes – ideal when you need something off-the-shelf systems don’t offer." },
        { q: "Do you provide support after development?", a: "Yes. We offer technical support packages that include updates, backups, security patches, new features and consulting for further digital growth." },
        { q: "Does the website include SEO optimization?", a: "Yes. Every project includes a technical SEO foundation – speed, meta tags, structured data, mobile-friendly design. For advanced SEO campaigns we offer a separate service." },
        { q: "Do you also do redesigns of existing websites?", a: "Yes. We analyze your current site, identify weaknesses and propose modern solutions – from a visual refresh to a complete reconstruction." }
      ]
    },
    cta: {
      title: "Ready to launch your",
      titleHighlight: "digital project?",
      subtitle: "Whether you need a simple presentation site or a complex web shop – we’re here to turn your idea into a professional digital solution that delivers results.",
      email: "info@wizionar.com",
      phone: "Call me",
      quote: "Request a quote",
      microcopy: "Free consultation · We respond within 24h · No-obligation quote"
    }
  },
  de: {
    meta: {
      title: "Webseiten- & Webshop-Entwicklung | Wizionar",
      description: "Professionelle Webseiten-, Landing-Page- und Webshop-Entwicklung. Modernes Design, schnelle Performance, SEO-Optimierung. Wizionar Digitalagentur."
    },
    hero: {
      badge: "Webseiten- & Webshop-Entwicklung",
      title1: "Ihr Unternehmen verdient eine Webpräsenz, die",
      titleHighlight: "Ergebnisse liefert",
      subtitle: "Wir bauen nicht „nur Websites“. Wir schaffen digitale Lösungen, die Kunden anziehen, Vertrauen aufbauen und Besucher in Käufer verwandeln – egal ob Sie eine Präsentationsseite, Landing Page oder einen kompletten Webshop benötigen.",
      cta1: "Kostenloses Angebot anfordern",
      cta2: "Unsere Arbeiten ansehen",
      microcopy: "Antwort innerhalb 24h · Kostenlose Beratung · Keine versteckten Kosten"
    },
    whyNeeded: {
      title: "Warum eine professionelle Website",
      titleHighlight: "unverzichtbar",
      titleEnd: "für seriöses Geschäft ist?",
      subtitle: "Im digitalen Zeitalter ist Ihre Website oft der erste Kontakt, den ein potenzieller Kunde mit Ihrer Marke hat. Eine schlechte oder veraltete Seite schreckt nicht nur Besucher ab – sie schadet aktiv Ihrem Geschäft. Eine professionelle Webpräsenz baut Glaubwürdigkeit auf, zieht neue Kunden an und arbeitet für Sie 24/7.",
      items: [
        { title: "Sichtbarkeit", text: "93% der Kaufentscheidungen beginnen mit einer Online-Suche. Wenn Sie nicht im Internet sind – für Ihre Kunden existieren Sie nicht." },
        { title: "Glaubwürdigkeit", text: "75% der Nutzer beurteilen die Zuverlässigkeit eines Unternehmens anhand des Website-Designs. Der erste Eindruck entsteht in 0,05 Sekunden." },
        { title: "Wachstum", text: "Eine professionelle Website ist die kosteneffektivste Marketing-Investition. Sie arbeitet rund um die Uhr, generiert Anfragen und baut Ihre Marke auf." }
      ]
    },
    siteTypes: {
      badge: "Was wir tun",
      title: "Arten von Weblösungen, die wir anbieten",
      subtitle: "Wir gehen jedes Projekt individuell an – von einfachen Präsentationen bis hin zu komplexen E-Commerce-Plattformen.",
      items: [
        { title: "Präsentationswebsites", desc: "Eine professionelle Online-Visitenkarte für Ihr Unternehmen. Klare Struktur, modernes Design und alle Informationen, die ein potenzieller Kunde braucht." },
        { title: "Unternehmenswebsites", desc: "Komplexe mehrseitige Websites für größere Unternehmen. Interne Portale, Mehrsprachigkeit, erweiterte Integrationen und Inhalte, die Markenautoriät aufbauen." },
        { title: "Landing Pages", desc: "Fokussierte Seiten, die für eines konzipiert sind – Konversion. Ideal für Kampagnen, Aktionen, Produkteinführungen oder die Sammlung von Anfragen." },
        { title: "Katalog-Websites", desc: "Präsentieren Sie Produkte oder Dienstleistungen in einem eleganten digitalen Katalog – ohne Online-Zahlung, aber mit allen Informationen, die der Kunde braucht." },
        { title: "Webshops / E-Commerce", desc: "Komplettlösungen für den Online-Verkauf. Vom Produktkatalog, Warenkorb und Checkout bis zur Zahlungsintegration und automatischen Auftragsverfolgung." }
      ]
    },
    cmsVsCustom: {
      title: "CMS oder Custom-Entwicklung?",
      subtitle: "Es gibt keine universelle Antwort. Die richtige Lösung hängt von Ihren Bedürfnissen, Ihrem Budget und Ihrer Geschäftsentwicklungsphase ab.",
      cms: {
        title: "CMS-Lösungen",
        badge: "WordPress, Shopify und ähnliche Systeme",
        desc: "Die ideale Option, wenn Sie eine schnelle, bewährte und wirtschaftliche Lösung benötigen. CMS-Plattformen bieten ein reichhaltiges Plugin-Ökosystem, einfaches Content-Management und schnellere Markteinführung.",
        features: ["Schnellere Umsetzung", "Niedrigere Anfangskosten", "Einfaches Content-Management", "Tausende fertige Plugins", "Gut für Standardbedürfnisse"]
      },
      custom: {
        title: "Custom-Entwicklung",
        badge: "Vollständig maßgeschneiderte Lösungen",
        label: "Premium",
        desc: "Wenn Sie etwas benötigen, das fertige Systeme nicht bieten können. Custom-Entwicklung bedeutet volle Kontrolle über Design, Funktionalität und Performance.",
        features: ["Vollständige Anpassung an Ihre Prozesse", "Unbegrenzte Skalierbarkeit", "Maximale Performance", "Einzigartiges Benutzererlebnis", "Langfristige Investition"]
      }
    },
    whatYouGet: {
      title: "Was bekommen Sie?",
      subtitle: "Jedes Projekt umfasst ein komplettes Set professioneller Dienstleistungen – vom Design und Entwicklung bis zur Optimierung und Support.",
      items: ["UI/UX-Design", "Responsives Layout", "SEO-Grundlage", "Geschwindigkeit & Optimierung", "Kontaktformulare", "Integrationen", "Blog", "Mehrsprachigkeit", "Online-Zahlung", "Produktverwaltung", "Analytik", "Sicherheit", "Support & Wartung", "Optimierte Bilder"]
    },
    shop: {
      badge: "E-Commerce",
      title: "Alles, was Ihr Webshop braucht",
      subtitle: "Wir bauen Online-Shops, die nicht nur professionell aussehen, sondern für Konversion und einfache Verwaltung optimiert sind.",
      items: [
        { label: "Produktanzeige", desc: "Galerien, Varianten, Schnellansicht" },
        { label: "Kategorien & Filter", desc: "Navigation, die das Einkaufen erleichtert" },
        { label: "Warenkorb & Checkout", desc: "Einfacher Bestellablauf" },
        { label: "Zahlungsmethoden", desc: "Karten, Nachnahme, Überweisung" },
        { label: "Lieferung", desc: "Integration von Kurierdiensten" },
        { label: "Aktionen & Rabatte", desc: "Gutscheine, saisonale Angebote" },
        { label: "Administration", desc: "Einfaches Backend-Panel" },
        { label: "Auftragsverfolgung", desc: "Status von der Bestellung bis zur Lieferung" }
      ]
    },
    results: {
      title1: "Wir machen nicht nur „eine schöne Website“.",
      title2: "Wir bauen ein",
      titleHighlight: "digitales Wachstumstool.",
      items: [
        "Mehr telefonische Anfragen und Kontakte",
        "Mehr Nachrichten und Angebotsanfragen",
        "Mehr Online-Verkäufe und Bestellungen",
        "Stärkeres Vertrauen und Markenglaubwürdigkeit",
        "Bessere Präsentation vor Kunden",
        "Messbare Ergebnisse und ROI"
      ]
    },
    process: {
      badge: "Prozess",
      title: "Wie sieht der Zusammenarbeitsprozess aus?",
      subtitle: "Jedes Projekt durchläuft klar definierte Phasen – vom ersten Gespräch bis zum Launch und Support.",
      steps: [
        { title: "Kennenlernen", desc: "Wir besprechen Ihre Ziele, Zielgruppe, Wettbewerb und Vision. Wir verstehen Ihr Geschäft, bevor wir überhaupt beginnen." },
        { title: "Analyse & Vorschlag", desc: "Basierend auf Ihren Bedürfnissen erstellen wir einen detaillierten Vorschlag – Struktur, Funktionen, Technologie und geschätztes Budget." },
        { title: "Design & Struktur", desc: "Wir erstellen Wireframes und visuelles Design. Sie sehen, wie die Website aussehen wird, bevor eine einzige Codezeile geschrieben wird." },
        { title: "Entwicklung & Implementierung", desc: "Wir verwandeln Design in eine funktionale Website. Jede Seite, jede Animation, jede Integration – präzise und planmäßig." },
        { title: "Testing", desc: "Wir testen auf allen Geräten und Browsern. Wir prüfen Geschwindigkeit, Sicherheit, SEO und Benutzererfahrung." },
        { title: "Launch", desc: "Wir stellen die Website bereit, konfigurieren die Domain, SSL und alle technischen Details. Ihre Website ist live." },
        { title: "Support & Wachstum", desc: "Wir lassen Sie nach dem Launch nicht allein. Wir bieten technischen Support, Updates, neue Funktionen und Wachstumsberatung." }
      ]
    },
    advantages: {
      title: "Warum wir?",
      subtitle: "Vorteile der Zusammenarbeit mit dem Wizionar-Team.",
      items: [
        { title: "Erfahrung in verschiedenen Branchen", desc: "Gesundheitswesen, Finanzen, Dienstleistungen, E-Commerce – wir verstehen die Besonderheiten jeder Branche." },
        { title: "Fokus auf Ergebnisse", desc: "Wir bauen keine Websites um der Websites willen. Jedes Projekt ist darauf ausgelegt, Anfragen, Anrufe und Verkäufe zu generieren." },
        { title: "Direkte Kommunikation", desc: "Sie arbeiten mit einem Team, nicht mit automatisierten E-Mails. Schnelle Antworten, klare Kommunikation, transparenter Prozess." },
        { title: "Skalierbare Lösungen", desc: "Wir bauen Systeme, die mit Ihrem Unternehmen wachsen – von einer einfachen Website bis zu einer komplexen Plattform." },
        { title: "Einhaltung von Fristen", desc: "Klare Phasen, realistische Fristen und regelmäßige Fortschrittsberichte." },
        { title: "Sicherheit & Zuverlässigkeit", desc: "HTTPS, Backup, Angriffsschutz und regelmäßige Wartung – Ihre Daten sind sicher." }
      ]
    },
    portfolio: {
      badge: "Portfolio",
      title: "Einige unserer Arbeiten",
      subtitle: "Sehen Sie Beispiele von Projekten, die wir für unsere Kunden realisiert haben.",
      visitSite: "Website besuchen"
    },
    faq: {
      title: "Häufig gestellte Fragen",
      subtitle: "Antworten auf die häufigsten Fragen unserer Kunden.",
      items: [
        { q: "Was kostet eine Website?", a: "Der Preis hängt von Komplexität, Seitenanzahl, Funktionen und Design ab. Eine Präsentationsseite beginnt ab 500 BAM, während komplexe Webshops mehr kosten können." },
        { q: "Wie lange dauert die Website-Erstellung?", a: "Eine einfache Präsentationsseite kann in 2-3 Wochen fertig sein. Komplexere Projekte und Webshops dauern in der Regel 4-8 Wochen." },
        { q: "Kann ich den Inhalt selbst verwalten?", a: "Absolut. Jede Website kommt mit einem Admin-Panel (CMS), über das Sie Texte, Bilder, Produkte und andere Inhalte bearbeiten können – ohne technische Kenntnisse." },
        { q: "Was ist der Unterschied zwischen CMS und Custom?", a: "CMS (z.B. WordPress) ist schneller und günstiger für Standardbedürfnisse. Eine Custom-Lösung wird von Grund auf gebaut, vollständig an Ihre Prozesse angepasst." },
        { q: "Bieten Sie Support nach der Erstellung?", a: "Ja. Wir bieten technische Support-Pakete mit Updates, Backups, Sicherheitspatches, neuen Funktionen und Beratung für weiteres digitales Wachstum." },
        { q: "Beinhaltet die Website SEO-Optimierung?", a: "Ja. Jedes Projekt umfasst eine technische SEO-Grundlage – Geschwindigkeit, Meta-Tags, strukturierte Daten, mobilfreundliches Design." },
        { q: "Machen Sie auch Redesigns bestehender Websites?", a: "Ja. Wir analysieren Ihre aktuelle Website, identifizieren Schwachstellen und schlagen moderne Lösungen vor." }
      ]
    },
    cta: {
      title: "Bereit, Ihr",
      titleHighlight: "digitales Projekt zu starten?",
      subtitle: "Egal ob Sie eine einfache Präsentationsseite oder einen komplexen Webshop benötigen – wir sind hier, um Ihre Idee in eine professionelle digitale Lösung zu verwandeln, die Ergebnisse liefert.",
      email: "info@wizionar.com",
      phone: "Rufen Sie mich an",
      quote: "Angebot anfordern",
      microcopy: "Kostenlose Beratung · Antwort innerhalb 24h · Angebot ohne Verpflichtung"
    }
  },
  it: {
    meta: {
      title: "Sviluppo siti web e web shop | Wizionar",
      description: "Sviluppo professionale di siti web, landing page e web shop. Design moderno, prestazioni veloci, ottimizzazione SEO. Agenzia digitale Wizionar."
    },
    hero: {
      badge: "Sviluppo siti web & web shop",
      title1: "La vostra azienda merita una presenza web che",
      titleHighlight: "porta risultati",
      subtitle: "Non costruiamo “solo siti web”. Creiamo soluzioni digitali che attraggono clienti, costruiscono fiducia e trasformano i visitatori in acquirenti – che abbiate bisogno di un sito di presentazione, una landing page o un web shop completo.",
      cta1: "Richiedi un preventivo gratuito",
      cta2: "Guarda i nostri lavori",
      microcopy: "Rispondiamo entro 24h · Consulenza gratuita · Nessun costo nascosto"
    },
    whyNeeded: {
      title: "Perché un sito web professionale è",
      titleHighlight: "essenziale",
      titleEnd: "per un business serio?",
      subtitle: "Nell'era digitale, il vostro sito web è spesso il primo contatto che un potenziale cliente ha con il vostro brand. Un sito scadente o obsoleto non solo respinge i visitatori – danneggia attivamente la vostra attività.",
      items: [
        { title: "Visibilità", text: "Il 93% delle decisioni di acquisto inizia con una ricerca online. Se non siete su internet – per i vostri clienti, non esistete." },
        { title: "Credibilità", text: "Il 75% degli utenti giudica l'affidabilità di un'azienda in base al design del suo sito web. La prima impressione si forma in 0,05 secondi." },
        { title: "Crescita", text: "Un sito professionale è l'investimento marketing più conveniente. Lavora per voi senza sosta, genera richieste e costruisce il brand." }
      ]
    },
    siteTypes: {
      badge: "Cosa facciamo",
      title: "Tipi di soluzioni web che offriamo",
      subtitle: "Affrontiamo ogni progetto individualmente – dalle presentazioni semplici alle piattaforme e-commerce complesse.",
      items: [
        { title: "Siti web di presentazione", desc: "Un biglietto da visita online professionale per la vostra azienda. Struttura chiara, design moderno e tutte le informazioni necessarie." },
        { title: "Siti aziendali", desc: "Siti multipagina complessi per aziende più grandi. Portali interni, supporto multilingue, integrazioni avanzate e contenuti che costruiscono autorità." },
        { title: "Landing page", desc: "Pagine focalizzate progettate per una cosa – la conversione. Ideali per campagne, promozioni, lanci di prodotti." },
        { title: "Siti catalogo", desc: "Presentate prodotti o servizi in un elegante catalogo digitale – senza pagamento online, ma con tutte le informazioni necessarie." },
        { title: "Web shop / E-commerce", desc: "Soluzioni complete per la vendita online. Dal catalogo prodotti, carrello e checkout all'integrazione dei pagamenti e tracciamento ordini." }
      ]
    },
    cmsVsCustom: {
      title: "CMS o sviluppo Custom?",
      subtitle: "Non esiste una risposta universale. La soluzione giusta dipende dalle vostre esigenze, budget e fase di sviluppo aziendale.",
      cms: {
        title: "Soluzioni CMS",
        badge: "WordPress, Shopify e sistemi simili",
        desc: "L'opzione ideale quando avete bisogno di una soluzione veloce, collaudata ed economica. Le piattaforme CMS offrono un ricco ecosistema di plugin e gestione semplice dei contenuti.",
        features: ["Implementazione più rapida", "Costi iniziali inferiori", "Gestione contenuti semplice", "Migliaia di plugin pronti", "Adatto per esigenze standard"]
      },
      custom: {
        title: "Sviluppo Custom",
        badge: "Soluzioni completamente su misura",
        label: "Premium",
        desc: "Quando avete bisogno di qualcosa che i sistemi pronti non possono offrire. Lo sviluppo custom significa controllo totale su design, funzionalità e prestazioni.",
        features: ["Adattamento completo ai vostri processi", "Scalabilità illimitata", "Prestazioni massime", "Esperienza utente unica", "Investimento a lungo termine"]
      }
    },
    whatYouGet: {
      title: "Cosa ottenete?",
      subtitle: "Ogni progetto include un set completo di servizi professionali – dal design allo sviluppo, dall'ottimizzazione al supporto.",
      items: ["Design UI/UX", "Layout responsivo", "Base SEO", "Velocità & ottimizzazione", "Moduli di contatto", "Integrazioni", "Blog", "Multilingue", "Pagamento online", "Gestione prodotti", "Analisi", "Sicurezza", "Supporto & manutenzione", "Immagini ottimizzate"]
    },
    shop: {
      badge: "E-commerce",
      title: "Tutto ciò di cui il vostro web shop ha bisogno",
      subtitle: "Costruiamo negozi online che non solo hanno un aspetto professionale ma sono ottimizzati per la conversione e la gestione semplice.",
      items: [
        { label: "Visualizzazione prodotti", desc: "Gallerie, varianti, anteprima rapida" },
        { label: "Categorie & filtri", desc: "Navigazione che facilita gli acquisti" },
        { label: "Carrello & checkout", desc: "Flusso d'ordine semplice" },
        { label: "Metodi di pagamento", desc: "Carte, contrassegno, bonifico" },
        { label: "Consegna", desc: "Integrazione servizi di corriere" },
        { label: "Promozioni & sconti", desc: "Coupon, offerte stagionali" },
        { label: "Amministrazione", desc: "Pannello backend semplice" },
        { label: "Tracciamento ordini", desc: "Stato dall'ordine alla consegna" }
      ]
    },
    results: {
      title1: "Non facciamo solo “un bel sito”.",
      title2: "Costruiamo uno",
      titleHighlight: "strumento digitale per la crescita.",
      items: [
        "Più richieste telefoniche e contatti",
        "Più messaggi e richieste di preventivo",
        "Più vendite e ordini online",
        "Maggiore fiducia e credibilità del brand",
        "Migliore presentazione ai clienti",
        "Risultati misurabili e ROI"
      ]
    },
    process: {
      badge: "Processo",
      title: "Come funziona il processo di collaborazione?",
      subtitle: "Ogni progetto passa attraverso fasi chiaramente definite – dalla prima conversazione al lancio e supporto.",
      steps: [
        { title: "Scoperta", desc: "Discutiamo dei vostri obiettivi, pubblico target, concorrenza e visione. Capiamo il vostro business prima di iniziare." },
        { title: "Analisi & proposta", desc: "In base alle vostre esigenze creiamo una proposta dettagliata – struttura, funzionalità, tecnologia e budget stimato." },
        { title: "Design & struttura", desc: "Creiamo wireframe e design visivo. Vedete come sarà il sito prima che venga scritta una sola riga di codice." },
        { title: "Sviluppo & implementazione", desc: "Trasformiamo il design in un sito funzionale. Ogni pagina, ogni animazione, ogni integrazione – precisa e pianificata." },
        { title: "Testing", desc: "Testiamo su tutti i dispositivi e browser. Controlliamo velocità, sicurezza, SEO ed esperienza utente." },
        { title: "Lancio", desc: "Pubblichiamo il sito, configuriamo dominio, SSL e tutti i dettagli tecnici. Il vostro sito è live." },
        { title: "Supporto & crescita", desc: "Non vi abbandoniamo dopo il lancio. Offriamo supporto tecnico, aggiornamenti, nuove funzionalità e consigli per la crescita." }
      ]
    },
    advantages: {
      title: "Perché scegliere noi?",
      subtitle: "Vantaggi della collaborazione con il team Wizionar.",
      items: [
        { title: "Esperienza in diversi settori", desc: "Sanità, finanza, servizi, e-commerce – comprendiamo le specificità di ogni settore." },
        { title: "Focus sui risultati", desc: "Non facciamo siti per il gusto di farli. Ogni progetto è progettato per generare richieste, chiamate e vendite." },
        { title: "Comunicazione diretta", desc: "Lavorate con un team, non con email automatizzate. Risposte rapide, comunicazione chiara, processo trasparente." },
        { title: "Soluzioni scalabili", desc: "Costruiamo sistemi che crescono con la vostra azienda – da un semplice sito a una piattaforma complessa." },
        { title: "Rispetto delle scadenze", desc: "Fasi chiare, scadenze realistiche e report regolari sui progressi." },
        { title: "Sicurezza & affidabilità", desc: "HTTPS, backup, protezione dagli attacchi e manutenzione regolare – i vostri dati sono al sicuro." }
      ]
    },
    portfolio: {
      badge: "Portfolio",
      title: "Alcuni dei nostri lavori",
      subtitle: "Guardate esempi di progetti che abbiamo realizzato per i nostri clienti.",
      visitSite: "Visita il sito"
    },
    faq: {
      title: "Domande frequenti",
      subtitle: "Risposte alle domande più comuni dei nostri clienti.",
      items: [
        { q: "Quanto costa un sito web?", a: "Il prezzo dipende dalla complessità, numero di pagine, funzionalità e design. Un sito di presentazione parte da 500 BAM, mentre i web shop complessi possono costare di più." },
        { q: "Quanto tempo ci vuole per realizzare un sito?", a: "Una semplice pagina di presentazione può essere pronta in 2-3 settimane. Progetti più complessi e web shop richiedono di solito 4-8 settimane." },
        { q: "Posso gestire i contenuti da solo?", a: "Assolutamente. Ogni sito viene con un pannello di amministrazione (CMS) attraverso il quale potete modificare testi, immagini, prodotti e altri contenuti – senza conoscenze tecniche." },
        { q: "Qual è la differenza tra CMS e custom?", a: "CMS (es. WordPress) è più veloce ed economico per esigenze standard. Una soluzione custom viene costruita da zero, completamente adattata ai vostri processi." },
        { q: "Offrite supporto dopo lo sviluppo?", a: "Sì. Offriamo pacchetti di supporto tecnico che includono aggiornamenti, backup, patch di sicurezza, nuove funzionalità e consulenza per la crescita digitale." },
        { q: "Il sito include l'ottimizzazione SEO?", a: "Sì. Ogni progetto include una base SEO tecnica – velocità, meta tag, dati strutturati, design mobile-friendly." },
        { q: "Fate anche il redesign di siti esistenti?", a: "Sì. Analizziamo il vostro sito attuale, identifichiamo i punti deboli e proponiamo soluzioni moderne." }
      ]
    },
    cta: {
      title: "Pronti a lanciare il vostro",
      titleHighlight: "progetto digitale?",
      subtitle: "Che abbiate bisogno di un semplice sito di presentazione o di un web shop complesso – siamo qui per trasformare la vostra idea in una soluzione digitale professionale che porta risultati.",
      email: "info@wizionar.com",
      phone: "Chiamatemi",
      quote: "Richiedi un preventivo",
      microcopy: "Consulenza gratuita · Rispondiamo entro 24h · Preventivo senza impegno"
    }
  }
};
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-border bg-transparent text-foreground hover:bg-secondary hover:border-muted-foreground/30",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-secondary hover:text-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        // Enterprise CTA variants
        accent: "bg-accent text-accent-foreground hover:bg-accent/90 shadow-glow hover:shadow-lg",
        hero: "bg-accent text-accent-foreground font-semibold shadow-glow hover:shadow-lg hover:bg-emerald-glow transition-all duration-300",
        heroOutline: "border-2 border-muted-foreground/30 bg-transparent text-foreground hover:bg-secondary hover:border-primary/50"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-12 rounded-lg px-8 text-base",
        xl: "h-14 rounded-lg px-10 text-base",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsx(Comp, { className: cn(buttonVariants({ variant, size, className })), ref, ...props });
  }
);
Button.displayName = "Button";
const useLocalizedPath = () => {
  const { language } = useLanguage();
  return useCallback((path) => localizePath(path, language), [language]);
};
const localePrefixPattern = /^\/(en|de|it)(?=\/|$)/;
const externalPathPattern = /^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i;
const createLazyPage = (importer) => ({
  Component: lazy(importer),
  preload: importer
});
const indexPage = createLazyPage(() => Promise.resolve().then(() => Index$1));
const wizFlussiPage = createLazyPage(() => Promise.resolve().then(() => WizFlussi$1));
const wizMedikReportsPage = createLazyPage(() => Promise.resolve().then(() => WizMedikReports$1));
const wizMedikPage = createLazyPage(() => Promise.resolve().then(() => WizMedik$1));
const frizerinoPage = createLazyPage(() => Promise.resolve().then(() => Frizerino$1));
const chatkoPage = createLazyPage(() => Promise.resolve().then(() => Chatko$1));
const uslugePage = createLazyPage(() => Promise.resolve().then(() => Usluge$1));
const seoPage = createLazyPage(() => Promise.resolve().then(() => SEOOptimizacija$1));
const webDevelopmentPage = createLazyPage(() => Promise.resolve().then(() => WebDevelopment$1));
const grafickiDizajnPage = createLazyPage(() => Promise.resolve().then(() => GrafickiDizajn$1));
const projectInquiryPage = createLazyPage(() => Promise.resolve().then(() => ProjectInquiry$1));
const projectDetailPage = createLazyPage(() => Promise.resolve().then(() => ProjectDetail$1));
createLazyPage(() => Promise.resolve().then(() => NotFound$1));
const prefetchedImporters = /* @__PURE__ */ new WeakSet();
const normalizeRoutePath = (path) => {
  if (!path || externalPathPattern.test(path)) {
    return null;
  }
  const [pathname] = path.split(/[?#]/);
  const withoutLocale = pathname.replace(localePrefixPattern, "") || "/";
  if (withoutLocale !== "/" && withoutLocale.endsWith("/")) {
    return withoutLocale.slice(0, -1);
  }
  return withoutLocale;
};
const routePrefetchers = [
  { matches: (path) => path === "/", importer: indexPage.preload },
  { matches: (path) => path === "/wizflussi", importer: wizFlussiPage.preload },
  { matches: (path) => path === "/wizmedik-reports", importer: wizMedikReportsPage.preload },
  { matches: (path) => path === "/wizmedik", importer: wizMedikPage.preload },
  { matches: (path) => path === "/frizerino", importer: frizerinoPage.preload },
  { matches: (path) => path === "/chatko", importer: chatkoPage.preload },
  { matches: (path) => path === "/usluge/graficki-dizajn", importer: grafickiDizajnPage.preload },
  { matches: (path) => path === "/usluge/seo-optimizacija", importer: seoPage.preload },
  { matches: (path) => path === "/usluge/izrada-web-stranica", importer: webDevelopmentPage.preload },
  { matches: (path) => path === "/projektni-upitnik" || path === "/project-inquiry", importer: projectInquiryPage.preload },
  { matches: (path) => path.startsWith("/portfolio/"), importer: projectDetailPage.preload },
  { matches: (path) => path === "/usluge", importer: uslugePage.preload }
];
const prefetchRoute = (path) => {
  const normalizedPath = normalizeRoutePath(path);
  if (!normalizedPath) {
    return;
  }
  const matchedRoute = routePrefetchers.find(({ matches }) => matches(normalizedPath));
  if (!matchedRoute || prefetchedImporters.has(matchedRoute.importer)) {
    return;
  }
  prefetchedImporters.add(matchedRoute.importer);
  void matchedRoute.importer();
};
const LocalizedLink = forwardRef(
  ({ to, onMouseEnter, onFocus, onTouchStart, ...props }, ref) => {
    const localizedPath = useLocalizedPath();
    const localizedTo = typeof to === "string" ? localizedPath(to) : { ...to, pathname: localizedPath(to.pathname || "/") };
    const handlePrefetch = () => {
      const path = typeof localizedTo === "string" ? localizedTo : localizedTo.pathname;
      if (path) {
        prefetchRoute(path);
      }
    };
    const handleMouseEnter = (event) => {
      onMouseEnter == null ? void 0 : onMouseEnter(event);
      handlePrefetch();
    };
    const handleFocus = (event) => {
      onFocus == null ? void 0 : onFocus(event);
      handlePrefetch();
    };
    const handleTouchStart = (event) => {
      onTouchStart == null ? void 0 : onTouchStart(event);
      handlePrefetch();
    };
    return /* @__PURE__ */ jsx(
      Link,
      {
        ref,
        to: localizedTo,
        onMouseEnter: handleMouseEnter,
        onFocus: handleFocus,
        onTouchStart: handleTouchStart,
        ...props
      }
    );
  }
);
LocalizedLink.displayName = "LocalizedLink";
const defaultOgImage = "/assets/wizionar-logo-c0_-7f5K.png";
const flags = [
  { code: "sr", label: "Srpski", flag: "🇷🇸" },
  { code: "it", label: "Italiano", flag: "🇮🇹" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "en", label: "English", flag: "🇬🇧" }
];
const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();
  const availableFlags = flags.filter((item) => item.code !== language);
  return /* @__PURE__ */ jsx("div", { className: "flex items-center gap-1", children: availableFlags.map((item) => /* @__PURE__ */ jsx(
    "button",
    {
      onClick: () => setLanguage(item.code),
      className: "w-8 h-8 rounded-lg flex items-center justify-center text-lg transition-all hover:bg-secondary",
      title: item.label,
      "aria-label": "Switch to ".concat(item.label),
      children: item.flag
    },
    item.code
  )) });
};
const PROJECT_INQUIRY_PATH = "/projektni-upitnik";
const projectInquiryCopy = {
  sr: {
    seoTitle: "Projektni upitnik za web sajt, web shop ili aplikaciju | Wizionar",
    seoDescription: "Popunite profesionalni projektni upitnik za web sajt, web shop, booking sistem, aplikaciju ili redizajn. Wizionar analizira odgovore i predlaže naredne korake.",
    badge: "Project Discovery",
    title: "Projektni upitnik za web sajt ili aplikaciju",
    subtitle: "Kroz nekoliko fokusiranih koraka prikupimo poslovne ciljeve, funkcionalnosti, budžet, rokove i tehničke zahtjeve, da vam možemo pripremiti smislen prijedlog.",
    introTitle: "Prije nego počnemo",
    introText: "Upitnik traje oko 10-20 minuta. Ne morate znati sve odgovore; gdje niste sigurni, izaberite opciju koja to kaže.",
    start: "Započni upitnik",
    next: "Dalje",
    back: "Nazad",
    submit: "Pošalji upitnik",
    sending: "Slanje...",
    required: "Ovo polje je obavezno.",
    progress: "Popunjeno",
    step: "Korak",
    successTitle: "Hvala na poslanom upitniku.",
    successText: "Vaši odgovori su zaprimljeni. Analiziraćemo tip projekta, obim funkcionalnosti, kompleksnost, rokove i javiti se sa prijedlogom narednih koraka.",
    errorTitle: "Nismo uspjeli poslati upitnik.",
    noEndpoint: "Email endpoint još nije podešen, pa smo otvorili pripremljen email sa svim odgovorima.",
    invalidEmail: "Unesite ispravnu email adresu.",
    invalidUrl: "Unesite ispravan link.",
    invalidDate: "Unesite datum u formatu dd.mm.gggg.",
    invalidProtocol: "Link mora početi sa http ili https.",
    protectionFailed: "Zaštitna provjera nije prošla.",
    tooFast: "Molimo sačekajte nekoliko sekundi prije slanja.",
    rateLimited: "Upitnik je već poslan nedavno. Pokušajte ponovo za minut.",
    wrongChallenge: "Rezultat matematičke provjere nije tačan.",
    challengeTitle: "Provjera prije slanja",
    challengePlaceholder: "Rezultat",
    confirmationSubject: "Kopija vašeg projektnog upitnika - Wizionar",
    confirmationIntro: "Hvala što ste popunili projektni upitnik. U nastavku je kopija odgovora koje ste poslali. Javićemo vam se sa narednim koracima.",
    adminSubject: "Novi projektni upitnik - Wizionar"
  },
  en: {
    seoTitle: "Project inquiry for websites, shops and applications | Wizionar",
    seoDescription: "Complete a professional project inquiry for a website, online shop, booking system, app or redesign. Wizionar reviews the answers and proposes next steps.",
    badge: "Project Discovery",
    title: "Project inquiry for a website or application",
    subtitle: "A focused multi-step form helps us collect goals, features, budget, timeline and technical context so we can prepare a meaningful proposal.",
    introTitle: "Before we start",
    introText: "The form takes about 10-20 minutes. You do not need every answer; choose an unsure option where needed.",
    start: "Start inquiry",
    next: "Next",
    back: "Back",
    submit: "Submit inquiry",
    sending: "Sending...",
    required: "This field is required.",
    progress: "Completed",
    step: "Step",
    successTitle: "Thank you for the submitted inquiry.",
    successText: "Your answers have been received. We will review the project type, scope, complexity and timeline and contact you with next steps.",
    errorTitle: "We could not submit the inquiry.",
    noEndpoint: "The email endpoint is not configured yet, so we opened a prepared email with all answers.",
    invalidEmail: "Enter a valid email address.",
    invalidUrl: "Enter a valid URL.",
    invalidDate: "Enter the date in dd.mm.yyyy format.",
    invalidProtocol: "The URL must start with http or https.",
    protectionFailed: "The protection check failed.",
    tooFast: "Please wait a few seconds before submitting.",
    rateLimited: "The inquiry was submitted recently. Please try again in a minute.",
    wrongChallenge: "The math check result is not correct.",
    challengeTitle: "Check before sending",
    challengePlaceholder: "Result",
    confirmationSubject: "Copy of your project inquiry - Wizionar",
    confirmationIntro: "Thank you for completing the project inquiry. Below is a copy of the answers you submitted. We will contact you with next steps.",
    adminSubject: "New project inquiry - Wizionar"
  },
  de: {
    seoTitle: "Projektfragebogen für Websites, Shops und Anwendungen | Wizionar",
    seoDescription: "Füllen Sie einen professionellen Projektfragebogen für Website, Online-Shop, Buchungssystem, App oder Redesign aus. Wizionar prüft die Antworten und schlägt nächste Schritte vor.",
    badge: "Project Discovery",
    title: "Projektfragebogen für Website oder Anwendung",
    subtitle: "Ein fokussiertes mehrstufiges Formular erfasst Ziele, Funktionen, Budget, Zeitplan und technische Rahmenbedingungen für ein sinnvolles Angebot.",
    introTitle: "Bevor wir starten",
    introText: "Das Formular dauert etwa 10-20 Minuten. Sie müssen nicht alles wissen; wählen Sie bei Bedarf eine Unsicher-Option.",
    start: "Fragebogen starten",
    next: "Weiter",
    back: "Zurück",
    submit: "Fragebogen senden",
    sending: "Senden...",
    required: "Dieses Feld ist erforderlich.",
    progress: "Ausgefüllt",
    step: "Schritt",
    successTitle: "Vielen Dank für den gesendeten Fragebogen.",
    successText: "Ihre Antworten wurden empfangen. Wir prüfen Projekttyp, Umfang, Komplexität und Zeitplan und melden uns mit den nächsten Schritten.",
    errorTitle: "Der Fragebogen konnte nicht gesendet werden.",
    noEndpoint: "Der Email-Endpunkt ist noch nicht konfiguriert, daher wurde eine vorbereitete Email mit allen Antworten geöffnet.",
    invalidEmail: "Geben Sie eine gültige Email-Adresse ein.",
    invalidUrl: "Geben Sie einen gültigen Link ein.",
    invalidDate: "Geben Sie das Datum im Format tt.mm.jjjj ein.",
    invalidProtocol: "Der Link muss mit http oder https beginnen.",
    protectionFailed: "Die Schutzprüfung ist fehlgeschlagen.",
    tooFast: "Bitte warten Sie einige Sekunden vor dem Absenden.",
    rateLimited: "Der Fragebogen wurde kürzlich gesendet. Bitte versuchen Sie es in einer Minute erneut.",
    wrongChallenge: "Das Ergebnis der Mathe-Prüfung ist nicht korrekt.",
    challengeTitle: "Prüfung vor dem Absenden",
    challengePlaceholder: "Ergebnis",
    confirmationSubject: "Kopie Ihres Projektfragebogens - Wizionar",
    confirmationIntro: "Vielen Dank für das Ausfüllen des Projektfragebogens. Unten finden Sie eine Kopie Ihrer gesendeten Antworten. Wir melden uns mit den nächsten Schritten.",
    adminSubject: "Neuer Projektfragebogen - Wizionar"
  },
  it: {
    seoTitle: "Questionario progetto per siti, shop e applicazioni | Wizionar",
    seoDescription: "Compila un questionario professionale per sito web, shop online, sistema booking, app o redesign. Wizionar analizza le risposte e propone i prossimi passi.",
    badge: "Project Discovery",
    title: "Questionario progetto per sito web o applicazione",
    subtitle: "Un modulo multi-step raccoglie obiettivi, funzionalità, budget, tempi e contesto tecnico per preparare una proposta concreta.",
    introTitle: "Prima di iniziare",
    introText: "Il questionario richiede circa 10-20 minuti. Non serve sapere tutto; scegli un'opzione incerta dove necessario.",
    start: "Inizia questionario",
    next: "Avanti",
    back: "Indietro",
    submit: "Invia questionario",
    sending: "Invio...",
    required: "Questo campo è obbligatorio.",
    progress: "Completato",
    step: "Passo",
    successTitle: "Grazie per il questionario inviato.",
    successText: "Le tue risposte sono state ricevute. Analizzeremo tipo di progetto, ambito, complessità e tempi e ti contatteremo con i prossimi passi.",
    errorTitle: "Non siamo riusciti a inviare il questionario.",
    noEndpoint: "L'endpoint email non è ancora configurato, quindi abbiamo aperto una email preparata con tutte le risposte.",
    invalidEmail: "Inserisci un indirizzo email valido.",
    invalidUrl: "Inserisci un link valido.",
    invalidDate: "Inserisci la data nel formato gg.mm.aaaa.",
    invalidProtocol: "Il link deve iniziare con http o https.",
    protectionFailed: "Il controllo di protezione non è riuscito.",
    tooFast: "Attendi qualche secondo prima di inviare.",
    rateLimited: "Il questionario è stato inviato di recente. Riprova tra un minuto.",
    wrongChallenge: "Il risultato del controllo matematico non è corretto.",
    challengeTitle: "Controllo prima dell'invio",
    challengePlaceholder: "Risultato",
    confirmationSubject: "Copia del tuo questionario progetto - Wizionar",
    confirmationIntro: "Grazie per aver compilato il questionario progetto. Di seguito trovi una copia delle risposte inviate. Ti contatteremo con i prossimi passi.",
    adminSubject: "Nuovo questionario progetto - Wizionar"
  }
};
const yesNoUnsure = [
  { value: "yes", label: "Da" },
  { value: "no", label: "Ne" },
  { value: "not_sure", label: "Nisam siguran/sigurna" }
];
const projectTypeOptions = [
  {
    value: "presentation_website",
    label: "Prezentacioni web sajt",
    description: "Predstavljanje firme, usluga, tima, referenci, lokacije i kontakta."
  },
  {
    value: "ecommerce",
    label: "Web shop / online prodavnica",
    description: "Online prodaja proizvoda, korpa, narudžbe, plaćanje i administracija."
  },
  {
    value: "web_application",
    label: "Web aplikacija / platforma",
    description: "Napredni sistem sa korisnicima, dashboardima, bazom i poslovnom logikom."
  },
  {
    value: "booking_system",
    label: "Booking / rezervacijski sistem",
    description: "Rezervacija termina, usluga, vozila, smještaja, konsultacija ili resursa."
  },
  {
    value: "landing_page",
    label: "Landing page",
    description: "Jedna prodajna stranica fokusirana na kampanju, proizvod ili prijave."
  },
  {
    value: "redesign",
    label: "Redizajn postojećeg sajta ili aplikacije",
    description: "Bolji dizajn, performanse, SEO, funkcionalnosti ili korisničko iskustvo."
  },
  {
    value: "not_sure",
    label: "Nisam siguran/sigurna",
    description: "Kroz odgovore ćemo zajedno procijeniti najbolji tip rješenja."
  }
];
const projectInquirySteps = [
  {
    key: "contact",
    eyebrow: "Osnovni podaci",
    title: "Ko nam se javlja?",
    description: "Podaci potrebni da vas možemo kontaktirati i razumjeti kontekst poslovanja.",
    fields: [
      { key: "full_name", label: "Ime i prezime", type: "text", required: true },
      { key: "company_name", label: "Naziv firme / projekta", type: "text" },
      { key: "email", label: "Email adresa", type: "email", required: true },
      { key: "phone", label: "Telefon", type: "phone" },
      { key: "location", label: "Država / grad", type: "text" },
      {
        key: "business_description",
        label: "Čime se bavite?",
        type: "textarea",
        required: true,
        placeholder: "Ukratko opišite vašu firmu, usluge, proizvode ili ideju."
      }
    ]
  },
  {
    key: "classification",
    eyebrow: "Klasifikacija",
    title: "Kakav projekat želite izraditi?",
    description: "Ovaj odgovor određuje koja dodatna pitanja ćemo prikazati u nastavku.",
    fields: [
      {
        key: "project_type",
        label: "Tip projekta",
        type: "single_choice",
        required: true,
        options: projectTypeOptions
      },
      {
        key: "idea_if_unsure",
        label: "Ako niste sigurni, opišite ideju svojim riječima",
        type: "textarea",
        required: true,
        showWhen: (answers) => answers.project_type === "not_sure"
      }
    ]
  },
  {
    key: "goals",
    eyebrow: "Ciljevi",
    title: "Šta projekat treba postići?",
    description: "Birajte više odgovora ako projekat ima više poslovnih ciljeva.",
    fields: [
      {
        key: "main_goals",
        label: "Glavni cilj projekta",
        type: "multiple_choice",
        required: true,
        options: [
          "Predstavljanje firme ili usluga",
          "Povećanje broja upita",
          "Online prodaja proizvoda",
          "Online prodaja usluga",
          "Automatizacija poslovnog procesa",
          "Rezervacija termina",
          "Upravljanje korisnicima",
          "Edukacija korisnika",
          "Kreiranje zajednice / community sistema",
          "Interni poslovni sistem",
          "SaaS aplikacija",
          "Marketplace/platforma",
          "Bolji SEO i Google vidljivost",
          "Bolji dizajn i korisničko iskustvo",
          "Drugo"
        ].map((label) => ({ value: label, label }))
      },
      {
        key: "other_goal",
        label: "Opišite drugi cilj",
        type: "textarea",
        required: true,
        showWhen: (answers) => Array.isArray(answers.main_goals) && answers.main_goals.includes("Drugo")
      },
      {
        key: "project_description",
        label: "Šta korisnik treba moći uraditi na sajtu ili aplikaciji?",
        type: "textarea",
        required: true,
        placeholder: "Primjer: pregledati usluge, poslati upit, kupiti proizvod, rezervisati termin, prijaviti se ili koristiti dashboard."
      }
    ]
  },
  {
    key: "current_state",
    eyebrow: "Postojeće stanje",
    title: "Da li već imate digitalno rješenje?",
    description: "Ako već imate web sajt, shop ili aplikaciju, korisno je znati šta radi dobro, a šta treba popraviti.",
    fields: [
      {
        key: "existing_solution_status",
        label: "Da li trenutno imate web sajt, web shop ili aplikaciju?",
        type: "single_choice",
        required: true,
        options: ["Da", "Ne", "U izradi je", "Nisam siguran/sigurna"].map((label) => ({ value: label, label }))
      },
      {
        key: "existing_solution_url",
        label: "Link postojećeg sajta / aplikacije",
        type: "url",
        showWhen: (answers) => ["Da", "U izradi je"].includes(String(answers.existing_solution_status || ""))
      },
      {
        key: "existing_solution_pain_points",
        label: "Šta vam najviše smeta na postojećem rješenju?",
        type: "multiple_choice",
        showWhen: (answers) => ["Da", "U izradi je"].includes(String(answers.existing_solution_status || "")),
        options: [
          "Zastarjeli dizajn",
          "Spor sajt",
          "Loša mobilna verzija",
          "Loša Google vidljivost",
          "Teško uređivanje sadržaja",
          "Nema admin panel",
          "Nema online plaćanje",
          "Loše korisničko iskustvo",
          "Nedostaju funkcionalnosti",
          "Tehnički problemi",
          "Sigurnosni problemi",
          "Ne znam",
          "Drugo"
        ].map((label) => ({ value: label, label }))
      },
      {
        key: "existing_solution_other_problem",
        label: "Opišite problem",
        type: "textarea",
        showWhen: (answers) => Array.isArray(answers.existing_solution_pain_points) && answers.existing_solution_pain_points.includes("Drugo")
      }
    ]
  },
  {
    key: "technical_base",
    eyebrow: "Domen i hosting",
    title: "Tehnička osnova projekta",
    description: "Domen je internet adresa, a hosting je prostor/server na kojem se nalazi web sajt ili aplikacija.",
    fields: [
      {
        key: "domain_status",
        label: "Da li imate domen?",
        type: "single_choice",
        required: true,
        options: ["Da, imam domen", "Ne, nemam domen", "Nisam siguran/sigurna", "Ne znam šta je domen"].map((label) => ({
          value: label,
          label
        }))
      },
      {
        key: "domain_name",
        label: "Koji domen koristite?",
        type: "text",
        required: true,
        showWhen: (answers) => answers.domain_status === "Da, imam domen"
      },
      {
        key: "domain_help",
        label: "Da li želite pomoć oko izbora i registracije domena?",
        type: "single_choice",
        showWhen: (answers) => ["Ne, nemam domen", "Nisam siguran/sigurna"].includes(String(answers.domain_status || "")),
        options: ["Da", "Ne", "Možda kasnije"].map((label) => ({ value: label, label }))
      },
      {
        key: "hosting_status",
        label: "Da li imate hosting ili server?",
        type: "single_choice",
        required: true,
        options: [
          "Da, imam hosting/server",
          "Ne, nemam hosting/server",
          "Nisam siguran/sigurna",
          "Ne znam šta je hosting"
        ].map((label) => ({ value: label, label }))
      },
      {
        key: "hosting_type",
        label: "Koji hosting/server koristite?",
        type: "single_choice",
        showWhen: (answers) => answers.hosting_status === "Da, imam hosting/server",
        options: ["Shared hosting", "VPS server", "Dedicated server", "Cloud hosting", "Plesk/cPanel hosting", "Ne znam", "Drugo"].map(
          (label) => ({ value: label, label })
        )
      },
      {
        key: "hosting_other",
        label: "Unesite naziv hostinga/servera",
        type: "text",
        showWhen: (answers) => answers.hosting_type === "Drugo"
      },
      {
        key: "maintenance",
        label: "Da li želite da mi preuzmemo tehničko održavanje nakon izrade?",
        type: "single_choice",
        options: ["Da", "Ne", "Možda kasnije", "Želim prvo više informacija"].map((label) => ({ value: label, label }))
      }
    ]
  },
  {
    key: "presentation_module",
    eyebrow: "Modul",
    title: "Prezentacioni web sajt",
    description: "Struktura, sadržaj, funkcionalnosti i jezici za web prezentaciju.",
    projectTypes: ["presentation_website"],
    fields: [
      {
        key: "website_pages",
        label: "Koje stranice želite na sajtu?",
        type: "multiple_choice",
        required: true,
        options: [
          "Početna",
          "O nama",
          "Usluge",
          "Pojedinačne stranice usluga",
          "Portfolio / reference",
          "Tim",
          "Galerija",
          "Blog / novosti",
          "Cjenovnik",
          "Česta pitanja",
          "Kontakt",
          "Karijere",
          "Lokacije / poslovnice",
          "Pravne stranice",
          "Drugo"
        ].map((label) => ({ value: label, label }))
      },
      {
        key: "website_pages_other",
        label: "Navedite dodatne stranice",
        type: "textarea",
        showWhen: (answers) => Array.isArray(answers.website_pages) && answers.website_pages.includes("Drugo")
      },
      {
        key: "website_content_status",
        label: "Da li imate pripremljen sadržaj za sajt?",
        type: "single_choice",
        required: true,
        options: [
          "Da, imamo tekstove i slike",
          "Imamo tekstove, ali ne i slike",
          "Imamo slike, ali ne i tekstove",
          "Imamo djelimičan sadržaj",
          "Nemamo sadržaj",
          "Treba nam kompletna pomoć oko sadržaja"
        ].map((label) => ({ value: label, label }))
      },
      {
        key: "website_features",
        label: "Koje funkcionalnosti želite?",
        type: "multiple_choice",
        options: [
          "Kontakt forma",
          "Forma za upit/ponudu",
          "Google mapa",
          "Blog sistem",
          "Galerija",
          "Prikaz referenci",
          "Newsletter prijava",
          "WhatsApp/Viber kontakt dugme",
          "Višejezičnost",
          "Admin panel za uređivanje sadržaja",
          "Osnovna SEO optimizacija",
          "Napredna SEO struktura",
          "Drugo"
        ].map((label) => ({ value: label, label }))
      },
      {
        key: "website_languages",
        label: "Da li sajt treba biti višejezičan?",
        type: "multiple_choice",
        required: true,
        options: ["Ne, samo jedan jezik", "B/H/S", "Engleski", "Njemački", "Italijanski", "Drugo", "Nisam siguran/sigurna"].map(
          (label) => ({ value: label, label })
        )
      }
    ]
  },
  {
    key: "ecommerce_module",
    eyebrow: "Modul",
    title: "Web shop / online prodavnica",
    description: "Proizvodi, plaćanje, dostava i administracija web shopa.",
    projectTypes: ["ecommerce"],
    fields: [
      {
        key: "product_count",
        label: "Koliko proizvoda planirate imati na početku?",
        type: "single_choice",
        required: true,
        options: ["1-20", "20-100", "100-500", "500-2000", "2000+", "Ne znam još"].map((label) => ({ value: label, label }))
      },
      {
        key: "product_variations",
        label: "Da li proizvodi imaju varijacije?",
        type: "single_choice",
        required: true,
        description: "Varijacije su npr. veličina, boja, model, kapacitet, težina ili pakovanje.",
        options: yesNoUnsure
      },
      {
        key: "payment_methods",
        label: "Koje metode plaćanja želite?",
        type: "multiple_choice",
        required: true,
        options: [
          "Plaćanje pouzećem",
          "Bankovna uplata",
          "Kartično plaćanje",
          "Stripe",
          "PayPal",
          "Monri",
          "CorvusPay",
          "WSPay",
          "Kripto plaćanje",
          "Ne znam",
          "Drugo"
        ].map((label) => ({ value: label, label }))
      },
      {
        key: "delivery_methods",
        label: "Kako planirate organizovati dostavu?",
        type: "multiple_choice",
        required: true,
        options: ["Kurirska služba", "Vlastita dostava", "Lično preuzimanje", "Digitalni proizvodi", "Dostava nije potrebna", "Ne znam još"].map(
          (label) => ({ value: label, label })
        )
      },
      {
        key: "product_admin",
        label: "Kako želite unositi proizvode?",
        type: "single_choice",
        required: true,
        options: [
          "Ručno kroz admin panel",
          "Import iz Excel/CSV fajla",
          "API integracija sa drugim sistemom",
          "Automatska sinhronizacija sa dobavljačem",
          "Nisam siguran/sigurna"
        ].map((label) => ({ value: label, label }))
      },
      {
        key: "inventory_tracking",
        label: "Da li vam treba praćenje stanja zaliha?",
        type: "single_choice",
        required: true,
        options: ["Da", "Ne", "Možda kasnije", "Nisam siguran/sigurna"].map((label) => ({ value: label, label }))
      }
    ]
  },
  {
    key: "app_module",
    eyebrow: "Modul",
    title: "Web aplikacija / platforma",
    description: "Korisnici, uloge, funkcionalnosti, podaci i integracije.",
    projectTypes: ["web_application"],
    fields: [
      {
        key: "app_users",
        label: "Ko će koristiti aplikaciju?",
        type: "multiple_choice",
        required: true,
        options: ["Admin", "Registrovani korisnici", "Kupci", "Zaposleni", "Partneri", "Edukatori / mentori", "Moderatori", "Menadžeri", "Klijenti", "Drugo"].map(
          (label) => ({ value: label, label })
        )
      },
      {
        key: "user_accounts",
        label: "Da li korisnici trebaju imati svoje naloge?",
        type: "single_choice",
        required: true,
        options: yesNoUnsure
      },
      {
        key: "account_features",
        label: "Koje funkcije korisnički nalog treba imati?",
        type: "multiple_choice",
        showWhen: (answers) => answers.user_accounts === "yes",
        options: [
          "Registracija",
          "Login",
          "Zaboravljena lozinka",
          "Profil korisnika",
          "Dashboard",
          "Notifikacije",
          "Historija aktivnosti",
          "Plaćanja",
          "Dokumenti/fajlovi",
          "Poruke",
          "Postavke naloga",
          "Drugo"
        ].map((label) => ({ value: label, label }))
      },
      {
        key: "app_features",
        label: "Koje funkcionalnosti očekujete u aplikaciji?",
        type: "multiple_choice",
        required: true,
        options: [
          "Admin panel",
          "Korisnički dashboard",
          "Uloge i permisije",
          "Upload fajlova",
          "Komentari",
          "Chat / messaging",
          "Email notifikacije",
          "Push notifikacije",
          "Kalendar",
          "Rezervacije",
          "Online plaćanje",
          "Pretplate / subscription",
          "Fakture",
          "Izvještaji",
          "Statistika",
          "API",
          "Integracije sa drugim sistemima",
          "Mobilna aplikacija kasnije",
          "Drugo"
        ].map((label) => ({ value: label, label }))
      },
      {
        key: "app_flow",
        label: "Opišite glavni tok korištenja aplikacije",
        type: "textarea",
        required: true,
        placeholder: "Primjer: Korisnik se registruje, kupuje paket, dobija pristup dashboardu, koristi funkcije i prima notifikacije."
      },
      {
        key: "stored_data",
        label: "Koje podatke sistem treba čuvati?",
        type: "textarea"
      }
    ]
  },
  {
    key: "booking_module",
    eyebrow: "Modul",
    title: "Booking / rezervacijski sistem",
    description: "Tip rezervacija, dostupnost, plaćanje i podsjetnici.",
    projectTypes: ["booking_system"],
    fields: [
      {
        key: "booking_resource",
        label: "Šta korisnici rezervišu?",
        type: "single_choice",
        required: true,
        options: ["Termine", "Usluge", "Konsultacije", "Vozila", "Smještaj", "Stolove", "Prostorije", "Oprema/resurse", "Drugo"].map(
          (label) => ({ value: label, label })
        )
      },
      {
        key: "booking_availability",
        label: "Da li rezervacije zavise od dostupnosti?",
        type: "single_choice",
        required: true,
        options: yesNoUnsure
      },
      {
        key: "booking_payment",
        label: "Da li korisnici trebaju online plaćati rezervaciju?",
        type: "single_choice",
        required: true,
        options: ["Da", "Ne", "Opcionalno", "Možda kasnije"].map((label) => ({ value: label, label }))
      },
      {
        key: "booking_reminders",
        label: "Da li želite automatske podsjetnike?",
        type: "multiple_choice",
        options: ["Email podsjetnik", "SMS podsjetnik", "WhatsApp/Viber podsjetnik", "Podsjetnik u aplikaciji", "Ne", "Možda kasnije"].map(
          (label) => ({ value: label, label })
        )
      }
    ]
  },
  {
    key: "landing_module",
    eyebrow: "Modul",
    title: "Landing page",
    description: "Cilj kampanje, glavna akcija i povezivanje sa oglasima.",
    projectTypes: ["landing_page"],
    fields: [
      {
        key: "landing_promotion",
        label: "Šta landing page treba promovisati?",
        type: "single_choice",
        required: true,
        options: ["Uslugu", "Proizvod", "Edukaciju", "Event", "Akciju/popust", "Prijavu na listu čekanja", "Preuzimanje dokumenta", "Konsultacije", "Drugo"].map(
          (label) => ({ value: label, label })
        )
      },
      {
        key: "landing_action",
        label: "Koja je glavna akcija koju posjetilac treba uraditi?",
        type: "single_choice",
        required: true,
        options: ["Poslati upit", "Kupiti proizvod", "Zakazati termin", "Prijaviti se", "Nazvati", "Poslati poruku", "Preuzeti dokument", "Ostaviti email", "Drugo"].map(
          (label) => ({ value: label, label })
        )
      },
      {
        key: "landing_campaigns",
        label: "Da li landing page treba biti povezan sa reklamnim kampanjama?",
        type: "multiple_choice",
        options: ["Google Ads", "Meta Ads", "TikTok Ads", "LinkedIn Ads", "Email kampanja", "Ne", "Nisam siguran/sigurna"].map(
          (label) => ({ value: label, label })
        )
      }
    ]
  },
  {
    key: "redesign_module",
    eyebrow: "Modul",
    title: "Redizajn",
    description: "Šta mijenjamo, šta zadržavamo i da li treba migracija podataka.",
    projectTypes: ["redesign"],
    fields: [
      {
        key: "redesign_changes",
        label: "Šta želite promijeniti na postojećem sajtu/aplikaciji?",
        type: "multiple_choice",
        required: true,
        options: ["Dizajn", "Brzinu", "Mobilnu verziju", "SEO", "Strukturu sadržaja", "Admin panel", "Funkcionalnosti", "Sigurnost", "Tehničku platformu", "Konverzije", "Drugo"].map(
          (label) => ({ value: label, label })
        )
      },
      {
        key: "keep_content",
        label: "Da li želite zadržati postojeći sadržaj?",
        type: "single_choice",
        required: true,
        options: ["Da, sav sadržaj", "Da, djelimično", "Ne, želimo novi sadržaj", "Nisam siguran/sigurna"].map((label) => ({
          value: label,
          label
        }))
      },
      {
        key: "data_migration",
        label: "Da li želite migraciju postojećih podataka?",
        type: "single_choice",
        options: ["Da", "Ne", "Možda", "Nisam siguran/sigurna"].map((label) => ({ value: label, label }))
      },
      {
        key: "migration_data",
        label: "Koje podatke treba migrirati?",
        type: "multiple_choice",
        showWhen: (answers) => ["Da", "Možda"].includes(String(answers.data_migration || "")),
        options: ["Stranice", "Blog objave", "Proizvodi", "Korisnici", "Narudžbe", "Slike", "Dokumenti", "SEO meta podaci", "Drugo"].map(
          (label) => ({ value: label, label })
        )
      }
    ]
  },
  {
    key: "design_marketing",
    eyebrow: "Dizajn i marketing",
    title: "Vizuelni identitet, SEO i analitika",
    description: "Ovaj dio pomaže da procijenimo dizajn, sadržaj i marketinšku infrastrukturu.",
    fields: [
      {
        key: "brand_assets",
        label: "Da li imate postojeći vizuelni identitet?",
        type: "multiple_choice",
        options: ["Logo", "Boje", "Fontove", "Brand guide", "Fotografije", "Video materijale", "Nemamo vizuelni identitet", "Treba nam pomoć oko brendinga"].map(
          (label) => ({ value: label, label })
        )
      },
      {
        key: "visual_style",
        label: "Kakav vizuelni stil želite?",
        type: "multiple_choice",
        required: true,
        options: [
          "Moderan i minimalistički",
          "Premium/luksuzan",
          "Korporativan",
          "Kreativan i dinamičan",
          "Tech/startup",
          "Medicinski/profesionalan",
          "Topao i prijateljski",
          "Elegantno i jednostavno",
          "Ne znam, želim prijedlog",
          "Drugo"
        ].map((label) => ({ value: label, label }))
      },
      {
        key: "reference_sites",
        label: "Imate li primjere sajtova koji vam se sviđaju?",
        type: "textarea",
        placeholder: "Unesite linkove i napišite šta vam se sviđa kod njih."
      },
      {
        key: "seo_importance",
        label: "Koliko vam je važna Google optimizacija / SEO?",
        type: "single_choice",
        required: true,
        description: "SEO je proces optimizacije sajta kako bi se bolje prikazivao na Google pretrazi.",
        options: ["Veoma važno", "Važno, ali osnovno", "Nije trenutno prioritet", "Ne znam šta je SEO", "Želim preporuku"].map(
          (label) => ({ value: label, label })
        )
      },
      {
        key: "analytics_tools",
        label: "Da li želite praćenje posjeta i ponašanja korisnika?",
        type: "multiple_choice",
        options: ["Google Analytics", "Google Search Console", "Google Tag Manager", "Meta Pixel", "TikTok Pixel", "Hotjar / Microsoft Clarity", "Nisam siguran/sigurna", "Ne"].map(
          (label) => ({ value: label, label })
        )
      }
    ]
  },
  {
    key: "content_legal",
    eyebrow: "Sadržaj i usklađenost",
    title: "Administracija, pravne stranice i cookie banner",
    description: "Planiramo ko priprema sadržaj, ko ga kasnije uređuje i koje pravne elemente treba uključiti.",
    fields: [
      {
        key: "content_owner",
        label: "Ko će pripremiti sadržaj?",
        type: "single_choice",
        required: true,
        options: ["Mi pripremamo sav sadržaj", "Vi pripremate sadržaj", "Zajedno pripremamo sadržaj", "Nemamo još definisano", "Treba nam kompletna pomoć"].map(
          (label) => ({ value: label, label })
        )
      },
      {
        key: "self_admin",
        label: "Da li želite sami uređivati sadržaj nakon završetka projekta?",
        type: "single_choice",
        required: true,
        options: ["Da", "Ne", "Djelimično", "Nisam siguran/sigurna"].map((label) => ({ value: label, label }))
      },
      {
        key: "editable_content",
        label: "Šta želite uređivati sami?",
        type: "multiple_choice",
        showWhen: (answers) => ["Da", "Djelimično"].includes(String(answers.self_admin || "")),
        options: ["Tekstove", "Slike", "Blog objave", "Proizvode", "Cijene", "Kategorije", "Korisnike", "Narudžbe", "Termine", "Stranice", "Drugo"].map(
          (label) => ({ value: label, label })
        )
      },
      {
        key: "legal_pages",
        label: "Da li vam trebaju pravne stranice?",
        type: "multiple_choice",
        options: ["Uslovi korištenja", "Politika privatnosti", "Cookie politika", "GDPR saglasnosti", "Pravila povrata/reklamacije", "Uslovi kupovine", "Nisam siguran/sigurna", "Ne"].map(
          (label) => ({ value: label, label })
        )
      },
      {
        key: "cookie_banner",
        label: "Da li sajt treba imati cookie consent/banner?",
        type: "single_choice",
        options: yesNoUnsure
      }
    ]
  },
  {
    key: "budget_timeline",
    eyebrow: "Budžet i rokovi",
    title: "Okvir, početak i prioriteti",
    description: "Ovi odgovori pomažu da predložimo realan obim, faze i tehnologiju.",
    fields: [
      {
        key: "budget_range",
        label: "Koji okvirni budžet imate za projekat?",
        type: "single_choice",
        required: true,
        options: ["Do 500 €", "500-1.500 €", "1.500-3.000 €", "3.000-7.000 €", "7.000-15.000 €", "15.000 €+", "Želim prvo okvirnu procjenu", "Ne želim navesti budžet"].map(
          (label) => ({ value: label, label })
        )
      },
      {
        key: "desired_start",
        label: "Kada želite da projekat počne?",
        type: "single_choice",
        required: true,
        options: ["Odmah", "U narednih 30 dana", "U naredna 2-3 mjeseca", "Kasnije", "Nisam siguran/sigurna"].map((label) => ({
          value: label,
          label
        }))
      },
      {
        key: "fixed_deadline",
        label: "Da li imate fiksni rok za završetak?",
        type: "single_choice",
        required: true,
        options: ["Da", "Ne", "Poželjno, ali nije strogo"].map((label) => ({ value: label, label }))
      },
      {
        key: "desired_deadline",
        label: "Unesite željeni rok",
        type: "date",
        showWhen: (answers) => ["Da", "Poželjno, ali nije strogo"].includes(String(answers.fixed_deadline || ""))
      },
      {
        key: "priorities",
        label: "Šta vam je najvažnije?",
        type: "ranking",
        description: "Kliknite prioritete redom važnosti. Ponovni klik uklanja prioritet.",
        options: ["Cijena", "Brzina izrade", "Kvalitet dizajna", "SEO", "Performanse", "Sigurnost", "Fleksibilnost sistema", "Dugoročna skalabilnost", "Jednostavno održavanje"].map(
          (label) => ({ value: label, label })
        )
      }
    ]
  },
  {
    key: "final",
    eyebrow: "Završni korak",
    title: "Još par detalja prije slanja",
    description: "Dodajte kontekst koji nije stao u prethodna pitanja i odaberite željeni sljedeći korak.",
    fields: [
      {
        key: "additional_notes",
        label: "Dodajte sve što mislite da je važno",
        type: "textarea"
      },
      {
        key: "next_step",
        label: "Šta želite kao sljedeći korak?",
        type: "single_choice",
        required: true,
        options: ["Želim okvirnu ponudu", "Želim konsultacije", "Želim tehnički prijedlog", "Želim prvo da analizirate moje odgovore", "Nisam siguran/sigurna"].map(
          (label) => ({ value: label, label })
        )
      },
      {
        key: "privacy_consent",
        label: "Saglasan/saglasna sam da Wizionar koristi dostavljene podatke za analizu upita i kontakt u vezi projekta.",
        type: "consent",
        required: true
      }
    ]
  }
];
const stepText = {
  en: {
    contact: {
      eyebrow: "Basic information",
      title: "Who is contacting us?",
      description: "Details we need to contact you and understand the business context."
    },
    classification: {
      eyebrow: "Classification",
      title: "What kind of project do you want to build?",
      description: "This answer decides which additional questions appear later."
    },
    goals: {
      eyebrow: "Goals",
      title: "What should the project achieve?",
      description: "Select multiple answers if the project has several business goals."
    },
    current_state: {
      eyebrow: "Current state",
      title: "Do you already have a digital solution?",
      description: "If you already have a website, shop or app, it helps to know what works and what needs improvement."
    },
    technical_base: {
      eyebrow: "Domain and hosting",
      title: "Technical foundation",
      description: "A domain is your web address, while hosting is the server space where the site or app lives."
    },
    presentation_module: {
      eyebrow: "Module",
      title: "Presentation website",
      description: "Structure, content, features and languages for a business website."
    },
    ecommerce_module: {
      eyebrow: "Module",
      title: "Online shop",
      description: "Products, payments, delivery and shop administration."
    },
    app_module: {
      eyebrow: "Module",
      title: "Web application / platform",
      description: "Users, roles, features, data and integrations."
    },
    booking_module: {
      eyebrow: "Module",
      title: "Booking / reservation system",
      description: "Reservation type, availability, payments and reminders."
    },
    landing_module: {
      eyebrow: "Module",
      title: "Landing page",
      description: "Campaign goal, main action and ad campaign connection."
    },
    redesign_module: {
      eyebrow: "Module",
      title: "Redesign",
      description: "What we change, what we keep and whether data migration is needed."
    },
    design_marketing: {
      eyebrow: "Design and marketing",
      title: "Visual identity, SEO and analytics",
      description: "This part helps us assess design, content and marketing infrastructure."
    },
    content_legal: {
      eyebrow: "Content and compliance",
      title: "Administration, legal pages and cookie banner",
      description: "We plan who prepares content, who edits it later and which legal elements are needed."
    },
    budget_timeline: {
      eyebrow: "Budget and timeline",
      title: "Budget, start date and priorities",
      description: "These answers help us suggest a realistic scope, phases and technology."
    },
    final: {
      eyebrow: "Final step",
      title: "A few more details before sending",
      description: "Add context that did not fit previous questions and choose the desired next step."
    }
  },
  de: {
    contact: {
      eyebrow: "Grunddaten",
      title: "Wer kontaktiert uns?",
      description: "Daten, die wir benötigen, um Sie zu kontaktieren und den Geschäftskontext zu verstehen."
    },
    classification: {
      eyebrow: "Klassifizierung",
      title: "Welche Art von Projekt möchten Sie umsetzen?",
      description: "Diese Antwort bestimmt, welche zusätzlichen Fragen später angezeigt werden."
    },
    goals: {
      eyebrow: "Ziele",
      title: "Was soll das Projekt erreichen?",
      description: "Wählen Sie mehrere Antworten, wenn das Projekt mehrere Geschäftsziele hat."
    },
    current_state: {
      eyebrow: "Aktueller Stand",
      title: "Haben Sie bereits eine digitale Lösung?",
      description: "Wenn Sie bereits Website, Shop oder App haben, hilft uns zu wissen, was funktioniert und was verbessert werden soll."
    },
    technical_base: {
      eyebrow: "Domain und Hosting",
      title: "Technische Grundlage",
      description: "Eine Domain ist Ihre Webadresse, Hosting ist der Serverplatz für Website oder App."
    },
    presentation_module: {
      eyebrow: "Modul",
      title: "Präsentationswebsite",
      description: "Struktur, Inhalte, Funktionen und Sprachen für eine Unternehmenswebsite."
    },
    ecommerce_module: {
      eyebrow: "Modul",
      title: "Online-Shop",
      description: "Produkte, Zahlungen, Lieferung und Shop-Administration."
    },
    app_module: {
      eyebrow: "Modul",
      title: "Webanwendung / Plattform",
      description: "Benutzer, Rollen, Funktionen, Daten und Integrationen."
    },
    booking_module: {
      eyebrow: "Modul",
      title: "Buchungs- / Reservierungssystem",
      description: "Reservierungstyp, Verfügbarkeit, Zahlungen und Erinnerungen."
    },
    landing_module: {
      eyebrow: "Modul",
      title: "Landingpage",
      description: "Kampagnenziel, Hauptaktion und Verbindung zu Werbekampagnen."
    },
    redesign_module: {
      eyebrow: "Modul",
      title: "Redesign",
      description: "Was geändert wird, was erhalten bleibt und ob Datenmigration nötig ist."
    },
    design_marketing: {
      eyebrow: "Design und Marketing",
      title: "Visuelle Identität, SEO und Analytics",
      description: "Dieser Teil hilft uns, Design, Inhalte und Marketing-Infrastruktur einzuschätzen."
    },
    content_legal: {
      eyebrow: "Inhalte und Compliance",
      title: "Administration, rechtliche Seiten und Cookie-Banner",
      description: "Wir planen, wer Inhalte vorbereitet, wer sie später bearbeitet und welche rechtlichen Elemente nötig sind."
    },
    budget_timeline: {
      eyebrow: "Budget und Zeitplan",
      title: "Budget, Start und Prioritäten",
      description: "Diese Antworten helfen uns, realistischen Umfang, Phasen und Technologie vorzuschlagen."
    },
    final: {
      eyebrow: "Letzter Schritt",
      title: "Ein paar Details vor dem Absenden",
      description: "Fügen Sie Kontext hinzu, der in den vorherigen Fragen keinen Platz hatte, und wählen Sie den nächsten Schritt."
    }
  },
  it: {
    contact: {
      eyebrow: "Dati di base",
      title: "Chi ci sta contattando?",
      description: "Informazioni necessarie per contattarti e capire il contesto aziendale."
    },
    classification: {
      eyebrow: "Classificazione",
      title: "Che tipo di progetto vuoi realizzare?",
      description: "Questa risposta determina quali domande aggiuntive verranno mostrate in seguito."
    },
    goals: {
      eyebrow: "Obiettivi",
      title: "Cosa deve ottenere il progetto?",
      description: "Seleziona più risposte se il progetto ha più obiettivi di business."
    },
    current_state: {
      eyebrow: "Stato attuale",
      title: "Hai già una soluzione digitale?",
      description: "Se hai già un sito, shop o app, è utile sapere cosa funziona e cosa va migliorato."
    },
    technical_base: {
      eyebrow: "Dominio e hosting",
      title: "Base tecnica",
      description: "Il dominio è l'indirizzo web, mentre l'hosting è lo spazio/server dove vive il sito o l'app."
    },
    presentation_module: {
      eyebrow: "Modulo",
      title: "Sito web di presentazione",
      description: "Struttura, contenuti, funzionalità e lingue per un sito aziendale."
    },
    ecommerce_module: {
      eyebrow: "Modulo",
      title: "Shop online",
      description: "Prodotti, pagamenti, consegna e amministrazione dello shop."
    },
    app_module: {
      eyebrow: "Modulo",
      title: "Applicazione web / piattaforma",
      description: "Utenti, ruoli, funzionalità, dati e integrazioni."
    },
    booking_module: {
      eyebrow: "Modulo",
      title: "Sistema booking / prenotazioni",
      description: "Tipo di prenotazione, disponibilità, pagamenti e promemoria."
    },
    landing_module: {
      eyebrow: "Modulo",
      title: "Landing page",
      description: "Obiettivo della campagna, azione principale e collegamento con gli annunci."
    },
    redesign_module: {
      eyebrow: "Modulo",
      title: "Redesign",
      description: "Cosa cambiare, cosa mantenere e se serve migrare dati."
    },
    design_marketing: {
      eyebrow: "Design e marketing",
      title: "Identità visiva, SEO e analytics",
      description: "Questa parte ci aiuta a valutare design, contenuti e infrastruttura marketing."
    },
    content_legal: {
      eyebrow: "Contenuti e conformità",
      title: "Amministrazione, pagine legali e cookie banner",
      description: "Pianifichiamo chi prepara i contenuti, chi li gestirà dopo e quali elementi legali servono."
    },
    budget_timeline: {
      eyebrow: "Budget e tempi",
      title: "Budget, inizio e priorità",
      description: "Queste risposte aiutano a proporre ambito, fasi e tecnologia realistici."
    },
    final: {
      eyebrow: "Ultimo passo",
      title: "Ancora pochi dettagli prima dell'invio",
      description: "Aggiungi contesto non coperto dalle domande precedenti e scegli il prossimo passo desiderato."
    }
  }
};
const fieldText = {
  en: {
    full_name: { label: "Full name" },
    company_name: { label: "Company / project name" },
    email: { label: "Email address" },
    phone: { label: "Phone" },
    location: { label: "Country / city" },
    business_description: {
      label: "What do you do?",
      placeholder: "Briefly describe your company, services, products or idea."
    },
    project_type: { label: "Project type" },
    idea_if_unsure: { label: "If you are not sure, describe the idea in your own words" },
    main_goals: { label: "Main project goal" },
    other_goal: { label: "Describe the other goal" },
    project_description: {
      label: "What should users be able to do on your site or app?",
      placeholder: "Example: browse services, send an inquiry, buy a product, book an appointment, log in or use a dashboard."
    },
    existing_solution_status: { label: "Do you currently have a website, online shop or application?" },
    existing_solution_url: { label: "Existing website / application link" },
    existing_solution_pain_points: { label: "What bothers you most about the current solution?" },
    existing_solution_other_problem: { label: "Describe the problem" },
    domain_status: { label: "Do you have a domain?" },
    domain_name: { label: "Which domain do you use?" },
    domain_help: { label: "Would you like help choosing and registering a domain?" },
    hosting_status: { label: "Do you have hosting or a server?" },
    hosting_type: { label: "Which hosting/server do you use?" },
    hosting_other: { label: "Enter the hosting/server name" },
    maintenance: { label: "Would you like us to take over technical maintenance after launch?" },
    website_pages: { label: "Which pages do you want on the website?" },
    website_pages_other: { label: "List additional pages" },
    website_content_status: { label: "Do you have content prepared for the website?" },
    website_features: { label: "Which features do you want?" },
    website_languages: { label: "Should the website be multilingual?" },
    product_count: { label: "How many products do you plan to have at the start?" },
    product_variations: {
      label: "Do products have variations?",
      description: "Variations include size, color, model, capacity, weight or packaging."
    },
    payment_methods: { label: "Which payment methods do you want?" },
    delivery_methods: { label: "How do you plan to organize delivery?" },
    product_admin: { label: "How do you want to enter products?" },
    inventory_tracking: { label: "Do you need inventory tracking?" },
    app_users: { label: "Who will use the application?" },
    user_accounts: { label: "Do users need their own accounts?" },
    account_features: { label: "Which features should a user account have?" },
    app_features: { label: "Which features do you expect in the application?" },
    app_flow: {
      label: "Describe the main application flow",
      placeholder: "Example: The user registers, buys a package, gets dashboard access, uses features and receives notifications."
    },
    stored_data: { label: "Which data should the system store?" },
    booking_resource: { label: "What do users reserve?" },
    booking_availability: { label: "Do reservations depend on availability?" },
    booking_payment: { label: "Should users pay for reservations online?" },
    booking_reminders: { label: "Do you want automatic reminders?" },
    landing_promotion: { label: "What should the landing page promote?" },
    landing_action: { label: "What is the main action visitors should take?" },
    landing_campaigns: { label: "Should the landing page be connected to ad campaigns?" },
    redesign_changes: { label: "What do you want to change on the existing site/app?" },
    keep_content: { label: "Do you want to keep existing content?" },
    data_migration: { label: "Do you want existing data migrated?" },
    migration_data: { label: "Which data should be migrated?" },
    brand_assets: { label: "Do you have an existing visual identity?" },
    visual_style: { label: "What visual style do you want?" },
    reference_sites: {
      label: "Do you have examples of websites you like?",
      placeholder: "Enter links and describe what you like about them."
    },
    seo_importance: {
      label: "How important is Google optimization / SEO?",
      description: "SEO is the process of optimizing a site so it appears better in Google search."
    },
    analytics_tools: { label: "Do you want visitor and behavior tracking?" },
    content_owner: { label: "Who will prepare the content?" },
    self_admin: { label: "Do you want to edit content yourself after project completion?" },
    editable_content: { label: "What do you want to edit yourself?" },
    legal_pages: { label: "Do you need legal pages?" },
    cookie_banner: { label: "Should the site have a cookie consent/banner?" },
    budget_range: { label: "What approximate budget do you have for the project?" },
    desired_start: { label: "When do you want the project to start?" },
    fixed_deadline: { label: "Do you have a fixed completion deadline?" },
    desired_deadline: { label: "Enter the desired deadline", placeholder: "dd.mm.yyyy" },
    priorities: {
      label: "What is most important to you?",
      description: "Click priorities in order of importance. Click again to remove a priority."
    },
    additional_notes: { label: "Add anything you think is important" },
    next_step: { label: "What would you like as the next step?" },
    privacy_consent: {
      label: "I agree that Wizionar may use the submitted data to analyze the inquiry and contact me about the project."
    }
  },
  de: {
    full_name: { label: "Vor- und Nachname" },
    company_name: { label: "Firma / Projektname" },
    email: { label: "Email-Adresse" },
    phone: { label: "Telefon" },
    location: { label: "Land / Stadt" },
    business_description: {
      label: "Was machen Sie?",
      placeholder: "Beschreiben Sie kurz Ihr Unternehmen, Ihre Leistungen, Produkte oder Idee."
    },
    project_type: { label: "Projekttyp" },
    idea_if_unsure: { label: "Wenn Sie nicht sicher sind, beschreiben Sie die Idee in Ihren eigenen Worten" },
    main_goals: { label: "Hauptziel des Projekts" },
    other_goal: { label: "Beschreiben Sie das andere Ziel" },
    project_description: {
      label: "Was sollen Benutzer auf Ihrer Website oder App tun können?",
      placeholder: "Beispiel: Leistungen ansehen, Anfrage senden, Produkt kaufen, Termin buchen, einloggen oder Dashboard nutzen."
    },
    existing_solution_status: { label: "Haben Sie aktuell eine Website, einen Online-Shop oder eine Anwendung?" },
    existing_solution_url: { label: "Link zur bestehenden Website / Anwendung" },
    existing_solution_pain_points: { label: "Was stört Sie am meisten an der aktuellen Lösung?" },
    existing_solution_other_problem: { label: "Beschreiben Sie das Problem" },
    domain_status: { label: "Haben Sie eine Domain?" },
    domain_name: { label: "Welche Domain nutzen Sie?" },
    domain_help: { label: "Möchten Sie Hilfe bei Auswahl und Registrierung der Domain?" },
    hosting_status: { label: "Haben Sie Hosting oder einen Server?" },
    hosting_type: { label: "Welches Hosting / welchen Server nutzen Sie?" },
    hosting_other: { label: "Hosting-/Servernamen eingeben" },
    maintenance: { label: "Möchten Sie, dass wir nach Fertigstellung die technische Wartung übernehmen?" },
    website_pages: { label: "Welche Seiten wünschen Sie auf der Website?" },
    website_pages_other: { label: "Weitere Seiten angeben" },
    website_content_status: { label: "Haben Sie Inhalte für die Website vorbereitet?" },
    website_features: { label: "Welche Funktionen wünschen Sie?" },
    website_languages: { label: "Soll die Website mehrsprachig sein?" },
    product_count: { label: "Wie viele Produkte planen Sie zu Beginn?" },
    product_variations: {
      label: "Haben Produkte Varianten?",
      description: "Varianten sind z. B. Größe, Farbe, Modell, Kapazität, Gewicht oder Verpackung."
    },
    payment_methods: { label: "Welche Zahlungsmethoden wünschen Sie?" },
    delivery_methods: { label: "Wie planen Sie die Lieferung zu organisieren?" },
    product_admin: { label: "Wie möchten Sie Produkte einpflegen?" },
    inventory_tracking: { label: "Benötigen Sie Lagerbestandsverfolgung?" },
    app_users: { label: "Wer wird die Anwendung nutzen?" },
    user_accounts: { label: "Benötigen Benutzer eigene Konten?" },
    account_features: { label: "Welche Funktionen soll ein Benutzerkonto haben?" },
    app_features: { label: "Welche Funktionen erwarten Sie in der Anwendung?" },
    app_flow: {
      label: "Beschreiben Sie den Hauptablauf der Anwendung",
      placeholder: "Beispiel: Der Benutzer registriert sich, kauft ein Paket, erhält Dashboard-Zugang, nutzt Funktionen und bekommt Benachrichtigungen."
    },
    stored_data: { label: "Welche Daten soll das System speichern?" },
    booking_resource: { label: "Was reservieren die Benutzer?" },
    booking_availability: { label: "Hängen Reservierungen von Verfügbarkeit ab?" },
    booking_payment: { label: "Sollen Benutzer Reservierungen online bezahlen?" },
    booking_reminders: { label: "Möchten Sie automatische Erinnerungen?" },
    landing_promotion: { label: "Was soll die Landingpage bewerben?" },
    landing_action: { label: "Welche Hauptaktion sollen Besucher ausführen?" },
    landing_campaigns: { label: "Soll die Landingpage mit Werbekampagnen verbunden sein?" },
    redesign_changes: { label: "Was möchten Sie an der bestehenden Website/App ändern?" },
    keep_content: { label: "Möchten Sie bestehende Inhalte behalten?" },
    data_migration: { label: "Möchten Sie bestehende Daten migrieren?" },
    migration_data: { label: "Welche Daten sollen migriert werden?" },
    brand_assets: { label: "Haben Sie eine bestehende visuelle Identität?" },
    visual_style: { label: "Welchen visuellen Stil wünschen Sie?" },
    reference_sites: {
      label: "Haben Sie Beispiele von Websites, die Ihnen gefallen?",
      placeholder: "Fügen Sie Links ein und beschreiben Sie, was Ihnen daran gefällt."
    },
    seo_importance: {
      label: "Wie wichtig ist Google-Optimierung / SEO?",
      description: "SEO ist die Optimierung der Website, damit sie in der Google-Suche besser erscheint."
    },
    analytics_tools: { label: "Möchten Sie Besuche und Nutzerverhalten messen?" },
    content_owner: { label: "Wer bereitet die Inhalte vor?" },
    self_admin: { label: "Möchten Sie Inhalte nach Projektabschluss selbst bearbeiten?" },
    editable_content: { label: "Was möchten Sie selbst bearbeiten?" },
    legal_pages: { label: "Benötigen Sie rechtliche Seiten?" },
    cookie_banner: { label: "Soll die Website einen Cookie-Consent/Banner haben?" },
    budget_range: { label: "Welches ungefähre Budget haben Sie für das Projekt?" },
    desired_start: { label: "Wann soll das Projekt starten?" },
    fixed_deadline: { label: "Haben Sie einen festen Fertigstellungstermin?" },
    desired_deadline: { label: "Gewünschten Termin eingeben", placeholder: "tt.mm.jjjj" },
    priorities: {
      label: "Was ist Ihnen am wichtigsten?",
      description: "Klicken Sie Prioritäten in Reihenfolge der Wichtigkeit. Ein weiterer Klick entfernt sie."
    },
    additional_notes: { label: "Fügen Sie alles hinzu, was Sie wichtig finden" },
    next_step: { label: "Was wünschen Sie als nächsten Schritt?" },
    privacy_consent: {
      label: "Ich stimme zu, dass Wizionar die übermittelten Daten zur Analyse der Anfrage und zur Kontaktaufnahme zum Projekt verwendet."
    }
  },
  it: {
    full_name: { label: "Nome e cognome" },
    company_name: { label: "Nome azienda / progetto" },
    email: { label: "Indirizzo email" },
    phone: { label: "Telefono" },
    location: { label: "Paese / città" },
    business_description: {
      label: "Di cosa ti occupi?",
      placeholder: "Descrivi brevemente azienda, servizi, prodotti o idea."
    },
    project_type: { label: "Tipo di progetto" },
    idea_if_unsure: { label: "Se non sei sicuro, descrivi l'idea con parole tue" },
    main_goals: { label: "Obiettivo principale del progetto" },
    other_goal: { label: "Descrivi l'altro obiettivo" },
    project_description: {
      label: "Cosa deve poter fare l'utente sul sito o nell'app?",
      placeholder: "Esempio: vedere servizi, inviare richiesta, acquistare prodotto, prenotare appuntamento, accedere o usare dashboard."
    },
    existing_solution_status: { label: "Hai attualmente un sito web, shop online o applicazione?" },
    existing_solution_url: { label: "Link al sito / applicazione esistente" },
    existing_solution_pain_points: { label: "Cosa ti dà più fastidio nella soluzione attuale?" },
    existing_solution_other_problem: { label: "Descrivi il problema" },
    domain_status: { label: "Hai un dominio?" },
    domain_name: { label: "Quale dominio usi?" },
    domain_help: { label: "Vuoi aiuto nella scelta e registrazione del dominio?" },
    hosting_status: { label: "Hai hosting o server?" },
    hosting_type: { label: "Quale hosting/server usi?" },
    hosting_other: { label: "Inserisci il nome dell'hosting/server" },
    maintenance: { label: "Vuoi che gestiamo noi la manutenzione tecnica dopo la realizzazione?" },
    website_pages: { label: "Quali pagine vuoi nel sito?" },
    website_pages_other: { label: "Indica pagine aggiuntive" },
    website_content_status: { label: "Hai contenuti pronti per il sito?" },
    website_features: { label: "Quali funzionalità vuoi?" },
    website_languages: { label: "Il sito deve essere multilingua?" },
    product_count: { label: "Quanti prodotti prevedi all'inizio?" },
    product_variations: {
      label: "I prodotti hanno varianti?",
      description: "Le varianti sono ad esempio taglia, colore, modello, capacità, peso o confezione."
    },
    payment_methods: { label: "Quali metodi di pagamento vuoi?" },
    delivery_methods: { label: "Come pensi di organizzare la consegna?" },
    product_admin: { label: "Come vuoi inserire i prodotti?" },
    inventory_tracking: { label: "Ti serve il monitoraggio delle scorte?" },
    app_users: { label: "Chi userà l'applicazione?" },
    user_accounts: { label: "Gli utenti devono avere account propri?" },
    account_features: { label: "Quali funzioni deve avere l'account utente?" },
    app_features: { label: "Quali funzionalità ti aspetti nell'applicazione?" },
    app_flow: {
      label: "Descrivi il flusso principale dell'applicazione",
      placeholder: "Esempio: l'utente si registra, acquista un pacchetto, accede alla dashboard, usa funzioni e riceve notifiche."
    },
    stored_data: { label: "Quali dati deve salvare il sistema?" },
    booking_resource: { label: "Cosa prenotano gli utenti?" },
    booking_availability: { label: "Le prenotazioni dipendono dalla disponibilità?" },
    booking_payment: { label: "Gli utenti devono pagare online la prenotazione?" },
    booking_reminders: { label: "Vuoi promemoria automatici?" },
    landing_promotion: { label: "Cosa deve promuovere la landing page?" },
    landing_action: { label: "Qual è l'azione principale che il visitatore deve compiere?" },
    landing_campaigns: { label: "La landing page deve essere collegata a campagne pubblicitarie?" },
    redesign_changes: { label: "Cosa vuoi cambiare nel sito/app esistente?" },
    keep_content: { label: "Vuoi mantenere i contenuti esistenti?" },
    data_migration: { label: "Vuoi migrare dati esistenti?" },
    migration_data: { label: "Quali dati devono essere migrati?" },
    brand_assets: { label: "Hai un'identità visiva esistente?" },
    visual_style: { label: "Che stile visivo desideri?" },
    reference_sites: {
      label: "Hai esempi di siti che ti piacciono?",
      placeholder: "Inserisci link e scrivi cosa ti piace."
    },
    seo_importance: {
      label: "Quanto è importante l'ottimizzazione Google / SEO?",
      description: "La SEO è il processo di ottimizzazione del sito per apparire meglio nella ricerca Google."
    },
    analytics_tools: { label: "Vuoi tracciare visite e comportamento utenti?" },
    content_owner: { label: "Chi preparerà i contenuti?" },
    self_admin: { label: "Vuoi modificare i contenuti autonomamente dopo il completamento?" },
    editable_content: { label: "Cosa vuoi modificare da solo?" },
    legal_pages: { label: "Ti servono pagine legali?" },
    cookie_banner: { label: "Il sito deve avere cookie consent/banner?" },
    budget_range: { label: "Qual è il budget indicativo per il progetto?" },
    desired_start: { label: "Quando vuoi che inizi il progetto?" },
    fixed_deadline: { label: "Hai una scadenza fissa per il completamento?" },
    desired_deadline: { label: "Inserisci la scadenza desiderata", placeholder: "gg.mm.aaaa" },
    priorities: {
      label: "Cosa è più importante per te?",
      description: "Clicca le priorità in ordine di importanza. Un altro clic rimuove la priorità."
    },
    additional_notes: { label: "Aggiungi tutto ciò che ritieni importante" },
    next_step: { label: "Cosa desideri come prossimo passo?" },
    privacy_consent: {
      label: "Accetto che Wizionar utilizzi i dati inviati per analizzare la richiesta e contattarmi sul progetto."
    }
  }
};
const optionText = {
  en: {
    Da: "Yes",
    Ne: "No",
    "Nisam siguran/sigurna": "Not sure",
    "Možda kasnije": "Maybe later",
    "Ne znam": "I don't know",
    Drugo: "Other",
    yes: "Yes",
    no: "No",
    not_sure: "Not sure",
    "Prezentacioni web sajt": "Presentation website",
    "Web shop / online prodavnica": "Online shop",
    "Web aplikacija / platforma": "Web application / platform",
    "Booking / rezervacijski sistem": "Booking / reservation system",
    "Landing page": "Landing page",
    "Redizajn postojećeg sajta ili aplikacije": "Redesign of an existing site or application",
    "Predstavljanje firme ili usluga": "Presenting a company or services",
    "Povećanje broja upita": "Increasing the number of inquiries",
    "Online prodaja proizvoda": "Online product sales",
    "Online prodaja usluga": "Online service sales",
    "Automatizacija poslovnog procesa": "Business process automation",
    "Rezervacija termina": "Appointment booking",
    "Upravljanje korisnicima": "User management",
    "Edukacija korisnika": "User education",
    "Kreiranje zajednice / community sistema": "Community system",
    "Interni poslovni sistem": "Internal business system",
    "SaaS aplikacija": "SaaS application",
    "Marketplace/platforma": "Marketplace/platform",
    "Bolji SEO i Google vidljivost": "Better SEO and Google visibility",
    "Bolji dizajn i korisničko iskustvo": "Better design and user experience",
    "U izradi je": "It is in progress",
    "Zastarjeli dizajn": "Outdated design",
    "Spor sajt": "Slow site",
    "Loša mobilna verzija": "Poor mobile version",
    "Loša Google vidljivost": "Poor Google visibility",
    "Teško uređivanje sadržaja": "Difficult content editing",
    "Nema admin panel": "No admin panel",
    "Nema online plaćanje": "No online payment",
    "Loše korisničko iskustvo": "Poor user experience",
    "Nedostaju funkcionalnosti": "Missing features",
    "Tehnički problemi": "Technical issues",
    "Sigurnosni problemi": "Security issues",
    "Da, imam domen": "Yes, I have a domain",
    "Ne, nemam domen": "No, I do not have a domain",
    "Ne znam šta je domen": "I do not know what a domain is",
    "Da, imam hosting/server": "Yes, I have hosting/server",
    "Ne, nemam hosting/server": "No, I do not have hosting/server",
    "Ne znam šta je hosting": "I do not know what hosting is",
    "Želim prvo više informacija": "I want more information first",
    Početna: "Home",
    "O nama": "About us",
    Usluge: "Services",
    "Pojedinačne stranice usluga": "Individual service pages",
    "Portfolio / reference": "Portfolio / references",
    Tim: "Team",
    Galerija: "Gallery",
    "Blog / novosti": "Blog / news",
    Cjenovnik: "Price list",
    "Česta pitanja": "FAQ",
    Kontakt: "Contact",
    Karijere: "Careers",
    "Lokacije / poslovnice": "Locations / branches",
    "Pravne stranice": "Legal pages",
    "Da, imamo tekstove i slike": "Yes, we have text and images",
    "Imamo tekstove, ali ne i slike": "We have text, but not images",
    "Imamo slike, ali ne i tekstove": "We have images, but not text",
    "Imamo djelimičan sadržaj": "We have partial content",
    "Nemamo sadržaj": "We do not have content",
    "Treba nam kompletna pomoć oko sadržaja": "We need full help with content",
    "Kontakt forma": "Contact form",
    "Forma za upit/ponudu": "Inquiry/quote form",
    "Google mapa": "Google map",
    "Blog sistem": "Blog system",
    "Prikaz referenci": "Reference display",
    "Newsletter prijava": "Newsletter signup",
    "WhatsApp/Viber kontakt dugme": "WhatsApp/Viber contact button",
    Višejezičnost: "Multilingual support",
    "Admin panel za uređivanje sadržaja": "Admin panel for content editing",
    "Osnovna SEO optimizacija": "Basic SEO optimization",
    "Napredna SEO struktura": "Advanced SEO structure",
    "Ne, samo jedan jezik": "No, one language only",
    "Engleski": "English",
    "Njemački": "German",
    "Italijanski": "Italian",
    "Ne znam još": "I do not know yet",
    "Plaćanje pouzećem": "Cash on delivery",
    "Bankovna uplata": "Bank transfer",
    "Kartično plaćanje": "Card payment",
    "Kripto plaćanje": "Crypto payment",
    "Kurirska služba": "Courier service",
    "Vlastita dostava": "Own delivery",
    "Lično preuzimanje": "Personal pickup",
    "Digitalni proizvodi": "Digital products",
    "Dostava nije potrebna": "Delivery is not needed",
    "Ručno kroz admin panel": "Manually through admin panel",
    "Import iz Excel/CSV fajla": "Import from Excel/CSV file",
    "API integracija sa drugim sistemom": "API integration with another system",
    "Automatska sinhronizacija sa dobavljačem": "Automatic supplier synchronization",
    "Registrovani korisnici": "Registered users",
    Kupci: "Customers",
    Zaposleni: "Employees",
    Partneri: "Partners",
    "Edukatori / mentori": "Educators / mentors",
    Moderatori: "Moderators",
    Menadžeri: "Managers",
    Klijenti: "Clients",
    Registracija: "Registration",
    "Zaboravljena lozinka": "Forgot password",
    "Profil korisnika": "User profile",
    Notifikacije: "Notifications",
    "Historija aktivnosti": "Activity history",
    Plaćanja: "Payments",
    "Dokumenti/fajlovi": "Documents/files",
    Poruke: "Messages",
    "Postavke naloga": "Account settings",
    "Korisnički dashboard": "User dashboard",
    "Uloge i permisije": "Roles and permissions",
    "Upload fajlova": "File upload",
    Komentari: "Comments",
    "Chat / messaging": "Chat / messaging",
    "Email notifikacije": "Email notifications",
    "Push notifikacije": "Push notifications",
    Kalendar: "Calendar",
    Rezervacije: "Bookings",
    "Online plaćanje": "Online payment",
    "Pretplate / subscription": "Subscriptions",
    Fakture: "Invoices",
    Izvještaji: "Reports",
    Statistika: "Statistics",
    "Integracije sa drugim sistemima": "Integrations with other systems",
    "Mobilna aplikacija kasnije": "Mobile app later",
    Konsultacije: "Consultations",
    Vozila: "Vehicles",
    Smještaj: "Accommodation",
    Stolove: "Tables",
    Prostorije: "Rooms",
    "Oprema/resurse": "Equipment/resources",
    Opcionalno: "Optional",
    "Email podsjetnik": "Email reminder",
    "SMS podsjetnik": "SMS reminder",
    "WhatsApp/Viber podsjetnik": "WhatsApp/Viber reminder",
    "Podsjetnik u aplikaciji": "In-app reminder",
    Uslugu: "Service",
    Proizvod: "Product",
    Edukaciju: "Education",
    Event: "Event",
    "Akciju/popust": "Promotion/discount",
    "Prijavu na listu čekanja": "Waitlist signup",
    "Preuzimanje dokumenta": "Document download",
    "Poslati upit": "Send inquiry",
    "Kupiti proizvod": "Buy product",
    "Zakazati termin": "Book appointment",
    "Prijaviti se": "Sign up",
    Nazvati: "Call",
    "Poslati poruku": "Send message",
    "Preuzeti dokument": "Download document",
    "Ostaviti email": "Leave email",
    "Email kampanja": "Email campaign",
    Dizajn: "Design",
    Brzinu: "Speed",
    "Mobilnu verziju": "Mobile version",
    "Strukturu sadržaja": "Content structure",
    Sigurnost: "Security",
    "Tehničku platformu": "Technical platform",
    Konverzije: "Conversions",
    "Da, sav sadržaj": "Yes, all content",
    "Da, djelimično": "Yes, partially",
    "Ne, želimo novi sadržaj": "No, we want new content",
    Možda: "Maybe",
    Stranice: "Pages",
    "Blog objave": "Blog posts",
    Proizvodi: "Products",
    Korisnici: "Users",
    Narudžbe: "Orders",
    Slike: "Images",
    Dokumenti: "Documents",
    "SEO meta podaci": "SEO metadata",
    Boje: "Colors",
    Fontove: "Fonts",
    Fotografije: "Photos",
    "Video materijale": "Video materials",
    "Nemamo vizuelni identitet": "We do not have a visual identity",
    "Treba nam pomoć oko brendinga": "We need branding help",
    "Moderan i minimalistički": "Modern and minimalist",
    "Premium/luksuzan": "Premium/luxury",
    Korporativan: "Corporate",
    "Kreativan i dinamičan": "Creative and dynamic",
    "Medicinski/profesionalan": "Medical/professional",
    "Topao i prijateljski": "Warm and friendly",
    "Elegantno i jednostavno": "Elegant and simple",
    "Ne znam, želim prijedlog": "I don't know, I want a suggestion",
    "Veoma važno": "Very important",
    "Važno, ali osnovno": "Important, but basic",
    "Nije trenutno prioritet": "Not a current priority",
    "Ne znam šta je SEO": "I do not know what SEO is",
    "Želim preporuku": "I want a recommendation",
    "Google Analytics": "Google Analytics",
    "Google Search Console": "Google Search Console",
    "Google Tag Manager": "Google Tag Manager",
    "Meta Pixel": "Meta Pixel",
    "TikTok Pixel": "TikTok Pixel",
    "Hotjar / Microsoft Clarity": "Hotjar / Microsoft Clarity",
    "Mi pripremamo sav sadržaj": "We prepare all content",
    "Vi pripremate sadržaj": "You prepare content",
    "Zajedno pripremamo sadržaj": "We prepare content together",
    "Nemamo još definisano": "We have not defined it yet",
    "Treba nam kompletna pomoć": "We need full help",
    Djelimično: "Partially",
    Tekstove: "Texts",
    Cijene: "Prices",
    Kategorije: "Categories",
    Termine: "Appointments",
    "Uslovi korištenja": "Terms of use",
    "Politika privatnosti": "Privacy policy",
    "Cookie politika": "Cookie policy",
    "GDPR saglasnosti": "GDPR consents",
    "Pravila povrata/reklamacije": "Return/complaint rules",
    "Uslovi kupovine": "Purchase terms",
    "Do 500 €": "Up to 500 €",
    "Želim prvo okvirnu procjenu": "I want an estimate first",
    "Ne želim navesti budžet": "I do not want to state a budget",
    Odmah: "Immediately",
    "U narednih 30 dana": "In the next 30 days",
    "U naredna 2-3 mjeseca": "In the next 2-3 months",
    Kasnije: "Later",
    "Poželjno, ali nije strogo": "Preferred, but not strict",
    Cijena: "Price",
    "Brzina izrade": "Development speed",
    "Kvalitet dizajna": "Design quality",
    Performanse: "Performance",
    "Fleksibilnost sistema": "System flexibility",
    "Dugoročna skalabilnost": "Long-term scalability",
    "Jednostavno održavanje": "Easy maintenance",
    "Želim okvirnu ponudu": "I want an estimate",
    "Želim konsultacije": "I want a consultation",
    "Želim tehnički prijedlog": "I want a technical proposal",
    "Želim prvo da analizirate moje odgovore": "I want you to analyze my answers first"
  },
  de: {},
  it: {}
};
optionText.de = {
  ...optionText.en,
  Da: "Ja",
  Ne: "Nein",
  "Nisam siguran/sigurna": "Nicht sicher",
  "Možda kasnije": "Vielleicht später",
  "Ne znam": "Ich weiß nicht",
  Drugo: "Andere",
  yes: "Ja",
  no: "Nein",
  not_sure: "Nicht sicher",
  "Prezentacioni web sajt": "Präsentationswebsite",
  "Web shop / online prodavnica": "Online-Shop",
  "Web aplikacija / platforma": "Webanwendung / Plattform",
  "Booking / rezervacijski sistem": "Buchungs- / Reservierungssystem",
  "Redizajn postojećeg sajta ili aplikacije": "Redesign einer bestehenden Website oder Anwendung",
  "Predstavljanje firme ili usluga": "Unternehmen oder Leistungen präsentieren",
  "Povećanje broja upita": "Mehr Anfragen erhalten",
  "Online prodaja proizvoda": "Online-Verkauf von Produkten",
  "Online prodaja usluga": "Online-Verkauf von Dienstleistungen",
  "Automatizacija poslovnog procesa": "Geschäftsprozess automatisieren",
  "Rezervacija termina": "Terminbuchung",
  "Upravljanje korisnicima": "Benutzerverwaltung",
  "Edukacija korisnika": "Benutzerschulung",
  "Kreiranje zajednice / community sistema": "Community-System erstellen",
  "Interni poslovni sistem": "Internes Geschäftssystem",
  "SaaS aplikacija": "SaaS-Anwendung",
  "Marketplace/platforma": "Marketplace/Plattform",
  "Bolji SEO i Google vidljivost": "Bessere SEO- und Google-Sichtbarkeit",
  "Bolji dizajn i korisničko iskustvo": "Besseres Design und Nutzererlebnis",
  "U izradi je": "Ist in Entwicklung",
  "Zastarjeli dizajn": "Veraltetes Design",
  "Spor sajt": "Langsame Website",
  "Loša mobilna verzija": "Schlechte mobile Version",
  "Loša Google vidljivost": "Schlechte Google-Sichtbarkeit",
  "Teško uređivanje sadržaja": "Inhalte schwer bearbeitbar",
  "Nema admin panel": "Kein Admin-Panel",
  "Nema online plaćanje": "Keine Online-Zahlung",
  "Loše korisničko iskustvo": "Schlechtes Nutzererlebnis",
  "Nedostaju funkcionalnosti": "Funktionen fehlen",
  "Tehnički problemi": "Technische Probleme",
  "Sigurnosni problemi": "Sicherheitsprobleme",
  "Da, imam domen": "Ja, ich habe eine Domain",
  "Ne, nemam domen": "Nein, ich habe keine Domain",
  "Ne znam šta je domen": "Ich weiß nicht, was eine Domain ist",
  "Da, imam hosting/server": "Ja, ich habe Hosting/Server",
  "Ne, nemam hosting/server": "Nein, ich habe kein Hosting/Server",
  "Ne znam šta je hosting": "Ich weiß nicht, was Hosting ist",
  "Želim prvo više informacija": "Ich möchte zuerst mehr Informationen",
  Početna: "Startseite",
  "O nama": "Über uns",
  Usluge: "Leistungen",
  "Pojedinačne stranice usluga": "Einzelne Leistungsseiten",
  "Portfolio / reference": "Portfolio / Referenzen",
  Tim: "Team",
  Galerija: "Galerie",
  "Blog / novosti": "Blog / Neuigkeiten",
  Cjenovnik: "Preisliste",
  "Česta pitanja": "Häufige Fragen",
  Kontakt: "Kontakt",
  Karijere: "Karriere",
  "Lokacije / poslovnice": "Standorte / Filialen",
  "Pravne stranice": "Rechtliche Seiten",
  "Da, imamo tekstove i slike": "Ja, wir haben Texte und Bilder",
  "Imamo tekstove, ali ne i slike": "Wir haben Texte, aber keine Bilder",
  "Imamo slike, ali ne i tekstove": "Wir haben Bilder, aber keine Texte",
  "Imamo djelimičan sadržaj": "Wir haben teilweise Inhalte",
  "Nemamo sadržaj": "Wir haben keine Inhalte",
  "Treba nam kompletna pomoć oko sadržaja": "Wir brauchen vollständige Hilfe bei Inhalten",
  "Kontakt forma": "Kontaktformular",
  "Forma za upit/ponudu": "Anfrage-/Angebotsformular",
  "Google mapa": "Google-Karte",
  "Blog sistem": "Blog-System",
  "Prikaz referenci": "Referenzanzeige",
  "Newsletter prijava": "Newsletter-Anmeldung",
  "WhatsApp/Viber kontakt dugme": "WhatsApp/Viber-Kontaktbutton",
  Višejezičnost: "Mehrsprachigkeit",
  "Admin panel za uređivanje sadržaja": "Admin-Panel zur Inhaltsbearbeitung",
  "Osnovna SEO optimizacija": "Grundlegende SEO-Optimierung",
  "Napredna SEO struktura": "Erweiterte SEO-Struktur",
  "Ne, samo jedan jezik": "Nein, nur eine Sprache",
  Engleski: "Englisch",
  Njemački: "Deutsch",
  Italijanski: "Italienisch",
  "Ne znam još": "Ich weiß es noch nicht",
  "Plaćanje pouzećem": "Zahlung per Nachnahme",
  "Bankovna uplata": "Banküberweisung",
  "Kartično plaćanje": "Kartenzahlung",
  "Kripto plaćanje": "Krypto-Zahlung",
  "Kurirska služba": "Kurierdienst",
  "Vlastita dostava": "Eigene Lieferung",
  "Lično preuzimanje": "Abholung",
  "Digitalni proizvodi": "Digitale Produkte",
  "Dostava nije potrebna": "Lieferung nicht erforderlich",
  "Ručno kroz admin panel": "Manuell über Admin-Panel",
  "Import iz Excel/CSV fajla": "Import aus Excel/CSV",
  "API integracija sa drugim sistemom": "API-Integration mit anderem System",
  "Automatska sinhronizacija sa dobavljačem": "Automatische Lieferantensynchronisierung",
  "Registrovani korisnici": "Registrierte Benutzer",
  Kupci: "Kunden",
  Zaposleni: "Mitarbeiter",
  Partneri: "Partner",
  "Edukatori / mentori": "Trainer / Mentoren",
  Moderatori: "Moderatoren",
  Menadžeri: "Manager",
  Klijenti: "Klienten",
  Registracija: "Registrierung",
  "Zaboravljena lozinka": "Passwort vergessen",
  "Profil korisnika": "Benutzerprofil",
  Dashboard: "Dashboard",
  Notifikacije: "Benachrichtigungen",
  "Historija aktivnosti": "Aktivitätshistorie",
  Plaćanja: "Zahlungen",
  "Dokumenti/fajlovi": "Dokumente/Dateien",
  Poruke: "Nachrichten",
  "Postavke naloga": "Kontoeinstellungen",
  "Korisnički dashboard": "Benutzer-Dashboard",
  "Uloge i permisije": "Rollen und Berechtigungen",
  "Upload fajlova": "Dateiupload",
  Komentari: "Kommentare",
  "Chat / messaging": "Chat / Messaging",
  "Email notifikacije": "Email-Benachrichtigungen",
  "Push notifikacije": "Push-Benachrichtigungen",
  Kalendar: "Kalender",
  Rezervacije: "Buchungen",
  "Online plaćanje": "Online-Zahlung",
  "Pretplate / subscription": "Abonnements",
  Fakture: "Rechnungen",
  Izvještaji: "Berichte",
  Statistika: "Statistik",
  API: "API",
  "Integracije sa drugim sistemima": "Integrationen mit anderen Systemen",
  "Mobilna aplikacija kasnije": "Mobile App später",
  Termine: "Termine",
  Konsultacije: "Beratungen",
  Vozila: "Fahrzeuge",
  Smještaj: "Unterkunft",
  Stolove: "Tische",
  Prostorije: "Räume",
  "Oprema/resurse": "Ausrüstung/Ressourcen",
  Opcionalno: "Optional",
  "Email podsjetnik": "Email-Erinnerung",
  "SMS podsjetnik": "SMS-Erinnerung",
  "WhatsApp/Viber podsjetnik": "WhatsApp/Viber-Erinnerung",
  "Podsjetnik u aplikaciji": "In-App-Erinnerung",
  Uslugu: "Dienstleistung",
  Proizvod: "Produkt",
  Edukaciju: "Schulung",
  Event: "Event",
  "Akciju/popust": "Aktion/Rabatt",
  "Prijavu na listu čekanja": "Wartelistenanmeldung",
  "Preuzimanje dokumenta": "Dokument-Download",
  "Poslati upit": "Anfrage senden",
  "Kupiti proizvod": "Produkt kaufen",
  "Zakazati termin": "Termin buchen",
  "Prijaviti se": "Anmelden",
  Nazvati: "Anrufen",
  "Poslati poruku": "Nachricht senden",
  "Preuzeti dokument": "Dokument herunterladen",
  "Ostaviti email": "Email hinterlassen",
  "Email kampanja": "Email-Kampagne",
  Dizajn: "Design",
  Brzinu: "Geschwindigkeit",
  "Mobilnu verziju": "Mobile Version",
  SEO: "SEO",
  "Strukturu sadržaja": "Inhaltsstruktur",
  Sigurnost: "Sicherheit",
  "Tehničku platformu": "Technische Plattform",
  Konverzije: "Konversionen",
  "Da, sav sadržaj": "Ja, alle Inhalte",
  "Da, djelimično": "Ja, teilweise",
  "Ne, želimo novi sadržaj": "Nein, wir möchten neue Inhalte",
  Možda: "Vielleicht",
  Stranice: "Seiten",
  "Blog objave": "Blogbeiträge",
  Proizvodi: "Produkte",
  Korisnici: "Benutzer",
  Narudžbe: "Bestellungen",
  Slike: "Bilder",
  Dokumenti: "Dokumente",
  "SEO meta podaci": "SEO-Metadaten",
  Logo: "Logo",
  Boje: "Farben",
  Fontove: "Schriften",
  "Brand guide": "Brand Guide",
  Fotografije: "Fotos",
  "Video materijale": "Videomaterial",
  "Nemamo vizuelni identitet": "Wir haben keine visuelle Identität",
  "Treba nam pomoć oko brendinga": "Wir brauchen Hilfe beim Branding",
  "Moderan i minimalistički": "Modern und minimalistisch",
  "Premium/luksuzan": "Premium/luxuriös",
  Korporativan: "Korporativ",
  "Kreativan i dinamičan": "Kreativ und dynamisch",
  "Tech/startup": "Tech/Startup",
  "Medicinski/profesionalan": "Medizinisch/professionell",
  "Topao i prijateljski": "Warm und freundlich",
  "Elegantno i jednostavno": "Elegant und einfach",
  "Ne znam, želim prijedlog": "Ich weiß nicht, ich möchte einen Vorschlag",
  "Veoma važno": "Sehr wichtig",
  "Važno, ali osnovno": "Wichtig, aber grundlegend",
  "Nije trenutno prioritet": "Derzeit keine Priorität",
  "Ne znam šta je SEO": "Ich weiß nicht, was SEO ist",
  "Želim preporuku": "Ich möchte eine Empfehlung",
  "Mi pripremamo sav sadržaj": "Wir bereiten alle Inhalte vor",
  "Vi pripremate sadržaj": "Sie bereiten Inhalte vor",
  "Zajedno pripremamo sadržaj": "Wir bereiten Inhalte gemeinsam vor",
  "Nemamo još definisano": "Noch nicht definiert",
  "Treba nam kompletna pomoć": "Wir brauchen vollständige Hilfe",
  Djelimično: "Teilweise",
  Tekstove: "Texte",
  Cijene: "Preise",
  Kategorije: "Kategorien",
  "Uslovi korištenja": "Nutzungsbedingungen",
  "Politika privatnosti": "Datenschutzerklärung",
  "Cookie politika": "Cookie-Richtlinie",
  "GDPR saglasnosti": "DSGVO-Einwilligungen",
  "Pravila povrata/reklamacije": "Rückgabe-/Reklamationsregeln",
  "Uslovi kupovine": "Kaufbedingungen",
  "Do 500 €": "Bis 500 €",
  "Želim prvo okvirnu procjenu": "Ich möchte zuerst eine grobe Einschätzung",
  "Ne želim navesti budžet": "Ich möchte kein Budget angeben",
  Odmah: "Sofort",
  "U narednih 30 dana": "In den nächsten 30 Tagen",
  "U naredna 2-3 mjeseca": "In den nächsten 2-3 Monaten",
  Kasnije: "Später",
  "Poželjno, ali nije strogo": "Wünschenswert, aber nicht strikt",
  Cijena: "Preis",
  "Brzina izrade": "Umsetzungsgeschwindigkeit",
  "Kvalitet dizajna": "Designqualität",
  Performanse: "Performance",
  "Fleksibilnost sistema": "Systemflexibilität",
  "Dugoročna skalabilnost": "Langfristige Skalierbarkeit",
  "Jednostavno održavanje": "Einfache Wartung",
  "Želim okvirnu ponudu": "Ich möchte ein grobes Angebot",
  "Želim konsultacije": "Ich möchte Beratung",
  "Želim tehnički prijedlog": "Ich möchte einen technischen Vorschlag",
  "Želim prvo da analizirate moje odgovore": "Ich möchte zuerst eine Analyse meiner Antworten"
};
optionText.it = {
  ...optionText.en,
  Da: "Sì",
  Ne: "No",
  "Nisam siguran/sigurna": "Non sono sicuro/a",
  "Možda kasnije": "Forse più tardi",
  "Ne znam": "Non lo so",
  Drugo: "Altro",
  yes: "Sì",
  no: "No",
  not_sure: "Non sono sicuro/a",
  "Prezentacioni web sajt": "Sito web di presentazione",
  "Web shop / online prodavnica": "Shop online",
  "Web aplikacija / platforma": "Applicazione web / piattaforma",
  "Booking / rezervacijski sistem": "Sistema booking / prenotazioni",
  "Redizajn postojećeg sajta ili aplikacije": "Redesign di sito o applicazione esistente",
  "Predstavljanje firme ili usluga": "Presentare azienda o servizi",
  "Povećanje broja upita": "Aumentare il numero di richieste",
  "Online prodaja proizvoda": "Vendita online di prodotti",
  "Online prodaja usluga": "Vendita online di servizi",
  "Automatizacija poslovnog procesa": "Automatizzare un processo aziendale",
  "Rezervacija termina": "Prenotazione appuntamenti",
  "Upravljanje korisnicima": "Gestione utenti",
  "Edukacija korisnika": "Educazione utenti",
  "Kreiranje zajednice / community sistema": "Creazione community",
  "Interni poslovni sistem": "Sistema aziendale interno",
  "SaaS aplikacija": "Applicazione SaaS",
  "Marketplace/platforma": "Marketplace/piattaforma",
  "Bolji SEO i Google vidljivost": "Migliore SEO e visibilità Google",
  "Bolji dizajn i korisničko iskustvo": "Miglior design ed esperienza utente",
  "U izradi je": "È in sviluppo",
  "Zastarjeli dizajn": "Design obsoleto",
  "Spor sajt": "Sito lento",
  "Loša mobilna verzija": "Versione mobile debole",
  "Loša Google vidljivost": "Scarsa visibilità Google",
  "Teško uređivanje sadržaja": "Contenuti difficili da modificare",
  "Nema admin panel": "Nessun pannello admin",
  "Nema online plaćanje": "Nessun pagamento online",
  "Loše korisničko iskustvo": "Esperienza utente debole",
  "Nedostaju funkcionalnosti": "Funzionalità mancanti",
  "Tehnički problemi": "Problemi tecnici",
  "Sigurnosni problemi": "Problemi di sicurezza",
  "Da, imam domen": "Sì, ho un dominio",
  "Ne, nemam domen": "No, non ho un dominio",
  "Ne znam šta je domen": "Non so cos'è un dominio",
  "Da, imam hosting/server": "Sì, ho hosting/server",
  "Ne, nemam hosting/server": "No, non ho hosting/server",
  "Ne znam šta je hosting": "Non so cos'è l'hosting",
  "Želim prvo više informacija": "Voglio prima più informazioni",
  Početna: "Home",
  "O nama": "Chi siamo",
  Usluge: "Servizi",
  "Pojedinačne stranice usluga": "Pagine singole dei servizi",
  "Portfolio / reference": "Portfolio / referenze",
  Tim: "Team",
  Galerija: "Galleria",
  "Blog / novosti": "Blog / notizie",
  Cjenovnik: "Listino prezzi",
  "Česta pitanja": "FAQ",
  Kontakt: "Contatto",
  Karijere: "Carriere",
  "Lokacije / poslovnice": "Sedi / filiali",
  "Pravne stranice": "Pagine legali",
  "Da, imamo tekstove i slike": "Sì, abbiamo testi e immagini",
  "Imamo tekstove, ali ne i slike": "Abbiamo testi, ma non immagini",
  "Imamo slike, ali ne i tekstove": "Abbiamo immagini, ma non testi",
  "Imamo djelimičan sadržaj": "Abbiamo contenuti parziali",
  "Nemamo sadržaj": "Non abbiamo contenuti",
  "Treba nam kompletna pomoć oko sadržaja": "Ci serve supporto completo sui contenuti",
  "Kontakt forma": "Modulo contatto",
  "Forma za upit/ponudu": "Modulo richiesta/preventivo",
  "Google mapa": "Mappa Google",
  "Blog sistem": "Sistema blog",
  "Prikaz referenci": "Visualizzazione referenze",
  "Newsletter prijava": "Iscrizione newsletter",
  "WhatsApp/Viber kontakt dugme": "Pulsante contatto WhatsApp/Viber",
  Višejezičnost: "Multilingua",
  "Admin panel za uređivanje sadržaja": "Pannello admin per contenuti",
  "Osnovna SEO optimizacija": "SEO base",
  "Napredna SEO struktura": "Struttura SEO avanzata",
  "Ne, samo jedan jezik": "No, una sola lingua",
  Engleski: "Inglese",
  Njemački: "Tedesco",
  Italijanski: "Italiano",
  "Ne znam još": "Non lo so ancora",
  "Plaćanje pouzećem": "Pagamento alla consegna",
  "Bankovna uplata": "Bonifico bancario",
  "Kartično plaćanje": "Pagamento con carta",
  "Kripto plaćanje": "Pagamento crypto",
  "Kurirska služba": "Corriere",
  "Vlastita dostava": "Consegna propria",
  "Lično preuzimanje": "Ritiro personale",
  "Digitalni proizvodi": "Prodotti digitali",
  "Dostava nije potrebna": "Consegna non necessaria",
  "Ručno kroz admin panel": "Manuale tramite admin panel",
  "Import iz Excel/CSV fajla": "Import da Excel/CSV",
  "API integracija sa drugim sistemom": "Integrazione API con altro sistema",
  "Automatska sinhronizacija sa dobavljačem": "Sincronizzazione automatica con fornitore",
  "Registrovani korisnici": "Utenti registrati",
  Kupci: "Clienti",
  Zaposleni: "Dipendenti",
  Partneri: "Partner",
  "Edukatori / mentori": "Educatori / mentori",
  Moderatori: "Moderatori",
  Menadžeri: "Manager",
  Klijenti: "Clienti",
  Registracija: "Registrazione",
  "Zaboravljena lozinka": "Password dimenticata",
  "Profil korisnika": "Profilo utente",
  Dashboard: "Dashboard",
  Notifikacije: "Notifiche",
  "Historija aktivnosti": "Storico attività",
  Plaćanja: "Pagamenti",
  "Dokumenti/fajlovi": "Documenti/file",
  Poruke: "Messaggi",
  "Postavke naloga": "Impostazioni account",
  "Korisnički dashboard": "Dashboard utente",
  "Uloge i permisije": "Ruoli e permessi",
  "Upload fajlova": "Upload file",
  Komentari: "Commenti",
  "Chat / messaging": "Chat / messaggi",
  "Email notifikacije": "Notifiche email",
  "Push notifikacije": "Notifiche push",
  Kalendar: "Calendario",
  Rezervacije: "Prenotazioni",
  "Online plaćanje": "Pagamento online",
  "Pretplate / subscription": "Abbonamenti",
  Fakture: "Fatture",
  Izvještaji: "Report",
  Statistika: "Statistiche",
  API: "API",
  "Integracije sa drugim sistemima": "Integrazioni con altri sistemi",
  "Mobilna aplikacija kasnije": "App mobile più avanti",
  Termine: "Appuntamenti",
  Konsultacije: "Consulenze",
  Vozila: "Veicoli",
  Smještaj: "Alloggio",
  Stolove: "Tavoli",
  Prostorije: "Sale/spazi",
  "Oprema/resurse": "Attrezzature/risorse",
  Opcionalno: "Opzionale",
  "Email podsjetnik": "Promemoria email",
  "SMS podsjetnik": "Promemoria SMS",
  "WhatsApp/Viber podsjetnik": "Promemoria WhatsApp/Viber",
  "Podsjetnik u aplikaciji": "Promemoria nell'app",
  Uslugu: "Servizio",
  Proizvod: "Prodotto",
  Edukaciju: "Formazione",
  Event: "Evento",
  "Akciju/popust": "Promozione/sconto",
  "Prijavu na listu čekanja": "Iscrizione lista d'attesa",
  "Preuzimanje dokumenta": "Download documento",
  "Poslati upit": "Inviare richiesta",
  "Kupiti proizvod": "Acquistare prodotto",
  "Zakazati termin": "Prenotare appuntamento",
  "Prijaviti se": "Iscriversi",
  Nazvati: "Chiamare",
  "Poslati poruku": "Inviare messaggio",
  "Preuzeti dokument": "Scaricare documento",
  "Ostaviti email": "Lasciare email",
  "Email kampanja": "Campagna email",
  Dizajn: "Design",
  Brzinu: "Velocità",
  "Mobilnu verziju": "Versione mobile",
  SEO: "SEO",
  "Strukturu sadržaja": "Struttura contenuti",
  Sigurnost: "Sicurezza",
  "Tehničku platformu": "Piattaforma tecnica",
  Konverzije: "Conversioni",
  "Da, sav sadržaj": "Sì, tutti i contenuti",
  "Da, djelimično": "Sì, parzialmente",
  "Ne, želimo novi sadržaj": "No, vogliamo nuovi contenuti",
  Možda: "Forse",
  Stranice: "Pagine",
  "Blog objave": "Articoli blog",
  Proizvodi: "Prodotti",
  Korisnici: "Utenti",
  Narudžbe: "Ordini",
  Slike: "Immagini",
  Dokumenti: "Documenti",
  "SEO meta podaci": "Meta dati SEO",
  Logo: "Logo",
  Boje: "Colori",
  Fontove: "Font",
  "Brand guide": "Brand guide",
  Fotografije: "Fotografie",
  "Video materijale": "Materiali video",
  "Nemamo vizuelni identitet": "Non abbiamo identità visiva",
  "Treba nam pomoć oko brendinga": "Ci serve aiuto sul branding",
  "Moderan i minimalistički": "Moderno e minimalista",
  "Premium/luksuzan": "Premium/lusso",
  Korporativan: "Corporate",
  "Kreativan i dinamičan": "Creativo e dinamico",
  "Tech/startup": "Tech/startup",
  "Medicinski/profesionalan": "Medico/professionale",
  "Topao i prijateljski": "Caldo e amichevole",
  "Elegantno i jednostavno": "Elegante e semplice",
  "Ne znam, želim prijedlog": "Non lo so, voglio una proposta",
  "Veoma važno": "Molto importante",
  "Važno, ali osnovno": "Importante, ma base",
  "Nije trenutno prioritet": "Non è una priorità ora",
  "Ne znam šta je SEO": "Non so cos'è la SEO",
  "Želim preporuku": "Voglio una raccomandazione",
  "Mi pripremamo sav sadržaj": "Prepariamo noi tutti i contenuti",
  "Vi pripremate sadržaj": "Preparate voi i contenuti",
  "Zajedno pripremamo sadržaj": "Prepariamo insieme i contenuti",
  "Nemamo još definisano": "Non ancora definito",
  "Treba nam kompletna pomoć": "Ci serve supporto completo",
  Djelimično: "Parzialmente",
  Tekstove: "Testi",
  Cijene: "Prezzi",
  Kategorije: "Categorie",
  "Uslovi korištenja": "Termini di utilizzo",
  "Politika privatnosti": "Privacy policy",
  "Cookie politika": "Cookie policy",
  "GDPR saglasnosti": "Consensi GDPR",
  "Pravila povrata/reklamacije": "Regole resi/reclami",
  "Uslovi kupovine": "Termini di acquisto",
  "Do 500 €": "Fino a 500 €",
  "Želim prvo okvirnu procjenu": "Voglio prima una stima indicativa",
  "Ne želim navesti budžet": "Non voglio indicare budget",
  Odmah: "Subito",
  "U narednih 30 dana": "Nei prossimi 30 giorni",
  "U naredna 2-3 mjeseca": "Nei prossimi 2-3 mesi",
  Kasnije: "Più tardi",
  "Poželjno, ali nije strogo": "Preferibile, ma non rigido",
  Cijena: "Prezzo",
  "Brzina izrade": "Velocità di realizzazione",
  "Kvalitet dizajna": "Qualità design",
  Performanse: "Performance",
  "Fleksibilnost sistema": "Flessibilità del sistema",
  "Dugoročna skalabilnost": "Scalabilità a lungo termine",
  "Jednostavno održavanje": "Manutenzione semplice",
  "Želim okvirnu ponudu": "Voglio un'offerta indicativa",
  "Želim konsultacije": "Voglio una consulenza",
  "Želim tehnički prijedlog": "Voglio una proposta tecnica",
  "Želim prvo da analizirate moje odgovore": "Voglio prima l'analisi delle mie risposte"
};
const localizeOption = (option, language) => {
  if (language === "sr") return option;
  return {
    ...option,
    label: optionText[language][option.value] || optionText[language][option.label] || option.label
  };
};
const localizeField = (field, language) => {
  var _a2;
  if (language === "sr") return field;
  const text = fieldText[language][field.key];
  return {
    ...field,
    label: (text == null ? void 0 : text.label) || field.label,
    description: (text == null ? void 0 : text.description) || field.description,
    placeholder: (text == null ? void 0 : text.placeholder) || field.placeholder,
    options: (_a2 = field.options) == null ? void 0 : _a2.map((option) => localizeOption(option, language))
  };
};
const getProjectInquirySteps = (language = "sr") => projectInquirySteps.map((step) => {
  if (language === "sr") return step;
  const text = stepText[language][step.key];
  return {
    ...step,
    eyebrow: (text == null ? void 0 : text.eyebrow) || step.eyebrow,
    title: (text == null ? void 0 : text.title) || step.title,
    description: (text == null ? void 0 : text.description) || step.description,
    fields: step.fields.map((field) => localizeField(field, language))
  };
});
const getVisibleSteps = (answers, steps = projectInquirySteps) => steps.filter((step) => {
  var _a2;
  if (!((_a2 = step.projectTypes) == null ? void 0 : _a2.length)) return true;
  return step.projectTypes.includes(String(answers.project_type || ""));
});
const getVisibleFields = (step, answers) => step.fields.filter((field) => !field.showWhen || field.showWhen(answers));
const getAllVisibleFields = (answers, steps = projectInquirySteps) => getVisibleSteps(answers, steps).flatMap((step) => getVisibleFields(step, answers));
const calculateComplexityScore = (answers) => {
  let score = 0;
  const projectType = String(answers.project_type || "");
  const addForArray = (key, weight = 1) => {
    const value = answers[key];
    if (Array.isArray(value)) score += value.length * weight;
  };
  if (projectType === "landing_page") score += 1;
  if (projectType === "presentation_website") score += 2;
  if (projectType === "booking_system") score += 5;
  if (projectType === "ecommerce") score += 7;
  if (projectType === "web_application") score += 10;
  if (projectType === "redesign") score += 4;
  addForArray("main_goals");
  addForArray("website_features", 2);
  addForArray("website_languages", 2);
  addForArray("payment_methods", 2);
  addForArray("delivery_methods");
  addForArray("app_users", 2);
  addForArray("account_features", 2);
  addForArray("app_features", 2);
  addForArray("analytics_tools");
  if (answers.user_accounts === "yes") score += 3;
  if (String(answers.product_count || "").includes("500")) score += 4;
  if (String(answers.product_count || "").includes("2000")) score += 8;
  if (answers.booking_payment === "Da") score += 2;
  if (answers.data_migration === "Da") score += 3;
  if (score >= 28) return "enterprise";
  if (score >= 16) return "high";
  if (score >= 8) return "medium";
  return "low";
};
const calculateBudgetScore = (budgetRange) => {
  const value = String(budgetRange || "");
  if (!value || value.includes("procjenu") || value.includes("Ne želim")) return "unknown";
  if (value.includes("Do 500")) return "low_budget";
  if (value.includes("500-1.500") || value.includes("1.500-3.000")) return "standard";
  if (value.includes("3.000-7.000") || value.includes("7.000-15.000")) return "serious";
  if (value.includes("15.000")) return "enterprise";
  return "unknown";
};
const WizionarHeader = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t, language } = useLanguage();
  const location = useLocation();
  const localizedPath = useLocalizedPath();
  const isHomePage = location.pathname === "/" || /^\/(en|de|it)\/?$/.test(location.pathname);
  const inquiryLabel = {
    sr: "Upitnik",
    en: "Inquiry",
    de: "Fragebogen",
    it: "Questionario"
  }[language];
  const closeMobileMenu = () => setMobileMenuOpen(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };
  }, [mobileMenuOpen]);
  const navItems = [
    {
      label: t.nav.products,
      href: isHomePage ? "#products" : "/#products",
      isRouterLink: !isHomePage
    },
    {
      label: t.nav.services,
      href: "/usluge",
      isRouterLink: true
    },
    {
      label: inquiryLabel,
      href: PROJECT_INQUIRY_PATH,
      isRouterLink: true
    },
    {
      label: t.nav.contact,
      href: isHomePage ? "#contact" : "/#contact",
      isRouterLink: !isHomePage
    }
  ];
  const getResolvedPath = (href) => localizedPath(href).split(/[?#]/)[0] || "/";
  const isNavItemActive = (href, isRouterLink) => {
    if (!isRouterLink) return false;
    const resolvedPath = getResolvedPath(href);
    return href === "/usluge" ? location.pathname === resolvedPath || location.pathname.startsWith("".concat(resolvedPath, "/")) : location.pathname === resolvedPath;
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      motion.header,
      {
        initial: { opacity: 0, y: -20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 },
        className: "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ".concat(scrolled ? "bg-background/95 backdrop-blur-xl border-b border-border/50 shadow-sm" : "bg-background/80 backdrop-blur-md border-b border-transparent"),
        children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto flex items-center justify-between px-6 py-3", children: [
          /* @__PURE__ */ jsx(LocalizedLink, { to: "/", className: "flex items-center gap-3", children: /* @__PURE__ */ jsx(
            "img",
            {
              src: defaultOgImage,
              alt: "Wizionar",
              decoding: "async",
              fetchpriority: "high",
              className: "h-11 w-auto md:h-12"
            }
          ) }),
          /* @__PURE__ */ jsx("nav", { className: "hidden items-center md:flex", children: /* @__PURE__ */ jsx("div", { className: "flex items-center gap-1 rounded-full bg-secondary/50 px-1.5 py-1.5", children: navItems.map((item) => {
            const isActive = isNavItemActive(item.href, item.isRouterLink);
            const className = "relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ".concat(isActive ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground hover:bg-background/50");
            return item.isRouterLink ? /* @__PURE__ */ jsx(LocalizedLink, { to: item.href, className, children: item.label }, item.href) : /* @__PURE__ */ jsx("a", { href: item.href, className, children: item.label }, item.href);
          }) }) }),
          /* @__PURE__ */ jsxs("div", { className: "hidden items-center gap-3 md:flex", children: [
            /* @__PURE__ */ jsx(LanguageSwitcher, {}),
            /* @__PURE__ */ jsx(Button, { size: "default", className: "rounded-full shadow-orange gap-1.5", asChild: true, children: /* @__PURE__ */ jsxs(LocalizedLink, { to: PROJECT_INQUIRY_PATH, children: [
              t.nav.requestDemo,
              /* @__PURE__ */ jsx(ArrowUpRight, { className: "w-4 h-4" })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 md:hidden", children: [
            /* @__PURE__ */ jsx(LanguageSwitcher, {}),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                className: "inline-flex h-10 w-10 items-center justify-center rounded-full bg-secondary/60 transition-colors hover:bg-secondary",
                onClick: () => setMobileMenuOpen((prev) => !prev),
                "aria-label": mobileMenuOpen ? "Close menu" : "Open menu",
                "aria-expanded": mobileMenuOpen,
                children: mobileMenuOpen ? /* @__PURE__ */ jsx(X, { className: "h-5 w-5" }) : /* @__PURE__ */ jsx(Menu, { className: "h-5 w-5" })
              }
            )
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsx(AnimatePresence, { children: mobileMenuOpen && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(
        motion.button,
        {
          type: "button",
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
          transition: { duration: 0.2 },
          className: "fixed inset-0 z-[60] bg-foreground/20 backdrop-blur-sm md:hidden",
          onClick: closeMobileMenu,
          "aria-label": "Close menu overlay"
        }
      ),
      /* @__PURE__ */ jsxs(
        motion.aside,
        {
          initial: { x: "100%" },
          animate: { x: 0 },
          exit: { x: "100%" },
          transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
          className: "fixed inset-y-0 right-0 z-[70] flex w-[86%] max-w-sm flex-col border-l border-border bg-background shadow-2xl md:hidden",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between border-b border-border/60 bg-background px-5 py-4", children: [
              /* @__PURE__ */ jsx(LocalizedLink, { to: "/", className: "flex items-center", onClick: closeMobileMenu, children: /* @__PURE__ */ jsx("img", { src: defaultOgImage, alt: "Wizionar", decoding: "async", className: "h-10 w-auto" }) }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  className: "inline-flex h-10 w-10 items-center justify-center rounded-full bg-secondary transition-colors hover:bg-secondary/80",
                  onClick: closeMobileMenu,
                  "aria-label": "Close menu",
                  children: /* @__PURE__ */ jsx(X, { className: "h-5 w-5" })
                }
              )
            ] }),
            /* @__PURE__ */ jsx("nav", { className: "flex-1 bg-background px-4 py-5", children: /* @__PURE__ */ jsx("div", { className: "space-y-1", children: navItems.map((item, index) => {
              const isActive = isNavItemActive(item.href, item.isRouterLink);
              const linkClassName = "flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-medium transition-colors ".concat(isActive ? "bg-primary/5 text-primary" : "text-foreground hover:bg-secondary/60");
              const content = /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx("span", { children: item.label }),
                /* @__PURE__ */ jsx(ChevronRight, { className: "h-4 w-4 ".concat(isActive ? "text-primary" : "text-muted-foreground") })
              ] });
              return /* @__PURE__ */ jsx(
                motion.div,
                {
                  initial: { opacity: 0, x: 12 },
                  animate: { opacity: 1, x: 0 },
                  exit: { opacity: 0, x: 12 },
                  transition: { delay: 0.05 + index * 0.05, duration: 0.2 },
                  children: item.isRouterLink ? /* @__PURE__ */ jsx(LocalizedLink, { to: item.href, className: linkClassName, onClick: closeMobileMenu, children: content }) : /* @__PURE__ */ jsx("a", { href: item.href, className: linkClassName, onClick: closeMobileMenu, children: content })
                },
                item.href
              );
            }) }) }),
            /* @__PURE__ */ jsxs("div", { className: "border-t border-border/60 bg-background px-5 py-5", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-3 mb-4", children: [
                /* @__PURE__ */ jsxs(
                  "a",
                  {
                    href: "mailto:info@wizionar.com",
                    className: "flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors",
                    children: [
                      /* @__PURE__ */ jsx(Mail, { className: "w-4 h-4" }),
                      "info@wizionar.com"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
                  /* @__PURE__ */ jsx("a", { href: "https://facebook.com/wizionar", target: "_blank", rel: "noopener noreferrer", className: "inline-flex h-9 w-9 items-center justify-center rounded-full bg-secondary/60 text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors", "aria-label": "Facebook", children: /* @__PURE__ */ jsx(Facebook, { className: "w-4 h-4" }) }),
                  /* @__PURE__ */ jsx("a", { href: "https://instagram.com/wizionar.app", target: "_blank", rel: "noopener noreferrer", className: "inline-flex h-9 w-9 items-center justify-center rounded-full bg-secondary/60 text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors", "aria-label": "Instagram", children: /* @__PURE__ */ jsx(Instagram, { className: "w-4 h-4" }) }),
                  /* @__PURE__ */ jsx("a", { href: "https://wa.me/38766882702", target: "_blank", rel: "noopener noreferrer", className: "inline-flex h-9 w-9 items-center justify-center rounded-full bg-secondary/60 text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors", "aria-label": "WhatsApp", children: /* @__PURE__ */ jsx(Phone, { className: "w-4 h-4" }) })
                ] })
              ] }),
              /* @__PURE__ */ jsx(Button, { asChild: true, size: "lg", className: "w-full rounded-xl shadow-orange gap-1.5", children: /* @__PURE__ */ jsxs(LocalizedLink, { to: PROJECT_INQUIRY_PATH, onClick: closeMobileMenu, children: [
                t.nav.requestDemo,
                /* @__PURE__ */ jsx(ArrowUpRight, { className: "w-4 h-4" })
              ] }) })
            ] })
          ]
        }
      )
    ] }) })
  ] });
};
const WizionarHero = () => {
  const { t } = useLanguage();
  const stats = [
    { label: t.hero.stats.projects, value: "12", change: "+3" },
    { label: t.hero.stats.clients, value: "48", change: "+7" },
    { label: t.hero.stats.automations, value: "156", change: "+24" },
    { label: t.hero.stats.savings, value: "340", change: "+45" }
  ];
  return /* @__PURE__ */ jsxs("section", { className: "relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-background" }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[800px] bg-primary/5 rounded-full blur-[150px] opacity-60" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 right-0 w-[600px] h-[600px] bg-primary/3 rounded-full blur-[120px] opacity-40" }),
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 grid-pattern-border opacity-30" }),
    /* @__PURE__ */ jsx("div", { className: "container mx-auto px-6 relative z-10", children: /* @__PURE__ */ jsxs("div", { className: "max-w-5xl mx-auto", children: [
      /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay: 0.1 },
          className: "flex justify-center mb-8",
          children: /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20", children: [
            /* @__PURE__ */ jsxs("span", { className: "relative flex h-2 w-2", children: [
              /* @__PURE__ */ jsx("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" }),
              /* @__PURE__ */ jsx("span", { className: "relative inline-flex rounded-full h-2 w-2 bg-primary" })
            ] }),
            /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-foreground", children: t.hero.badge })
          ] })
        }
      ),
      /* @__PURE__ */ jsxs(
        motion.h1,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay: 0.2 },
          className: "text-center text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-8",
          children: [
            t.hero.title1,
            " ",
            /* @__PURE__ */ jsx("span", { className: "text-gradient", children: t.hero.titleHighlight }),
            " ",
            t.hero.title2
          ]
        }
      ),
      /* @__PURE__ */ jsx(
        motion.p,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay: 0.3 },
          className: "text-center text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed",
          children: t.hero.subtitle
        }
      ),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay: 0.4 },
          className: "flex flex-col sm:flex-row items-center justify-center gap-4 mb-8",
          children: [
            /* @__PURE__ */ jsx(Button, { size: "xl", className: "group shadow-orange hover:shadow-glow transition-all duration-300", asChild: true, children: /* @__PURE__ */ jsxs("a", { href: "#contact", children: [
              t.hero.cta1,
              /* @__PURE__ */ jsx(ArrowRight, { className: "w-5 h-5 group-hover:translate-x-1 transition-transform" })
            ] }) }),
            /* @__PURE__ */ jsx(Button, { variant: "outline", size: "xl", className: "group", asChild: true, children: /* @__PURE__ */ jsxs("a", { href: "#products", children: [
              /* @__PURE__ */ jsx(Play, { className: "w-4 h-4 mr-1" }),
              t.hero.cta2
            ] }) }),
            /* @__PURE__ */ jsx(Button, { variant: "outline", size: "xl", className: "group", asChild: true, children: /* @__PURE__ */ jsxs(LocalizedLink, { to: "/usluge", children: [
              /* @__PURE__ */ jsx(Briefcase, { className: "w-4 h-4 mr-1" }),
              t.hero.cta3
            ] }) })
          ]
        }
      ),
      /* @__PURE__ */ jsx(
        motion.p,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { duration: 0.6, delay: 0.5 },
          className: "text-center text-sm text-muted-foreground",
          children: t.hero.microcopy
        }
      ),
      /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { opacity: 0, scale: 0.9 },
          animate: { opacity: 1, scale: 1 },
          transition: { duration: 0.8, delay: 0.6 },
          className: "mt-20 relative",
          children: /* @__PURE__ */ jsxs("div", { className: "relative mx-auto max-w-4xl", children: [
            /* @__PURE__ */ jsx("div", { className: "rounded-2xl border border-border bg-card p-2 shadow-2xl", children: /* @__PURE__ */ jsxs("div", { className: "rounded-xl bg-secondary/50 p-6", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-6", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsx("div", { className: "w-3 h-3 rounded-full bg-destructive" }),
                  /* @__PURE__ */ jsx("div", { className: "w-3 h-3 rounded-full bg-yellow-500" }),
                  /* @__PURE__ */ jsx("div", { className: "w-3 h-3 rounded-full bg-green-500" })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground", children: "wizionar.app/dashboard" })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6", children: stats.map((stat, i) => /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-lg bg-background border border-border", children: [
                /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground mb-1", children: stat.label }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-end gap-2", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-2xl font-bold text-foreground", children: stat.value }),
                  /* @__PURE__ */ jsx("span", { className: "text-xs text-primary font-medium mb-1", children: stat.change })
                ] })
              ] }, i)) }),
              /* @__PURE__ */ jsx("div", { className: "h-32 rounded-lg bg-background border border-border flex items-end p-4 gap-2", children: [40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((h, i) => /* @__PURE__ */ jsx(
                "div",
                {
                  className: "flex-1 bg-primary/20 rounded-t transition-all hover:bg-primary/40",
                  style: { height: "".concat(h, "%") }
                },
                i
              )) })
            ] }) }),
            /* @__PURE__ */ jsx("div", { className: "absolute -top-4 -left-4 w-20 h-20 bg-primary/10 rounded-2xl blur-xl animate-float" }),
            /* @__PURE__ */ jsx("div", { className: "absolute -bottom-4 -right-4 w-32 h-32 bg-primary/5 rounded-full blur-2xl animate-float", style: { animationDelay: "1s" } })
          ] })
        }
      )
    ] }) })
  ] });
};
const TrustSignals = () => {
  const { t } = useLanguage();
  const signals = [
    { icon: Database, label: t.trust.centralization },
    { icon: Zap, label: t.trust.automation },
    { icon: Shield, label: t.trust.rbac },
    { icon: FileDown, label: t.trust.export },
    { icon: Layers, label: t.trust.modular }
  ];
  return /* @__PURE__ */ jsx("section", { id: "trust", className: "py-12 border-y border-border bg-secondary/30", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-6", children: /* @__PURE__ */ jsx(
    motion.div,
    {
      initial: { opacity: 0 },
      whileInView: { opacity: 1 },
      viewport: { once: true },
      transition: { duration: 0.5 },
      className: "flex flex-wrap items-center justify-center gap-4 md:gap-8",
      children: signals.map((signal, index) => /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 10 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.4, delay: index * 0.1 },
          className: "flex items-center gap-3 px-5 py-3 rounded-full bg-background border border-border hover:border-primary/30 transition-colors",
          children: [
            /* @__PURE__ */ jsx(signal.icon, { className: "w-4 h-4 text-primary" }),
            /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-foreground", children: signal.label })
          ]
        },
        signal.label
      ))
    }
  ) }) });
};
const WhatWeDo = () => {
  const { t } = useLanguage();
  const features = [
    {
      icon: Zap,
      title: t.whatWeDo.features.automation.title,
      description: t.whatWeDo.features.automation.description
    },
    {
      icon: Eye,
      title: t.whatWeDo.features.control.title,
      description: t.whatWeDo.features.control.description
    },
    {
      icon: TrendingUp,
      title: t.whatWeDo.features.scalability.title,
      description: t.whatWeDo.features.scalability.description
    }
  ];
  return /* @__PURE__ */ jsxs("section", { className: "py-32 relative overflow-hidden", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute top-1/2 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 -translate-x-1/2" }),
    /* @__PURE__ */ jsx("div", { className: "container mx-auto px-6 relative z-10", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-16 items-center", children: [
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: -30 },
          whileInView: { opacity: 1, x: 0 },
          viewport: { once: true },
          transition: { duration: 0.6 },
          children: [
            /* @__PURE__ */ jsx("span", { className: "inline-block text-primary text-sm font-semibold uppercase tracking-wider mb-4", children: t.whatWeDo.label }),
            /* @__PURE__ */ jsxs("h2", { className: "text-4xl md:text-5xl font-bold mb-6 leading-tight", children: [
              t.whatWeDo.title1,
              /* @__PURE__ */ jsx("br", {}),
              /* @__PURE__ */ jsx("span", { className: "text-gradient", children: t.whatWeDo.title2 })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-lg text-muted-foreground mb-8 leading-relaxed", children: t.whatWeDo.description }),
            /* @__PURE__ */ jsxs(
              "a",
              {
                href: "#products",
                className: "inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all",
                children: [
                  t.whatWeDo.link,
                  /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
                ]
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "grid gap-6", children: features.map((feature, index) => /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { opacity: 0, x: 30 },
          whileInView: { opacity: 1, x: 0 },
          viewport: { once: true },
          transition: { duration: 0.5, delay: index * 0.15 },
          className: "group p-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300",
          children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-5", children: [
            /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors", children: /* @__PURE__ */ jsx(feature.icon, { className: "w-6 h-6 text-primary" }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold mb-2", children: feature.title }),
              /* @__PURE__ */ jsx("p", { className: "text-muted-foreground leading-relaxed", children: feature.description })
            ] })
          ] })
        },
        feature.title
      )) })
    ] }) })
  ] });
};
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
      featured: true
    },
    {
      id: "wizmedik-reports",
      name: "WizMedikReports",
      icon: Stethoscope,
      tagline: "Izvještavanje za medicinske ustanove",
      description: "Dnevni, sedmični i mjesečni izvještaji. Praćenje zarade, osoblja, radnih sati i normativa, sve na jednom mjestu.",
      features: ["Praćenje zarade", "Upravljanje osobljem", "Automatski izvještaji"],
      link: "/wizmedik-reports",
      available: true,
      featured: true
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
      featured: false
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
      featured: false
    },
    {
      id: "wizmedik",
      name: "wizMedik",
      icon: Stethoscope,
      tagline: "Zdravstvo na jednom mjestu u BiH",
      description: "Platforma koja povezuje doktore, klinike, laboratorije, banje i domove za njegu. Online zakazivanje, stručni blog i anonimna pitanja.",
      features: ["Pretraga doktora", "Online zakazivanje", "Stručni blog"],
      link: "/wizmedik",
      available: true,
      featured: true
    },
    {
      id: "frizerino",
      name: "Frizerino",
      icon: Scissors,
      tagline: "Platforma za online zakazivanje salona",
      description: "Pronađite i rezervišite frizerski ili kozmetički salon. Pretraga po gradu, usluzi i slobodnim terminima, bez poziva i čekanja.",
      features: ["Pametna pretraga", "Online rezervacija", "Sistem za salone"],
      link: "/frizerino",
      available: true,
      featured: true
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
      featured: true
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
      featured: false
    }
  ];
  return /* @__PURE__ */ jsx("section", { id: "products", className: "bg-secondary/30 py-32", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6", children: [
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.5 },
        className: "mb-16 text-center",
        children: [
          /* @__PURE__ */ jsx("span", { className: "mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-primary", children: t.products.label }),
          /* @__PURE__ */ jsx("h2", { className: "mb-6 text-4xl font-bold md:text-5xl", children: t.products.title }),
          /* @__PURE__ */ jsx("p", { className: "mx-auto max-w-2xl text-lg text-muted-foreground", children: t.products.subtitle })
        ]
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "mx-auto grid max-w-7xl gap-6 md:grid-cols-2 lg:grid-cols-3", children: products.map((product, index) => /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.5, delay: index * 0.1 },
        className: "group relative flex flex-col rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/20 hover:shadow-md",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "mb-4 flex items-start gap-4", children: [
            /* @__PURE__ */ jsx("div", { className: "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary/20", children: /* @__PURE__ */ jsx(product.icon, { className: "h-6 w-6" }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold", children: product.name }),
              /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-primary", children: product.tagline })
            ] })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "mb-4 flex-grow text-sm leading-relaxed text-muted-foreground", children: product.description }),
          /* @__PURE__ */ jsx("div", { className: "mb-6 flex flex-wrap gap-2", children: product.features.map((feature) => /* @__PURE__ */ jsx(
            "span",
            {
              className: "rounded-full bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground",
              children: feature
            },
            feature
          )) }),
          /* @__PURE__ */ jsxs("div", { className: "mt-auto flex items-center justify-between border-t border-border/50 pt-4", children: [
            /* @__PURE__ */ jsxs(
              "a",
              {
                href: "mailto:info@wizionar.com",
                className: "inline-flex items-center gap-2 text-sm text-primary transition-colors hover:text-primary/80",
                children: [
                  /* @__PURE__ */ jsx(Mail, { className: "h-4 w-4" }),
                  t.products.contactUs
                ]
              }
            ),
            product.available && product.link !== "#" && /* @__PURE__ */ jsx(
              LocalizedLink,
              {
                to: product.link,
                className: "text-sm text-muted-foreground transition-colors hover:text-foreground",
                children: "Pogledaj →"
              }
            )
          ] })
        ]
      },
      product.id
    )) })
  ] }) });
};
const ProcessSection = () => {
  const { t } = useLanguage();
  const steps = [
    {
      icon: Search,
      step: "01",
      title: t.process.steps.discovery.title,
      description: t.process.steps.discovery.description
    },
    {
      icon: Monitor,
      step: "02",
      title: t.process.steps.demo.title,
      description: t.process.steps.demo.description
    },
    {
      icon: Settings,
      step: "03",
      title: t.process.steps.setup.title,
      description: t.process.steps.setup.description
    },
    {
      icon: TestTube,
      step: "04",
      title: t.process.steps.testing.title,
      description: t.process.steps.testing.description
    },
    {
      icon: Rocket,
      step: "05",
      title: t.process.steps.golive.title,
      description: t.process.steps.golive.description
    }
  ];
  return /* @__PURE__ */ jsxs("section", { id: "process", className: "py-32 relative overflow-hidden", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px]" }),
    /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 relative z-10", children: [
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.5 },
          className: "text-center mb-20",
          children: [
            /* @__PURE__ */ jsx("span", { className: "inline-block text-primary text-sm font-semibold uppercase tracking-wider mb-4", children: t.process.label }),
            /* @__PURE__ */ jsx("h2", { className: "text-4xl md:text-5xl font-bold mb-6", children: t.process.title }),
            /* @__PURE__ */ jsx("p", { className: "text-lg text-muted-foreground max-w-2xl mx-auto", children: t.process.subtitle })
          ]
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "relative max-w-5xl mx-auto", children: [
        /* @__PURE__ */ jsx("div", { className: "hidden lg:block absolute top-10 left-0 right-0 h-0.5 bg-border" }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-4", children: steps.map((step, index) => /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { duration: 0.5, delay: index * 0.1 },
            className: "relative text-center lg:text-left",
            children: [
              /* @__PURE__ */ jsxs("div", { className: "relative inline-flex items-center justify-center w-20 h-20 rounded-full bg-card border-2 border-primary mb-6 mx-auto lg:mx-0", children: [
                /* @__PURE__ */ jsx(step.icon, { className: "w-8 h-8 text-primary" }),
                /* @__PURE__ */ jsx("span", { className: "absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center", children: step.step })
              ] }),
              /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold mb-2", children: step.title }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: step.description })
            ]
          },
          step.step
        )) })
      ] })
    ] })
  ] });
};
const SecurityTrust = () => {
  const { t } = useLanguage();
  const securityFeatures = [
    { icon: Shield, label: t.security.features.rbac },
    { icon: FileCheck, label: t.security.features.audit },
    { icon: Lock, label: t.security.features.protection },
    { icon: Database, label: t.security.features.backup },
    { icon: Activity, label: t.security.features.gdpr },
    { icon: CheckCircle, label: t.security.features.encryption }
  ];
  return /* @__PURE__ */ jsxs("section", { id: "security", className: "py-32 bg-foreground text-background relative overflow-hidden", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 grid-pattern-light" }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-1/2 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[200px] translate-x-1/2" }),
    /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 relative z-10", children: [
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.5 },
          className: "text-center mb-16",
          children: [
            /* @__PURE__ */ jsx("span", { className: "inline-block text-primary text-sm font-semibold uppercase tracking-wider mb-4", children: t.security.label }),
            /* @__PURE__ */ jsx("h2", { className: "text-4xl md:text-5xl font-bold mb-6", children: t.security.title }),
            /* @__PURE__ */ jsx("p", { className: "text-lg text-background/70 max-w-2xl mx-auto", children: t.security.subtitle })
          ]
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto", children: securityFeatures.map((feature, index) => /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 10 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.4, delay: index * 0.1 },
          className: "flex items-center gap-4 p-5 rounded-2xl bg-background/5 border border-background/10 backdrop-blur-sm hover:bg-background/10 transition-colors",
          children: [
            /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsx(feature.icon, { className: "w-6 h-6 text-primary" }) }),
            /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-background", children: feature.label })
          ]
        },
        feature.label
      )) })
    ] })
  ] });
};
const ForWhoSection = () => {
  const { t } = useLanguage();
  const audiences = [
    { icon: Calculator, label: t.forWho.audiences.finance.label, description: t.forWho.audiences.finance.description },
    { icon: Stethoscope, label: t.forWho.audiences.health.label, description: t.forWho.audiences.health.description },
    { icon: Scissors, label: t.forWho.audiences.services.label, description: t.forWho.audiences.services.description },
    { icon: Cat, label: t.forWho.audiences.vet.label, description: t.forWho.audiences.vet.description },
    { icon: Building2, label: t.forWho.audiences.companies.label, description: t.forWho.audiences.companies.description }
  ];
  return /* @__PURE__ */ jsx("section", { className: "py-32 relative", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6", children: [
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.5 },
        className: "text-center mb-16",
        children: [
          /* @__PURE__ */ jsx("span", { className: "inline-block text-primary text-sm font-semibold uppercase tracking-wider mb-4", children: t.forWho.label }),
          /* @__PURE__ */ jsx("h2", { className: "text-4xl md:text-5xl font-bold mb-6", children: t.forWho.title }),
          /* @__PURE__ */ jsx("p", { className: "text-lg text-muted-foreground max-w-2xl mx-auto", children: t.forWho.subtitle })
        ]
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-5 gap-4 max-w-6xl mx-auto mb-12", children: audiences.map((audience, index) => /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.4, delay: index * 0.1 },
        className: "group p-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-md transition-all text-center",
        children: [
          /* @__PURE__ */ jsx("div", { className: "w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors", children: /* @__PURE__ */ jsx(audience.icon, { className: "w-7 h-7 text-primary" }) }),
          /* @__PURE__ */ jsx("h3", { className: "font-semibold mb-1", children: audience.label }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: audience.description })
        ]
      },
      audience.label
    )) }),
    /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.5, delay: 0.3 },
        className: "text-center",
        children: /* @__PURE__ */ jsxs(
          "a",
          {
            href: "#contact",
            className: "inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all",
            children: [
              t.forWho.link,
              /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
            ]
          }
        )
      }
    )
  ] }) });
};
const ContactSection = () => {
  const { t } = useLanguage();
  const categories = [
    {
      icon: Package,
      title: t.contact.categories.products,
      desc: t.contact.categories.productsDesc
    },
    {
      icon: Palette,
      title: t.contact.categories.services,
      desc: t.contact.categories.servicesDesc
    },
    {
      icon: Handshake,
      title: t.contact.categories.partnership,
      desc: t.contact.categories.partnershipDesc
    }
  ];
  return /* @__PURE__ */ jsx("section", { id: "contact", className: "py-24 bg-secondary/30", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6", children: [
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.5 },
        className: "max-w-3xl mx-auto text-center mb-12",
        children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold mb-4", children: t.contact.title }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground max-w-2xl mx-auto", children: t.contact.subtitle })
        ]
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto mb-10", children: categories.map((cat, i) => /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.4, delay: i * 0.1 },
        className: "p-5 rounded-2xl bg-background border border-border text-center",
        children: [
          /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3", children: /* @__PURE__ */ jsx(cat.icon, { className: "w-5 h-5 text-primary" }) }),
          /* @__PURE__ */ jsx("h3", { className: "font-semibold text-sm mb-1", children: cat.title }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: cat.desc })
        ]
      },
      i
    )) }),
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.5, delay: 0.3 },
        className: "grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-8",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-2xl bg-background border border-border text-center", children: [
            /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsx(Mail, { className: "w-6 h-6 text-primary" }) }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mb-2", children: t.contact.emailLabel }),
            /* @__PURE__ */ jsx(
              "a",
              {
                href: "mailto:info@wizionar.com",
                className: "text-lg md:text-xl font-bold text-primary hover:text-primary/80 transition-colors",
                children: t.contact.email
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-2xl bg-background border border-border text-center", children: [
            /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsx(Phone, { className: "w-6 h-6 text-accent" }) }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mb-2", children: t.contact.phoneLabel }),
            /* @__PURE__ */ jsx(
              "a",
              {
                href: "https://wa.me/38766882702",
                target: "_blank",
                rel: "noopener noreferrer",
                className: "text-lg md:text-xl font-bold text-accent hover:text-accent/80 transition-colors",
                children: t.contact.phone
              }
            )
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsx(
      motion.p,
      {
        initial: { opacity: 0 },
        whileInView: { opacity: 1 },
        viewport: { once: true },
        transition: { duration: 0.5, delay: 0.5 },
        className: "text-center text-sm text-muted-foreground max-w-xl mx-auto",
        children: t.contact.cta
      }
    )
  ] }) });
};
const WizionarFooter = () => {
  const { t } = useLanguage();
  return /* @__PURE__ */ jsx("footer", { className: "border-t border-border bg-background", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 py-12 md:py-16 flex flex-col items-center text-center gap-6", children: [
    /* @__PURE__ */ jsx(
      "a",
      {
        href: "mailto:info@wizionar.com",
        className: "text-sm text-muted-foreground hover:text-foreground transition-colors",
        children: "info@wizionar.com"
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-5", children: [
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "https://facebook.com/wizionar",
          target: "_blank",
          rel: "noopener noreferrer",
          className: "text-muted-foreground hover:text-foreground transition-colors",
          "aria-label": "Facebook",
          children: /* @__PURE__ */ jsx(Facebook, { className: "w-5 h-5" })
        }
      ),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "https://instagram.com/wizionar.app",
          target: "_blank",
          rel: "noopener noreferrer",
          className: "text-muted-foreground hover:text-foreground transition-colors",
          "aria-label": "Instagram",
          children: /* @__PURE__ */ jsx(Instagram, { className: "w-5 h-5" })
        }
      ),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "https://wa.me/38766882702",
          target: "_blank",
          rel: "noopener noreferrer",
          className: "text-muted-foreground hover:text-foreground transition-colors",
          "aria-label": "WhatsApp",
          children: /* @__PURE__ */ jsx(Phone, { className: "w-5 h-5" })
        }
      )
    ] }),
    /* @__PURE__ */ jsx(LocalizedLink, { to: "/", className: "inline-block", children: /* @__PURE__ */ jsx("img", { src: defaultOgImage, alt: "Wizionar", loading: "lazy", decoding: "async", className: "h-16 w-auto" }) }),
    /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: t.footer.copyright })
  ] }) });
};
const upsertMeta = (attribute, key, content) => {
  let meta = document.head.querySelector("meta[".concat(attribute, '="').concat(key, '"]'));
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute(attribute, key);
    document.head.appendChild(meta);
  }
  meta.content = content;
};
const upsertLink = (rel, href) => {
  let link = document.head.querySelector('link[rel="'.concat(rel, '"]'));
  if (!link) {
    link = document.createElement("link");
    link.rel = rel;
    document.head.appendChild(link);
  }
  link.href = href;
};
const SEOHead = ({
  title,
  description,
  keywords,
  image,
  type = "website",
  noIndex = false,
  schema
}) => {
  const location = useLocation();
  const { language } = useLanguage();
  useEffect(() => {
    const basePath = stripAllLangPrefixes(location.pathname);
    const canonicalUrl = new URL(buildLangPath(basePath, language), BASE_URL).toString();
    const robots = noIndex ? "noindex, nofollow" : DEFAULT_ROBOTS;
    const ogImage = new URL(image || defaultOgImage, BASE_URL).toString();
    const currentLocale = LANGUAGE_SEO[language].ogLocale;
    const alternateLocales = Object.entries(LANGUAGE_SEO).filter(([lang]) => lang !== language).map(([, meta]) => meta.ogLocale);
    document.title = title;
    upsertMeta("name", "description", description);
    upsertMeta("name", "keywords", (keywords == null ? void 0 : keywords.join(", ")) || "");
    upsertMeta("name", "author", SITE_NAME);
    upsertMeta("name", "application-name", SITE_NAME);
    upsertMeta("name", "robots", robots);
    upsertMeta("name", "googlebot", robots);
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", ogImage);
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:type", type);
    upsertMeta("property", "og:site_name", SITE_NAME);
    upsertMeta("property", "og:url", canonicalUrl);
    upsertMeta("property", "og:image", ogImage);
    upsertMeta("property", "og:image:alt", title);
    upsertMeta("property", "og:locale", currentLocale);
    document.querySelectorAll('meta[data-seo-og-alt-locale="true"]').forEach((element) => element.remove());
    alternateLocales.forEach((locale) => {
      const meta = document.createElement("meta");
      meta.setAttribute("property", "og:locale:alternate");
      meta.setAttribute("content", locale);
      meta.dataset.seoOgAltLocale = "true";
      document.head.appendChild(meta);
    });
    upsertLink("canonical", canonicalUrl);
    document.querySelectorAll('script[data-wizionar-schema="true"]').forEach((element) => element.remove());
    const schemaList = (Array.isArray(schema) ? schema : schema ? [schema] : []).filter(Boolean);
    schemaList.forEach((item) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.dataset.wizionarSchema = "true";
      script.textContent = JSON.stringify(item);
      document.head.appendChild(script);
    });
    return () => {
      document.querySelectorAll('meta[data-seo-og-alt-locale="true"]').forEach((element) => element.remove());
      document.querySelectorAll('script[data-wizionar-schema="true"]').forEach((element) => element.remove());
    };
  }, [description, image, keywords, language, location.pathname, noIndex, schema, title, type]);
  return null;
};
const Index = () => {
  const { language } = useLanguage();
  const seo = getPageSeo("home", language);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      SEOHead,
      {
        title: seo.title,
        description: seo.description,
        keywords: seo.keywords,
        schema: [
          createOrganizationSchema(),
          createWebsiteSchema(language),
          createWebPageSchema({
            language,
            path: SEO_PATHS.home,
            title: seo.title,
            description: seo.description
          })
        ]
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-background text-foreground", children: [
      /* @__PURE__ */ jsx(WizionarHeader, {}),
      /* @__PURE__ */ jsxs("main", { children: [
        /* @__PURE__ */ jsx(WizionarHero, {}),
        /* @__PURE__ */ jsx(TrustSignals, {}),
        /* @__PURE__ */ jsx(WhatWeDo, {}),
        /* @__PURE__ */ jsx(ProductsSection, {}),
        /* @__PURE__ */ jsx(ProcessSection, {}),
        /* @__PURE__ */ jsx(SecurityTrust, {}),
        /* @__PURE__ */ jsx(ForWhoSection, {}),
        /* @__PURE__ */ jsx(ContactSection, {})
      ] }),
      /* @__PURE__ */ jsx(WizionarFooter, {})
    ] })
  ] });
};
const Index$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index
}, Symbol.toStringTag, { value: "Module" }));
const wizflussiTranslations = {
  sr: {
    header: {
      problem: "Problem",
      solution: "Rješenje",
      features: "Funkcionalnosti",
      security: "Sigurnost",
      audience: "Za koga",
      backToWizionar: "← Wizionar",
      testApp: "Testiraj aplikaciju"
    },
    hero: {
      badge: "Enterprise rješenje za finansijske timove",
      title: "Potpuna kontrola nad",
      titleHighlight: "plaćanjima dobavljačima",
      subtitle: "Centralizujte sve obaveze prema dobavljačima. Pratite rokove, valute i statuse plaćanja na jednom mjestu. Bez grešaka, bez kašnjenja.",
      cta1: "Testiraj aplikaciju",
      cta2: "Saznaj više",
      trust: {
        rbac: "RBAC kontrola pristupa",
        analytics: "Real-time analitika",
        deadlines: "Automatsko praćenje rokova"
      }
    },
    problem: {
      label: "Problem",
      title: "Izazovi koje finansijski timovi poznaju predobro",
      subtitle: "Upravljanje plaćanjima dobavljačima nije trivijalan zadatak. Ovo su stvarni problemi koje svakodnevno viđamo u srednjim i velikim kompanijama.",
      items: {
        documentation: { title: "Rasuta dokumentacija", description: "Plaćanja, fakture i rokovi razbacani po Excel tabelama, emailovima i različitim sistemima. Nema jednog izvora istine." },
        errors: { title: "Greške i duplikati", description: "Ručni unos podataka dovodi do grešaka. Dupla plaćanja, pogrešni iznosi i propušteni popusti postaju svakodnevica." },
        deadlines: { title: "Propušteni rokovi", description: "Bez automatizovanih podsjetnika, rokovi plaćanja se propuštaju. Kamate, penali i narušeni odnosi sa dobavljačima." },
        cashflow: { title: "Nevidljiv cash flow", description: "Menadžment nema jasan pregled nadolazećih obaveza. Odluke se donose naslijepo, bez pouzdanih finansijskih projekcija." },
        control: { title: "Nedostatak kontrole", description: "Ko je odobrio plaćanje? Kada? Zašto? Bez audit traga, teško je osigurati usklađenost i unutrašnju kontrolu." }
      }
    },
    solution: {
      label: "Rješenje",
      title: "WizFlussi donosi red u vaše finansije",
      subtitle: "WizFlussi nije još jedan alat za praćenje računa. To je profesionalna platforma dizajnirana za organizacije koje zahtijevaju potpunu kontrolu, transparentnost i sigurnost u upravljanju obavezama prema dobavljačima.",
      items: {
        centralized: { title: "Centralizovana kontrola", description: "Sva plaćanja, dobavljači i fakture na jednom mjestu. Jedan izvor istine za cijelu organizaciju." },
        errors: { title: "Eliminacija grešaka", description: "Validacija unosa, automatska detekcija duplikata i kontrola odobrenja smanjuju ljudske greške na minimum." },
        cashflow: { title: "Jasan cash flow", description: "Real-time pregled svih nadolazećih plaćanja po datumima, valutama i statusima. Precizne finansijske projekcije." },
        automation: { title: "Automatizacija rokova", description: "Sistem prati rokove i automatski obavještava odgovorne osobe. Nikad više propuštenih plaćanja." }
      },
      dashboard: {
        title: "WizFlussi Dashboard",
        totalObligations: "Ukupne obaveze",
        dueToday: "Dospijeva danas",
        payments: "plaćanja",
        suppliers: "Dobavljači",
        active: "Aktivnih",
        upcomingPayments: "Nadolazeća plaćanja",
        approved: "Odobreno",
        pending: "Na čekanju"
      }
    },
    features: {
      label: "Funkcionalnosti",
      title: "Sve što trebate za profesionalno upravljanje plaćanjima",
      subtitle: "WizFlussi pokriva cijeli životni ciklus upravljanja obavezama prema dobavljačima – od unosa do izvještavanja i revizije.",
      items: {
        dashboard: { title: "Dashboard analitika", description: "Pregled svih ključnih metrika na jednom mjestu. Grafički prikazi obaveza po dobavljačima, valutama i periodima. Trend analiza i projekcije cash flow-a." },
        payments: { title: "Upravljanje plaćanjima", description: "Kreiranje, praćenje i odobravanje plaćanja kroz definisane workflow-e. Status tracking od kreiranja do izvršenja. Batch obrada za efikasnost." },
        suppliers: { title: "Dobavljači", description: "Centralni registar svih dobavljača sa kontakt podacima, ugovorima i historijom plaćanja. Kategorizacija i ocjenjivanje dobavljača." },
        branches: { title: "Poslovnice", description: "Multi-lokacijska podrška za kompanije sa više poslovnica. Konsolidovani izvještaji i individualno praćenje po lokaciji." },
        plans: { title: "Planovi plaćanja", description: "Definisanje planova plaćanja za rate, pretplate i periodična plaćanja. Automatsko generisanje obaveza prema planu." },
        currency: { title: "Više valuta", description: "Podrška za KM, EUR, USD i druge valute. Automatska konverzija po definisanim kursevima. Izvještaji u osnovnoj i stranim valutama." },
        reports: { title: "Izvještaji i export", description: "Generisanje izvještaja u CSV, Excel i PDF formatima. Prilagodljivi izvještaji prema potrebama revizije i menadžmenta." },
        rbac: { title: "RBAC i audit logovi", description: "Granularna kontrola pristupa po ulogama. Kompletna evidencija svih akcija u sistemu. Usklađenost sa regulatornim zahtjevima." }
      }
    },
    security: {
      label: "Sigurnost",
      title: "Sigurnost i povjerenje na prvom mjestu",
      subtitle: "Finansijski podaci zahtijevaju najviši nivo zaštite. WizFlussi je dizajniran sa sigurnošću kao osnovnim principom.",
      items: {
        access: { title: "Kontrola pristupa", description: "Role-Based Access Control (RBAC) omogućava precizno definisanje ko može vidjeti, kreirati ili odobriti plaćanja." },
        audit: { title: "Audit trail", description: "Svaka akcija u sistemu se bilježi – ko, kada i šta. Potpuna transparentnost za interne i eksterne revizije." },
        encryption: { title: "Enkripcija podataka", description: "Svi osjetljivi podaci su enkriptovani u mirovanju i tokom prijenosa. Industrijski standardi zaštite." },
        validation: { title: "Validacija unosa", description: "Automatska provjera podataka prilikom unosa. Sprječavanje grešaka prije nego što uđu u sistem." },
        monitoring: { title: "Aktivni monitoring", description: "Praćenje sumnjivih aktivnosti i neuobičajenih obrazaca. Proaktivna zaštita od anomalija." },
        session: { title: "Session management", description: "Sigurno upravljanje sesijama sa automatskim logout-om i ponovnom autentifikacijom za osjetljive akcije." }
      },
      enterprise: {
        title: "Enterprise-grade sigurnost",
        subtitle: "Isti standardi koje koriste banke i finansijske institucije"
      }
    },
    audience: {
      label: "Za koga",
      title: "Dizajnirano za profesionalce",
      subtitle: "WizFlussi nije za svakoga. Kreiran je za organizacije koje shvataju važnost kontrole nad finansijskim obavezama i koje traže pouzdano rješenje.",
      items: {
        medium: { title: "Srednje kompanije", description: "Organizacije sa 50-500 zaposlenih koje su prerasle Excel tabele ali ne žele kompleksne ERP sisteme. WizFlussi nudi pravu mjeru funkcionalnosti.", features: ["Brza implementacija", "Intuitivno korištenje", "Skalabilnost"] },
        large: { title: "Velike kompanije", description: "Korporacije sa višestrukim poslovnicama, složenim lancima nabavke i strogim zahtjevima za usklađenost i kontrolu.", features: ["Multi-lokacijska podrška", "Napredni RBAC", "Integracije"] },
        accounting: { title: "Računovodstvene agencije", description: "Agencije koje vode finansije za više klijenata. Odvojeni prostori za svakog klijenta sa centralizovanim upravljanjem.", features: ["Multi-tenant arhitektura", "Klijentski portali", "Batch operacije"] },
        logistics: { title: "Logistika i distribucija", description: "Kompanije sa velikim brojem dobavljača i čestim plaćanjima. Kritična potreba za tačnim praćenjem rokova i cash flow-a.", features: ["Masovni import", "Automatizacija", "Izvještaji po vozilima"] }
      }
    },
    tech: {
      label: "Tehnologija",
      title: "Izgrađeno na provjerenim temeljima",
      items: {
        laravel: { title: "Laravel Backend", description: "Robustan PHP framework sa godinama dokazanom stabilnošću u enterprise okruženjima." },
        architecture: { title: "Stabilna arhitektura", description: "Modularna struktura koja omogućava lako održavanje i proširenje funkcionalnosti." },
        security: { title: "Sigurnost ugrađena", description: "OWASP smjernice, zaštita od SQL injection, CSRF i XSS napada iz temelja." },
        scalability: { title: "Skalabilnost", description: "Arhitektura spremna za rast – od stotina do miliona transakcija." }
      },
      note: "Svi tehnički detalji su dostupni na zahtjev. Naš tim je spreman odgovoriti na pitanja vaših IT stručnjaka tokom evaluacije."
    },
    cta: {
      title: "Spremni da preuzmete kontrolu nad plaćanjima?",
      subtitle: "Testirajte aplikaciju odmah ili nas kontaktirajte za više informacija.",
      testApp: "Testiraj aplikaciju",
      contact: "Kontaktiraj",
      pricing: {
        customization: "Moguće prilagođavanje po zahtjevu",
        salePrice: "399 KM"
      }
    },
    footer: {
      wizionar: "Wizionar"
    }
  },
  en: {
    header: {
      problem: "Problem",
      solution: "Solution",
      features: "Features",
      security: "Security",
      audience: "For whom",
      backToWizionar: "← Wizionar",
      testApp: "Test application"
    },
    hero: {
      badge: "Enterprise solution for financial teams",
      title: "Complete control over",
      titleHighlight: "supplier payments",
      subtitle: "Centralize all obligations to suppliers. Track deadlines, currencies and payment statuses in one place. No errors, no delays.",
      cta1: "Test application",
      cta2: "Learn more",
      trust: {
        rbac: "RBAC access control",
        analytics: "Real-time analytics",
        deadlines: "Automatic deadline tracking"
      }
    },
    problem: {
      label: "Problem",
      title: "Challenges financial teams know all too well",
      subtitle: "Managing supplier payments is not a trivial task. These are real problems we see daily in medium and large companies.",
      items: {
        documentation: { title: "Scattered documentation", description: "Payments, invoices and deadlines scattered across Excel spreadsheets, emails and different systems. No single source of truth." },
        errors: { title: "Errors and duplicates", description: "Manual data entry leads to errors. Double payments, wrong amounts and missed discounts become everyday occurrences." },
        deadlines: { title: "Missed deadlines", description: "Without automated reminders, payment deadlines are missed. Interest, penalties and damaged supplier relationships." },
        cashflow: { title: "Invisible cash flow", description: "Management has no clear view of upcoming obligations. Decisions are made blindly, without reliable financial projections." },
        control: { title: "Lack of control", description: "Who approved the payment? When? Why? Without an audit trail, it's hard to ensure compliance and internal control." }
      }
    },
    solution: {
      label: "Solution",
      title: "WizFlussi brings order to your finances",
      subtitle: "WizFlussi is not just another invoice tracking tool. It's a professional platform designed for organizations that demand complete control, transparency and security in managing supplier obligations.",
      items: {
        centralized: { title: "Centralized control", description: "All payments, suppliers and invoices in one place. One source of truth for the entire organization." },
        errors: { title: "Error elimination", description: "Input validation, automatic duplicate detection and approval controls reduce human errors to a minimum." },
        cashflow: { title: "Clear cash flow", description: "Real-time view of all upcoming payments by date, currency and status. Precise financial projections." },
        automation: { title: "Deadline automation", description: "The system tracks deadlines and automatically notifies responsible persons. Never miss a payment again." }
      },
      dashboard: {
        title: "WizFlussi Dashboard",
        totalObligations: "Total obligations",
        dueToday: "Due today",
        payments: "payments",
        suppliers: "Suppliers",
        active: "Active",
        upcomingPayments: "Upcoming payments",
        approved: "Approved",
        pending: "Pending"
      }
    },
    features: {
      label: "Features",
      title: "Everything you need for professional payment management",
      subtitle: "WizFlussi covers the entire lifecycle of supplier obligation management – from entry to reporting and auditing.",
      items: {
        dashboard: { title: "Dashboard analytics", description: "Overview of all key metrics in one place. Graphical views of obligations by suppliers, currencies and periods. Trend analysis and cash flow projections." },
        payments: { title: "Payment management", description: "Creating, tracking and approving payments through defined workflows. Status tracking from creation to execution. Batch processing for efficiency." },
        suppliers: { title: "Suppliers", description: "Central registry of all suppliers with contact details, contracts and payment history. Categorization and supplier rating." },
        branches: { title: "Branches", description: "Multi-location support for companies with multiple branches. Consolidated reports and individual tracking by location." },
        plans: { title: "Payment plans", description: "Defining payment plans for installments, subscriptions and periodic payments. Automatic generation of obligations according to plan." },
        currency: { title: "Multiple currencies", description: "Support for BAM, EUR, USD and other currencies. Automatic conversion at defined rates. Reports in base and foreign currencies." },
        reports: { title: "Reports and export", description: "Generating reports in CSV, Excel and PDF formats. Customizable reports according to audit and management needs." },
        rbac: { title: "RBAC and audit logs", description: "Granular role-based access control. Complete record of all actions in the system. Compliance with regulatory requirements." }
      }
    },
    security: {
      label: "Security",
      title: "Security and trust first",
      subtitle: "Financial data requires the highest level of protection. WizFlussi is designed with security as a core principle.",
      items: {
        access: { title: "Access control", description: "Role-Based Access Control (RBAC) enables precise definition of who can view, create or approve payments." },
        audit: { title: "Audit trail", description: "Every action in the system is logged – who, when and what. Full transparency for internal and external audits." },
        encryption: { title: "Data encryption", description: "All sensitive data is encrypted at rest and in transit. Industry-standard protection." },
        validation: { title: "Input validation", description: "Automatic data verification on entry. Preventing errors before they enter the system." },
        monitoring: { title: "Active monitoring", description: "Tracking suspicious activities and unusual patterns. Proactive protection from anomalies." },
        session: { title: "Session management", description: "Secure session management with automatic logout and re-authentication for sensitive actions." }
      },
      enterprise: {
        title: "Enterprise-grade security",
        subtitle: "The same standards used by banks and financial institutions"
      }
    },
    audience: {
      label: "For whom",
      title: "Designed for professionals",
      subtitle: "WizFlussi is not for everyone. It's created for organizations that understand the importance of control over financial obligations and are looking for a reliable solution.",
      items: {
        medium: { title: "Medium companies", description: "Organizations with 50-500 employees that have outgrown Excel spreadsheets but don't want complex ERP systems. WizFlussi offers the right measure of functionality.", features: ["Fast implementation", "Intuitive use", "Scalability"] },
        large: { title: "Large companies", description: "Corporations with multiple branches, complex supply chains and strict compliance and control requirements.", features: ["Multi-location support", "Advanced RBAC", "Integrations"] },
        accounting: { title: "Accounting agencies", description: "Agencies managing finances for multiple clients. Separate spaces for each client with centralized management.", features: ["Multi-tenant architecture", "Client portals", "Batch operations"] },
        logistics: { title: "Logistics and distribution", description: "Companies with a large number of suppliers and frequent payments. Critical need for accurate deadline and cash flow tracking.", features: ["Mass import", "Automation", "Vehicle reports"] }
      }
    },
    tech: {
      label: "Technology",
      title: "Built on proven foundations",
      items: {
        laravel: { title: "Laravel Backend", description: "Robust PHP framework with years of proven stability in enterprise environments." },
        architecture: { title: "Stable architecture", description: "Modular structure that enables easy maintenance and functionality extension." },
        security: { title: "Built-in security", description: "OWASP guidelines, protection from SQL injection, CSRF and XSS attacks from the ground up." },
        scalability: { title: "Scalability", description: "Architecture ready for growth – from hundreds to millions of transactions." }
      },
      note: "All technical details are available on request. Our team is ready to answer questions from your IT experts during evaluation."
    },
    cta: {
      title: "Ready to take control of your payments?",
      subtitle: "Test the application now or contact us for more information.",
      testApp: "Test application",
      contact: "Contact",
      pricing: {
        customization: "Customization available on request",
        salePrice: "399 BAM"
      }
    },
    footer: {
      wizionar: "Wizionar"
    }
  },
  de: {
    header: {
      problem: "Problem",
      solution: "Lösung",
      features: "Funktionen",
      security: "Sicherheit",
      audience: "Für wen",
      backToWizionar: "← Wizionar",
      testApp: "Anwendung testen"
    },
    hero: {
      badge: "Enterprise-Lösung für Finanzteams",
      title: "Vollständige Kontrolle über",
      titleHighlight: "Lieferantenzahlungen",
      subtitle: "Zentralisieren Sie alle Verpflichtungen gegenüber Lieferanten. Verfolgen Sie Fristen, Währungen und Zahlungsstatus an einem Ort. Keine Fehler, keine Verzögerungen.",
      cta1: "Anwendung testen",
      cta2: "Mehr erfahren",
      trust: {
        rbac: "RBAC-Zugriffskontrolle",
        analytics: "Echtzeit-Analytik",
        deadlines: "Automatische Fristenverfolgung"
      }
    },
    problem: {
      label: "Problem",
      title: "Herausforderungen, die Finanzteams nur zu gut kennen",
      subtitle: "Die Verwaltung von Lieferantenzahlungen ist keine triviale Aufgabe. Dies sind echte Probleme, die wir täglich in mittleren und großen Unternehmen sehen.",
      items: {
        documentation: { title: "Verstreute Dokumentation", description: "Zahlungen, Rechnungen und Fristen verteilt auf Excel-Tabellen, E-Mails und verschiedene Systeme. Keine einzige Quelle der Wahrheit." },
        errors: { title: "Fehler und Duplikate", description: "Manuelle Dateneingabe führt zu Fehlern. Doppelzahlungen, falsche Beträge und verpasste Rabatte werden alltäglich." },
        deadlines: { title: "Verpasste Fristen", description: "Ohne automatisierte Erinnerungen werden Zahlungsfristen verpasst. Zinsen, Strafen und beschädigte Lieferantenbeziehungen." },
        cashflow: { title: "Unsichtbarer Cashflow", description: "Das Management hat keinen klaren Überblick über anstehende Verpflichtungen. Entscheidungen werden blind getroffen, ohne zuverlässige Finanzprognosen." },
        control: { title: "Mangelnde Kontrolle", description: "Wer hat die Zahlung genehmigt? Wann? Warum? Ohne Audit-Trail ist es schwer, Compliance und interne Kontrolle sicherzustellen." }
      }
    },
    solution: {
      label: "Lösung",
      title: "WizFlussi bringt Ordnung in Ihre Finanzen",
      subtitle: "WizFlussi ist nicht nur ein weiteres Rechnungsverfolgungstool. Es ist eine professionelle Plattform für Organisationen, die vollständige Kontrolle, Transparenz und Sicherheit bei der Verwaltung von Lieferantenverpflichtungen verlangen.",
      items: {
        centralized: { title: "Zentralisierte Kontrolle", description: "Alle Zahlungen, Lieferanten und Rechnungen an einem Ort. Eine Quelle der Wahrheit für die gesamte Organisation." },
        errors: { title: "Fehlerbeseitigung", description: "Eingabevalidierung, automatische Duplikaterkennung und Genehmigungskontrollen reduzieren menschliche Fehler auf ein Minimum." },
        cashflow: { title: "Klarer Cashflow", description: "Echtzeit-Übersicht aller anstehenden Zahlungen nach Datum, Währung und Status. Präzise Finanzprognosen." },
        automation: { title: "Fristenautomatisierung", description: "Das System verfolgt Fristen und benachrichtigt automatisch verantwortliche Personen. Nie wieder eine Zahlung verpassen." }
      },
      dashboard: {
        title: "WizFlussi Dashboard",
        totalObligations: "Gesamtverpflichtungen",
        dueToday: "Heute fällig",
        payments: "Zahlungen",
        suppliers: "Lieferanten",
        active: "Aktiv",
        upcomingPayments: "Anstehende Zahlungen",
        approved: "Genehmigt",
        pending: "Ausstehend"
      }
    },
    features: {
      label: "Funktionen",
      title: "Alles, was Sie für professionelles Zahlungsmanagement brauchen",
      subtitle: "WizFlussi deckt den gesamten Lebenszyklus der Lieferantenverpflichtungsverwaltung ab – vom Eintrag bis zur Berichterstattung und Prüfung.",
      items: {
        dashboard: { title: "Dashboard-Analytik", description: "Überblick über alle wichtigen Kennzahlen an einem Ort. Grafische Ansichten der Verpflichtungen nach Lieferanten, Währungen und Perioden." },
        payments: { title: "Zahlungsverwaltung", description: "Erstellen, Verfolgen und Genehmigen von Zahlungen durch definierte Workflows. Statusverfolgung von der Erstellung bis zur Ausführung." },
        suppliers: { title: "Lieferanten", description: "Zentrales Register aller Lieferanten mit Kontaktdaten, Verträgen und Zahlungshistorie. Kategorisierung und Lieferantenbewertung." },
        branches: { title: "Niederlassungen", description: "Multi-Standort-Unterstützung für Unternehmen mit mehreren Niederlassungen. Konsolidierte Berichte und individuelle Verfolgung nach Standort." },
        plans: { title: "Zahlungspläne", description: "Definition von Zahlungsplänen für Raten, Abonnements und periodische Zahlungen. Automatische Generierung von Verpflichtungen nach Plan." },
        currency: { title: "Mehrere Währungen", description: "Unterstützung für BAM, EUR, USD und andere Währungen. Automatische Umrechnung zu definierten Kursen." },
        reports: { title: "Berichte und Export", description: "Generierung von Berichten in CSV-, Excel- und PDF-Formaten. Anpassbare Berichte nach Prüfungs- und Managementbedürfnissen." },
        rbac: { title: "RBAC und Audit-Logs", description: "Granulare rollenbasierte Zugriffskontrolle. Vollständige Aufzeichnung aller Aktionen im System." }
      }
    },
    security: {
      label: "Sicherheit",
      title: "Sicherheit und Vertrauen an erster Stelle",
      subtitle: "Finanzdaten erfordern das höchste Schutzniveau. WizFlussi wurde mit Sicherheit als Kernprinzip entwickelt.",
      items: {
        access: { title: "Zugriffskontrolle", description: "Rollenbasierte Zugriffskontrolle (RBAC) ermöglicht präzise Definition, wer Zahlungen anzeigen, erstellen oder genehmigen kann." },
        audit: { title: "Audit-Trail", description: "Jede Aktion im System wird protokolliert – wer, wann und was. Volle Transparenz für interne und externe Prüfungen." },
        encryption: { title: "Datenverschlüsselung", description: "Alle sensiblen Daten werden im Ruhezustand und bei der Übertragung verschlüsselt. Branchenstandard-Schutz." },
        validation: { title: "Eingabevalidierung", description: "Automatische Datenüberprüfung bei der Eingabe. Verhinderung von Fehlern, bevor sie ins System gelangen." },
        monitoring: { title: "Aktive Überwachung", description: "Verfolgung verdächtiger Aktivitäten und ungewöhnlicher Muster. Proaktiver Schutz vor Anomalien." },
        session: { title: "Sitzungsverwaltung", description: "Sichere Sitzungsverwaltung mit automatischer Abmeldung und erneuter Authentifizierung für sensible Aktionen." }
      },
      enterprise: {
        title: "Enterprise-grade Sicherheit",
        subtitle: "Die gleichen Standards, die von Banken und Finanzinstituten verwendet werden"
      }
    },
    audience: {
      label: "Für wen",
      title: "Für Profis entwickelt",
      subtitle: "WizFlussi ist nicht für jeden. Es wurde für Organisationen geschaffen, die die Bedeutung der Kontrolle über finanzielle Verpflichtungen verstehen.",
      items: {
        medium: { title: "Mittlere Unternehmen", description: "Organisationen mit 50-500 Mitarbeitern, die Excel-Tabellen entwachsen sind, aber keine komplexen ERP-Systeme wollen.", features: ["Schnelle Implementierung", "Intuitive Nutzung", "Skalierbarkeit"] },
        large: { title: "Große Unternehmen", description: "Konzerne mit mehreren Niederlassungen, komplexen Lieferketten und strengen Compliance-Anforderungen.", features: ["Multi-Standort-Unterstützung", "Erweitertes RBAC", "Integrationen"] },
        accounting: { title: "Buchhaltungsagenturen", description: "Agenturen, die Finanzen für mehrere Kunden verwalten. Separate Bereiche für jeden Kunden mit zentraler Verwaltung.", features: ["Multi-Tenant-Architektur", "Kundenportale", "Batch-Operationen"] },
        logistics: { title: "Logistik und Distribution", description: "Unternehmen mit vielen Lieferanten und häufigen Zahlungen. Kritischer Bedarf an genauer Fristen- und Cashflow-Verfolgung.", features: ["Massenimport", "Automatisierung", "Fahrzeugberichte"] }
      }
    },
    tech: {
      label: "Technologie",
      title: "Auf bewährten Grundlagen gebaut",
      items: {
        laravel: { title: "Laravel Backend", description: "Robustes PHP-Framework mit jahrelang bewiesener Stabilität in Enterprise-Umgebungen." },
        architecture: { title: "Stabile Architektur", description: "Modulare Struktur, die einfache Wartung und Funktionserweiterung ermöglicht." },
        security: { title: "Eingebaute Sicherheit", description: "OWASP-Richtlinien, Schutz vor SQL-Injection, CSRF- und XSS-Angriffen von Grund auf." },
        scalability: { title: "Skalierbarkeit", description: "Architektur bereit für Wachstum – von Hunderten zu Millionen von Transaktionen." }
      },
      note: "Alle technischen Details sind auf Anfrage verfügbar. Unser Team ist bereit, Fragen Ihrer IT-Experten während der Evaluierung zu beantworten."
    },
    cta: {
      title: "Bereit, die Kontrolle über Ihre Zahlungen zu übernehmen?",
      subtitle: "Testen Sie die Anwendung jetzt oder kontaktieren Sie uns für weitere Informationen.",
      testApp: "Anwendung testen",
      contact: "Kontakt",
      pricing: {
        customization: "Anpassung auf Anfrage möglich",
        salePrice: "399 BAM"
      }
    },
    footer: {
      wizionar: "Wizionar"
    }
  },
  it: {
    header: {
      problem: "Problema",
      solution: "Soluzione",
      features: "Funzionalità",
      security: "Sicurezza",
      audience: "Per chi",
      backToWizionar: "← Wizionar",
      testApp: "Testa l'applicazione"
    },
    hero: {
      badge: "Soluzione enterprise per team finanziari",
      title: "Controllo completo sui",
      titleHighlight: "pagamenti fornitori",
      subtitle: "Centralizza tutti gli obblighi verso i fornitori. Traccia scadenze, valute e stati di pagamento in un unico posto. Nessun errore, nessun ritardo.",
      cta1: "Testa l'applicazione",
      cta2: "Scopri di più",
      trust: {
        rbac: "Controllo accesso RBAC",
        analytics: "Analisi in tempo reale",
        deadlines: "Tracciamento automatico scadenze"
      }
    },
    problem: {
      label: "Problema",
      title: "Sfide che i team finanziari conoscono fin troppo bene",
      subtitle: "Gestire i pagamenti ai fornitori non è un compito banale. Questi sono problemi reali che vediamo quotidianamente in medie e grandi aziende.",
      items: {
        documentation: { title: "Documentazione dispersa", description: "Pagamenti, fatture e scadenze sparsi tra fogli Excel, email e sistemi diversi. Nessuna fonte unica di verità." },
        errors: { title: "Errori e duplicati", description: "L'inserimento manuale dei dati porta a errori. Doppi pagamenti, importi errati e sconti persi diventano quotidiani." },
        deadlines: { title: "Scadenze mancate", description: "Senza promemoria automatizzati, le scadenze di pagamento vengono mancate. Interessi, penali e relazioni danneggiate con i fornitori." },
        cashflow: { title: "Cash flow invisibile", description: "La direzione non ha una visione chiara degli obblighi imminenti. Le decisioni vengono prese alla cieca, senza proiezioni finanziarie affidabili." },
        control: { title: "Mancanza di controllo", description: "Chi ha approvato il pagamento? Quando? Perché? Senza una traccia di audit, è difficile garantire conformità e controllo interno." }
      }
    },
    solution: {
      label: "Soluzione",
      title: "WizFlussi porta ordine nelle tue finanze",
      subtitle: "WizFlussi non è solo un altro strumento di tracciamento fatture. È una piattaforma professionale progettata per organizzazioni che richiedono controllo completo, trasparenza e sicurezza nella gestione degli obblighi verso i fornitori.",
      items: {
        centralized: { title: "Controllo centralizzato", description: "Tutti i pagamenti, fornitori e fatture in un unico posto. Una fonte di verità per l'intera organizzazione." },
        errors: { title: "Eliminazione errori", description: "Validazione input, rilevamento automatico duplicati e controlli di approvazione riducono gli errori umani al minimo." },
        cashflow: { title: "Cash flow chiaro", description: "Visualizzazione in tempo reale di tutti i pagamenti imminenti per data, valuta e stato. Proiezioni finanziarie precise." },
        automation: { title: "Automazione scadenze", description: "Il sistema traccia le scadenze e notifica automaticamente i responsabili. Mai più un pagamento mancato." }
      },
      dashboard: {
        title: "Dashboard WizFlussi",
        totalObligations: "Obblighi totali",
        dueToday: "Scadenza oggi",
        payments: "pagamenti",
        suppliers: "Fornitori",
        active: "Attivi",
        upcomingPayments: "Pagamenti imminenti",
        approved: "Approvato",
        pending: "In attesa"
      }
    },
    features: {
      label: "Funzionalità",
      title: "Tutto ciò che serve per la gestione professionale dei pagamenti",
      subtitle: "WizFlussi copre l'intero ciclo di vita della gestione degli obblighi verso i fornitori – dall'inserimento alla reportistica e all'audit.",
      items: {
        dashboard: { title: "Dashboard analytics", description: "Panoramica di tutte le metriche chiave in un unico posto. Viste grafiche degli obblighi per fornitori, valute e periodi." },
        payments: { title: "Gestione pagamenti", description: "Creazione, tracciamento e approvazione dei pagamenti attraverso workflow definiti. Tracciamento stato dalla creazione all'esecuzione." },
        suppliers: { title: "Fornitori", description: "Registro centrale di tutti i fornitori con dettagli di contatto, contratti e storico pagamenti. Categorizzazione e valutazione fornitori." },
        branches: { title: "Filiali", description: "Supporto multi-sede per aziende con più filiali. Report consolidati e tracciamento individuale per sede." },
        plans: { title: "Piani di pagamento", description: "Definizione di piani di pagamento per rate, abbonamenti e pagamenti periodici. Generazione automatica degli obblighi secondo il piano." },
        currency: { title: "Più valute", description: "Supporto per BAM, EUR, USD e altre valute. Conversione automatica ai tassi definiti." },
        reports: { title: "Report ed esportazione", description: "Generazione di report in formati CSV, Excel e PDF. Report personalizzabili secondo le esigenze di audit e management." },
        rbac: { title: "RBAC e log di audit", description: "Controllo accesso granulare basato sui ruoli. Registrazione completa di tutte le azioni nel sistema." }
      }
    },
    security: {
      label: "Sicurezza",
      title: "Sicurezza e fiducia al primo posto",
      subtitle: "I dati finanziari richiedono il massimo livello di protezione. WizFlussi è progettato con la sicurezza come principio fondamentale.",
      items: {
        access: { title: "Controllo accesso", description: "Il controllo accesso basato sui ruoli (RBAC) consente di definire con precisione chi può visualizzare, creare o approvare i pagamenti." },
        audit: { title: "Traccia di audit", description: "Ogni azione nel sistema viene registrata – chi, quando e cosa. Piena trasparenza per audit interni ed esterni." },
        encryption: { title: "Crittografia dati", description: "Tutti i dati sensibili sono crittografati a riposo e in transito. Protezione secondo gli standard di settore." },
        validation: { title: "Validazione input", description: "Verifica automatica dei dati all'inserimento. Prevenzione degli errori prima che entrino nel sistema." },
        monitoring: { title: "Monitoraggio attivo", description: "Tracciamento di attività sospette e pattern insoliti. Protezione proattiva dalle anomalie." },
        session: { title: "Gestione sessioni", description: "Gestione sicura delle sessioni con logout automatico e ri-autenticazione per azioni sensibili." }
      },
      enterprise: {
        title: "Sicurezza enterprise-grade",
        subtitle: "Gli stessi standard utilizzati da banche e istituzioni finanziarie"
      }
    },
    audience: {
      label: "Per chi",
      title: "Progettato per professionisti",
      subtitle: "WizFlussi non è per tutti. È creato per organizzazioni che comprendono l'importanza del controllo sugli obblighi finanziari.",
      items: {
        medium: { title: "Medie aziende", description: "Organizzazioni con 50-500 dipendenti che sono cresciute oltre i fogli Excel ma non vogliono sistemi ERP complessi.", features: ["Implementazione rapida", "Uso intuitivo", "Scalabilità"] },
        large: { title: "Grandi aziende", description: "Corporazioni con più sedi, catene di fornitura complesse e rigorosi requisiti di conformità e controllo.", features: ["Supporto multi-sede", "RBAC avanzato", "Integrazioni"] },
        accounting: { title: "Agenzie di contabilità", description: "Agenzie che gestiscono le finanze per più clienti. Spazi separati per ogni cliente con gestione centralizzata.", features: ["Architettura multi-tenant", "Portali clienti", "Operazioni batch"] },
        logistics: { title: "Logistica e distribuzione", description: "Aziende con molti fornitori e pagamenti frequenti. Necessità critica di tracciamento preciso delle scadenze e del cash flow.", features: ["Import massivo", "Automazione", "Report veicoli"] }
      }
    },
    tech: {
      label: "Tecnologia",
      title: "Costruito su fondamenta provate",
      items: {
        laravel: { title: "Laravel Backend", description: "Framework PHP robusto con anni di comprovata stabilità in ambienti enterprise." },
        architecture: { title: "Architettura stabile", description: "Struttura modulare che consente facile manutenzione ed estensione delle funzionalità." },
        security: { title: "Sicurezza integrata", description: "Linee guida OWASP, protezione da SQL injection, attacchi CSRF e XSS fin dalle fondamenta." },
        scalability: { title: "Scalabilità", description: "Architettura pronta per la crescita – da centinaia a milioni di transazioni." }
      },
      note: "Tutti i dettagli tecnici sono disponibili su richiesta. Il nostro team è pronto a rispondere alle domande dei vostri esperti IT durante la valutazione."
    },
    cta: {
      title: "Pronti a prendere il controllo dei vostri pagamenti?",
      subtitle: "Testate l'applicazione ora o contattateci per maggiori informazioni.",
      testApp: "Testa l'applicazione",
      contact: "Contatta",
      pricing: {
        customization: "Personalizzazione disponibile su richiesta",
        salePrice: "399 BAM"
      }
    },
    footer: {
      wizionar: "Wizionar"
    }
  }
};
const useWizflussiTranslations = () => {
  const { language } = useLanguage();
  return wizflussiTranslations[language];
};
const Header = () => {
  const t = useWizflussiTranslations();
  return /* @__PURE__ */ jsx(
    motion.header,
    {
      initial: { opacity: 0, y: -20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.5 },
      className: "fixed top-0 left-0 right-0 z-50 border-b border-wf-border bg-wf-background/80 backdrop-blur-xl",
      children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 py-4 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs(LocalizedLink, { to: "/wizflussi", className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-lg bg-emerald flex items-center justify-center", children: /* @__PURE__ */ jsx("span", { className: "text-wf-background font-bold text-lg", children: "W" }) }),
          /* @__PURE__ */ jsx("span", { className: "text-xl font-bold text-wf-foreground", children: "WizFlussi" })
        ] }),
        /* @__PURE__ */ jsxs("nav", { className: "hidden md:flex items-center gap-8", children: [
          /* @__PURE__ */ jsx("a", { href: "#problem", className: "text-sm text-wf-muted-foreground hover:text-wf-foreground transition-colors", children: t.header.problem }),
          /* @__PURE__ */ jsx("a", { href: "#solution", className: "text-sm text-wf-muted-foreground hover:text-wf-foreground transition-colors", children: t.header.solution }),
          /* @__PURE__ */ jsx("a", { href: "#features", className: "text-sm text-wf-muted-foreground hover:text-wf-foreground transition-colors", children: t.header.features }),
          /* @__PURE__ */ jsx("a", { href: "#security", className: "text-sm text-wf-muted-foreground hover:text-wf-foreground transition-colors", children: t.header.security }),
          /* @__PURE__ */ jsx("a", { href: "#audience", className: "text-sm text-wf-muted-foreground hover:text-wf-foreground transition-colors", children: t.header.audience }),
          /* @__PURE__ */ jsx(LocalizedLink, { to: "/", className: "text-sm text-emerald hover:text-emerald-glow transition-colors", children: t.header.backToWizionar })
        ] }),
        /* @__PURE__ */ jsx(LanguageSwitcher, {})
      ] })
    }
  );
};
const HeroSection = () => {
  const t = useWizflussiTranslations();
  return /* @__PURE__ */ jsxs("section", { className: "relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-wf-background", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-dark-hero" }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-emerald/10 rounded-full blur-[120px] animate-pulse-glow" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-wf-border to-transparent" }),
    /* @__PURE__ */ jsx("div", { className: "container mx-auto px-6 relative z-10", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto text-center", children: [
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay: 0.1 },
          className: "inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wf-border bg-wf-secondary/50 mb-8",
          children: [
            /* @__PURE__ */ jsx("span", { className: "w-2 h-2 rounded-full bg-emerald animate-pulse" }),
            /* @__PURE__ */ jsx("span", { className: "text-sm text-wf-muted-foreground", children: t.hero.badge })
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        motion.h1,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay: 0.2 },
          className: "text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-wf-foreground",
          children: [
            t.hero.title,
            " ",
            /* @__PURE__ */ jsx("span", { className: "text-gradient-emerald", children: t.hero.titleHighlight })
          ]
        }
      ),
      /* @__PURE__ */ jsx(
        motion.p,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay: 0.3 },
          className: "text-lg md:text-xl text-wf-muted-foreground max-w-2xl mx-auto mb-10",
          children: t.hero.subtitle
        }
      ),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay: 0.4 },
          className: "flex flex-col sm:flex-row items-center justify-center gap-4 mb-16",
          children: [
            /* @__PURE__ */ jsx(Button, { variant: "hero", size: "xl", className: "group", asChild: true, children: /* @__PURE__ */ jsxs("a", { href: "https://flusso.wizionar.app/login", target: "_blank", rel: "noopener noreferrer", children: [
              t.hero.cta1,
              /* @__PURE__ */ jsx(ArrowRight, { className: "w-5 h-5 group-hover:translate-x-1 transition-transform" })
            ] }) }),
            /* @__PURE__ */ jsx(Button, { variant: "heroOutline", size: "xl", asChild: true, children: /* @__PURE__ */ jsx("a", { href: "#solution", children: t.hero.cta2 }) })
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { duration: 0.8, delay: 0.6 },
          className: "grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-3 p-4 rounded-xl bg-wf-secondary/30 border border-wf-border/50", children: [
              /* @__PURE__ */ jsx(Shield, { className: "w-5 h-5 text-emerald" }),
              /* @__PURE__ */ jsx("span", { className: "text-sm text-wf-muted-foreground", children: t.hero.trust.rbac })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-3 p-4 rounded-xl bg-wf-secondary/30 border border-wf-border/50", children: [
              /* @__PURE__ */ jsx(BarChart3, { className: "w-5 h-5 text-emerald" }),
              /* @__PURE__ */ jsx("span", { className: "text-sm text-wf-muted-foreground", children: t.hero.trust.analytics })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-3 p-4 rounded-xl bg-wf-secondary/30 border border-wf-border/50", children: [
              /* @__PURE__ */ jsx(Clock, { className: "w-5 h-5 text-emerald" }),
              /* @__PURE__ */ jsx("span", { className: "text-sm text-wf-muted-foreground", children: t.hero.trust.deadlines })
            ] })
          ]
        }
      )
    ] }) })
  ] });
};
const ProblemSection = () => {
  const t = useWizflussiTranslations();
  const problems = [
    { icon: FileSpreadsheet, ...t.problem.items.documentation },
    { icon: AlertTriangle, ...t.problem.items.errors },
    { icon: Clock, ...t.problem.items.deadlines },
    { icon: Eye, ...t.problem.items.cashflow },
    { icon: Lock, ...t.problem.items.control }
  ];
  return /* @__PURE__ */ jsxs("section", { id: "problem", className: "py-24 relative bg-wf-background", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-wf-background via-wf-secondary/20 to-wf-background" }),
    /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 relative z-10", children: [
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.5 },
          className: "text-center mb-16",
          children: [
            /* @__PURE__ */ jsx("span", { className: "text-emerald text-sm font-medium uppercase tracking-wider", children: t.problem.label }),
            /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold mt-4 mb-6 text-wf-foreground", children: t.problem.title }),
            /* @__PURE__ */ jsx("p", { className: "text-wf-muted-foreground max-w-2xl mx-auto", children: t.problem.subtitle })
          ]
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto", children: problems.map((problem, index) => /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.5, delay: index * 0.1 },
          className: "group p-6 rounded-2xl bg-wf-card border border-wf-border hover:border-destructive/30 transition-all duration-300",
          children: [
            /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center mb-4 group-hover:bg-destructive/20 transition-colors", children: /* @__PURE__ */ jsx(problem.icon, { className: "w-6 h-6 text-destructive" }) }),
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold mb-2 text-wf-foreground", children: problem.title }),
            /* @__PURE__ */ jsx("p", { className: "text-wf-muted-foreground text-sm leading-relaxed", children: problem.description })
          ]
        },
        problem.title
      )) })
    ] })
  ] });
};
const SolutionSection = () => {
  const t = useWizflussiTranslations();
  const solutions = [
    { icon: Layers, ...t.solution.items.centralized },
    { icon: CheckCircle2, ...t.solution.items.errors },
    { icon: TrendingUp, ...t.solution.items.cashflow },
    { icon: Zap, ...t.solution.items.automation }
  ];
  return /* @__PURE__ */ jsxs("section", { id: "solution", className: "py-24 relative overflow-hidden bg-wf-background", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald/5 rounded-full blur-[150px]" }),
    /* @__PURE__ */ jsx("div", { className: "container mx-auto px-6 relative z-10", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-16 items-center", children: [
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: -20 },
          whileInView: { opacity: 1, x: 0 },
          viewport: { once: true },
          transition: { duration: 0.6 },
          children: [
            /* @__PURE__ */ jsx("span", { className: "text-emerald text-sm font-medium uppercase tracking-wider", children: t.solution.label }),
            /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold mt-4 mb-6 text-wf-foreground", children: t.solution.title }),
            /* @__PURE__ */ jsx("p", { className: "text-wf-muted-foreground mb-8", children: t.solution.subtitle }),
            /* @__PURE__ */ jsx("div", { className: "space-y-6", children: solutions.map((solution, index) => /* @__PURE__ */ jsxs(
              motion.div,
              {
                initial: { opacity: 0, x: -20 },
                whileInView: { opacity: 1, x: 0 },
                viewport: { once: true },
                transition: { duration: 0.5, delay: index * 0.1 },
                className: "flex gap-4",
                children: [
                  /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-lg bg-emerald/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsx(solution.icon, { className: "w-5 h-5 text-emerald" }) }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("h3", { className: "font-semibold mb-1 text-wf-foreground", children: solution.title }),
                    /* @__PURE__ */ jsx("p", { className: "text-wf-muted-foreground text-sm", children: solution.description })
                  ] })
                ]
              },
              solution.title
            )) })
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: 20 },
          whileInView: { opacity: 1, x: 0 },
          viewport: { once: true },
          transition: { duration: 0.6, delay: 0.2 },
          className: "relative",
          children: [
            /* @__PURE__ */ jsx("div", { className: "aspect-[4/3] rounded-2xl bg-gradient-dark-card border border-wf-border overflow-hidden shadow-lg", children: /* @__PURE__ */ jsxs("div", { className: "p-6 h-full flex flex-col", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-6", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsx("div", { className: "w-3 h-3 rounded-full bg-destructive" }),
                  /* @__PURE__ */ jsx("div", { className: "w-3 h-3 rounded-full bg-gold" }),
                  /* @__PURE__ */ jsx("div", { className: "w-3 h-3 rounded-full bg-emerald" })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "text-xs text-wf-muted-foreground", children: t.solution.dashboard.title })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 gap-4 mb-6", children: [
                /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-lg bg-wf-secondary/50 border border-wf-border", children: [
                  /* @__PURE__ */ jsx("div", { className: "text-xs text-wf-muted-foreground mb-1", children: t.solution.dashboard.totalObligations }),
                  /* @__PURE__ */ jsx("div", { className: "text-lg font-bold text-wf-foreground", children: "€124,580" }),
                  /* @__PURE__ */ jsx("div", { className: "text-xs text-emerald mt-1", children: "+12%" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-lg bg-wf-secondary/50 border border-wf-border", children: [
                  /* @__PURE__ */ jsx("div", { className: "text-xs text-wf-muted-foreground mb-1", children: t.solution.dashboard.dueToday }),
                  /* @__PURE__ */ jsx("div", { className: "text-lg font-bold text-wf-foreground", children: "€8,420" }),
                  /* @__PURE__ */ jsxs("div", { className: "text-xs text-gold mt-1", children: [
                    "3 ",
                    t.solution.dashboard.payments
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-lg bg-wf-secondary/50 border border-wf-border", children: [
                  /* @__PURE__ */ jsx("div", { className: "text-xs text-wf-muted-foreground mb-1", children: t.solution.dashboard.suppliers }),
                  /* @__PURE__ */ jsx("div", { className: "text-lg font-bold text-wf-foreground", children: "47" }),
                  /* @__PURE__ */ jsx("div", { className: "text-xs text-wf-muted-foreground mt-1", children: t.solution.dashboard.active })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex-1 rounded-lg bg-wf-secondary/30 border border-wf-border p-4", children: [
                /* @__PURE__ */ jsx("div", { className: "text-xs text-wf-muted-foreground mb-3", children: t.solution.dashboard.upcomingPayments }),
                /* @__PURE__ */ jsx("div", { className: "space-y-2", children: [
                  { supplier: "TechCorp d.o.o.", amount: "€2,450", date: "15.01.", status: "pending" },
                  { supplier: "Office Supplies", amount: "€890", date: "16.01.", status: "approved" },
                  { supplier: "Logistics Partner", amount: "€5,200", date: "18.01.", status: "pending" }
                ].map((payment, i) => /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between text-xs p-2 rounded bg-wf-background/50", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-wf-foreground", children: payment.supplier }),
                  /* @__PURE__ */ jsx("span", { className: "text-wf-muted-foreground", children: payment.date }),
                  /* @__PURE__ */ jsx("span", { className: "font-medium text-wf-foreground", children: payment.amount }),
                  /* @__PURE__ */ jsx("span", { className: "px-2 py-0.5 rounded text-[10px] ".concat(payment.status === "approved" ? "bg-emerald/20 text-emerald" : "bg-gold/20 text-gold"), children: payment.status === "approved" ? t.solution.dashboard.approved : t.solution.dashboard.pending })
                ] }, i)) })
              ] })
            ] }) }),
            /* @__PURE__ */ jsx("div", { className: "absolute -top-4 -right-4 w-24 h-24 bg-emerald/10 rounded-full blur-xl" }),
            /* @__PURE__ */ jsx("div", { className: "absolute -bottom-4 -left-4 w-32 h-32 bg-primary/10 rounded-full blur-xl" })
          ]
        }
      )
    ] }) })
  ] });
};
const FeaturesSection = () => {
  const t = useWizflussiTranslations();
  const features = [
    { icon: LayoutDashboard, ...t.features.items.dashboard, highlight: true },
    { icon: CreditCard, ...t.features.items.payments, highlight: false },
    { icon: Users, ...t.features.items.suppliers, highlight: false },
    { icon: Building2, ...t.features.items.branches, highlight: false },
    { icon: CalendarClock, ...t.features.items.plans, highlight: true },
    { icon: Globe, ...t.features.items.currency, highlight: false },
    { icon: FileDown, ...t.features.items.reports, highlight: false },
    { icon: ShieldCheck, ...t.features.items.rbac, highlight: true }
  ];
  return /* @__PURE__ */ jsxs("section", { id: "features", className: "py-24 relative bg-wf-background", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-wf-background via-wf-secondary/10 to-wf-background" }),
    /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 relative z-10", children: [
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.5 },
          className: "text-center mb-16",
          children: [
            /* @__PURE__ */ jsx("span", { className: "text-emerald text-sm font-medium uppercase tracking-wider", children: t.features.label }),
            /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold mt-4 mb-6 text-wf-foreground", children: t.features.title }),
            /* @__PURE__ */ jsx("p", { className: "text-wf-muted-foreground max-w-2xl mx-auto", children: t.features.subtitle })
          ]
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto", children: features.map((feature, index) => /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.5, delay: index * 0.05 },
          className: "group p-6 rounded-2xl border transition-all duration-300 ".concat(feature.highlight ? "bg-gradient-dark-card border-emerald/30 hover:border-emerald/50 shadow-emerald-glow" : "bg-wf-card border-wf-border hover:border-wf-muted-foreground/30"),
          children: [
            /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors ".concat(feature.highlight ? "bg-emerald/20 group-hover:bg-emerald/30" : "bg-wf-secondary group-hover:bg-wf-secondary/80"), children: /* @__PURE__ */ jsx(feature.icon, { className: "w-6 h-6 ".concat(feature.highlight ? "text-emerald" : "text-blue-500") }) }),
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold mb-2 text-wf-foreground", children: feature.title }),
            /* @__PURE__ */ jsx("p", { className: "text-wf-muted-foreground text-sm leading-relaxed", children: feature.description })
          ]
        },
        feature.title
      )) })
    ] })
  ] });
};
const SecuritySection = () => {
  const t = useWizflussiTranslations();
  const securityFeatures = [
    { icon: Shield, ...t.security.items.access },
    { icon: FileCheck, ...t.security.items.audit },
    { icon: Lock, ...t.security.items.encryption },
    { icon: UserCheck, ...t.security.items.validation },
    { icon: Eye, ...t.security.items.monitoring },
    { icon: Key, ...t.security.items.session }
  ];
  return /* @__PURE__ */ jsxs("section", { id: "security", className: "py-24 relative overflow-hidden bg-wf-background", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-wf-background to-wf-secondary/20" }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-1/2 right-0 w-[400px] h-[400px] bg-emerald/5 rounded-full blur-[100px] translate-x-1/2" }),
    /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 relative z-10", children: [
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.5 },
          className: "text-center mb-16",
          children: [
            /* @__PURE__ */ jsx("span", { className: "text-emerald text-sm font-medium uppercase tracking-wider", children: t.security.label }),
            /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold mt-4 mb-6 text-wf-foreground", children: t.security.title }),
            /* @__PURE__ */ jsx("p", { className: "text-wf-muted-foreground max-w-2xl mx-auto", children: t.security.subtitle })
          ]
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto", children: securityFeatures.map((feature, index) => /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.5, delay: index * 0.1 },
          className: "p-6 rounded-2xl bg-wf-card border border-wf-border hover:border-emerald/30 transition-all duration-300 group",
          children: [
            /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-xl bg-emerald/10 flex items-center justify-center mb-4 group-hover:bg-emerald/20 transition-colors", children: /* @__PURE__ */ jsx(feature.icon, { className: "w-6 h-6 text-emerald" }) }),
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold mb-2 text-wf-foreground", children: feature.title }),
            /* @__PURE__ */ jsx("p", { className: "text-wf-muted-foreground text-sm leading-relaxed", children: feature.description })
          ]
        },
        feature.title
      )) }),
      /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.5, delay: 0.4 },
          className: "mt-16 p-8 rounded-2xl bg-gradient-dark-card border border-wf-border max-w-4xl mx-auto",
          children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row items-center justify-between gap-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
              /* @__PURE__ */ jsx("div", { className: "w-16 h-16 rounded-full bg-emerald/10 flex items-center justify-center", children: /* @__PURE__ */ jsx(Shield, { className: "w-8 h-8 text-emerald" }) }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h4", { className: "font-semibold text-lg text-wf-foreground", children: t.security.enterprise.title }),
                /* @__PURE__ */ jsx("p", { className: "text-wf-muted-foreground text-sm", children: t.security.enterprise.subtitle })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
              /* @__PURE__ */ jsx("div", { className: "px-4 py-2 rounded-lg bg-wf-secondary/50 border border-wf-border text-sm text-wf-muted-foreground", children: "HTTPS/TLS" }),
              /* @__PURE__ */ jsx("div", { className: "px-4 py-2 rounded-lg bg-wf-secondary/50 border border-wf-border text-sm text-wf-muted-foreground", children: "AES-256" }),
              /* @__PURE__ */ jsx("div", { className: "px-4 py-2 rounded-lg bg-wf-secondary/50 border border-wf-border text-sm text-wf-muted-foreground", children: "GDPR Ready" })
            ] })
          ] })
        }
      )
    ] })
  ] });
};
const AudienceSection = () => {
  const t = useWizflussiTranslations();
  const audiences = [
    { icon: Building2, ...t.audience.items.medium },
    { icon: Factory, ...t.audience.items.large },
    { icon: Calculator, ...t.audience.items.accounting },
    { icon: Truck, ...t.audience.items.logistics }
  ];
  return /* @__PURE__ */ jsxs("section", { id: "audience", className: "py-24 relative bg-wf-background", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-wf-secondary/20 via-wf-background to-wf-background" }),
    /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 relative z-10", children: [
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.5 },
          className: "text-center mb-16",
          children: [
            /* @__PURE__ */ jsx("span", { className: "text-emerald text-sm font-medium uppercase tracking-wider", children: t.audience.label }),
            /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold mt-4 mb-6 text-wf-foreground", children: t.audience.title }),
            /* @__PURE__ */ jsx("p", { className: "text-wf-muted-foreground max-w-2xl mx-auto", children: t.audience.subtitle })
          ]
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 gap-8 max-w-5xl mx-auto", children: audiences.map((audience, index) => /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.5, delay: index * 0.1 },
          className: "p-8 rounded-2xl bg-wf-card border border-wf-border hover:border-blue-500/30 transition-all duration-300 group",
          children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-5", children: [
            /* @__PURE__ */ jsx("div", { className: "w-14 h-14 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0 group-hover:bg-blue-500/20 transition-colors", children: /* @__PURE__ */ jsx(audience.icon, { className: "w-7 h-7 text-blue-500" }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold mb-2 text-wf-foreground", children: audience.title }),
              /* @__PURE__ */ jsx("p", { className: "text-wf-muted-foreground text-sm leading-relaxed mb-4", children: audience.description }),
              /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: audience.features.map((feature) => /* @__PURE__ */ jsx("span", { className: "px-3 py-1 rounded-full bg-wf-secondary text-xs text-wf-muted-foreground", children: feature }, feature)) })
            ] })
          ] })
        },
        audience.title
      )) })
    ] })
  ] });
};
const TechSection = () => {
  const t = useWizflussiTranslations();
  return /* @__PURE__ */ jsxs("section", { className: "py-24 relative bg-wf-background", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-wf-background via-wf-muted/5 to-wf-background" }),
    /* @__PURE__ */ jsx("div", { className: "container mx-auto px-6 relative z-10", children: /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.5 },
        className: "max-w-4xl mx-auto",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "text-center mb-12", children: [
            /* @__PURE__ */ jsx("span", { className: "text-emerald text-sm font-medium uppercase tracking-wider", children: t.tech.label }),
            /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold mt-4 mb-6 text-wf-foreground", children: t.tech.title })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-8 rounded-2xl bg-gradient-dark-card border border-wf-border", children: [
            /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-8", children: [
              /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
                  /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsx(Server, { className: "w-5 h-5 text-blue-500" }) }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("h4", { className: "font-semibold mb-1 text-wf-foreground", children: t.tech.items.laravel.title }),
                    /* @__PURE__ */ jsx("p", { className: "text-wf-muted-foreground text-sm", children: t.tech.items.laravel.description })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
                  /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsx(Database, { className: "w-5 h-5 text-blue-500" }) }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("h4", { className: "font-semibold mb-1 text-wf-foreground", children: t.tech.items.architecture.title }),
                    /* @__PURE__ */ jsx("p", { className: "text-wf-muted-foreground text-sm", children: t.tech.items.architecture.description })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
                  /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsx(Shield, { className: "w-5 h-5 text-blue-500" }) }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("h4", { className: "font-semibold mb-1 text-wf-foreground", children: t.tech.items.security.title }),
                    /* @__PURE__ */ jsx("p", { className: "text-wf-muted-foreground text-sm", children: t.tech.items.security.description })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
                  /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsx(Gauge, { className: "w-5 h-5 text-blue-500" }) }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("h4", { className: "font-semibold mb-1 text-wf-foreground", children: t.tech.items.scalability.title }),
                    /* @__PURE__ */ jsx("p", { className: "text-wf-muted-foreground text-sm", children: t.tech.items.scalability.description })
                  ] })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "mt-8 pt-8 border-t border-wf-border", children: /* @__PURE__ */ jsx("p", { className: "text-center text-wf-muted-foreground text-sm", children: t.tech.note }) })
          ] })
        ]
      }
    ) })
  ] });
};
const CTASection = () => {
  const t = useWizflussiTranslations();
  return /* @__PURE__ */ jsxs("section", { className: "py-24 relative overflow-hidden bg-wf-background", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-wf-background via-emerald/5 to-wf-background" }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-emerald/10 rounded-full blur-[150px]" }),
    /* @__PURE__ */ jsx("div", { className: "container mx-auto px-6 relative z-10", children: /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6 },
        className: "max-w-3xl mx-auto text-center",
        children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-wf-foreground", children: t.cta.title }),
          /* @__PURE__ */ jsx("p", { className: "text-lg text-wf-muted-foreground mb-10 max-w-2xl mx-auto", children: t.cta.subtitle }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row items-center justify-center gap-4 mb-12", children: [
            /* @__PURE__ */ jsx(Button, { variant: "hero", size: "xl", className: "group", asChild: true, children: /* @__PURE__ */ jsxs("a", { href: "https://flusso.wizionar.app/login", target: "_blank", rel: "noopener noreferrer", children: [
              t.cta.testApp,
              /* @__PURE__ */ jsx(ArrowRight, { className: "w-5 h-5 group-hover:translate-x-1 transition-transform" })
            ] }) }),
            /* @__PURE__ */ jsx(Button, { variant: "heroOutline", size: "xl", asChild: true, children: /* @__PURE__ */ jsxs("a", { href: "mailto:info@wizionar.com", children: [
              /* @__PURE__ */ jsx(Mail, { className: "w-5 h-5" }),
              t.cta.contact
            ] }) })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "max-w-md mx-auto", children: /* @__PURE__ */ jsxs("div", { className: "text-center p-8 rounded-2xl bg-wf-card border border-wf-border", children: [
            /* @__PURE__ */ jsx(Tag, { className: "w-6 h-6 text-emerald mx-auto mb-3" }),
            /* @__PURE__ */ jsx("div", { className: "text-3xl font-bold text-emerald mb-3", children: t.cta.pricing.salePrice }),
            /* @__PURE__ */ jsx("div", { className: "text-sm text-wf-muted-foreground", children: t.cta.pricing.customization })
          ] }) })
        ]
      }
    ) })
  ] });
};
const Footer = () => {
  const t = useWizflussiTranslations();
  return /* @__PURE__ */ jsx("footer", { className: "py-12 border-t border-wf-border", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-6", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row items-center justify-between gap-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-lg bg-emerald flex items-center justify-center", children: /* @__PURE__ */ jsx("span", { className: "text-wf-background font-bold text-lg", children: "W" }) }),
      /* @__PURE__ */ jsx("span", { className: "text-xl font-bold text-wf-foreground", children: "WizFlussi" })
    ] }),
    /* @__PURE__ */ jsxs("nav", { className: "flex flex-wrap items-center justify-center gap-6", children: [
      /* @__PURE__ */ jsx("a", { href: "#problem", className: "text-sm text-wf-muted-foreground hover:text-wf-foreground transition-colors", children: t.header.problem }),
      /* @__PURE__ */ jsx("a", { href: "#solution", className: "text-sm text-wf-muted-foreground hover:text-wf-foreground transition-colors", children: t.header.solution }),
      /* @__PURE__ */ jsx("a", { href: "#features", className: "text-sm text-wf-muted-foreground hover:text-wf-foreground transition-colors", children: t.header.features }),
      /* @__PURE__ */ jsx("a", { href: "#security", className: "text-sm text-wf-muted-foreground hover:text-wf-foreground transition-colors", children: t.header.security }),
      /* @__PURE__ */ jsx(LocalizedLink, { to: "/", className: "text-sm text-emerald hover:text-emerald-glow transition-colors", children: t.footer.wizionar })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "text-sm text-wf-muted-foreground", children: "© 2025 WizFlussi by Wizionar" })
  ] }) }) });
};
const WizFlussi = () => {
  const { language } = useLanguage();
  const seo = getPageSeo("wizflussi", language);
  return /* @__PURE__ */ jsxs("div", { className: "wizflussi-theme min-h-screen bg-background text-foreground", children: [
    /* @__PURE__ */ jsx(
      SEOHead,
      {
        title: seo.title,
        description: seo.description,
        schema: [
          createSoftwareApplicationSchema({
            language,
            name: "WizFlussi",
            description: seo.description,
            path: SEO_PATHS.wizflussi,
            category: "BusinessApplication"
          }),
          createWebPageSchema({
            language,
            path: SEO_PATHS.wizflussi,
            title: seo.title,
            description: seo.description
          }),
          createBreadcrumbSchema(language, [
            { name: getSeoLabel(language, "home"), path: SEO_PATHS.home },
            { name: "WizFlussi", path: SEO_PATHS.wizflussi }
          ])
        ]
      }
    ),
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsxs("main", { children: [
      /* @__PURE__ */ jsx(HeroSection, {}),
      /* @__PURE__ */ jsx(ProblemSection, {}),
      /* @__PURE__ */ jsx(SolutionSection, {}),
      /* @__PURE__ */ jsx(FeaturesSection, {}),
      /* @__PURE__ */ jsx(SecuritySection, {}),
      /* @__PURE__ */ jsx(AudienceSection, {}),
      /* @__PURE__ */ jsx(TechSection, {}),
      /* @__PURE__ */ jsx(CTASection, {})
    ] }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
};
const WizFlussi$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: WizFlussi
}, Symbol.toStringTag, { value: "Module" }));
const wizmedikReportsTranslations = {
  sr: {
    header: {
      problem: "Problem",
      solution: "Rješenje",
      features: "Funkcionalnosti",
      security: "Sigurnost",
      audience: "Za koga",
      backToWizionar: "← Wizionar",
      testApp: "Testiraj aplikaciju"
    },
    hero: {
      badge: "Izvještavanje za medicinske ustanove",
      title: "Kompletna kontrola nad",
      titleHighlight: "medicinskim izvještajima",
      subtitle: "Dnevni, sedmični i mjesečni izvještaji. Praćenje zarade, radnih sati i normativa osoblja – sve na jednom mjestu.",
      cta1: "Testiraj aplikaciju",
      cta2: "Saznaj više",
      trust: {
        staff: "Upravljanje osobljem",
        analytics: "Detaljna analitika",
        reports: "Automatski izvještaji"
      }
    },
    problem: {
      label: "Problem",
      title: "Izazovi sa kojima se suočavaju medicinske ustanove",
      subtitle: "Praćenje finansija i učinkovitosti osoblja u zdravstvenim ustanovama zahtijeva preciznost i transparentnost.",
      items: {
        tracking: { title: "Ručno praćenje zarade", description: "Fiskalni i nefiskalni prihodi, kartična i žiralna plaćanja – sve se prati ručno u različitim sistemima i tabelama." },
        staff: { title: "Nepreglednost radnih sati", description: "Bez centralnog sistema teško je pratiti radne sate doktora, sestara i saradnika. Normativ se računa ručno." },
        reports: { title: "Nedostatak izvještaja", description: "Nema automatizovanih dnevnih, sedmičnih i mjesečnih izvještaja. Menadžment donosi odluke bez pouzdanih podataka." },
        fragmented: { title: "Fragmentirani podaci", description: "Podaci o osoblju, zaradama i radnim satima su razbacani. Nema jednog izvora istine." },
        analysis: { title: "Teška analiza trenda", description: "Bez pravilnog sistema nemoguće je analizirati trendove i optimizovati resurse." }
      }
    },
    solution: {
      label: "Rješenje",
      title: "WizMedikReports donosi red u vaše izvještavanje",
      subtitle: "Profesionalna platforma za praćenje financija, osoblja i generisanje izvještaja u medicinskim ustanovama.",
      items: {
        centralized: { title: "Centralizovano praćenje", description: "Sva zarada – fiskalna, nefiskalna, kartična, žiralna – na jednom mjestu." },
        staff: { title: "Upravljanje osobljem", description: "Evidencija doktora, sestara i saradnika sa praćenjem radnih sati i normativa." },
        automated: { title: "Automatski izvještaji", description: "Dnevni, sedmični i mjesečni izvještaji generisani automatski." },
        analytics: { title: "Detaljna analitika", description: "Trend analize, poređenja perioda i projekcije za bolje odluke." }
      },
      dashboard: {
        title: "WizMedikReports Dashboard",
        dailyRevenue: "Dnevna zarada",
        todayShifts: "Današnje smjene",
        staff: "radnika",
        doctors: "Doktori",
        active: "Aktivnih",
        weeklyReport: "Sedmični izvještaj",
        fiscal: "Fiskalno",
        nonFiscal: "Nefiskalno"
      }
    },
    features: {
      label: "Funkcionalnosti",
      title: "Sve što trebate za profesionalno izvještavanje",
      subtitle: "WizMedikReports pokriva kompletan ciklus praćenja zarada, osoblja i generisanja izvještaja.",
      items: {
        revenue: { title: "Praćenje zarade", description: "Unos i praćenje dnevne zarade po tipovima: fiskalna, nefiskalna, kartična i žiralna plaćanja. Automatsko sumiranje." },
        staff: { title: "Evidencija osoblja", description: "Centralni registar doktora, medicinskih sestara i saradnika. Profili, specijalizacije i kontakt podaci." },
        hours: { title: "Radni sati", description: "Praćenje radnih sati po osoblju. Smjene, prekovremeni rad i odsutnosti na jednom mjestu." },
        norms: { title: "Normativi", description: "Definisanje i praćenje normativa za medicinsko osoblje. Upozorenja za prekoračenja ili nedostatke." },
        daily: { title: "Dnevni izvještaji", description: "Automatski generirani dnevni izvještaji sa pregledom zarade, prisutnosti i ključnih metrika." },
        weekly: { title: "Sedmični izvještaji", description: "Sumirani pregled sedmice sa trend analizama i poređenjima sa prethodnim periodima." },
        monthly: { title: "Mjesečni izvještaji", description: "Kompleksni mjesečni izvještaji spremni za menadžment i računovodstvo. Export u Excel i PDF." },
        analytics: { title: "Analitika", description: "Grafički prikazi, trend linije i projekcije. Identifikacija obrazaca i optimizacija resursa." }
      }
    },
    security: {
      label: "Sigurnost",
      title: "Medicinski podaci zahtijevaju maksimalnu zaštitu",
      subtitle: "WizMedikReports je dizajniran sa sigurnošću i privatnošću kao prioritetom.",
      items: {
        access: { title: "Kontrola pristupa", description: "RBAC sistem omogućava precizno definisanje ko može vidjeti koje podatke i izvještaje." },
        audit: { title: "Audit trail", description: "Svaka promjena se bilježi – ko je unio podatke, kada i šta je promijenjeno." },
        encryption: { title: "Enkripcija podataka", description: "Svi podaci su enkriptovani u mirovanju i tokom prijenosa. HIPAA-friendly pristup." },
        validation: { title: "Validacija unosa", description: "Automatska provjera podataka sprječava greške prije nego uđu u sistem." },
        backup: { title: "Backup i oporavak", description: "Redovni backup podataka sa mogućnošću brzog oporavka u slučaju incidenta." },
        compliance: { title: "Usklađenost", description: "Sistem dizajniran prema standardima za zdravstvene podatke i privatnost." }
      },
      enterprise: {
        title: "Sigurnost na nivou zdravstvenih institucija",
        subtitle: "Standardi zaštite prilagođeni medicinskim ustanovama"
      }
    },
    audience: {
      label: "Za koga",
      title: "Dizajnirano za zdravstvene ustanove",
      subtitle: "WizMedikReports je kreiran za medicinske ustanove koje trebaju pouzdano izvještavanje i analitiku.",
      items: {
        clinics: { title: "Privatne klinike", description: "Poliklinike i specijalizirane klinike koje trebaju praćenje zarada i osoblja.", features: ["Brza implementacija", "Jednostavan unos", "Jasni izvještaji"] },
        hospitals: { title: "Bolnice", description: "Veće ustanove sa višestrukim odjeljenjima i kompleksnim potrebama izvještavanja.", features: ["Multi-odjeljenje", "Napredna analitika", "Integracije"] },
        dental: { title: "Stomatološke ordinacije", description: "Dentalne prakse sa potrebom praćenja zarade i normativa osoblja.", features: ["Praćenje po ordinaciji", "Jednostavni izvještaji", "Export"] },
        labs: { title: "Laboratorije", description: "Medicinske laboratorije sa specifičnim potrebama praćenja i izvještavanja.", features: ["Specifične metrike", "Automatizacija", "Dnevni pregledi"] }
      }
    },
    tech: {
      label: "Tehnologija",
      title: "Izgrađeno na modernim temeljima",
      items: {
        laravel: { title: "Laravel Backend", description: "Robustan PHP framework sa dokazanom stabilnošću u zdravstvenim sistemima." },
        architecture: { title: "Sigurna arhitektura", description: "Modularna struktura dizajnirana za zaštitu osjetljivih medicinskih podataka." },
        security: { title: "Zdravstveni standardi", description: "Implementacija prema standardima za zaštitu zdravstvenih informacija." },
        scalability: { title: "Skalabilnost", description: "Arhitektura spremna za rast – od male ordinacije do velike bolnice." }
      },
      note: "Svi tehnički detalji su dostupni na zahtjev. Spremni smo odgovoriti na pitanja vašeg IT tima."
    },
    cta: {
      title: "Spremni za profesionalno izvještavanje?",
      subtitle: "Testirajte aplikaciju ili nas kontaktirajte za više informacija.",
      testApp: "Testiraj aplikaciju",
      contact: "Kontaktiraj",
      pricing: {
        customization: "Prilagođavanje po zahtjevu",
        salePrice: "499 KM",
        regularPrice: "900 KM",
        oneTime: "Jednokratna cijena"
      }
    },
    footer: {
      wizionar: "Wizionar"
    }
  },
  en: {
    header: {
      problem: "Problem",
      solution: "Solution",
      features: "Features",
      security: "Security",
      audience: "For whom",
      backToWizionar: "← Wizionar",
      testApp: "Test application"
    },
    hero: {
      badge: "Reporting for medical facilities",
      title: "Complete control over",
      titleHighlight: "medical reports",
      subtitle: "Daily, weekly and monthly reports. Track revenue, work hours and staff norms – all in one place.",
      cta1: "Test application",
      cta2: "Learn more",
      trust: {
        staff: "Staff management",
        analytics: "Detailed analytics",
        reports: "Automated reports"
      }
    },
    problem: {
      label: "Problem",
      title: "Challenges medical facilities face",
      subtitle: "Tracking finances and staff performance in healthcare requires precision and transparency.",
      items: {
        tracking: { title: "Manual revenue tracking", description: "Fiscal and non-fiscal income, card and bank payments – all tracked manually in different systems and spreadsheets." },
        staff: { title: "Unclear work hours", description: "Without a central system, it's hard to track work hours of doctors, nurses and associates. Norms are calculated manually." },
        reports: { title: "Lack of reports", description: "No automated daily, weekly and monthly reports. Management makes decisions without reliable data." },
        fragmented: { title: "Fragmented data", description: "Data about staff, revenue and work hours is scattered. No single source of truth." },
        analysis: { title: "Difficult trend analysis", description: "Without a proper system, it's impossible to analyze trends and optimize resources." }
      }
    },
    solution: {
      label: "Solution",
      title: "WizMedikReports brings order to your reporting",
      subtitle: "Professional platform for tracking finances, staff and generating reports in medical facilities.",
      items: {
        centralized: { title: "Centralized tracking", description: "All revenue – fiscal, non-fiscal, card, bank – in one place." },
        staff: { title: "Staff management", description: "Registry of doctors, nurses and associates with work hours and norms tracking." },
        automated: { title: "Automated reports", description: "Daily, weekly and monthly reports generated automatically." },
        analytics: { title: "Detailed analytics", description: "Trend analysis, period comparisons and projections for better decisions." }
      },
      dashboard: {
        title: "WizMedikReports Dashboard",
        dailyRevenue: "Daily revenue",
        todayShifts: "Today's shifts",
        staff: "staff",
        doctors: "Doctors",
        active: "Active",
        weeklyReport: "Weekly report",
        fiscal: "Fiscal",
        nonFiscal: "Non-fiscal"
      }
    },
    features: {
      label: "Features",
      title: "Everything you need for professional reporting",
      subtitle: "WizMedikReports covers the complete cycle of revenue tracking, staff management and report generation.",
      items: {
        revenue: { title: "Revenue tracking", description: "Entry and tracking of daily revenue by type: fiscal, non-fiscal, card and bank payments. Automatic summation." },
        staff: { title: "Staff registry", description: "Central registry of doctors, nurses and associates. Profiles, specializations and contact details." },
        hours: { title: "Work hours", description: "Tracking work hours per staff member. Shifts, overtime and absences in one place." },
        norms: { title: "Norms", description: "Defining and tracking norms for medical staff. Alerts for overages or shortages." },
        daily: { title: "Daily reports", description: "Automatically generated daily reports with revenue overview, attendance and key metrics." },
        weekly: { title: "Weekly reports", description: "Summarized weekly view with trend analyses and comparisons with previous periods." },
        monthly: { title: "Monthly reports", description: "Complex monthly reports ready for management and accounting. Export to Excel and PDF." },
        analytics: { title: "Analytics", description: "Graphical displays, trend lines and projections. Pattern identification and resource optimization." }
      }
    },
    security: {
      label: "Security",
      title: "Medical data requires maximum protection",
      subtitle: "WizMedikReports is designed with security and privacy as priority.",
      items: {
        access: { title: "Access control", description: "RBAC system enables precise definition of who can see which data and reports." },
        audit: { title: "Audit trail", description: "Every change is logged – who entered data, when and what was changed." },
        encryption: { title: "Data encryption", description: "All data is encrypted at rest and in transit. HIPAA-friendly approach." },
        validation: { title: "Input validation", description: "Automatic data verification prevents errors before they enter the system." },
        backup: { title: "Backup and recovery", description: "Regular data backup with quick recovery capability in case of incident." },
        compliance: { title: "Compliance", description: "System designed according to standards for healthcare data and privacy." }
      },
      enterprise: {
        title: "Healthcare institution-level security",
        subtitle: "Protection standards adapted for medical facilities"
      }
    },
    audience: {
      label: "For whom",
      title: "Designed for healthcare facilities",
      subtitle: "WizMedikReports is created for medical facilities that need reliable reporting and analytics.",
      items: {
        clinics: { title: "Private clinics", description: "Polyclinics and specialized clinics that need revenue and staff tracking.", features: ["Fast implementation", "Simple entry", "Clear reports"] },
        hospitals: { title: "Hospitals", description: "Larger facilities with multiple departments and complex reporting needs.", features: ["Multi-department", "Advanced analytics", "Integrations"] },
        dental: { title: "Dental offices", description: "Dental practices with need for revenue and staff norm tracking.", features: ["Per-office tracking", "Simple reports", "Export"] },
        labs: { title: "Laboratories", description: "Medical laboratories with specific tracking and reporting needs.", features: ["Specific metrics", "Automation", "Daily reviews"] }
      }
    },
    tech: {
      label: "Technology",
      title: "Built on modern foundations",
      items: {
        laravel: { title: "Laravel Backend", description: "Robust PHP framework with proven stability in healthcare systems." },
        architecture: { title: "Secure architecture", description: "Modular structure designed to protect sensitive medical data." },
        security: { title: "Healthcare standards", description: "Implementation according to standards for health information protection." },
        scalability: { title: "Scalability", description: "Architecture ready for growth – from small practice to large hospital." }
      },
      note: "All technical details available on request. We're ready to answer your IT team's questions."
    },
    cta: {
      title: "Ready for professional reporting?",
      subtitle: "Test the application or contact us for more information.",
      testApp: "Test application",
      contact: "Contact",
      pricing: {
        customization: "Customization available on request",
        salePrice: "499 BAM",
        regularPrice: "900 BAM",
        oneTime: "One-time price"
      }
    },
    footer: {
      wizionar: "Wizionar"
    }
  },
  de: {
    header: {
      problem: "Problem",
      solution: "Lösung",
      features: "Funktionen",
      security: "Sicherheit",
      audience: "Für wen",
      backToWizionar: "← Wizionar",
      testApp: "App testen"
    },
    hero: {
      badge: "Berichterstattung für medizinische Einrichtungen",
      title: "Vollständige Kontrolle über",
      titleHighlight: "medizinische Berichte",
      subtitle: "Tägliche, wöchentliche und monatliche Berichte. Verfolgung von Einnahmen, Arbeitszeiten und Personalnormen – alles an einem Ort.",
      cta1: "App testen",
      cta2: "Mehr erfahren",
      trust: {
        staff: "Personalverwaltung",
        analytics: "Detaillierte Analytik",
        reports: "Automatische Berichte"
      }
    },
    problem: {
      label: "Problem",
      title: "Herausforderungen für medizinische Einrichtungen",
      subtitle: "Die Verfolgung von Finanzen und Personalleistung im Gesundheitswesen erfordert Präzision und Transparenz.",
      items: {
        tracking: { title: "Manuelle Einnahmenverfolgung", description: "Fiskalische und nicht-fiskalische Einnahmen, Karten- und Bankzahlungen – alles manuell in verschiedenen Systemen verfolgt." },
        staff: { title: "Unklare Arbeitszeiten", description: "Ohne zentrales System ist es schwierig, Arbeitszeiten von Ärzten, Krankenschwestern und Mitarbeitern zu verfolgen." },
        reports: { title: "Mangel an Berichten", description: "Keine automatisierten täglichen, wöchentlichen und monatlichen Berichte. Management entscheidet ohne zuverlässige Daten." },
        fragmented: { title: "Fragmentierte Daten", description: "Daten über Personal, Einnahmen und Arbeitszeiten sind verstreut. Keine einzige Wahrheitsquelle." },
        analysis: { title: "Schwierige Trendanalyse", description: "Ohne richtiges System ist es unmöglich, Trends zu analysieren und Ressourcen zu optimieren." }
      }
    },
    solution: {
      label: "Lösung",
      title: "WizMedikReports bringt Ordnung in Ihre Berichterstattung",
      subtitle: "Professionelle Plattform für Finanz-, Personal- und Berichtserstellung in medizinischen Einrichtungen.",
      items: {
        centralized: { title: "Zentralisierte Verfolgung", description: "Alle Einnahmen – fiskalisch, nicht-fiskalisch, Karte, Bank – an einem Ort." },
        staff: { title: "Personalverwaltung", description: "Register von Ärzten, Krankenschwestern und Mitarbeitern mit Arbeitszeiten- und Normenverfolgung." },
        automated: { title: "Automatische Berichte", description: "Tägliche, wöchentliche und monatliche Berichte automatisch generiert." },
        analytics: { title: "Detaillierte Analytik", description: "Trendanalysen, Periodenvergleiche und Projektionen für bessere Entscheidungen." }
      },
      dashboard: {
        title: "WizMedikReports Dashboard",
        dailyRevenue: "Tageseinnahmen",
        todayShifts: "Heutige Schichten",
        staff: "Personal",
        doctors: "Ärzte",
        active: "Aktiv",
        weeklyReport: "Wochenbericht",
        fiscal: "Fiskalisch",
        nonFiscal: "Nicht-fiskalisch"
      }
    },
    features: {
      label: "Funktionen",
      title: "Alles für professionelle Berichterstattung",
      subtitle: "WizMedikReports deckt den kompletten Zyklus der Einnahmenverfolgung und Berichtserstellung ab.",
      items: {
        revenue: { title: "Einnahmenverfolgung", description: "Eingabe und Verfolgung der täglichen Einnahmen nach Typ: fiskalisch, nicht-fiskalisch, Karten- und Bankzahlungen." },
        staff: { title: "Personalregister", description: "Zentrales Register von Ärzten, Krankenschwestern und Mitarbeitern. Profile, Spezialisierungen und Kontaktdaten." },
        hours: { title: "Arbeitszeiten", description: "Verfolgung der Arbeitszeiten pro Mitarbeiter. Schichten, Überstunden und Abwesenheiten." },
        norms: { title: "Normen", description: "Definition und Verfolgung von Normen für medizinisches Personal. Warnungen bei Über- oder Unterschreitungen." },
        daily: { title: "Tägliche Berichte", description: "Automatisch generierte Tagesberichte mit Einnahmenübersicht und Schlüsselmetriken." },
        weekly: { title: "Wöchentliche Berichte", description: "Zusammengefasste Wochenansicht mit Trendanalysen und Vergleichen." },
        monthly: { title: "Monatliche Berichte", description: "Komplexe Monatsberichte für Management und Buchhaltung. Export in Excel und PDF." },
        analytics: { title: "Analytik", description: "Grafische Darstellungen, Trendlinien und Projektionen. Mustererkennung und Ressourcenoptimierung." }
      }
    },
    security: {
      label: "Sicherheit",
      title: "Medizinische Daten erfordern maximalen Schutz",
      subtitle: "WizMedikReports ist mit Sicherheit und Datenschutz als Priorität konzipiert.",
      items: {
        access: { title: "Zugriffskontrolle", description: "RBAC-System ermöglicht präzise Definition, wer welche Daten und Berichte sehen kann." },
        audit: { title: "Audit-Trail", description: "Jede Änderung wird protokolliert – wer Daten eingegeben hat, wann und was geändert wurde." },
        encryption: { title: "Datenverschlüsselung", description: "Alle Daten sind verschlüsselt im Ruhezustand und während der Übertragung." },
        validation: { title: "Eingabevalidierung", description: "Automatische Datenüberprüfung verhindert Fehler vor dem Eintritt in das System." },
        backup: { title: "Backup und Wiederherstellung", description: "Regelmäßige Datensicherung mit schneller Wiederherstellungsmöglichkeit." },
        compliance: { title: "Compliance", description: "System nach Standards für Gesundheitsdaten und Datenschutz konzipiert." }
      },
      enterprise: {
        title: "Sicherheit auf Gesundheitseinrichtungsniveau",
        subtitle: "Schutzstandards für medizinische Einrichtungen angepasst"
      }
    },
    audience: {
      label: "Für wen",
      title: "Für Gesundheitseinrichtungen konzipiert",
      subtitle: "WizMedikReports ist für medizinische Einrichtungen geschaffen, die zuverlässige Berichterstattung benötigen.",
      items: {
        clinics: { title: "Privatkliniken", description: "Polikliniken und spezialisierte Kliniken, die Einnahmen- und Personalverfolgung benötigen.", features: ["Schnelle Implementierung", "Einfache Eingabe", "Klare Berichte"] },
        hospitals: { title: "Krankenhäuser", description: "Größere Einrichtungen mit mehreren Abteilungen und komplexen Berichtsanforderungen.", features: ["Multi-Abteilung", "Erweiterte Analytik", "Integrationen"] },
        dental: { title: "Zahnarztpraxen", description: "Zahnarztpraxen mit Bedarf an Einnahmen- und Normenverfolgung.", features: ["Pro-Praxis-Verfolgung", "Einfache Berichte", "Export"] },
        labs: { title: "Laboratorien", description: "Medizinische Laboratorien mit spezifischen Verfolgungs- und Berichtsanforderungen.", features: ["Spezifische Metriken", "Automatisierung", "Tägliche Übersichten"] }
      }
    },
    tech: {
      label: "Technologie",
      title: "Auf modernen Grundlagen aufgebaut",
      items: {
        laravel: { title: "Laravel Backend", description: "Robustes PHP-Framework mit bewährter Stabilität in Gesundheitssystemen." },
        architecture: { title: "Sichere Architektur", description: "Modulare Struktur zum Schutz sensibler medizinischer Daten." },
        security: { title: "Gesundheitsstandards", description: "Implementierung nach Standards zum Schutz von Gesundheitsinformationen." },
        scalability: { title: "Skalierbarkeit", description: "Architektur bereit für Wachstum – von kleiner Praxis bis großes Krankenhaus." }
      },
      note: "Alle technischen Details auf Anfrage verfügbar. Wir beantworten gerne die Fragen Ihres IT-Teams."
    },
    cta: {
      title: "Bereit für professionelle Berichterstattung?",
      subtitle: "Testen Sie die Anwendung oder kontaktieren Sie uns für weitere Informationen.",
      testApp: "App testen",
      contact: "Kontakt",
      pricing: {
        customization: "Anpassung auf Anfrage",
        salePrice: "499 BAM",
        regularPrice: "900 BAM",
        oneTime: "Einmaliger Preis"
      }
    },
    footer: {
      wizionar: "Wizionar"
    }
  },
  it: {
    header: {
      problem: "Problema",
      solution: "Soluzione",
      features: "Funzionalità",
      security: "Sicurezza",
      audience: "Per chi",
      backToWizionar: "← Wizionar",
      testApp: "Testa l'applicazione"
    },
    hero: {
      badge: "Reportistica per strutture mediche",
      title: "Controllo completo sui",
      titleHighlight: "report medici",
      subtitle: "Report giornalieri, settimanali e mensili. Monitoraggio ricavi, ore di lavoro e norme del personale – tutto in un unico posto.",
      cta1: "Testa l'applicazione",
      cta2: "Scopri di più",
      trust: {
        staff: "Gestione del personale",
        analytics: "Analisi dettagliata",
        reports: "Report automatici"
      }
    },
    problem: {
      label: "Problema",
      title: "Sfide che affrontano le strutture mediche",
      subtitle: "Monitorare finanze e prestazioni del personale in ambito sanitario richiede precisione e trasparenza.",
      items: {
        tracking: { title: "Monitoraggio manuale dei ricavi", description: "Entrate fiscali e non fiscali, pagamenti con carta e bancari – tutto monitorato manualmente in sistemi diversi." },
        staff: { title: "Ore di lavoro poco chiare", description: "Senza un sistema centrale è difficile monitorare le ore di lavoro di medici, infermieri e collaboratori." },
        reports: { title: "Mancanza di report", description: "Nessun report automatico giornaliero, settimanale e mensile. Il management decide senza dati affidabili." },
        fragmented: { title: "Dati frammentati", description: "I dati su personale, ricavi e ore di lavoro sono sparsi. Nessuna fonte unica di verità." },
        analysis: { title: "Analisi dei trend difficile", description: "Senza un sistema adeguato è impossibile analizzare i trend e ottimizzare le risorse." }
      }
    },
    solution: {
      label: "Soluzione",
      title: "WizMedikReports porta ordine nella tua reportistica",
      subtitle: "Piattaforma professionale per monitoraggio finanze, personale e generazione report nelle strutture mediche.",
      items: {
        centralized: { title: "Monitoraggio centralizzato", description: "Tutti i ricavi – fiscali, non fiscali, carta, banca – in un unico posto." },
        staff: { title: "Gestione del personale", description: "Registro di medici, infermieri e collaboratori con monitoraggio ore e norme." },
        automated: { title: "Report automatici", description: "Report giornalieri, settimanali e mensili generati automaticamente." },
        analytics: { title: "Analisi dettagliata", description: "Analisi dei trend, confronti tra periodi e proiezioni per decisioni migliori." }
      },
      dashboard: {
        title: "Dashboard WizMedikReports",
        dailyRevenue: "Ricavi giornalieri",
        todayShifts: "Turni di oggi",
        staff: "personale",
        doctors: "Medici",
        active: "Attivi",
        weeklyReport: "Report settimanale",
        fiscal: "Fiscale",
        nonFiscal: "Non fiscale"
      }
    },
    features: {
      label: "Funzionalità",
      title: "Tutto per la reportistica professionale",
      subtitle: "WizMedikReports copre il ciclo completo di monitoraggio ricavi, personale e generazione report.",
      items: {
        revenue: { title: "Monitoraggio ricavi", description: "Inserimento e monitoraggio dei ricavi giornalieri per tipo: fiscale, non fiscale, carta e banca." },
        staff: { title: "Registro personale", description: "Registro centrale di medici, infermieri e collaboratori. Profili, specializzazioni e contatti." },
        hours: { title: "Ore di lavoro", description: "Monitoraggio ore di lavoro per membro dello staff. Turni, straordinari e assenze." },
        norms: { title: "Norme", description: "Definizione e monitoraggio delle norme per il personale medico. Avvisi per superamenti o carenze." },
        daily: { title: "Report giornalieri", description: "Report giornalieri generati automaticamente con panoramica ricavi e metriche chiave." },
        weekly: { title: "Report settimanali", description: "Visualizzazione settimanale riassuntiva con analisi dei trend e confronti." },
        monthly: { title: "Report mensili", description: "Report mensili complessi per management e contabilità. Export in Excel e PDF." },
        analytics: { title: "Analisi", description: "Visualizzazioni grafiche, linee di trend e proiezioni. Identificazione pattern e ottimizzazione risorse." }
      }
    },
    security: {
      label: "Sicurezza",
      title: "I dati medici richiedono massima protezione",
      subtitle: "WizMedikReports è progettato con sicurezza e privacy come priorità.",
      items: {
        access: { title: "Controllo accessi", description: "Il sistema RBAC permette definizione precisa di chi può vedere quali dati e report." },
        audit: { title: "Audit trail", description: "Ogni modifica viene registrata – chi ha inserito i dati, quando e cosa è stato modificato." },
        encryption: { title: "Crittografia dati", description: "Tutti i dati sono crittografati a riposo e in transito. Approccio HIPAA-friendly." },
        validation: { title: "Validazione input", description: "Verifica automatica dei dati previene errori prima che entrino nel sistema." },
        backup: { title: "Backup e ripristino", description: "Backup regolari dei dati con capacità di ripristino rapido in caso di incidente." },
        compliance: { title: "Compliance", description: "Sistema progettato secondo standard per dati sanitari e privacy." }
      },
      enterprise: {
        title: "Sicurezza a livello di istituzioni sanitarie",
        subtitle: "Standard di protezione adattati alle strutture mediche"
      }
    },
    audience: {
      label: "Per chi",
      title: "Progettato per strutture sanitarie",
      subtitle: "WizMedikReports è creato per strutture mediche che necessitano di reportistica e analisi affidabili.",
      items: {
        clinics: { title: "Cliniche private", description: "Poliambulatori e cliniche specializzate che necessitano di monitoraggio ricavi e personale.", features: ["Implementazione rapida", "Inserimento semplice", "Report chiari"] },
        hospitals: { title: "Ospedali", description: "Strutture più grandi con più reparti e esigenze di reportistica complesse.", features: ["Multi-reparto", "Analisi avanzata", "Integrazioni"] },
        dental: { title: "Studi dentistici", description: "Pratiche dentali con necessità di monitoraggio ricavi e norme del personale.", features: ["Monitoraggio per studio", "Report semplici", "Export"] },
        labs: { title: "Laboratori", description: "Laboratori medici con esigenze specifiche di monitoraggio e reportistica.", features: ["Metriche specifiche", "Automazione", "Revisioni giornaliere"] }
      }
    },
    tech: {
      label: "Tecnologia",
      title: "Costruito su fondamenta moderne",
      items: {
        laravel: { title: "Laravel Backend", description: "Framework PHP robusto con stabilità comprovata nei sistemi sanitari." },
        architecture: { title: "Architettura sicura", description: "Struttura modulare progettata per proteggere i dati medici sensibili." },
        security: { title: "Standard sanitari", description: "Implementazione secondo standard per la protezione delle informazioni sanitarie." },
        scalability: { title: "Scalabilità", description: "Architettura pronta per la crescita – da piccolo studio a grande ospedale." }
      },
      note: "Tutti i dettagli tecnici disponibili su richiesta. Siamo pronti a rispondere alle domande del vostro team IT."
    },
    cta: {
      title: "Pronti per la reportistica professionale?",
      subtitle: "Testa l'applicazione o contattaci per maggiori informazioni.",
      testApp: "Testa l'applicazione",
      contact: "Contatto",
      pricing: {
        customization: "Personalizzazione su richiesta",
        salePrice: "499 BAM",
        regularPrice: "900 BAM",
        oneTime: "Prezzo una tantum"
      }
    },
    footer: {
      wizionar: "Wizionar"
    }
  }
};
const useWizmedikReportsTranslations = () => {
  const { language } = useLanguage();
  return wizmedikReportsTranslations[language];
};
const WizMedikReports = () => {
  const t = useWizmedikReportsTranslations();
  const { language } = useLanguage();
  const seo = getPageSeo("wizmedikReports", language);
  return /* @__PURE__ */ jsxs("div", { className: "wizmedik-reports-theme min-h-screen bg-background text-foreground", children: [
    /* @__PURE__ */ jsx(
      SEOHead,
      {
        title: seo.title,
        description: seo.description,
        schema: [
          createSoftwareApplicationSchema({
            language,
            name: "WizMedikReports",
            description: seo.description,
            path: SEO_PATHS.wizmedikReports,
            category: "BusinessApplication"
          }),
          createWebPageSchema({
            language,
            path: SEO_PATHS.wizmedikReports,
            title: seo.title,
            description: seo.description
          }),
          createBreadcrumbSchema(language, [
            { name: getSeoLabel(language, "home"), path: SEO_PATHS.home },
            { name: "WizMedikReports", path: SEO_PATHS.wizmedikReports }
          ])
        ]
      }
    ),
    /* @__PURE__ */ jsx(
      motion.header,
      {
        initial: { opacity: 0, y: -20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 },
        className: "fixed top-0 left-0 right-0 z-50 border-b border-wmr-border bg-wmr-background/80 backdrop-blur-xl",
        children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 py-4 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs(LocalizedLink, { to: "/wizmedik-reports", className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-lg bg-cyan flex items-center justify-center", children: /* @__PURE__ */ jsx("span", { className: "text-wmr-background font-bold text-lg", children: "W" }) }),
            /* @__PURE__ */ jsx("span", { className: "text-xl font-bold text-wmr-foreground", children: "WizMedikReports" })
          ] }),
          /* @__PURE__ */ jsxs("nav", { className: "hidden md:flex items-center gap-8", children: [
            /* @__PURE__ */ jsx("a", { href: "#problem", className: "text-sm text-wmr-muted-foreground hover:text-wmr-foreground transition-colors", children: t.header.problem }),
            /* @__PURE__ */ jsx("a", { href: "#solution", className: "text-sm text-wmr-muted-foreground hover:text-wmr-foreground transition-colors", children: t.header.solution }),
            /* @__PURE__ */ jsx("a", { href: "#features", className: "text-sm text-wmr-muted-foreground hover:text-wmr-foreground transition-colors", children: t.header.features }),
            /* @__PURE__ */ jsx(LocalizedLink, { to: "/", className: "text-sm text-cyan hover:text-cyan-glow transition-colors", children: t.header.backToWizionar })
          ] }),
          /* @__PURE__ */ jsx(LanguageSwitcher, {})
        ] })
      }
    ),
    /* @__PURE__ */ jsxs("main", { children: [
      /* @__PURE__ */ jsxs("section", { className: "relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-wmr-background", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-cyan-hero" }),
        /* @__PURE__ */ jsx("div", { className: "absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-cyan/10 rounded-full blur-[120px] animate-pulse" }),
        /* @__PURE__ */ jsx("div", { className: "container mx-auto px-6 relative z-10", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto text-center", children: [
          /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.5, delay: 0.1 },
              className: "inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wmr-border bg-wmr-secondary/50 mb-8",
              children: [
                /* @__PURE__ */ jsx("span", { className: "w-2 h-2 rounded-full bg-cyan animate-pulse" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm text-wmr-muted-foreground", children: t.hero.badge })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            motion.h1,
            {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.6, delay: 0.2 },
              className: "text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-wmr-foreground",
              children: [
                t.hero.title,
                " ",
                /* @__PURE__ */ jsx("span", { className: "text-gradient-cyan", children: t.hero.titleHighlight })
              ]
            }
          ),
          /* @__PURE__ */ jsx(
            motion.p,
            {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.6, delay: 0.3 },
              className: "text-lg md:text-xl text-wmr-muted-foreground max-w-2xl mx-auto mb-10",
              children: t.hero.subtitle
            }
          ),
          /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.6, delay: 0.4 },
              className: "flex flex-col sm:flex-row items-center justify-center gap-4 mb-16",
              children: [
                /* @__PURE__ */ jsx(Button, { size: "xl", className: "group bg-cyan hover:bg-cyan-glow text-wmr-background", asChild: true, children: /* @__PURE__ */ jsxs("a", { href: "#contact", children: [
                  t.hero.cta1,
                  /* @__PURE__ */ jsx(ArrowRight, { className: "w-5 h-5 group-hover:translate-x-1 transition-transform" })
                ] }) }),
                /* @__PURE__ */ jsx(Button, { variant: "outline", size: "xl", className: "border-wmr-border text-wmr-foreground hover:bg-wmr-secondary", asChild: true, children: /* @__PURE__ */ jsx("a", { href: "#solution", children: t.hero.cta2 }) })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              transition: { duration: 0.8, delay: 0.6 },
              className: "grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto",
              children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-3 p-4 rounded-xl bg-wmr-secondary/30 border border-wmr-border/50", children: [
                  /* @__PURE__ */ jsx(Users, { className: "w-5 h-5 text-cyan" }),
                  /* @__PURE__ */ jsx("span", { className: "text-sm text-wmr-muted-foreground", children: t.hero.trust.staff })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-3 p-4 rounded-xl bg-wmr-secondary/30 border border-wmr-border/50", children: [
                  /* @__PURE__ */ jsx(BarChart3, { className: "w-5 h-5 text-cyan" }),
                  /* @__PURE__ */ jsx("span", { className: "text-sm text-wmr-muted-foreground", children: t.hero.trust.analytics })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-3 p-4 rounded-xl bg-wmr-secondary/30 border border-wmr-border/50", children: [
                  /* @__PURE__ */ jsx(FileText, { className: "w-5 h-5 text-cyan" }),
                  /* @__PURE__ */ jsx("span", { className: "text-sm text-wmr-muted-foreground", children: t.hero.trust.reports })
                ] })
              ]
            }
          )
        ] }) })
      ] }),
      /* @__PURE__ */ jsx("section", { id: "problem", className: "py-24 bg-wmr-card", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6", children: [
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            className: "text-center mb-16",
            children: [
              /* @__PURE__ */ jsx("span", { className: "inline-block text-cyan text-sm font-semibold uppercase tracking-wider mb-4", children: t.problem.label }),
              /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold mb-4 text-wmr-foreground", children: t.problem.title }),
              /* @__PURE__ */ jsx("p", { className: "text-wmr-muted-foreground max-w-2xl mx-auto", children: t.problem.subtitle })
            ]
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto", children: [
          { icon: DollarSign, ...t.problem.items.tracking },
          { icon: Clock, ...t.problem.items.staff },
          { icon: FileText, ...t.problem.items.reports },
          { icon: AlertTriangle, ...t.problem.items.fragmented },
          { icon: TrendingUp, ...t.problem.items.analysis }
        ].map((item, index) => /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { delay: index * 0.1 },
            className: "p-6 rounded-xl bg-wmr-secondary/50 border border-wmr-border",
            children: [
              /* @__PURE__ */ jsx(item.icon, { className: "w-8 h-8 text-cyan mb-4" }),
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold mb-2 text-wmr-foreground", children: item.title }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-wmr-muted-foreground", children: item.description })
            ]
          },
          index
        )) })
      ] }) }),
      /* @__PURE__ */ jsx("section", { id: "solution", className: "py-24 bg-wmr-background", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6", children: [
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            className: "text-center mb-16",
            children: [
              /* @__PURE__ */ jsx("span", { className: "inline-block text-cyan text-sm font-semibold uppercase tracking-wider mb-4", children: t.solution.label }),
              /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold mb-4 text-wmr-foreground", children: t.solution.title }),
              /* @__PURE__ */ jsx("p", { className: "text-wmr-muted-foreground max-w-2xl mx-auto", children: t.solution.subtitle })
            ]
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 gap-6 max-w-4xl mx-auto", children: [
          { icon: BarChart3, ...t.solution.items.centralized },
          { icon: Users, ...t.solution.items.staff },
          { icon: FileText, ...t.solution.items.automated },
          { icon: TrendingUp, ...t.solution.items.analytics }
        ].map((item, index) => /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { delay: index * 0.1 },
            className: "p-6 rounded-xl bg-wmr-card border border-wmr-border hover:border-cyan/50 transition-colors",
            children: [
              /* @__PURE__ */ jsx(item.icon, { className: "w-8 h-8 text-cyan mb-4" }),
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold mb-2 text-wmr-foreground", children: item.title }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-wmr-muted-foreground", children: item.description })
            ]
          },
          index
        )) })
      ] }) }),
      /* @__PURE__ */ jsx("section", { id: "features", className: "py-24 bg-wmr-card", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6", children: [
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            className: "text-center mb-16",
            children: [
              /* @__PURE__ */ jsx("span", { className: "inline-block text-cyan text-sm font-semibold uppercase tracking-wider mb-4", children: t.features.label }),
              /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold mb-4 text-wmr-foreground", children: t.features.title }),
              /* @__PURE__ */ jsx("p", { className: "text-wmr-muted-foreground max-w-2xl mx-auto", children: t.features.subtitle })
            ]
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto", children: [
          { icon: DollarSign, ...t.features.items.revenue },
          { icon: Users, ...t.features.items.staff },
          { icon: Clock, ...t.features.items.hours },
          { icon: Activity, ...t.features.items.norms },
          { icon: Calendar, ...t.features.items.daily },
          { icon: FileText, ...t.features.items.weekly },
          { icon: FileCheck, ...t.features.items.monthly },
          { icon: TrendingUp, ...t.features.items.analytics }
        ].map((item, index) => /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { delay: index * 0.05 },
            className: "p-5 rounded-xl bg-wmr-background border border-wmr-border",
            children: [
              /* @__PURE__ */ jsx(item.icon, { className: "w-6 h-6 text-cyan mb-3" }),
              /* @__PURE__ */ jsx("h3", { className: "text-base font-semibold mb-2 text-wmr-foreground", children: item.title }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-wmr-muted-foreground", children: item.description })
            ]
          },
          index
        )) })
      ] }) }),
      /* @__PURE__ */ jsx("section", { id: "contact", className: "py-24 bg-wmr-background", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-6", children: /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          className: "max-w-2xl mx-auto text-center",
          children: [
            /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold mb-4 text-wmr-foreground", children: t.cta.title }),
            /* @__PURE__ */ jsx("p", { className: "text-wmr-muted-foreground mb-8", children: t.cta.subtitle }),
            /* @__PURE__ */ jsx("div", { className: "flex flex-col sm:flex-row items-center justify-center gap-4", children: /* @__PURE__ */ jsx(Button, { size: "lg", className: "bg-cyan hover:bg-cyan-glow text-wmr-background", asChild: true, children: /* @__PURE__ */ jsx("a", { href: "mailto:info@wizionar.com", children: t.cta.contact }) }) }),
            /* @__PURE__ */ jsxs("div", { className: "mt-8 p-6 rounded-xl bg-wmr-card border border-wmr-border inline-block", children: [
              /* @__PURE__ */ jsx("p", { className: "text-sm text-wmr-muted-foreground mb-2", children: t.cta.pricing.customization }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsx("span", { className: "text-3xl font-bold text-cyan", children: t.cta.pricing.salePrice }),
                /* @__PURE__ */ jsx("span", { className: "text-lg text-wmr-muted-foreground line-through", children: t.cta.pricing.regularPrice })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-wmr-muted-foreground mt-1", children: t.cta.pricing.oneTime })
            ] })
          ]
        }
      ) }) })
    ] }),
    /* @__PURE__ */ jsx("footer", { className: "py-8 border-t border-wmr-border bg-wmr-background", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-6 text-center", children: /* @__PURE__ */ jsxs(LocalizedLink, { to: "/", className: "text-cyan hover:text-cyan-glow transition-colors", children: [
      "← ",
      t.footer.wizionar
    ] }) }) })
  ] });
};
const WizMedikReports$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: WizMedikReports
}, Symbol.toStringTag, { value: "Module" }));
const wizmedikTranslations = {
  sr: {
    header: {
      search: "Pretraga",
      blog: "Blog",
      qa: "Pitanja",
      about: "O nama",
      backToWizionar: "← Wizionar",
      findDoctor: "Pronađi doktora"
    },
    hero: {
      badge: "Zdravstvena platforma za BiH",
      title: "Zdravstvo na",
      titleHighlight: "jednom mjestu",
      subtitle: "Pronađite doktore, klinike, laboratorije, banje i domove za njegu širom Bosne i Hercegovine. Brza pretraga, online zakazivanje i pouzdane informacije.",
      cta1: "Pronađi doktora",
      cta2: "Saznaj više",
      trust: {
        doctors: "Verifikovani doktori",
        booking: "Online zakazivanje",
        content: "Stručni sadržaj"
      }
    },
    search: {
      label: "Pretraga",
      title: "Pronađite pravu uslugu za nekoliko klikova",
      subtitle: "Pretražujte po specijalnostima, lokaciji, tipu ustanove i dostupnosti termina.",
      items: {
        specialty: { title: "Po specijalnostima", description: "Kardiologija, dermatologija, ginekologija, pedijatrija i mnoge druge specijalnosti na jednom mjestu." },
        location: { title: "Po lokaciji", description: "Pretražujte po gradu, opštini ili regiji. Pronađite najbližu ustanovu." },
        type: { title: "Po tipu ustanove", description: "Klinike, laboratorije, banje, domovi za njegu – sve kategorije zdravstvenih ustanova." },
        availability: { title: "Po dostupnosti", description: "Filtrirajte po dostupnim terminima za online zakazivanje. Bez čekanja i pozivanja." }
      }
    },
    services: {
      label: "Usluge",
      title: "Sve zdravstvene usluge na jednom mjestu",
      subtitle: "wizMedik povezuje pacijente sa širokim spektrom zdravstvenih ustanova i usluga.",
      items: {
        doctors: { title: "Doktori", description: "Pronađite specijaliste po oblasti, pregledajte profile, usluge i zakažite termin online." },
        clinics: { title: "Klinike", description: "Privatne i državne klinike sa svim informacijama o uslugama, lokaciji i radnom vremenu." },
        labs: { title: "Laboratorije", description: "Medicinske laboratorije za analize krvi, urina i druge dijagnostičke pretrage." },
        spas: { title: "Banje", description: "Rehabilitacioni centri i banje za oporavak, fizikalnu terapiju i wellness." },
        nursing: { title: "Domovi za njegu", description: "Ustanove za dugotrajnu njegu starijih i bolesnih lica sa profesionalnim osobljem." },
        booking: { title: "Online zakazivanje", description: "Zakažite termin bez pozivanja – odaberite specijalnost, lokaciju i vrijeme." }
      }
    },
    blog: {
      label: "Blog",
      title: "Stručni sadržaj koji pišu doktori",
      subtitle: "Pouzdane medicinske informacije, savjeti za prevenciju, objašnjenja simptoma i terapija – sve iz prve ruke.",
      features: [
        "Tekstove pišu isključivo doktori",
        "Praktični savjeti za zdraviji život",
        "Objašnjenja simptoma i terapija",
        "Manje neproverenih informacija"
      ]
    },
    qa: {
      label: "Pitanja i odgovori",
      title: "Anonimna pitanja, stručni odgovori",
      subtitle: "Postavite pitanje anonimno, bez nelagodnosti. Doktori odgovaraju stručno i odgovorno.",
      features: [
        "Potpuna anonimnost",
        "Odgovori od pravih doktora",
        "Bolje razumijevanje simptoma",
        "Smjernice kada posjetiti ljekara"
      ]
    },
    why: {
      label: "Zašto wizMedik",
      title: "Vaš prvi korak ka pravom zdravstvenom rješenju",
      items: {
        platform: { title: "Jedna platforma", description: "Doktori, klinike, laboratorije, banje i domovi za njegu – sve na jednom mjestu." },
        booking: { title: "Online zakazivanje", description: "Brza pretraga po specijalnostima i zakazivanje bez čekanja i pozivanja." },
        content: { title: "Stručni sadržaj", description: "Blog i Q&A sekcija koju vode pravi doktori sa pouzdanim informacijama." },
        trust: { title: "Povjerenje i jasnoća", description: "Fokus na proverene informacije, jednostavnost i lakoću korištenja." }
      }
    },
    cta: {
      title: "Pronađite doktora ili uslugu koja vam je potrebna",
      subtitle: "Brzo, sigurno i jednostavno. wizMedik — vaš prvi korak ka pravom zdravstvenom rješenju.",
      findDoctor: "Pronađi doktora",
      contact: "Kontaktiraj nas"
    },
    footer: {
      wizionar: "Wizionar"
    }
  },
  en: {
    header: {
      search: "Search",
      blog: "Blog",
      qa: "Q&A",
      about: "About",
      backToWizionar: "← Wizionar",
      findDoctor: "Find a doctor"
    },
    hero: {
      badge: "Healthcare platform for BiH",
      title: "Healthcare in",
      titleHighlight: "one place",
      subtitle: "Find doctors, clinics, laboratories, spas and nursing homes across Bosnia and Herzegovina. Fast search, online booking and reliable information.",
      cta1: "Find a doctor",
      cta2: "Learn more",
      trust: {
        doctors: "Verified doctors",
        booking: "Online booking",
        content: "Expert content"
      }
    },
    search: {
      label: "Search",
      title: "Find the right service in a few clicks",
      subtitle: "Search by specialty, location, facility type and availability.",
      items: {
        specialty: { title: "By specialty", description: "Cardiology, dermatology, gynecology, pediatrics and many other specialties in one place." },
        location: { title: "By location", description: "Search by city, municipality or region. Find the nearest facility." },
        type: { title: "By facility type", description: "Clinics, laboratories, spas, nursing homes – all healthcare facility categories." },
        availability: { title: "By availability", description: "Filter by available slots for online booking. No waiting or calling." }
      }
    },
    services: {
      label: "Services",
      title: "All healthcare services in one place",
      subtitle: "wizMedik connects patients with a wide range of healthcare facilities and services.",
      items: {
        doctors: { title: "Doctors", description: "Find specialists by field, view profiles, services and book appointments online." },
        clinics: { title: "Clinics", description: "Private and public clinics with all information about services, location and hours." },
        labs: { title: "Laboratories", description: "Medical laboratories for blood, urine and other diagnostic tests." },
        spas: { title: "Spas", description: "Rehabilitation centers and spas for recovery, physical therapy and wellness." },
        nursing: { title: "Nursing homes", description: "Long-term care facilities for elderly and ill with professional staff." },
        booking: { title: "Online booking", description: "Book appointments without calling – choose specialty, location and time." }
      }
    },
    blog: {
      label: "Blog",
      title: "Expert content written by doctors",
      subtitle: "Reliable medical information, prevention tips, symptom explanations and therapies – all firsthand.",
      features: [
        "Articles written exclusively by doctors",
        "Practical tips for a healthier life",
        "Symptom and therapy explanations",
        "Less unverified information"
      ]
    },
    qa: {
      label: "Q&A",
      title: "Anonymous questions, expert answers",
      subtitle: "Ask questions anonymously, without discomfort. Doctors respond professionally and responsibly.",
      features: [
        "Complete anonymity",
        "Answers from real doctors",
        "Better understanding of symptoms",
        "Guidelines when to visit a doctor"
      ]
    },
    why: {
      label: "Why wizMedik",
      title: "Your first step to the right healthcare solution",
      items: {
        platform: { title: "One platform", description: "Doctors, clinics, laboratories, spas and nursing homes – all in one place." },
        booking: { title: "Online booking", description: "Fast search by specialty and booking without waiting or calling." },
        content: { title: "Expert content", description: "Blog and Q&A section led by real doctors with reliable information." },
        trust: { title: "Trust and clarity", description: "Focus on verified information, simplicity and ease of use." }
      }
    },
    cta: {
      title: "Find the doctor or service you need",
      subtitle: "Fast, safe and simple. wizMedik — your first step to the right healthcare solution.",
      findDoctor: "Find a doctor",
      contact: "Contact us"
    },
    footer: {
      wizionar: "Wizionar"
    }
  },
  de: {
    header: {
      search: "Suche",
      blog: "Blog",
      qa: "Fragen",
      about: "Über uns",
      backToWizionar: "← Wizionar",
      findDoctor: "Arzt finden"
    },
    hero: {
      badge: "Gesundheitsplattform für BiH",
      title: "Gesundheit an",
      titleHighlight: "einem Ort",
      subtitle: "Finden Sie Ärzte, Kliniken, Labore, Kurorte und Pflegeheime in ganz Bosnien und Herzegowina. Schnelle Suche, Online-Buchung und zuverlässige Informationen.",
      cta1: "Arzt finden",
      cta2: "Mehr erfahren",
      trust: {
        doctors: "Verifizierte Ärzte",
        booking: "Online-Buchung",
        content: "Fachlicher Inhalt"
      }
    },
    search: {
      label: "Suche",
      title: "Finden Sie den richtigen Service in wenigen Klicks",
      subtitle: "Suchen Sie nach Fachgebiet, Standort, Einrichtungstyp und Verfügbarkeit.",
      items: {
        specialty: { title: "Nach Fachgebiet", description: "Kardiologie, Dermatologie, Gynäkologie, Pädiatrie und viele andere Fachgebiete an einem Ort." },
        location: { title: "Nach Standort", description: "Suchen Sie nach Stadt, Gemeinde oder Region. Finden Sie die nächste Einrichtung." },
        type: { title: "Nach Einrichtungstyp", description: "Kliniken, Labore, Kurorte, Pflegeheime – alle Kategorien von Gesundheitseinrichtungen." },
        availability: { title: "Nach Verfügbarkeit", description: "Filtern Sie nach verfügbaren Terminen für Online-Buchung. Kein Warten oder Anrufen." }
      }
    },
    services: {
      label: "Dienste",
      title: "Alle Gesundheitsdienste an einem Ort",
      subtitle: "wizMedik verbindet Patienten mit einer breiten Palette von Gesundheitseinrichtungen und Dienstleistungen.",
      items: {
        doctors: { title: "Ärzte", description: "Finden Sie Spezialisten nach Fachgebiet, sehen Sie Profile, Leistungen und buchen Sie Termine online." },
        clinics: { title: "Kliniken", description: "Private und öffentliche Kliniken mit allen Informationen über Leistungen, Standort und Öffnungszeiten." },
        labs: { title: "Labore", description: "Medizinische Labore für Blut-, Urin- und andere diagnostische Tests." },
        spas: { title: "Kurorte", description: "Rehabilitationszentren und Kurorte für Erholung, Physiotherapie und Wellness." },
        nursing: { title: "Pflegeheime", description: "Langzeitpflegeeinrichtungen für ältere und kranke Menschen mit professionellem Personal." },
        booking: { title: "Online-Buchung", description: "Termine buchen ohne Anrufen – Fachgebiet, Standort und Zeit wählen." }
      }
    },
    blog: {
      label: "Blog",
      title: "Fachliche Inhalte von Ärzten geschrieben",
      subtitle: "Zuverlässige medizinische Informationen, Präventionstipps, Symptomerklärungen und Therapien – alles aus erster Hand.",
      features: [
        "Artikel ausschließlich von Ärzten geschrieben",
        "Praktische Tipps für ein gesünderes Leben",
        "Symptom- und Therapieerklärungen",
        "Weniger ungeprüfte Informationen"
      ]
    },
    qa: {
      label: "Fragen & Antworten",
      title: "Anonyme Fragen, fachkundige Antworten",
      subtitle: "Stellen Sie Fragen anonym, ohne Unbehagen. Ärzte antworten professionell und verantwortungsvoll.",
      features: [
        "Vollständige Anonymität",
        "Antworten von echten Ärzten",
        "Besseres Verständnis von Symptomen",
        "Richtlinien, wann ein Arzt aufzusuchen ist"
      ]
    },
    why: {
      label: "Warum wizMedik",
      title: "Ihr erster Schritt zur richtigen Gesundheitslösung",
      items: {
        platform: { title: "Eine Plattform", description: "Ärzte, Kliniken, Labore, Kurorte und Pflegeheime – alles an einem Ort." },
        booking: { title: "Online-Buchung", description: "Schnelle Suche nach Fachgebiet und Buchung ohne Warten oder Anrufen." },
        content: { title: "Fachlicher Inhalt", description: "Blog und Q&A-Bereich von echten Ärzten mit zuverlässigen Informationen." },
        trust: { title: "Vertrauen und Klarheit", description: "Fokus auf verifizierte Informationen, Einfachheit und Benutzerfreundlichkeit." }
      }
    },
    cta: {
      title: "Finden Sie den Arzt oder Service, den Sie brauchen",
      subtitle: "Schnell, sicher und einfach. wizMedik — Ihr erster Schritt zur richtigen Gesundheitslösung.",
      findDoctor: "Arzt finden",
      contact: "Kontaktieren Sie uns"
    },
    footer: {
      wizionar: "Wizionar"
    }
  },
  it: {
    header: {
      search: "Ricerca",
      blog: "Blog",
      qa: "Domande",
      about: "Chi siamo",
      backToWizionar: "← Wizionar",
      findDoctor: "Trova un medico"
    },
    hero: {
      badge: "Piattaforma sanitaria per la BiH",
      title: "Sanità in",
      titleHighlight: "un unico posto",
      subtitle: "Trova medici, cliniche, laboratori, terme e case di cura in tutta la Bosnia ed Erzegovina. Ricerca rapida, prenotazione online e informazioni affidabili.",
      cta1: "Trova un medico",
      cta2: "Scopri di più",
      trust: {
        doctors: "Medici verificati",
        booking: "Prenotazione online",
        content: "Contenuti specialistici"
      }
    },
    search: {
      label: "Ricerca",
      title: "Trova il servizio giusto in pochi clic",
      subtitle: "Cerca per specialità, posizione, tipo di struttura e disponibilità.",
      items: {
        specialty: { title: "Per specialità", description: "Cardiologia, dermatologia, ginecologia, pediatria e molte altre specialità in un unico posto." },
        location: { title: "Per posizione", description: "Cerca per città, comune o regione. Trova la struttura più vicina." },
        type: { title: "Per tipo di struttura", description: "Cliniche, laboratori, terme, case di cura – tutte le categorie di strutture sanitarie." },
        availability: { title: "Per disponibilità", description: "Filtra per slot disponibili per la prenotazione online. Senza attese o chiamate." }
      }
    },
    services: {
      label: "Servizi",
      title: "Tutti i servizi sanitari in un unico posto",
      subtitle: "wizMedik collega i pazienti con una vasta gamma di strutture e servizi sanitari.",
      items: {
        doctors: { title: "Medici", description: "Trova specialisti per campo, visualizza profili, servizi e prenota appuntamenti online." },
        clinics: { title: "Cliniche", description: "Cliniche private e pubbliche con tutte le informazioni su servizi, posizione e orari." },
        labs: { title: "Laboratori", description: "Laboratori medici per analisi del sangue, urine e altri test diagnostici." },
        spas: { title: "Terme", description: "Centri di riabilitazione e terme per recupero, fisioterapia e benessere." },
        nursing: { title: "Case di cura", description: "Strutture per cure a lungo termine per anziani e malati con personale professionale." },
        booking: { title: "Prenotazione online", description: "Prenota appuntamenti senza chiamare – scegli specialità, posizione e orario." }
      }
    },
    blog: {
      label: "Blog",
      title: "Contenuti specialistici scritti da medici",
      subtitle: "Informazioni mediche affidabili, consigli di prevenzione, spiegazioni di sintomi e terapie – tutto in prima persona.",
      features: [
        "Articoli scritti esclusivamente da medici",
        "Consigli pratici per una vita più sana",
        "Spiegazioni di sintomi e terapie",
        "Meno informazioni non verificate"
      ]
    },
    qa: {
      label: "Domande e risposte",
      title: "Domande anonime, risposte esperte",
      subtitle: "Fai domande in modo anonimo, senza disagio. I medici rispondono in modo professionale e responsabile.",
      features: [
        "Anonimato completo",
        "Risposte da veri medici",
        "Migliore comprensione dei sintomi",
        "Indicazioni su quando visitare un medico"
      ]
    },
    why: {
      label: "Perché wizMedik",
      title: "Il tuo primo passo verso la giusta soluzione sanitaria",
      items: {
        platform: { title: "Una piattaforma", description: "Medici, cliniche, laboratori, terme e case di cura – tutto in un unico posto." },
        booking: { title: "Prenotazione online", description: "Ricerca rapida per specialità e prenotazione senza attese o chiamate." },
        content: { title: "Contenuti specialistici", description: "Blog e sezione Q&A guidata da veri medici con informazioni affidabili." },
        trust: { title: "Fiducia e chiarezza", description: "Focus su informazioni verificate, semplicità e facilità d'uso." }
      }
    },
    cta: {
      title: "Trova il medico o il servizio di cui hai bisogno",
      subtitle: "Veloce, sicuro e semplice. wizMedik — il tuo primo passo verso la giusta soluzione sanitaria.",
      findDoctor: "Trova un medico",
      contact: "Contattaci"
    },
    footer: {
      wizionar: "Wizionar"
    }
  }
};
const useWizmedikTranslations = () => {
  const { language } = useLanguage();
  return wizmedikTranslations[language];
};
const WizMedik = () => {
  const t = useWizmedikTranslations();
  const { language } = useLanguage();
  const seo = getPageSeo("wizmedik", language);
  return /* @__PURE__ */ jsxs("div", { className: "wizmedik-theme min-h-screen bg-background text-foreground", children: [
    /* @__PURE__ */ jsx(
      SEOHead,
      {
        title: seo.title,
        description: seo.description,
        schema: [
          createSoftwareApplicationSchema({
            language,
            name: "WizMedik",
            description: seo.description,
            path: SEO_PATHS.wizmedik,
            category: "HealthApplication"
          }),
          createWebPageSchema({
            language,
            path: SEO_PATHS.wizmedik,
            title: seo.title,
            description: seo.description
          }),
          createBreadcrumbSchema(language, [
            { name: getSeoLabel(language, "home"), path: SEO_PATHS.home },
            { name: "WizMedik", path: SEO_PATHS.wizmedik }
          ])
        ]
      }
    ),
    /* @__PURE__ */ jsx(
      motion.header,
      {
        initial: { opacity: 0, y: -20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 },
        className: "fixed top-0 left-0 right-0 z-50 border-b border-wm-border bg-wm-background/80 backdrop-blur-xl",
        children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 py-4 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs(LocalizedLink, { to: "/wizmedik", className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-lg bg-teal flex items-center justify-center", children: /* @__PURE__ */ jsx(Stethoscope, { className: "w-5 h-5 text-white" }) }),
            /* @__PURE__ */ jsx("span", { className: "text-xl font-bold text-wm-foreground", children: "wizMedik" })
          ] }),
          /* @__PURE__ */ jsxs("nav", { className: "hidden md:flex items-center gap-8", children: [
            /* @__PURE__ */ jsx("a", { href: "#search", className: "text-sm text-wm-muted-foreground hover:text-wm-foreground transition-colors", children: t.header.search }),
            /* @__PURE__ */ jsx("a", { href: "#services", className: "text-sm text-wm-muted-foreground hover:text-wm-foreground transition-colors", children: t.header.about }),
            /* @__PURE__ */ jsx("a", { href: "#blog", className: "text-sm text-wm-muted-foreground hover:text-wm-foreground transition-colors", children: t.header.blog }),
            /* @__PURE__ */ jsx(LocalizedLink, { to: "/", className: "text-sm text-teal hover:text-teal-glow transition-colors", children: t.header.backToWizionar })
          ] }),
          /* @__PURE__ */ jsx(LanguageSwitcher, {})
        ] })
      }
    ),
    /* @__PURE__ */ jsxs("main", { children: [
      /* @__PURE__ */ jsxs("section", { className: "relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-wm-background", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-teal-hero" }),
        /* @__PURE__ */ jsx("div", { className: "absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-teal/10 rounded-full blur-[120px] animate-pulse" }),
        /* @__PURE__ */ jsx("div", { className: "container mx-auto px-6 relative z-10", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto text-center", children: [
          /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.5, delay: 0.1 },
              className: "inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wm-border bg-wm-secondary/50 mb-8",
              children: [
                /* @__PURE__ */ jsx("span", { className: "w-2 h-2 rounded-full bg-teal animate-pulse" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm text-wm-muted-foreground", children: t.hero.badge })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            motion.h1,
            {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.6, delay: 0.2 },
              className: "text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-wm-foreground",
              children: [
                t.hero.title,
                " ",
                /* @__PURE__ */ jsx("span", { className: "text-gradient-teal", children: t.hero.titleHighlight })
              ]
            }
          ),
          /* @__PURE__ */ jsx(
            motion.p,
            {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.6, delay: 0.3 },
              className: "text-lg md:text-xl text-wm-muted-foreground max-w-2xl mx-auto mb-10",
              children: t.hero.subtitle
            }
          ),
          /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.6, delay: 0.4 },
              className: "flex flex-col sm:flex-row items-center justify-center gap-4 mb-16",
              children: [
                /* @__PURE__ */ jsx(Button, { size: "xl", className: "group bg-teal hover:bg-teal-glow text-white", asChild: true, children: /* @__PURE__ */ jsxs("a", { href: "#services", children: [
                  t.hero.cta1,
                  /* @__PURE__ */ jsx(ArrowRight, { className: "w-5 h-5 group-hover:translate-x-1 transition-transform" })
                ] }) }),
                /* @__PURE__ */ jsx(Button, { variant: "outline", size: "xl", className: "border-wm-border text-wm-foreground hover:bg-wm-secondary", asChild: true, children: /* @__PURE__ */ jsx("a", { href: "#search", children: t.hero.cta2 }) })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              transition: { duration: 0.8, delay: 0.6 },
              className: "grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto",
              children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-3 p-4 rounded-xl bg-wm-secondary/30 border border-wm-border/50", children: [
                  /* @__PURE__ */ jsx(Stethoscope, { className: "w-5 h-5 text-teal" }),
                  /* @__PURE__ */ jsx("span", { className: "text-sm text-wm-muted-foreground", children: t.hero.trust.doctors })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-3 p-4 rounded-xl bg-wm-secondary/30 border border-wm-border/50", children: [
                  /* @__PURE__ */ jsx(Calendar, { className: "w-5 h-5 text-teal" }),
                  /* @__PURE__ */ jsx("span", { className: "text-sm text-wm-muted-foreground", children: t.hero.trust.booking })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-3 p-4 rounded-xl bg-wm-secondary/30 border border-wm-border/50", children: [
                  /* @__PURE__ */ jsx(FileText, { className: "w-5 h-5 text-teal" }),
                  /* @__PURE__ */ jsx("span", { className: "text-sm text-wm-muted-foreground", children: t.hero.trust.content })
                ] })
              ]
            }
          )
        ] }) })
      ] }),
      /* @__PURE__ */ jsx("section", { id: "search", className: "py-24 bg-wm-card", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6", children: [
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            className: "text-center mb-16",
            children: [
              /* @__PURE__ */ jsx("span", { className: "inline-block text-teal text-sm font-semibold uppercase tracking-wider mb-4", children: t.search.label }),
              /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold mb-4 text-wm-foreground", children: t.search.title }),
              /* @__PURE__ */ jsx("p", { className: "text-wm-muted-foreground max-w-2xl mx-auto", children: t.search.subtitle })
            ]
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto", children: [
          { icon: Search, ...t.search.items.specialty },
          { icon: MapPin, ...t.search.items.location },
          { icon: Building2, ...t.search.items.type },
          { icon: Calendar, ...t.search.items.availability }
        ].map((item, index) => /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { delay: index * 0.1 },
            className: "p-6 rounded-xl bg-wm-background border border-wm-border hover:border-teal/50 transition-colors",
            children: [
              /* @__PURE__ */ jsx(item.icon, { className: "w-8 h-8 text-teal mb-4" }),
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold mb-2 text-wm-foreground", children: item.title }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-wm-muted-foreground", children: item.description })
            ]
          },
          index
        )) })
      ] }) }),
      /* @__PURE__ */ jsx("section", { id: "services", className: "py-24 bg-wm-background", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6", children: [
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            className: "text-center mb-16",
            children: [
              /* @__PURE__ */ jsx("span", { className: "inline-block text-teal text-sm font-semibold uppercase tracking-wider mb-4", children: t.services.label }),
              /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold mb-4 text-wm-foreground", children: t.services.title }),
              /* @__PURE__ */ jsx("p", { className: "text-wm-muted-foreground max-w-2xl mx-auto", children: t.services.subtitle })
            ]
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto", children: [
          { icon: Stethoscope, ...t.services.items.doctors },
          { icon: Building2, ...t.services.items.clinics },
          { icon: FlaskConical, ...t.services.items.labs },
          { icon: Heart, ...t.services.items.spas },
          { icon: Home, ...t.services.items.nursing },
          { icon: Calendar, ...t.services.items.booking }
        ].map((item, index) => /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { delay: index * 0.1 },
            className: "p-6 rounded-xl bg-wm-card border border-wm-border hover:border-teal/50 transition-colors",
            children: [
              /* @__PURE__ */ jsx(item.icon, { className: "w-8 h-8 text-teal mb-4" }),
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold mb-2 text-wm-foreground", children: item.title }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-wm-muted-foreground", children: item.description })
            ]
          },
          index
        )) })
      ] }) }),
      /* @__PURE__ */ jsx("section", { id: "blog", className: "py-24 bg-wm-card", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-6", children: /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-12 max-w-5xl mx-auto", children: [
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, x: -20 },
            whileInView: { opacity: 1, x: 0 },
            viewport: { once: true },
            className: "p-8 rounded-2xl bg-wm-background border border-wm-border",
            children: [
              /* @__PURE__ */ jsx(FileText, { className: "w-10 h-10 text-teal mb-4" }),
              /* @__PURE__ */ jsx("span", { className: "inline-block text-teal text-sm font-semibold uppercase tracking-wider mb-2", children: t.blog.label }),
              /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold mb-3 text-wm-foreground", children: t.blog.title }),
              /* @__PURE__ */ jsx("p", { className: "text-wm-muted-foreground mb-6", children: t.blog.subtitle }),
              /* @__PURE__ */ jsx("ul", { className: "space-y-3", children: t.blog.features.map((feature, index) => /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3 text-sm text-wm-muted-foreground", children: [
                /* @__PURE__ */ jsx(CheckCircle2, { className: "w-4 h-4 text-teal" }),
                feature
              ] }, index)) })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, x: 20 },
            whileInView: { opacity: 1, x: 0 },
            viewport: { once: true },
            className: "p-8 rounded-2xl bg-wm-background border border-wm-border",
            children: [
              /* @__PURE__ */ jsx(MessageCircleQuestion, { className: "w-10 h-10 text-teal mb-4" }),
              /* @__PURE__ */ jsx("span", { className: "inline-block text-teal text-sm font-semibold uppercase tracking-wider mb-2", children: t.qa.label }),
              /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold mb-3 text-wm-foreground", children: t.qa.title }),
              /* @__PURE__ */ jsx("p", { className: "text-wm-muted-foreground mb-6", children: t.qa.subtitle }),
              /* @__PURE__ */ jsx("ul", { className: "space-y-3", children: t.qa.features.map((feature, index) => /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3 text-sm text-wm-muted-foreground", children: [
                /* @__PURE__ */ jsx(CheckCircle2, { className: "w-4 h-4 text-teal" }),
                feature
              ] }, index)) })
            ]
          }
        )
      ] }) }) }),
      /* @__PURE__ */ jsx("section", { className: "py-24 bg-wm-background", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6", children: [
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            className: "text-center mb-16",
            children: [
              /* @__PURE__ */ jsx("span", { className: "inline-block text-teal text-sm font-semibold uppercase tracking-wider mb-4", children: t.why.label }),
              /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold mb-4 text-wm-foreground", children: t.why.title })
            ]
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto", children: [
          { icon: Users, ...t.why.items.platform },
          { icon: Calendar, ...t.why.items.booking },
          { icon: FileText, ...t.why.items.content },
          { icon: Shield, ...t.why.items.trust }
        ].map((item, index) => /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { delay: index * 0.1 },
            className: "p-6 rounded-xl bg-wm-card border border-wm-border text-center",
            children: [
              /* @__PURE__ */ jsx("div", { className: "w-12 h-12 mx-auto mb-4 rounded-full bg-teal/10 flex items-center justify-center", children: /* @__PURE__ */ jsx(item.icon, { className: "w-6 h-6 text-teal" }) }),
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold mb-2 text-wm-foreground", children: item.title }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-wm-muted-foreground", children: item.description })
            ]
          },
          index
        )) })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "py-24 bg-wm-card", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-6", children: /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          className: "max-w-2xl mx-auto text-center",
          children: [
            /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold mb-4 text-wm-foreground", children: t.cta.title }),
            /* @__PURE__ */ jsx("p", { className: "text-wm-muted-foreground mb-8", children: t.cta.subtitle }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row items-center justify-center gap-4", children: [
              /* @__PURE__ */ jsx(Button, { size: "lg", className: "bg-teal hover:bg-teal-glow text-white", asChild: true, children: /* @__PURE__ */ jsx("a", { href: "#services", children: t.cta.findDoctor }) }),
              /* @__PURE__ */ jsx(Button, { variant: "outline", size: "lg", className: "border-wm-border text-wm-foreground hover:bg-wm-secondary", asChild: true, children: /* @__PURE__ */ jsx("a", { href: "mailto:info@wizionar.com", children: t.cta.contact }) })
            ] })
          ]
        }
      ) }) })
    ] }),
    /* @__PURE__ */ jsx("footer", { className: "py-8 border-t border-wm-border bg-wm-background", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-6 text-center", children: /* @__PURE__ */ jsxs(LocalizedLink, { to: "/", className: "text-teal hover:text-teal-glow transition-colors", children: [
      "← ",
      t.footer.wizionar
    ] }) }) })
  ] });
};
const WizMedik$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: WizMedik
}, Symbol.toStringTag, { value: "Module" }));
const frizerinoTranslations = {
  sr: {
    header: {
      search: "Pretraga",
      forSalons: "Za salone",
      about: "O nama",
      backToWizionar: "← Wizionar",
      bookNow: "Rezerviši termin"
    },
    hero: {
      badge: "Platforma za zakazivanje u BiH",
      title: "Pronađite i rezervišite",
      titleHighlight: "frizerski ili kozmetički salon",
      subtitle: "Brzo, jednostavno i onda kada vama odgovara. Pretražite salone po gradu, usluzi, slobodnim terminima i lokaciji – i rezervišite online, bez poziva i čekanja.",
      cta1: "Rezerviši termin",
      cta2: "Za vlasnike salona",
      trust: {
        search: "Pametna pretraga",
        booking: "Online rezervacija",
        reviews: "Recenzije klijenata"
      }
    },
    search: {
      label: "Pametna pretraga",
      title: "Pronađite salon po više kriterijuma istovremeno",
      subtitle: "Frizerino je platforma za online zakazivanje frizera i kozmetičkih tretmana u Bosni i Hercegovini.",
      items: {
        city: { title: "Po gradu i naselju", description: "Pretražite frizerske i kozmetičke salone u vašem gradu ili naselju." },
        location: { title: "Po blizini lokacije", description: "Pronađite frizer u blizini vaše trenutne lokacije." },
        type: { title: "Po tipu salona", description: "Muški, ženski ili dječiji frizerski saloni." },
        availability: { title: "Po dostupnim terminima", description: "Vidite slobodne termine i rezervišite odmah." }
      }
    },
    booking: {
      label: "Online zakazivanje",
      title: "Online zakazivanje frizera – brzo i jednostavno",
      subtitle: "Rezervacija termina frizer nikada nije bila lakša. Pronađite frizerski salon u blizini, vidite dostupne termine i rezervišite online.",
      items: {
        find: { title: "Kako pronaći salon", description: "Unesite grad ili koristite svoju lokaciju. Filtrirajte po tipu salona, uslugama i ocjenama." },
        reserve: { title: "Kako rezervisati termin", description: "Odaberite salon, vidite dostupne termine u realnom vremenu, izaberite uslugu i frizera. Rezervacija traje samo 30 sekundi." },
        reviews: { title: "Recenzije stvarnih klijenata", description: "Samo klijenti koji su rezervisali i posjetili salon mogu ostaviti recenziju." },
        reminders: { title: "Podsjetnici i notifikacije", description: "Automatski podsjetnici dan prije termina. Pratite status rezervacije i primajte obavještenja." }
      }
    },
    system: {
      label: "Za salone",
      title: "Kompletan operativni sistem za moderno vođenje salona",
      subtitle: "Frizerino nije samo platforma za zakazivanje termina. To je alat koji transformiše način rada vašeg salona.",
      items: {
        reservations: { title: "Online rezervacije 24/7", features: ["Klijenti rezervišu termine bilo kada", "Automatsko potvrđivanje termina", "Smanjenje telefonskih poziva", "Podsjetnici za klijente"] },
        schedule: { title: "Upravljanje rasporedima", features: ["Kalendar za sve zaposlene", "Radno vrijeme i pauze", "Upravljanje uslugama i cijenama", "Baza klijenata i istorija"] },
        analytics: { title: "Analitika i izvještaji", features: ["Praćenje prihoda i statistike", "Najpopularnije usluge", "Performanse zaposlenih", "Izvještaji po periodu"] },
        widget: { title: "Booking Widget", description: "Dodajte rezervacije na vaš website. Integrirajte Frizerino booking widget na vašu web stranicu.", features: ["Jednostavna integracija", "Prilagodljiv dizajn", "Sinhronizacija u realnom vremenu"] }
      }
    },
    about: {
      label: "O nama",
      title: "O Frizerino platformi",
      subtitle: "Moderna platforma za online zakazivanje termina u frizerskim i kozmetičkim salonima",
      mission: {
        title: "Naša misija",
        description: "Frizerino je nastao sa ciljem da pojednostavi proces zakazivanja termina u salonima i omogući vlasnicima salona da efikasnije upravljaju svojim poslovanjem.",
        text: "Vjerujemo da tehnologija treba biti dostupna svima – od malih lokalnih salona do velikih lanaca. Zato smo kreirali platformu koja je jednostavna za korištenje, ali dovoljno moćna da zadovolji sve potrebe modernog salona."
      },
      local: {
        title: "Lokalni fokus",
        description: "Fokusirani smo na lokalno tržište Bosne i Hercegovine, razumijemo specifičnosti našeg regiona i prilagođavamo rješenja potrebama naših korisnika."
      }
    },
    security: {
      label: "Sigurnost",
      title: "Sigurnost i privatnost",
      subtitle: "Vaši podaci su zaštićeni najnovijim sigurnosnim standardima. Koristimo SSL enkripciju i poštujemo GDPR propise.",
      items: {
        gdpr: { title: "GDPR usklađenost", description: "Platforma je u potpunosti usklađena sa GDPR propisima. Korisnici imaju punu kontrolu nad svojim podacima." },
        local: { title: "Lokalni fokus", description: "Prilagođeni smo specifičnostima BiH tržišta – od jezika i valute do načina poslovanja." }
      }
    },
    cta: {
      title: "Spremni za jednostavnije zakazivanje?",
      subtitle: "Posjetite Frizerino i pronađite salon ili registrujte svoj salon danas.",
      visitSite: "Posjeti Frizerino.com",
      contact: "Kontaktiraj nas"
    },
    footer: {
      wizionar: "Wizionar"
    }
  },
  en: {
    header: {
      search: "Search",
      forSalons: "For salons",
      about: "About",
      backToWizionar: "← Wizionar",
      bookNow: "Book now"
    },
    hero: {
      badge: "Booking platform for BiH",
      title: "Find and book",
      titleHighlight: "a hair or beauty salon",
      subtitle: "Fast, simple and when it suits you. Search salons by city, service, available slots and location – and book online, without calls or waiting.",
      cta1: "Book now",
      cta2: "For salon owners",
      trust: {
        search: "Smart search",
        booking: "Online booking",
        reviews: "Client reviews"
      }
    },
    search: {
      label: "Smart search",
      title: "Find a salon by multiple criteria at once",
      subtitle: "Frizerino is a platform for online booking of hairdressers and beauty treatments in Bosnia and Herzegovina.",
      items: {
        city: { title: "By city and neighborhood", description: "Search hair and beauty salons in your city or neighborhood." },
        location: { title: "By proximity", description: "Find a hairdresser near your current location." },
        type: { title: "By salon type", description: "Men's, women's or children's hair salons." },
        availability: { title: "By available slots", description: "See free slots and book immediately." }
      }
    },
    booking: {
      label: "Online booking",
      title: "Online hairdresser booking – fast and simple",
      subtitle: "Booking an appointment has never been easier. Find a hair salon nearby, see available slots and book online.",
      items: {
        find: { title: "How to find a salon", description: "Enter a city or use your location. Filter by salon type, services and ratings." },
        reserve: { title: "How to book", description: "Choose a salon, see available slots in real time, select a service and hairdresser. Booking takes only 30 seconds." },
        reviews: { title: "Real client reviews", description: "Only clients who have booked and visited the salon can leave a review." },
        reminders: { title: "Reminders and notifications", description: "Automatic reminders the day before your appointment. Track booking status and receive notifications." }
      }
    },
    system: {
      label: "For salons",
      title: "Complete operating system for modern salon management",
      subtitle: "Frizerino is not just a booking platform. It's a tool that transforms how your salon operates.",
      items: {
        reservations: { title: "Online reservations 24/7", features: ["Clients book anytime", "Automatic confirmation", "Fewer phone calls", "Client reminders"] },
        schedule: { title: "Schedule management", features: ["Calendar for all employees", "Working hours and breaks", "Service and price management", "Client database and history"] },
        analytics: { title: "Analytics and reports", features: ["Revenue and statistics tracking", "Most popular services", "Employee performance", "Period reports"] },
        widget: { title: "Booking Widget", description: "Add bookings to your website. Integrate the Frizerino booking widget on your web page.", features: ["Easy integration", "Customizable design", "Real-time sync"] }
      }
    },
    about: {
      label: "About",
      title: "About Frizerino platform",
      subtitle: "Modern platform for online appointment booking in hair and beauty salons",
      mission: {
        title: "Our mission",
        description: "Frizerino was created to simplify the appointment booking process in salons and help salon owners manage their business more efficiently.",
        text: "We believe technology should be accessible to everyone – from small local salons to large chains. That's why we created a platform that's easy to use yet powerful enough to meet all the needs of a modern salon."
      },
      local: {
        title: "Local focus",
        description: "We focus on the Bosnia and Herzegovina market, understand the specifics of our region and adapt solutions to our users' needs."
      }
    },
    security: {
      label: "Security",
      title: "Security and privacy",
      subtitle: "Your data is protected by the latest security standards. We use SSL encryption and comply with GDPR regulations.",
      items: {
        gdpr: { title: "GDPR compliance", description: "The platform is fully compliant with GDPR regulations. Users have full control over their data." },
        local: { title: "Local focus", description: "Adapted to BiH market specifics – from language and currency to business practices." }
      }
    },
    cta: {
      title: "Ready for easier booking?",
      subtitle: "Visit Frizerino and find a salon or register your salon today.",
      visitSite: "Visit Frizerino.com",
      contact: "Contact us"
    },
    footer: {
      wizionar: "Wizionar"
    }
  },
  de: {
    header: {
      search: "Suche",
      forSalons: "Für Salons",
      about: "Über uns",
      backToWizionar: "← Wizionar",
      bookNow: "Jetzt buchen"
    },
    hero: {
      badge: "Buchungsplattform für BiH",
      title: "Finden und buchen Sie",
      titleHighlight: "einen Friseur- oder Kosmetiksalon",
      subtitle: "Schnell, einfach und wann es Ihnen passt. Suchen Sie Salons nach Stadt, Service, verfügbaren Terminen und Standort – und buchen Sie online, ohne Anrufe oder Wartezeit.",
      cta1: "Jetzt buchen",
      cta2: "Für Salonbesitzer",
      trust: {
        search: "Intelligente Suche",
        booking: "Online-Buchung",
        reviews: "Kundenbewertungen"
      }
    },
    search: {
      label: "Intelligente Suche",
      title: "Finden Sie einen Salon nach mehreren Kriterien gleichzeitig",
      subtitle: "Frizerino ist eine Plattform für Online-Buchung von Friseuren und Kosmetikbehandlungen in Bosnien und Herzegowina.",
      items: {
        city: { title: "Nach Stadt und Stadtteil", description: "Suchen Sie Friseur- und Kosmetiksalons in Ihrer Stadt oder Ihrem Stadtteil." },
        location: { title: "Nach Nähe", description: "Finden Sie einen Friseur in der Nähe Ihres aktuellen Standorts." },
        type: { title: "Nach Salontyp", description: "Herren-, Damen- oder Kinderfriseur." },
        availability: { title: "Nach verfügbaren Terminen", description: "Sehen Sie freie Termine und buchen Sie sofort." }
      }
    },
    booking: {
      label: "Online-Buchung",
      title: "Online-Friseur-Buchung – schnell und einfach",
      subtitle: "Eine Terminbuchung war noch nie einfacher. Finden Sie einen Friseursalon in der Nähe, sehen Sie verfügbare Termine und buchen Sie online.",
      items: {
        find: { title: "Wie man einen Salon findet", description: "Geben Sie eine Stadt ein oder nutzen Sie Ihren Standort. Filtern Sie nach Salontyp, Services und Bewertungen." },
        reserve: { title: "Wie man bucht", description: "Wählen Sie einen Salon, sehen Sie verfügbare Termine in Echtzeit, wählen Sie Service und Friseur. Die Buchung dauert nur 30 Sekunden." },
        reviews: { title: "Echte Kundenbewertungen", description: "Nur Kunden, die gebucht und den Salon besucht haben, können eine Bewertung abgeben." },
        reminders: { title: "Erinnerungen und Benachrichtigungen", description: "Automatische Erinnerungen am Tag vor Ihrem Termin. Verfolgen Sie den Buchungsstatus." }
      }
    },
    system: {
      label: "Für Salons",
      title: "Komplettes Betriebssystem für moderne Salonführung",
      subtitle: "Frizerino ist nicht nur eine Buchungsplattform. Es ist ein Tool, das die Arbeitsweise Ihres Salons transformiert.",
      items: {
        reservations: { title: "Online-Reservierungen 24/7", features: ["Kunden buchen jederzeit", "Automatische Bestätigung", "Weniger Telefonanrufe", "Kundenerinnerungen"] },
        schedule: { title: "Terminverwaltung", features: ["Kalender für alle Mitarbeiter", "Arbeitszeiten und Pausen", "Service- und Preisverwaltung", "Kundendatenbank"] },
        analytics: { title: "Analytik und Berichte", features: ["Umsatz- und Statistikverfolgung", "Beliebteste Services", "Mitarbeiterleistung", "Periodenberichte"] },
        widget: { title: "Booking Widget", description: "Fügen Sie Buchungen auf Ihrer Website hinzu. Integrieren Sie das Frizerino Booking Widget.", features: ["Einfache Integration", "Anpassbares Design", "Echtzeit-Sync"] }
      }
    },
    about: {
      label: "Über uns",
      title: "Über die Frizerino-Plattform",
      subtitle: "Moderne Plattform für Online-Terminbuchung in Friseur- und Kosmetiksalons",
      mission: {
        title: "Unsere Mission",
        description: "Frizerino wurde geschaffen, um den Terminbuchungsprozess in Salons zu vereinfachen und Salonbesitzern zu helfen, ihr Geschäft effizienter zu führen.",
        text: "Wir glauben, dass Technologie für alle zugänglich sein sollte – von kleinen lokalen Salons bis zu großen Ketten."
      },
      local: {
        title: "Lokaler Fokus",
        description: "Wir konzentrieren uns auf den Markt in Bosnien und Herzegowina und passen Lösungen an die Bedürfnisse unserer Nutzer an."
      }
    },
    security: {
      label: "Sicherheit",
      title: "Sicherheit und Datenschutz",
      subtitle: "Ihre Daten sind durch neueste Sicherheitsstandards geschützt. Wir verwenden SSL-Verschlüsselung und halten GDPR-Vorschriften ein.",
      items: {
        gdpr: { title: "GDPR-Konformität", description: "Die Plattform ist vollständig GDPR-konform. Benutzer haben volle Kontrolle über ihre Daten." },
        local: { title: "Lokaler Fokus", description: "Angepasst an BiH-Marktspezifika – von Sprache und Währung bis zu Geschäftspraktiken." }
      }
    },
    cta: {
      title: "Bereit für einfachere Buchung?",
      subtitle: "Besuchen Sie Frizerino und finden Sie einen Salon oder registrieren Sie Ihren Salon heute.",
      visitSite: "Frizerino.com besuchen",
      contact: "Kontaktieren Sie uns"
    },
    footer: {
      wizionar: "Wizionar"
    }
  },
  it: {
    header: {
      search: "Ricerca",
      forSalons: "Per saloni",
      about: "Chi siamo",
      backToWizionar: "← Wizionar",
      bookNow: "Prenota ora"
    },
    hero: {
      badge: "Piattaforma di prenotazione per BiH",
      title: "Trova e prenota",
      titleHighlight: "un salone di parrucchieri o estetica",
      subtitle: "Veloce, semplice e quando ti fa comodo. Cerca saloni per città, servizio, slot disponibili e posizione – e prenota online, senza chiamate o attese.",
      cta1: "Prenota ora",
      cta2: "Per proprietari di saloni",
      trust: {
        search: "Ricerca intelligente",
        booking: "Prenotazione online",
        reviews: "Recensioni clienti"
      }
    },
    search: {
      label: "Ricerca intelligente",
      title: "Trova un salone per più criteri contemporaneamente",
      subtitle: "Frizerino è una piattaforma per la prenotazione online di parrucchieri e trattamenti estetici in Bosnia ed Erzegovina.",
      items: {
        city: { title: "Per città e quartiere", description: "Cerca saloni di parrucchieri e bellezza nella tua città o quartiere." },
        location: { title: "Per vicinanza", description: "Trova un parrucchiere vicino alla tua posizione attuale." },
        type: { title: "Per tipo di salone", description: "Saloni per uomini, donne o bambini." },
        availability: { title: "Per disponibilità", description: "Vedi gli slot liberi e prenota subito." }
      }
    },
    booking: {
      label: "Prenotazione online",
      title: "Prenotazione parrucchiere online – veloce e semplice",
      subtitle: "Prenotare un appuntamento non è mai stato così facile. Trova un salone vicino, vedi gli slot disponibili e prenota online.",
      items: {
        find: { title: "Come trovare un salone", description: "Inserisci una città o usa la tua posizione. Filtra per tipo di salone, servizi e valutazioni." },
        reserve: { title: "Come prenotare", description: "Scegli un salone, vedi gli slot disponibili in tempo reale, seleziona servizio e parrucchiere. La prenotazione richiede solo 30 secondi." },
        reviews: { title: "Recensioni di clienti reali", description: "Solo i clienti che hanno prenotato e visitato il salone possono lasciare una recensione." },
        reminders: { title: "Promemoria e notifiche", description: "Promemoria automatici il giorno prima dell'appuntamento. Traccia lo stato della prenotazione." }
      }
    },
    system: {
      label: "Per saloni",
      title: "Sistema operativo completo per la gestione moderna del salone",
      subtitle: "Frizerino non è solo una piattaforma di prenotazione. È uno strumento che trasforma il modo in cui opera il tuo salone.",
      items: {
        reservations: { title: "Prenotazioni online 24/7", features: ["I clienti prenotano in qualsiasi momento", "Conferma automatica", "Meno telefonate", "Promemoria per i clienti"] },
        schedule: { title: "Gestione calendario", features: ["Calendario per tutti i dipendenti", "Orari di lavoro e pause", "Gestione servizi e prezzi", "Database clienti e storico"] },
        analytics: { title: "Analisi e report", features: ["Tracciamento ricavi e statistiche", "Servizi più popolari", "Performance dipendenti", "Report per periodo"] },
        widget: { title: "Booking Widget", description: "Aggiungi prenotazioni al tuo sito web. Integra il widget di prenotazione Frizerino.", features: ["Integrazione facile", "Design personalizzabile", "Sincronizzazione in tempo reale"] }
      }
    },
    about: {
      label: "Chi siamo",
      title: "Informazioni sulla piattaforma Frizerino",
      subtitle: "Piattaforma moderna per la prenotazione online di appuntamenti in saloni di parrucchieri e bellezza",
      mission: {
        title: "La nostra missione",
        description: "Frizerino è stato creato per semplificare il processo di prenotazione nei saloni e aiutare i proprietari a gestire la loro attività in modo più efficiente.",
        text: "Crediamo che la tecnologia debba essere accessibile a tutti – dai piccoli saloni locali alle grandi catene."
      },
      local: {
        title: "Focus locale",
        description: "Ci concentriamo sul mercato della Bosnia ed Erzegovina e adattiamo le soluzioni alle esigenze dei nostri utenti."
      }
    },
    security: {
      label: "Sicurezza",
      title: "Sicurezza e privacy",
      subtitle: "I tuoi dati sono protetti dai più recenti standard di sicurezza. Utilizziamo crittografia SSL e rispettiamo le normative GDPR.",
      items: {
        gdpr: { title: "Conformità GDPR", description: "La piattaforma è pienamente conforme alle normative GDPR. Gli utenti hanno pieno controllo sui propri dati." },
        local: { title: "Focus locale", description: "Adattato alle specificità del mercato BiH – dalla lingua e valuta alle pratiche commerciali." }
      }
    },
    cta: {
      title: "Pronto per prenotazioni più facili?",
      subtitle: "Visita Frizerino e trova un salone o registra il tuo salone oggi.",
      visitSite: "Visita Frizerino.com",
      contact: "Contattaci"
    },
    footer: {
      wizionar: "Wizionar"
    }
  }
};
const useFrizerinoTranslations = () => {
  const { language } = useLanguage();
  return frizerinoTranslations[language];
};
const Frizerino = () => {
  const t = useFrizerinoTranslations();
  const { language } = useLanguage();
  const seo = getPageSeo("frizerino", language);
  return /* @__PURE__ */ jsxs("div", { className: "frizerino-theme min-h-screen bg-background text-foreground", children: [
    /* @__PURE__ */ jsx(
      SEOHead,
      {
        title: seo.title,
        description: seo.description,
        schema: [
          createSoftwareApplicationSchema({
            language,
            name: "Frizerino",
            description: seo.description,
            path: SEO_PATHS.frizerino,
            category: "BusinessApplication"
          }),
          createWebPageSchema({
            language,
            path: SEO_PATHS.frizerino,
            title: seo.title,
            description: seo.description
          }),
          createBreadcrumbSchema(language, [
            { name: getSeoLabel(language, "home"), path: SEO_PATHS.home },
            { name: "Frizerino", path: SEO_PATHS.frizerino }
          ])
        ]
      }
    ),
    /* @__PURE__ */ jsx(
      motion.header,
      {
        initial: { opacity: 0, y: -20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 },
        className: "fixed top-0 left-0 right-0 z-50 border-b border-friz-border bg-friz-background/80 backdrop-blur-xl",
        children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 py-4 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs(LocalizedLink, { to: "/frizerino", className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-lg bg-rose flex items-center justify-center", children: /* @__PURE__ */ jsx(Scissors, { className: "w-4 h-4 text-white" }) }),
            /* @__PURE__ */ jsx("span", { className: "text-xl font-bold text-friz-foreground", children: "Frizerino" })
          ] }),
          /* @__PURE__ */ jsxs("nav", { className: "hidden md:flex items-center gap-8", children: [
            /* @__PURE__ */ jsx("a", { href: "#search", className: "text-sm text-friz-muted-foreground hover:text-friz-foreground transition-colors", children: t.header.search }),
            /* @__PURE__ */ jsx("a", { href: "#system", className: "text-sm text-friz-muted-foreground hover:text-friz-foreground transition-colors", children: t.header.forSalons }),
            /* @__PURE__ */ jsx("a", { href: "#about", className: "text-sm text-friz-muted-foreground hover:text-friz-foreground transition-colors", children: t.header.about }),
            /* @__PURE__ */ jsx(LocalizedLink, { to: "/", className: "text-sm text-rose hover:text-rose-glow transition-colors", children: t.header.backToWizionar })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsx(LanguageSwitcher, {}),
            /* @__PURE__ */ jsx(Button, { size: "sm", className: "hidden sm:flex bg-rose hover:bg-rose-glow text-white", asChild: true, children: /* @__PURE__ */ jsx("a", { href: "https://frizerino.com/", target: "_blank", rel: "noopener noreferrer", children: t.header.bookNow }) })
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxs("main", { children: [
      /* @__PURE__ */ jsxs("section", { className: "relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-friz-background", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-rose-hero" }),
        /* @__PURE__ */ jsx("div", { className: "absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-rose/10 rounded-full blur-[120px] animate-pulse" }),
        /* @__PURE__ */ jsx("div", { className: "container mx-auto px-6 relative z-10", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto text-center", children: [
          /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.5, delay: 0.1 },
              className: "inline-flex items-center gap-2 px-4 py-2 rounded-full border border-friz-border bg-friz-secondary/50 mb-8",
              children: [
                /* @__PURE__ */ jsx("span", { className: "w-2 h-2 rounded-full bg-rose animate-pulse" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm text-friz-muted-foreground", children: t.hero.badge })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            motion.h1,
            {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.6, delay: 0.2 },
              className: "text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-friz-foreground",
              children: [
                t.hero.title,
                " ",
                /* @__PURE__ */ jsx("span", { className: "text-gradient-rose", children: t.hero.titleHighlight })
              ]
            }
          ),
          /* @__PURE__ */ jsx(
            motion.p,
            {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.6, delay: 0.3 },
              className: "text-lg md:text-xl text-friz-muted-foreground max-w-2xl mx-auto mb-10",
              children: t.hero.subtitle
            }
          ),
          /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.6, delay: 0.4 },
              className: "flex flex-col sm:flex-row items-center justify-center gap-4 mb-16",
              children: [
                /* @__PURE__ */ jsx(Button, { size: "xl", className: "group bg-rose hover:bg-rose-glow text-white", asChild: true, children: /* @__PURE__ */ jsxs("a", { href: "https://frizerino.com/", target: "_blank", rel: "noopener noreferrer", children: [
                  t.hero.cta1,
                  /* @__PURE__ */ jsx(ArrowRight, { className: "w-5 h-5 group-hover:translate-x-1 transition-transform" })
                ] }) }),
                /* @__PURE__ */ jsx(Button, { variant: "outline", size: "xl", className: "border-friz-border text-friz-foreground hover:bg-friz-secondary", asChild: true, children: /* @__PURE__ */ jsx("a", { href: "#system", children: t.hero.cta2 }) })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              transition: { duration: 0.8, delay: 0.6 },
              className: "grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto",
              children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-3 p-4 rounded-xl bg-friz-secondary/30 border border-friz-border/50", children: [
                  /* @__PURE__ */ jsx(Search, { className: "w-5 h-5 text-rose" }),
                  /* @__PURE__ */ jsx("span", { className: "text-sm text-friz-muted-foreground", children: t.hero.trust.search })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-3 p-4 rounded-xl bg-friz-secondary/30 border border-friz-border/50", children: [
                  /* @__PURE__ */ jsx(Calendar, { className: "w-5 h-5 text-rose" }),
                  /* @__PURE__ */ jsx("span", { className: "text-sm text-friz-muted-foreground", children: t.hero.trust.booking })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-3 p-4 rounded-xl bg-friz-secondary/30 border border-friz-border/50", children: [
                  /* @__PURE__ */ jsx(Star, { className: "w-5 h-5 text-rose" }),
                  /* @__PURE__ */ jsx("span", { className: "text-sm text-friz-muted-foreground", children: t.hero.trust.reviews })
                ] })
              ]
            }
          )
        ] }) })
      ] }),
      /* @__PURE__ */ jsx("section", { id: "search", className: "py-24 bg-friz-card", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6", children: [
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            className: "text-center mb-16",
            children: [
              /* @__PURE__ */ jsx("span", { className: "inline-block text-rose text-sm font-semibold uppercase tracking-wider mb-4", children: t.search.label }),
              /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold mb-4 text-friz-foreground", children: t.search.title }),
              /* @__PURE__ */ jsx("p", { className: "text-friz-muted-foreground max-w-2xl mx-auto", children: t.search.subtitle })
            ]
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto", children: [
          { icon: MapPin, ...t.search.items.city },
          { icon: Search, ...t.search.items.location },
          { icon: Users, ...t.search.items.type },
          { icon: Clock, ...t.search.items.availability }
        ].map((item, index) => /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { delay: index * 0.1 },
            className: "p-6 rounded-xl bg-friz-background border border-friz-border hover:border-rose/50 transition-colors",
            children: [
              /* @__PURE__ */ jsx(item.icon, { className: "w-8 h-8 text-rose mb-4" }),
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold mb-2 text-friz-foreground", children: item.title }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-friz-muted-foreground", children: item.description })
            ]
          },
          index
        )) })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "py-24 bg-friz-background", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6", children: [
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            className: "text-center mb-16",
            children: [
              /* @__PURE__ */ jsx("span", { className: "inline-block text-rose text-sm font-semibold uppercase tracking-wider mb-4", children: t.booking.label }),
              /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold mb-4 text-friz-foreground", children: t.booking.title }),
              /* @__PURE__ */ jsx("p", { className: "text-friz-muted-foreground max-w-2xl mx-auto", children: t.booking.subtitle })
            ]
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 gap-6 max-w-4xl mx-auto", children: [
          { icon: Search, ...t.booking.items.find },
          { icon: Calendar, ...t.booking.items.reserve },
          { icon: Star, ...t.booking.items.reviews },
          { icon: Bell, ...t.booking.items.reminders }
        ].map((item, index) => /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { delay: index * 0.1 },
            className: "p-6 rounded-xl bg-friz-card border border-friz-border",
            children: [
              /* @__PURE__ */ jsx(item.icon, { className: "w-8 h-8 text-rose mb-4" }),
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold mb-2 text-friz-foreground", children: item.title }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-friz-muted-foreground", children: item.description })
            ]
          },
          index
        )) })
      ] }) }),
      /* @__PURE__ */ jsx("section", { id: "system", className: "py-24 bg-friz-card", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6", children: [
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            className: "text-center mb-16",
            children: [
              /* @__PURE__ */ jsx("span", { className: "inline-block text-rose text-sm font-semibold uppercase tracking-wider mb-4", children: t.system.label }),
              /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold mb-4 text-friz-foreground", children: t.system.title }),
              /* @__PURE__ */ jsx("p", { className: "text-friz-muted-foreground max-w-2xl mx-auto", children: t.system.subtitle })
            ]
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 gap-6 max-w-5xl mx-auto", children: [
          { icon: Calendar, ...t.system.items.reservations },
          { icon: Clock, ...t.system.items.schedule },
          { icon: BarChart3, ...t.system.items.analytics },
          { icon: Globe, title: t.system.items.widget.title, description: t.system.items.widget.description, features: t.system.items.widget.features }
        ].map((item, index) => /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { delay: index * 0.1 },
            className: "p-6 rounded-xl bg-friz-background border border-friz-border",
            children: [
              /* @__PURE__ */ jsx(item.icon, { className: "w-8 h-8 text-rose mb-4" }),
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold mb-3 text-friz-foreground", children: item.title }),
              "description" in item && /* @__PURE__ */ jsx("p", { className: "text-sm text-friz-muted-foreground mb-3", children: item.description }),
              /* @__PURE__ */ jsx("ul", { className: "space-y-2", children: item.features.map((feature, fIndex) => /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2 text-sm text-friz-muted-foreground", children: [
                /* @__PURE__ */ jsx(CheckCircle, { className: "w-4 h-4 text-rose" }),
                feature
              ] }, fIndex)) })
            ]
          },
          index
        )) })
      ] }) }),
      /* @__PURE__ */ jsx("section", { id: "about", className: "py-24 bg-friz-background", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6", children: [
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            className: "text-center mb-16",
            children: [
              /* @__PURE__ */ jsx("span", { className: "inline-block text-rose text-sm font-semibold uppercase tracking-wider mb-4", children: t.about.label }),
              /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold mb-4 text-friz-foreground", children: t.about.title }),
              /* @__PURE__ */ jsx("p", { className: "text-friz-muted-foreground max-w-2xl mx-auto", children: t.about.subtitle })
            ]
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-8 max-w-4xl mx-auto", children: [
          /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: { opacity: 0, x: -20 },
              whileInView: { opacity: 1, x: 0 },
              viewport: { once: true },
              className: "p-8 rounded-2xl bg-friz-card border border-friz-border",
              children: [
                /* @__PURE__ */ jsx(Sparkles, { className: "w-10 h-10 text-rose mb-4" }),
                /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold mb-3 text-friz-foreground", children: t.about.mission.title }),
                /* @__PURE__ */ jsx("p", { className: "text-friz-muted-foreground mb-4", children: t.about.mission.description }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-friz-muted-foreground", children: t.about.mission.text })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: { opacity: 0, x: 20 },
              whileInView: { opacity: 1, x: 0 },
              viewport: { once: true },
              className: "p-8 rounded-2xl bg-friz-card border border-friz-border",
              children: [
                /* @__PURE__ */ jsx(MapPin, { className: "w-10 h-10 text-rose mb-4" }),
                /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold mb-3 text-friz-foreground", children: t.about.local.title }),
                /* @__PURE__ */ jsx("p", { className: "text-friz-muted-foreground", children: t.about.local.description })
              ]
            }
          )
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "py-24 bg-friz-card", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6", children: [
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            className: "text-center mb-16",
            children: [
              /* @__PURE__ */ jsx("span", { className: "inline-block text-rose text-sm font-semibold uppercase tracking-wider mb-4", children: t.security.label }),
              /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold mb-4 text-friz-foreground", children: t.security.title }),
              /* @__PURE__ */ jsx("p", { className: "text-friz-muted-foreground max-w-2xl mx-auto", children: t.security.subtitle })
            ]
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6 max-w-3xl mx-auto", children: [
          /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              className: "p-6 rounded-xl bg-friz-background border border-friz-border",
              children: [
                /* @__PURE__ */ jsx(Shield, { className: "w-8 h-8 text-rose mb-4" }),
                /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold mb-2 text-friz-foreground", children: t.security.items.gdpr.title }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-friz-muted-foreground", children: t.security.items.gdpr.description })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { delay: 0.1 },
              className: "p-6 rounded-xl bg-friz-background border border-friz-border",
              children: [
                /* @__PURE__ */ jsx(MapPin, { className: "w-8 h-8 text-rose mb-4" }),
                /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold mb-2 text-friz-foreground", children: t.security.items.local.title }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-friz-muted-foreground", children: t.security.items.local.description })
              ]
            }
          )
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "py-24 bg-friz-background", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-6", children: /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          className: "max-w-2xl mx-auto text-center",
          children: [
            /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold mb-4 text-friz-foreground", children: t.cta.title }),
            /* @__PURE__ */ jsx("p", { className: "text-friz-muted-foreground mb-8", children: t.cta.subtitle }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row items-center justify-center gap-4", children: [
              /* @__PURE__ */ jsx(Button, { size: "lg", className: "group bg-rose hover:bg-rose-glow text-white", asChild: true, children: /* @__PURE__ */ jsxs("a", { href: "https://frizerino.com/", target: "_blank", rel: "noopener noreferrer", children: [
                t.cta.visitSite,
                /* @__PURE__ */ jsx(ArrowRight, { className: "w-5 h-5 group-hover:translate-x-1 transition-transform" })
              ] }) }),
              /* @__PURE__ */ jsx(Button, { variant: "outline", size: "lg", className: "border-friz-border text-friz-foreground hover:bg-friz-secondary", asChild: true, children: /* @__PURE__ */ jsx("a", { href: "mailto:info@wizionar.com", children: t.cta.contact }) })
            ] })
          ]
        }
      ) }) })
    ] }),
    /* @__PURE__ */ jsx("footer", { className: "py-8 border-t border-friz-border bg-friz-background", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-6 text-center", children: /* @__PURE__ */ jsxs(LocalizedLink, { to: "/", className: "text-rose hover:text-rose-glow transition-colors", children: [
      "← ",
      t.footer.wizionar
    ] }) }) })
  ] });
};
const Frizerino$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Frizerino
}, Symbol.toStringTag, { value: "Module" }));
const chatkoTranslations = {
  sr: {
    header: {
      features: "Funkcije",
      integration: "Integracija",
      examples: "Primjeri",
      backToWizionar: "← Wizionar",
      contact: "Kontakt"
    },
    hero: {
      badge: "AI asistent za vaš web shop",
      title: "Vaš virtuelni prodavač",
      titleHighlight: "koji nikad ne spava",
      subtitle: "Chatko je AI chat asistent koji se integriše na vaš web sajt. Povezuje se sa vašom bazom proizvoda, zna sve o dostavi, plaćanju i posebnim ponudama – i odgovara samo ono što vi dozvolite.",
      cta1: "Kontaktiraj nas",
      cta2: "Kako funkcioniše",
      trust: {
        ai: "GPT tehnologija",
        control: "Potpuna kontrola",
        integration: "Laka integracija"
      }
    },
    features: {
      label: "Funkcionalnosti",
      title: "Sve što vam treba za pametan chat na sajtu",
      subtitle: "Chatko nije generički chatbot – on je prilagođen vašem poslovanju, vašim proizvodima i vašim pravilima komunikacije.",
      items: {
        products: {
          title: "Sinhronizacija proizvoda",
          description: "Chatko se povezuje sa vašim web shopom i automatski povlači podatke o proizvodima, cijenama, dostupnosti i kategorijama.",
          features: ["Automatski uvoz kataloga", "Ažuriranje u realnom vremenu", "Pretraga po nazivu ili kategoriji", "Podrška za varijante proizvoda"]
        },
        delivery: {
          title: "Informacije o dostavi",
          description: "Unesite vaše uslove dostave – troškove, rokove, zone isporuke – i Chatko će precizno odgovarati kupcima.",
          features: ["Troškovi dostave po zonama", "Procijenjeni rok isporuke", "Besplatna dostava uslovi", "Praćenje pošiljki"]
        },
        payment: {
          title: "Plaćanje i uslovi",
          description: "Definišite načine plaćanja, rate, povrate i garancije. Chatko prenosi informacije tačno onako kako vi želite.",
          features: ["Kartično i gotovinski", "Plaćanje na rate", "Politika povrata", "Garancije i reklamacije"]
        },
        custom: {
          title: "Prilagođeni tekstovi",
          description: "Dodajte posebne opise za proizvode, brendove ili kategorije. Chatko koristi vaše tekstove za personalizovane odgovore.",
          features: ["Brendirani odgovori", "Posebne napomene po proizvodu", "Sezonske poruke", "Ton komunikacije po mjeri"]
        },
        restrictions: {
          title: "Ograničen sistem odgovaranja",
          description: "Vi definirate granice. Chatko odgovara samo na pitanja vezana za vaše poslovanje – bez skretanja sa teme.",
          features: ["Samo relevantni odgovori", "Blokiranje neprikladnih pitanja", "Definisani opseg znanja", "Eskalacija ka čovjeku"]
        },
        analytics: {
          title: "Analitika razgovora",
          description: "Pratite šta kupci najčešće pitaju, gdje odustaju i kako Chatko performira – sa detaljnim izvještajima.",
          features: ["Najčešća pitanja", "Stopa riješenosti", "Vrijeme odgovora", "Konverzioni izvještaji"]
        }
      }
    },
    integration: {
      label: "Integracija",
      title: "Jednostavna integracija u 3 koraka",
      subtitle: "Chatko se postavlja na vaš sajt za par minuta – bez programiranja ili komplikovanih podešavanja.",
      steps: {
        connect: { step: "01", title: "Povežite shop", description: "Unesite URL svog web shopa ili API ključ. Chatko automatski uvozi vaše proizvode i podatke." },
        configure: { step: "02", title: "Konfigurišite pravila", description: "Definišite ton komunikacije, ograničenja, tekstove o dostavi, plaćanju i posebne napomene." },
        launch: { step: "03", title: "Pokrenite na sajtu", description: "Kopirajte jedan red koda i zalijepite na vaš sajt. Chatko je spreman da odgovara kupcima." }
      }
    },
    examples: {
      label: "Primjeri korištenja",
      title: "Chatko u akciji",
      subtitle: "Pogledajte kako Chatko pomaže različitim tipovima online prodavnica.",
      items: {
        fashion: {
          title: "Online modni shop",
          description: "Kupac pita za veličine, dostupnost boja, rok dostave i način plaćanja na rate. Chatko odgovara precizno na osnovu podataka iz shopa.",
          question: '"Imate li ovu haljinu u veličini M? Koliko košta dostava?"',
          answer: '"Da, haljina je dostupna u M i L. Dostava je besplatna za narudžbe iznad 50 KM, inače košta 7 KM. Isporuka za 2-3 radna dana."'
        },
        electronics: {
          title: "Elektronika i tehnika",
          description: "Chatko zna specifikacije, garancije i uslove plaćanja. Nudi alternativne proizvode ako traženi nije dostupan.",
          question: '"Koji laptop preporučujete za grafički dizajn do 2000 KM?"',
          answer: '"Preporučujem Model X sa 16GB RAM-a i dedikovanom grafikom. Cijena: 1.899 KM. Dostupno plaćanje na 12 rata bez kamata."'
        },
        food: {
          title: "Dostava hrane i namirnica",
          description: "Informacije o dostupnosti, alergenima, minimalnim narudžbama i vremenima dostave – sve automatizovano.",
          question: '"Da li dostavljate u Zenicu? Koliki je minimum za narudžbu?"',
          answer: '"Da, dostavljamo u Zenicu. Minimalna narudžba je 15 KM, a dostava je besplatna iznad 40 KM. Očekivano vrijeme: 45-60 min."'
        }
      }
    },
    security: {
      label: "Sigurnost",
      title: "Vaši podaci su sigurni",
      subtitle: "Chatko koristi najmodernije sigurnosne standarde za zaštitu podataka vaših kupaca i vašeg poslovanja.",
      items: {
        encryption: { title: "SSL enkripcija", description: "Sva komunikacija između kupaca i Chatka je šifrovana pomoću SSL/TLS protokola." },
        gdpr: { title: "GDPR usklađenost", description: "Potpuno usklađen sa GDPR propisima. Podaci kupaca se ne dijele sa trećim stranama." },
        control: { title: "Vi imate kontrolu", description: "Svi podaci, razgovori i konfiguracije ostaju pod vašom kontrolom. Možete ih obrisati u bilo kom trenutku." }
      }
    },
    cta: {
      title: "Spremni za pametniju podršku kupcima?",
      subtitle: "Kontaktirajte nas i saznajte kako Chatko može transformisati vašu online prodaju.",
      contact: "Kontaktiraj nas",
      email: "info@wizionar.com"
    },
    footer: {
      wizionar: "Wizionar"
    }
  },
  en: {
    header: {
      features: "Features",
      integration: "Integration",
      examples: "Examples",
      backToWizionar: "← Wizionar",
      contact: "Contact"
    },
    hero: {
      badge: "AI assistant for your web shop",
      title: "Your virtual sales assistant",
      titleHighlight: "that never sleeps",
      subtitle: "Chatko is an AI chat assistant that integrates into your website. It connects to your product catalog, knows everything about delivery, payments and special offers – and only answers what you allow.",
      cta1: "Contact us",
      cta2: "How it works",
      trust: {
        ai: "GPT technology",
        control: "Full control",
        integration: "Easy integration"
      }
    },
    features: {
      label: "Features",
      title: "Everything you need for a smart chat on your site",
      subtitle: "Chatko is not a generic chatbot – it's tailored to your business, your products and your communication rules.",
      items: {
        products: {
          title: "Product synchronization",
          description: "Chatko connects to your web shop and automatically pulls product data, prices, availability and categories.",
          features: ["Automatic catalog import", "Real-time updates", "Search by name or category", "Product variant support"]
        },
        delivery: {
          title: "Delivery information",
          description: "Enter your delivery terms – costs, deadlines, delivery zones – and Chatko will accurately respond to customers.",
          features: ["Delivery costs by zone", "Estimated delivery time", "Free delivery conditions", "Shipment tracking"]
        },
        payment: {
          title: "Payment and terms",
          description: "Define payment methods, installments, returns and warranties. Chatko conveys information exactly as you want.",
          features: ["Card and cash", "Installment payments", "Return policy", "Warranties and claims"]
        },
        custom: {
          title: "Custom texts",
          description: "Add special descriptions for products, brands or categories. Chatko uses your texts for personalized responses.",
          features: ["Branded responses", "Product-specific notes", "Seasonal messages", "Custom communication tone"]
        },
        restrictions: {
          title: "Restricted response system",
          description: "You define the boundaries. Chatko only answers questions related to your business – no going off-topic.",
          features: ["Only relevant answers", "Block inappropriate questions", "Defined knowledge scope", "Escalation to human"]
        },
        analytics: {
          title: "Conversation analytics",
          description: "Track what customers ask most, where they drop off and how Chatko performs – with detailed reports.",
          features: ["Most common questions", "Resolution rate", "Response time", "Conversion reports"]
        }
      }
    },
    integration: {
      label: "Integration",
      title: "Simple integration in 3 steps",
      subtitle: "Chatko is set up on your site in minutes – no programming or complex settings required.",
      steps: {
        connect: { step: "01", title: "Connect your shop", description: "Enter your web shop URL or API key. Chatko automatically imports your products and data." },
        configure: { step: "02", title: "Configure rules", description: "Define communication tone, restrictions, delivery texts, payment info and special notes." },
        launch: { step: "03", title: "Launch on your site", description: "Copy one line of code and paste it on your site. Chatko is ready to answer customers." }
      }
    },
    examples: {
      label: "Use cases",
      title: "Chatko in action",
      subtitle: "See how Chatko helps different types of online stores.",
      items: {
        fashion: {
          title: "Online fashion shop",
          description: "Customer asks about sizes, color availability, delivery time and installment payment. Chatko answers precisely based on shop data.",
          question: '"Do you have this dress in size M? How much is delivery?"',
          answer: '"Yes, the dress is available in M and L. Delivery is free for orders over 50 KM, otherwise it costs 7 KM. Delivery in 2-3 business days."'
        },
        electronics: {
          title: "Electronics and tech",
          description: "Chatko knows specifications, warranties and payment terms. Offers alternatives if the requested product is unavailable.",
          question: '"Which laptop do you recommend for graphic design under 2000 KM?"',
          answer: '"I recommend Model X with 16GB RAM and dedicated graphics. Price: 1,899 KM. 12 interest-free installments available."'
        },
        food: {
          title: "Food and grocery delivery",
          description: "Information about availability, allergens, minimum orders and delivery times – all automated.",
          question: '"Do you deliver to Zenica? What\'s the minimum order?"',
          answer: '"Yes, we deliver to Zenica. Minimum order is 15 KM, and delivery is free above 40 KM. Expected time: 45-60 min."'
        }
      }
    },
    security: {
      label: "Security",
      title: "Your data is safe",
      subtitle: "Chatko uses the latest security standards to protect your customers' data and your business.",
      items: {
        encryption: { title: "SSL encryption", description: "All communication between customers and Chatko is encrypted using SSL/TLS protocols." },
        gdpr: { title: "GDPR compliance", description: "Fully compliant with GDPR regulations. Customer data is not shared with third parties." },
        control: { title: "You have control", description: "All data, conversations and configurations remain under your control. You can delete them at any time." }
      }
    },
    cta: {
      title: "Ready for smarter customer support?",
      subtitle: "Contact us and find out how Chatko can transform your online sales.",
      contact: "Contact us",
      email: "info@wizionar.com"
    },
    footer: {
      wizionar: "Wizionar"
    }
  },
  de: {
    header: {
      features: "Funktionen",
      integration: "Integration",
      examples: "Beispiele",
      backToWizionar: "← Wizionar",
      contact: "Kontakt"
    },
    hero: {
      badge: "KI-Assistent für Ihren Webshop",
      title: "Ihr virtueller Verkaufsassistent",
      titleHighlight: "der niemals schläft",
      subtitle: "Chatko ist ein KI-Chat-Assistent, der sich in Ihre Website integriert. Er verbindet sich mit Ihrem Produktkatalog, kennt alles über Lieferung, Zahlung und Sonderangebote – und antwortet nur das, was Sie erlauben.",
      cta1: "Kontaktieren Sie uns",
      cta2: "Wie es funktioniert",
      trust: {
        ai: "GPT-Technologie",
        control: "Volle Kontrolle",
        integration: "Einfache Integration"
      }
    },
    features: {
      label: "Funktionen",
      title: "Alles, was Sie für einen intelligenten Chat auf Ihrer Website brauchen",
      subtitle: "Chatko ist kein generischer Chatbot – er ist auf Ihr Geschäft, Ihre Produkte und Ihre Kommunikationsregeln zugeschnitten.",
      items: {
        products: {
          title: "Produktsynchronisation",
          description: "Chatko verbindet sich mit Ihrem Webshop und zieht automatisch Produktdaten, Preise, Verfügbarkeit und Kategorien.",
          features: ["Automatischer Katalogimport", "Echtzeit-Updates", "Suche nach Name oder Kategorie", "Produktvarianten-Support"]
        },
        delivery: {
          title: "Lieferinformationen",
          description: "Geben Sie Ihre Lieferbedingungen ein – Kosten, Fristen, Lieferzonen – und Chatko antwortet Kunden präzise.",
          features: ["Lieferkosten nach Zone", "Geschätzte Lieferzeit", "Bedingungen für kostenlose Lieferung", "Sendungsverfolgung"]
        },
        payment: {
          title: "Zahlung und Bedingungen",
          description: "Definieren Sie Zahlungsmethoden, Raten, Rückgaben und Garantien. Chatko gibt Informationen genau so weiter, wie Sie es wollen.",
          features: ["Karte und Bar", "Ratenzahlung", "Rückgaberecht", "Garantien und Reklamationen"]
        },
        custom: {
          title: "Benutzerdefinierte Texte",
          description: "Fügen Sie spezielle Beschreibungen für Produkte, Marken oder Kategorien hinzu. Chatko nutzt Ihre Texte für personalisierte Antworten.",
          features: ["Markenspezifische Antworten", "Produktspezifische Hinweise", "Saisonale Nachrichten", "Individueller Kommunikationston"]
        },
        restrictions: {
          title: "Eingeschränktes Antwortsystem",
          description: "Sie definieren die Grenzen. Chatko beantwortet nur Fragen zu Ihrem Geschäft – kein Abschweifen.",
          features: ["Nur relevante Antworten", "Unangemessene Fragen blockieren", "Definierter Wissensbereich", "Eskalation an Mitarbeiter"]
        },
        analytics: {
          title: "Gesprächsanalyse",
          description: "Verfolgen Sie, was Kunden am häufigsten fragen, wo sie abbrechen und wie Chatko performt – mit detaillierten Berichten.",
          features: ["Häufigste Fragen", "Lösungsrate", "Antwortzeit", "Konversionsberichte"]
        }
      }
    },
    integration: {
      label: "Integration",
      title: "Einfache Integration in 3 Schritten",
      subtitle: "Chatko wird in wenigen Minuten auf Ihrer Website eingerichtet – ohne Programmierung oder komplizierte Einstellungen.",
      steps: {
        connect: { step: "01", title: "Shop verbinden", description: "Geben Sie Ihre Webshop-URL oder Ihren API-Schlüssel ein. Chatko importiert automatisch Ihre Produkte und Daten." },
        configure: { step: "02", title: "Regeln konfigurieren", description: "Definieren Sie Kommunikationston, Einschränkungen, Liefertexte, Zahlungsinfo und besondere Hinweise." },
        launch: { step: "03", title: "Auf der Website starten", description: "Kopieren Sie eine Zeile Code und fügen Sie sie auf Ihrer Website ein. Chatko ist bereit, Kunden zu antworten." }
      }
    },
    examples: {
      label: "Anwendungsbeispiele",
      title: "Chatko in Aktion",
      subtitle: "Sehen Sie, wie Chatko verschiedenen Arten von Online-Shops hilft.",
      items: {
        fashion: {
          title: "Online-Modeshop",
          description: "Kunde fragt nach Größen, Farbverfügbarkeit, Lieferzeit und Ratenzahlung. Chatko antwortet präzise auf Basis der Shop-Daten.",
          question: '"Haben Sie dieses Kleid in Größe M? Wie viel kostet die Lieferung?"',
          answer: '"Ja, das Kleid ist in M und L verfügbar. Lieferung ist ab 50 KM kostenlos, sonst 7 KM. Lieferung in 2-3 Werktagen."'
        },
        electronics: {
          title: "Elektronik und Technik",
          description: "Chatko kennt Spezifikationen, Garantien und Zahlungsbedingungen. Bietet Alternativen, wenn das gewünschte Produkt nicht verfügbar ist.",
          question: '"Welchen Laptop empfehlen Sie für Grafikdesign unter 2000 KM?"',
          answer: '"Ich empfehle Modell X mit 16GB RAM und dedizierter Grafik. Preis: 1.899 KM. 12 zinsfreie Raten verfügbar."'
        },
        food: {
          title: "Lebensmittellieferung",
          description: "Informationen über Verfügbarkeit, Allergene, Mindestbestellungen und Lieferzeiten – alles automatisiert.",
          question: '"Liefern Sie nach Zenica? Was ist die Mindestbestellung?"',
          answer: '"Ja, wir liefern nach Zenica. Mindestbestellung 15 KM, Lieferung ab 40 KM kostenlos. Erwartete Zeit: 45-60 Min."'
        }
      }
    },
    security: {
      label: "Sicherheit",
      title: "Ihre Daten sind sicher",
      subtitle: "Chatko verwendet modernste Sicherheitsstandards zum Schutz der Daten Ihrer Kunden und Ihres Unternehmens.",
      items: {
        encryption: { title: "SSL-Verschlüsselung", description: "Die gesamte Kommunikation zwischen Kunden und Chatko ist mit SSL/TLS verschlüsselt." },
        gdpr: { title: "GDPR-Konformität", description: "Vollständig GDPR-konform. Kundendaten werden nicht an Dritte weitergegeben." },
        control: { title: "Sie haben die Kontrolle", description: "Alle Daten, Gespräche und Konfigurationen bleiben unter Ihrer Kontrolle. Jederzeit löschbar." }
      }
    },
    cta: {
      title: "Bereit für intelligentere Kundenbetreuung?",
      subtitle: "Kontaktieren Sie uns und erfahren Sie, wie Chatko Ihren Online-Verkauf transformieren kann.",
      contact: "Kontaktieren Sie uns",
      email: "info@wizionar.com"
    },
    footer: {
      wizionar: "Wizionar"
    }
  },
  it: {
    header: {
      features: "Funzionalità",
      integration: "Integrazione",
      examples: "Esempi",
      backToWizionar: "← Wizionar",
      contact: "Contatto"
    },
    hero: {
      badge: "Assistente AI per il tuo web shop",
      title: "Il tuo assistente virtuale",
      titleHighlight: "che non dorme mai",
      subtitle: "Chatko è un assistente chat AI che si integra nel tuo sito web. Si collega al tuo catalogo prodotti, sa tutto su consegna, pagamenti e offerte speciali – e risponde solo a ciò che permetti.",
      cta1: "Contattaci",
      cta2: "Come funziona",
      trust: {
        ai: "Tecnologia GPT",
        control: "Controllo totale",
        integration: "Integrazione facile"
      }
    },
    features: {
      label: "Funzionalità",
      title: "Tutto ciò che serve per una chat intelligente sul tuo sito",
      subtitle: "Chatko non è un chatbot generico – è su misura per il tuo business, i tuoi prodotti e le tue regole di comunicazione.",
      items: {
        products: {
          title: "Sincronizzazione prodotti",
          description: "Chatko si collega al tuo web shop e importa automaticamente dati sui prodotti, prezzi, disponibilità e categorie.",
          features: ["Import automatico del catalogo", "Aggiornamenti in tempo reale", "Ricerca per nome o categoria", "Supporto varianti prodotto"]
        },
        delivery: {
          title: "Informazioni sulla consegna",
          description: "Inserisci i tuoi termini di consegna – costi, tempi, zone – e Chatko risponderà ai clienti con precisione.",
          features: ["Costi per zona", "Tempo di consegna stimato", "Condizioni spedizione gratuita", "Tracciamento spedizioni"]
        },
        payment: {
          title: "Pagamento e condizioni",
          description: "Definisci metodi di pagamento, rate, resi e garanzie. Chatko trasmette le informazioni esattamente come vuoi.",
          features: ["Carta e contanti", "Pagamento a rate", "Politica di reso", "Garanzie e reclami"]
        },
        custom: {
          title: "Testi personalizzati",
          description: "Aggiungi descrizioni speciali per prodotti, marchi o categorie. Chatko usa i tuoi testi per risposte personalizzate.",
          features: ["Risposte brandizzate", "Note specifiche per prodotto", "Messaggi stagionali", "Tono di comunicazione su misura"]
        },
        restrictions: {
          title: "Sistema di risposta limitato",
          description: "Tu definisci i confini. Chatko risponde solo a domande relative al tuo business – senza divagare.",
          features: ["Solo risposte pertinenti", "Blocco domande inappropriate", "Ambito di conoscenza definito", "Escalation a operatore"]
        },
        analytics: {
          title: "Analisi delle conversazioni",
          description: "Monitora cosa chiedono di più i clienti, dove abbandonano e come performa Chatko – con report dettagliati.",
          features: ["Domande più frequenti", "Tasso di risoluzione", "Tempo di risposta", "Report di conversione"]
        }
      }
    },
    integration: {
      label: "Integrazione",
      title: "Integrazione semplice in 3 passaggi",
      subtitle: "Chatko si configura sul tuo sito in pochi minuti – senza programmazione o impostazioni complicate.",
      steps: {
        connect: { step: "01", title: "Collega il tuo shop", description: "Inserisci l'URL del tuo web shop o la chiave API. Chatko importa automaticamente prodotti e dati." },
        configure: { step: "02", title: "Configura le regole", description: "Definisci tono di comunicazione, limitazioni, testi sulla consegna, pagamenti e note speciali." },
        launch: { step: "03", title: "Lancia sul sito", description: "Copia una riga di codice e incollala sul tuo sito. Chatko è pronto a rispondere ai clienti." }
      }
    },
    examples: {
      label: "Casi d'uso",
      title: "Chatko in azione",
      subtitle: "Scopri come Chatko aiuta diversi tipi di negozi online.",
      items: {
        fashion: {
          title: "Shop di moda online",
          description: "Il cliente chiede taglie, disponibilità colori, tempi di consegna e pagamento a rate. Chatko risponde con precisione basandosi sui dati del negozio.",
          question: '"Avete questo vestito in taglia M? Quanto costa la consegna?"',
          answer: '"Sì, il vestito è disponibile in M e L. La consegna è gratuita per ordini superiori a 50 KM, altrimenti costa 7 KM. Consegna in 2-3 giorni lavorativi."'
        },
        electronics: {
          title: "Elettronica e tecnologia",
          description: "Chatko conosce specifiche, garanzie e condizioni di pagamento. Offre alternative se il prodotto richiesto non è disponibile.",
          question: '"Quale laptop consigliate per il graphic design sotto i 2000 KM?"',
          answer: '"Consiglio il Modello X con 16GB di RAM e grafica dedicata. Prezzo: 1.899 KM. 12 rate senza interessi disponibili."'
        },
        food: {
          title: "Consegna cibo e alimentari",
          description: "Informazioni su disponibilità, allergeni, ordini minimi e tempi di consegna – tutto automatizzato.",
          question: '"Consegnate a Zenica? Qual è l\'ordine minimo?"',
          answer: '"Sì, consegniamo a Zenica. Ordine minimo 15 KM, consegna gratuita sopra i 40 KM. Tempo previsto: 45-60 min."'
        }
      }
    },
    security: {
      label: "Sicurezza",
      title: "I tuoi dati sono al sicuro",
      subtitle: "Chatko utilizza i più moderni standard di sicurezza per proteggere i dati dei tuoi clienti e del tuo business.",
      items: {
        encryption: { title: "Crittografia SSL", description: "Tutta la comunicazione tra clienti e Chatko è crittografata con protocolli SSL/TLS." },
        gdpr: { title: "Conformità GDPR", description: "Pienamente conforme alle normative GDPR. I dati dei clienti non vengono condivisi con terzi." },
        control: { title: "Tu hai il controllo", description: "Tutti i dati, le conversazioni e le configurazioni restano sotto il tuo controllo. Cancellabili in qualsiasi momento." }
      }
    },
    cta: {
      title: "Pronti per un'assistenza clienti più intelligente?",
      subtitle: "Contattaci e scopri come Chatko può trasformare le tue vendite online.",
      contact: "Contattaci",
      email: "info@wizionar.com"
    },
    footer: {
      wizionar: "Wizionar"
    }
  }
};
const useChatkoTranslations = () => {
  const { language } = useLanguage();
  return chatkoTranslations[language];
};
const Chatko = () => {
  const t = useChatkoTranslations();
  const { language } = useLanguage();
  const seo = getPageSeo("chatko", language);
  return /* @__PURE__ */ jsxs("div", { className: "chatko-theme min-h-screen bg-background text-foreground", children: [
    /* @__PURE__ */ jsx(
      SEOHead,
      {
        title: seo.title,
        description: seo.description,
        schema: [
          createSoftwareApplicationSchema({
            language,
            name: "Chatko",
            description: seo.description,
            path: SEO_PATHS.chatko,
            category: "BusinessApplication"
          }),
          createWebPageSchema({
            language,
            path: SEO_PATHS.chatko,
            title: seo.title,
            description: seo.description
          }),
          createBreadcrumbSchema(language, [
            { name: getSeoLabel(language, "home"), path: SEO_PATHS.home },
            { name: "Chatko", path: SEO_PATHS.chatko }
          ])
        ]
      }
    ),
    /* @__PURE__ */ jsx(
      motion.header,
      {
        initial: { opacity: 0, y: -20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 },
        className: "fixed top-0 left-0 right-0 z-50 border-b border-ck-border bg-ck-background/80 backdrop-blur-xl",
        children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 py-4 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs(LocalizedLink, { to: "/chatko", className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-lg bg-violet flex items-center justify-center", children: /* @__PURE__ */ jsx(MessageCircle, { className: "w-4 h-4 text-white" }) }),
            /* @__PURE__ */ jsx("span", { className: "text-xl font-bold text-ck-foreground", children: "Chatko" })
          ] }),
          /* @__PURE__ */ jsxs("nav", { className: "hidden md:flex items-center gap-8", children: [
            /* @__PURE__ */ jsx("a", { href: "#features", className: "text-sm text-ck-muted-foreground hover:text-ck-foreground transition-colors", children: t.header.features }),
            /* @__PURE__ */ jsx("a", { href: "#integration", className: "text-sm text-ck-muted-foreground hover:text-ck-foreground transition-colors", children: t.header.integration }),
            /* @__PURE__ */ jsx("a", { href: "#examples", className: "text-sm text-ck-muted-foreground hover:text-ck-foreground transition-colors", children: t.header.examples }),
            /* @__PURE__ */ jsx(LocalizedLink, { to: "/", className: "text-sm text-violet hover:text-violet-glow transition-colors", children: t.header.backToWizionar })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsx(LanguageSwitcher, {}),
            /* @__PURE__ */ jsx(Button, { size: "sm", className: "hidden sm:flex bg-violet hover:bg-violet-glow text-white", asChild: true, children: /* @__PURE__ */ jsx("a", { href: "mailto:info@wizionar.com", children: t.header.contact }) })
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxs("main", { children: [
      /* @__PURE__ */ jsxs("section", { className: "relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-ck-background", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-violet-hero" }),
        /* @__PURE__ */ jsx("div", { className: "absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-violet/10 rounded-full blur-[120px] animate-pulse" }),
        /* @__PURE__ */ jsx("div", { className: "container mx-auto px-6 relative z-10", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto text-center", children: [
          /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.5, delay: 0.1 },
              className: "inline-flex items-center gap-2 px-4 py-2 rounded-full border border-ck-border bg-ck-secondary/50 mb-8",
              children: [
                /* @__PURE__ */ jsx("span", { className: "w-2 h-2 rounded-full bg-violet animate-pulse" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm text-ck-muted-foreground", children: t.hero.badge })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            motion.h1,
            {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.6, delay: 0.2 },
              className: "text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-ck-foreground",
              children: [
                t.hero.title,
                " ",
                /* @__PURE__ */ jsx("span", { className: "text-gradient-violet", children: t.hero.titleHighlight })
              ]
            }
          ),
          /* @__PURE__ */ jsx(
            motion.p,
            {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.6, delay: 0.3 },
              className: "text-lg md:text-xl text-ck-muted-foreground max-w-2xl mx-auto mb-10",
              children: t.hero.subtitle
            }
          ),
          /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.6, delay: 0.4 },
              className: "flex flex-col sm:flex-row items-center justify-center gap-4 mb-16",
              children: [
                /* @__PURE__ */ jsx(Button, { size: "xl", className: "group bg-violet hover:bg-violet-glow text-white", asChild: true, children: /* @__PURE__ */ jsxs("a", { href: "mailto:info@wizionar.com", children: [
                  t.hero.cta1,
                  /* @__PURE__ */ jsx(ArrowRight, { className: "w-5 h-5 group-hover:translate-x-1 transition-transform" })
                ] }) }),
                /* @__PURE__ */ jsx(Button, { variant: "outline", size: "xl", className: "border-ck-border text-ck-foreground hover:bg-ck-secondary", asChild: true, children: /* @__PURE__ */ jsx("a", { href: "#integration", children: t.hero.cta2 }) })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              transition: { duration: 0.8, delay: 0.6 },
              className: "grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto",
              children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-3 p-4 rounded-xl bg-ck-secondary/30 border border-ck-border/50", children: [
                  /* @__PURE__ */ jsx(Sparkles, { className: "w-5 h-5 text-violet" }),
                  /* @__PURE__ */ jsx("span", { className: "text-sm text-ck-muted-foreground", children: t.hero.trust.ai })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-3 p-4 rounded-xl bg-ck-secondary/30 border border-ck-border/50", children: [
                  /* @__PURE__ */ jsx(ShieldCheck, { className: "w-5 h-5 text-violet" }),
                  /* @__PURE__ */ jsx("span", { className: "text-sm text-ck-muted-foreground", children: t.hero.trust.control })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-3 p-4 rounded-xl bg-ck-secondary/30 border border-ck-border/50", children: [
                  /* @__PURE__ */ jsx(Plug, { className: "w-5 h-5 text-violet" }),
                  /* @__PURE__ */ jsx("span", { className: "text-sm text-ck-muted-foreground", children: t.hero.trust.integration })
                ] })
              ]
            }
          )
        ] }) })
      ] }),
      /* @__PURE__ */ jsx("section", { id: "features", className: "py-24 bg-ck-card", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6", children: [
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            className: "text-center mb-16",
            children: [
              /* @__PURE__ */ jsx("span", { className: "inline-block text-violet text-sm font-semibold uppercase tracking-wider mb-4", children: t.features.label }),
              /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold mb-4 text-ck-foreground", children: t.features.title }),
              /* @__PURE__ */ jsx("p", { className: "text-ck-muted-foreground max-w-2xl mx-auto", children: t.features.subtitle })
            ]
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto", children: [
          { icon: ShoppingCart, ...t.features.items.products },
          { icon: Truck, ...t.features.items.delivery },
          { icon: CreditCard, ...t.features.items.payment },
          { icon: FileText, ...t.features.items.custom },
          { icon: Eye, ...t.features.items.restrictions },
          { icon: BarChart3, ...t.features.items.analytics }
        ].map((item, index) => /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { delay: index * 0.1 },
            className: "p-6 rounded-xl bg-ck-background border border-ck-border hover:border-violet/50 transition-colors",
            children: [
              /* @__PURE__ */ jsx(item.icon, { className: "w-8 h-8 text-violet mb-4" }),
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold mb-2 text-ck-foreground", children: item.title }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-ck-muted-foreground mb-4", children: item.description }),
              /* @__PURE__ */ jsx("ul", { className: "space-y-2", children: item.features.map((feature, fIndex) => /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2 text-sm text-ck-muted-foreground", children: [
                /* @__PURE__ */ jsx(CheckCircle, { className: "w-4 h-4 text-violet shrink-0" }),
                feature
              ] }, fIndex)) })
            ]
          },
          index
        )) })
      ] }) }),
      /* @__PURE__ */ jsx("section", { id: "integration", className: "py-24 bg-ck-background", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6", children: [
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            className: "text-center mb-16",
            children: [
              /* @__PURE__ */ jsx("span", { className: "inline-block text-violet text-sm font-semibold uppercase tracking-wider mb-4", children: t.integration.label }),
              /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold mb-4 text-ck-foreground", children: t.integration.title }),
              /* @__PURE__ */ jsx("p", { className: "text-ck-muted-foreground max-w-2xl mx-auto", children: t.integration.subtitle })
            ]
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-3 gap-8 max-w-5xl mx-auto", children: [
          { icon: Plug, ...t.integration.steps.connect },
          { icon: Settings, ...t.integration.steps.configure },
          { icon: Rocket, ...t.integration.steps.launch }
        ].map((item, index) => /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { delay: index * 0.15 },
            className: "relative p-8 rounded-2xl bg-ck-card border border-ck-border text-center",
            children: [
              /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-full bg-violet/15 flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsx("span", { className: "text-lg font-bold text-violet", children: item.step }) }),
              /* @__PURE__ */ jsx(item.icon, { className: "w-8 h-8 text-violet mx-auto mb-4" }),
              /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold mb-3 text-ck-foreground", children: item.title }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-ck-muted-foreground", children: item.description })
            ]
          },
          index
        )) })
      ] }) }),
      /* @__PURE__ */ jsx("section", { id: "examples", className: "py-24 bg-ck-card", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6", children: [
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            className: "text-center mb-16",
            children: [
              /* @__PURE__ */ jsx("span", { className: "inline-block text-violet text-sm font-semibold uppercase tracking-wider mb-4", children: t.examples.label }),
              /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold mb-4 text-ck-foreground", children: t.examples.title }),
              /* @__PURE__ */ jsx("p", { className: "text-ck-muted-foreground max-w-2xl mx-auto", children: t.examples.subtitle })
            ]
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-3 gap-6 max-w-6xl mx-auto", children: [t.examples.items.fashion, t.examples.items.electronics, t.examples.items.food].map((item, index) => /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { delay: index * 0.1 },
            className: "p-6 rounded-xl bg-ck-background border border-ck-border",
            children: [
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold mb-2 text-ck-foreground", children: item.title }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-ck-muted-foreground mb-6", children: item.description }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                /* @__PURE__ */ jsx("div", { className: "p-3 rounded-lg bg-ck-secondary/50 border border-ck-border/50", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-2", children: [
                  /* @__PURE__ */ jsx(MessageSquare, { className: "w-4 h-4 text-ck-muted-foreground mt-0.5 shrink-0" }),
                  /* @__PURE__ */ jsx("p", { className: "text-sm italic text-ck-muted-foreground", children: item.question })
                ] }) }),
                /* @__PURE__ */ jsx("div", { className: "p-3 rounded-lg bg-violet/10 border border-violet/20", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-2", children: [
                  /* @__PURE__ */ jsx(MessageCircle, { className: "w-4 h-4 text-violet mt-0.5 shrink-0" }),
                  /* @__PURE__ */ jsx("p", { className: "text-sm text-ck-foreground", children: item.answer })
                ] }) })
              ] })
            ]
          },
          index
        )) })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "py-24 bg-ck-background", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6", children: [
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            className: "text-center mb-16",
            children: [
              /* @__PURE__ */ jsx("span", { className: "inline-block text-violet text-sm font-semibold uppercase tracking-wider mb-4", children: t.security.label }),
              /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold mb-4 text-ck-foreground", children: t.security.title }),
              /* @__PURE__ */ jsx("p", { className: "text-ck-muted-foreground max-w-2xl mx-auto", children: t.security.subtitle })
            ]
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-3 gap-6 max-w-4xl mx-auto", children: [
          { icon: Lock, ...t.security.items.encryption },
          { icon: ShieldCheck, ...t.security.items.gdpr },
          { icon: Eye, ...t.security.items.control }
        ].map((item, index) => /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { delay: index * 0.1 },
            className: "p-6 rounded-xl bg-ck-card border border-ck-border",
            children: [
              /* @__PURE__ */ jsx(item.icon, { className: "w-8 h-8 text-violet mb-4" }),
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold mb-2 text-ck-foreground", children: item.title }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-ck-muted-foreground", children: item.description })
            ]
          },
          index
        )) })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "py-24 bg-ck-card", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-6", children: /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          className: "max-w-2xl mx-auto text-center",
          children: [
            /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold mb-4 text-ck-foreground", children: t.cta.title }),
            /* @__PURE__ */ jsx("p", { className: "text-ck-muted-foreground mb-8", children: t.cta.subtitle }),
            /* @__PURE__ */ jsx(Button, { size: "xl", className: "group bg-violet hover:bg-violet-glow text-white", asChild: true, children: /* @__PURE__ */ jsxs("a", { href: "mailto:info@wizionar.com", children: [
              t.cta.contact,
              /* @__PURE__ */ jsx(ArrowRight, { className: "w-5 h-5 group-hover:translate-x-1 transition-transform" })
            ] }) })
          ]
        }
      ) }) })
    ] }),
    /* @__PURE__ */ jsx("footer", { className: "border-t border-ck-border py-8 bg-ck-background", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsx("p", { className: "text-sm text-ck-muted-foreground", children: "© 2025 Chatko by Wizionar" }),
      /* @__PURE__ */ jsx(LocalizedLink, { to: "/", className: "text-sm text-violet hover:text-violet-glow transition-colors", children: t.footer.wizionar })
    ] }) })
  ] });
};
const Chatko$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Chatko
}, Symbol.toStringTag, { value: "Module" }));
const uslugeTranslations = {
  sr: {
    hero: {
      badge: "Naše usluge",
      title1: "Kompletna digitalna",
      titleHighlight: "rješenja za vaš biznis",
      subtitle: "Od ideje do realizacije – nudimo širok spektar digitalnih usluga koje pomažu vašem biznisu da raste i uspijeva u digitalnom svijetu.",
      cta: "Kontaktirajte nas za ponudu"
    },
    services: [
      {
        title: "Izrada web stranica & web shopova",
        description: "Moderan dizajn, brze performanse i potpuna responzivnost. Od prezentacijskih sajtova i landing stranica do kompletnih e-commerce rješenja.",
        features: ["Responzivan dizajn", "CMS & custom razvoj", "SEO optimizacija", "E-commerce"]
      },
      {
        title: "Web shopovi",
        description: "Kompletna e-commerce rješenja sa upravljanjem proizvodima, narudžbama, plaćanjima i dostavom. Sve što vam treba za online prodaju.",
        features: ["Upravljanje proizvodima", "Online plaćanje", "Praćenje narudžbi", "Integracija dostave"]
      },
      {
        title: "SEO optimizacija",
        description: "Tehnička i sadržajna optimizacija za pretraživače. Povećajte vidljivost i privucite više organskog saobraćaja na vaš sajt.",
        features: ["Tehnički SEO", "On-page optimizacija", "Analitika", "Izvještavanje"]
      },
      {
        title: "Mobilne aplikacije",
        description: "Razvoj mobilnih aplikacija za iOS i Android. Intuitivno korisničko iskustvo prilagođeno vašim poslovnim potrebama.",
        features: ["iOS & Android", "Push notifikacije", "Offline pristup", "App Store objava"]
      },
      {
        title: "UI/UX dizajn",
        description: "Kreiranje korisničkog interfejsa koji je lijep i funkcionalan. Od wireframe-a do finalnog dizajna sa fokusom na korisničko iskustvo.",
        features: ["Wireframing", "Prototipovi", "Korisnički testovi", "Dizajn sistemi"]
      },
      {
        title: "Grafički dizajn",
        description: "Kompletna grafička rješenja za vaš brend – od logotipa i vizuelnog identiteta do štampanih materijala, social media grafika i pakovanja.",
        features: ["Logo & branding", "Vizitke & flajeri", "Social media grafike", "Packaging dizajn"]
      },
      {
        title: "Digitalni marketing",
        description: "Strategije digitalnog marketinga prilagođene vašem biznisu. Google Ads, društvene mreže i content marketing.",
        features: ["Google Ads", "Social media", "Email marketing", "Content strategija"]
      },
      {
        title: "Hosting i održavanje",
        description: "Pouzdano hostovanje i redovno održavanje vaših web aplikacija. Sigurnosni update-i, backup i monitoring.",
        features: ["Cloud hosting", "SSL certifikati", "Backup sistema", "24/7 monitoring"]
      },
      {
        title: "IT konsalting",
        description: "Savjetovanje i planiranje IT infrastrukture. Pomažemo vam da donesete prave tehnološke odluke za vaš biznis.",
        features: ["Analiza potreba", "Tehnološki plan", "Odabir alata", "Implementacija"]
      }
    ],
    learnMore: "Saznajte više",
    cta: {
      text: "Imate projekat na umu? Javite nam se za besplatnu konsultaciju."
    }
  },
  en: {
    hero: {
      badge: "Our Services",
      title1: "Complete digital",
      titleHighlight: "solutions for your business",
      subtitle: "From idea to execution – we offer a wide range of digital services that help your business grow and thrive in the digital world.",
      cta: "Contact us for a quote"
    },
    services: [
      {
        title: "Website & Web Shop Development",
        description: "Modern design, fast performance, and full responsiveness. From presentation sites and landing pages to complete e-commerce solutions.",
        features: ["Responsive design", "CMS & custom dev", "SEO optimization", "E-commerce"]
      },
      {
        title: "Web Shops",
        description: "Complete e-commerce solutions with product management, orders, payments, and delivery. Everything you need for online sales.",
        features: ["Product management", "Online payments", "Order tracking", "Delivery integration"]
      },
      {
        title: "SEO Optimization",
        description: "Technical and content optimization for search engines. Increase visibility and attract more organic traffic to your site.",
        features: ["Technical SEO", "On-page optimization", "Analytics", "Reporting"]
      },
      {
        title: "Mobile Applications",
        description: "Mobile app development for iOS and Android. Intuitive user experience tailored to your business needs.",
        features: ["iOS & Android", "Push notifications", "Offline access", "App Store publishing"]
      },
      {
        title: "UI/UX Design",
        description: "Creating user interfaces that are beautiful and functional. From wireframes to final designs with a focus on user experience.",
        features: ["Wireframing", "Prototypes", "User testing", "Design systems"]
      },
      {
        title: "Graphic Design",
        description: "Complete graphic solutions for your brand – from logos and visual identity to printed materials, social media graphics, and packaging.",
        features: ["Logo & branding", "Business cards & flyers", "Social media graphics", "Packaging design"]
      },
      {
        title: "Digital Marketing",
        description: "Digital marketing strategies tailored to your business. Google Ads, social media, and content marketing.",
        features: ["Google Ads", "Social media", "Email marketing", "Content strategy"]
      },
      {
        title: "Hosting & Maintenance",
        description: "Reliable hosting and regular maintenance of your web applications. Security updates, backups, and monitoring.",
        features: ["Cloud hosting", "SSL certificates", "System backups", "24/7 monitoring"]
      },
      {
        title: "IT Consulting",
        description: "IT infrastructure consulting and planning. We help you make the right technology decisions for your business.",
        features: ["Needs analysis", "Technology plan", "Tool selection", "Implementation"]
      }
    ],
    learnMore: "Learn more",
    cta: {
      text: "Have a project in mind? Contact us for a free consultation."
    }
  },
  de: {
    hero: {
      badge: "Unsere Dienstleistungen",
      title1: "Komplette digitale",
      titleHighlight: "Lösungen für Ihr Unternehmen",
      subtitle: "Von der Idee bis zur Umsetzung – wir bieten ein breites Spektrum an digitalen Dienstleistungen, die Ihrem Unternehmen helfen, in der digitalen Welt zu wachsen und erfolgreich zu sein.",
      cta: "Kontaktieren Sie uns für ein Angebot"
    },
    services: [
      {
        title: "Website- & Webshop-Entwicklung",
        description: "Modernes Design, schnelle Performance und volle Responsivität. Von Präsentationsseiten und Landingpages bis hin zu kompletten E-Commerce-Lösungen.",
        features: ["Responsives Design", "CMS & individuelle Entwicklung", "SEO-Optimierung", "E-Commerce"]
      },
      {
        title: "Webshops",
        description: "Komplette E-Commerce-Lösungen mit Produktverwaltung, Bestellungen, Zahlungen und Lieferung. Alles, was Sie für den Online-Verkauf benötigen.",
        features: ["Produktverwaltung", "Online-Zahlung", "Bestellverfolgung", "Lieferintegration"]
      },
      {
        title: "SEO-Optimierung",
        description: "Technische und inhaltliche Optimierung für Suchmaschinen. Erhöhen Sie die Sichtbarkeit und gewinnen Sie mehr organischen Traffic.",
        features: ["Technisches SEO", "On-Page-Optimierung", "Analytik", "Berichterstattung"]
      },
      {
        title: "Mobile Anwendungen",
        description: "Entwicklung mobiler Anwendungen für iOS und Android. Intuitive Benutzererfahrung, angepasst an Ihre Geschäftsanforderungen.",
        features: ["iOS & Android", "Push-Benachrichtigungen", "Offline-Zugang", "App Store Veröffentlichung"]
      },
      {
        title: "UI/UX Design",
        description: "Erstellung von Benutzeroberflächen, die schön und funktional sind. Von Wireframes bis zum finalen Design mit Fokus auf Benutzererfahrung.",
        features: ["Wireframing", "Prototypen", "Benutzertests", "Designsysteme"]
      },
      {
        title: "Grafikdesign",
        description: "Komplette Grafiklösungen für Ihre Marke – von Logo und visueller Identität bis hin zu Druckmaterialien, Social-Media-Grafiken und Verpackung.",
        features: ["Logo & Branding", "Visitenkarten & Flyer", "Social Media Grafiken", "Verpackungsdesign"]
      },
      {
        title: "Digitales Marketing",
        description: "Digitale Marketingstrategien, die auf Ihr Unternehmen zugeschnitten sind. Google Ads, soziale Medien und Content-Marketing.",
        features: ["Google Ads", "Social Media", "E-Mail-Marketing", "Content-Strategie"]
      },
      {
        title: "Hosting & Wartung",
        description: "Zuverlässiges Hosting und regelmäßige Wartung Ihrer Webanwendungen. Sicherheitsupdates, Backups und Monitoring.",
        features: ["Cloud Hosting", "SSL-Zertifikate", "Systembackups", "24/7 Monitoring"]
      },
      {
        title: "IT-Beratung",
        description: "Beratung und Planung der IT-Infrastruktur. Wir helfen Ihnen, die richtigen Technologieentscheidungen für Ihr Unternehmen zu treffen.",
        features: ["Bedarfsanalyse", "Technologieplan", "Werkzeugauswahl", "Implementierung"]
      }
    ],
    learnMore: "Mehr erfahren",
    cta: {
      text: "Haben Sie ein Projekt im Sinn? Kontaktieren Sie uns für eine kostenlose Beratung."
    }
  },
  it: {
    hero: {
      badge: "I nostri servizi",
      title1: "Soluzioni digitali",
      titleHighlight: "complete per il tuo business",
      subtitle: "Dall'idea alla realizzazione – offriamo un'ampia gamma di servizi digitali che aiutano la tua azienda a crescere e prosperare nel mondo digitale.",
      cta: "Contattaci per un preventivo"
    },
    services: [
      {
        title: "Sviluppo siti web & e-commerce",
        description: "Design moderno, prestazioni veloci e piena reattività. Dai siti di presentazione e landing page a soluzioni e-commerce complete.",
        features: ["Design responsive", "CMS & sviluppo custom", "Ottimizzazione SEO", "E-commerce"]
      },
      {
        title: "E-commerce",
        description: "Soluzioni e-commerce complete con gestione prodotti, ordini, pagamenti e consegne. Tutto il necessario per vendere online.",
        features: ["Gestione prodotti", "Pagamenti online", "Tracciamento ordini", "Integrazione consegne"]
      },
      {
        title: "Ottimizzazione SEO",
        description: "Ottimizzazione tecnica e dei contenuti per i motori di ricerca. Aumenta la visibilità e attira più traffico organico al tuo sito.",
        features: ["SEO tecnico", "Ottimizzazione on-page", "Analisi", "Reportistica"]
      },
      {
        title: "Applicazioni mobili",
        description: "Sviluppo di applicazioni mobili per iOS e Android. Esperienza utente intuitiva adattata alle esigenze della tua azienda.",
        features: ["iOS & Android", "Notifiche push", "Accesso offline", "Pubblicazione App Store"]
      },
      {
        title: "UI/UX Design",
        description: "Creazione di interfacce utente belle e funzionali. Dal wireframe al design finale con focus sull'esperienza utente.",
        features: ["Wireframing", "Prototipi", "Test utente", "Sistemi di design"]
      },
      {
        title: "Graphic Design",
        description: "Soluzioni grafiche complete per il tuo brand – dal logo e identità visiva ai materiali stampati, grafiche social media e packaging.",
        features: ["Logo & branding", "Biglietti da visita & volantini", "Grafiche social media", "Design packaging"]
      },
      {
        title: "Marketing digitale",
        description: "Strategie di marketing digitale su misura per la tua azienda. Google Ads, social media e content marketing.",
        features: ["Google Ads", "Social media", "Email marketing", "Strategia dei contenuti"]
      },
      {
        title: "Hosting e manutenzione",
        description: "Hosting affidabile e manutenzione regolare delle tue applicazioni web. Aggiornamenti di sicurezza, backup e monitoraggio.",
        features: ["Cloud hosting", "Certificati SSL", "Backup di sistema", "Monitoraggio 24/7"]
      },
      {
        title: "Consulenza IT",
        description: "Consulenza e pianificazione dell'infrastruttura IT. Ti aiutiamo a prendere le giuste decisioni tecnologiche per la tua azienda.",
        features: ["Analisi delle esigenze", "Piano tecnologico", "Selezione strumenti", "Implementazione"]
      }
    ],
    learnMore: "Scopri di più",
    cta: {
      text: "Hai un progetto in mente? Contattaci per una consulenza gratuita."
    }
  }
};
const useUslugeTranslations = () => {
  const { language } = useLanguage();
  return uslugeTranslations[language];
};
const serviceIcons$1 = [Globe, ShoppingCart, Search, Smartphone, PenTool, Palette, BarChart3, Server, Headphones];
const serviceLinks = [
  "/usluge/izrada-web-stranica",
  "/usluge/izrada-web-stranica",
  "/usluge/seo-optimizacija",
  null,
  null,
  "/usluge/graficki-dizajn",
  null,
  null,
  null
];
const Usluge = () => {
  const t = useUslugeTranslations();
  const { language } = useLanguage();
  const seo = getPageSeo("usluge", language);
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-background text-foreground", children: [
    /* @__PURE__ */ jsx(
      SEOHead,
      {
        title: seo.title,
        description: seo.description,
        schema: [
          createServiceSchema({
            language,
            name: seo.title,
            description: seo.description,
            path: SEO_PATHS.usluge,
            serviceType: seo.title
          }),
          createWebPageSchema({
            language,
            path: SEO_PATHS.usluge,
            title: seo.title,
            description: seo.description
          }),
          createBreadcrumbSchema(language, [
            { name: getSeoLabel(language, "home"), path: SEO_PATHS.home },
            { name: getSeoLabel(language, "services"), path: SEO_PATHS.usluge }
          ])
        ]
      }
    ),
    /* @__PURE__ */ jsx(WizionarHeader, {}),
    /* @__PURE__ */ jsxs("main", { children: [
      /* @__PURE__ */ jsxs("section", { className: "pt-32 pb-20 relative overflow-hidden", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" }),
        /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 relative z-10 text-center", children: [
          /* @__PURE__ */ jsx(
            motion.span,
            {
              initial: { opacity: 0, y: 10 },
              animate: { opacity: 1, y: 0 },
              className: "inline-block text-primary text-sm font-semibold uppercase tracking-wider mb-4",
              children: t.hero.badge
            }
          ),
          /* @__PURE__ */ jsxs(
            motion.h1,
            {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.1 },
              className: "text-4xl md:text-6xl font-bold mb-6 leading-tight",
              children: [
                t.hero.title1,
                " ",
                /* @__PURE__ */ jsx("br", {}),
                /* @__PURE__ */ jsx("span", { className: "text-gradient", children: t.hero.titleHighlight })
              ]
            }
          ),
          /* @__PURE__ */ jsx(
            motion.p,
            {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.2 },
              className: "text-lg text-muted-foreground max-w-2xl mx-auto mb-8",
              children: t.hero.subtitle
            }
          ),
          /* @__PURE__ */ jsxs(
            motion.a,
            {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.3 },
              href: "mailto:info@wizionar.com",
              className: "inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all",
              children: [
                /* @__PURE__ */ jsx(Mail, { className: "w-5 h-5" }),
                t.hero.cta,
                /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsx("section", { className: "pb-32", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6", children: [
        /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto", children: t.services.map((service, index) => {
          const Icon = serviceIcons$1[index];
          const link = serviceLinks[index];
          return /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { duration: 0.4, delay: index * 0.08 },
              className: "group p-6 rounded-2xl border border-border bg-card hover:border-primary/20 hover:shadow-lg transition-all duration-300 flex flex-col",
              children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-3", children: [
                  /* @__PURE__ */ jsx("div", { className: "w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors", children: /* @__PURE__ */ jsx(Icon, { className: "w-5 h-5 text-primary" }) }),
                  /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold leading-tight", children: service.title })
                ] }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mb-4 leading-relaxed flex-grow", children: service.description }),
                /* @__PURE__ */ jsx("ul", { className: "space-y-2 mb-4", children: service.features.map((f) => /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [
                  /* @__PURE__ */ jsx(CheckCircle2, { className: "w-4 h-4 text-primary shrink-0" }),
                  f
                ] }, f)) }),
                link && /* @__PURE__ */ jsxs(
                  LocalizedLink,
                  {
                    to: link,
                    className: "inline-flex items-center gap-1 text-sm text-primary font-medium hover:gap-2 transition-all mt-auto",
                    children: [
                      t.learnMore,
                      " ",
                      /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
                    ]
                  }
                )
              ]
            },
            index
          );
        }) }),
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            className: "mt-20 text-center",
            children: [
              /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mb-4", children: t.cta.text }),
              /* @__PURE__ */ jsxs(
                "a",
                {
                  href: "mailto:info@wizionar.com",
                  className: "inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity",
                  children: [
                    /* @__PURE__ */ jsx(Mail, { className: "w-5 h-5" }),
                    "info@wizionar.com"
                  ]
                }
              )
            ]
          }
        )
      ] }) })
    ] }),
    /* @__PURE__ */ jsx(WizionarFooter, {})
  ] });
};
const Usluge$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Usluge
}, Symbol.toStringTag, { value: "Module" }));
const Accordion = AccordionPrimitive.Root;
const AccordionItem = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(AccordionPrimitive.Item, { ref, className: cn("border-b", className), ...props }));
AccordionItem.displayName = "AccordionItem";
const AccordionTrigger = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsx(AccordionPrimitive.Header, { className: "flex", children: /* @__PURE__ */ jsxs(
  AccordionPrimitive.Trigger,
  {
    ref,
    className: cn(
      "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4 shrink-0 transition-transform duration-200" })
    ]
  }
) }));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;
const AccordionContent = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsx(
  AccordionPrimitive.Content,
  {
    ref,
    className: "overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
    ...props,
    children: /* @__PURE__ */ jsx("div", { className: cn("pb-4 pt-0", className), children })
  }
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;
const useSeoTranslations = () => {
  const { language } = useLanguage();
  return seoTranslations[language];
};
const fadeUp$3 = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 }
  })
};
const meaningIcons = [Users, Target, TrendingUp, Shield];
const approachIcons = [Search, Target, FileText, Settings, PenTool, Link2, MapPin];
const SEOOptimizacija = () => {
  const t = useSeoTranslations();
  const { language } = useLanguage();
  const seo = getPageSeo("seoOptimization", language);
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-background text-foreground", children: [
    /* @__PURE__ */ jsx(
      SEOHead,
      {
        title: seo.title,
        description: seo.description,
        schema: [
          createServiceSchema({
            language,
            name: seo.title,
            description: seo.description,
            path: SEO_PATHS.seoOptimization,
            serviceType: getSeoLabel(language, "seo")
          }),
          createWebPageSchema({
            language,
            path: SEO_PATHS.seoOptimization,
            title: seo.title,
            description: seo.description
          }),
          createBreadcrumbSchema(language, [
            { name: getSeoLabel(language, "home"), path: SEO_PATHS.home },
            { name: getSeoLabel(language, "services"), path: SEO_PATHS.usluge },
            { name: getSeoLabel(language, "seo"), path: SEO_PATHS.seoOptimization }
          ]),
          createFaqSchema(t.faq.items.map((item) => ({ question: item.q, answer: item.a })))
        ]
      }
    ),
    /* @__PURE__ */ jsx(WizionarHeader, {}),
    /* @__PURE__ */ jsxs("main", { children: [
      /* @__PURE__ */ jsxs("section", { className: "pt-32 pb-20 relative overflow-hidden", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" }),
        /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 relative z-10 max-w-4xl text-center", children: [
          /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: "hidden",
              animate: "visible",
              variants: fadeUp$3,
              custom: 0,
              className: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6",
              children: [
                /* @__PURE__ */ jsx(Search, { className: "w-4 h-4" }),
                t.hero.badge
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            motion.h1,
            {
              initial: "hidden",
              animate: "visible",
              variants: fadeUp$3,
              custom: 1,
              className: "text-4xl md:text-6xl font-bold mb-6 leading-tight",
              children: [
                t.hero.title1,
                " ",
                /* @__PURE__ */ jsx("span", { className: "text-gradient", children: t.hero.titleHighlight })
              ]
            }
          ),
          /* @__PURE__ */ jsx(
            motion.p,
            {
              initial: "hidden",
              animate: "visible",
              variants: fadeUp$3,
              custom: 2,
              className: "text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-4",
              children: t.hero.subtitle
            }
          ),
          /* @__PURE__ */ jsx(
            motion.p,
            {
              initial: "hidden",
              animate: "visible",
              variants: fadeUp$3,
              custom: 3,
              className: "text-xl md:text-2xl font-semibold text-foreground mb-8",
              children: t.hero.subtitleBold
            }
          ),
          /* @__PURE__ */ jsxs(
            motion.a,
            {
              initial: "hidden",
              animate: "visible",
              variants: fadeUp$3,
              custom: 4,
              href: "mailto:info@wizionar.com?subject=SEO%20analiza",
              className: "inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity shadow-glow",
              children: [
                t.hero.cta,
                /* @__PURE__ */ jsx(ArrowRight, { className: "w-5 h-5" })
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsx("section", { className: "py-20", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-6 max-w-3xl", children: /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: "hidden",
          whileInView: "visible",
          viewport: { once: true },
          variants: fadeUp$3,
          className: "space-y-5 text-lg text-muted-foreground leading-relaxed",
          children: [
            /* @__PURE__ */ jsxs("p", { children: [
              t.context.p1,
              " ",
              /* @__PURE__ */ jsx("strong", { className: "text-foreground", children: t.context.p1Bold }),
              " ",
              t.context.p1End
            ] }),
            /* @__PURE__ */ jsxs("p", { children: [
              t.context.p2,
              " ",
              /* @__PURE__ */ jsx("strong", { className: "text-foreground", children: t.context.p2Bold }),
              "."
            ] }),
            /* @__PURE__ */ jsxs("p", { children: [
              t.context.p3,
              " ",
              /* @__PURE__ */ jsx("strong", { className: "text-foreground", children: t.context.p3Bold }),
              "."
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-foreground font-medium text-xl border-l-4 border-primary pl-5", children: t.context.quote })
          ]
        }
      ) }) }),
      /* @__PURE__ */ jsx("section", { className: "py-20 bg-secondary/30", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 max-w-4xl", children: [
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: "hidden",
            whileInView: "visible",
            viewport: { once: true },
            variants: fadeUp$3,
            className: "text-center mb-12",
            children: [
              /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold mb-4", children: t.meaning.title }),
              /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-lg", children: t.meaning.subtitle })
            ]
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 gap-6", children: t.meaning.items.map((text, i) => {
          const Icon = meaningIcons[i];
          return /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: "hidden",
              whileInView: "visible",
              viewport: { once: true },
              variants: fadeUp$3,
              custom: i,
              className: "flex items-start gap-4 p-6 rounded-2xl border border-border bg-card",
              children: [
                /* @__PURE__ */ jsx("div", { className: "w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsx(Icon, { className: "w-5 h-5 text-primary" }) }),
                /* @__PURE__ */ jsx("p", { className: "text-foreground font-medium", children: text })
              ]
            },
            i
          );
        }) })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "py-24", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 max-w-5xl", children: [
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: "hidden",
            whileInView: "visible",
            viewport: { once: true },
            variants: fadeUp$3,
            className: "text-center mb-16",
            children: [
              /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold mb-4", children: t.approach.title }),
              /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-lg max-w-2xl mx-auto", children: t.approach.subtitle })
            ]
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "space-y-8", children: t.approach.steps.map((step, i) => {
          const Icon = approachIcons[i];
          const num = String(i + 1).padStart(2, "0");
          return /* @__PURE__ */ jsx(
            motion.div,
            {
              initial: "hidden",
              whileInView: "visible",
              viewport: { once: true },
              variants: fadeUp$3,
              custom: i * 0.5,
              className: "group p-6 md:p-8 rounded-2xl border border-border bg-card hover:border-primary/20 transition-colors",
              children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-5", children: [
                /* @__PURE__ */ jsx("span", { className: "text-3xl font-bold text-primary/20 group-hover:text-primary/40 transition-colors leading-none", children: num }),
                /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-3", children: [
                    /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsx(Icon, { className: "w-5 h-5 text-primary" }) }),
                    /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold", children: step.title })
                  ] }),
                  /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mb-4", children: step.desc }),
                  /* @__PURE__ */ jsx("ul", { className: "grid sm:grid-cols-2 gap-2", children: step.items.map((item) => /* @__PURE__ */ jsxs(
                    "li",
                    {
                      className: "flex items-center gap-2 text-sm text-muted-foreground",
                      children: [
                        /* @__PURE__ */ jsx(CheckCircle2, { className: "w-4 h-4 text-primary shrink-0" }),
                        item
                      ]
                    },
                    item
                  )) }),
                  step.examples && /* @__PURE__ */ jsxs("div", { className: "mt-4 p-4 rounded-xl bg-secondary/50", children: [
                    /* @__PURE__ */ jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2", children: step.examplesLabel }),
                    /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: step.examples.map((ex) => /* @__PURE__ */ jsx(
                      "span",
                      {
                        className: "px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-sm font-medium",
                        children: ex
                      },
                      ex
                    )) })
                  ] })
                ] })
              ] })
            },
            num
          );
        }) })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "py-20 bg-secondary/30", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-6 max-w-3xl text-center", children: /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: "hidden",
          whileInView: "visible",
          viewport: { once: true },
          variants: fadeUp$3,
          children: [
            /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold mb-8", children: t.notForSeo.title }),
            /* @__PURE__ */ jsxs("div", { className: "grid sm:grid-cols-2 gap-6 mb-8", children: [
              /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-2xl border border-destructive/20 bg-destructive/5", children: [
                /* @__PURE__ */ jsx("p", { className: "font-semibold text-destructive mb-3", children: t.notForSeo.notLabel }),
                /* @__PURE__ */ jsx("ul", { className: "space-y-2 text-sm text-muted-foreground", children: t.notForSeo.notItems.map((item, i) => /* @__PURE__ */ jsx("li", { children: item }, i)) })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-2xl border border-primary/20 bg-primary/5", children: [
                /* @__PURE__ */ jsx("p", { className: "font-semibold text-primary mb-3", children: t.notForSeo.yesLabel }),
                /* @__PURE__ */ jsx("ul", { className: "space-y-2 text-sm text-foreground", children: t.notForSeo.yesItems.map((item, i) => /* @__PURE__ */ jsx("li", { children: item }, i)) })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "text-lg text-muted-foreground font-medium", children: [
              t.notForSeo.bottom,
              " ",
              /* @__PURE__ */ jsx("span", { className: "text-foreground", children: t.notForSeo.bottomBold })
            ] })
          ]
        }
      ) }) }),
      /* @__PURE__ */ jsx("section", { className: "py-24", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 max-w-4xl", children: [
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: "hidden",
            whileInView: "visible",
            viewport: { once: true },
            variants: fadeUp$3,
            className: "text-center mb-16",
            children: [
              /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold mb-4", children: t.process.title }),
              /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-lg", children: t.process.subtitle })
            ]
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute left-[23px] top-0 bottom-0 w-px bg-border hidden md:block" }),
          /* @__PURE__ */ jsx("div", { className: "space-y-6", children: t.process.steps.map((step, i) => /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: "hidden",
              whileInView: "visible",
              viewport: { once: true },
              variants: fadeUp$3,
              custom: i,
              className: "flex items-center gap-5",
              children: [
                /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center shrink-0 text-primary font-bold text-sm relative z-10", children: i + 1 }),
                /* @__PURE__ */ jsx("p", { className: "text-foreground font-medium text-lg", children: step })
              ]
            },
            step
          )) })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "py-20 bg-secondary/30", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 max-w-3xl", children: [
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: "hidden",
            whileInView: "visible",
            viewport: { once: true },
            variants: fadeUp$3,
            className: "text-center mb-12",
            children: /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold mb-4", children: t.whyUs.title })
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "space-y-4", children: t.whyUs.items.map((item, i) => /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: "hidden",
            whileInView: "visible",
            viewport: { once: true },
            variants: fadeUp$3,
            custom: i,
            className: "flex items-center gap-4 p-5 rounded-xl border border-border bg-card",
            children: [
              /* @__PURE__ */ jsx(CheckCircle2, { className: "w-5 h-5 text-primary shrink-0" }),
              /* @__PURE__ */ jsx("p", { className: "text-foreground font-medium", children: item })
            ]
          },
          item
        )) })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "py-24", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 max-w-3xl", children: [
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: "hidden",
            whileInView: "visible",
            viewport: { once: true },
            variants: fadeUp$3,
            className: "text-center mb-12",
            children: /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold mb-4", children: t.faq.title })
          }
        ),
        /* @__PURE__ */ jsx(Accordion, { type: "single", collapsible: true, className: "space-y-3", children: t.faq.items.map((faq, i) => /* @__PURE__ */ jsxs(
          AccordionItem,
          {
            value: "faq-".concat(i),
            className: "border border-border rounded-xl px-6 bg-card",
            children: [
              /* @__PURE__ */ jsx(AccordionTrigger, { className: "text-left font-semibold hover:no-underline", children: faq.q }),
              /* @__PURE__ */ jsx(AccordionContent, { className: "text-muted-foreground leading-relaxed", children: faq.a })
            ]
          },
          i
        )) })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "py-24 bg-secondary/30", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-6 max-w-2xl text-center", children: /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: "hidden",
          whileInView: "visible",
          viewport: { once: true },
          variants: fadeUp$3,
          children: [
            /* @__PURE__ */ jsx("p", { className: "text-xl text-muted-foreground mb-2", children: t.cta.pre }),
            /* @__PURE__ */ jsxs("h2", { className: "text-3xl md:text-4xl font-bold mb-8", children: [
              t.cta.title,
              " ",
              /* @__PURE__ */ jsx("span", { className: "text-gradient", children: t.cta.titleHighlight })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row items-center justify-center gap-4", children: [
              /* @__PURE__ */ jsxs(
                "a",
                {
                  href: "mailto:info@wizionar.com?subject=SEO%20analiza",
                  className: "inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity shadow-glow",
                  children: [
                    /* @__PURE__ */ jsx(Mail, { className: "w-5 h-5" }),
                    t.cta.button
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                LocalizedLink,
                {
                  to: "/usluge",
                  className: "inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-border text-foreground font-semibold hover:bg-secondary transition-colors",
                  children: [
                    t.cta.allServices,
                    /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
                  ]
                }
              )
            ] })
          ]
        }
      ) }) })
    ] }),
    /* @__PURE__ */ jsx(WizionarFooter, {})
  ] });
};
const SEOOptimizacija$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: SEOOptimizacija
}, Symbol.toStringTag, { value: "Module" }));
const useWebdevTranslations = () => {
  const { language } = useLanguage();
  return webdevTranslations[language];
};
const portfolioCorporate = "/assets/portfolio-corporate-Bi86QEW6.jpg";
const portfolioEshop = "/assets/portfolio-eshop-DetPfMus.jpg";
const portfolioMedical = "/assets/portfolio-medical-BMRBWO9v.jpg";
const portfolioRestaurant = "/assets/portfolio-restaurant-7bBCHosp.jpg";
const portfolioSalon = "/assets/portfolio-salon-COZRXrHc.jpg";
const portfolioRealestate = "/assets/portfolio-realestate-DKVqvyg5.jpg";
const portfolioBncWebshop = "/assets/portfolio-bnc-webshop-Dpgh86JV.jpg";
const fadeUp$2 = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 }
};
const siteTypeIcons = [Monitor, Layers, Target, FileText, ShoppingCart];
const whyNeededIcons = [Globe, Star, TrendingUp];
const whatYouGetIcons = [
  PenTool,
  Smartphone,
  Search,
  Zap,
  MessageSquare,
  Code2,
  FileText,
  Languages,
  CreditCard,
  Settings,
  BarChart3,
  Lock,
  Wrench,
  Image
];
const shopIcons = [LayoutGrid, Filter, ShoppingCart, CreditCard, Truck, Tag, Settings, ClipboardList];
const resultIcons = [Phone, MessageSquare, ShoppingCart, Star, Users, TrendingUp];
const advantageIcons = [Star, Target, Users, TrendingUp, Clock, Shield];
const portfolioData = [
  { image: portfolioBncWebshop, title: "BNC Shop", link: "/portfolio/bnc-shop", descKey: 0 },
  { image: portfolioCorporate, title: "TechFlow Dashboard", link: "/portfolio/techflow-dashboard", descKey: 1 },
  { image: portfolioEshop, title: "StyleOut Fashion Shop", link: "/portfolio/styleout-fashion-shop", descKey: 2 },
  { image: portfolioMedical, title: "MediConnect Klinika", link: "/portfolio/mediconnect-klinika", descKey: 3 },
  { image: portfolioRestaurant, title: "GastroPress Restoran", link: "#", descKey: 4 },
  { image: portfolioSalon, title: "BeautyGlow Salon", link: "#", descKey: 5 },
  { image: portfolioRealestate, title: "PropertyVista Nekretnine", link: "#", descKey: 6 }
];
const portfolioDescs = {
  sr: [
    "Custom eCommerce platforma koja objedinjuje online prodaju, B2B poslovanje i interne procese.",
    "Korporativni dashboard sa analitikom i izvještavanjem za finansijsku kompaniju.",
    "Moderan fashion web shop sa naprednim filterima i online plaćanjem.",
    "Platforma za medicinsku ustanovu sa online zakazivanjem termina.",
    "Web sajt za restoran sa digitalnim menijem i online narudžbama.",
    "Elegantna prezentacija kozmetičkog salona sa sistemom rezervacija.",
    "Portal za nekretnine sa mapom, filterima i detaljnim listinzima."
  ],
  en: [
    "Custom eCommerce platform unifying online sales, B2B operations and internal processes.",
    "Corporate dashboard with analytics and reporting for a financial company.",
    "Modern fashion web shop with advanced filters and online payment.",
    "Platform for a medical institution with online appointment scheduling.",
    "Restaurant website with digital menu and online orders.",
    "Elegant cosmetic salon presentation with a booking system.",
    "Real estate portal with map, filters and detailed listings."
  ],
  de: [
    "Maßgeschneiderte E-Commerce-Plattform, die Online-Verkauf, B2B-Geschäft und interne Prozesse vereint.",
    "Unternehmens-Dashboard mit Analytik und Reporting für ein Finanzunternehmen.",
    "Moderner Fashion-Webshop mit erweiterten Filtern und Online-Zahlung.",
    "Plattform für eine medizinische Einrichtung mit Online-Terminbuchung.",
    "Restaurant-Website mit digitalem Menü und Online-Bestellungen.",
    "Elegante Präsentation eines Kosmetiksalons mit Buchungssystem.",
    "Immobilienportal mit Karte, Filtern und detaillierten Inseraten."
  ],
  it: [
    "Piattaforma eCommerce personalizzata che unifica vendite online, operazioni B2B e processi interni.",
    "Dashboard aziendale con analisi e reportistica per una società finanziaria.",
    "Web shop di moda moderno con filtri avanzati e pagamento online.",
    "Piattaforma per un istituto medico con prenotazione appuntamenti online.",
    "Sito web per ristorante con menù digitale e ordini online.",
    "Elegante presentazione di un salone di bellezza con sistema di prenotazione.",
    "Portale immobiliare con mappa, filtri e inserzioni dettagliate."
  ]
};
const FaqItem$1 = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return /* @__PURE__ */ jsxs("div", { className: "overflow-hidden rounded-xl border border-border", children: [
    /* @__PURE__ */ jsxs(
      "button",
      {
        type: "button",
        onClick: () => setOpen(!open),
        className: "flex w-full items-center justify-between p-5 text-left transition-colors hover:bg-secondary/50",
        children: [
          /* @__PURE__ */ jsx("span", { className: "pr-4 font-semibold", children: q }),
          /* @__PURE__ */ jsx(
            ChevronDown,
            {
              className: "h-5 w-5 shrink-0 text-muted-foreground transition-transform ".concat(open ? "rotate-180" : "")
            }
          )
        ]
      }
    ),
    open && /* @__PURE__ */ jsx("div", { className: "px-5 pb-5 leading-relaxed text-muted-foreground", children: a })
  ] });
};
const WebDevelopment = () => {
  const t = useWebdevTranslations();
  const { language } = useLanguage();
  const seo = getPageSeo("webDevelopment", language);
  const descs = portfolioDescs[language] || portfolioDescs.sr;
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-background text-foreground", children: [
    /* @__PURE__ */ jsx(
      SEOHead,
      {
        title: seo.title,
        description: seo.description,
        schema: [
          createServiceSchema({
            language,
            name: seo.title,
            description: seo.description,
            path: SEO_PATHS.webDevelopment,
            serviceType: getSeoLabel(language, "webDevelopment")
          }),
          createWebPageSchema({
            language,
            path: SEO_PATHS.webDevelopment,
            title: seo.title,
            description: seo.description
          }),
          createBreadcrumbSchema(language, [
            { name: getSeoLabel(language, "home"), path: SEO_PATHS.home },
            { name: getSeoLabel(language, "services"), path: SEO_PATHS.usluge },
            { name: getSeoLabel(language, "webDevelopment"), path: SEO_PATHS.webDevelopment }
          ]),
          createFaqSchema(t.faq.items.map((item) => ({ question: item.q, answer: item.a })))
        ]
      }
    ),
    /* @__PURE__ */ jsx(WizionarHeader, {}),
    /* @__PURE__ */ jsxs("main", { children: [
      /* @__PURE__ */ jsxs("section", { className: "relative overflow-hidden pb-24 pt-32", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" }),
        /* @__PURE__ */ jsx("div", { className: "absolute right-0 top-1/3 h-[500px] w-[500px] translate-x-1/2 rounded-full bg-primary/5 blur-[120px]" }),
        /* @__PURE__ */ jsx("div", { className: "container relative z-10 mx-auto px-6", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-4xl text-center", children: [
          /* @__PURE__ */ jsx(
            motion.span,
            {
              ...fadeUp$2,
              className: "mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-primary",
              children: t.hero.badge
            }
          ),
          /* @__PURE__ */ jsxs(
            motion.h1,
            {
              ...fadeUp$2,
              transition: { duration: 0.5, delay: 0.1 },
              className: "mb-6 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl",
              children: [
                t.hero.title1,
                " ",
                /* @__PURE__ */ jsx("span", { className: "text-gradient", children: t.hero.titleHighlight })
              ]
            }
          ),
          /* @__PURE__ */ jsx(
            motion.p,
            {
              ...fadeUp$2,
              transition: { duration: 0.5, delay: 0.2 },
              className: "mx-auto mb-8 max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl",
              children: t.hero.subtitle
            }
          ),
          /* @__PURE__ */ jsxs(
            motion.div,
            {
              ...fadeUp$2,
              transition: { duration: 0.5, delay: 0.3 },
              className: "flex flex-col justify-center gap-4 sm:flex-row",
              children: [
                /* @__PURE__ */ jsxs(
                  LocalizedLink,
                  {
                    to: "/projektni-upitnik",
                    className: "inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-4 font-semibold text-primary-foreground transition-opacity hover:opacity-90",
                    children: [
                      /* @__PURE__ */ jsx(ClipboardList, { className: "h-5 w-5" }),
                      t.hero.cta1
                    ]
                  }
                ),
                /* @__PURE__ */ jsxs(
                  "a",
                  {
                    href: "#portfolio",
                    className: "inline-flex items-center justify-center gap-2 rounded-xl border border-border px-8 py-4 font-semibold transition-colors hover:bg-secondary",
                    children: [
                      t.hero.cta2,
                      /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })
                    ]
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsx(
            motion.p,
            {
              ...fadeUp$2,
              transition: { duration: 0.5, delay: 0.4 },
              className: "mt-6 text-sm text-muted-foreground",
              children: t.hero.microcopy
            }
          )
        ] }) })
      ] }),
      /* @__PURE__ */ jsx("section", { className: "bg-secondary/30 py-24", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6", children: [
        /* @__PURE__ */ jsxs(motion.div, { ...fadeUp$2, className: "mx-auto mb-16 max-w-3xl text-center", children: [
          /* @__PURE__ */ jsxs("h2", { className: "mb-6 text-3xl font-bold md:text-4xl", children: [
            t.whyNeeded.title,
            " ",
            /* @__PURE__ */ jsx("span", { className: "text-gradient", children: t.whyNeeded.titleHighlight }),
            " ",
            t.whyNeeded.titleEnd
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-lg leading-relaxed text-muted-foreground", children: t.whyNeeded.subtitle })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mx-auto grid max-w-5xl gap-8 md:grid-cols-3", children: t.whyNeeded.items.map((item, index) => {
          const Icon = whyNeededIcons[index];
          return /* @__PURE__ */ jsxs(
            motion.div,
            {
              ...fadeUp$2,
              transition: { duration: 0.5, delay: index * 0.1 },
              className: "rounded-2xl border border-border bg-card p-6",
              children: [
                /* @__PURE__ */ jsxs("div", { className: "mb-3 flex items-center gap-3", children: [
                  /* @__PURE__ */ jsx("div", { className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10", children: /* @__PURE__ */ jsx(Icon, { className: "h-5 w-5 text-primary" }) }),
                  /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold", children: item.title })
                ] }),
                /* @__PURE__ */ jsx("p", { className: "leading-relaxed text-muted-foreground", children: item.text })
              ]
            },
            item.title
          );
        }) })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "py-24", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6", children: [
        /* @__PURE__ */ jsxs(motion.div, { ...fadeUp$2, className: "mb-16 text-center", children: [
          /* @__PURE__ */ jsx("span", { className: "mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-primary", children: t.siteTypes.badge }),
          /* @__PURE__ */ jsx("h2", { className: "mb-4 text-3xl font-bold md:text-4xl", children: t.siteTypes.title }),
          /* @__PURE__ */ jsx("p", { className: "mx-auto max-w-2xl text-lg text-muted-foreground", children: t.siteTypes.subtitle })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3", children: t.siteTypes.items.map((item, index) => {
          const Icon = siteTypeIcons[index];
          return /* @__PURE__ */ jsxs(
            motion.div,
            {
              ...fadeUp$2,
              transition: { duration: 0.5, delay: index * 0.08 },
              className: "group rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/20 hover:shadow-lg",
              children: [
                /* @__PURE__ */ jsxs("div", { className: "mb-3 flex items-center gap-3", children: [
                  /* @__PURE__ */ jsx("div", { className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20", children: /* @__PURE__ */ jsx(Icon, { className: "h-5 w-5 text-primary" }) }),
                  /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold", children: item.title })
                ] }),
                /* @__PURE__ */ jsx("p", { className: "text-sm leading-relaxed text-muted-foreground", children: item.desc })
              ]
            },
            item.title
          );
        }) })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "bg-secondary/30 py-24", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6", children: [
        /* @__PURE__ */ jsxs(motion.div, { ...fadeUp$2, className: "mb-16 text-center", children: [
          /* @__PURE__ */ jsx("h2", { className: "mb-4 text-3xl font-bold md:text-4xl", children: t.cmsVsCustom.title }),
          /* @__PURE__ */ jsx("p", { className: "mx-auto max-w-2xl text-lg text-muted-foreground", children: t.cmsVsCustom.subtitle })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mx-auto grid max-w-5xl gap-8 md:grid-cols-2", children: [
          /* @__PURE__ */ jsxs(
            motion.div,
            {
              ...fadeUp$2,
              transition: { delay: 0.1 },
              className: "rounded-2xl border border-border bg-card p-8",
              children: [
                /* @__PURE__ */ jsxs("div", { className: "mb-4 flex items-center gap-3", children: [
                  /* @__PURE__ */ jsx("div", { className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10", children: /* @__PURE__ */ jsx(Layers, { className: "h-5 w-5 text-primary" }) }),
                  /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold", children: t.cmsVsCustom.cms.title })
                ] }),
                /* @__PURE__ */ jsx("p", { className: "mb-4 text-sm font-medium text-primary", children: t.cmsVsCustom.cms.badge }),
                /* @__PURE__ */ jsx("p", { className: "mb-6 leading-relaxed text-muted-foreground", children: t.cmsVsCustom.cms.desc }),
                /* @__PURE__ */ jsx("ul", { className: "space-y-2", children: t.cmsVsCustom.cms.features.map((feature) => /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2 text-sm", children: [
                  /* @__PURE__ */ jsx(CheckCircle2, { className: "h-4 w-4 shrink-0 text-primary" }),
                  feature
                ] }, feature)) })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            motion.div,
            {
              ...fadeUp$2,
              transition: { delay: 0.2 },
              className: "relative overflow-hidden rounded-2xl border border-primary/30 bg-card p-8",
              children: [
                /* @__PURE__ */ jsx("div", { className: "absolute right-4 top-4", children: /* @__PURE__ */ jsx("span", { className: "rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary", children: t.cmsVsCustom.custom.label }) }),
                /* @__PURE__ */ jsxs("div", { className: "mb-4 flex items-center gap-3", children: [
                  /* @__PURE__ */ jsx("div", { className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10", children: /* @__PURE__ */ jsx(Code2, { className: "h-5 w-5 text-primary" }) }),
                  /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold", children: t.cmsVsCustom.custom.title })
                ] }),
                /* @__PURE__ */ jsx("p", { className: "mb-4 text-sm font-medium text-primary", children: t.cmsVsCustom.custom.badge }),
                /* @__PURE__ */ jsx("p", { className: "mb-6 leading-relaxed text-muted-foreground", children: t.cmsVsCustom.custom.desc }),
                /* @__PURE__ */ jsx("ul", { className: "space-y-2", children: t.cmsVsCustom.custom.features.map((feature) => /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2 text-sm", children: [
                  /* @__PURE__ */ jsx(CheckCircle2, { className: "h-4 w-4 shrink-0 text-primary" }),
                  feature
                ] }, feature)) })
              ]
            }
          )
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "py-24", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6", children: [
        /* @__PURE__ */ jsxs(motion.div, { ...fadeUp$2, className: "mb-16 text-center", children: [
          /* @__PURE__ */ jsx("h2", { className: "mb-4 text-3xl font-bold md:text-4xl", children: t.whatYouGet.title }),
          /* @__PURE__ */ jsx("p", { className: "mx-auto max-w-2xl text-lg text-muted-foreground", children: t.whatYouGet.subtitle })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mx-auto grid max-w-6xl grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5", children: t.whatYouGet.items.map((label, index) => {
          const Icon = whatYouGetIcons[index];
          return /* @__PURE__ */ jsxs(
            motion.div,
            {
              ...fadeUp$2,
              transition: { duration: 0.4, delay: index * 0.04 },
              className: "flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/20",
              children: [
                /* @__PURE__ */ jsx(Icon, { className: "h-5 w-5 shrink-0 text-primary" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: label })
              ]
            },
            label
          );
        }) })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "bg-secondary/30 py-24", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6", children: [
        /* @__PURE__ */ jsxs(motion.div, { ...fadeUp$2, className: "mb-16 text-center", children: [
          /* @__PURE__ */ jsx("span", { className: "mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-primary", children: t.shop.badge }),
          /* @__PURE__ */ jsx("h2", { className: "mb-4 text-3xl font-bold md:text-4xl", children: t.shop.title }),
          /* @__PURE__ */ jsx("p", { className: "mx-auto max-w-2xl text-lg text-muted-foreground", children: t.shop.subtitle })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-4", children: t.shop.items.map((item, index) => {
          const Icon = shopIcons[index];
          return /* @__PURE__ */ jsxs(
            motion.div,
            {
              ...fadeUp$2,
              transition: { duration: 0.4, delay: index * 0.06 },
              className: "rounded-2xl border border-border bg-card p-5 transition-all hover:border-primary/20 hover:shadow-md",
              children: [
                /* @__PURE__ */ jsxs("div", { className: "mb-3 flex items-center gap-3", children: [
                  /* @__PURE__ */ jsx("div", { className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10", children: /* @__PURE__ */ jsx(Icon, { className: "h-5 w-5 text-primary" }) }),
                  /* @__PURE__ */ jsx("h3", { className: "font-bold", children: item.label })
                ] }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: item.desc })
              ]
            },
            item.label
          );
        }) })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "py-24", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-6", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-4xl", children: [
        /* @__PURE__ */ jsx(motion.div, { ...fadeUp$2, className: "mb-12 text-center", children: /* @__PURE__ */ jsxs("h2", { className: "mb-6 text-3xl font-bold md:text-4xl", children: [
          t.results.title1,
          " ",
          /* @__PURE__ */ jsx("br", {}),
          t.results.title2,
          " ",
          /* @__PURE__ */ jsx("span", { className: "text-gradient", children: t.results.titleHighlight })
        ] }) }),
        /* @__PURE__ */ jsx(motion.div, { ...fadeUp$2, className: "grid gap-6 md:grid-cols-2", children: t.results.items.map((text, index) => {
          const Icon = resultIcons[index];
          return /* @__PURE__ */ jsxs(
            motion.div,
            {
              ...fadeUp$2,
              transition: { delay: index * 0.06 },
              className: "flex items-center gap-4 rounded-xl border border-border bg-card p-4",
              children: [
                /* @__PURE__ */ jsx("div", { className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10", children: /* @__PURE__ */ jsx(Icon, { className: "h-5 w-5 text-primary" }) }),
                /* @__PURE__ */ jsx("span", { className: "font-medium", children: text })
              ]
            },
            text
          );
        }) })
      ] }) }) }),
      /* @__PURE__ */ jsx("section", { className: "bg-secondary/30 py-24", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6", children: [
        /* @__PURE__ */ jsxs(motion.div, { ...fadeUp$2, className: "mb-16 text-center", children: [
          /* @__PURE__ */ jsx("span", { className: "mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-primary", children: t.process.badge }),
          /* @__PURE__ */ jsx("h2", { className: "mb-4 text-3xl font-bold md:text-4xl", children: t.process.title }),
          /* @__PURE__ */ jsx("p", { className: "mx-auto max-w-2xl text-lg text-muted-foreground", children: t.process.subtitle })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-4xl space-y-6", children: t.process.steps.map((step, index) => /* @__PURE__ */ jsxs(
          motion.div,
          {
            ...fadeUp$2,
            transition: { duration: 0.4, delay: index * 0.08 },
            className: "flex gap-6 rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/20",
            children: [
              /* @__PURE__ */ jsx("div", { className: "flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary/10", children: /* @__PURE__ */ jsx("span", { className: "text-lg font-bold text-primary", children: String(index + 1).padStart(2, "0") }) }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "mb-1 text-lg font-bold", children: step.title }),
                /* @__PURE__ */ jsx("p", { className: "leading-relaxed text-muted-foreground", children: step.desc })
              ] })
            ]
          },
          step.title
        )) })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "py-24", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6", children: [
        /* @__PURE__ */ jsxs(motion.div, { ...fadeUp$2, className: "mb-16 text-center", children: [
          /* @__PURE__ */ jsx("h2", { className: "mb-4 text-3xl font-bold md:text-4xl", children: t.advantages.title }),
          /* @__PURE__ */ jsx("p", { className: "mx-auto max-w-2xl text-lg text-muted-foreground", children: t.advantages.subtitle })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3", children: t.advantages.items.map((item, index) => {
          const Icon = advantageIcons[index];
          return /* @__PURE__ */ jsxs(
            motion.div,
            {
              ...fadeUp$2,
              transition: { duration: 0.4, delay: index * 0.08 },
              className: "rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/20 hover:shadow-lg",
              children: [
                /* @__PURE__ */ jsxs("div", { className: "mb-3 flex items-center gap-3", children: [
                  /* @__PURE__ */ jsx("div", { className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10", children: /* @__PURE__ */ jsx(Icon, { className: "h-5 w-5 text-primary" }) }),
                  /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold", children: item.title })
                ] }),
                /* @__PURE__ */ jsx("p", { className: "text-sm leading-relaxed text-muted-foreground", children: item.desc })
              ]
            },
            item.title
          );
        }) })
      ] }) }),
      /* @__PURE__ */ jsx("section", { id: "portfolio", className: "bg-secondary/30 py-24", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6", children: [
        /* @__PURE__ */ jsxs(motion.div, { ...fadeUp$2, className: "mb-16 text-center", children: [
          /* @__PURE__ */ jsx("span", { className: "mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-primary", children: t.portfolio.badge }),
          /* @__PURE__ */ jsx("h2", { className: "mb-4 text-3xl font-bold md:text-4xl", children: t.portfolio.title }),
          /* @__PURE__ */ jsx("p", { className: "mx-auto max-w-2xl text-lg text-muted-foreground", children: t.portfolio.subtitle })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3", children: portfolioData.map((item, index) => /* @__PURE__ */ jsxs(
          motion.div,
          {
            ...fadeUp$2,
            transition: { duration: 0.4, delay: index * 0.08 },
            className: "group overflow-hidden rounded-2xl border border-border bg-card transition-all hover:border-primary/20 hover:shadow-lg",
            children: [
              /* @__PURE__ */ jsx("div", { className: "aspect-video overflow-hidden", children: /* @__PURE__ */ jsx(
                "img",
                {
                  src: item.image,
                  alt: item.title,
                  loading: "lazy",
                  decoding: "async",
                  sizes: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
                  width: 800,
                  height: 600,
                  className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                }
              ) }),
              /* @__PURE__ */ jsxs("div", { className: "p-5", children: [
                /* @__PURE__ */ jsx("h3", { className: "mb-1 font-bold", children: item.title }),
                /* @__PURE__ */ jsx("p", { className: "mb-3 text-sm text-muted-foreground", children: descs[item.descKey] }),
                item.link !== "#" && /* @__PURE__ */ jsxs(
                  LocalizedLink,
                  {
                    to: item.link,
                    className: "inline-flex items-center gap-1 text-sm text-primary hover:underline",
                    children: [
                      t.portfolio.visitSite,
                      /* @__PURE__ */ jsx(ExternalLink, { className: "h-3 w-3" })
                    ]
                  }
                )
              ] })
            ]
          },
          item.title
        )) })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "py-24", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6", children: [
        /* @__PURE__ */ jsxs(motion.div, { ...fadeUp$2, className: "mb-16 text-center", children: [
          /* @__PURE__ */ jsx("h2", { className: "mb-4 text-3xl font-bold md:text-4xl", children: t.faq.title }),
          /* @__PURE__ */ jsx("p", { className: "mx-auto max-w-2xl text-lg text-muted-foreground", children: t.faq.subtitle })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-3xl space-y-3", children: t.faq.items.map((item, index) => /* @__PURE__ */ jsx(motion.div, { ...fadeUp$2, transition: { duration: 0.4, delay: index * 0.05 }, children: /* @__PURE__ */ jsx(FaqItem$1, { q: item.q, a: item.a }) }, item.q)) })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "bg-secondary/30 py-24", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-6", children: /* @__PURE__ */ jsxs(motion.div, { ...fadeUp$2, className: "mx-auto max-w-3xl text-center", children: [
        /* @__PURE__ */ jsxs("h2", { className: "mb-6 text-3xl font-bold md:text-4xl", children: [
          t.cta.title,
          " ",
          /* @__PURE__ */ jsx("span", { className: "text-gradient", children: t.cta.titleHighlight })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mb-8 text-lg leading-relaxed text-muted-foreground", children: t.cta.subtitle }),
        /* @__PURE__ */ jsxs("div", { className: "mb-6 flex flex-col items-center justify-center gap-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-center gap-4 sm:flex-row", children: [
            /* @__PURE__ */ jsxs(
              "a",
              {
                href: "mailto:info@wizionar.com",
                className: "inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-4 font-semibold text-primary-foreground transition-opacity hover:opacity-90",
                children: [
                  /* @__PURE__ */ jsx(Mail, { className: "h-5 w-5" }),
                  t.cta.email
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              "a",
              {
                href: "tel:+38762000000",
                className: "inline-flex items-center justify-center gap-2 rounded-xl border border-border px-8 py-4 font-semibold transition-colors hover:bg-secondary",
                children: [
                  /* @__PURE__ */ jsx(Phone, { className: "h-5 w-5" }),
                  t.cta.phone
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxs(
            LocalizedLink,
            {
              to: "/projektni-upitnik",
              className: "inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-4 font-semibold text-primary-foreground transition-opacity hover:opacity-90",
              children: [
                /* @__PURE__ */ jsx(ClipboardList, { className: "h-5 w-5" }),
                t.cta.quote
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: t.cta.microcopy })
      ] }) }) })
    ] }),
    /* @__PURE__ */ jsx(WizionarFooter, {})
  ] });
};
const WebDevelopment$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: WebDevelopment
}, Symbol.toStringTag, { value: "Module" }));
const logo1 = "/assets/logo-1-Bv0TEuEn.jpg";
const logo2 = "/assets/logo-2-ByLYW2DJ.jpg";
const logo3 = "/assets/logo-3-YN6qZKfZ.jpg";
const logo4 = "/assets/logo-4-0SQMCw8s.jpg";
const print1 = "/assets/print-1-BpI-zxyx.jpg";
const print2 = "/assets/print-2-t-TZjfhQ.jpg";
const print3 = "/assets/print-3-ZbiPL5xh.jpg";
const print4 = "/assets/print-4-D9CEEPk4.jpg";
const social1 = "/assets/social-1-D2Hkk9oN.jpg";
const social2 = "/assets/social-2-DuhUi_HZ.jpg";
const social3 = "/assets/social-3-Dv-bVu6N.jpg";
const social4 = "/assets/social-4-BQFDWWaX.jpg";
const packaging1 = "/assets/packaging-1-BBZ0hDe1.jpg";
const packaging2 = "/assets/packaging-2-t_-p3fwj.jpg";
const packaging3 = "/assets/packaging-3-D4McACaf.jpg";
const packaging4 = "/assets/packaging-4-DT8hi6NR.jpg";
const presentation1 = "/assets/presentation-1-B1IbQTqS.jpg";
const presentation2 = "/assets/presentation-2-BD5LghVn.jpg";
const presentation3 = "/assets/presentation-3-CI-Be-Yh.jpg";
const presentation4 = "/assets/presentation-4-DsQ0lXrQ.jpg";
const illustration1 = "/assets/illustration-1-DTEF-Pyn.jpg";
const illustration2 = "/assets/illustration-2-CPJuP2ht.jpg";
const illustration3 = "/assets/illustration-3-D0NYL9Y5.jpg";
const illustration4 = "/assets/illustration-4-D_ROUBDx.jpg";
const webgraphic1 = "/assets/webgraphic-1-CjLSkPKC.jpg";
const webgraphic2 = "/assets/webgraphic-2-DoApqdPT.jpg";
const webgraphic3 = "/assets/webgraphic-3-BWS2tD72.jpg";
const webgraphic4 = "/assets/webgraphic-4-CxyvwIJz.jpg";
const branding1 = "/assets/branding-1-VJNjIUlR.jpg";
const branding2 = "/assets/branding-2-DF7gcWF7.jpg";
const branding3 = "/assets/branding-3-DKkW7lZu.jpg";
const branding4 = "/assets/branding-4-BXTsWwIa.jpg";
const fadeUp$1 = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 }
};
const serviceIcons = [Palette, FileText, Share2, Package, BookOpen, Image, PenTool, Layers];
const serviceImages = [
  [logo1, logo2, logo3, logo4],
  [print1, print2, print3, print4],
  [social1, social2, social3, social4],
  [packaging1, packaging2, packaging3, packaging4],
  [presentation1, presentation2, presentation3, presentation4],
  [illustration1, illustration2, illustration3, illustration4],
  [webgraphic1, webgraphic2, webgraphic3, webgraphic4],
  [branding1, branding2, branding3, branding4]
];
const MiniCarousel = ({
  images,
  onImageClick,
  altText,
  language
}) => {
  const [visibleCount, setVisibleCount] = useState(() => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      return 4;
    }
    return 6;
  });
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const step = isMobile ? 4 : 6;
  const visible = images.slice(0, visibleCount);
  const hasMore = visibleCount < images.length;
  return /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-2 md:grid-cols-3", children: visible.map((image, index) => /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        className: "group/thumb aspect-square cursor-pointer overflow-hidden rounded-lg",
        onClick: () => onImageClick(images, index),
        children: /* @__PURE__ */ jsx(
          "img",
          {
            src: image,
            alt: "".concat(altText, " ").concat(index + 1),
            loading: "lazy",
            decoding: "async",
            sizes: "(max-width: 768px) 50vw, 33vw",
            className: "h-full w-full object-cover transition-transform duration-300 group-hover/thumb:scale-105"
          }
        )
      },
      image
    )) }),
    hasMore && /* @__PURE__ */ jsxs(
      "button",
      {
        type: "button",
        onClick: () => setVisibleCount((count2) => count2 + step),
        className: "mt-3 w-full text-xs font-medium text-primary transition-all hover:underline",
        children: [
          language === "en" ? "Load more" : language === "de" ? "Mehr laden" : language === "it" ? "Carica altro" : "Učitaj više",
          " ",
          "↓"
        ]
      }
    )
  ] });
};
const Lightbox = ({
  images,
  index,
  onClose,
  altText
}) => {
  const [current, setCurrent] = useState(index);
  const prev = () => setCurrent((value) => value === 0 ? images.length - 1 : value - 1);
  const next = () => setCurrent((value) => value === images.length - 1 ? 0 : value + 1);
  return /* @__PURE__ */ jsxs(
    motion.div,
    {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      className: "fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm",
      onClick: onClose,
      children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: onClose,
            "aria-label": "Close gallery",
            className: "absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20",
            children: /* @__PURE__ */ jsx(X, { className: "h-5 w-5 text-white" })
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "relative mx-4 w-full max-w-4xl", onClick: (event) => event.stopPropagation(), children: [
          /* @__PURE__ */ jsx(
            motion.img,
            {
              initial: { opacity: 0, scale: 0.95 },
              animate: { opacity: 1, scale: 1 },
              transition: { duration: 0.2 },
              src: images[current],
              alt: altText,
              decoding: "async",
              className: "max-h-[80vh] w-full rounded-xl object-contain"
            },
            current
          ),
          images.length > 1 && /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: prev,
                "aria-label": "Previous image",
                className: "absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20",
                children: /* @__PURE__ */ jsx(ChevronLeft, { className: "h-5 w-5 text-white" })
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: next,
                "aria-label": "Next image",
                className: "absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20",
                children: /* @__PURE__ */ jsx(ChevronRight, { className: "h-5 w-5 text-white" })
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "absolute -bottom-8 left-1/2 flex -translate-x-1/2 gap-2", children: images.map((image, dotIndex) => /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => setCurrent(dotIndex),
                "aria-label": "Go to image ".concat(dotIndex + 1),
                className: "h-2 rounded-full transition-all ".concat(dotIndex === current ? "w-4 bg-white" : "w-2 bg-white/40")
              },
              "".concat(image, "-").concat(dotIndex)
            )) })
          ] })
        ] })
      ]
    }
  );
};
const FaqItem = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return /* @__PURE__ */ jsxs("div", { className: "overflow-hidden rounded-xl border border-border", children: [
    /* @__PURE__ */ jsxs(
      "button",
      {
        type: "button",
        onClick: () => setOpen(!open),
        className: "flex w-full items-center justify-between p-5 text-left transition-colors hover:bg-muted/50",
        children: [
          /* @__PURE__ */ jsx("span", { className: "pr-4 font-semibold", children: q }),
          /* @__PURE__ */ jsx(
            ChevronDown,
            {
              className: "h-5 w-5 shrink-0 text-muted-foreground transition-transform ".concat(open ? "rotate-180" : "")
            }
          )
        ]
      }
    ),
    open && /* @__PURE__ */ jsx("div", { className: "px-5 pb-5 leading-relaxed text-muted-foreground", children: a })
  ] });
};
const GrafickiDizajn = () => {
  const { language } = useLanguage();
  const t = grafickiDizajnTranslations[language];
  const seo = getPageSeo("graphicDesign", language);
  const [lightbox, setLightbox] = useState(null);
  const openLightbox = useCallback(
    (images, index) => setLightbox({ images, index }),
    []
  );
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-background text-foreground", children: [
    /* @__PURE__ */ jsx(
      SEOHead,
      {
        title: seo.title,
        description: seo.description,
        schema: [
          createServiceSchema({
            language,
            name: seo.title,
            description: seo.description,
            path: SEO_PATHS.graphicDesign,
            serviceType: getSeoLabel(language, "graphicDesign")
          }),
          createWebPageSchema({
            language,
            path: SEO_PATHS.graphicDesign,
            title: seo.title,
            description: seo.description
          }),
          createBreadcrumbSchema(language, [
            { name: getSeoLabel(language, "home"), path: SEO_PATHS.home },
            { name: getSeoLabel(language, "services"), path: SEO_PATHS.usluge },
            { name: getSeoLabel(language, "graphicDesign"), path: SEO_PATHS.graphicDesign }
          ]),
          createFaqSchema(t.faqs.map((item) => ({ question: item.q, answer: item.a })))
        ]
      }
    ),
    /* @__PURE__ */ jsx(WizionarHeader, {}),
    /* @__PURE__ */ jsxs("main", { children: [
      /* @__PURE__ */ jsxs("section", { className: "relative overflow-hidden pb-20 pt-32", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" }),
        /* @__PURE__ */ jsxs("div", { className: "container relative z-10 mx-auto px-3 text-center md:px-6", children: [
          /* @__PURE__ */ jsx(
            motion.span,
            {
              ...fadeUp$1,
              className: "mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-primary",
              children: t.meta.badge
            }
          ),
          /* @__PURE__ */ jsxs(
            motion.h1,
            {
              ...fadeUp$1,
              transition: { delay: 0.1 },
              className: "mb-6 text-4xl font-bold leading-tight md:text-6xl",
              children: [
                t.meta.title1,
                " ",
                /* @__PURE__ */ jsx("br", {}),
                /* @__PURE__ */ jsx("span", { className: "text-gradient", children: t.meta.title2 })
              ]
            }
          ),
          /* @__PURE__ */ jsx(
            motion.p,
            {
              ...fadeUp$1,
              transition: { delay: 0.2 },
              className: "mx-auto mb-8 max-w-2xl text-lg text-muted-foreground",
              children: t.meta.subtitle
            }
          ),
          /* @__PURE__ */ jsxs(
            motion.a,
            {
              ...fadeUp$1,
              transition: { delay: 0.3 },
              href: "mailto:info@wizionar.com",
              className: "inline-flex items-center gap-2 font-semibold text-primary transition-all hover:gap-3",
              children: [
                /* @__PURE__ */ jsx(Mail, { className: "h-5 w-5" }),
                t.meta.cta,
                /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsx("section", { className: "pb-24", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-3 md:px-6", children: [
        /* @__PURE__ */ jsxs(motion.div, { ...fadeUp$1, className: "mb-16 text-center", children: [
          /* @__PURE__ */ jsxs("h2", { className: "mb-4 text-3xl font-bold md:text-4xl", children: [
            t.servicesTitle,
            " ",
            /* @__PURE__ */ jsx("span", { className: "text-gradient", children: t.servicesTitleHighlight })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "mx-auto max-w-xl text-muted-foreground", children: t.servicesSubtitle })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mx-auto grid max-w-5xl gap-6 md:grid-cols-2", children: t.services.map((service, index) => {
          const Icon = serviceIcons[index];
          const images = serviceImages[index];
          return /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { duration: 0.4, delay: index * 0.08 },
              className: "group rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/20 hover:shadow-lg",
              children: [
                /* @__PURE__ */ jsxs("div", { className: "mb-3 flex items-center gap-3", children: [
                  /* @__PURE__ */ jsx("div", { className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20", children: /* @__PURE__ */ jsx(Icon, { className: "h-5 w-5 text-primary" }) }),
                  /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold", children: service.title })
                ] }),
                /* @__PURE__ */ jsx("p", { className: "mb-4 text-sm leading-relaxed text-muted-foreground", children: service.description }),
                /* @__PURE__ */ jsx("div", { className: "mb-1 flex flex-wrap gap-2", children: service.examples.map((example) => /* @__PURE__ */ jsx(
                  "span",
                  {
                    className: "rounded-full bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary",
                    children: example
                  },
                  example
                )) }),
                /* @__PURE__ */ jsx(
                  MiniCarousel,
                  {
                    images,
                    onImageClick: openLightbox,
                    altText: t.imageAlt,
                    language
                  }
                )
              ]
            },
            service.title
          );
        }) })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "pb-24", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-3 md:px-6", children: [
        /* @__PURE__ */ jsxs(motion.div, { ...fadeUp$1, className: "mb-16 text-center", children: [
          /* @__PURE__ */ jsxs("h2", { className: "mb-4 text-3xl font-bold md:text-4xl", children: [
            t.processTitle,
            " ",
            /* @__PURE__ */ jsx("span", { className: "text-gradient", children: t.processTitleHighlight })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "mx-auto max-w-xl text-muted-foreground", children: t.processSubtitle })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3", children: t.process.map((step, index) => /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { duration: 0.4, delay: index * 0.1 },
            className: "rounded-2xl border border-border bg-card p-6",
            children: [
              /* @__PURE__ */ jsx("span", { className: "mb-2 block text-3xl font-bold text-primary/20", children: step.step }),
              /* @__PURE__ */ jsx("h3", { className: "mb-2 text-lg font-bold", children: step.title }),
              /* @__PURE__ */ jsx("p", { className: "text-sm leading-relaxed text-muted-foreground", children: step.description })
            ]
          },
          step.step
        )) })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "pb-24", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-3 md:px-6", children: [
        /* @__PURE__ */ jsx(motion.div, { ...fadeUp$1, className: "mb-12 text-center", children: /* @__PURE__ */ jsxs("h2", { className: "text-3xl font-bold md:text-4xl", children: [
          t.faqTitle,
          " ",
          /* @__PURE__ */ jsx("span", { className: "text-gradient", children: t.faqTitleHighlight })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-3xl space-y-3", children: t.faqs.map((faq) => /* @__PURE__ */ jsx(FaqItem, { q: faq.q, a: faq.a }, faq.q)) })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "pb-32", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-3 md:px-6", children: /* @__PURE__ */ jsxs(
        motion.div,
        {
          ...fadeUp$1,
          className: "rounded-3xl border border-primary/10 bg-gradient-to-br from-primary/10 to-primary/5 p-12 text-center",
          children: [
            /* @__PURE__ */ jsx("h2", { className: "mb-4 text-3xl font-bold md:text-4xl", children: t.ctaTitle }),
            /* @__PURE__ */ jsx("p", { className: "mx-auto mb-8 max-w-lg text-muted-foreground", children: t.ctaSubtitle }),
            /* @__PURE__ */ jsxs(
              "a",
              {
                href: "mailto:info@wizionar.com",
                className: "inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 font-semibold text-primary-foreground transition-opacity hover:opacity-90",
                children: [
                  /* @__PURE__ */ jsx(Mail, { className: "h-5 w-5" }),
                  "info@wizionar.com"
                ]
              }
            )
          ]
        }
      ) }) })
    ] }),
    /* @__PURE__ */ jsx(WizionarFooter, {}),
    /* @__PURE__ */ jsx(AnimatePresence, { children: lightbox && /* @__PURE__ */ jsx(
      Lightbox,
      {
        images: lightbox.images,
        index: lightbox.index,
        onClose: () => setLightbox(null),
        altText: t.imageAlt
      }
    ) })
  ] });
};
const GrafickiDizajn$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: GrafickiDizajn
}, Symbol.toStringTag, { value: "Module" }));
const Checkbox = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  CheckboxPrimitive.Root,
  {
    ref,
    className: cn(
      "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsx(CheckboxPrimitive.Indicator, { className: cn("flex items-center justify-center text-current"), children: /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }) })
  }
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;
const Input = React.forwardRef(
  ({ className, type, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "input",
      {
        type,
        className: cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Input.displayName = "Input";
const Progress = React.forwardRef(({ className, value, ...props }, ref) => /* @__PURE__ */ jsx(
  ProgressPrimitive.Root,
  {
    ref,
    className: cn("relative h-4 w-full overflow-hidden rounded-full bg-secondary", className),
    ...props,
    children: /* @__PURE__ */ jsx(
      ProgressPrimitive.Indicator,
      {
        className: "h-full w-full flex-1 bg-primary transition-all",
        style: { transform: "translateX(-".concat(100 - (value || 0), "%)") }
      }
    )
  }
));
Progress.displayName = ProgressPrimitive.Root.displayName;
const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return /* @__PURE__ */ jsx(
    "textarea",
    {
      className: cn(
        "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ref,
      ...props
    }
  );
});
Textarea.displayName = "Textarea";
const STORAGE_KEY = "wizionar-project-inquiry-draft";
const LAST_SUBMIT_KEY = "wizionar-project-inquiry-last-submit";
const ADMIN_EMAIL = "info@wizionar.com";
const formatDate = (date = /* @__PURE__ */ new Date()) => new Intl.DateTimeFormat("bs-BA", {
  timeZone: "Europe/Sarajevo",
  day: "2-digit",
  month: "2-digit",
  year: "numeric"
}).format(date);
const formatDateTime = (date = /* @__PURE__ */ new Date()) => new Intl.DateTimeFormat("bs-BA", {
  timeZone: "Europe/Sarajevo",
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit"
}).format(date);
const createChallenge = () => {
  const first = Math.floor(Math.random() * 7) + 3;
  const second = Math.floor(Math.random() * 5) + 1;
  const useMinus = first > second + 2 && Math.random() > 0.5;
  return {
    first,
    second,
    operator: useMinus ? "-" : "+",
    expected: useMinus ? first - second : first + second
  };
};
const isEmptyValue = (value) => {
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === "boolean") return !value;
  return value === null || value === void 0 || String(value).trim() === "";
};
const sanitizeText = (value) => {
  if (Array.isArray(value)) return value.map((item) => String(item).replace(/[<>]/g, "").trim()).filter(Boolean);
  if (typeof value === "boolean") return value;
  if (value === null || value === void 0) return "";
  return String(value).replace(/[<>]/g, "").trim().slice(0, 5e3);
};
const getOptionLabel = (field, value) => {
  var _a2, _b;
  return ((_b = (_a2 = field.options) == null ? void 0 : _a2.find((option) => option.value === value)) == null ? void 0 : _b.label) || value;
};
const formatValue = (field, value) => {
  if (Array.isArray(value)) {
    return value.map((item) => getOptionLabel(field, item)).join(", ");
  }
  if (typeof value === "boolean") {
    return value ? "Da" : "Ne";
  }
  return getOptionLabel(field, String(value || ""));
};
const buildStructuredAnswers = (answers, steps) => getVisibleSteps(answers, steps).flatMap(
  (step) => getVisibleFields(step, answers).map((field) => {
    const value = sanitizeText(answers[field.key]);
    return {
      stepKey: step.key,
      stepTitle: step.title,
      key: field.key,
      label: field.label,
      value,
      displayValue: formatValue(field, value)
    };
  })
).filter((item) => !isEmptyValue(item.value));
const buildEmailBody = (answers, language, steps, intro) => {
  const complexityScore = calculateComplexityScore(answers);
  const budgetScore = calculateBudgetScore(answers.budget_range);
  const lines = [
    intro || "Novi projektni upitnik - Wizionar",
    "",
    "Jezik: ".concat(language),
    "Complexity score: ".concat(complexityScore),
    "Budget score: ".concat(budgetScore),
    "Datum: ".concat(formatDateTime()),
    "",
    "Odgovori:",
    ...buildStructuredAnswers(answers, steps).flatMap((item) => ["", "".concat(item.label, ":"), String(item.displayValue || "-")])
  ];
  return lines.join("\n");
};
const submitInquiry = async (answers, language, steps, copy2, protection) => {
  calculateComplexityScore(answers);
  calculateBudgetScore(answers.budget_range);
  buildStructuredAnswers(answers, steps);
  const clientEmail = String(sanitizeText(answers.email) || "");
  const adminBody = buildEmailBody(answers, language, steps, copy2.adminSubject);
  buildEmailBody(answers, language, steps, copy2.confirmationIntro);
  ({
    submittedAt: (/* @__PURE__ */ new Date()).toISOString(),
    submittedDate: formatDate(),
    submittedDateTime: formatDateTime(),
    emailDelivery: {
      admin: {
        subject: "".concat(copy2.adminSubject, " - ").concat(String(answers.full_name || "")).trim()
      },
      client: {
        subject: copy2.confirmationSubject
      }
    },
    contact: {
      fullName: sanitizeText(answers.full_name),
      companyName: sanitizeText(answers.company_name),
      email: sanitizeText(answers.email),
      phone: sanitizeText(answers.phone),
      location: sanitizeText(answers.location)
    },
    projectType: sanitizeText(answers.project_type),
    budgetRange: sanitizeText(answers.budget_range),
    desiredStart: sanitizeText(answers.desired_start),
    nextStep: sanitizeText(answers.next_step)
  });
  {
    const subject = encodeURIComponent("Projektni upitnik - ".concat(String(answers.full_name || "novi klijent")));
    const body = encodeURIComponent(adminBody);
    const cc = clientEmail ? "&cc=".concat(encodeURIComponent(clientEmail)) : "";
    window.location.href = "mailto:".concat(ADMIN_EMAIL, "?subject=").concat(subject).concat(cc, "&body=").concat(body);
    return { fallbackMailto: true };
  }
};
const getInputType = (type) => {
  if (type === "email") return "email";
  if (type === "phone") return "tel";
  if (type === "url") return "url";
  return "text";
};
const SecurityChallenge = ({
  challenge,
  value,
  onChange,
  error,
  title,
  placeholder
}) => /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-border bg-secondary/30 p-4", children: [
  /* @__PURE__ */ jsxs("div", { className: "mb-3 flex items-center gap-2 text-sm font-semibold", children: [
    /* @__PURE__ */ jsx(CheckCircle2, { className: "h-4 w-4 text-primary" }),
    title
  ] }),
  /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3 sm:flex-row sm:items-center", children: [
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: "inline-flex h-14 min-w-36 select-none items-center justify-center gap-3 rounded-lg border border-dashed border-primary/40 bg-background px-5 font-bold text-2xl tracking-normal text-foreground",
        "aria-label": "Matematički zadatak ".concat(challenge.first, " ").concat(challenge.operator, " ").concat(challenge.second),
        children: [
          /* @__PURE__ */ jsx("span", { className: "-rotate-3", children: challenge.first }),
          /* @__PURE__ */ jsx("span", { className: "text-primary", children: challenge.operator }),
          /* @__PURE__ */ jsx("span", { className: "rotate-2", children: challenge.second }),
          /* @__PURE__ */ jsx("span", { children: "=" }),
          /* @__PURE__ */ jsx("span", { children: "?" })
        ]
      }
    ),
    /* @__PURE__ */ jsx(
      Input,
      {
        value,
        inputMode: "numeric",
        pattern: "[0-9]*",
        onChange: (event) => onChange(event.target.value),
        placeholder,
        className: "h-12 max-w-48 rounded-lg"
      }
    )
  ] }),
  error ? /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-destructive", children: error }) : null
] });
const OptionButton = ({
  option,
  selected,
  multiple,
  onClick
}) => /* @__PURE__ */ jsxs(
  "button",
  {
    type: "button",
    onClick,
    className: cn(
      "flex min-h-14 w-full items-start gap-3 rounded-xl border p-4 text-left transition-all hover:border-primary/50 hover:bg-primary/5",
      selected ? "border-primary bg-primary/5 shadow-sm" : "border-border bg-background"
    ),
    children: [
      /* @__PURE__ */ jsx(
        "span",
        {
          className: cn(
            "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border",
            multiple ? "rounded" : "rounded-full",
            selected ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground/35"
          ),
          children: selected ? /* @__PURE__ */ jsx(Check, { className: "h-3.5 w-3.5" }) : null
        }
      ),
      /* @__PURE__ */ jsxs("span", { className: "min-w-0", children: [
        /* @__PURE__ */ jsx("span", { className: "block text-sm font-semibold leading-5", children: option.label }),
        option.description ? /* @__PURE__ */ jsx("span", { className: "mt-1 block text-sm leading-5 text-muted-foreground", children: option.description }) : null
      ] })
    ]
  }
);
const QuestionRenderer = ({
  field,
  value,
  error,
  onChange
}) => {
  var _a2, _b, _c;
  const fieldId = "inquiry-".concat(field.key);
  if (field.type === "single_choice") {
    return /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsx(QuestionLabel, { field, htmlFor: fieldId }),
      /* @__PURE__ */ jsx("div", { className: "grid gap-3 md:grid-cols-2", children: (_a2 = field.options) == null ? void 0 : _a2.map((option) => /* @__PURE__ */ jsx(
        OptionButton,
        {
          option,
          selected: value === option.value,
          onClick: () => onChange(field.key, option.value)
        },
        option.value
      )) }),
      /* @__PURE__ */ jsx(QuestionError, { error })
    ] });
  }
  if (field.type === "multiple_choice") {
    const selectedValues = Array.isArray(value) ? value : [];
    return /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsx(QuestionLabel, { field, htmlFor: fieldId }),
      /* @__PURE__ */ jsx("div", { className: "grid gap-3 md:grid-cols-2", children: (_b = field.options) == null ? void 0 : _b.map((option) => {
        const selected = selectedValues.includes(option.value);
        return /* @__PURE__ */ jsx(
          OptionButton,
          {
            option,
            multiple: true,
            selected,
            onClick: () => onChange(
              field.key,
              selected ? selectedValues.filter((item) => item !== option.value) : [...selectedValues, option.value]
            )
          },
          option.value
        );
      }) }),
      /* @__PURE__ */ jsx(QuestionError, { error })
    ] });
  }
  if (field.type === "ranking") {
    const selectedValues = Array.isArray(value) ? value : [];
    return /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsx(QuestionLabel, { field, htmlFor: fieldId }),
      /* @__PURE__ */ jsx("div", { className: "grid gap-2 sm:grid-cols-2 lg:grid-cols-3", children: (_c = field.options) == null ? void 0 : _c.map((option) => {
        const rank = selectedValues.indexOf(option.value) + 1;
        return /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            onClick: () => onChange(
              field.key,
              rank ? selectedValues.filter((item) => item !== option.value) : [...selectedValues, option.value]
            ),
            className: cn(
              "flex h-12 items-center justify-between rounded-lg border px-3 text-sm font-medium transition-colors",
              rank ? "border-primary bg-primary/5 text-foreground" : "border-border bg-background hover:bg-secondary/50"
            ),
            children: [
              /* @__PURE__ */ jsx("span", { children: option.label }),
              rank ? /* @__PURE__ */ jsx("span", { className: "flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground", children: rank }) : null
            ]
          },
          option.value
        );
      }) }),
      /* @__PURE__ */ jsx(QuestionError, { error })
    ] });
  }
  if (field.type === "textarea") {
    return /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsx(QuestionLabel, { field, htmlFor: fieldId }),
      /* @__PURE__ */ jsx(
        Textarea,
        {
          id: fieldId,
          value: String(value || ""),
          onChange: (event) => onChange(field.key, event.target.value),
          placeholder: field.placeholder,
          className: "min-h-32 rounded-xl"
        }
      ),
      /* @__PURE__ */ jsx(QuestionError, { error })
    ] });
  }
  if (field.type === "consent") {
    return /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxs("label", { className: "flex items-start gap-3 rounded-xl border border-border bg-secondary/20 p-4 text-sm", children: [
        /* @__PURE__ */ jsx(
          Checkbox,
          {
            checked: Boolean(value),
            onCheckedChange: (checked) => onChange(field.key, Boolean(checked)),
            className: "mt-0.5"
          }
        ),
        /* @__PURE__ */ jsxs("span", { children: [
          /* @__PURE__ */ jsx("span", { className: "font-medium", children: field.label }),
          field.required ? /* @__PURE__ */ jsx("span", { className: "text-primary", children: " *" }) : null
        ] })
      ] }),
      /* @__PURE__ */ jsx(QuestionError, { error })
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
    /* @__PURE__ */ jsx(QuestionLabel, { field, htmlFor: fieldId }),
    /* @__PURE__ */ jsx(
      Input,
      {
        id: fieldId,
        type: getInputType(field.type),
        value: String(value || ""),
        onChange: (event) => onChange(field.key, event.target.value),
        placeholder: field.type === "date" ? field.placeholder || "dd.mm.gggg" : field.placeholder,
        inputMode: field.type === "date" ? "numeric" : void 0,
        className: "h-12 rounded-xl"
      }
    ),
    /* @__PURE__ */ jsx(QuestionError, { error })
  ] });
};
const QuestionLabel = ({ field, htmlFor }) => /* @__PURE__ */ jsxs("label", { htmlFor, className: "block", children: [
  /* @__PURE__ */ jsxs("span", { className: "text-sm font-semibold", children: [
    field.label,
    field.required ? /* @__PURE__ */ jsx("span", { className: "text-primary", children: " *" }) : null
  ] }),
  field.description ? /* @__PURE__ */ jsx("span", { className: "mt-1 block text-sm leading-5 text-muted-foreground", children: field.description }) : null
] });
const QuestionError = ({ error }) => error ? /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-destructive", children: error }) : null;
const ProjectInquiry = () => {
  const { language } = useLanguage();
  const copy2 = projectInquiryCopy[language];
  const [answers, setAnswers] = useState({});
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [errors, setErrors] = useState({});
  const [submitState, setSubmitState] = useState("idle");
  const [submitMessage, setSubmitMessage] = useState("");
  const [challenge, setChallenge] = useState(() => createChallenge());
  const [challengeAnswer, setChallengeAnswer] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [startedAt] = useState(() => Date.now());
  const inquirySteps = useMemo(() => getProjectInquirySteps(language), [language]);
  const visibleSteps = useMemo(() => getVisibleSteps(answers, inquirySteps), [answers, inquirySteps]);
  const currentStep = visibleSteps[currentStepIndex] || visibleSteps[0];
  const currentFields = useMemo(
    () => currentStep ? getVisibleFields(currentStep, answers) : [],
    [answers, currentStep]
  );
  const progress = Math.round((currentStepIndex + 1) / visibleSteps.length * 100);
  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return;
    try {
      setAnswers(JSON.parse(stored));
    } catch (e) {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, []);
  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
  }, [answers]);
  useEffect(() => {
    if (currentStepIndex > visibleSteps.length - 1) {
      setCurrentStepIndex(Math.max(visibleSteps.length - 1, 0));
    }
  }, [currentStepIndex, visibleSteps.length]);
  const updateAnswer = (key, value) => {
    setAnswers((previous) => ({ ...previous, [key]: value }));
    setErrors((previous) => {
      const next = { ...previous };
      delete next[key];
      return next;
    });
  };
  const validateFields = (fields) => {
    const nextErrors = {};
    fields.forEach((field) => {
      const value = answers[field.key];
      if (field.required && isEmptyValue(value)) {
        nextErrors[field.key] = copy2.required;
        return;
      }
      if (!isEmptyValue(value) && field.type === "email") {
        const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value));
        if (!validEmail) nextErrors[field.key] = copy2.invalidEmail;
      }
      if (!isEmptyValue(value) && field.type === "url") {
        try {
          const url = new URL(String(value));
          if (!["http:", "https:"].includes(url.protocol)) {
            nextErrors[field.key] = copy2.invalidProtocol;
          }
        } catch (e) {
          nextErrors[field.key] = copy2.invalidUrl;
        }
      }
      if (!isEmptyValue(value) && field.type === "date") {
        const validDate = /^(0[1-9]|[12]\d|3[01])\.(0[1-9]|1[0-2])\.(19|20)\d{2}$/.test(String(value));
        if (!validDate) nextErrors[field.key] = copy2.invalidDate;
      }
    });
    setErrors((previous) => ({ ...previous, ...nextErrors }));
    return Object.keys(nextErrors).length === 0;
  };
  const goNext = () => {
    if (!validateFields(currentFields)) return;
    setCurrentStepIndex((index) => Math.min(index + 1, visibleSteps.length - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const goBack = () => {
    setCurrentStepIndex((index) => Math.max(index - 1, 0));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const validateProtection = () => {
    const nextErrors = {};
    const lastSubmitAt = Number(window.localStorage.getItem(LAST_SUBMIT_KEY) || 0);
    const secondsSinceLastSubmit = (Date.now() - lastSubmitAt) / 1e3;
    const secondsSinceStart = (Date.now() - startedAt) / 1e3;
    if (honeypot.trim()) {
      nextErrors.protection = copy2.protectionFailed;
    }
    if (secondsSinceStart < 8) {
      nextErrors.protection = copy2.tooFast;
    }
    if (secondsSinceLastSubmit < 60) {
      nextErrors.protection = copy2.rateLimited;
    }
    if (Number(challengeAnswer) !== challenge.expected) {
      nextErrors.challenge = copy2.wrongChallenge;
    }
    setErrors((previous) => ({ ...previous, ...nextErrors }));
    return Object.keys(nextErrors).length === 0;
  };
  const handleSubmit = async () => {
    const allFieldsValid = validateFields(getAllVisibleFields(answers, inquirySteps));
    if (!allFieldsValid || !validateProtection()) return;
    setSubmitState("submitting");
    setSubmitMessage("");
    try {
      const result = await submitInquiry(answers, language, inquirySteps, copy2, { honeypot, startedAt });
      window.localStorage.setItem(LAST_SUBMIT_KEY, String(Date.now()));
      window.localStorage.removeItem(STORAGE_KEY);
      setSubmitMessage(result.fallbackMailto ? copy2.noEndpoint : "");
      setSubmitState("success");
    } catch (error) {
      setSubmitState("error");
      setSubmitMessage("".concat(copy2.errorTitle, " Provjerite vezu ili pokušajte ponovo."));
      setChallenge(createChallenge());
      setChallengeAnswer("");
    }
  };
  if (submitState === "success") {
    return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-background", children: [
      /* @__PURE__ */ jsx(SEOHead, { title: copy2.seoTitle, description: copy2.seoDescription, noIndex: true }),
      /* @__PURE__ */ jsx(WizionarHeader, {}),
      /* @__PURE__ */ jsx("main", { className: "pt-32", children: /* @__PURE__ */ jsx("section", { className: "container mx-auto px-6 py-20", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-2xl rounded-2xl border border-border bg-background p-8 text-center shadow-lg", children: [
        /* @__PURE__ */ jsx("div", { className: "mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary", children: /* @__PURE__ */ jsx(CheckCircle2, { className: "h-7 w-7" }) }),
        /* @__PURE__ */ jsx("h1", { className: "mb-3 text-3xl font-bold", children: copy2.successTitle }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: copy2.successText }),
        submitMessage ? /* @__PURE__ */ jsx("p", { className: "mt-5 rounded-xl bg-secondary p-4 text-sm text-muted-foreground", children: submitMessage }) : null
      ] }) }) }),
      /* @__PURE__ */ jsx(WizionarFooter, {})
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gradient-hero", children: [
    /* @__PURE__ */ jsx(
      SEOHead,
      {
        title: copy2.seoTitle,
        description: copy2.seoDescription,
        keywords: ["projektni upitnik", "izrada web stranica", "web shop", "web aplikacija", "booking sistem"],
        schema: [
          createWebPageSchema({
            language,
            path: PROJECT_INQUIRY_PATH,
            title: copy2.seoTitle,
            description: copy2.seoDescription
          }),
          createBreadcrumbSchema(language, [
            { name: getSeoLabel(language, "home"), path: "/" },
            { name: "Projektni upitnik", path: PROJECT_INQUIRY_PATH }
          ])
        ]
      }
    ),
    /* @__PURE__ */ jsx(WizionarHeader, {}),
    /* @__PURE__ */ jsx("main", { className: "pt-28", children: /* @__PURE__ */ jsx("section", { className: "container mx-auto px-6 pb-8 pt-10", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-5xl", children: [
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.45 },
          className: "mb-8",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary", children: [
              /* @__PURE__ */ jsx(ClipboardList, { className: "h-4 w-4" }),
              copy2.badge
            ] }),
            /* @__PURE__ */ jsx("h1", { className: "max-w-3xl text-4xl font-bold tracking-tight md:text-5xl", children: copy2.title }),
            /* @__PURE__ */ jsx("p", { className: "mt-5 max-w-3xl text-lg leading-8 text-muted-foreground", children: copy2.subtitle })
          ]
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-4xl", children: /* @__PURE__ */ jsxs(
        motion.form,
        {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.45, delay: 0.08 },
          className: "rounded-2xl border border-border bg-background p-5 shadow-lg md:p-8",
          onSubmit: (event) => {
            event.preventDefault();
            if (currentStepIndex === visibleSteps.length - 1) {
              void handleSubmit();
            } else {
              goNext();
            }
          },
          children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: honeypot,
                onChange: (event) => setHoneypot(event.target.value),
                tabIndex: -1,
                autoComplete: "off",
                className: "hidden",
                name: "website_url",
                "aria-hidden": "true"
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
              /* @__PURE__ */ jsxs("div", { className: "mb-3 flex items-center justify-between gap-4 text-sm text-muted-foreground", children: [
                /* @__PURE__ */ jsxs("span", { children: [
                  copy2.step,
                  " ",
                  currentStepIndex + 1,
                  "/",
                  visibleSteps.length
                ] }),
                /* @__PURE__ */ jsxs("span", { children: [
                  copy2.progress,
                  " ",
                  progress,
                  "%"
                ] })
              ] }),
              /* @__PURE__ */ jsx(Progress, { value: progress, className: "h-2" })
            ] }),
            currentStepIndex === 0 ? /* @__PURE__ */ jsxs("div", { className: "mb-8 rounded-xl border border-primary/15 bg-primary/5 p-4", children: [
              /* @__PURE__ */ jsx("h2", { className: "mb-2 text-lg font-bold", children: copy2.introTitle }),
              /* @__PURE__ */ jsx("p", { className: "text-sm leading-6 text-muted-foreground", children: copy2.introText })
            ] }) : null,
            /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
              /* @__PURE__ */ jsx("p", { className: "mb-2 text-sm font-semibold text-primary", children: currentStep.eyebrow }),
              /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold", children: currentStep.title }),
              /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm leading-6 text-muted-foreground", children: currentStep.description })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-7", children: [
              currentFields.map((field) => /* @__PURE__ */ jsx(
                QuestionRenderer,
                {
                  field,
                  value: answers[field.key],
                  error: errors[field.key],
                  onChange: updateAnswer
                },
                field.key
              )),
              currentStepIndex === visibleSteps.length - 1 ? /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                /* @__PURE__ */ jsx(
                  SecurityChallenge,
                  {
                    challenge,
                    value: challengeAnswer,
                    title: copy2.challengeTitle,
                    placeholder: copy2.challengePlaceholder,
                    onChange: (value) => {
                      setChallengeAnswer(value);
                      setErrors((previous) => {
                        const next = { ...previous };
                        delete next.challenge;
                        return next;
                      });
                    },
                    error: errors.challenge
                  }
                ),
                errors.protection ? /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-destructive", children: errors.protection }) : null
              ] }) : null
            ] }),
            submitState === "error" ? /* @__PURE__ */ jsx("div", { className: "mt-6 rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive", children: submitMessage }) : null,
            /* @__PURE__ */ jsxs("div", { className: "mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between", children: [
              /* @__PURE__ */ jsxs(
                Button,
                {
                  type: "button",
                  variant: "outline",
                  onClick: goBack,
                  disabled: currentStepIndex === 0 || submitState === "submitting",
                  className: "h-12 rounded-xl gap-2",
                  children: [
                    /* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4" }),
                    copy2.back
                  ]
                }
              ),
              /* @__PURE__ */ jsx(Button, { type: "submit", disabled: submitState === "submitting", className: "h-12 rounded-xl gap-2 shadow-orange", children: submitState === "submitting" ? /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 animate-spin" }),
                copy2.sending
              ] }) : currentStepIndex === visibleSteps.length - 1 ? /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx(Mail, { className: "h-4 w-4" }),
                copy2.submit
              ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
                currentStepIndex === 0 ? copy2.start : copy2.next,
                /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })
              ] }) })
            ] })
          ]
        }
      ) })
    ] }) }) }),
    /* @__PURE__ */ jsx(WizionarFooter, {})
  ] });
};
const ProjectInquiry$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ProjectInquiry
}, Symbol.toStringTag, { value: "Module" }));
const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 }
};
const portfolioProjects = [
  {
    slug: "bnc-shop",
    title: "BNC Shop",
    image: portfolioBncWebshop,
    gallery: [portfolioBncWebshop],
    liveUrl: "https://bnc.ba",
    client: {
      sr: "BNC",
      en: "BNC",
      de: "BNC",
      it: "BNC"
    },
    category: {
      sr: "Custom eCommerce platforma",
      en: "Custom eCommerce platform",
      de: "Maßgeschneiderte E-Commerce-Plattform",
      it: "Piattaforma eCommerce personalizzata"
    },
    description: {
      sr: "Razvoj custom eCommerce platforme koja objedinjuje online prodaju, B2B poslovanje i interne procese u jedinstven sistem. Moderna platforma za upravljanje proizvodima, narudžbama, marketing kampanjama, poslovnim kupcima i internim procesima, uz visok nivo automatizacije i mogućnost daljeg razvoja.",
      en: "Development of a custom eCommerce platform that unifies online sales, B2B operations and internal processes into a single system. A modern platform for managing products, orders, marketing campaigns, business customers and internal processes, with a high level of automation and room to grow.",
      de: "Entwicklung einer maßgeschneiderten E-Commerce-Plattform, die Online-Verkauf, B2B-Geschäft und interne Prozesse in einem System vereint. Eine moderne Plattform zur Verwaltung von Produkten, Bestellungen, Marketingkampagnen, Geschäftskunden und internen Prozessen mit hohem Automatisierungsgrad und Entwicklungspotenzial.",
      it: "Sviluppo di una piattaforma eCommerce personalizzata che unifica vendite online, operazioni B2B e processi interni in un unico sistema. Una piattaforma moderna per la gestione di prodotti, ordini, campagne marketing, clienti business e processi interni, con alto livello di automazione e possibilità di crescita."
    },
    challenge: {
      sr: "Kako je broj proizvoda, kupaca i prodajnih kanala rastao, postojeće rješenje više nije moglo pratiti razvoj poslovanja. Veliki dio procesa zahtijevao je ručne intervencije, podaci su dolazili iz različitih sistema, a administracija je postajala sve složenija.",
      en: "As the number of products, customers and sales channels grew, the existing solution could no longer keep up with business development. Much of the process required manual intervention, data came from different systems, and administration was becoming increasingly complex.",
      de: "Mit wachsender Anzahl an Produkten, Kunden und Vertriebskanälen konnte die bestehende Lösung die Geschäftsentwicklung nicht mehr mithalten. Viele Prozesse erforderten manuelle Eingriffe, Daten kamen aus verschiedenen Systemen und die Administration wurde zunehmend komplexer.",
      it: "Con la crescita del numero di prodotti, clienti e canali di vendita, la soluzione esistente non riusciva più a tenere il passo con lo sviluppo del business. Gran parte dei processi richiedeva interventi manuali, i dati provenivano da sistemi diversi e l'amministrazione diventava sempre più complessa."
    },
    solution: {
      sr: "Osmislili smo i razvili platformu koja ne rješava samo prodaju putem interneta, već povezuje kompletan poslovni ekosistem u jedno centralizovano rješenje — sa automatskom sinhronizacijom podataka, alatima za marketing tim i iskustvom prilagođenim različitim tipovima korisnika.",
      en: "We designed and developed a platform that doesn't just handle online sales, but connects the entire business ecosystem into one centralized solution — with automatic data synchronization, tools for the marketing team and experiences tailored to different user types.",
      de: "Wir konzipierten und entwickelten eine Plattform, die nicht nur den Online-Verkauf abwickelt, sondern das gesamte Geschäftsökosystem in einer zentralen Lösung verbindet — mit automatischer Datensynchronisation, Tools für das Marketing-Team und auf verschiedene Nutzertypen zugeschnittenen Erlebnissen.",
      it: "Abbiamo progettato e sviluppato una piattaforma che non si limita alla vendita online, ma collega l'intero ecosistema aziendale in un'unica soluzione centralizzata — con sincronizzazione automatica dei dati, strumenti per il team marketing ed esperienze personalizzate per diversi tipi di utenti."
    },
    features: {
      sr: [
        "Automatska sinhronizacija proizvoda i zaliha",
        "B2B portal sa prilagođenim cijenama",
        "Napredna pretraga i filtriranje",
        "Marketing alati (kuponi, promocije, akcije)",
        "Administrativni panel",
        "Sistem lojalnosti"
      ],
      en: [
        "Automatic product and stock synchronization",
        "B2B portal with custom pricing",
        "Advanced search and filtering",
        "Marketing tools (coupons, promotions, campaigns)",
        "Admin panel",
        "Loyalty system"
      ],
      de: [
        "Automatische Produkt- und Bestandssynchronisation",
        "B2B-Portal mit individuellen Preisen",
        "Erweiterte Suche und Filterung",
        "Marketing-Tools (Gutscheine, Aktionen, Kampagnen)",
        "Administrationspanel",
        "Treueprogramm"
      ],
      it: [
        "Sincronizzazione automatica prodotti e scorte",
        "Portale B2B con prezzi personalizzati",
        "Ricerca e filtri avanzati",
        "Strumenti marketing (coupon, promozioni, campagne)",
        "Pannello amministrativo",
        "Sistema fedeltà"
      ]
    },
    technologies: ["Custom Backend", "REST API", "MySQL", "ERP integracija", "Responsive Design", "SEO optimizacija"],
    results: {
      sr: [
        "Centralizovana digitalna platforma",
        "Automatizacija svakodnevnih procesa",
        "Platforma spremna za dalji rast"
      ],
      en: [
        "Centralized digital platform",
        "Automation of daily processes",
        "Platform ready for further growth"
      ],
      de: [
        "Zentralisierte digitale Plattform",
        "Automatisierung täglicher Prozesse",
        "Plattform bereit für weiteres Wachstum"
      ],
      it: [
        "Piattaforma digitale centralizzata",
        "Automazione dei processi quotidiani",
        "Piattaforma pronta per ulteriore crescita"
      ]
    }
  },
  {
    slug: "techflow-dashboard",
    title: "TechFlow Dashboard",
    image: portfolioCorporate,
    gallery: [portfolioCorporate, portfolioEshop, portfolioMedical, portfolioRestaurant],
    client: {
      sr: "TechFlow Solutions",
      en: "TechFlow Solutions",
      de: "TechFlow Solutions",
      it: "TechFlow Solutions"
    },
    category: {
      sr: "Korporativni web sajt",
      en: "Corporate website",
      de: "Unternehmenswebsite",
      it: "Sito web aziendale"
    },
    description: {
      sr: "Korporativni dashboard sa analitikom i izvještavanjem za finansijsku kompaniju. Kompleksan projekat koji je zahtijevao integraciju višestrukih izvora podataka i prikaz u realnom vremenu.",
      en: "Corporate dashboard with analytics and reporting for a financial company. A complex project requiring integration of multiple data sources and real-time display.",
      de: "Unternehmens-Dashboard mit Analytik und Reporting für ein Finanzunternehmen. Ein komplexes Projekt mit Integration mehrerer Datenquellen und Echtzeitanzeige.",
      it: "Dashboard aziendale con analisi e reportistica per una società finanziaria. Un progetto complesso che richiedeva l'integrazione di più fonti di dati e la visualizzazione in tempo reale."
    },
    challenge: {
      sr: "Klijent je trebao centralizovanu platformu za praćenje svih finansijskih metrika u realnom vremenu, sa mogućnošću generisanja izvještaja i vizuelnog prikaza podataka za različite odjele.",
      en: "The client needed a centralized platform to track all financial metrics in real time, with the ability to generate reports and visually present data for different departments.",
      de: "Der Kunde benötigte eine zentrale Plattform zur Echtzeit-Verfolgung aller Finanzkennzahlen mit der Möglichkeit, Berichte zu erstellen und Daten für verschiedene Abteilungen visuell darzustellen.",
      it: "Il cliente aveva bisogno di una piattaforma centralizzata per monitorare tutte le metriche finanziarie in tempo reale, con la possibilità di generare report e visualizzare i dati per diversi dipartimenti."
    },
    solution: {
      sr: "Razvili smo custom dashboard sa interaktivnim grafikonima, automatizovanim izvještajima i pristupom po ulogama. Platforma se integriše sa postojećim ERP sistemom klijenta.",
      en: "We developed a custom dashboard with interactive charts, automated reports and role-based access. The platform integrates with the client's existing ERP system.",
      de: "Wir entwickelten ein maßgeschneidertes Dashboard mit interaktiven Diagrammen, automatisierten Berichten und rollenbasiertem Zugriff. Die Plattform integriert sich in das bestehende ERP-System des Kunden.",
      it: "Abbiamo sviluppato una dashboard personalizzata con grafici interattivi, report automatizzati e accesso basato sui ruoli. La piattaforma si integra con il sistema ERP esistente del cliente."
    },
    features: {
      sr: ["Real-time analitika", "Automatski izvještaji", "Pristup po ulogama", "ERP integracija", "Responsive dizajn", "Dark/Light mode"],
      en: ["Real-time analytics", "Automated reports", "Role-based access", "ERP integration", "Responsive design", "Dark/Light mode"],
      de: ["Echtzeit-Analytik", "Automatisierte Berichte", "Rollenbasierter Zugriff", "ERP-Integration", "Responsives Design", "Dark/Light-Modus"],
      it: ["Analisi in tempo reale", "Report automatizzati", "Accesso basato sui ruoli", "Integrazione ERP", "Design responsive", "Modalità Dark/Light"]
    },
    technologies: ["React", "TypeScript", "Tailwind CSS", "Recharts", "Supabase", "Framer Motion"],
    results: {
      sr: ["40% brže donošenje odluka", "Ušteda 15h sedmično na izvještavanju", "98% uptime platforme"],
      en: ["40% faster decision making", "Saving 15h weekly on reporting", "98% platform uptime"],
      de: ["40% schnellere Entscheidungsfindung", "15h wöchentliche Einsparung bei Berichten", "98% Plattform-Uptime"],
      it: ["40% più veloce u procesu donošenja odluka", "Risparmio di 15h settimanali nei report", "98% uptime della piattaforma"]
    }
  },
  {
    slug: "styleout-fashion-shop",
    title: "StyleOut Fashion Shop",
    image: portfolioEshop,
    gallery: [portfolioEshop, portfolioCorporate, portfolioSalon, portfolioRealestate],
    client: {
      sr: "StyleOut d.o.o.",
      en: "StyleOut Ltd.",
      de: "StyleOut GmbH",
      it: "StyleOut Srl"
    },
    category: {
      sr: "Web shop",
      en: "E-commerce",
      de: "Webshop",
      it: "E-commerce"
    },
    description: {
      sr: "Moderan fashion web shop sa naprednim filterima, wishlist-om i online plaćanjem. Kompletan e-commerce sistem prilagođen modnoj industriji.",
      en: "Modern fashion web shop with advanced filters, wishlist and online payment. A complete e-commerce system tailored for the fashion industry.",
      de: "Moderner Fashion-Webshop mit erweiterten Filtern, Wunschliste und Online-Zahlung. Ein komplettes E-Commerce-System für die Modebranche.",
      it: "Web shop di moda moderno con filtri avanzati, wishlist e pagamento online. Un sistema e-commerce completo per l'industria della moda."
    },
    challenge: {
      sr: "Klijent je želio premium online iskustvo kupovine sa brzim pretraživanjem, pametnim filterima i besprijekornim checkout procesom.",
      en: "The client wanted a premium online shopping experience with fast search, smart filters and a seamless checkout process.",
      de: "Der Kunde wollte ein Premium-Online-Einkaufserlebnis mit schneller Suche, intelligenten Filtern und einem nahtlosen Checkout-Prozess.",
      it: "Il cliente desiderava un'esperienza di acquisto online premium con ricerca veloce, filtri intelligenti e un processo di checkout impeccabile."
    },
    solution: {
      sr: "Kreirali smo custom web shop sa intuitivnim UX dizajnom, naprednim filterima po kategorijama, veličinama i bojama, te integrisanim payment gateway-em.",
      en: "We created a custom web shop with intuitive UX design, advanced filters by category, size and color, and an integrated payment gateway.",
      de: "Wir erstellten einen maßgeschneiderten Webshop mit intuitivem UX-Design, erweiterten Filtern nach Kategorie, Größe und Farbe sowie einem integrierten Payment-Gateway.",
      it: "Abbiamo creato un web shop personalizzato con design UX intuitivo, filtri avanzati per categoria, taglia e colore, e un gateway di pagamento integrato."
    },
    features: {
      sr: ["Napredni filteri", "Wishlist", "Online plaćanje", "Praćenje narudžbi", "Responsive dizajn", "SEO optimizacija"],
      en: ["Advanced filters", "Wishlist", "Online payment", "Order tracking", "Responsive design", "SEO optimization"],
      de: ["Erweiterte Filter", "Wunschliste", "Online-Zahlung", "Auftragsverfolgung", "Responsives Design", "SEO-Optimierung"],
      it: ["Filtri avanzati", "Wishlist", "Pagamento online", "Tracciamento ordini", "Design responsive", "Ottimizzazione SEO"]
    },
    technologies: ["React", "TypeScript", "Tailwind CSS", "Stripe", "Supabase", "Framer Motion"],
    results: {
      sr: ["250% rast online prodaje", "35% veća prosječna košarica", "4.8/5 korisničko iskustvo"],
      en: ["250% growth in online sales", "35% higher average cart", "4.8/5 user experience"],
      de: ["250% Wachstum im Online-Umsatz", "35% höherer durchschnittlicher Warenkorb", "4.8/5 Nutzererfahrung"],
      it: ["250% crescita nelle vendite online", "35% carrello medio più alto", "4.8/5 esperienza utente"]
    }
  },
  {
    slug: "mediconnect-klinika",
    title: "MediConnect Klinika",
    image: portfolioMedical,
    gallery: [portfolioMedical, portfolioRealestate, portfolioCorporate, portfolioSalon],
    client: {
      sr: "MediConnect Klinika",
      en: "MediConnect Clinic",
      de: "MediConnect Klinik",
      it: "Clinica MediConnect"
    },
    category: {
      sr: "Medicinska platforma",
      en: "Medical platform",
      de: "Medizinische Plattform",
      it: "Piattaforma medica"
    },
    description: {
      sr: "Platforma za medicinsku ustanovu sa online zakazivanjem termina, profilima doktora i informacijama o uslugama.",
      en: "Platform for a medical institution with online appointment scheduling, doctor profiles and service information.",
      de: "Plattform für eine medizinische Einrichtung mit Online-Terminbuchung, Arztprofilen und Serviceinformationen.",
      it: "Piattaforma per un istituto medico con prenotazione appuntamenti online, profili dei medici e informazioni sui servizi."
    },
    challenge: {
      sr: "Klinika je trebala modernu web platformu koja će smanjiti broj telefonskih poziva i omogućiti pacijentima jednostavno zakazivanje termina.",
      en: "The clinic needed a modern web platform to reduce phone calls and allow patients to easily schedule appointments.",
      de: "Die Klinik benötigte eine moderne Web-Plattform, um Telefonanrufe zu reduzieren und Patienten eine einfache Terminbuchung zu ermöglichen.",
      it: "La clinica aveva bisogno di una piattaforma web moderna per ridurre le telefonate e permettere ai pazienti di prenotare facilmente gli appuntamenti."
    },
    solution: {
      sr: "Razvili smo platformu sa online zakazivanjem, profilima doktora, sekcijom za usluge i blogom sa medicinskim savjetima.",
      en: "We developed a platform with online booking, doctor profiles, services section and a blog with medical advice.",
      de: "Wir entwickelten eine Plattform mit Online-Buchung, Arztprofilen, Servicebereich und einem Blog mit medizinischen Ratschlägen.",
      it: "Abbiamo sviluppato una piattaforma con prenotazione online, profili dei medici, sezione servizi e un blog con consigli medici."
    },
    features: {
      sr: ["Online zakazivanje", "Profili doktora", "Blog sekcija", "Kontakt forme", "Responsive dizajn", "GDPR usklađenost"],
      en: ["Online booking", "Doctor profiles", "Blog section", "Contact forms", "Responsive design", "GDPR compliance"],
      de: ["Online-Buchung", "Arztprofile", "Blog-Bereich", "Kontaktformulare", "Responsives Design", "DSGVO-Konformität"],
      it: ["Prenotazione online", "Profili medici", "Sezione blog", "Moduli di contatto", "Design responsive", "Conformità GDPR"]
    },
    technologies: ["React", "TypeScript", "Tailwind CSS", "Supabase", "Framer Motion", "React Hook Form"],
    results: {
      sr: ["60% manje telefonskih poziva", "3x više online zakazivanja", "92% zadovoljstvo pacijenata"],
      en: ["60% fewer phone calls", "3x more online bookings", "92% patient satisfaction"],
      de: ["60% weniger Telefonanrufe", "3x mehr Online-Buchungen", "92% Patientenzufriedenheit"],
      it: ["60% meno telefonate", "3x più prenotazioni online", "92% soddisfazione dei pazienti"]
    }
  }
];
const labels = {
  sr: {
    back: "Nazad na portfolio",
    client: "Klijent",
    category: "Kategorija",
    challenge: "Izazov",
    solution: "Naše rješenje",
    features: "Funkcionalnosti",
    tech: "Tehnologije",
    results: "Rezultati",
    cta: "Želite sličan projekat?",
    ctaDesc: "Kontaktirajte nas i razgovarajmo o vašem projektu.",
    ctaBtn: "Kontaktirajte nas"
  },
  en: {
    back: "Back to portfolio",
    client: "Client",
    category: "Category",
    challenge: "Challenge",
    solution: "Our solution",
    features: "Features",
    tech: "Technologies",
    results: "Results",
    cta: "Want a similar project?",
    ctaDesc: "Contact us and let's discuss your project.",
    ctaBtn: "Contact us"
  },
  de: {
    back: "Zurück zum Portfolio",
    client: "Kunde",
    category: "Kategorie",
    challenge: "Herausforderung",
    solution: "Unsere Lösung",
    features: "Funktionen",
    tech: "Technologien",
    results: "Ergebnisse",
    cta: "Möchten Sie ein ähnliches Projekt?",
    ctaDesc: "Kontaktieren Sie uns und lassen Sie uns über Ihr Projekt sprechen.",
    ctaBtn: "Kontaktieren Sie uns"
  },
  it: {
    back: "Torna al portfolio",
    client: "Cliente",
    category: "Categoria",
    challenge: "Sfida",
    solution: "La nostra soluzione",
    features: "Funzionalità",
    tech: "Tecnologie",
    results: "Risultati",
    cta: "Vuoi un progetto simile?",
    ctaDesc: "Contattaci e discutiamo del tuo progetto.",
    ctaBtn: "Contattaci"
  }
};
const featureIcons = [Globe, Smartphone, Search, Zap, Code2, ShoppingCart];
const GalleryCarousel = ({ images, title }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start", slidesToScroll: 1 });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const scrollPrev = useCallback(() => emblaApi == null ? void 0 : emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi == null ? void 0 : emblaApi.scrollNext(), [emblaApi]);
  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);
  return /* @__PURE__ */ jsx("section", { className: "pb-16", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-6", children: /* @__PURE__ */ jsxs(motion.div, { ...fadeUp, className: "relative", children: [
    /* @__PURE__ */ jsx("div", { ref: emblaRef, className: "overflow-hidden rounded-xl", children: /* @__PURE__ */ jsx("div", { className: "flex", children: images.map((image, index) => /* @__PURE__ */ jsx(
      "div",
      {
        className: "mr-4 min-w-0 flex-[0_0_48%] last:mr-0 max-md:flex-[0_0_85%]",
        children: /* @__PURE__ */ jsx("div", { className: "overflow-hidden rounded-xl border border-border shadow-md", children: /* @__PURE__ */ jsx(
          "img",
          {
            src: image,
            alt: "".concat(title, " - ").concat(index + 1),
            loading: "lazy",
            decoding: "async",
            sizes: "(max-width: 768px) 85vw, 48vw",
            className: "aspect-video w-full object-cover"
          }
        ) })
      },
      image
    )) }) }),
    /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        onClick: scrollPrev,
        "aria-label": "Previous project image",
        className: "absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/90 shadow-md transition-colors hover:bg-background",
        children: /* @__PURE__ */ jsx(ChevronLeft, { className: "h-5 w-5" })
      }
    ),
    /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        onClick: scrollNext,
        "aria-label": "Next project image",
        className: "absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/90 shadow-md transition-colors hover:bg-background",
        children: /* @__PURE__ */ jsx(ChevronRight, { className: "h-5 w-5" })
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "mt-4 flex justify-center gap-2", children: images.map((image, index) => /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        onClick: () => emblaApi == null ? void 0 : emblaApi.scrollTo(index),
        "aria-label": "Go to project image ".concat(index + 1),
        className: "h-2.5 w-2.5 rounded-full transition-colors ".concat(index === selectedIndex ? "bg-primary" : "bg-border")
      },
      image
    )) })
  ] }) }) });
};
const ProjectDetail = () => {
  var _a2;
  const { slug } = useParams();
  const { language } = useLanguage();
  const lang = language || "sr";
  const l = (_a2 = labels[lang]) != null ? _a2 : labels.sr;
  const project = portfolioProjects.find((item) => item.slug === slug);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [project]);
  if (!project) {
    return /* @__PURE__ */ jsx(Navigate, { to: "/usluge/izrada-web-stranica#portfolio", replace: true });
  }
  const seoTitle = "".concat(project.title, " | ").concat(project.category[lang], " | Wizionar");
  const seoDescription = project.description[lang];
  const projectPath = "/portfolio/".concat(project.slug);
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-background text-foreground", children: [
    /* @__PURE__ */ jsx(
      SEOHead,
      {
        title: seoTitle,
        description: seoDescription,
        keywords: [project.category[lang], ...project.technologies],
        schema: [
          createCreativeWorkSchema({
            language: lang,
            name: project.title,
            description: seoDescription,
            path: projectPath,
            keywords: [project.category[lang], ...project.technologies]
          }),
          createWebPageSchema({
            language: lang,
            path: projectPath,
            title: seoTitle,
            description: seoDescription
          }),
          createBreadcrumbSchema(lang, [
            { name: getSeoLabel(lang, "home"), path: SEO_PATHS.home },
            { name: getSeoLabel(lang, "services"), path: SEO_PATHS.usluge },
            { name: getSeoLabel(lang, "webDevelopment"), path: SEO_PATHS.webDevelopment },
            { name: getSeoLabel(lang, "portfolio"), path: SEO_PATHS.webDevelopment },
            { name: project.title, path: projectPath }
          ])
        ]
      }
    ),
    /* @__PURE__ */ jsx(WizionarHeader, {}),
    /* @__PURE__ */ jsx("section", { className: "pb-12 pt-28", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6", children: [
      /* @__PURE__ */ jsxs(
        LocalizedLink,
        {
          to: "/usluge/izrada-web-stranica#portfolio",
          className: "mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary",
          children: [
            /* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4" }),
            l.back
          ]
        }
      ),
      /* @__PURE__ */ jsxs(motion.div, { ...fadeUp, children: [
        /* @__PURE__ */ jsx("div", { className: "mb-4 flex flex-wrap gap-3", children: /* @__PURE__ */ jsx("span", { className: "rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary", children: project.category[lang] }) }),
        /* @__PURE__ */ jsx("h1", { className: "mb-4 text-3xl font-bold md:text-5xl", children: project.title }),
        /* @__PURE__ */ jsx("p", { className: "max-w-3xl text-lg text-muted-foreground", children: project.description[lang] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "pb-16", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-6", children: /* @__PURE__ */ jsx(
      motion.div,
      {
        ...fadeUp,
        className: "overflow-hidden rounded-2xl border border-border shadow-lg",
        children: /* @__PURE__ */ jsx(
          "img",
          {
            src: project.image,
            alt: project.title,
            loading: "eager",
            fetchpriority: "high",
            decoding: "async",
            sizes: "(max-width: 768px) 100vw, 1200px",
            className: "aspect-video w-full object-cover"
          }
        )
      }
    ) }) }),
    /* @__PURE__ */ jsx("section", { className: "pb-16", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-6", children: /* @__PURE__ */ jsxs("div", { className: "grid max-w-4xl gap-4 md:grid-cols-2", children: [
      /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-border bg-card p-5", children: [
        /* @__PURE__ */ jsx("span", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: l.client }),
        /* @__PURE__ */ jsx("p", { className: "mt-1 font-semibold", children: project.client[lang] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-border bg-card p-5", children: [
        /* @__PURE__ */ jsx("span", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: l.category }),
        /* @__PURE__ */ jsx("p", { className: "mt-1 font-semibold", children: project.category[lang] })
      ] })
    ] }) }) }),
    project.gallery.length > 1 && /* @__PURE__ */ jsx(GalleryCarousel, { images: project.gallery, title: project.title }),
    /* @__PURE__ */ jsx("section", { className: "pb-20", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-6", children: /* @__PURE__ */ jsxs("div", { className: "grid max-w-5xl gap-8 md:grid-cols-2", children: [
      /* @__PURE__ */ jsxs(motion.div, { ...fadeUp, className: "rounded-2xl border border-border bg-card p-8", children: [
        /* @__PURE__ */ jsxs("h2", { className: "mb-4 flex items-center gap-2 text-xl font-bold", children: [
          /* @__PURE__ */ jsx(Shield, { className: "h-5 w-5 text-primary" }),
          l.challenge
        ] }),
        /* @__PURE__ */ jsx("p", { className: "leading-relaxed text-muted-foreground", children: project.challenge[lang] })
      ] }),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          ...fadeUp,
          transition: { delay: 0.1 },
          className: "rounded-2xl border border-primary/20 bg-primary/5 p-8",
          children: [
            /* @__PURE__ */ jsxs("h2", { className: "mb-4 flex items-center gap-2 text-xl font-bold", children: [
              /* @__PURE__ */ jsx(Zap, { className: "h-5 w-5 text-primary" }),
              l.solution
            ] }),
            /* @__PURE__ */ jsx("p", { className: "leading-relaxed text-muted-foreground", children: project.solution[lang] })
          ]
        }
      )
    ] }) }) }),
    /* @__PURE__ */ jsx("section", { className: "bg-secondary/30 py-20", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6", children: [
      /* @__PURE__ */ jsx(motion.div, { ...fadeUp, className: "mb-12 text-center", children: /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold md:text-3xl", children: l.features }) }),
      /* @__PURE__ */ jsx("div", { className: "mx-auto grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-3", children: project.features[lang].map((feature, index) => {
        const Icon = featureIcons[index % featureIcons.length];
        return /* @__PURE__ */ jsxs(
          motion.div,
          {
            ...fadeUp,
            transition: { delay: index * 0.05 },
            className: "flex items-center gap-3 rounded-xl border border-border bg-card p-4",
            children: [
              /* @__PURE__ */ jsx(Icon, { className: "h-5 w-5 shrink-0 text-primary" }),
              /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: feature })
            ]
          },
          feature
        );
      }) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-20", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6", children: [
      /* @__PURE__ */ jsx(motion.div, { ...fadeUp, className: "mb-12 text-center", children: /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold md:text-3xl", children: l.tech }) }),
      /* @__PURE__ */ jsx("div", { className: "mx-auto flex max-w-3xl flex-wrap justify-center gap-3", children: project.technologies.map((technology, index) => /* @__PURE__ */ jsx(
        motion.span,
        {
          ...fadeUp,
          transition: { delay: index * 0.05 },
          className: "rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold",
          children: technology
        },
        technology
      )) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "bg-secondary/30 py-20", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6", children: [
      /* @__PURE__ */ jsx(motion.div, { ...fadeUp, className: "mb-12 text-center", children: /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold md:text-3xl", children: l.results }) }),
      /* @__PURE__ */ jsx("div", { className: "mx-auto grid max-w-4xl gap-6 sm:grid-cols-3", children: project.results[lang].map((result, index) => /* @__PURE__ */ jsxs(
        motion.div,
        {
          ...fadeUp,
          transition: { delay: index * 0.1 },
          className: "rounded-2xl border border-border bg-card p-6 text-center",
          children: [
            /* @__PURE__ */ jsx(CheckCircle2, { className: "mx-auto mb-3 h-8 w-8 text-primary" }),
            /* @__PURE__ */ jsx("p", { className: "font-bold", children: result })
          ]
        },
        result
      )) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-24", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-6 text-center", children: /* @__PURE__ */ jsxs(motion.div, { ...fadeUp, children: [
      /* @__PURE__ */ jsx("h2", { className: "mb-4 text-2xl font-bold md:text-3xl", children: l.cta }),
      /* @__PURE__ */ jsx("p", { className: "mx-auto mb-8 max-w-xl text-lg text-muted-foreground", children: l.ctaDesc }),
      /* @__PURE__ */ jsxs(
        "a",
        {
          href: "mailto:info@wizionar.com",
          className: "inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-3 font-semibold text-primary-foreground shadow-md transition-colors hover:bg-primary/90",
          children: [
            l.ctaBtn,
            /* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4 rotate-180" })
          ]
        }
      )
    ] }) }) }),
    /* @__PURE__ */ jsx(WizionarFooter, {})
  ] });
};
const ProjectDetail$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ProjectDetail,
  portfolioProjects
}, Symbol.toStringTag, { value: "Module" }));
const copy = {
  sr: {
    title: "Stranica nije pronađena | Wizionar",
    heading: "404",
    text: "Tražena stranica nije pronađena.",
    link: "Povratak na početnu"
  },
  en: {
    title: "Page not found | Wizionar",
    heading: "404",
    text: "The page you requested could not be found.",
    link: "Return to home"
  },
  de: {
    title: "Seite nicht gefunden | Wizionar",
    heading: "404",
    text: "Die angeforderte Seite wurde nicht gefunden.",
    link: "Zur Startseite"
  },
  it: {
    title: "Pagina non trovata | Wizionar",
    heading: "404",
    text: "La pagina richiesta non è stata trovata.",
    link: "Torna alla home"
  }
};
const NotFound = () => {
  const location = useLocation();
  const { language } = useLanguage();
  const t = copy[language];
  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);
  return /* @__PURE__ */ jsxs("div", { className: "flex min-h-screen items-center justify-center bg-muted", children: [
    /* @__PURE__ */ jsx(
      SEOHead,
      {
        title: t.title,
        description: t.text,
        noIndex: true
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsx("h1", { className: "mb-4 text-4xl font-bold", children: t.heading }),
      /* @__PURE__ */ jsx("p", { className: "mb-4 text-xl text-muted-foreground", children: t.text }),
      /* @__PURE__ */ jsx(LocalizedLink, { to: "/", className: "text-primary underline hover:text-primary/90", children: t.link })
    ] })
  ] });
};
const NotFound$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: NotFound
}, Symbol.toStringTag, { value: "Module" }));
const prerenderBasePaths = [
  SEO_PATHS.home,
  SEO_PATHS.wizflussi,
  SEO_PATHS.wizmedikReports,
  SEO_PATHS.wizmedik,
  SEO_PATHS.frizerino,
  SEO_PATHS.chatko,
  SEO_PATHS.usluge,
  SEO_PATHS.webDevelopment,
  SEO_PATHS.seoOptimization,
  SEO_PATHS.graphicDesign,
  SEO_PATHS.projectInquiry,
  ...portfolioProjects.map((project) => "/portfolio/".concat(project.slug))
];
const prerenderRoutes = prerenderBasePaths.flatMap(
  (path) => SUPPORTED_LANGUAGES.map((language) => buildLangPath(path, language))
);
const pages = {
  Index,
  WizFlussi,
  WizMedikReports,
  WizMedik,
  Frizerino,
  Chatko,
  Usluge,
  SEOOptimizacija,
  WebDevelopment,
  GrafickiDizajn,
  ProjectInquiry,
  ProjectDetail,
  NotFound
};
const escapeHtml = (value) => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#39;");
const createMetaTag = (name, content) => '<meta name="'.concat(escapeHtml(name), '" content="').concat(escapeHtml(content), '" />');
const createPropertyTag = (property, content, extra = "") => '<meta property="'.concat(escapeHtml(property), '" content="').concat(escapeHtml(content), '"').concat(extra, " />");
const createLinkTag = (rel, href, extra = "") => '<link rel="'.concat(escapeHtml(rel), '" href="').concat(escapeHtml(href), '"').concat(extra, " />");
const createScriptTag = (schema) => '<script type="application/ld+json" data-wizionar-schema="true">'.concat(JSON.stringify(schema), "<\/script>");
const getHeadData = (urlPath) => {
  const language = detectLanguageFromPathname(urlPath);
  const basePath = stripAllLangPrefixes(urlPath);
  switch (basePath) {
    case SEO_PATHS.home: {
      const seo = getPageSeo("home", language);
      return {
        language,
        basePath,
        data: {
          title: seo.title,
          description: seo.description,
          keywords: seo.keywords,
          schema: [
            createOrganizationSchema(),
            createWebsiteSchema(language),
            createWebPageSchema({
              language,
              path: SEO_PATHS.home,
              title: seo.title,
              description: seo.description
            })
          ]
        }
      };
    }
    case SEO_PATHS.wizflussi: {
      const seo = getPageSeo("wizflussi", language);
      return {
        language,
        basePath,
        data: {
          title: seo.title,
          description: seo.description,
          schema: [
            createSoftwareApplicationSchema({
              language,
              name: "WizFlussi",
              description: seo.description,
              path: SEO_PATHS.wizflussi,
              category: "BusinessApplication"
            }),
            createWebPageSchema({
              language,
              path: SEO_PATHS.wizflussi,
              title: seo.title,
              description: seo.description
            }),
            createBreadcrumbSchema(language, [
              { name: getSeoLabel(language, "home"), path: SEO_PATHS.home },
              { name: "WizFlussi", path: SEO_PATHS.wizflussi }
            ])
          ]
        }
      };
    }
    case SEO_PATHS.wizmedikReports: {
      const seo = getPageSeo("wizmedikReports", language);
      return {
        language,
        basePath,
        data: {
          title: seo.title,
          description: seo.description,
          schema: [
            createSoftwareApplicationSchema({
              language,
              name: "WizMedikReports",
              description: seo.description,
              path: SEO_PATHS.wizmedikReports,
              category: "BusinessApplication"
            }),
            createWebPageSchema({
              language,
              path: SEO_PATHS.wizmedikReports,
              title: seo.title,
              description: seo.description
            }),
            createBreadcrumbSchema(language, [
              { name: getSeoLabel(language, "home"), path: SEO_PATHS.home },
              { name: "WizMedikReports", path: SEO_PATHS.wizmedikReports }
            ])
          ]
        }
      };
    }
    case SEO_PATHS.wizmedik: {
      const seo = getPageSeo("wizmedik", language);
      return {
        language,
        basePath,
        data: {
          title: seo.title,
          description: seo.description,
          schema: [
            createSoftwareApplicationSchema({
              language,
              name: "WizMedik",
              description: seo.description,
              path: SEO_PATHS.wizmedik,
              category: "HealthApplication"
            }),
            createWebPageSchema({
              language,
              path: SEO_PATHS.wizmedik,
              title: seo.title,
              description: seo.description
            }),
            createBreadcrumbSchema(language, [
              { name: getSeoLabel(language, "home"), path: SEO_PATHS.home },
              { name: "WizMedik", path: SEO_PATHS.wizmedik }
            ])
          ]
        }
      };
    }
    case SEO_PATHS.frizerino: {
      const seo = getPageSeo("frizerino", language);
      return {
        language,
        basePath,
        data: {
          title: seo.title,
          description: seo.description,
          schema: [
            createSoftwareApplicationSchema({
              language,
              name: "Frizerino",
              description: seo.description,
              path: SEO_PATHS.frizerino,
              category: "BusinessApplication"
            }),
            createWebPageSchema({
              language,
              path: SEO_PATHS.frizerino,
              title: seo.title,
              description: seo.description
            }),
            createBreadcrumbSchema(language, [
              { name: getSeoLabel(language, "home"), path: SEO_PATHS.home },
              { name: "Frizerino", path: SEO_PATHS.frizerino }
            ])
          ]
        }
      };
    }
    case SEO_PATHS.chatko: {
      const seo = getPageSeo("chatko", language);
      return {
        language,
        basePath,
        data: {
          title: seo.title,
          description: seo.description,
          schema: [
            createSoftwareApplicationSchema({
              language,
              name: "Chatko",
              description: seo.description,
              path: SEO_PATHS.chatko,
              category: "BusinessApplication"
            }),
            createWebPageSchema({
              language,
              path: SEO_PATHS.chatko,
              title: seo.title,
              description: seo.description
            }),
            createBreadcrumbSchema(language, [
              { name: getSeoLabel(language, "home"), path: SEO_PATHS.home },
              { name: "Chatko", path: SEO_PATHS.chatko }
            ])
          ]
        }
      };
    }
    case SEO_PATHS.usluge: {
      const seo = getPageSeo("usluge", language);
      return {
        language,
        basePath,
        data: {
          title: seo.title,
          description: seo.description,
          schema: [
            createServiceSchema({
              language,
              name: seo.title,
              description: seo.description,
              path: SEO_PATHS.usluge,
              serviceType: seo.title
            }),
            createWebPageSchema({
              language,
              path: SEO_PATHS.usluge,
              title: seo.title,
              description: seo.description
            }),
            createBreadcrumbSchema(language, [
              { name: getSeoLabel(language, "home"), path: SEO_PATHS.home },
              { name: getSeoLabel(language, "services"), path: SEO_PATHS.usluge }
            ])
          ]
        }
      };
    }
    case SEO_PATHS.webDevelopment: {
      const seo = getPageSeo("webDevelopment", language);
      return {
        language,
        basePath,
        data: {
          title: seo.title,
          description: seo.description,
          schema: [
            createServiceSchema({
              language,
              name: seo.title,
              description: seo.description,
              path: SEO_PATHS.webDevelopment,
              serviceType: getSeoLabel(language, "webDevelopment")
            }),
            createWebPageSchema({
              language,
              path: SEO_PATHS.webDevelopment,
              title: seo.title,
              description: seo.description
            }),
            createBreadcrumbSchema(language, [
              { name: getSeoLabel(language, "home"), path: SEO_PATHS.home },
              { name: getSeoLabel(language, "services"), path: SEO_PATHS.usluge },
              { name: getSeoLabel(language, "webDevelopment"), path: SEO_PATHS.webDevelopment }
            ]),
            createFaqSchema(
              webdevTranslations[language].faq.items.map((item) => ({
                question: item.q,
                answer: item.a
              }))
            )
          ]
        }
      };
    }
    case SEO_PATHS.seoOptimization: {
      const seo = getPageSeo("seoOptimization", language);
      return {
        language,
        basePath,
        data: {
          title: seo.title,
          description: seo.description,
          schema: [
            createServiceSchema({
              language,
              name: seo.title,
              description: seo.description,
              path: SEO_PATHS.seoOptimization,
              serviceType: getSeoLabel(language, "seo")
            }),
            createWebPageSchema({
              language,
              path: SEO_PATHS.seoOptimization,
              title: seo.title,
              description: seo.description
            }),
            createBreadcrumbSchema(language, [
              { name: getSeoLabel(language, "home"), path: SEO_PATHS.home },
              { name: getSeoLabel(language, "services"), path: SEO_PATHS.usluge },
              { name: getSeoLabel(language, "seo"), path: SEO_PATHS.seoOptimization }
            ]),
            createFaqSchema(
              seoTranslations[language].faq.items.map((item) => ({
                question: item.q,
                answer: item.a
              }))
            )
          ]
        }
      };
    }
    case SEO_PATHS.graphicDesign: {
      const seo = getPageSeo("graphicDesign", language);
      return {
        language,
        basePath,
        data: {
          title: seo.title,
          description: seo.description,
          schema: [
            createServiceSchema({
              language,
              name: seo.title,
              description: seo.description,
              path: SEO_PATHS.graphicDesign,
              serviceType: getSeoLabel(language, "graphicDesign")
            }),
            createWebPageSchema({
              language,
              path: SEO_PATHS.graphicDesign,
              title: seo.title,
              description: seo.description
            }),
            createBreadcrumbSchema(language, [
              { name: getSeoLabel(language, "home"), path: SEO_PATHS.home },
              { name: getSeoLabel(language, "services"), path: SEO_PATHS.usluge },
              { name: getSeoLabel(language, "graphicDesign"), path: SEO_PATHS.graphicDesign }
            ]),
            createFaqSchema(
              grafickiDizajnTranslations[language].faqs.map((item) => ({
                question: item.q,
                answer: item.a
              }))
            )
          ]
        }
      };
    }
    case SEO_PATHS.projectInquiry: {
      const seo = getPageSeo("projectInquiry", language);
      return {
        language,
        basePath,
        data: {
          title: seo.title,
          description: seo.description,
          keywords: seo.keywords,
          schema: [
            createWebPageSchema({
              language,
              path: SEO_PATHS.projectInquiry,
              title: seo.title,
              description: seo.description
            }),
            createBreadcrumbSchema(language, [
              { name: getSeoLabel(language, "home"), path: SEO_PATHS.home },
              { name: getSeoLabel(language, "projectInquiry"), path: SEO_PATHS.projectInquiry }
            ])
          ]
        }
      };
    }
    default: {
      if (basePath.startsWith("/portfolio/")) {
        const slug = basePath.replace("/portfolio/", "");
        const project = portfolioProjects.find((item) => item.slug === slug);
        if (project) {
          const title = "".concat(project.title, " | ").concat(project.category[language], " | Wizionar");
          const description = project.description[language];
          return {
            language,
            basePath,
            data: {
              title,
              description,
              keywords: [project.category[language], ...project.technologies],
              pageType: "article",
              schema: [
                createCreativeWorkSchema({
                  language,
                  name: project.title,
                  description,
                  path: basePath,
                  keywords: [project.category[language], ...project.technologies]
                }),
                createWebPageSchema({
                  language,
                  path: basePath,
                  title,
                  description
                }),
                createBreadcrumbSchema(language, [
                  { name: getSeoLabel(language, "home"), path: SEO_PATHS.home },
                  { name: getSeoLabel(language, "services"), path: SEO_PATHS.usluge },
                  { name: getSeoLabel(language, "webDevelopment"), path: SEO_PATHS.webDevelopment },
                  { name: getSeoLabel(language, "portfolio"), path: SEO_PATHS.webDevelopment },
                  { name: project.title, path: basePath }
                ])
              ]
            }
          };
        }
      }
      return {
        language,
        basePath,
        data: {
          title: "Page not found | Wizionar",
          description: "The page you requested could not be found.",
          noIndex: true,
          schema: []
        }
      };
    }
  }
};
const buildHeadHtml = (urlPath) => {
  var _a2;
  const { language, basePath, data } = getHeadData(urlPath);
  const localeMeta = LANGUAGE_SEO[language];
  const canonicalUrl = new URL(buildLangPath(basePath, language), BASE_URL).toString();
  const robots = data.noIndex ? "noindex, nofollow" : DEFAULT_ROBOTS;
  const ogImage = "".concat(BASE_URL, "/favicon.png");
  const alternateLinks = SUPPORTED_LANGUAGES.map(
    (lang) => '<link rel="alternate" hreflang="'.concat(LANGUAGE_SEO[lang].hreflang, '" href="').concat(escapeHtml(
      new URL(buildLangPath(basePath, lang), BASE_URL).toString()
    ), '" />')
  );
  alternateLinks.push(
    '<link rel="alternate" hreflang="x-default" href="'.concat(escapeHtml(
      new URL(basePath, BASE_URL).toString()
    ), '" />')
  );
  const alternateLocales = SUPPORTED_LANGUAGES.filter((lang) => lang !== language).map(
    (lang) => '<meta property="og:locale:alternate" content="'.concat(LANGUAGE_SEO[lang].ogLocale, '" data-seo-og-alt-locale="true" />')
  );
  const parts = [
    "<title>".concat(escapeHtml(data.title), "</title>"),
    createMetaTag("description", data.description),
    ((_a2 = data.keywords) == null ? void 0 : _a2.length) ? createMetaTag("keywords", data.keywords.join(", ")) : "",
    createMetaTag("author", SITE_NAME),
    createMetaTag("application-name", SITE_NAME),
    createMetaTag("robots", robots),
    createMetaTag("googlebot", robots),
    createPropertyTag("og:title", data.title),
    createPropertyTag("og:description", data.description),
    createPropertyTag("og:type", data.pageType || "website"),
    createPropertyTag("og:site_name", SITE_NAME),
    createPropertyTag("og:url", canonicalUrl),
    createPropertyTag("og:image", ogImage),
    createPropertyTag("og:image:alt", data.title),
    createPropertyTag("og:locale", localeMeta.ogLocale),
    ...alternateLocales,
    createMetaTag("twitter:card", "summary_large_image"),
    createMetaTag("twitter:title", data.title),
    createMetaTag("twitter:description", data.description),
    createMetaTag("twitter:image", ogImage),
    createLinkTag("canonical", canonicalUrl),
    ...alternateLinks,
    ...data.schema.map((schema) => createScriptTag(schema))
  ].filter(Boolean);
  return {
    htmlLang: localeMeta.htmlLang,
    headHtml: parts.join("\n    ")
  };
};
const render = (url) => {
  const queryClient = new QueryClient();
  const appHtml = renderToString(
    /* @__PURE__ */ jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsx(MotionConfig, { reducedMotion: "user", children: /* @__PURE__ */ jsx(StaticRouter, { location: url, children: /* @__PURE__ */ jsx(AppShell, { children: /* @__PURE__ */ jsx(AppRoutes, { pages }) }) }) }) })
  );
  return {
    appHtml,
    ...buildHeadHtml(url)
  };
};
export {
  prerenderRoutes,
  render
};
