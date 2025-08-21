// ---------- Q&A from your document ----------
const QA = [
  {
    q: "How to get registered on Amazon?",
    a: [
      "Go to sellercentral.amazon.in → Sign up.",
      "Keep PAN, GSTIN, bank account, phone/email, pickup address, and brand docs ready.",
      "Complete business details, tax info, deposit method, and verify OTP.",
      "After approval, add products and shipping settings.",
      "Or: Use the official registration link."
    ]
  },
  {
    q: "How to raise seller support case?",
    a: [
      "Seller Central → Help (top right) → Get support → Selling on Amazon → pick topic → Contact us.",
      "Choose email/chat/call, describe the issue, attach screenshots, submit.",
      "Track under Case log."
    ]
  },
  {
    q: "How to login?",
    a: [
      "Visit sellercentral.amazon.in → Sign in with your registered email/phone and password.",
      "If 2FA/SSO enabled, enter OTP.",
      "If needed, use Forgot password and ensure the correct marketplace (IN)."
    ]
  },
  {
    q: "How to update inventory & pricing?",
    a: [
      "Inventory → Manage All Inventory → search SKU → Edit → Offer tab.",
      "Update Your price and Quantity, then Save.",
      "Bulk: Inventory → Add Products via Upload → Price/Inventory file → upload.",
      "Or integrate via API to push price/inventory automatically."
    ]
  },
  {
    q: "How to check orders?",
    a: [
      "Orders → Manage Orders → view Pending / Unshipped / Cancelled.",
      "Click an Order ID to view details, print invoice/packing slip, and confirm dispatch."
    ]
  },
  {
    q: "Where to see payments?",
    a: [
      "Reports → Payments → Statement view for settlements; All statements for history.",
      "Transaction view for per-order fees/credits.",
      "Download reports for reconciliation."
    ]
  },
  {
    q: "Buyer–Seller Messages",
    a: [
      "Performance → Customer Messages (or Messages icon).",
      "Reply within SLA; avoid sharing restricted contact info.",
      "Attach docs/screenshots if needed."
    ]
  },
  {
    q: "Shipping template configuration",
    a: [
      "Settings → Shipping → Create/Edit template.",
      "Set service levels, regions/pincodes, handling time, and fees (if applicable).",
      "Assign SKUs via Manage Inventory → Edit offer → choose template."
    ]
  },
  {
    q: "How to check notifications?",
    a: [
      "Settings → Notification Preferences.",
      "Enable email/SMS/app alerts for orders, returns, performance.",
      "In-app: Bell icon (top right)."
    ]
  },

  // Present in doc but no details provided — we still show them with a placeholder
  { q: "How to deliver vehicle to customer?", a: ["Details not provided in the doc."] },
  { q: "Which app needs to be downloaded for scanning?", a: ["Details not provided in the doc."] },
  { q: "Cancellation Charges", a: ["Details not provided in the doc."] },
  { q: "Payment policy & terms", a: ["Details not provided in the doc."] },
  { q: "Escalation Matrix", a: ["Details not provided in the doc."] },
  { q: "How to check Amazon orders", a: ["Use Orders → Manage Orders as noted above."] },
  { q: "Amazon Fee", a: ["Details not provided in the doc."] }
];

// ---------- DOM ----------
const chips = document.getElementById("chips");
const answerBox = document.getElementById("answerBox");

// Build chips
for (const { q } of QA) {
  const btn = document.createElement("button");
  btn.className = "chip";
  btn.type = "button";
  btn.textContent = q;
  btn.addEventListener("click", () => showAnswer(q));
  chips.appendChild(btn);
}

function showAnswer(question){
  // clear and show “thinking…”
  answerBox.innerHTML = `
    <h2>${escapeHtml(question)}</h2>
    <div class="typing" aria-live="polite">
      <span class="dot"></span><span class="dot"></span><span class="dot"></span>
    </div>
  `;

  // simulate brief thinking
  setTimeout(()=>{
    const item = QA.find(x => x.q === question);
    const html = `
      <h2>${escapeHtml(item.q)}</h2>
      ${toHtml(item.a)}
    `;
    answerBox.innerHTML = html;
  }, 550 + Math.random()*350);
}

function toHtml(lines){
  if (!lines || !lines.length) return "<p>No answer available.</p>";
  if (lines.length === 1) return `<p>${escapeHtml(lines[0])}</p>`;
  return `<ul>${lines.map(x=>`<li>${escapeHtml(x)}</li>`).join("")}</ul>`;
}

function escapeHtml(s){
  return s.replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
}

// Show a default first answer if you want:
// showAnswer(QA[0].q);
