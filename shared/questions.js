/* ============================================================
   KONFIGURASI PERTANYAAN  —  edit di sini saja.
   Semua kode lain membaca file ini, jadi menambah/mengubah
   pertanyaan tidak perlu menyentuh form.js / dashboard.
   ============================================================ */

/* Daftar cabang MHDC — sesuaikan dengan cabang Anda */
export const BRANCHES = [
  "Medikids Kemang",
  "Medikids BSD",
  "HDC Clinic Pusat",
  // tambahkan cabang lain di sini
];

/* 9 pertanyaan standar SKM / INM Kemenkes (U1–U9).
   JANGAN ubah jumlah/urutan tanpa alasan — ini dipakai laporan INM.
   Tiap opsi bernilai 1–4. */
export const SKM_QUESTIONS = [
  {
    id: "U1",
    text: "Kesesuaian persyaratan pelayanan dengan jenis pelayanannya",
    options: ["Tidak sesuai", "Kurang sesuai", "Sesuai", "Sangat sesuai"],
  },
  {
    id: "U2",
    text: "Kemudahan prosedur pelayanan di unit ini",
    options: ["Tidak mudah", "Kurang mudah", "Mudah", "Sangat mudah"],
  },
  {
    id: "U3",
    text: "Kecepatan waktu dalam memberikan pelayanan",
    options: ["Tidak cepat", "Kurang cepat", "Cepat", "Sangat cepat"],
  },
  {
    id: "U4",
    text: "Kewajaran biaya/tarif dalam pelayanan",
    options: ["Sangat mahal", "Cukup mahal", "Murah", "Sangat murah"],
  },
  {
    id: "U5",
    text: "Kesesuaian produk pelayanan antara standar dengan hasil yang diberikan",
    options: ["Tidak sesuai", "Kurang sesuai", "Sesuai", "Sangat sesuai"],
  },
  {
    id: "U6",
    text: "Kompetensi/kemampuan petugas dalam pelayanan",
    options: ["Tidak kompeten", "Kurang kompeten", "Kompeten", "Sangat kompeten"],
  },
  {
    id: "U7",
    text: "Perilaku petugas terkait kesopanan dan keramahan",
    options: ["Tidak sopan & ramah", "Kurang sopan & ramah", "Sopan & ramah", "Sangat sopan & ramah"],
  },
  {
    id: "U8",
    text: "Kepastian biaya (ada pungutan tambahan tidak resmi)",
    options: ["Selalu", "Sering", "Kadang-kadang", "Tidak ada"],
  },
  {
    id: "U9",
    text: "Penanganan pengaduan pengguna layanan",
    options: ["Tidak ada", "Ada tetapi tidak berfungsi", "Berfungsi kurang maksimal", "Dikelola dengan baik"],
  },
];

/* Penilaian kepuasan per-unit (skala 1–4) → mengisi kartu dashboard.
   key dipakai sebagai nama kolom di Google Sheet. */
export const UNIT_QUESTIONS = [
  { key: "FO",        text: "Pelayanan Front Office (pendaftaran/kasir)" },
  { key: "PRG",       text: "Pelayanan Perawat / Petugas Ruang" },
  { key: "Dokter",    text: "Pelayanan Dokter" },
  { key: "Kebersihan",text: "Kebersihan & kenyamanan klinik" },
];

export const UNIT_SCALE = ["Tidak puas", "Kurang puas", "Puas", "Sangat puas"];

/* NPS — pertanyaan rekomendasi 0–10 */
export const NPS_QUESTION =
  "Seberapa besar kemungkinan Anda merekomendasikan klinik kami kepada keluarga/teman?";
