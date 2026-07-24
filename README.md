# Portfolio v2

Portfolio personnel — développement web, design graphique et photographie.

## Stack

- Next.js 16 · TypeScript · Tailwind CSS 4
- Framer Motion · Three.js / React Three Fiber
- Thèmes par compétence : `/dev`, `/design`, `/photo`
- Export statique (compatible GitHub Pages)

## Commandes

| Commande | Description |
|----------|-------------|
| `npm install` | Installe les dépendances |
| `npm run dev` | Serveur de développement ([localhost:3000](http://localhost:3000)) |
| `npm run build` | Synchronise la galerie photo puis export statique → `out/` |
| `npm start` | Sert le dossier `out/` en local (après `build`) |
| `npm run lint` | Vérifie le code avec ESLint |
| `npm run optimize-photos` | Convertit les JPG/PNG en WebP (filigrane + redimensionnement) et met à jour la galerie |
| `npm run sync-photos` | Resynchronise le manifeste galerie sans recompresser les images |

```bash
npm install
npm run dev
```

Accès réseau local :

```bash
npm run dev -- -H 0.0.0.0
```

Production :

```bash
npm run build
npm start
```

## Variables d'environnement

Copier `.env.example` vers `.env.local` :

| Variable | Rôle |
|----------|------|
| `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` | Clé publique [Web3Forms](https://web3forms.com) pour le formulaire de contact |
| `NEXT_PUBLIC_SITE_URL` | URL canonique du site (SEO / sitemap) |
| `NEXT_PUBLIC_BASE_PATH` | Sous-chemin éventuel (ex. projet GitHub Pages) |

En CI, définir le secret `WEB3FORMS_ACCESS_KEY` (injecté au build).

## Déploiement GitHub Pages

Dépôt : [CapitainLazer/Portfolio](https://github.com/CapitainLazer/Portfolio)

Le workflow `.github/workflows/deploy-pages.yml` construit et publie le dossier `out/` sur push `main`.

1. Activer **Settings → Pages → Source : GitHub Actions**
2. Configurer le secret `WEB3FORMS_ACCESS_KEY` si le formulaire doit fonctionner en prod
3. Domaine perso optionnel via `public/CNAME` + DNS chez le registrar

Sans domaine perso pour l’instant :

- URL : `https://CapitainLazer.github.io/Portfolio/`
- Dans le workflow : `NEXT_PUBLIC_SITE_URL=https://CapitainLazer.github.io/Portfolio` et `NEXT_PUBLIC_BASE_PATH=/Portfolio`

## Photos

Les photos sont gérées automatiquement — **ne pas éditer `src/lib/photos.ts` à la main**.

1. Déposer les JPG/PNG dans `public/images/photo/`
2. Lancer `npm run optimize-photos`
3. Relancer `npm run dev` ou `npm run build`

```
public/images/photo/
├── ma-photo.jpg          # sources
└── web/
    └── ma-photo.webp     # versions servies
```

`npm run build` exécute `sync-photos` avant la compilation.

## Pages

| Route | Contenu |
|-------|---------|
| `/` | Accueil |
| `/dev` | Projets développement |
| `/design` | Projets design |
| `/photo` | Galerie photo |
| `/cv` | CV |
| `/mentions-legales` | Mentions légales |
| `/politique-de-confidentialite` | Politique de confidentialité |

## Licence

Code et contenus © l’auteur — tous droits réservés, sauf mention contraire.
