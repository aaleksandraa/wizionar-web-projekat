# Detaljni projektni upitnik za web projekte

## Namjena dokumenta

Ovaj dokument definiše profesionalni upitnik za prikupljanje zahtjeva klijenata koji žele izradu:

- prezentacionog web sajta,
- web shopa,
- landing page-a,
- booking sistema,
- web aplikacije,
- SaaS/platforme,
- internog poslovnog sistema,
- redizajna postojećeg web sajta ili aplikacije.

Upitnik treba biti implementiran kao dinamična multi-step forma sa uslovnom logikom. Cilj je da developer, projekt menadžer ili agencija dobije dovoljno informacija da može razumjeti projekat, procijeniti kompleksnost, predložiti tehnologiju i pripremiti okvirnu ponudu.

Primarni jezik interfejsa je B/H/S, ali sistem mora podržavati prevode na:

- English,
- Deutsch,
- Italiano.

---

# 1. Koncept sistema

Upitnik nije obična kontakt forma. On treba raditi kao **Project Discovery System**.

Sistem treba omogućiti:

- klasifikaciju tipa projekta,
- prikupljanje poslovnih informacija,
- prikupljanje tehničkih informacija,
- prikaz različitih pitanja zavisno od tipa projekta,
- prikupljanje podataka o domenu, hostingu, sadržaju, dizajnu, SEO-u i budžetu,
- automatsko kreiranje internog project brief-a,
- slanje email notifikacije administratoru,
- spremanje svih odgovora u bazu,
- mogućnost pregleda prijava u admin panelu,
- mogućnost izvoza odgovora u PDF,
- podršku za više jezika.

---

# 2. Struktura forme

Forma treba biti podijeljena u logične korake.

## Korak 1: Uvod

### Naslov

Projektni upitnik za izradu web sajta ili aplikacije

### Opis

Ovaj upitnik nam pomaže da bolje razumijemo vaš projekat, poslovne ciljeve, potrebne funkcionalnosti i tehničke zahtjeve.

Na osnovu vaših odgovora možemo:

- procijeniti kompleksnost projekta,
- predložiti najbolji pristup izradi,
- pripremiti okvirnu ponudu,
- definisati naredne korake.

Vrijeme popunjavanja: 10–20 minuta.

### Dugme

Započni upitnik

---

# 3. Korak 2: Osnovni kontakt podaci

## Polja

### Ime i prezime

- Tip: text
- Obavezno: da

### Naziv firme / projekta

- Tip: text
- Obavezno: ne

### Email adresa

- Tip: email
- Obavezno: da

### Telefon

- Tip: phone
- Obavezno: ne

### Država / grad

- Tip: text
- Obavezno: ne

### Čime se bavite?

- Tip: textarea
- Obavezno: da
- Placeholder: Ukratko opišite vašu firmu, usluge, proizvode ili ideju.

---

# 4. Korak 3: Klasifikacija projekta

## Pitanje

### Kakav projekat želite izraditi?

- Tip: single choice
- Obavezno: da
- Ključno polje za uslovnu logiku: `project_type`

## Opcije

### 1. Prezentacioni web sajt

Opis:
Web stranica za predstavljanje firme, usluga, tima, referenci, lokacije i kontakt informacija.

Vrijednost:
`presentation_website`

### 2. Web shop / online prodavnica

Opis:
Sistem za online prodaju proizvoda, sa kategorijama, korpom, narudžbama, plaćanjem i administracijom proizvoda.

Vrijednost:
`ecommerce`

### 3. Web aplikacija / platforma

Opis:
Napredni sistem sa korisnicima, dashboardima, bazom podataka, poslovnom logikom i različitim korisničkim ulogama.

Vrijednost:
`web_application`

### 4. Booking / rezervacijski sistem

Opis:
Sistem za rezervaciju termina, usluga, vozila, smještaja, konsultacija ili drugih resursa.

Vrijednost:
`booking_system`

### 5. Landing page

Opis:
Jedna prodajna stranica fokusirana na kampanju, uslugu, proizvod, prijave ili generisanje upita.

Vrijednost:
`landing_page`

### 6. Redizajn postojećeg sajta ili aplikacije

Opis:
Već imate web sajt ili aplikaciju, ali želite bolji dizajn, bolje performanse, SEO, funkcionalnosti ili korisničko iskustvo.

Vrijednost:
`redesign`

### 7. Nisam siguran/sigurna

Opis:
Niste sigurni koje rješenje vam je potrebno. Kroz odgovore ćemo pokušati bolje razumjeti projekat.

Vrijednost:
`not_sure`

---

# 5. Korak 4: Ciljevi projekta

Ovaj korak se prikazuje svim korisnicima.

## Pitanje

### Koji je glavni cilj projekta?

- Tip: multiple choice
- Obavezno: da

## Opcije

- Predstavljanje firme ili usluga
- Povećanje broja upita
- Online prodaja proizvoda
- Online prodaja usluga
- Automatizacija poslovnog procesa
- Rezervacija termina
- Upravljanje korisnicima
- Edukacija korisnika
- Kreiranje zajednice / community sistema
- Interni poslovni sistem
- SaaS aplikacija
- Marketplace/platforma
- Bolji SEO i Google vidljivost
- Bolji dizajn i korisničko iskustvo
- Drugo

Ako korisnik izabere “Drugo”, prikazati polje:

### Opišite drugi cilj

- Tip: textarea
- Obavezno: da ako je izabrano “Drugo”

---

## Pitanje

### Ukratko opišite šta želite da korisnik može uraditi na vašem sajtu ili aplikaciji.

- Tip: textarea
- Obavezno: da
- Placeholder:
Primjer: Korisnik može pregledati usluge, poslati upit, kupiti proizvod, rezervisati termin, prijaviti se na platformu ili koristiti svoj dashboard.

---

# 6. Korak 5: Postojeće stanje

Ovaj korak se prikazuje svim korisnicima.

## Pitanje

### Da li trenutno imate web sajt, web shop ili aplikaciju?

- Tip: single choice
- Obavezno: da

## Opcije

- Da
- Ne
- U izradi je
- Nisam siguran/sigurna

Ako je odgovor “Da” ili “U izradi je”, prikazati:

### Link postojećeg sajta / aplikacije

- Tip: url
- Obavezno: ne

### Šta vam trenutno najviše smeta na postojećem rješenju?

- Tip: multiple choice
- Obavezno: ne

Opcije:

- Zastarjeli dizajn
- Spor sajt
- Loša mobilna verzija
- Loša Google vidljivost
- Teško uređivanje sadržaja
- Nema admin panel
- Nema online plaćanje
- Loše korisničko iskustvo
- Nedostaju funkcionalnosti
- Tehnički problemi
- Sigurnosni problemi
- Ne znam
- Drugo

Ako je izabrano “Drugo”, prikazati:

### Opišite problem

- Tip: textarea
- Obavezno: ne

---

# 7. Korak 6: Domen, hosting i tehnička osnova

Ovaj korak se prikazuje svim korisnicima.

## Domen

### Da li imate domen?

Opis za korisnika:
Domen je internet adresa vašeg sajta, npr. `mojafirma.ba`, `mojafirma.com` ili `mojafirma.de`.

- Tip: single choice
- Obavezno: da

Opcije:

- Da, imam domen
- Ne, nemam domen
- Nisam siguran/sigurna
- Ne znam šta je domen

Ako korisnik izabere “Da, imam domen”, prikazati:

### Koji domen koristite?

- Tip: text
- Obavezno: da

Ako korisnik izabere “Ne, nemam domen” ili “Nisam siguran/sigurna”, prikazati:

### Da li želite pomoć oko izbora i registracije domena?

- Tip: single choice
- Obavezno: ne

Opcije:

- Da
- Ne
- Možda kasnije

---

## Hosting

### Da li imate hosting ili server?

Opis za korisnika:
Hosting je prostor/server na kojem se nalazi web sajt ili aplikacija.

- Tip: single choice
- Obavezno: da

Opcije:

- Da, imam hosting/server
- Ne, nemam hosting/server
- Nisam siguran/sigurna
- Ne znam šta je hosting

Ako korisnik izabere “Da, imam hosting/server”, prikazati:

### Koji hosting/server koristite?

- Tip: single choice
- Obavezno: ne

Opcije:

- Shared hosting
- VPS server
- Dedicated server
- Cloud hosting
- Plesk/cPanel hosting
- Ne znam
- Drugo

Ako je izabrano “Drugo”, prikazati:

### Unesite naziv hostinga/servera

- Tip: text
- Obavezno: ne

---

## Održavanje

### Da li želite da mi preuzmemo tehničko održavanje nakon izrade?

- Tip: single choice
- Obavezno: ne

Opcije:

- Da
- Ne
- Možda kasnije
- Želim prvo više informacija

---

# 8. Uslovni modul: Prezentacioni web sajt

Prikazuje se ako je `project_type = presentation_website`.

## Struktura sajta

### Koje stranice želite na sajtu?

- Tip: multiple choice
- Obavezno: da

Opcije:

- Početna
- O nama
- Usluge
- Pojedinačne stranice usluga
- Portfolio / reference
- Tim
- Galerija
- Blog / novosti
- Cjenovnik
- Česta pitanja
- Kontakt
- Karijere
- Lokacije / poslovnice
- Pravne stranice
- Drugo

Ako je izabrano “Drugo”, prikazati:

### Navedite dodatne stranice

- Tip: textarea
- Obavezno: ne

---

## Sadržaj

### Da li imate pripremljen sadržaj za sajt?

- Tip: single choice
- Obavezno: da

Opcije:

- Da, imamo tekstove i slike
- Imamo tekstove, ali ne i slike
- Imamo slike, ali ne i tekstove
- Imamo djelimičan sadržaj
- Nemamo sadržaj
- Treba nam kompletna pomoć oko sadržaja

---

### Da li želite da mi pomognemo sa pisanjem tekstova?

- Tip: single choice
- Obavezno: ne

Opcije:

- Da
- Ne
- Djelimično
- Nisam siguran/sigurna

---

## Funkcionalnosti

### Koje funkcionalnosti želite?

- Tip: multiple choice
- Obavezno: ne

Opcije:

- Kontakt forma
- Forma za upit/ponudu
- Google mapa
- Blog sistem
- Galerija
- Prikaz referenci
- Newsletter prijava
- WhatsApp/Viber kontakt dugme
- Višejezičnost
- Admin panel za uređivanje sadržaja
- Osnovna SEO optimizacija
- Napredna SEO struktura
- Drugo

---

## Jezici

### Da li sajt treba biti višejezičan?

- Tip: multiple choice
- Obavezno: da

Opcije:

- Ne, samo jedan jezik
- B/H/S
- Engleski
- Njemački
- Italijanski
- Drugo
- Nisam siguran/sigurna

---

# 9. Uslovni modul: Web shop / online prodavnica

Prikazuje se ako je `project_type = ecommerce`.

## Proizvodi

### Koliko proizvoda planirate imati na početku?

- Tip: single choice
- Obavezno: da

Opcije:

- 1–20
- 20–100
- 100–500
- 500–2000
- 2000+
- Ne znam još

---

### Da li proizvodi imaju varijacije?

Opis:
Varijacije su npr. veličina, boja, model, kapacitet, težina, pakovanje.

- Tip: single choice
- Obavezno: da

Opcije:

- Da
- Ne
- Nisam siguran/sigurna

---

### Da li proizvodi imaju kategorije, brendove i filtere?

- Tip: multiple choice
- Obavezno: ne

Opcije:

- Kategorije
- Podkategorije
- Brendovi
- Filteri
- Atributi
- Akcije/popusti
- Kuponi
- Ne znam

---

## Plaćanje

### Koje metode plaćanja želite?

- Tip: multiple choice
- Obavezno: da

Opcije:

- Plaćanje pouzećem
- Bankovna uplata
- Kartično plaćanje
- Stripe
- PayPal
- Monri
- CorvusPay
- WSPay
- Kripto plaćanje
- Ne znam
- Drugo

---

### Da li želite automatsko generisanje faktura?

- Tip: single choice
- Obavezno: ne

Opcije:

- Da
- Ne
- Možda kasnije
- Nisam siguran/sigurna

---

## Dostava

### Kako planirate organizovati dostavu?

- Tip: multiple choice
- Obavezno: da

Opcije:

- Kurirska služba
- Vlastita dostava
- Lično preuzimanje
- Digitalni proizvodi
- Dostava nije potrebna
- Ne znam još

---

### Da li želite integraciju sa kurirskom službom?

- Tip: single choice
- Obavezno: ne

Opcije:

- Da
- Ne
- Možda kasnije
- Nisam siguran/sigurna

---

## Administracija

### Kako želite unositi proizvode?

- Tip: single choice
- Obavezno: da

Opcije:

- Ručno kroz admin panel
- Import iz Excel/CSV fajla
- API integracija sa drugim sistemom
- Automatska sinhronizacija sa dobavljačem
- Nisam siguran/sigurna

---

### Da li vam treba praćenje stanja zaliha?

- Tip: single choice
- Obavezno: da

Opcije:

- Da
- Ne
- Možda kasnije
- Nisam siguran/sigurna

---

# 10. Uslovni modul: Web aplikacija / platforma

Prikazuje se ako je `project_type = web_application`.

## Korisnici i uloge

### Ko će koristiti aplikaciju?

- Tip: multiple choice
- Obavezno: da

Opcije:

- Admin
- Registrovani korisnici
- Kupci
- Zaposleni
- Partneri
- Edukatori / mentori
- Moderatori
- Menadžeri
- Klijenti
- Drugo

Ako je izabrano “Drugo”, prikazati:

### Navedite dodatne korisničke uloge

- Tip: textarea
- Obavezno: ne

---

### Da li korisnici trebaju imati svoje naloge?

- Tip: single choice
- Obavezno: da

Opcije:

- Da
- Ne
- Nisam siguran/sigurna

Ako je odgovor “Da”, prikazati:

### Koje funkcije korisnički nalog treba imati?

- Tip: multiple choice
- Obavezno: ne

Opcije:

- Registracija
- Login
- Zaboravljena lozinka
- Profil korisnika
- Dashboard
- Notifikacije
- Historija aktivnosti
- Plaćanja
- Dokumenti/fajlovi
- Poruke
- Postavke naloga
- Drugo

---

## Funkcionalnosti

### Koje funkcionalnosti očekujete u aplikaciji?

- Tip: multiple choice
- Obavezno: da

Opcije:

- Admin panel
- Korisnički dashboard
- Uloge i permisije
- Upload fajlova
- Komentari
- Chat / messaging
- Email notifikacije
- Push notifikacije
- Kalendar
- Rezervacije
- Online plaćanje
- Pretplate / subscription
- Fakture
- Izvještaji
- Statistika
- API
- Integracije sa drugim sistemima
- Mobilna aplikacija kasnije
- Drugo

---

### Opišite glavni tok korištenja aplikacije

- Tip: textarea
- Obavezno: da
- Placeholder:
Primjer: Korisnik se registruje, kupuje paket, dobija pristup dashboardu, koristi određene funkcije, prima notifikacije i može pratiti svoj napredak.

---

## Podaci i administracija

### Koje podatke sistem treba čuvati?

- Tip: textarea
- Obavezno: ne

Primjer:
Korisnici, narudžbe, termini, plaćanja, dokumenti, zadaci, komentari, edukacije, proizvodi, klijenti, izvještaji.

---

### Da li vam treba admin panel?

- Tip: single choice
- Obavezno: da

Opcije:

- Da
- Ne
- Nisam siguran/sigurna

---

## Integracije

### Da li aplikacija treba biti povezana sa drugim sistemima?

- Tip: multiple choice
- Obavezno: ne

Opcije:

- Stripe
- PayPal
- Bankovni sistem
- ERP
- CRM
- WooCommerce
- WordPress
- Google Calendar
- Google Maps
- Email servis
- SMS servis
- API treće strane
- Ne
- Nisam siguran/sigurna
- Drugo

---

# 11. Uslovni modul: Booking / rezervacijski sistem

Prikazuje se ako je `project_type = booking_system`.

## Tip rezervacija

### Šta korisnici rezervišu?

- Tip: single choice
- Obavezno: da

Opcije:

- Termine
- Usluge
- Konsultacije
- Vozila
- Smještaj
- Stolove
- Prostorije
- Oprema/resurse
- Drugo

---

### Da li rezervacije zavise od dostupnosti?

- Tip: single choice
- Obavezno: da

Opcije:

- Da
- Ne
- Nisam siguran/sigurna

---

### Da li korisnici trebaju online plaćati rezervaciju?

- Tip: single choice
- Obavezno: da

Opcije:

- Da
- Ne
- Opcionalno
- Možda kasnije

---

### Da li želite automatske podsjetnike?

- Tip: multiple choice
- Obavezno: ne

Opcije:

- Email podsjetnik
- SMS podsjetnik
- WhatsApp/Viber podsjetnik
- Podsjetnik u aplikaciji
- Ne
- Možda kasnije

---

# 12. Uslovni modul: Landing page

Prikazuje se ako je `project_type = landing_page`.

## Cilj landing page-a

### Šta landing page treba promovisati?

- Tip: single choice
- Obavezno: da

Opcije:

- Uslugu
- Proizvod
- Edukaciju
- Event
- Akciju/popust
- Prijavu na listu čekanja
- Preuzimanje dokumenta
- Konsultacije
- Drugo

---

### Koja je glavna akcija koju posjetilac treba uraditi?

- Tip: single choice
- Obavezno: da

Opcije:

- Poslati upit
- Kupiti proizvod
- Zakazati termin
- Prijaviti se
- Nazvati
- Poslati poruku
- Preuzeti dokument
- Ostaviti email
- Drugo

---

### Da li landing page treba biti povezan sa reklamnim kampanjama?

- Tip: multiple choice
- Obavezno: ne

Opcije:

- Google Ads
- Meta Ads
- TikTok Ads
- LinkedIn Ads
- Email kampanja
- Ne
- Nisam siguran/sigurna

---

# 13. Uslovni modul: Redizajn

Prikazuje se ako je `project_type = redesign`.

## Trenutno stanje

### Šta želite promijeniti na postojećem sajtu/aplikaciji?

- Tip: multiple choice
- Obavezno: da

Opcije:

- Dizajn
- Brzinu
- Mobilnu verziju
- SEO
- Strukturu sadržaja
- Admin panel
- Funkcionalnosti
- Sigurnost
- Tehničku platformu
- Konverzije
- Drugo

---

### Da li želite zadržati postojeći sadržaj?

- Tip: single choice
- Obavezno: da

Opcije:

- Da, sav sadržaj
- Da, djelimično
- Ne, želimo novi sadržaj
- Nisam siguran/sigurna

---

### Da li želite migraciju postojećih podataka?

- Tip: single choice
- Obavezno: ne

Opcije:

- Da
- Ne
- Možda
- Nisam siguran/sigurna

Ako je odgovor “Da” ili “Možda”, prikazati:

### Koje podatke treba migrirati?

- Tip: multiple choice
- Obavezno: ne

Opcije:

- Stranice
- Blog objave
- Proizvodi
- Korisnici
- Narudžbe
- Slike
- Dokumenti
- SEO meta podaci
- Drugo

---

# 14. Dizajn i vizuelni identitet

Ovaj korak se prikazuje svim korisnicima.

## Pitanje

### Da li imate postojeći vizuelni identitet?

- Tip: multiple choice
- Obavezno: ne

Opcije:

- Logo
- Boje
- Fontove
- Brand guide
- Fotografije
- Video materijale
- Nemamo vizuelni identitet
- Treba nam pomoć oko brendinga

---

## Pitanje

### Kakav vizuelni stil želite?

- Tip: multiple choice
- Obavezno: da

Opcije:

- Moderan i minimalistički
- Premium/luksuzan
- Korporativan
- Kreativan i dinamičan
- Tech/startup
- Medicinski/profesionalan
- Topao i prijateljski
- Elegantno i jednostavno
- Ne znam, želim prijedlog
- Drugo

---

## Pitanje

### Imate li primjere sajtova koji vam se sviđaju?

- Tip: single choice
- Obavezno: ne

Opcije:

- Da
- Ne

Ako je odgovor “Da”, prikazati:

### Unesite linkove i napišite šta vam se sviđa kod njih

- Tip: textarea
- Obavezno: ne

---

# 15. SEO, analitika i marketing

Ovaj korak se prikazuje svim korisnicima.

## SEO

### Koliko vam je važna Google optimizacija / SEO?

Opis:
SEO je proces optimizacije sajta kako bi se bolje prikazivao na Google pretrazi.

- Tip: single choice
- Obavezno: da

Opcije:

- Veoma važno
- Važno, ali osnovno
- Nije trenutno prioritet
- Ne znam šta je SEO
- Želim preporuku

---

## Ključne riječi

### Da li već znate za koje pojmove želite da se pojavljujete na Google-u?

- Tip: single choice
- Obavezno: ne

Opcije:

- Da
- Ne
- Djelimično

Ako je odgovor “Da” ili “Djelimično”, prikazati:

### Unesite ključne riječi ili fraze

- Tip: textarea
- Obavezno: ne

---

## Analitika

### Da li želite praćenje posjeta i ponašanja korisnika?

- Tip: multiple choice
- Obavezno: ne

Opcije:

- Google Analytics
- Google Search Console
- Google Tag Manager
- Meta Pixel
- TikTok Pixel
- Hotjar / Microsoft Clarity
- Nisam siguran/sigurna
- Ne

---

## Marketing

### Da li planirate plaćene kampanje?

- Tip: multiple choice
- Obavezno: ne

Opcije:

- Google Ads
- Facebook/Instagram Ads
- TikTok Ads
- LinkedIn Ads
- Email marketing
- Ne
- Možda kasnije
- Nisam siguran/sigurna

---

# 16. Sadržaj i administracija

Ovaj korak se prikazuje svim korisnicima.

## Sadržaj

### Ko će pripremiti sadržaj?

- Tip: single choice
- Obavezno: da

Opcije:

- Mi pripremamo sav sadržaj
- Vi pripremate sadržaj
- Zajedno pripremamo sadržaj
- Nemamo još definisano
- Treba nam kompletna pomoć

---

## Administracija

### Da li želite sami uređivati sadržaj nakon završetka projekta?

- Tip: single choice
- Obavezno: da

Opcije:

- Da
- Ne
- Djelimično
- Nisam siguran/sigurna

Ako je odgovor “Da” ili “Djelimično”, prikazati:

### Šta želite uređivati sami?

- Tip: multiple choice
- Obavezno: ne

Opcije:

- Tekstove
- Slike
- Blog objave
- Proizvode
- Cijene
- Kategorije
- Korisnike
- Narudžbe
- Termine
- Stranice
- Drugo

---

# 17. Pravne stranice i usklađenost

Ovaj korak se prikazuje svim korisnicima.

## Pitanje

### Da li vam trebaju pravne stranice?

- Tip: multiple choice
- Obavezno: ne

Opcije:

- Uslovi korištenja
- Politika privatnosti
- Cookie politika
- GDPR saglasnosti
- Pravila povrata/reklamacije
- Uslovi kupovine
- Nisam siguran/sigurna
- Ne

---

## Pitanje

### Da li sajt treba imati cookie consent/banner?

- Tip: single choice
- Obavezno: ne

Opcije:

- Da
- Ne
- Nisam siguran/sigurna

---

# 18. Budžet, rokovi i prioriteti

Ovaj korak se prikazuje svim korisnicima.

## Budžet

### Koji okvirni budžet imate za projekat?

- Tip: single choice
- Obavezno: da

Opcije:

- Do 500 €
- 500–1.500 €
- 1.500–3.000 €
- 3.000–7.000 €
- 7.000–15.000 €
- 15.000 €+
- Želim prvo okvirnu procjenu
- Ne želim navesti budžet

---

## Rok

### Kada želite da projekat počne?

- Tip: single choice
- Obavezno: da

Opcije:

- Odmah
- U narednih 30 dana
- U naredna 2–3 mjeseca
- Kasnije
- Nisam siguran/sigurna

---

### Da li imate fiksni rok za završetak?

- Tip: single choice
- Obavezno: da

Opcije:

- Da
- Ne
- Poželjno, ali nije strogo

Ako je odgovor “Da” ili “Poželjno, ali nije strogo”, prikazati:

### Unesite željeni rok

- Tip: date
- Obavezno: ne

---

## Prioriteti

### Šta vam je najvažnije?

- Tip: ranking
- Obavezno: ne

Opcije:

- Cijena
- Brzina izrade
- Kvalitet dizajna
- SEO
- Performanse
- Sigurnost
- Fleksibilnost sistema
- Dugoročna skalabilnost
- Jednostavno održavanje

---

# 19. Završni korak

## Pitanje

### Dodajte sve što mislite da je važno

- Tip: textarea
- Obavezno: ne

---

## Pitanje

### Šta želite kao sljedeći korak?

- Tip: single choice
- Obavezno: da

Opcije:

- Želim okvirnu ponudu
- Želim konsultacije
- Želim tehnički prijedlog
- Želim prvo da analizirate moje odgovore
- Nisam siguran/sigurna

---

# 20. Završna poruka nakon slanja

## Naslov

Hvala na poslanom upitniku.

## Tekst

Vaši odgovori su uspješno zaprimljeni.

Na osnovu dostavljenih informacija možemo analizirati:

- tip projekta,
- obim funkcionalnosti,
- tehničku kompleksnost,
- moguće faze izrade,
- okvirni budžet i rokove.

Kontaktiraćemo vas sa prijedlogom narednih koraka.

---

# 21. Admin panel — pregled prijava

U admin panelu treba prikazati sve poslane upitnike.

## Lista prijava treba sadržavati:

- ime i prezime,
- firma/projekat,
- email,
- telefon,
- tip projekta,
- budžet,
- rok,
- status prijave,
- datum slanja.

## Statusi prijave:

- Novo
- Pregledano
- Potrebne dodatne informacije
- Poslana ponuda
- Prihvaćeno
- Odbijeno
- Arhivirano

## Detaljni prikaz prijave treba sadržavati:

- sve odgovore korisnika,
- automatski generisani project brief,
- complexity score,
- budget score,
- preporučeni tip projekta,
- interne napomene,
- mogućnost promjene statusa,
- mogućnost izvoza u PDF.

---

# 22. Automatski scoring

Sistem treba automatski računati osnovnu kompleksnost projekta.

## Complexity Score

### Low

Primjeri:

- jednostavan landing page,
- osnovni prezentacioni sajt,
- mali broj stranica,
- bez kompleksnih integracija.

### Medium

Primjeri:

- prezentacioni sajt sa blogom,
- višejezičnost,
- osnovni web shop,
- osnovni booking sistem.

### High

Primjeri:

- web shop sa mnogo proizvoda,
- custom web aplikacija,
- korisnički nalozi,
- plaćanje,
- admin panel,
- integracije.

### Enterprise

Primjeri:

- SaaS platforma,
- marketplace,
- više korisničkih uloga,
- kompleksna poslovna logika,
- API integracije,
- velike količine podataka,
- skalabilna arhitektura.

---

# 23. Predložena baza podataka

## Tabela: `project_inquiries`

Polja:

- `id`
- `uuid`
- `first_name`
- `last_name`
- `company_name`
- `email`
- `phone`
- `city`
- `country`
- `business_description`
- `project_type`
- `main_goals`
- `project_description`
- `existing_solution_status`
- `existing_solution_url`
- `domain_status`
- `domain_name`
- `hosting_status`
- `hosting_type`
- `budget_range`
- `desired_start`
- `has_fixed_deadline`
- `desired_deadline`
- `next_step`
- `complexity_score`
- `budget_score`
- `status`
- `locale`
- `created_at`
- `updated_at`

---

## Tabela: `project_inquiry_answers`

Polja:

- `id`
- `project_inquiry_id`
- `step_key`
- `question_key`
- `question_label`
- `answer_value`
- `answer_label`
- `created_at`
- `updated_at`

Napomena:
Zbog fleksibilnosti forme, većinu specifičnih odgovora treba čuvati u posebnoj tabeli `project_inquiry_answers`, dok se najvažnija polja čuvaju direktno u `project_inquiries` radi filtriranja.

---

## Tabela: `project_inquiry_notes`

Polja:

- `id`
- `project_inquiry_id`
- `admin_user_id`
- `note`
- `created_at`
- `updated_at`

---

# 24. Višejezičnost

Sistem mora podržavati jezike:

- `bs` ili `bhs` — B/H/S
- `en` — English
- `de` — Deutsch
- `it` — Italiano

Sva pitanja, opisi, opcije, placeholderi, dugmad, validacione poruke i završne poruke moraju biti definisani kroz translation fajlove.

## Preporučena struktura prevoda

```php
resources/lang/bs/project-inquiry.php
resources/lang/en/project-inquiry.php
resources/lang/de/project-inquiry.php
resources/lang/it/project-inquiry.php
```

## Primjer strukture prevoda

```php
return [
    'intro' => [
        'title' => 'Projektni upitnik za izradu web sajta ili aplikacije',
        'description' => 'Ovaj upitnik nam pomaže da bolje razumijemo vaš projekat...',
        'button' => 'Započni upitnik',
    ],

    'project_types' => [
        'presentation_website' => [
            'label' => 'Prezentacioni web sajt',
            'description' => 'Web stranica za predstavljanje firme, usluga, tima i referenci.',
        ],
        'ecommerce' => [
            'label' => 'Web shop / online prodavnica',
            'description' => 'Sistem za online prodaju proizvoda sa korpom i plaćanjem.',
        ],
    ],
];
```

---

# 25. UX/UI zahtjevi

## Forma

Forma treba biti:

- multi-step,
- pregledna,
- mobilno optimizovana,
- profesionalna,
- brza,
- bez predugih stranica,
- sa progress barom,
- sa mogućnošću povratka na prethodni korak,
- sa validacijom po koracima,
- sa jasnim objašnjenjima za tehničke pojmove.

## Obavezni elementi

- progress bar,
- naziv trenutnog koraka,
- kratko objašnjenje koraka,
- dugmad “Nazad” i “Dalje”,
- završno dugme “Pošalji upitnik”,
- loading state,
- success state,
- error state,
- auto-save opcionalno.

---

# 26. Email notifikacije

Nakon slanja upitnika sistem treba poslati:

## Email administratoru

Sadrži:

- ime klijenta,
- email,
- telefon,
- tip projekta,
- budžet,
- rok,
- complexity score,
- link za pregled prijave u admin panelu.

## Email klijentu

Sadrži:

- potvrdu da je upitnik zaprimljen,
- kratak opis narednih koraka,
- zahvalnicu.

---

# 27. AI prompt za implementaciju

Sljedeći prompt se može predati AI alatu koji implementira funkcionalnost u postojeći projekat.

---

## PROMPT ZA AI IMPLEMENTACIJU

Ti si senior full-stack developer. Implementiraj profesionalni Project Discovery / Project Inquiry sistem u postojeći web projekat.

Primarni jezik aplikacije je B/H/S, ali sistem mora biti spreman za prevode na engleski, njemački i italijanski.


Cilj:

Napraviti dinamični multi-step upitnik za klijente koji žele web sajt, web shop, web aplikaciju, booking sistem, landing page ili redizajn postojećeg sistema.

Sistem mora imati:

1. Javnu multi-step formu
2. Uslovnu logiku pitanja
3. Snimanje odgovora u bazu
4. Admin panel za pregled prijava
5. Status pipeline za prijave
6. Automatski complexity score
7. Email notifikacije
8. PDF export prijave
9. Translation strukturu za B/H/S, EN, DE i IT
10. Profesionalan UX/UI

---

## Funkcionalni zahtjevi

### 1. Javna forma

Kreirati javnu rutu:

```php
GET /project-inquiry
POST /project-inquiry
```

Forma treba biti multi-step i sadržavati sljedeće korake:

1. Uvod
2. Kontakt podaci
3. Klasifikacija projekta
4. Ciljevi projekta
5. Postojeće stanje
6. Domen i hosting
7. Uslovni modul po tipu projekta
8. Dizajn i branding
9. SEO i marketing
10. Sadržaj i administracija
11. Pravne stranice
12. Budžet i rokovi
13. Završni korak

---

### 2. Tipovi projekta

Podržati sljedeće vrijednosti za `project_type`:

```php
presentation_website
ecommerce
web_application
booking_system
landing_page
redesign
not_sure
```

Na osnovu izabranog tipa projekta prikazati odgovarajući uslovni modul.

---

### 3. Uslovna logika

Ako korisnik izabere:

- `presentation_website` → prikazati pitanja za prezentacioni web sajt
- `ecommerce` → prikazati pitanja za web shop
- `web_application` → prikazati pitanja za web aplikaciju/platformu
- `booking_system` → prikazati pitanja za booking sistem
- `landing_page` → prikazati pitanja za landing page
- `redesign` → prikazati pitanja za redizajn
- `not_sure` → prikazati osnovna pitanja i dodatno polje za opis ideje

Uslovna logika mora biti implementirana na frontend strani, ali validacija mora postojati i na backend strani.

---

### 4. Baza podataka

Kreirati migracije za:

#### `project_inquiries`

Polja:

```php
id
uuid
first_name
last_name
company_name
email
phone
city
country
business_description
project_type
main_goals json nullable
project_description text nullable
existing_solution_status
existing_solution_url nullable
domain_status
domain_name nullable
hosting_status
hosting_type nullable
budget_range
desired_start
has_fixed_deadline boolean nullable
desired_deadline date nullable
next_step
complexity_score
budget_score
status
locale
created_at
updated_at
```

#### `project_inquiry_answers`

Polja:

```php
id
project_inquiry_id foreign
step_key
question_key
question_label
answer_value json/text
answer_label nullable
created_at
updated_at
```

#### `project_inquiry_notes`

Polja:

```php
id
project_inquiry_id foreign
admin_user_id foreign nullable
note text
created_at
updated_at
```

---

### 5. Modeli

Kreirati modele:

```php
ProjectInquiry
ProjectInquiryAnswer
ProjectInquiryNote
```

Relacije:

```php
ProjectInquiry hasMany ProjectInquiryAnswer
ProjectInquiry hasMany ProjectInquiryNote
ProjectInquiryNote belongsTo User
```

---

### 6. Validacija

Kreirati FormRequest:

```php
StoreProjectInquiryRequest
```

Validirati:

- ime,
- email,
- opis djelatnosti,
- tip projekta,
- osnovne ciljeve,
- budžet,
- rok,
- obavezna uslovna polja zavisno od `project_type`.

---

### 7. Admin panel

U Filamentu napraviti resource:

```php
ProjectInquiryResource
```

Lista treba prikazivati:

- ime i prezime,
- firma,
- email,
- telefon,
- tip projekta,
- budžet,
- complexity score,
- status,
- datum slanja.

Dodati filtere:

- tip projekta,
- status,
- complexity score,
- budžet,
- datum.

Statusi:

```php
new
reviewed
needs_more_info
proposal_sent
accepted
rejected
archived
```

Na detaljnoj stranici prikazati:

- kontakt podatke,
- sve odgovore,
- project brief,
- complexity score,
- admin napomene,
- status,
- dugme za PDF export.

---

### 8. Complexity score

Implementirati servis:

```php
ProjectInquiryScoringService
```

Score može biti:

```php
low
medium
high
enterprise
```

Primjer logike:

- landing page bez integracija → low
- prezentacioni web sajt sa blogom i više jezika → medium
- web shop sa plaćanjem i dostavom → high
- web aplikacija sa korisnicima, ulogama, plaćanjem i integracijama → enterprise

Takođe dodati `budget_score`:

```php
low_budget
standard
serious
enterprise
unknown
```

---

### 9. Emailovi

Kreirati mail klase:

```php
ProjectInquiryReceivedAdminMail
ProjectInquiryReceivedClientMail
```

Admin email treba sadržavati:

- ime klijenta,
- email,
- telefon,
- tip projekta,
- budžet,
- rok,
- complexity score,
- link za pregled u admin panelu.

Klijent email treba sadržavati:

- potvrdu prijema,
- zahvalnicu,
- kratak opis narednih koraka.

---

### 10. PDF export

Omogućiti export jedne prijave u PDF.

PDF treba sadržavati:

- osnovne podatke,
- tip projekta,
- ciljeve,
- sve odgovore,
- scoring,
- datum slanja,
- interne napomene ako se export radi za admin.

---

### 11. Translation struktura

Sva pitanja i odgovori moraju biti u translation fajlovima.

Kreirati:

```php
resources/lang/bs/project-inquiry.php
resources/lang/en/project-inquiry.php
resources/lang/de/project-inquiry.php
resources/lang/it/project-inquiry.php
```

Ne hardkodirati tekstove u React komponentama.

React treba dobijati form schema sa prevedenim labelima i opisima iz backend-a ili kroz i18n sistem projekta.

---

### 12. Frontend komponenta

Kreirati React/Inertia stranicu:

```tsx
resources/js/Pages/ProjectInquiry/Create.tsx
```

Komponente:

```tsx
ProjectInquiryForm
FormStep
FormProgress
QuestionRenderer
ConditionalSection
SuccessState
```

Podržati tipove polja:

```tsx
text
email
phone
url
textarea
single_choice
multiple_choice
date
ranking
```

Obavezno:

- mobile-first layout,
- progress bar,
- validacija po koraku,
- dugmad Nazad/Dalje,
- završno dugme Pošalji upitnik,
- loading state,
- error state,
- success state.

---

### 13. UX zahtjevi

UI treba biti profesionalan, čist i premium.

Dizajn:

- bijela ili svijetla pozadina,
- jasna kartica za formu,
- dobar spacing,
- moderni inputi,
- jasni opisi tehničkih pojmova,
- pregledne opcije,
- minimalan vizuelni šum,
- mobilna optimizacija.

Kod tehničkih pojmova kao što su domen, hosting i SEO prikazati kratko objašnjenje.

Uvijek omogućiti opciju:

- Nisam siguran/sigurna
- Ne znam šta je to
- Želim preporuku

gdje ima smisla.

---

### 14. Sigurnost i zaštita

Implementirati:

- CSRF zaštitu,
- rate limiting za POST rutu,
- server-side validaciju,
- sanitizaciju textarea unosa,
- zaštitu od spam prijava,
- opcionalni honeypot field.

Ne čuvati nepotrebne osjetljive podatke.

---

### 15. Završni rezultat

Na kraju implementacije očekujem:

1. Migracije
2. Modele
3. FormRequest validaciju
4. Controller
5. Service za scoring
6. Mail klase
7. Filament resource
8. PDF export
9. React/Inertia multi-step formu
10. Translation fajlove
11. Seed/demo opcije ako je korisno
12. Kratku dokumentaciju kako dodati novo pitanje ili novi tip projekta

Kod mora biti čist, modularan, održiv i spreman za proširenje.

Nemoj implementirati sve kao hardkodiranu statičnu formu. Forma mora biti schema-driven koliko je realno moguće, tako da se pitanja, opcije i uslovna logika mogu lakše proširivati.

---
