/* ============================================================
   KONFIGURASI GLOBAL — edit URL & pengaturan di sini.
   ============================================================ */

/* URL Web App Google Apps Script (setelah Deploy > New deployment > Web app).
   Tempel URL /exec di sini. Form & dashboard sama-sama membacanya. */
export const API_URL =
  "https://script.google.com/macros/s/AKfycbzSS_C_kU4MZSK6bQEEL4QWmNaFnwEGRNsF0qtViItZWkDlOecl3TtoGZ0MMjIdkKigmg/exec";

/* Nama klinik untuk judul */
export const CLINIC_NAME = "MHDC — Medikids & HDC Clinic";

/* Ambang batas metrik (skala rating & NPS = 1–5) */
export const THRESHOLDS = {
  satisfactionMax: 5,      // skala rating bintang
  npsPromoterMin: 5,       // skor 5 = promoter
  npsDetractorMax: 3,      // skor <= 3 = detractor
  complaintScoreMax: 2,    // rating bintang <= ini = komplain
};
