# Pembangunan Rumah Lantai 2

Website dokumentasi pembangunan rumah statis. Semua data berasal dari file CSV dan foto dalam folder proyek—tanpa backend, database, maupun login admin.

## Yang perlu disiapkan

- Akun GitHub.
- Git terpasang di komputer. Unduh dari [git-scm.com](https://git-scm.com/download/win) bila perintah `git` belum tersedia.
- Folder proyek ini: `C:\Users\Rizky\Codex`.

> Anda tidak perlu menginstal atau membuka database. GitHub Pages akan menjalankan proses build otomatis setiap kali ada push ke GitHub.

## 1. Jalankan website di komputer sendiri (opsional)

Buka PowerShell atau Terminal di folder proyek, lalu jalankan:

```powershell
cd C:\Users\Rizky\Codex
npm install
npm run dev
```

Buka alamat yang ditampilkan terminal (biasanya `http://localhost:5173`). Hentikan server dengan `Ctrl + C`.

## 2. Buat repository baru di GitHub

1. Masuk ke [github.com](https://github.com).
2. Klik ikon **+** di kanan atas, lalu pilih **New repository**.
3. Isi **Repository name**, misalnya `dokumentasi-rumah`.
4. Pilih **Public** agar GitHub Pages dapat diakses umum.
5. Jangan centang **Add a README file**, `.gitignore`, atau license karena folder ini sudah memilikinya.
6. Klik **Create repository**.
7. Salin alamat repository yang diberikan GitHub. Bentuknya seperti ini:

```text
https://github.com/USERNAME/dokumentasi-rumah.git
```

Ganti `USERNAME` dengan nama akun GitHub Anda.

## 3. Upload website ke GitHub

Di PowerShell, jalankan perintah berikut satu per satu dari folder proyek. Ganti `USERNAME` dan `dokumentasi-rumah` sesuai repository Anda.

```powershell
cd C:\Users\Rizky\Codex
git init
git add .
git commit -m "Website dokumentasi pembangunan rumah"
git branch -M main
git remote add origin https://github.com/USERNAME/dokumentasi-rumah.git
git push -u origin main
```

Saat pertama kali melakukan `git push`, GitHub dapat meminta Anda masuk melalui browser. Selesaikan proses login tersebut, lalu kembali ke terminal. Jika Git meminta nama dan email, jalankan sekali saja:

```powershell
git config --global user.name "Nama Anda"
git config --global user.email "email-anda@example.com"
```

Setelah itu ulangi perintah `git commit` dan `git push` yang belum berhasil.

## 4. Aktifkan GitHub Pages

1. Buka halaman repository di GitHub.
2. Klik **Settings**.
3. Di menu kiri, klik **Pages**.
4. Pada bagian **Build and deployment**, pilih **Source: GitHub Actions**.
5. Tunggu sekitar 1–3 menit. Workflow `Deploy to GitHub Pages` akan terlihat di tab **Actions**.
6. Buka workflow tersebut dan pastikan pekerjaan **build** serta **deploy** memiliki tanda centang hijau.

File [workflow deploy](.github/workflows/deploy.yml) sudah tersedia, jadi tidak perlu membuat workflow dari awal.

## 5. Dapatkan link website Anda

Setelah workflow berhasil, buka kembali **Settings → Pages** pada repository. GitHub akan menampilkan tulisan seperti:

```text
Your site is live at https://USERNAME.github.io/dokumentasi-rumah/
```

Itulah link website yang dapat dibagikan.

Untuk repository biasa, format link-nya selalu:

```text
https://USERNAME.github.io/NAMA-REPOSITORY/
```

Contoh: repository `github.com/rizky/dokumentasi-rumah` akan memiliki link:

```text
https://rizky.github.io/dokumentasi-rumah/
```

## 6. Menambah dokumentasi hari baru

Setiap ada perkembangan, cukup lakukan dua hal berikut.

### A. Upload foto

Gunakan nomor tiga digit yang sama dengan nomor harinya, misalnya untuk Day 41 gunakan `041.jpg`.

```text
public/images/depan/041.jpg
public/images/samping/041.jpg
public/images/belakang/041.jpg
public/images/lantai2/041.jpg
```

Tidak wajib mengisi keempat folder. Sudut yang belum punya foto akan otomatis menampilkan kartu “Belum ada dokumentasi.”

### B. Tambahkan baris di CSV

Buka `public/data/progress.csv`, lalu tambahkan satu baris baru di paling bawah:

```csv
41,20 Agustus 2026,Pengecoran Dak,Berjalan,Pengecoran dak lantai dua dimulai.
```

Kolom CSV harus selalu berurutan seperti ini:

```text
day,date,title,status,note
```

Jika catatan berisi koma, bungkus nilai catatan dengan tanda kutip ganda:

```csv
42,21 Agustus 2026,Pengecekan Dak,Berjalan,"Pengecekan permukaan, ketebalan, dan kerataan dak."
```

## 7. Publikasikan pembaruan

Setelah foto dan CSV diperbarui, jalankan:

```powershell
cd C:\Users\Rizky\Codex
git add .
git commit -m "Tambah dokumentasi Day 041"
git push
```

Tunggu workflow GitHub Actions selesai (biasanya 1–3 menit), lalu buka kembali link website Anda. Day baru akan langsung tampil pada timeline dan galeri tanpa perubahan kode React.

## Mengatasi masalah umum

### Website menampilkan 404 atau belum muncul

- Pastikan **Settings → Pages → Source** sudah memilih **GitHub Actions**.
- Buka tab **Actions** dan pastikan workflow `Deploy to GitHub Pages` selesai dengan tanda hijau.
- Pastikan perubahan dipush ke branch `main`.

### Foto tidak muncul

- Pastikan nama file memakai tiga digit: `001.jpg`, `002.jpg`, `041.jpg`.
- Pastikan foldernya benar: `depan`, `samping`, `belakang`, atau `lantai2`.
- Pastikan nomor foto sama dengan nilai kolom `day` pada CSV.
- Gunakan ekstensi `.jpg` huruf kecil.

### Workflow gagal saat push

- Buka tab **Actions** di GitHub, klik workflow yang gagal, lalu buka langkah berwarna merah untuk melihat pesannya.
- Pastikan file `package.json`, `pnpm-lock.yaml`, dan `.github/workflows/deploy.yml` ikut dipush.

## Struktur data penting

```text
public/
├── data/
│   └── progress.csv
└── images/
    ├── depan/
    ├── samping/
    ├── belakang/
    └── lantai2/
```

Website akan otomatis mencari foto berdasarkan nomor hari, misalnya Day 7 mencari `007.jpg` pada setiap folder sudut.
