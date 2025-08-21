// Load FAQs from qa.json and render the UI
async function loadFAQs() {
  try {
    const r = await fetch('qa.json', { cache: 'no-store' });
    if (!r.ok) throw new Error('qa.json missing');
    const j = await r.json();
    return Array.isArray(j.faqs) ? j.faqs : [];
  } catch (e) {
    console.error(e);
    return [
      { q: "Payment policy & terms", a: "—" },
      { q: "How to check notifications?", a: "—" }
    ];
  }
}

const listEl  = document.getElementById('qaList');
const titleEl = document.getElementById('answerTitle');
const bodyEl  = document.getElementById('answerBody');

function typingDots() {
  const wrap = document.createElement('span');
  wrap.className = 'dots';
  wrap.innerHTML = '<span class="dot"></span><span class="dot"></span><span class="dot"></span>';
  return wrap;
}

function showAnswer(item) {
  titleEl.textContent = item.q;
  bodyEl.innerHTML = '';
  bodyEl.appendChild(typingDots());

  setTimeout(() => {
    bodyEl.textContent = item.a || '—';
    bodyEl.scrollTop = 0; // ensure answer starts at top
  }, 350);
}

function renderList(faqs) {
  listEl.innerHTML = '';
  faqs.forEach((item, idx) => {
    const btn = document.createElement('button');
    btn.className = 'qa-btn';
    btn.textContent = item.q;
    btn.addEventListener('click', () => {
      [...listEl.querySelectorAll('.qa-btn.active')].forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      showAnswer(item);
    });
    listEl.appendChild(btn);

    // open first by default
    if (idx === 0) {
      btn.classList.add('active');
      showAnswer(item);
    }
  });
}

loadFAQs().then(renderList);
