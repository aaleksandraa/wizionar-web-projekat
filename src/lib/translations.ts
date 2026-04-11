export type Language = 'sr' | 'en' | 'de' | 'it';

export const translations = {
  sr: {
    // Header
    nav: {
      products: "Proizvodi",
      services: "Usluge",
      process: "Proces",
      security: "Sigurnost",
      contact: "Kontakt",
      requestDemo: "Zatraži demo"
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
      requestDemo: "Request demo"
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
      requestDemo: "Demo anfordern"
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
      requestDemo: "Richiedi demo"
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

export type Translations = typeof translations.sr;
