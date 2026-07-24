# Projets-Persos — Portfolio v2

Portfolio personnel de **Romaric Cathalifaud** — développement web, design graphique et photographie.

## Stack

- Next.js 16 · TypeScript · Tailwind CSS 4
- Framer Motion · Three.js / React Three Fiber
- Thèmes par compétence : `/dev`, `/design`, `/photo`

## Commandes

| Commande | Description |
|----------|-------------|
| `npm install` | Installe les dépendances |
| `npm run dev` | Serveur de développement ([localhost:3000](http://localhost:3000)) |
| `npm run build` | Synchronise la galerie photo puis **export statique** → dossier `out/` |
| `npm start` | Sert le dossier `out/` en local (après `build`) |
| `npm run lint` | Vérifie le code avec ESLint |
| `npm run optimize-photos` | Convertit les JPG/PNG en WebP (filigrane + redimensionnement) et met à jour la galerie |
| `npm run sync-photos` | Resynchronise le manifeste galerie sans recompresser les images |

### Développement

```bash
npm install
npm run dev
```

Accès depuis le téléphone / réseau local :

```bash
npm run dev -- -H 0.0.0.0
```

### Production (statique)

```bash
npm run build
npm start
```

Le site est un **export HTML/CSS/JS** (compatible GitHub Pages). Le dossier généré est `out/`.

## Déploiement GitHub Pages + SEO

Le référencement fonctionne sur GitHub Pages : sitemap, robots, Open Graph et JSON-LD sont générés au build.

### 1. Créer / pousser le dépôt GitHub

Le remote actuel est GitLab. Pour Pages, il faut un dépôt GitHub (ex. `CapitainLazer/Portfolio-v2`) :

```bash
# Créer le repo (si gh est installé)
gh repo create CapitainLazer/Portfolio-v2 --public --source=. --remote=github --push

# Ou ajouter un remote existant
git remote add github git@github.com:CapitainLazer/Portfolio-v2.git
git push -u github main
```

### 2. Activer Pages

Dans le dépôt GitHub → **Settings → Pages** :

1. **Source** : *GitHub Actions*
2. Attendre le workflow `Deploy GitHub Pages` (push sur `main`)

URL temporaire : `https://CapitainLazer.github.io/Portfolio-v2/`  
*(si pas encore de domaine perso, mets `NEXT_PUBLIC_BASE_PATH=/Portfolio-v2` et `NEXT_PUBLIC_SITE_URL=https://CapitainLazer.github.io/Portfolio-v2` dans le workflow)*

### 3. Domaine personnalisé (recommandé pour le SEO)

Fichier déjà présent : `public/CNAME` → `romaric-cathalifaud-portfolio.fr`

Chez ton registrar DNS :

| Type | Nom | Valeur |
|------|-----|--------|
| `A` | `@` | `185.199.108.153` |
| `A` | `@` | `185.199.109.153` |
| `A` | `@` | `185.199.110.153` |
| `A` | `@` | `185.199.111.153` |
| `AAAA` | `@` | `2606:50c0:8000::153` |
| `AAAA` | `@` | `2606:50c0:8001::153` |
| `AAAA` | `@` | `2606:50c0:8002::153` |
| `AAAA` | `@` | `2606:50c0:8003::153` |
| `CNAME` | `www` | `CapitainLazer.github.io` |

Puis dans **Settings → Pages → Custom domain** : `romaric-cathalifaud-portfolio.fr` + cocher **Enforce HTTPS**.

### 4. Indexation Google

1. [Google Search Console](https://search.google.com/search-console) → ajouter la propriété
2. Soumettre `https://romaric-cathalifaud-portfolio.fr/sitemap.xml`

## Contact (formulaire sécurisé)

Aucun email n’est affiché sur le site. Les messages passent par le formulaire (`#contact`) via [Web3Forms](https://web3forms.com), avec honeypot + délai anti-bot.

1. Créer une Access Key sur [web3forms.com](https://web3forms.com) avec **`romaric.cathalifaud@gmail.com`**
2. En local, copier `.env.example` → `.env.local` :

```bash
NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=ta_cle_ici
```

3. Sur GitHub : **Settings → Secrets and variables → Actions** → secret `WEB3FORMS_ACCESS_KEY`

## Photos

Les photos sont gérées automatiquement — **inutile d'éditer `src/lib/photos.ts` à la main**.

### Ajouter ou mettre à jour des photos

1. Déposer les fichiers **JPG ou PNG** dans `public/images/photo/`
2. Lancer l'optimisation :

```bash
npm run optimize-photos
```

Cette commande :

- génère les WebP dans `public/images/photo/web/` (max 1920 px, filigrane signature à 7 %)
- met à jour `src/lib/photos.manifest.json` (liste utilisée par la galerie)
- supprime les WebP orphelins si une source a été retirée

3. Relancer le dev ou rebuild :

```bash
npm run dev
# ou
npm run build
```

### Resynchroniser sans recompresser

Si les WebP existent déjà et que vous voulez seulement régénérer le manifeste :

```bash
npm run sync-photos
```

> `npm run build` exécute automatiquement `sync-photos` avant la compilation.

### Structure

```
public/images/photo/
├── ma-photo.jpg          # sources (non servies directement)
└── web/
    └── ma-photo.webp     # versions optimisées affichées sur le site
```

## CV

Placer le PDF dans `public/cv/romaric-cathalifaud-cv.pdf` pour activer le téléchargement depuis la page `/cv`.

## Pages

| Route | Contenu |
|-------|---------|
| `/` | Accueil — hero, projets, galerie (6 photos max), contact |
| `/dev` | Projets développement |
| `/design` | Projets design |
| `/photo` | Galerie photographique complète |
| `/cv` | CV téléchargeable |
