// ========= load Q&A =========
async function getJSON(url){
  const r = await fetch(url, {cache:"no-store"});
  if(!r.ok) throw new Error(`Failed to load ${url}`);
  return r.json();
}
const urls = window.DATA_URLS || {};
let QA = [];

(async () => {
  try{
    QA = await getJSON(urls.qa);
    boot();
  }catch(e){
    console.error(e);
    document.getElementById("answer").innerHTML =
      `<div class="text">Couldn't load data. Check <code>qa.json</code>.</div>`;
  }
})();

// ========= DOM =========
const actionsEl = document.getElementById("actions");
const answerEl  = document.getElementById("answer");

// ========= helpers =========
function typingNode(){
  const box = document.createElement("div");
  box.className = "typing";
  box.innerHTML = `<span class="dot"></span><span class="dot"></span><span class="dot"></span>`;
  return box;
}
function showAnswer(q, a){
  answerEl.innerHTML = "";
  const title = document.createElement("h4");
  title.textContent = q;
  const body  = document.createElement("div");
  body.className = "text";
  body.textContent = a && a.trim() ? a : "—";
  answerEl.appendChild(title);
  answerEl.appendChild(body);
}

// ========= mount UI =========
function boot(){
  // build buttons from qa.json (order preserved)
  actionsEl.innerHTML = "";
  QA.forEach((item, i) => {
    const b = document.createElement("button");
    b.className = "action";
    b.textContent = item.q;
    b.dataset.idx = i;
    actionsEl.appendChild(b);
  });

  // click handler with "thinking…" animation
  actionsEl.addEventListener("click", (e)=>{
    const btn = e.target.closest(".action");
    if(!btn) return;
    const idx = +btn.dataset.idx;
    const {q, a} = QA[idx];

    // typing animation for ~500ms
    answerEl.innerHTML = "";
    answerEl.appendChild(typingNode());
    setTimeout(()=>{ showAnswer(q, a); }, 550);
  });

  // auto-select first question
  if(QA.length){
    showAnswer(QA[0].q, QA[0].a);
  }
}
