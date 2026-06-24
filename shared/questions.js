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

/* ============================================================
   9 PERTANYAAN SKM / INM KEMENKES (U1–U9).
   Untuk pelaporan Indikator Nasional Mutu (INM) Kemenkes.
   Tiap opsi bernilai 1–4. JANGAN ubah urutan/jumlah tanpa alasan.
   ============================================================ */
export const SKM_QUESTIONS = [
  { id: "U1", text: "Kesesuaian persyaratan pelayanan dengan jenis pelayanannya",
    options: ["Tidak sesuai", "Kurang sesuai", "Sesuai", "Sangat sesuai"] },
  { id: "U2", text: "Kemudahan prosedur pelayanan di unit ini",
    options: ["Tidak mudah", "Kurang mudah", "Mudah", "Sangat mudah"] },
  { id: "U3", text: "Kecepatan waktu dalam memberikan pelayanan",
    options: ["Tidak cepat", "Kurang cepat", "Cepat", "Sangat cepat"] },
  { id: "U4", text: "Kewajaran biaya/tarif dalam pelayanan",
    options: ["Sangat mahal", "Cukup mahal", "Murah", "Sangat murah"] },
  { id: "U5", text: "Kesesuaian produk pelayanan antara standar dengan hasil yang diberikan",
    options: ["Tidak sesuai", "Kurang sesuai", "Sesuai", "Sangat sesuai"] },
  { id: "U6", text: "Kompetensi/kemampuan petugas dalam pelayanan",
    options: ["Tidak kompeten", "Kurang kompeten", "Kompeten", "Sangat kompeten"] },
  { id: "U7", text: "Perilaku petugas terkait kesopanan dan keramahan",
    options: ["Tidak sopan & ramah", "Kurang sopan & ramah", "Sopan & ramah", "Sangat sopan & ramah"] },
  { id: "U8", text: "Kepastian biaya (ada pungutan tambahan tidak resmi)",
    options: ["Selalu", "Sering", "Kadang-kadang", "Tidak ada"] },
  { id: "U9", text: "Penanganan pengaduan pengguna layanan",
    options: ["Tidak ada", "Ada tetapi tidak berfungsi", "Berfungsi kurang maksimal", "Dikelola dengan baik"] },
];
