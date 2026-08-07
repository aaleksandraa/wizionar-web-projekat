type Lang = "sr" | "en" | "de" | "it";

export type PortfolioArticleSection = {
  heading?: Record<Lang, string>;
  paragraphs: Record<Lang, string[]>;
};

const sections: PortfolioArticleSection[] = [
  {
    paragraphs: {
      sr: [
        "BNC Shop je jedan od najvećih projekata u oblasti eCommerce rješenja. Umjesto izrade još jednog klasičnog webshopa, cilj je bio izgraditi platformu koja će postati centralno mjesto za upravljanje kompletnom prodajom kompanije.",
        "Klijent je imao jasno definisan izazov. Kako je broj proizvoda, kupaca i prodajnih kanala rastao, postojeće rješenje više nije moglo pratiti razvoj poslovanja. Veliki dio procesa zahtijevao je ručne intervencije, podaci su dolazili iz različitih sistema, a administracija je postajala sve složenija.",
        "Zadatak bio je osmisliti i razviti platformu koja neće rješavati samo prodaju putem interneta, već povezati kompletan poslovni ekosistem u jedno centralizovano rješenje.",
        "Rezultat je moderna eCommerce platforma koja omogućava jednostavno upravljanje proizvodima, narudžbama, marketing kampanjama, poslovnim kupcima i internim procesima, uz visok nivo automatizacije i mogućnost daljeg razvoja kako kompanija raste.",
      ],
      en: [
        "BNC Shop is one of the largest projects in the eCommerce solutions space. Instead of building yet another classic web shop, the goal was to create a platform that would become the central hub for managing the company's entire sales operation.",
        "The client had a clearly defined challenge. As the number of products, customers and sales channels grew, the existing solution could no longer keep up with business development. Much of the process required manual intervention, data came from different systems, and administration was becoming increasingly complex.",
        "The task was to design and develop a platform that would not only handle online sales, but connect the entire business ecosystem into one centralized solution.",
        "The result is a modern eCommerce platform that enables simple management of products, orders, marketing campaigns, business customers and internal processes, with a high level of automation and room to grow as the company expands.",
      ],
      de: [
        "BNC Shop ist eines der größten Projekte im Bereich E-Commerce-Lösungen. Anstatt einen weiteren klassischen Webshop zu erstellen, war das Ziel, eine Plattform aufzubauen, die zum zentralen Ort für die Verwaltung des gesamten Vertriebs des Unternehmens wird.",
        "Der Kunde hatte eine klar definierte Herausforderung. Mit wachsender Anzahl an Produkten, Kunden und Vertriebskanälen konnte die bestehende Lösung die Geschäftsentwicklung nicht mehr mithalten. Viele Prozesse erforderten manuelle Eingriffe, Daten kamen aus verschiedenen Systemen und die Administration wurde zunehmend komplexer.",
        "Die Aufgabe bestand darin, eine Plattform zu konzipieren und zu entwickeln, die nicht nur den Online-Verkauf abwickelt, sondern das gesamte Geschäftsökosystem in einer zentralen Lösung verbindet.",
        "Das Ergebnis ist eine moderne E-Commerce-Plattform, die eine einfache Verwaltung von Produkten, Bestellungen, Marketingkampagnen, Geschäftskunden und internen Prozessen ermöglicht – mit hohem Automatisierungsgrad und Entwicklungspotenzial, während das Unternehmen wächst.",
      ],
      it: [
        "BNC Shop è uno dei progetti più importanti nel settore delle soluzioni eCommerce. Invece di realizzare un altro web shop classico, l'obiettivo era costruire una piattaforma che diventasse il punto centrale per la gestione dell'intera vendita aziendale.",
        "Il cliente aveva una sfida chiaramente definita. Con la crescita del numero di prodotti, clienti e canali di vendita, la soluzione esistente non riusciva più a tenere il passo con lo sviluppo del business. Gran parte dei processi richiedeva interventi manuali, i dati provenivano da sistemi diversi e l'amministrazione diventava sempre più complessa.",
        "Il compito era progettare e sviluppare una piattaforma che non si limitasse alla vendita online, ma collegasse l'intero ecosistema aziendale in un'unica soluzione centralizzata.",
        "Il risultato è una piattaforma eCommerce moderna che consente una gestione semplice di prodotti, ordini, campagne marketing, clienti business e processi interni, con un alto livello di automazione e possibilità di crescita man mano che l'azienda si espande.",
      ],
    },
  },
  {
    heading: {
      sr: "Fokus nije bio na webshopu, već na poslovanju",
      en: "The focus was not on the web shop, but on the business",
      de: "Der Fokus lag nicht auf dem Webshop, sondern auf dem Geschäft",
      it: "Il focus non era sul web shop, ma sul business",
    },
    paragraphs: {
      sr: [
        "Jedan od najvažnijih ciljeva projekta bio je ukloniti svakodnevne procese koji su oduzimali vrijeme zaposlenima. Umjesto ručnog ažuriranja proizvoda, cijena i zaliha, razvijen je sistem koji automatski preuzima i sinhronizuje podatke iz postojećih poslovnih sistema, čime se značajno smanjuje mogućnost greške i ubrzava svakodnevni rad.",
        "Istovremeno, marketing tim dobio je mogućnost da samostalno upravlja promocijama, kuponima, sadržajem i akcijama bez potrebe za uključivanjem programera za svaku izmjenu. Time je cijeli proces postao znatno fleksibilniji i brži.",
      ],
      en: [
        "One of the most important goals of the project was to eliminate daily processes that took up employees' time. Instead of manually updating products, prices and stock, we developed a system that automatically retrieves and synchronizes data from existing business systems, significantly reducing the chance of error and speeding up daily work.",
        "At the same time, the marketing team gained the ability to independently manage promotions, coupons, content and campaigns without needing a developer for every change. This made the entire process much more flexible and faster.",
      ],
      de: [
        "Eines der wichtigsten Projektziele war es, tägliche Prozesse zu eliminieren, die den Mitarbeitern Zeit raubten. Anstatt Produkte, Preise und Bestände manuell zu aktualisieren, wurde ein System entwickelt, das automatisch Daten aus bestehenden Geschäftssystemen abruft und synchronisiert, wodurch die Fehlerwahrscheinlichkeit deutlich sinkt und die tägliche Arbeit beschleunigt wird.",
        "Gleichzeitig erhielt das Marketing-Team die Möglichkeit, Promotionen, Gutscheine, Inhalte und Aktionen selbstständig zu verwalten, ohne für jede Änderung einen Entwickler einbinden zu müssen. Dadurch wurde der gesamte Prozess deutlich flexibler und schneller.",
      ],
      it: [
        "Uno degli obiettivi più importanti del progetto era eliminare i processi quotidiani che rubavano tempo ai dipendenti. Invece di aggiornare manualmente prodotti, prezzi e scorte, abbiamo sviluppato un sistema che recupera e sincronizza automaticamente i dati dai sistemi aziendali esistenti, riducendo significativamente il rischio di errore e accelerando il lavoro quotidiano.",
        "Allo stesso tempo, il team marketing ha ottenuto la possibilità di gestire in autonomia promozioni, coupon, contenuti e campagne senza dover coinvolgere uno sviluppatore per ogni modifica. Questo ha reso l'intero processo molto più flessibile e veloce.",
      ],
    },
  },
  {
    heading: {
      sr: "Jedna platforma za različite tipove korisnika",
      en: "One platform for different types of users",
      de: "Eine Plattform für verschiedene Nutzertypen",
      it: "Una piattaforma per diversi tipi di utenti",
    },
    paragraphs: {
      sr: [
        "Platforma je razvijena tako da svaka grupa korisnika ima iskustvo prilagođeno svojim potrebama.",
        "Krajnji kupci koriste moderan webshop sa naprednom pretragom, filtriranjem proizvoda i jednostavnim procesom kupovine.",
        "Poslovni partneri imaju zaseban B2B portal sa prilagođenim cijenama, ponudama i procesom naručivanja.",
        "Interni tim kompanije upravlja kompletnim poslovanjem kroz administrativni panel, dok zaposlenici u poslovnicama imaju pristup alatima koji povezuju fizičku prodaju sa online sistemom.",
        "Iako svaka od ovih cjelina ima svoju namjenu, sve funkcionišu kao jedinstven sistem sa zajedničkim podacima i centralizovanim upravljanjem.",
      ],
      en: [
        "The platform was developed so that each user group has an experience tailored to their needs.",
        "End customers use a modern web shop with advanced search, product filtering and a simple purchase process.",
        "Business partners have a separate B2B portal with custom pricing, offers and ordering process.",
        "The company's internal team manages the entire business through an admin panel, while store employees have access to tools that connect in-store sales with the online system.",
        "Although each of these parts has its own purpose, they all function as a unified system with shared data and centralized management.",
      ],
      de: [
        "Die Plattform wurde so entwickelt, dass jede Nutzergruppe ein auf ihre Bedürfnisse zugeschnittenes Erlebnis hat.",
        "Endkunden nutzen einen modernen Webshop mit erweiterter Suche, Produktfiltern und einem einfachen Kaufprozess.",
        "Geschäftspartner haben ein separates B2B-Portal mit individuellen Preisen, Angeboten und Bestellprozess.",
        "Das interne Team des Unternehmens verwaltet das gesamte Geschäft über ein Admin-Panel, während Filialmitarbeiter Zugang zu Tools haben, die den stationären Verkauf mit dem Online-System verbinden.",
        "Obwohl jeder dieser Teile seinen eigenen Zweck hat, funktionieren sie alle als einheitliches System mit gemeinsamen Daten und zentraler Verwaltung.",
      ],
      it: [
        "La piattaforma è stata sviluppata in modo che ogni gruppo di utenti abbia un'esperienza adattata alle proprie esigenze.",
        "I clienti finali utilizzano un web shop moderno con ricerca avanzata, filtri prodotti e un processo di acquisto semplice.",
        "I partner business dispongono di un portale B2B separato con prezzi personalizzati, offerte e processo d'ordine.",
        "Il team interno dell'azienda gestisce l'intero business tramite un pannello amministrativo, mentre i dipendenti nei negozi hanno accesso a strumenti che collegano la vendita fisica al sistema online.",
        "Sebbene ciascuna di queste parti abbia il proprio scopo, tutte funzionano come un sistema unificato con dati condivisi e gestione centralizzata.",
      ],
    },
  },
  {
    heading: {
      sr: "Platforma koja raste zajedno sa poslovanjem",
      en: "A platform that grows with the business",
      de: "Eine Plattform, die mit dem Geschäft wächst",
      it: "Una piattaforma che cresce insieme al business",
    },
    paragraphs: {
      sr: [
        "Prilikom razvoja vodili smo računa da platforma ne odgovori samo na trenutne potrebe, već da bude spremna za budući razvoj kompanije.",
        "Sistem je osmišljen tako da podrži veliki broj proizvoda, različite modele prodaje, nove prodajne kanale i dodatne integracije bez potrebe za potpunom rekonstrukcijom platforme.",
        "Takav pristup omogućava klijentu da razvija poslovanje bez ograničenja koja često nameću gotova eCommerce rješenja.",
      ],
      en: [
        "During development, we made sure the platform would not only meet current needs, but also be ready for the company's future growth.",
        "The system is designed to support a large number of products, different sales models, new sales channels and additional integrations without the need for a complete platform rebuild.",
        "This approach allows the client to grow their business without the limitations often imposed by off-the-shelf eCommerce solutions.",
      ],
      de: [
        "Bei der Entwicklung haben wir darauf geachtet, dass die Plattform nicht nur den aktuellen Bedürfnissen entspricht, sondern auch für die zukünftige Entwicklung des Unternehmens bereit ist.",
        "Das System ist so konzipiert, dass es eine große Anzahl von Produkten, verschiedene Vertriebsmodelle, neue Vertriebskanäle und zusätzliche Integrationen unterstützt, ohne dass die Plattform komplett neu aufgebaut werden muss.",
        "Dieser Ansatz ermöglicht es dem Kunden, sein Geschäft ohne die Einschränkungen zu entwickeln, die fertige E-Commerce-Lösungen oft auferlegen.",
      ],
      it: [
        "Durante lo sviluppo, ci siamo assicurati che la piattaforma non rispondesse solo alle esigenze attuali, ma fosse pronta anche per la futura crescita dell'azienda.",
        "Il sistema è progettato per supportare un gran numero di prodotti, diversi modelli di vendita, nuovi canali di vendita e integrazioni aggiuntive senza la necessità di una ricostruzione completa della piattaforma.",
        "Questo approccio consente al cliente di sviluppare il business senza i limiti spesso imposti dalle soluzioni eCommerce pronte all'uso.",
      ],
    },
  },
  {
    heading: {
      sr: "Poseban fokus na korisničko iskustvo",
      en: "Special focus on user experience",
      de: "Besonderer Fokus auf Nutzererfahrung",
      it: "Focus speciale sull'esperienza utente",
    },
    paragraphs: {
      sr: [
        "Veliku pažnju posvetili smo iskustvu krajnjih korisnika.",
        "Kupovina je pojednostavljena kroz brz proces pretrage, pregledan katalog proizvoda i intuitivan checkout, dok je kompletna platforma optimizovana za korištenje na mobilnim uređajima.",
        "Pored toga, razvijen je sistem lojalnosti koji povezuje online kupovinu i fizičke poslovnice, omogućavajući korisnicima jedinstveno iskustvo bez obzira na način kupovine.",
      ],
      en: [
        "We paid great attention to the end-user experience.",
        "Shopping is simplified through a fast search process, a clear product catalog and intuitive checkout, while the entire platform is optimized for use on mobile devices.",
        "In addition, a loyalty system was developed that connects online shopping and physical stores, providing users with a unified experience regardless of how they shop.",
      ],
      de: [
        "Wir haben der Endnutzererfahrung große Aufmerksamkeit gewidmet.",
        "Der Einkauf wird durch einen schnellen Suchprozess, einen übersichtlichen Produktkatalog und einen intuitiven Checkout vereinfacht, während die gesamte Plattform für die Nutzung auf mobilen Geräten optimiert ist.",
        "Darüber hinaus wurde ein Treueprogramm entwickelt, das Online-Shopping und physische Filialen verbindet und den Nutzern ein einheitliches Erlebnis unabhängig von der Art des Einkaufs bietet.",
      ],
      it: [
        "Abbiamo prestato grande attenzione all'esperienza degli utenti finali.",
        "L'acquisto è semplificato attraverso un processo di ricerca veloce, un catalogo prodotti chiaro e un checkout intuitivo, mentre l'intera piattaforma è ottimizzata per l'uso su dispositivi mobili.",
        "Inoltre, è stato sviluppato un sistema fedeltà che collega gli acquisti online e i negozi fisici, offrendo agli utenti un'esperienza unificata indipendentemente dal modo in cui acquistano.",
      ],
    },
  },
  {
    heading: {
      sr: "Rezultat",
      en: "Result",
      de: "Ergebnis",
      it: "Risultato",
    },
    paragraphs: {
      sr: [
        "BNC Shop danas predstavlja mnogo više od webshopa.",
        "To je centralna digitalna platforma koja objedinjuje online prodaju, poslovne partnere, fizičke poslovnice i interne poslovne procese u jedinstven sistem. Automatizacijom velikog broja svakodnevnih aktivnosti kompanija je dobila veću efikasnost, jednostavnije upravljanje i platformu spremnu za dalji rast.",
        "Ovakav pristup omogućava da se tehnologija ne koristi samo kao kanal prodaje, već kao alat koji unapređuje kompletno poslovanje.",
      ],
      en: [
        "BNC Shop today represents much more than a web shop.",
        "It is a central digital platform that unifies online sales, business partners, physical stores and internal business processes into a single system. By automating a large number of daily activities, the company gained greater efficiency, simpler management and a platform ready for further growth.",
        "This approach allows technology to be used not only as a sales channel, but as a tool that improves the entire business.",
      ],
      de: [
        "BNC Shop ist heute viel mehr als ein Webshop.",
        "Es ist eine zentrale digitale Plattform, die Online-Verkauf, Geschäftspartner, physische Filialen und interne Geschäftsprozesse in einem System vereint. Durch die Automatisierung zahlreicher täglicher Aktivitäten hat das Unternehmen mehr Effizienz, einfachere Verwaltung und eine Plattform erhalten, die für weiteres Wachstum bereit ist.",
        "Dieser Ansatz ermöglicht es, Technologie nicht nur als Vertriebskanal zu nutzen, sondern als Werkzeug, das das gesamte Geschäft verbessert.",
      ],
      it: [
        "BNC Shop oggi rappresenta molto più di un web shop.",
        "È una piattaforma digitale centrale che unifica vendite online, partner business, negozi fisici e processi aziendali interni in un unico sistema. Automatizzando un gran numero di attività quotidiane, l'azienda ha ottenuto maggiore efficienza, gestione più semplice e una piattaforma pronta per ulteriore crescita.",
        "Questo approccio consente di utilizzare la tecnologia non solo come canale di vendita, ma come strumento che migliora l'intero business.",
      ],
    },
  },
];

export const getBncShopArticle = (lang: Lang) =>
  sections.map((section) => ({
    heading: section.heading?.[lang],
    paragraphs: section.paragraphs[lang],
  }));

export type PortfolioArticleSectionView = ReturnType<typeof getBncShopArticle>[number];
