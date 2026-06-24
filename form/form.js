/* ============================================================
   FORM QC LOGIC — multi-step, rating bintang, submit
   ============================================================ */
import { API_URL } from "../shared/config.js";
import { BRANCHES, RATING_UNITS, STAR_LABELS, NPS_QUESTION,
  NPS_MIN_LABEL, NPS_MAX_LABEL, NPS_MAX, CLEANLINESS_OPTIONS }
  from "../shared/questions.js";

const $ = (s) => document.querySelector(s);
const state = { ratings: {}, keluhan: null, kebersihan: null };

/* ---------- Render isi dinamis ---------- */
function init() {
  // jumlah cabang di badge
  $("#branchCount").textContent = `${BRANCHES.length} Cabang`;

  // dropdown cabang
  $("#branch").innerHTML = `<option value="" disabled selected>-- Pilih Cabang Medikids --</option>` +
    BRANCHES.map(b => `<option>${b}</option>`).join("");

  // rating bintang
  $("#ratings").innerHTML = RATING_UNITS.map(u => `
    <div class="rating-item">
      <div class="rating-name">${u.label}</div>
      <div class="stars" data-key="${u.key}">
        ${[1,2,3,4,5].map(n => `<span class="star" data-val="${n}">★</span>`).join("")}
        <span class="rating-label">Belum dinilai</span>
      </div>
    </div>`).join("");

  // NPS
  $("#npsQ").innerHTML = `${NPS_QUESTION} <span class="req">*</span>`;
  $("#npsMin").textContent = NPS_MIN_LABEL;
  $("#npsMax").textContent = NPS_MAX_LABEL;
  $("#npsScale").innerHTML = Array.from({length: NPS_MAX}, (_, i) => {
    const n = i + 1;
    return `<div class="nps-cell"><input type="radio" name="nps" id="nps${n}" value="${n}"><label for="nps${n}">${n}</label></div>`;
  }).join("");

  // kebersihan
  $("#cleanRow").innerHTML = CLEANLINESS_OPTIONS.map(o =>
    `<button type="button" class="clean" data-val="${o.value}">${o.icon ? o.icon + " " : ""}${o.value}</button>`
  ).join("");
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

/* ---------- Navigasi step ---------- */
function showStep(n) {
  [1,2,3].forEach(i => $("#screen" + i).style.display = (i === n ? "block" : "none"));
  const dots = document.querySelectorAll(".step-dot");
  const lines = [$("#line1"), $("#line2")];
  dots.forEach((d, i) => {
    d.classList.toggle("active", i + 1 === n);
    d.classList.toggle("done", i + 1 < n);
  });
  lines.forEach((l, i) => l.classList.toggle("done", i + 1 < n));
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/* ---------- Validasi step 1 ---------- */
function validateStep1() {
  if (!$("#nama").value.trim()) return alert("Mohon isi nama lengkap pasien."), false;
  if (!$("#hp").value.trim())   return alert("Mohon isi nomor handphone."), false;
  if (!$("#branch").value)      return alert("Mohon pilih cabang klinik."), false;
  if (!state.keluhan)           return alert("Mohon pilih apakah ada keluhan."), false;
  return true;
}

/* ---------- Kumpulkan & submit ---------- */
function collect() {
  return {
    nama: $("#nama").value.trim(),
    hp: $("#hp").value.trim(),
    branch: $("#branch").value,
    keluhan: state.keluhan,
    keluhanText: $("#keluhanText").value.trim(),
    Dokter: state.ratings.Dokter ?? "",
    Perawat: state.ratings.Perawat ?? "",
    FrontOffice: state.ratings.FrontOffice ?? "",
    nps: (document.querySelector('input[name="nps"]:checked') || {}).value ?? "",
    kebersihan: state.kebersihan ?? "",
    saran: $("#saran").value.trim(),
  };
}

async function submit() {
  if (!state.kebersihan) return alert("Mohon pilih penilaian kebersihan klinik.");
  const btn = $("#submitBtn");
  btn.disabled = true; btn.textContent = "Mengirim…";
  try {
    await fetch(API_URL, {
      method: "POST", mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(collect()),
    });
    showStep(3);
  } catch (e) {
    alert("Gagal mengirim. Periksa koneksi lalu coba lagi.");
  }
  btn.disabled = false; btn.textContent = "✈ Kirim Penilaian";
}

/* ---------- Reset ---------- */
function reset() { location.reload(); }

/* ---------- Bind tombol ---------- */
init(); bindStars(); bindKeluhan(); bindKebersihan();
$("#toStep2").addEventListener("click", () => { if (validateStep1()) showStep(2); });
$("#backTo1").addEventListener("click", () => showStep(1));
$("#submitBtn").addEventListener("click", submit);
$("#resetBtn").addEventListener("click", reset);
