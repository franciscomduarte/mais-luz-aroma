# Mais Luz & Aroma — Landing Page Estática (GitHub Pages)

Versão 100% HTML + CSS + JavaScript puros. Sem build, sem dependências,
sem npm — é só abrir o `index.html` ou publicar no GitHub Pages.

## Estrutura

```
index.html        ← todo o conteúdo (com comentários ⚠️ onde editar)
css/styles.css    ← estilos (paleta da marca nas variáveis :root)
js/script.js      ← WhatsApp, menu, reveal, carousel, lightbox
images/           ← placeholders SVG (substitua pelas fotos reais)
robots.txt        ← ajuste a URL do seu GitHub Pages
sitemap.xml       ← idem
```

## Testando localmente

Basta dar dois cliques no `index.html` — funciona direto no navegador.
Ou, para simular um servidor:

```bash
python3 -m http.server 8000
# abra http://localhost:8000
```

## ✅ Antes de publicar

1. **WhatsApp** — em `js/script.js`, troque `whatsapp: "5585999999999"`
   pelo número real (55 + DDD + número).
2. **URLs** — troque `SEUUSUARIO.github.io/mais-luz-aroma` no
   `index.html` (canonical), `robots.txt` e `sitemap.xml`.
3. **Fotos** — substitua os SVGs em `images/` pelas fotos reais do
   Instagram (JPG/WebP, ~1200px no lado maior). Mantenha os nomes dos
   arquivos ou atualize os `src` no `index.html`.
4. **Depoimentos** — os três são exemplos; troque pelos reais.

## Publicando no GitHub Pages

```bash
git init
git add .
git commit -m "Landing page Mais Luz & Aroma"
git branch -M main
git remote add origin https://github.com/SEUUSUARIO/mais-luz-aroma.git
git push -u origin main
```

Depois, no GitHub: **Settings → Pages → Source: Deploy from a branch →
Branch: `main` / `(root)` → Save**. Em ~1 minuto o site estará em
`https://SEUUSUARIO.github.io/mais-luz-aroma/`.

> Todos os caminhos do projeto são relativos, então funciona tanto na
> raiz (`usuario.github.io`) quanto em subpasta (`/mais-luz-aroma/`).
