# 🎂 Kado Digital Ulang Tahun ke-21 — Paijok

Website ucapan ulang tahun interaktif untuk Paijok, dibuat dengan HTML, CSS, dan JavaScript murni. Tidak membutuhkan framework, npm, atau proses build. Siap dipublikasikan melalui GitHub Pages.

## Preview fitur

- Layar pembuka dengan kado yang perlu diketuk tiga kali, animasi getar, dan confetti.
- Musik ambient sintetis yang hanya berjalan setelah interaksi pengguna.
- Counter umur 1–21, balon yang bisa dipecahkan, dan efek suara.
- Kue SVG dengan lilin angka 21, deteksi tiupan mikrofon (opsional), tombol fallback, dan gesture swipe ke atas.
- Timeline cerita, galeri foto dengan lightbox, navigasi keyboard dan swipe.
- 21 kartu doa yang bisa dibalik dengan progress.
- Surat dengan efek mesin tik, easter egg, tombol kabur, dan confetti penutup.
- Countdown sebelum 10 November 2026. `?preview=1` membuka versi penuh untuk pengujian.
- Responsif, mendukung reduced motion, serta tidak memakai library JavaScript eksternal.

## Struktur folder

```text
/
├── index.html
├── css/style.css
├── js/config.js
├── js/main.js
├── js/confetti.js
├── js/audio.js
├── assets/images/
├── assets/audio/
├── assets/favicon.svg
├── .nojekyll
├── .gitignore
├── LICENSE
└── README.md
```

## 1. Mengganti nama, pesan, dan konten

Buka `js/config.js`, lalu edit:

- `recipient`: nama panggilan teman.
- `sender`: nama pengirim.
- `timeline`: enam momen cerita yang tampil di timeline.
- `gallery`: nama file dan caption foto.
- `reasons`: 21 doa/alasan (jumlah kartu sebaiknya tetap 21).
- `letter`: isi surat pribadi.
- `introJokes`, `balloonMessages`, dan `easterEggMessages`: teks kejutan.
- `celebrationDate`: tanggal mulai versi penuh.
- `enableCountdown`: ubah ke `false` jika countdown tidak diperlukan.

Tanggal lahir disimpan sebagai `2005-11-10`. Ulang tahun ke-21 jatuh pada 10 November 2026.

## 2. Menambahkan foto

Simpan foto di `assets/images/`. Nama bawaan yang dipakai:

```text
photo-1.jpg
photo-2.jpg
photo-3.jpg
photo-4.jpg
photo-5.jpg
photo-6.jpg
```

Boleh menggunakan `.png` atau `.webp`, asalkan nama file di `js/config.js` ikut disesuaikan. Gunakan foto yang sudah mendapat izin dari pemiliknya. Jika foto belum tersedia atau namanya salah, kartu galeri menampilkan placeholder otomatis.

Untuk gambar preview Open Graph saat link dibagikan, tambahkan `og-preview.jpg` di folder yang sama. Ukuran yang disarankan 1200×630 px. GitHub Pages dapat menampilkan preview sosial setelah metadata terbaca oleh crawler; hasil preview juga dipengaruhi cache WhatsApp/Instagram.

## 3. Musik dan audio

Website membuat musik ambient dan efek suara sederhana langsung menggunakan Web Audio API, jadi tidak wajib menambahkan file audio. Musik baru mulai setelah kado diketuk atau tombol musik ditekan, mengikuti aturan autoplay browser. Tombol musik selalu tersedia di kanan atas.

Folder `assets/audio/` disediakan jika nanti ingin menambahkan file musik sendiri. Untuk versi ini, file musik eksternal belum digunakan.

## 4. Menjalankan secara lokal

Cara paling mudah: buka `index.html` di browser.

Untuk menguji fitur mikrofon, sebaiknya gunakan localhost (browser umumnya mensyaratkan konteks aman untuk akses mikrofon):

```bash
python -m http.server 8000
```

Kemudian buka `http://localhost:8000`.

Mode preview countdown:

```text
http://localhost:8000/?preview=1
```

Catatan: beberapa browser membatasi izin mikrofon ketika halaman dibuka langsung melalui `file://`. Tombol **Tiup lilin** tetap berfungsi sebagai fallback.

## 5. Deploy ke GitHub Pages

1. Buat repository baru di GitHub.
2. Letakkan seluruh isi folder project ini di root repository.
3. Push ke branch `main`.
4. Buka **Settings → Pages**.
5. Pada bagian **Build and deployment**, pilih **Deploy from a branch**.
6. Pilih branch **main** dan folder **/ (root)**, lalu klik **Save**.
7. Tunggu proses deployment selesai. URL biasanya berbentuk `https://username.github.io/nama-repo/`.

Semua aset memakai path relatif, sehingga tetap berfungsi pada URL GitHub Pages dengan subpath repository.

## 6. Mengirim link ke teman

- Buka URL GitHub Pages setelah deployment berhasil.
- Coba dahulu dengan menambahkan `?preview=1` untuk memastikan seluruh kejutan dapat dibuka sebelum tanggal ulang tahun.
- Kirim link tanpa parameter preview pada 10 November 2026.
- Kamu bisa mengirim pesan singkat seperti: “Paijok, ada sesuatu. Buka pas lagi santai ya 🎁”
- Jika preview WhatsApp belum berubah setelah mengganti metadata, tunggu cache crawler diperbarui.

## Catatan aksesibilitas dan performa

- Animasi mengikuti preferensi `prefers-reduced-motion`.
- Foto memakai lazy loading.
- Canvas confetti berhenti ketika tab tidak aktif.
- Mikrofon bersifat opsional dan hanya diminta setelah tombolnya ditekan.
- Tidak ada data pribadi yang dikirim ke server oleh kode website ini.
