/* ============================================================
   FORM QC + SKM LOGIC — multi-step, rating bintang, SKM, submit
   ============================================================ */
import { API_URL } from "../shared/config.js";
import { BRANCHES, RATING_UNITS, STAR_LABELS, NPS_QUESTION,
  NPS_MIN_LABEL, NPS_MAX_LABEL, NPS_MAX, CLEANLINESS_OPTIONS, SKM_QUESTIONS }
  from "../shared/questions.js";

const $ = (s) => document.querySelector(s);
const TOTAL_INPUT_STEPS = 3;            // langkah isian (1,2,3); langkah 4 = terima kasih
const state = { ratings: {}, keluhan: null, kebersihan: null, jk: null };

/* ---------- Render isi dinamis ---------- */
function init() {
  $("#branchCount").textContent = `${BRANCHES.length} Cabang`;

  $("#branch").innerHTML = `<option value="" disabled selected>-- Pilih Cabang Medikids --</option>` +
    BRANCHES.map(b => `<option>${b}</option>`).join("");

  $("#ratings").innerHTML = RATING_UNITS.map(u => `
    <div class="rating-item">
      <div class="rating-name">${u.label}</div>
      <div class="stars" data-key="${u.key}">
        ${[1,2,3,4,5].map(n => `<span class="star" data-val="${n}">★</span>`).join("")}
        <span class="rating-label">Belum dinilai</span>
      </div>
    </div>`).join("");

  $("#npsQ").innerHTML = `${NPS_QUESTION} <span class="req">*</span>`;
  $("#npsMin").textContent = NPS_MIN_LABEL;
  $("#npsMax").textContent = NPS_MAX_LABEL;
  $("#npsScale").innerHTML = Array.from({length: NPS_MAX}, (_, i) => {
    const n = i + 1;
    return `<div class="nps-cell"><input type="radio" name="nps" id="nps${n}" value="${n}"><label for="nps${n}">${n}</label></div>`;
  }).join("");

  $("#cleanRow").innerHTML = CLEANLINESS_OPTIONS.map(o =>
    `<button type="button" class="clean" data-val="${o.value}">${o.icon ? o.icon + " " : ""}${o.value}</button>`
  ).join("");

  // 9 pertanyaan SKM Kemenkes
  $("#skm").innerHTML = SKM_QUESTIONS.map((q, idx) => `
    <div class="skm-q">
      <p class="skm-text"><span class="skm-num">${idx + 1}</span> ${q.text} <span class="req">*</span></p>
      <div class="skm-opts">
        ${q.options.map((opt, i) => `
          <label class="skm-opt">
            <input type="radio" name="${q.id}" value="${i + 1}">
            <span>${opt}</span>
          </label>`).join("")}
      </div>
    </div>`).join("");
}

/* ---------- Rating bintang ---------- */
function bindStars() {
  document.querySelectorAll(".stars").forEach(group => {
    const key = group.dataset.key;
    const stars = group.querySelectorAll(".star");
    const label = group.querySelector(".rating-label");
    stars.forEach(star => {
      star.addEventListener("click", () => {
        const val = +star.dataset.val;
        state.ratings[key] = val;
        stars.forEach(s => s.classList.toggle("on", +s.dataset.val <= val));
        const L = STAR_LABELS[val];
        label.textContent = `${L.text} ${L.emoji}`;
      });
    });
  });
}

/* ---------- Toggle keluhan ---------- */
function bindKeluhan() {
  const ya = $("#keluhanYa"), tidak = $("#keluhanTidak"), txt = $("#keluhanText");
  ya.addEventListener("click", () => {
    state.keluhan = "Ya"; ya.classList.add("active"); tidak.classList.remove("active");
    txt.style.display = "block";
  });
  tidak.addEventListener("click", () => {
    state.keluhan = "Tidak"; tidak.classList.add("active"); ya.classList.remove("active");
    txt.style.display = "none"; txt.value = "";
  });
}

/* ---------- Toggle jenis kelamin ---------- */
function bindJK() {
  document.querySelectorAll(".jk").forEach(btn => {
    btn.addEventListener("click", () => {
      state.jk = btn.dataset.val;
      document.querySelectorAll(".jk").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
    });
  });
}

/* ---------- Toggle kebersihan ---------- */
function bindKebersihan() {
  document.querySelectorAll("#cleanRow .clean").forEach(btn => {
    btn.addEventListener("click", () => {
      state.kebersihan = btn.dataset.val;
      document.querySelectorAll("#cleanRow .clean").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
    });
  });
}

/* ---------- Navigasi step (1–4) ---------- */
function showStep(n) {
  [1,2,3,4].forEach(i => $("#screen" + i).style.display = (i === n ? "block" : "none"));
  const dots = document.querySelectorAll(".step-dot");
  const lines = [$("#line1"), $("#line2"), $("#line3")];
  dots.forEach((d, i) => {
    d.classList.toggle("active", i + 1 === n);
    d.classList.toggle("done", i + 1 < n);
  });
  lines.forEach((l, i) => l && l.classList.toggle("done", i + 1 < n));
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/* ---------- Validasi ---------- */
function validateStep1() {
  if (!$("#nama").value.trim()) return alert("Mohon isi nama lengkap pasien."), false;
  if (!$("#hp").value.trim())   return alert("Mohon isi nomor handphone."), false;
  if (!$("#branch").value)      return alert("Mohon pilih cabang klinik."), false;
  if (!state.keluhan)           return alert("Mohon pilih apakah ada keluhan."), false;
  return true;
}
function validateStep2() {
  if (!document.querySelector('input[name="nps"]:checked'))
    return alert("Mohon pilih skor rekomendasi (NPS)."), false;
  if (!state.kebersihan) return alert("Mohon pilih penilaian kebersihan klinik."), false;
  return true;
}
function validateSKM() {
  for (const q of SKM_QUESTIONS) {
    if (!document.querySelector(`input[name="${q.id}"]:checked`)) {
      alert(`Mohon jawab semua pertanyaan SKM (pertanyaan no. ${SKM_QUESTIONS.indexOf(q) + 1} belum diisi).`);
      return false;
    }
  }
  return true;
}

/* ---------- Kumpulkan & submit ---------- */
function collect() {
  const data = {
    nama: $("#nama").value.trim(),
    hp: $("#hp").value.trim(),
    branch: $("#branch").value,
    umur: $("#umur").value.trim(),
    jenisKelamin: state.jk ?? "",
    keluhan: state.keluhan,
    keluhanText: $("#keluhanText").value.trim(),
    Dokter: state.ratings.Dokter ?? "",
    Perawat: state.ratings.Perawat ?? "",
    FrontOffice: state.ratings.FrontOffice ?? "",
    nps: (document.querySelector('input[name="nps"]:checked') || {}).value ?? "",
    kebersihan: state.kebersihan ?? "",
    saran: $("#saran").value.trim(),
  };
  SKM_QUESTIONS.forEach(q => {
    data[q.id] = (document.querySelector(`input[name="${q.id}"]:checked`) || {}).value ?? "";
  });
  return data;
}

async function submit() {
  if (!validateSKM()) return;
  const btn = $("#submitBtn");
  btn.disabled = true; btn.textContent = "Mengirim…";
  try {
    await fetch(API_URL, {
      method: "POST", mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(collect()),
    });
    showStep(4);
  } catch (e) {
    alert("Gagal mengirim. Periksa koneksi lalu coba lagi.");
  }
  btn.disabled = false; btn.textContent = "✈ Kirim Penilaian";
}

function reset() { location.reload(); }

/* ---------- Bind ---------- */
init(); bindStars(); bindKeluhan(); bindJK(); bindKebersihan();
$("#toStep2").addEventListener("click", () => { if (validateStep1()) showStep(2); });
$("#toStep3").addEventListener("click", () => { if (validateStep2()) showStep(3); });
$("#backTo1").addEventListener("click", () => showStep(1));
$("#backTo2").addEventListener("click", () => showStep(2));
$("#submitBtn").addEventListener("click", submit);
$("#resetBtn").addEventListener("click", reset);
