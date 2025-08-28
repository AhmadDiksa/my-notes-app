import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Definisikan path ke file notes.json
const notesFilePath = path.join(__dirname, 'notes.json');

// Fungsi untuk membaca semua catatan dari file
const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync(notesFilePath);
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        // Jika file tidak ada atau kosong, kembalikan array kosong
        // Ini adalah skenario normal saat aplikasi pertama kali dijalankan
        return [];
    }
};

// Fungsi untuk menyimpan catatan ke file
const saveNotes = (notes) => {
    // 'null, 2' untuk format JSON yang rapi (indentasi 2 spasi)
    const dataJSON = JSON.stringify(notes, null, 2);
    fs.writeFileSync(notesFilePath, dataJSON);
};

// Fungsi untuk menambah catatan baru
const addNote = (title, body) => {
    const notes = loadNotes();

    // Cek apakah judul catatan sudah ada untuk mencegah duplikasi
    const duplicateNote = notes.find((note) => note.title === title);

    if (!duplicateNote) {
        notes.push({
            id: Date.now(), // ID unik berdasarkan timestamp
            title: title,
            body: body,
        });
        saveNotes(notes);
        console.log('Catatan baru berhasil ditambahkan!');
    } else {
        console.log('Judul catatan sudah ada. Gunakan judul lain.');
    }
};

// Fungsi untuk melihat semua catatan
const listNotes = () => {
    const notes = loadNotes();
    if (notes.length > 0) {
        console.log('\n--- Daftar Catatan Anda ---');
        notes.forEach((note) => {
            console.log(`ID: ${note.id}`);
            console.log(`Judul: ${note.title}`);
            console.log(`Isi: ${note.body}`);
            console.log('-------------------------');
        });
    } else {
        console.log('Tidak ada catatan yang ditemukan. Tambahkan satu dengan "node app.js add".');
    }
};

// Fungsi untuk melihat catatan spesifik berdasarkan judul
const readNote = (title) => {
    const notes = loadNotes();
    const note = notes.find((note) => note.title === title);

    if (note) {
        console.log('\n--- Detail Catatan ---');
        console.log(`ID: ${note.id}`);
        console.log(`Judul: ${note.title}`);
        console.log(`Isi: ${note.body}`);
        console.log('----------------------');
    } else {
        console.log(`Catatan dengan judul "${title}" tidak ditemukan.`);
    }
};

// Fungsi untuk menghapus catatan berdasarkan judul
const removeNote = (title) => {
    const notes = loadNotes();
    // Filter catatan, simpan yang judulnya TIDAK SAMA dengan judul yang ingin dihapus
    const notesToKeep = notes.filter((note) => note.title !== title);

    // Periksa apakah ada catatan yang benar-benar terhapus (jumlah catatan berubah)
    if (notes.length > notesToKeep.length) {
        console.log(`Catatan dengan judul "${title}" berhasil dihapus!`);
        saveNotes(notesToKeep);
    } else {
        console.log(`Catatan dengan judul "${title}" tidak ditemukan.`);
    }
};

yargs(hideBin(process.argv))
  .command({
    command: 'add',
    describe: 'Menambah catatan baru',
    builder: {
        title: {
            describe: 'Judul catatan',
            demandOption: true,
            type: 'string',
        },
        body: {
            describe: 'Isi catatan',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        addNote(argv.title, argv.body);
    },
  })
  .command({
    command: 'remove',
    describe: 'Menghapus catatan',
    builder: {
        title: {
            describe: 'Judul catatan yang akan dihapus',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        removeNote(argv.title);
    },
  })
  .command({
    command: 'list',
    describe: 'Menampilkan semua catatan',
    handler() {
        listNotes();
    },
  })
  .command({
    command: 'read',
    describe: 'Menampilkan catatan spesifik',
    builder: {
        title: {
            describe: 'Judul catatan yang akan ditampilkan',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        readNote(argv.title);
    },
  })
  .demandCommand(1, 'Kamu harus memasukkan sebuah perintah (add, remove, list, read).') // Pesan jika tidak ada command
  .help() // Menambahkan opsi --help
  .argv; // Memicu eksekusi yargs