/* ============================================================
   METRICS — semua rumus dashboard. Murni fungsi, mudah diuji.
   ============================================================ */
import { SKM_QUESTIONS, UNIT_QUESTIONS } from "../shared/questions.js";
import { THRESHOLDS } from "../shared/config.js";

const num = (v) => (v === "" || v == null ? null : Number(v));
const avg = (arr) => (arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0);

/* Rata-rata satu kolom (skala 1–4), abaikan kosong */
export function avgField(rows, key) {
  const vals = rows.map(r => num(r[key])).filter(v => v != null && !isNaN(v));
  return avg(vals);
}

/* Rata-rata kepuasan per unit FO/PRG/Dokter/Kebersihan */
export function unitAverages(rows) {
  const out = {};
  UNIT_QUESTIONS.forEach(u => (out[u.key] = avgField(rows, u.key)));
  return out;
}

/* CSAT klinik = rata-rata seluruh 9 pertanyaan SKM (skala 1–4) */
export function csat(rows) {
  const perRow = rows.map(r => {
    const vals = SKM_QUESTIONS.map(q => num(r[q.id])).filter(v => v != null && !isNaN(v));
    return vals.length ? avg(vals) : null;
  }).filter(v => v != null);
  return avg(perRow);
}

/* NPS = %promoter − %detractor (skala 0–10) */
export function nps(rows) {
  const vals = rows.map(r => num(r.nps)).filter(v => v != null && !isNaN(v));
  if (!vals.length) return { score: 0, promoter: 0, passive: 0, detractor: 0, n: 0 };
  const prom = vals.filter(v => v >= THRESHOLDS.npsPromoterMin).length;
  const det  = vals.filter(v => v <= THRESHOLDS.npsDetractorMax).length;
  const pass = vals.length - prom - det;
  return {
    score: Math.round((prom - det) / vals.length * 100),
    promoter: prom, passive: pass, detractor: det, n: vals.length,
  };
}

/* Complain ratio = % responden dgn minimal satu jawaban SKM <= ambang */
export function complaintRatio(rows) {
  if (!rows.length) return 0;
  const complaints = rows.filter(r =>
    SKM_QUESTIONS.some(q => {
      const v = num(r[q.id]);
      return v != null && v <= THRESHOLDS.complaintScoreMax;
    })
  ).length;
  return (complaints / rows.length) * 100;
}

/* Filter berdasarkan cabang & rentang tanggal */
export function applyFilters(rows, { branch, from, to } = {}) {
  return rows.filter(r => {
    if (branch && branch !== "ALL" && r.branch !== branch) return false;
    const t = r.timestamp ? new Date(r.timestamp) : null;
    if (from && t && t < new Date(from)) return false;
    if (to && t && t > new Date(to + "T23:59:59")) return false;
    return true;
  });
}
