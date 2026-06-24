/* ============================================================
   DASHBOARD LOGIC — fetch, filter, render (versi profesional)
   ============================================================ */
import { API_URL, CLINIC_NAME } from "../shared/config.js";
import { BRANCHES } from "../shared/questions.js";
import { applyFilters, unitAverages, cleanlinessAvg, csat, nps, complaintRatio }
  from "./metrics.js";

const $ = (s) => document.querySelector(s);
let ALL_ROWS = [];
const fmt = (n) => (!n || isNaN(n) ? "–" : n.toFixed(2));

/* Status berdasarkan rasio nilai/maks */
function statusOf(val, max) {
  if (!val || isNaN(val)) return { txt: "Belum ada data", cls: "st-warn", pill: "pill-warn" };
  const r = val / max;
  if (r >= 0.8) return { txt: "Baik", cls: "st-good", pill: "pill-good" };
  if (r >= 0.6) return { txt: "Cukup", cls: "st-warn", pill: "pill-warn" };
  return { txt: "Perlu perhatian", cls: "st-bad", pill: "pill-bad" };
}

function initFilters() {
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
    $("#status").textContent = "Gagal memuat";
  }
  renderAll();
}

function metricCard(label, val, max, accent) {
  const v = fmt(val);
  const st = statusOf(val, max);
  const pct = val && !isNaN(val) ? Math.min(100, (val / max) * 100) : 0;
  return `<div class="metric" style="--accent:${accent}">
    <div class="m-label">${label}</div>
    <div class="m-figure"><span class="m-value">${v}</span><span class="m-max">/ ${max}</span></div>
    <div class="bar"><div class="bar-fill" style="width:${pct}%"></div></div>
    <div class="m-status ${st.cls}">${st.txt}</div>
  </div>`;
}

function renderAll() {
  const rows = applyFilters(ALL_ROWS, {
    branch: $("#fBranch").value, from: $("#fFrom").value, to: $("#fTo").value,
  });
  $("#status").textContent = `${rows.length} responden`;

  if (!rows.length) {
    $("#topRow").innerHTML = `<div class="hl"><div class="empty">Belum ada data untuk filter ini.</div></div>`;
    $("#cards").innerHTML = "";
    return;
  }

  const u = unitAverages(rows);
  const n = nps(rows);
  const cr = complaintRatio(rows);

  // Highlight: Complain Ratio + NPS
  const crPill = cr <= 10 ? "pill-good" : cr <= 25 ? "pill-warn" : "pill-bad";
  const crTxt  = cr <= 10 ? "Terkendali" : cr <= 25 ? "Perlu dipantau" : "Tinggi";
  const npsPill = n.score >= 50 ? "pill-good" : n.score >= 0 ? "pill-warn" : "pill-bad";
  const npsTxt  = n.score >= 50 ? "Sangat baik" : n.score >= 0 ? "Cukup" : "Rendah";

  $("#topRow").innerHTML = `
    <div class="hl" style="border-top:3px solid var(--warn)">
      <div class="hl-label">Complain Ratio</div>
      <div class="hl-value">${cr.toFixed(1)}%</div>
      <span class="pill ${crPill}">${crTxt}</span>
      <div class="hl-sub">Persentase responden yang menyatakan keluhan</div>
    </div>
    <div class="hl" style="border-top:3px solid var(--brand)">
      <div class="hl-label">Net Promoter Score</div>
      <div class="hl-value">${n.score}</div>
      <span class="pill ${npsPill}">${npsTxt}</span>
      <div class="hl-sub">Promoter ${n.promoter} · Pasif ${n.passive} · Detractor ${n.detractor}</div>
    </div>`;

  $("#cards").innerHTML = [
    metricCard("Front Office",  u.FrontOffice,        5, "var(--brand)"),
    metricCard("Perawat (PRG)", u.Perawat,            5, "var(--teal)"),
    metricCard("Dokter",        u.Dokter,             5, "var(--blue)"),
    metricCard("Kebersihan",    cleanlinessAvg(rows), 4, "var(--good)"),
    metricCard("CSAT Klinik",   csat(rows),           5, "var(--warn)"),
  ].join("");
}

initFilters(); load();
