/* ============================================================
   CONFIG.JS — Daftar cabang MHDC Survey
   ------------------------------------------------------------
   INI SATU-SATUNYA TEMPAT EDIT CABANG.
   Dipakai oleh form.html DAN dashboard.html (via <script src>).

   Tambah cabang : tulis satu baris string baru di array (posisi
                   bebas — nanti diurutkan otomatis A->Z).
   Ubah / hapus  : edit atau hapus baris yang bersangkutan.
   Setelah edit  : commit ke GitHub -> otomatis ter-deploy ke VPS.

   CATATAN: JANGAN taruh ACCESS_KEY / kunci webhook di sini —
   file ini terbaca publik di browser. Kunci tetap di proxy.php.
   ============================================================ */
window.MEDI_BRANCHES = [
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
];
