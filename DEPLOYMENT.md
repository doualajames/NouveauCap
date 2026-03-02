# Guide de Déploiement NouveauCap

## Option 1 : Vercel + Supabase (Recommandé)

### Étape 1 : Créer la base de données Supabase

1. Allez sur [supabase.com](https://supabase.com)
2. Créez un nouveau projet
3. Notez l'URL et la clé API depuis Settings > API

### Étape 2 : Configurer les variables d'environnement

Dans Vercel Dashboard > Settings > Environment Variables :

```
DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres"
DIRECT_DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres"
NEXTAUTH_SECRET="générez-une-clé-secrète-32-caractères"
NEXTAUTH_URL="https://votre-domaine.com"
```

### Étape 3 : Changer le schéma Prisma

```bash
# Remplacer le fichier schema
cp prisma/schema.postgresql.prisma prisma/schema.prisma

# Générer le client
bunx prisma generate

# Pousser les changements
bunx prisma db push
```

### Étape 4 : Déployer sur Vercel

```bash
# Installer Vercel CLI
npm i -g vercel

# Déployer
vercel

# Connecter le domaine
vercel domains add votre-domaine.com
```

---

## Option 2 : Railway (Base de données + App)

### Étape 1 : Créer le projet

1. Allez sur [railway.app](https://railway.app)
2. New Project > Deploy from GitHub repo > Sélectionnez NouveauCap
3. Ajoutez PostgreSQL : Add Service > Database > PostgreSQL

### Étape 2 : Configurer les variables

Railway va automatiquement configurer `DATABASE_URL`.

Variables à ajouter :
```
NEXTAUTH_SECRET=votre-secret
NEXTAUTH_URL=https://votre-app.railway.app
```

### Étape 3 : Déployer

Railway détecte automatiquement Next.js et déploie.

---

## Option 3 : Docker + VPS

### Dockerfile

```dockerfile
FROM oven/bun:1 AS base
WORKDIR /app

# Install dependencies
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile

# Copy source
COPY . .

# Generate Prisma Client
RUN bunx prisma generate

# Build
RUN bun run build

# Expose port
EXPOSE 3000

# Start
CMD ["bun", "run", "start"]
```

### docker-compose.yml

```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://postgres:password@db:5432/nouveau_cap
      - NEXTAUTH_SECRET=your-secret
      - NEXTAUTH_URL=https://votre-domaine.com
    depends_on:
      - db
  
  db:
    image: postgres:15
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
      - POSTGRES_DB=nouveau_cap
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

---

## Commandes utiles

```bash
# Générer le client Prisma
bunx prisma generate

# Synchroniser la base de données
bunx prisma db push

# Voir les données
bunx prisma studio

# Créer une migration
bunx prisma migrate dev --name init
```

---

## Checklist de déploiement

- [ ] Base de données PostgreSQL créée (Supabase/Railway/Neon)
- [ ] Variables d'environnement configurées
- [ ] Schéma Prisma migré vers PostgreSQL
- [ ] Application déployée (Vercel/Railway)
- [ ] Domaine personnalisé configuré
- [ ] HTTPS activé (automatique sur Vercel/Railway)
- [ ] Base de données seedée avec les données initiales
