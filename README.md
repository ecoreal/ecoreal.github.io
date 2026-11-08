# ecoreal.github.io

**Jerry Lee — personal portfolio.** Systems, AI & vision: who I am, what I've
built, and where it's going.

🔗 **Live:** https://ecoreal.github.io/

## Stack

Deliberately boring: **plain HTML + CSS + JS**, no build step, no framework.
`index.html` + `style.css` + `script.js` is the whole site — fork it, edit,
push, deployed (GitHub Pages serves `main` automatically).

## Local preview

```bash
python3 -m http.server 8000     # or just open index.html
```

## Structure

| Path | Role |
| --- | --- |
| `index.html` / `404.html` | pages |
| `style.css` / `script.js` | all styling & behaviour |
| `assets/` | icons, profile mark, project images |
| `sitemap.xml` / `robots.txt` / `site.webmanifest` | SEO & PWA niceties |

License: MIT (see [LICENSE](LICENSE)).
