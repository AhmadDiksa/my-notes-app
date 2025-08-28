# My Notes App

Aplikasi catatan sederhana berbasis Command Line Interface (CLI) yang dibangun dengan Node.js. Aplikasi ini memungkinkan Anda untuk membuat, membaca, menampilkan, dan menghapus catatan dengan mudah melalui terminal.

## 🚀 Fitur

- ✅ **Tambah Catatan** - Buat catatan baru dengan judul dan isi
- ✅ **Lihat Semua Catatan** - Tampilkan semua catatan yang tersimpan
- ✅ **Baca Catatan Spesifik** - Lihat detail catatan berdasarkan judul
- ✅ **Hapus Catatan** - Hapus catatan berdasarkan judul
- ✅ **Penyimpanan Data** - Data disimpan dalam file JSON secara lokal
- ✅ **ID Unik** - Setiap catatan memiliki ID unik berdasarkan timestamp

## 📦 Instalasi

1. Pastikan Node.js terinstal di sistem Anda
2. Clone atau download project ini
3. Masuk ke direktori project:
   ```bash
   cd my-notes-app
   ```
4. Install dependencies:
   ```bash
   npm install
   ```

## 🎯 Cara Penggunaan

### Menambah Catatan Baru
```bash
node app.js add --title="Judul Catatan" --body="Isi catatan Anda di sini"
```

### Menampilkan Semua Catatan
```bash
node app.js list
```

### Membaca Catatan Spesifik
```bash
node app.js read --title="Judul Catatan"
```

### Menghapus Catatan
```bash
node app.js remove --title="Judul Catatan"
```

### Bantuan
```bash
node app.js --help
```

## 📁 Struktur Data

Catatan disimpan dalam format JSON di file `notes.json` dengan struktur berikut:
```json
[
  {
    "id": 1756346687803,
    "title": "Judul Catatan",
    "body": "Isi catatan"
  }
]
```

## 🛠️ Teknologi yang Digunakan

- **Node.js** - Runtime JavaScript
- **yargs** - Library untuk parsing argument command line
- **fs module** - Untuk operasi file system
- **JSON** - Format penyimpanan data

## 📝 Contoh Penggunaan

```bash
# Menambah catatan
node app.js add --title="Belajar Node.js" --body="Mempelajari pembuatan aplikasi CLI"

# Menampilkan semua catatan
node app.js list

# Membaca catatan spesifik
node app.js read --title="Belajar Node.js"

# Menghapus catatan
node app.js remove --title="Belajar Node.js"
```

## 🎨 Struktur Project

```
my-notes-app/
├── app.js          # File utama aplikasi
├── notes.json      # File penyimpanan data catatan
├── package.json    # Konfigurasi project dan dependencies
├── package-lock.json # Lock file untuk dependencies
└── README.md       # Dokumentasi ini
```

## 🔧 Development

Project ini menggunakan ES6 modules. Pastikan untuk menjalankan dengan flag yang sesuai jika diperlukan.

## 📄 License

ISC License
