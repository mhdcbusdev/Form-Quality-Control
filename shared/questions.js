/* ============================================================
   KONFIGURASI PERTANYAAN  —  edit di sini saja.
   Semua kode lain membaca file ini.
   ============================================================ */

/* Daftar cabang Medikids — sesuaikan dengan cabang Anda */
export const BRANCHES = [
  "Medikids Bintaro",
  "Medikids BSD",
  "Medikids Kemang",
  "Medikids Cikarang",
  "Medikids Malang",
  // tambahkan cabang lain di sini
];

/* Rating bintang per unit (1–5) → mengisi kartu dashboard.
   key dipakai sebagai nama kolom di Google Sheet. */
export const RATING_UNITS = [
  { key: "Dokter",     label: "Pelayanan <b>Dokter</b>" },
  { key: "Perawat",    label: "Pelayanan <b>Perawat</b>" },
  { key: "FrontOffice",label: "Pelayanan <b>Front Office</b>" },
];

/* Label untuk tiap jumlah bintang (1–5) + emoji */
export const STAR_LABELS = {
  1: { text: "Sangat Tidak Puas", emoji: "😟" },
  2: { text: "Tidak Puas",        emoji: "🙁" },
  3: { text: "Cukup Puas",        emoji: "😐" },
  4: { text: "Puas",              emoji: "🙂" },
  5: { text: "Sangat Puas",       emoji: "😄" },
};

/* NPS — skala rekomendasi 1–5 (sesuai form QC) */
export const NPS_QUESTION =
  "Seberapa besar kemungkinan anda merekomendasikan klinik kami?";
export const NPS_MIN_LABEL = "1 = Sangat tidak mungkin";
export const NPS_MAX_LABEL = "5 = Sangat mungkin";
export const NPS_MAX = 5;

/* Penilaian kebersihan (pilihan tunggal) */
export const CLEANLINESS_OPTIONS = [
  { value: "Sangat Bersih",  icon: "" },
  { value: "Bersih",         icon: "✓" },
  { value: "Cukup Bersih",   icon: "−" },
  { value: "Perlu Perbaikan",icon: "⚠" },
];
