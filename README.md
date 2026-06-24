# MHDC — Kuesioner Kepuasan Pasien & Dashboard

Form Survei Kepuasan Masyarakat (SKM/INM Kemenkes) + dashboard internal MHDC.
Frontend statis (GitHub Pages) · Backend Google Apps Script + Google Sheets.

## Struktur folder

```
mhdc-survey/
├── shared/
│   ├── config.js       ← URL backend & ambang metrik   (EDIT INI)
│   ├── questions.js    ← daftar cabang & pertanyaan     (EDIT INI)
│   └── style.css       ← token warna & font
├── form/               ← halaman kuesioner (di-embed)
│   ├── index.html
│   ├── form.js
│   └── form.css
├── dashboard/          ← halaman dashboard
│   ├── index.html
│   ├── dashboard.js
│   ├── metrics.js      ← semua rumus metrik
│   └── dashboard.css
└── backend/
    └── Code.gs         ← Google Apps Script
```

Tiap bagian dipisah supaya tidak ada satu file raksasa — edit pertanyaan cukup di `shared/questions.js`, edit rumus cukup di `dashboard/metrics.js`.

## 1. Pasang backend (Google Apps Script)

1. Buat Google Sheet baru → **Extensions → Apps Script**.
2. Hapus isi default, tempel seluruh isi `backend/Code.gs`.
3. Jalankan fungsi **`setupSheet`** sekali (beri izin saat diminta) → header tabel terbuat.
4. **Deploy → New deployment → Web app**
   - *Execute as:* **Me**
   - *Who has access:* **Anyone**
5. Salin **URL Web app** (berakhiran `/exec`).

## 2. Sambungkan frontend

Buka `shared/config.js`, tempel URL tadi ke `API_URL`.
Sesuaikan daftar cabang di `shared/questions.js` → `BRANCHES`.

## 3. Hosting di GitHub Pages

1. Push folder ini ke repo GitHub.
2. **Settings → Pages → Source: Deploy from branch** (`main`, root).
3. Setelah aktif, alamat menjadi:
   - Form: `https://USERNAME.github.io/REPO/form/`
   - Dashboard: `https://USERNAME.github.io/REPO/dashboard/`

## 4. Embed ke website MHDC

Tempel iframe ini di halaman website Anda:

```html
<!-- Form kuesioner -->
<iframe
  src="https://USERNAME.github.io/REPO/form/"
  style="width:100%;max-width:780px;height:1600px;border:0;"
  title="Kuesioner Kepuasan Pasien MHDC"
  loading="lazy"></iframe>
```

```html
<!-- Dashboard (untuk halaman internal) -->
<iframe
  src="https://USERNAME.github.io/REPO/dashboard/"
  style="width:100%;height:900px;border:0;"
  title="Dashboard Kepuasan Pasien MHDC"
  loading="lazy"></iframe>
```

## Mapping pertanyaan → metrik dashboard

| Metrik dashboard            | Sumber                                   |
|-----------------------------|------------------------------------------|
| Rata-rata Kepuasan FO       | pertanyaan unit `FO` (1–4)               |
| Rata-rata Kepuasan PRG      | pertanyaan unit `PRG` (1–4)              |
| Rata-rata Kepuasan Dokter   | pertanyaan unit `Dokter` (1–4)           |
| Rata-rata Kepuasan Kebersihan| pertanyaan unit `Kebersihan` (1–4)      |
| CSAT Klinik                 | rata-rata 9 pertanyaan SKM (U1–U9)       |
| NPS                         | %Promoter(9–10) − %Detractor(0–6)        |
| Complain Ratio              | % responden dgn ≥1 jawaban SKM skor ≤2   |

9 pertanyaan SKM (U1–U9) tetap utuh sesuai standar **INM Kemenkes** untuk pelaporan. Blok kepuasan per-unit + NPS ditambahkan agar dashboard internal terisi tanpa mengubah instrumen SKM resmi.

## Catatan
- Ambang metrik (promoter, detractor, batas komplain) dapat diubah di `shared/config.js` → `THRESHOLDS`.
- Untuk analisis lanjutan, data mentah selalu tersedia di Google Sheet.
