# Project inquiry forma

Javna forma je dostupna na:

- `/projektni-upitnik`
- `/project-inquiry`
- lokalizovano kroz postojeće prefikse, npr. `/en/projektni-upitnik`

## Sta mora biti ukljuceno da email radi

`.env` sam po sebi nije dovoljan. Moraju biti sva 4 koraka:

1. Node server pokrenut na `127.0.0.1:3000` (pm2)
2. `.env` u **rootu git projekta**, pored `package.json` (ne u `dist` i ne u `public_html` HTML folderu)
3. `npm run build` nakon `git pull`
4. Apache/Nginx reverse proxy sa javnog domena na `http://127.0.0.1:3000`

Provjera: `https://wizionar.com/api/health` mora vratiti JSON `{"ok":true,"db":true}`, ne Apache HTML 500.

## Backend, baza i email

Za Hetzner server dodan je Node/Express backend u `server/index.js`.

Endpoint:

```txt
POST /api/project-inquiry
GET /api/health
```

Frontend uvijek salje na `/api/project-inquiry`.

Endpoint radi:

- server-side validaciju,
- honeypot i rate-limit zastitu,
- snimanje prijave u MySQL,
- snimanje svih odgovora u posebnu tabelu,
- email na `info@wizionar.com` sa svim poljima, IP adresom i User-Agent podacima,
- email klijentu sa kopijom poslanog upita.

## MySQL

Kreirajte bazu i korisnika, zatim importujte shemu:

```bash
mysql -u root -p
```

```sql
CREATE DATABASE wizionar CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'wizionar'@'localhost' IDENTIFIED BY 'strong-password-here';
GRANT ALL PRIVILEGES ON wizionar.* TO 'wizionar'@'localhost';
FLUSH PRIVILEGES;
```

```bash
mysql -u wizionar -p wizionar < server/schema.sql
```

## Environment

Na serveru kreirajte `.env` **u rootu projekta**:

```bash
cd /var/www/wizionar
cp .env.example .env
nano .env
```

Putanja mora biti:

```txt
/var/www/wizionar/.env
```

(` /var/www/wizionar` zamijenite stvarnom putanjom gdje je `package.json`.)

Ne stavljati `.env` u `dist/`, `public/` ili cisti `public_html` sa HTML fajlovima.

```env
VITE_PROJECT_INQUIRY_ENDPOINT=/api/project-inquiry

PORT=3000
HOST=127.0.0.1
CORS_ORIGIN=https://wizionar.com,https://www.wizionar.com,https://wizionar.app

DB_HOST=127.0.0.1
DB_PORT=3306
DB_NAME=wizionar
DB_USER=wizionar
DB_PASSWORD=strong-password-here

ADMIN_EMAIL=info@wizionar.com
SMTP_HOST=mail.your-server.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=info@wizionar.com
SMTP_PASS=mail-password-here
SMTP_FROM="Wizionar <info@wizionar.com>"
```

Server ucitava bas taj fajl: `server/index.js` trazi `.env` pored `package.json`.

## Pokretanje na Hetzneru

```bash
cd /var/www/wizionar
git pull
npm install
npm run build
```

Za stalno pokretanje koristite `pm2`:

```bash
npm install -g pm2
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup
```

Ili jednom:

```bash
bash scripts/deploy-hetzner.sh
```

Lokalna provjera na serveru:

```bash
curl -sS http://127.0.0.1:3000/api/health
```

Ocekivano:

```json
{"ok":true,"db":true}
```

Ako ovo radi, a `https://wizionar.com/api/health` i dalje daje Apache 500, proxy nije podesen.

## Apache (trenutni live server)

Datoteka: `deploy/apache-wizionar.conf`

```bash
sudo a2enmod proxy proxy_http headers rewrite ssl
sudo cp deploy/apache-wizionar.conf /etc/apache2/sites-available/wizionar.conf
# uredite ServerName ako treba
sudo a2ensite wizionar
sudo systemctl reload apache2
```

Preporuceni nacin: Apache sve salje na Node:

```apache
ProxyPreserveHost On
RequestHeader set X-Forwarded-Proto "https"
ProxyPass / http://127.0.0.1:3000/
ProxyPassReverse / http://127.0.0.1:3000/
```

Ako Apache mora i dalje sluziti `dist/` staticki, onda bar API:

```apache
ProxyPass /api http://127.0.0.1:3000/api
ProxyPassReverse /api http://127.0.0.1:3000/api
```

`public/.htaccess` se kopira u `dist/` pri buildu. On ne radi proxy; samo cuva `/api` od SPA fallback-a.

## Nginx alternativa

```nginx
server {
    server_name wizionar.com www.wizionar.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## Zastita od spama

Frontend trenutno koristi:

- honeypot polje `website_url`,
- lokalni rate limit izmedju slanja,
- minimalno vrijeme prije slanja,
- matematicku provjeru,
- osnovnu validaciju i sanitizaciju teksta.

Na endpointu obavezno ponoviti:

- server-side validaciju obaveznih i uslovnih polja,
- rate limiting po IP adresi,
- provjeru honeypot polja,
- CORS allowlist za domen,
- opcionalno Cloudflare Turnstile ili reCAPTCHA,
- slanje emaila administratoru i potvrde klijentu.

## Dodavanje pitanja

Pitanja su u `src/lib/project-inquiry-schema.ts`.

Za novo pitanje dodajte objekat u `fields` zeljenog koraka:

```ts
{
  key: "new_question_key",
  label: "Tekst pitanja",
  type: "single_choice",
  required: true,
  options: [
    { value: "yes", label: "Da" },
    { value: "no", label: "Ne" },
  ],
}
```

Za uslovno pitanje dodajte `showWhen`:

```ts
showWhen: (answers) => answers.project_type === "ecommerce"
```

Podrzani tipovi polja su:

- `text`
- `email`
- `phone`
- `url`
- `textarea`
- `single_choice`
- `multiple_choice`
- `date`
- `ranking`
- `consent`
