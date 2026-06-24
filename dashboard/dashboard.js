/* ============================================================
   DASHBOARD LOGIC — fetch, filter, render
   ============================================================ */
import { API_URL, CLINIC_NAME } from "../shared/config.js";
import { BRANCHES } from "../shared/questions.js";
import { applyFilters, unitAverages, cleanlinessAvg, csat, nps, complaintRatio }
  from "./metrics.js";

const $ = (s) => document.querySelector(s);
let ALL_ROWS = [];
const fmt = (n) => (!n || isNaN(n) ? "–" : n.toFixed(2));

function initFilters() {
  $("#clinicName").textContent = CLINIC_NAME;
  $("#fBranch").innerHTML = `<option value="ALL">Semua cabang</option>` +
    BRANCHES.map(b => `<option>${b}</option>`).join("");
  ["#fBranch", "#fFrom", "#fTo"].forEach(s => $(s).addEventListener("change", renderAll));
}

async function load() {
  try {
    const res = await fetch(`${API_URL}?action=data`);
    const out = await res.json();
    ALL_ROWS = out.rows || [];
  } catch (e) {
    ALL_ROWS = [];
    $("#status").textContent = "Gagal memuat data — periksa API_URL di config.js.";
  }
  renderAll();
}

function card(label, value, opts = {}) {
  const { max, accent = "var(--teal)", suffix = "" } = opts;
  const bar = max
    ? `<div class="bar"><div class="bar-fill" style="width:${Math.min(100,(parseFloat(value)/max)*100||0)}%;background:${accent}"></div></div>`
    : "";
  return `<div class="metric card" style="--accent:${accent}">
      <div class="m-label">${label}</div>
      <div class="m-value">${value}${suffix}${max ? `<span class="m-max">/ ${max}</span>` : ""}</div>
      ${bar}</div>`;
}

function renderAll() {
  const rows = applyFilters(ALL_ROWS, {
    branch: $("#fBranch").value, from: $("#fFrom").value, to: $("#fTo").value,
  });
  $("#status").textContent = `${rows.length} responden`;

  const u = unitAverages(rows);
  const n = nps(rows);

  $("#complaint").innerHTML = card("Complain Ratio", complaintRatio(rows).toFixed(1),
    { suffix: "%", accent: "var(--amber)" });

  $("#cards").innerHTML = [
    card("Rata-rata Kepuasan Front Office", fmt(u.FrontOffice), { max: 5, accent: "var(--brand)" }),
    card("Rata-rata Kepuasan Perawat",      fmt(u.Perawat),     { max: 5, accent: "var(--teal)" }),
    card("Rata-rata Kepuasan Dokter",       fmt(u.Dokter),      { max: 5, accent: "#6b8a99" }),
    card("Rata-rata Kebersihan",            fmt(cleanlinessAvg(rows)), { max: 4, accent: "var(--good)" }),
    card("CSAT Klinik",                     fmt(csat(rows)),    { max: 5, accent: "var(--amber)" }),
    card("Net Promoter Score",              n.score,            { accent: "var(--bad)" }),
  ].join("");

  $("#npsDetail").innerHTML = n.n
    ? `Promoter ${n.promoter} · Pasif ${n.passive} · Detractor ${n.detractor} (n=${n.n})`
    : "Belum ada data NPS";
}

initFilters(); load();
