# qleoz12.github.io — Blog + Portfolio

Sitio personal en GitHub Pages: blog Jekyll + portfolio Astro.

**Producción:** https://qleoz12.github.io  
**GitHub Pages:** rama `master`, carpeta `/docs`

## Estructura

| Carpeta | Qué es | Tecnología |
|---------|--------|------------|
| `jekyll/` | Fuente del blog (posts, páginas) | Jekyll |
| `portfolio/` | Fuente del portfolio por rol | Astro + Tailwind |
| `docs/` | Sitio publicado (generado, no editar a mano) | HTML estático |

## Requisitos

- Ruby + Bundler (`cd jekyll && bundle install`)
- Node.js 18+ (`cd portfolio && npm install`)

## Build completo

Desde la raíz del repo:

```powershell
.\scripts\build-site.ps1
```

Orden manual (siempre **Jekyll primero**, **Astro después**):

```powershell
cd jekyll
bundle exec jekyll build

cd ..\portfolio
npm run build
```

## Desarrollo local

**Blog:**

```powershell
cd jekyll
bundle exec jekyll serve --livereload
# http://localhost:4000
```

**Portfolio:**

```powershell
cd portfolio
npm run dev
# http://localhost:4321/portfolio/
```

## Antes de publicar

1. Corriste `.\scripts\build-site.ps1`
2. Existe `docs/portfolio/_astro/*.css`
3. Los links del hub van a `/portfolio/frontend/` (no `/portfoliofrontend/`)

## Publicar

```powershell
git add jekyll portfolio docs scripts README.md
git commit -m "Update site"
git push origin master
```

Incluí siempre `docs/portfolio/_astro/` en el commit. Sin esa carpeta el portfolio se ve sin estilos.

## URLs

| Ruta | Contenido |
|------|-----------|
| `/` | Blog |
| `/portfolio/` | Hub de roles |
| `/portfolio/python-backend/` | Perfil backend Python |
| `/portfolio/frontend/` | Perfil frontend |
| `/portfolio/fullstack/` | Perfil full stack |
| `/experience/` | CV para formularios |

## Repo canónico

- Local: `U:\personalblog\actual\qleoz12.github.io`
- GitHub: https://github.com/Qleoz12/qleoz12.github.io
- No publicar desde `U:\personalblog\qleoz12.github.io` (copia vieja).
