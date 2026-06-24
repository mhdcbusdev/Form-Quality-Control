/* ============================================================
   FORM LOGIC — render dari config & submit ke backend
   ============================================================ */
import { API_URL, CLINIC_NAME } from "../shared/config.js";
import { BRANCHES, SKM_QUESTIONS, UNIT_QUESTIONS, UNIT_SCALE, NPS_QUESTION }
  from "../shared/questions.js";

const $ = (sel) => document.querySelector(sel);

/* ---------- Bangun pilihan skala (radio) ---------- */
function scaleGroup(name, options) {
  return `<div class="scale" role="radiogroup" aria-label="${name}">` +
    options.map((opt, i) => `
      <label class="opt">
        <input type="radio" name="${name}" value="${i + 1}" required>
        <span>${opt}</span>
      </label>`).join("") +
  `</div>`;
}

/* ---------- Render seluruh form ---------- */
function render() {
  $("#clinicName").textContent = CLINIC_NAME;

  // Cabang
  $("#branch").innerHTML = `<option value="" disabled selected>— Pilih cabang —</option>` +
    BRANCHES.map(b => `<option>${b}</option>`).join("");

  // SKM 9 pertanyaan
  $("#skm").innerHTML = SKM_QUESTIONS.map((q, idx) => `
    <div class="q card">
      <p class="q-text"><span class="q-num">${idx + 1}</span> ${q.text}</p>
      ${scaleGroup(q.id, q.options)}
    </div>`).join("");

  // Penilaian per unit
  $("#units").innerHTML = UNIT_QUESTIONS.map(u => `
    <div class="q card">
      <p class="q-text">${u.text}</p>
      ${scaleGroup(u.key, UNIT_SCALE)}
    </div>`).join("");

  // NPS 0–10
  $("#npsQ").textContent = NPS_QUESTION;
  $("#npsScale").innerHTML = Array.from({ length: 11 }, (_, n) => `
    <label class="nps-cell">
      <input type="radio" name="nps" value="${n}" required>
      <span>${n}</span>
    </label>`).join("");
}

/* ---------- Kumpulkan jawaban ---------- */
function collect() {
  const form = $("#surveyForm");
  const fd = new FormData(form);
  const payload = {
    branch: fd.get("branch"),
    nama: fd.get("nama"),
    umur: fd.get("umur"),
    jenisKelamin: fd.get("jenisKelamin"),
    saran: fd.get("saran"),
    nps: fd.get("nps"),
  };
  SKM_QUESTIONS.forEach(q => (payload[q.id] = fd.get(q.id)));
  UNIT_QUESTIONS.forEach(u => (payload[u.key] = fd.get(u.key)));
  return payload;
}

/* ---------- Submit ---------- */
async function submit(ev) {
  ev.preventDefault();
  const btn = $("#submitBtn");
  btn.disabled = true; btn.textContent = "Mengirim…";
  try {
    await fetch(API_URL, {
      method: "POST",
      mode: "no-cors",                 // Apps Script web app
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(collect()),
    });
    $("#surveyForm").style.display = "none";
    $("#thanks").style.display = "block";
    window.scrollTo({ top: 0, behavior: "smooth" });
  } catch (err) {
    btn.disabled = false; btn.textContent = "Kirim jawaban";
    alert("Gagal mengirim. Periksa koneksi lalu coba lagi.");
  }
}

render();
$("#surveyForm").addEventListener("submit", submit);
