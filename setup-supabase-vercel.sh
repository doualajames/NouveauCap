#!/usr/bin/env bash
# ============================================================
# NouveauCap — Script de configuration Supabase + Vercel
# À exécuter UNE SEULE FOIS sur votre machine locale
# ============================================================
set -e

# Remplissez ces valeurs avant d'exécuter le script
VERCEL_TOKEN=""          # vercel.com → Settings → Tokens
JWT_SECRET=""            # Chaîne aléatoire longue (ex: openssl rand -base64 48)

# Supabase → Project Settings → Database → Connection string
DATABASE_URL=""          # Transaction pooler  — port 6543, avec ?pgbouncer=true
DIRECT_DATABASE_URL=""   # Connexion directe   — port 5432

# ──────────────────────────────────────────────────────────

if [ -z "$DATABASE_URL" ] || [ -z "$DIRECT_DATABASE_URL" ] || [ -z "$JWT_SECRET" ]; then
  echo "❌  Remplissez toutes les variables en haut du script avant de l'exécuter."
  exit 1
fi

echo "▶  1/4  Création du fichier .env.local..."
cat > .env.local <<EOF
DATABASE_URL="${DATABASE_URL}"
DIRECT_DATABASE_URL="${DIRECT_DATABASE_URL}"
JWT_SECRET="${JWT_SECRET}"
EOF
echo "✅  .env.local créé"

echo "▶  2/4  Génération du client Prisma..."
bun run db:generate

echo "▶  3/4  Création des tables dans Supabase (prisma db push)..."
bun run db:push
echo "✅  Schéma Supabase à jour"

echo "▶  4/4  Configuration des variables d'environnement sur Vercel..."

PROJECT_ID=$(curl -sf "https://api.vercel.com/v9/projects?search=NouveauCap&limit=5" \
  -H "Authorization: Bearer ${VERCEL_TOKEN}" | grep -o '"id":"[^"]*"' | head -1 | cut -d'"' -f4)

if [ -z "$PROJECT_ID" ]; then
  echo "⚠️   Projet Vercel non trouvé automatiquement."
  echo "    Ajoutez manuellement ces variables dans Vercel → Settings → Environment Variables :"
  echo "    DATABASE_URL          = ${DATABASE_URL}"
  echo "    DIRECT_DATABASE_URL   = ${DIRECT_DATABASE_URL}"
  echo "    JWT_SECRET            = ${JWT_SECRET}"
  exit 0
fi

echo "   Projet Vercel trouvé : ${PROJECT_ID}"

set_var() {
  curl -sf -X POST "https://api.vercel.com/v10/projects/${PROJECT_ID}/env" \
    -H "Authorization: Bearer ${VERCEL_TOKEN}" \
    -H "Content-Type: application/json" \
    -d "{\"key\":\"$1\",\"value\":\"$2\",\"type\":\"encrypted\",\"target\":[\"production\",\"preview\"]}" \
    > /dev/null && echo "   ✅  $1 ajoutée"
}

set_var "DATABASE_URL"        "${DATABASE_URL}"
set_var "DIRECT_DATABASE_URL" "${DIRECT_DATABASE_URL}"
set_var "JWT_SECRET"          "${JWT_SECRET}"

echo ""
echo "✅  Configuration terminée ! Déclenchez un redéploiement dans Vercel."
