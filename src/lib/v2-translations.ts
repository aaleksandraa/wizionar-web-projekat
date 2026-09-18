import type { Language } from "@/lib/translations";

/**
 * Copy that exists only on the v2 homepage. Everything v2 shares with the
 * original homepage keeps using `useLanguage().t`, so both versions stay in sync.
 */
export const v2Translations = {
  sr: {
    hero: {
      badge: "Product studio · B2B softver · AI automatizacija",
      titleTop: "Sistemi koji",
      titleHighlight: "misle unaprijed",
      titleBottom: "i rade dok vi spavate.",
      subtitle:
        "Wizionar gradi B2B platforme za finansije, zdravstvo i uslužne djelatnosti — od evidencije i planiranja do potpune automatizacije, AI asistenata i izvještaja u realnom vremenu.",
      primaryCta: "Pokreni projekat",
      secondaryCta: "Vidi ekosistem",
      tertiaryCta: "Usluge",
      micro: "Odgovor u roku od 24h · Demo bez obaveze · Jasan obim i cijena prije starta",
      consoleTitle: "wizionar · control center",
      live: "UŽIVO",
      scroll: "Skroluj",
    },
    marquee: {
      items: [
        "Automatizacija procesa",
        "AI asistenti",
        "Izvještaji u realnom vremenu",
        "RBAC & Audit trail",
        "Integracije i API",
        "Multi-valuta",
        "Cloud infrastruktura",
        "Modularna arhitektura",
      ],
    },
    value: {
      label: "Zašto Wizionar",
      title1: "Manje haosa.",
      title2: "Više kontrole.",
      beforeTitle: "Prije",
      afterTitle: "Sa Wizionarom",
      before: [
        "Excel tabela u šest verzija",
        "Podsjetnici zakopani u mailu",
        "Izvještaji koji se sklapaju ručno",
        "Niko ne zna ko je šta promijenio",
      ],
      after: [
        "Jedan izvor istine",
        "Automatski podsjetnici",
        "Izvještaj u jednom kliku",
        "Audit trail za svaku akciju",
      ],
      aiTitle: "AI ugrađen u proces",
      aiDescription:
        "Ne AI radi ukrasa — asistenti koji odgovaraju klijentima, klasifikuju dokumente i pripremaju izvještaje.",
      speedTitle: "Isporuka u sedmicama",
      speedDescription:
        "Radimo u kratkim ciklusima. Prva upotrebljiva verzija je kod vas dok drugi još pišu specifikaciju.",
      ownershipTitle: "Kod je vaš",
      ownershipDescription:
        "Bez zaključavanja u platformu. Dobijate izvorni kod, dokumentaciju i pristup infrastrukturi.",
    },
    impact: {
      label: "Rezultat",
      title: "Ono što se mjeri, to se popravlja",
      items: [
        { value: "70%", label: "manje ručnog unosa", description: "Ponavljajući koraci se izvršavaju sami." },
        { value: "24/7", label: "sistem koji ne spava", description: "Podsjetnici, obrade i AI odgovori i van radnog vremena." },
        { value: "1 klik", label: "do izvještaja", description: "Excel i PDF izvoz umjesto ručnog sklapanja." },
        { value: "100%", label: "praćenih akcija", description: "Audit trail odgovara na pitanje ko, kada i šta." },
      ],
    },
    products: {
      explore: "Otvori",
      inquiry: "Pitaj za demo",
    },
    process: {
      note: "Svaka faza ima jasan rezultat i rok. Bez iznenađenja na kraju.",
    },
    cta: {
      label: "Sljedeći korak",
      title: "Vaš sljedeći sistem počinje jednim razgovorom.",
      subtitle:
        "Opišite nam proces koji vas usporava. Vraćamo se sa prijedlogom rješenja, obimom posla i procjenom — bez obaveze.",
      primary: "Popuni upitnik",
      secondary: "Piši na WhatsApp",
      guarantees: ["Odgovor u roku od 24h", "Jasna ponuda prije starta", "Bez obaveze i skrivenih troškova"],
    },
  },
  en: {
    hero: {
      badge: "Product studio · B2B software · AI automation",
      titleTop: "Systems that",
      titleHighlight: "think ahead",
      titleBottom: "and work while you sleep.",
      subtitle:
        "Wizionar builds B2B platforms for finance, healthcare and service industries — from records and planning to full automation, AI assistants and real-time reporting.",
      primaryCta: "Start a project",
      secondaryCta: "See the ecosystem",
      tertiaryCta: "Services",
      micro: "Reply within 24h · No-obligation demo · Clear scope and price before we start",
      consoleTitle: "wizionar · control center",
      live: "LIVE",
      scroll: "Scroll",
    },
    marquee: {
      items: [
        "Process automation",
        "AI assistants",
        "Real-time reporting",
        "RBAC & audit trail",
        "Integrations and APIs",
        "Multi-currency",
        "Cloud infrastructure",
        "Modular architecture",
      ],
    },
    value: {
      label: "Why Wizionar",
      title1: "Less chaos.",
      title2: "More control.",
      beforeTitle: "Before",
      afterTitle: "With Wizionar",
      before: [
        "Six versions of the same spreadsheet",
        "Reminders buried in email",
        "Reports assembled by hand",
        "Nobody knows who changed what",
      ],
      after: [
        "A single source of truth",
        "Automatic reminders",
        "Reports in one click",
        "An audit trail for every action",
      ],
      aiTitle: "AI built into the process",
      aiDescription:
        "Not AI for decoration — assistants that answer customers, classify documents and prepare reports.",
      speedTitle: "Delivery in weeks",
      speedDescription:
        "We work in short cycles. Your first usable version ships while others are still writing the spec.",
      ownershipTitle: "The code is yours",
      ownershipDescription:
        "No platform lock-in. You get the source code, documentation and access to the infrastructure.",
    },
    impact: {
      label: "Outcome",
      title: "What gets measured gets fixed",
      items: [
        { value: "70%", label: "less manual entry", description: "Repetitive steps run on their own." },
        { value: "24/7", label: "a system that never sleeps", description: "Reminders, jobs and AI replies outside office hours too." },
        { value: "1 click", label: "to a report", description: "Excel and PDF export instead of manual assembly." },
        { value: "100%", label: "of actions traced", description: "The audit trail answers who, when and what." },
      ],
    },
    products: {
      explore: "Open",
      inquiry: "Ask for a demo",
    },
    process: {
      note: "Every phase has a clear deliverable and deadline. No surprises at the end.",
    },
    cta: {
      label: "Next step",
      title: "Your next system starts with one conversation.",
      subtitle:
        "Tell us which process is slowing you down. We come back with a proposed solution, scope and estimate — no obligation.",
      primary: "Start the inquiry",
      secondary: "Message on WhatsApp",
      guarantees: ["Reply within 24h", "Clear quote before we start", "No obligation, no hidden costs"],
    },
  },
  de: {
    hero: {
      badge: "Product Studio · B2B-Software · KI-Automatisierung",
      titleTop: "Systeme, die",
      titleHighlight: "vorausdenken",
      titleBottom: "und arbeiten, während Sie schlafen.",
      subtitle:
        "Wizionar entwickelt B2B-Plattformen für Finanzen, Gesundheitswesen und Dienstleistungen — von Erfassung und Planung bis zu vollständiger Automatisierung, KI-Assistenten und Echtzeit-Reporting.",
      primaryCta: "Projekt starten",
      secondaryCta: "Ökosystem ansehen",
      tertiaryCta: "Leistungen",
      micro: "Antwort innerhalb von 24h · Demo unverbindlich · Klarer Umfang und Preis vor dem Start",
      consoleTitle: "wizionar · control center",
      live: "LIVE",
      scroll: "Scrollen",
    },
    marquee: {
      items: [
        "Prozessautomatisierung",
        "KI-Assistenten",
        "Echtzeit-Reporting",
        "RBAC & Audit-Trail",
        "Integrationen und APIs",
        "Multi-Währung",
        "Cloud-Infrastruktur",
        "Modulare Architektur",
      ],
    },
    value: {
      label: "Warum Wizionar",
      title1: "Weniger Chaos.",
      title2: "Mehr Kontrolle.",
      beforeTitle: "Vorher",
      afterTitle: "Mit Wizionar",
      before: [
        "Sechs Versionen derselben Tabelle",
        "Erinnerungen im Postfach vergraben",
        "Berichte von Hand erstellt",
        "Niemand weiß, wer was geändert hat",
      ],
      after: [
        "Eine einzige Datenquelle",
        "Automatische Erinnerungen",
        "Berichte mit einem Klick",
        "Audit-Trail für jede Aktion",
      ],
      aiTitle: "KI im Prozess verankert",
      aiDescription:
        "Keine KI zur Dekoration — Assistenten, die Kunden antworten, Dokumente klassifizieren und Berichte vorbereiten.",
      speedTitle: "Lieferung in Wochen",
      speedDescription:
        "Wir arbeiten in kurzen Zyklen. Ihre erste nutzbare Version steht, während andere noch das Lastenheft schreiben.",
      ownershipTitle: "Der Code gehört Ihnen",
      ownershipDescription:
        "Kein Plattform-Lock-in. Sie erhalten Quellcode, Dokumentation und Zugang zur Infrastruktur.",
    },
    impact: {
      label: "Ergebnis",
      title: "Was gemessen wird, wird besser",
      items: [
        { value: "70%", label: "weniger manuelle Eingaben", description: "Wiederkehrende Schritte laufen von selbst." },
        { value: "24/7", label: "ein System, das nie schläft", description: "Erinnerungen, Jobs und KI-Antworten auch außerhalb der Bürozeiten." },
        { value: "1 Klick", label: "bis zum Bericht", description: "Excel- und PDF-Export statt Handarbeit." },
        { value: "100%", label: "der Aktionen nachvollziehbar", description: "Der Audit-Trail beantwortet wer, wann und was." },
      ],
    },
    products: {
      explore: "Öffnen",
      inquiry: "Demo anfragen",
    },
    process: {
      note: "Jede Phase hat ein klares Ergebnis und einen Termin. Keine Überraschungen am Ende.",
    },
    cta: {
      label: "Nächster Schritt",
      title: "Ihr nächstes System beginnt mit einem Gespräch.",
      subtitle:
        "Sagen Sie uns, welcher Prozess Sie ausbremst. Wir melden uns mit Lösungsvorschlag, Umfang und Schätzung zurück — unverbindlich.",
      primary: "Fragebogen ausfüllen",
      secondary: "Per WhatsApp schreiben",
      guarantees: ["Antwort innerhalb von 24h", "Klares Angebot vor dem Start", "Unverbindlich, ohne versteckte Kosten"],
    },
  },
  it: {
    hero: {
      badge: "Product studio · Software B2B · Automazione AI",
      titleTop: "Sistemi che",
      titleHighlight: "pensano in anticipo",
      titleBottom: "e lavorano mentre dormi.",
      subtitle:
        "Wizionar costruisce piattaforme B2B per finanza, sanità e servizi — dalla registrazione e pianificazione fino alla piena automazione, agli assistenti AI e ai report in tempo reale.",
      primaryCta: "Avvia il progetto",
      secondaryCta: "Scopri l'ecosistema",
      tertiaryCta: "Servizi",
      micro: "Risposta entro 24h · Demo senza impegno · Ambito e prezzo chiari prima di iniziare",
      consoleTitle: "wizionar · control center",
      live: "LIVE",
      scroll: "Scorri",
    },
    marquee: {
      items: [
        "Automazione dei processi",
        "Assistenti AI",
        "Report in tempo reale",
        "RBAC e audit trail",
        "Integrazioni e API",
        "Multi-valuta",
        "Infrastruttura cloud",
        "Architettura modulare",
      ],
    },
    value: {
      label: "Perché Wizionar",
      title1: "Meno caos.",
      title2: "Più controllo.",
      beforeTitle: "Prima",
      afterTitle: "Con Wizionar",
      before: [
        "Sei versioni dello stesso foglio",
        "Promemoria sepolti nelle email",
        "Report compilati a mano",
        "Nessuno sa chi ha cambiato cosa",
      ],
      after: [
        "Una sola fonte di verità",
        "Promemoria automatici",
        "Report in un clic",
        "Audit trail per ogni azione",
      ],
      aiTitle: "AI dentro il processo",
      aiDescription:
        "Non AI decorativa — assistenti che rispondono ai clienti, classificano documenti e preparano report.",
      speedTitle: "Consegna in settimane",
      speedDescription:
        "Lavoriamo a cicli brevi. La prima versione utilizzabile è tua mentre altri scrivono ancora le specifiche.",
      ownershipTitle: "Il codice è tuo",
      ownershipDescription:
        "Nessun lock-in di piattaforma. Ricevi codice sorgente, documentazione e accesso all'infrastruttura.",
    },
    impact: {
      label: "Risultato",
      title: "Ciò che si misura si migliora",
      items: [
        { value: "70%", label: "meno inserimenti manuali", description: "I passaggi ripetitivi si eseguono da soli." },
        { value: "24/7", label: "un sistema che non dorme", description: "Promemoria, elaborazioni e risposte AI anche fuori orario." },
        { value: "1 clic", label: "per un report", description: "Export Excel e PDF invece del lavoro manuale." },
        { value: "100%", label: "delle azioni tracciate", description: "L'audit trail risponde a chi, quando e cosa." },
      ],
    },
    products: {
      explore: "Apri",
      inquiry: "Chiedi una demo",
    },
    process: {
      note: "Ogni fase ha un risultato e una scadenza chiari. Nessuna sorpresa alla fine.",
    },
    cta: {
      label: "Prossimo passo",
      title: "Il tuo prossimo sistema inizia da una conversazione.",
      subtitle:
        "Raccontaci quale processo ti rallenta. Torniamo con una proposta di soluzione, ambito e stima — senza impegno.",
      primary: "Compila il questionario",
      secondary: "Scrivi su WhatsApp",
      guarantees: ["Risposta entro 24h", "Preventivo chiaro prima di iniziare", "Senza impegno né costi nascosti"],
    },
  },
} as const;

export type V2Translations = (typeof v2Translations)["sr"];

export const getV2Translations = (language: Language): V2Translations =>
  v2Translations[language] as unknown as V2Translations;
