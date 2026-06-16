
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => nav.classList.toggle("active"));
}

const searchOpenButtons = document.querySelectorAll("[data-search-open]");
const searchModal = document.querySelector(".search-modal");
const searchClose = document.querySelector("[data-search-close]");
const searchInput = document.querySelector(".search-input");
const searchResults = document.querySelector(".search-results");

const pages = [
  { title:"Stents", type:"Produto", url:"produtos/stents.html", keywords:["stent","stents","coronario","coronário"] },
  { title:"Balões", type:"Produto", url:"produtos/baloes.html", keywords:["balao","balão","baloes","balões"] },
  { title:"Balão farmacológico", type:"Produto", url:"produtos/balao-farmacologico.html", keywords:["farmacologico","farmacológico","balao farmacologico","balão farmacológico"] },
  { title:"TAVI", type:"Produto", url:"produtos/tavi.html", keywords:["tavi","valvula","válvula","aortica","aórtica"] },
  { title:"Oclusores", type:"Produto", url:"produtos/oclusores.html", keywords:["oclusor","oclusores","fechamento"] },
  { title:"Aplicações cardiovasculares", type:"Página", url:"aplicacoes.html", keywords:["aplicacoes","aplicações","hemodinamica","hemodinâmica","intervencao","intervenção"] },
  { title:"Sobre nós", type:"Página", url:"sobre-nos.html", keywords:["sobre","historia","história","equipe","missao","missão"] },
  { title:"Contato", type:"Página", url:"contato.html", keywords:["contato","email","whatsapp","instagram"] }
];

function openSearch(){
  if(!searchModal) return;
  searchModal.classList.add("active");
  setTimeout(() => searchInput?.focus(), 50);
}
function closeSearch(){
  searchModal?.classList.remove("active");
}
searchOpenButtons.forEach(btn => btn.addEventListener("click", openSearch));
searchClose?.addEventListener("click", closeSearch);
searchModal?.addEventListener("click", (e) => {
  if(e.target === searchModal) closeSearch();
});
document.addEventListener("keydown", (e) => {
  if(e.key === "Escape") closeSearch();
});

function renderResults(query){
  if(!searchResults) return;
  const q = query.trim().toLowerCase();
  if(!q){
    searchResults.innerHTML = "";
    return;
  }
  const found = pages.filter(p => 
    p.title.toLowerCase().includes(q) || p.keywords.some(k => k.includes(q) || q.includes(k))
  );
  searchResults.innerHTML = found.length ? found.map(p => `
    <a class="search-result" href="${getRelativeUrl(p.url)}">
      <strong>${p.title}</strong>
      <span>${p.type} • Ver página</span>
    </a>
  `).join("") : `<div class="search-result"><strong>Nenhum resultado encontrado</strong><span>Tente buscar por stents, balões, TAVI ou oclusores.</span></div>`;
}
function getRelativeUrl(url){
  const inProductFolder = location.pathname.includes("/produtos/");
  if(inProductFolder && !url.startsWith("produtos/")) return "../" + url;
  if(inProductFolder && url.startsWith("produtos/")) return url.replace("produtos/","");
  return url;
}
searchInput?.addEventListener("input", e => renderResults(e.target.value));
