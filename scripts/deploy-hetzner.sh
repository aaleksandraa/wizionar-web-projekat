#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

if [ ! -f "$ROOT/.env" ]; then
  echo "Missing $ROOT/.env"
  echo "Copy .env.example to .env in the project root (next to package.json), then edit SMTP and DB values."
  exit 1
fi

git pull
npm install
npm run build

if pm2 describe wizionar >/dev/null 2>&1; then
  pm2 restart wizionar --update-env
else
  pm2 start ecosystem.config.cjs
fi

pm2 save

echo
echo "Local health check:"
curl -sS -i "http://127.0.0.1:3000/api/health" || true
echo
echo "If that JSON shows ok:true, Apache/Nginx must proxy the public domain to 127.0.0.1:3000."
echo "Public check after proxy: curl -sS https://wizionar.com/api/health"
