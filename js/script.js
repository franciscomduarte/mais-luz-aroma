/* ============================================================
   MAIS LUZ & AROMA — script principal
   ============================================================ */

/* ⚠️ CONFIGURAÇÃO — edite apenas aqui */
const CONFIG = {
  whatsapp: "5564923233​99", // ⚠️ SUBSTITUIR: 55 + DDD + número
  mensagemPadrao: "Olá! Vim pelo site da Mais Luz & Aroma e gostaria de um orçamento. ✨",
};

/* ---------- Links de WhatsApp ----------
   Qualquer <a class="wa-link"> recebe o link wa.me automaticamente.
   Use data-wa-msg="..." para uma mensagem personalizada. */
document.querySelectorAll(".wa-link").forEach((link) => {
  const msg = link.dataset.waMsg || CONFIG.mensagemPadrao;
  link.href = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
});

/* ---------- Ano do rodapé ---------- */
const ano = document.getElementById("ano");
if (ano) ano.textContent = new Date().getFullYear();

/* ---------- Header: fundo sólido ao rolar ---------- */
const header = document.getElementById("header");
const atualizaHeader = () => header.classList.toggle("solido", window.scrollY > 24);
atualizaHeader();
window.addEventListener("scroll", atualizaHeader, { passive: true });

/* ---------- Menu mobile ---------- */
const menuBtn = document.getElementById("menuBtn");
const navMobile = document.getElementById("navMobile");
menuBtn.addEventListener("click", () => {
  const aberto = navMobile.classList.toggle("aberto");
  menuBtn.setAttribute("aria-expanded", String(aberto));
  menuBtn.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
});
navMobile.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    navMobile.classList.remove("aberto");
    menuBtn.setAttribute("aria-expanded", "false");
  })
);

/* ---------- Scroll reveal (IntersectionObserver) ---------- */
const reduzMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const reveals = document.querySelectorAll(".reveal");
if (reduzMovimento || !("IntersectionObserver" in window)) {
  reveals.forEach((el) => el.classList.add("visivel"));
} else {
  const io = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visivel");
          io.unobserve(e.target);
        }
      });
    },
    { rootMargin: "-60px" }
  );
  reveals.forEach((el) => io.observe(el));
}

/* ---------- Carousel de depoimentos ---------- */
const carousel = document.getElementById("carousel");
const dotsWrap = document.getElementById("dots");
if (carousel && dotsWrap) {
  const itens = [...carousel.children];
  let ativo = 0;

  itens.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.setAttribute("role", "tab");
    dot.setAttribute("aria-label", `Depoimento ${i + 1}`);
    dot.addEventListener("click", () => irPara(i));
    dotsWrap.appendChild(dot);
  });
  const dots = [...dotsWrap.children];

  const marca = (i) => {
    ativo = i;
    dots.forEach((d, j) => {
      d.classList.toggle("ativo", j === i);
      d.setAttribute("aria-selected", String(j === i));
    });
  };

  const irPara = (i) => {
    const item = itens[i];
    const targetLeft = item.offsetLeft - (carousel.offsetWidth - item.offsetWidth) / 2;
    carousel.scrollTo({ left: Math.max(0, targetLeft), behavior: reduzMovimento ? "auto" : "smooth" });
    marca(i);
  };

  /* sincroniza dots quando o usuário arrasta manualmente */
  carousel.addEventListener(
    "scroll",
    () => {
      const centro = carousel.scrollLeft + carousel.clientWidth / 2;
      let maisProximo = 0;
      let menorDist = Infinity;
      itens.forEach((el, i) => {
        const dist = Math.abs(el.offsetLeft + el.clientWidth / 2 - centro);
        if (dist < menorDist) { menorDist = dist; maisProximo = i; }
      });
      if (maisProximo !== ativo) marca(maisProximo);
    },
    { passive: true }
  );

  /* avanço automático a cada 5s (pausa com a aba oculta) */
  setInterval(() => {
    if (document.hidden) return;
    irPara((ativo + 1) % itens.length);
  }, 5000);

  marca(0);
}

/* ---------- Lightbox da galeria ---------- */
const galeria = document.getElementById("galeria");
const lightbox = document.getElementById("lightbox");
if (galeria && lightbox) {
  const itens = [...galeria.querySelectorAll(".masonry-item")];
  const lbImg = document.getElementById("lbImg");
  const lbLegenda = document.getElementById("lbLegenda");
  let atual = 0;

  const abrir = (i) => {
    atual = i;
    const img = itens[i].querySelector("img");
    lbImg.src = img.src;
    lbImg.alt = img.alt;
    lbLegenda.textContent = itens[i].dataset.alt || img.alt;
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
  };

  const fechar = () => {
    lightbox.hidden = true;
    document.body.style.overflow = "";
  };

  const navegar = (dir) => abrir((atual + dir + itens.length) % itens.length);

  itens.forEach((btn, i) => btn.addEventListener("click", () => abrir(i)));
  document.getElementById("lbFechar").addEventListener("click", fechar);
  document.getElementById("lbAnt").addEventListener("click", (e) => { e.stopPropagation(); navegar(-1); });
  document.getElementById("lbProx").addEventListener("click", (e) => { e.stopPropagation(); navegar(1); });
  lightbox.addEventListener("click", (e) => { if (e.target === lightbox) fechar(); });

  document.addEventListener("keydown", (e) => {
    if (lightbox.hidden) return;
    if (e.key === "Escape") fechar();
    if (e.key === "ArrowRight") navegar(1);
    if (e.key === "ArrowLeft") navegar(-1);
  });
}
