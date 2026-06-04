# Project inquiry forma

Javna forma je dostupna na:

- `/projektni-upitnik`
- `/project-inquiry`
- lokalizovano kroz postojeće prefikse, npr. `/en/projektni-upitnik`

## Backend, baza i email

Za Hetzner server dodan je Node/Express backend u `server/index.js`.

Endpoint:

```txt
POST /api/project-inquiry
GET /api/health
```

Frontend koristi:

```env
VITE_PROJECT_INQUIRY_ENDPOINT=/api/project-inquiry
```

Endpoint radi:

- server-side validaciju,
- honeypot i rate-limit zaštitu,
- snimanje prijave u MySQL,
- snimanje svih odgovora u posebnu tabelu,
- email na `info@wizionar.com`,
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

Na serveru podesite `.env`:

```env
VITE_PROJECT_INQUIRY_ENDPOINT=/api/project-inquiry

PORT=3000
HOST=127.0.0.1
CORS_ORIGIN=https://wizionar.com,https://www.wizionar.com

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

## Pokretanje na Hetzneru

```bash
npm install
npm run build
npm run server
```

Za stalno pokretanje preporuka je `pm2`:

```bash
npm install -g pm2
pm2 start server/index.js --name wizionar
pm2 save
pm2 startup
```

Nginx primjer:

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

## Zaštita od spama

Frontend trenutno koristi:

- honeypot polje `website_url`,
- lokalni rate limit između slanja,
- minimalno vrijeme prije slanja,
- matematičku provjeru,
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

Za novo pitanje dodajte objekat u `fields` željenog koraka:

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

Podržani tipovi polja su:

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
