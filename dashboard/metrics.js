/* ============================================================
   METRICS — semua rumus dashboard. Murni fungsi.
   Skala rating & NPS = 1–5 (sesuai form QC).
   ============================================================ */
import { THRESHOLDS } from "../shared/config.js";

const num = (v) => (v === "" || v == null ? null : Number(v));
const avg = (a) => (a.length ? a.reduce((x, y) => x + y, 0) / a.length : 0);

export function avgField(rows, key) {
  const vals = rows.map(r => num(r[key])).filter(v => v != null && !isNaN(v) && v > 0);
  return avg(vals);
}

/* Rata-rata kepuasan per unit: Dokter, Perawat, FrontOffice (1–5) */
export function unitAverages(rows) {
  return {
    Dokter:      avgField(rows, "Dokter"),
    Perawat:     avgField(rows, "Perawat"),
    FrontOffice: avgField(rows, "FrontOffice"),
  };
}

/* Skor kebersihan: konversi kategori → angka 1–4, lalu rata-rata */
const CLEAN_SCORE = { "Sangat Bersih": 4, "Bersih": 3, "Cukup Bersih": 2, "Perlu Perbaikan": 1 };
export function cleanlinessAvg(rows) {
  const vals = rows.map(r => CLEAN_SCORE[r.kebersihan]).filter(v => v != null);
  return avg(vals);
}

/* CSAT klinik = rata-rata semua rating bintang (Dokter+Perawat+FO), skala 1–5 */
export function csat(rows) {
  const per = rows.map(r => {
    const vals = ["Dokter","Perawat","FrontOffice"].map(k => num(r[k])).filter(v => v != null && v > 0);
    return vals.length ? avg(vals) : null;
  }).filter(v => v != null);
  return avg(per);
}

/* NPS pada skala 1–5: promoter = 5, detractor = 1–3, passive = 4 */
export function nps(rows) {
  const vals = rows.map(r => num(r.nps)).filter(v => v != null && v > 0);
  if (!vals.length) return { score: 0, promoter: 0, passive: 0, detractor: 0, n: 0 };
  const prom = vals.filter(v => v >= THRESHOLDS.npsPromoterMin).length;
  const det  = vals.filter(v => v <= THRESHOLDS.npsDetractorMax).length;
  const pass = vals.length - prom - det;
  return { score: Math.round((prom - det) / vals.length * 100),
    promoter: prom, passive: pass, detractor: det, n: vals.length };
}

/* Complain ratio = % responden yang menjawab "Ya" ada keluhan
   ATAU memberi rating bintang <= ambang */
export function complaintRatio(rows) {
  if (!rows.length) return 0;
  const c = rows.filter(r => {
    if (String(r.keluhan).toLowerCase() === "ya") return true;
    return ["Dokter","Perawat","FrontOffice"].some(k => {
      const v = num(r[k]); return v != null && v > 0 && v <= THRESHOLDS.complaintScoreMax;
    });
  }).length;
  return (c / rows.length) * 100;
}

export function applyFilters(rows, { branch, from, to } = {}) {
  return rows.filter(r => {
    if (branch && branch !== "ALL" && r.branch !== branch) return false;
    const t = r.timestamp ? new Date(r.timestamp) : null;
    if (from && t && t < new Date(from)) return false;
    if (to && t && t > new Date(to + "T23:59:59")) return false;
    return true;
  });
}
