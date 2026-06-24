/* ============================================================
   KONFIGURASI GLOBAL — edit URL & pengaturan di sini.
   ============================================================ */

/* URL Web App Google Apps Script (setelah Deploy > New deployment > Web app).
   Tempel URL /exec di sini. Form & dashboard sama-sama membacanya. */
export const API_URL =
  "https://script.google.com/macros/s/GANTI_DENGAN_DEPLOYMENT_ID_ANDA/exec";

/* Nama klinik untuk judul */
export const CLINIC_NAME = "MHDC — Medikids & HDC Clinic";

/* Ambang batas metrik (boleh diubah sesuai kebijakan internal) */
export const THRESHOLDS = {
  satisfactionMax: 4,      // skala kepuasan unit/SKM
  npsPromoterMin: 9,       // skor >= ini = promoter
  npsDetractorMax: 6,      // skor <= ini = detractor
  complaintScoreMax: 2,    // jawaban skala <= ini dihitung sebagai komplain
};
