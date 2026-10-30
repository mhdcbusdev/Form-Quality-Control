/* ============================================================
   CONFIG.JS — Pengaturan MHDC Survey (SATU-SATUNYA file setelan)
   ------------------------------------------------------------
   Dipakai oleh form.html DAN dashboard.html.
   Mau ubah apa pun, cukup di sini, lalu commit ke GitHub.

   1) WEBHOOK : alamat Apps Script (.../exec)
   2) KEY     : kunci akses (sama dgn ACCESS_KEY di Apps Script)
   3) BRANCHES: daftar cabang (urutan bebas, diurutkan otomatis)

   CATATAN: file ini terbaca publik di browser. Untuk survei
   internal ini tidak apa-apa; jangan taruh data rahasia lain.
   ============================================================ */
window.MEDI_CONFIG = {

  WEBHOOK: "https://script.google.com/macros/s/AKfycbzoADAxKT_FulWwu5nie12sKyHbdfbmshS0DdpOeNP3MvHeR92appHx5yZLG44eiabHAQ/exec",

  KEY: "29c12e94-a5d0-4293-91dc-38faa01231c9",

  BRANCHES: [
    // --- MHDC ---
    "MHDC Bulog",
    "MHDC Kalibata",
    "MHDC Sentraya",
    "MHDC Wisma BNI 46",

    // --- Medikids ---
    "Medikids Batam",
    "Medikids Bekasi",
    "Medikids Bintaro",
    "Medikids BSD",
    "Medikids Cibinong",
    "Medikids Cibubur",
    "Medikids Cikarang",
    "Medikids Dago Bandung",
    "Medikids Grand Wisata",
    "Medikids Green Terrace",
    "Medikids Karawaci",
    "Medikids Kebon Jeruk",
    "Medikids Kemang",
    "Medikids Lebak Bulus",
    "Medikids Makassar",
    "Medikids Malang",
    "Medikids Palembang",
    "Medikids Pondok Indah",
    "Medikids Rawamangun",
    "Medikids Rempoa",
    "Medikids RS Regina Maris Bekasi", // dulu: Medikids RS Budi Lestari
    "Medikids Semarang",
    "Medikids Serpong",
    "Medikids Solo",
    "Medikids Sunter",

    // --- Medikids Wakaf ---
    "Medikids Wakaf Bogor",
    "Medikids Wakaf Cikupa",
    "Medikids Wakaf Cilegon",
    "Medikids Wakaf Cipondoh Tangerang",
    "Medikids Wakaf Depok",
    "Medikids Wakaf JGC",
    "Medikids Wakaf Kalimalang",
    "Medikids Wakaf Karawang",
    "Medikids Wakaf Padang",
    "Medikids Wakaf Pancoran Mas",
    "Medikids Wakaf Pekanbaru",
    "Medikids Wakaf Sawangan",
    "Medikids Wakaf Surabaya",
  ],
};
