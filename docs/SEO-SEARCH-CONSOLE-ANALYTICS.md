# SEO, Search Console i Google Analytics

## Sta je sada uradjeno

- Dinamicki SEO meta podaci po jeziku za glavne rute.
- `canonical` i `hreflang` za `bs-BA`, `en`, `de-DE` i `it-IT`.
- JSON-LD schema za glavne stranice, usluge, proizvode i portfolio.
- Automatska generacija `public/sitemap.xml`.
- `robots.txt` pokazuje na sitemap.
- GA4 integracija je spremna preko env varijable `VITE_GA_MEASUREMENT_ID`.
- Build-time prerender za najvaznije landing stranice, tako da svaka kljucna ruta izlazi kao gotov HTML i bez JavaScript rendera.

## Fajlovi koji su bitni

- `src/lib/seo.ts`
- `src/components/wizionar/SEOHead.tsx`
- `src/components/wizionar/HreflangTags.tsx`
- `src/components/wizionar/GoogleAnalytics.tsx`
- `src/app-routes.tsx`
- `src/app-shell.tsx`
- `src/entry-server.tsx`
- `src/main.tsx`
- `scripts/generate-sitemap.mjs`
- `scripts/prerender.mjs`
- `public/sitemap.xml`
- `public/robots.txt`
- `.env.example`

## Kako sada radi build

`npm run build` sada radi ove korake:

1. generise sitemap
2. napravi klijentski Vite build
3. napravi SSR build u `.prerender`
4. prerenderuje najvaznije rute u stvarne HTML fajlove unutar `dist`

Komanda:

```bash
npm run build
```

Posebne pomocne komande:

```bash
npm run generate:sitemap
npm run build:ssr
npm run prerender
```

## Build-time prerender

Prerender znaci da Googlebot, Search Console i korisnik koji otvori stranicu bez izvrsenog JavaScript-a odmah dobijaju:

- gotov HTML sadrzaj u `#root`
- `title`
- `meta description`
- `canonical`
- `hreflang`
- Open Graph tagove
- JSON-LD schema podatke

To je posebno vazno za:

- naslovnu stranicu
- landing stranice usluga
- portfolio / case study stranice
- jezicke varijante za domace, njemacko i italijansko trziste

## Koje rute se prerenderuju

Prerenderuju se najvaznije javne SEO rute za sve podrzane jezike:

- `/`
- `/wizflussi`
- `/wizmedik`
- `/wizmedik-reports`
- `/frizerino`
- `/chatko`
- `/usluge`
- `/usluge/izrada-web-stranica`
- `/usluge/seo-optimizacija`
- `/usluge/graficki-dizajn`
- svi `portfolio/:slug` URL-ovi
- iste te rute pod `/en`, `/de` i `/it`

Lista ruta se odrzava u:

- `src/entry-server.tsx`

Ako dodajes novu vaznu landing stranicu, dodaj je i u listu za prerender.

## Kako provjeriti da je prerender stvarno aktivan

Poslije builda provjeri da postoje fajlovi kao:

```text
dist/index.html
dist/usluge/izrada-web-stranica/index.html
dist/de/usluge/izrada-web-stranica/index.html
dist/it/portfolio/mediconnect-klinika/index.html
```

Otvaranjem tih fajlova treba da vidis:

- pun HTML sadrzaj unutar `<div id="root">`
- route-specific SEO tagove u `<head>`
- odgovarajuci `lang` atribut na `<html>`

Na klijentu se nakon toga radi `hydrate`, ne puni render od nule. To je podeseno u:

- `src/main.tsx`

## Kako se generise sitemap

Pokreni:

```bash
npm run generate:sitemap
```

Build vec automatski pokrece generaciju sitemap-a prije Vite builda.

Nakon deploya sitemap mora biti javno dostupan na:

```text
https://wizionar.app/sitemap.xml
```

## Search Console: preporuceni setup

Najbolja opcija je da dodas `Domain property` za:

```text
wizionar.app
```

To pokriva:

- `https://wizionar.app`
- eventualne `http` varijante
- eventualne `www` ili subdomene ako se kasnije pojave

### Koraci

1. Otvori Google Search Console.
2. Klikni `Add property`.
3. Izaberi `Domain`.
4. Unesi `wizionar.app`.
5. Google ce dati DNS TXT zapis.
6. Taj TXT zapis dodaj kod provajdera domene.
7. Sacekaj DNS propagaciju i klikni `Verify`.

### Poslije verifikacije

1. Otvori `Sitemaps`.
2. U polje `Add a new sitemap` unesi:

```text
sitemap.xml
```

3. Klikni `Submit`.
4. Provjeri da status bude `Success`.

### Sta odmah testirati

U `URL Inspection` provjeri barem ove URL-ove:

- `https://wizionar.app/`
- `https://wizionar.app/usluge/izrada-web-stranica`
- `https://wizionar.app/de/usluge/izrada-web-stranica`
- `https://wizionar.app/it/usluge/seo-optimizacija`
- `https://wizionar.app/portfolio/techflow-dashboard`

Ako je stranica nova ili izmijenjena:

1. otvori URL Inspection
2. klikni `Test live URL`
3. zatim `Request indexing`

### Kako provjeriti prerender u Search Console

Za kljucne landing stranice uradi i ovo:

1. otvori `URL Inspection`
2. pokreni `Test live URL`
3. otvori pregled renderovanog HTML-a
4. potvrdi da su naslov, opis i glavni sadrzaj vidljivi i prije izvrsavanja dodatnog JS-a

Ako Google vidi gotov HTML sa sadrzajem, prerender radi kako treba.

## Google Analytics 4 setup

### 1. Napravi GA4 property i web stream

U Google Analytics napravi:

- account
- GA4 property
- web data stream za `wizionar.app`

Sacuvaj `Measurement ID`, na primjer:

```text
G-XXXXXXXXXX
```

### 2. Dodaj env varijablu

Kreiraj lokalni `.env` ili postavi varijablu na hostingu:

```bash
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

Ako ova varijabla nije postavljena, Analytics skripta se nece ucitati.

### 3. Rebuild i deploy

```bash
npm run build
```

### 4. Provjera da li radi

U Google Analytics:

1. otvori `Realtime`
2. posjeti sajt
3. otvori nekoliko ruta i promijeni jezik
4. provjeri da li dolaze `page_view` dogadjaji

## Preporuke za operativni rad

- Nakon svake vece SEO izmjene ili dodavanja novih javnih stranica pokreni `npm run build`.
- Ako dodas novu javnu rutu, ubaci je i u `scripts/generate-sitemap.mjs`.
- Ako je ruta SEO bitna, ubaci je i u `src/entry-server.tsx` za prerender.
- Za kljucne landing stranice redovno provjeravaj `Page indexing`, `URL Inspection` i `Core Web Vitals`.
- Za njemacko i italijansko trziste radi native copy, ne samo bukvalni prevod.
- Canonical i hreflang moraju uvijek ostati uskladjeni sa stvarnim URL strukturama.

## Zvanicne Google reference

- Search Console verification: https://support.google.com/webmasters/answer/9008080
- Search Console sitemaps report: https://support.google.com/webmasters/answer/7451001
- URL Inspection: https://support.google.com/webmasters/answer/12482179
- GA4 setup for website/app: https://support.google.com/analytics/answer/9306384
- Google tag setup: https://support.google.com/tagmanager/answer/15756615
- Find GA4 measurement ID: https://support.google.com/analytics/answer/12270356
