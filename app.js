const fs = require('fs');
const path = require('path');
const yargs = require('yargs'); // Impor yargs

// Definisikan path ke file notes.json
const notesFilePath = path.join(__dirname, 'notes.json');

// Fungsi untuk membaca semua catatan dari file
const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync(notesFilePath);
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        return []; // Jika file tidak ada atau kosong, kembalikan array kosong
    }
};

// Fungsi untuk menyimpan catatan ke file
const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes, null, 2);
    fs.writeFileSync(notesFilePath, dataJSON);
};

// Fungsi untuk menambah catatan baru
const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNote = notes.find((note) => note.title === title);

    if (!duplicateNote) {
        notes.push({
            id: Date.now(),
            title: title,
            body: body,
        });
        saveNotes(notes);
        console.log('Catatan baru berhasil ditambahkan!');
    } else {
        console.log('Judul catatan sudah ada!');
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
        console.log('Tidak ada catatan yang ditemukan.');
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
        console.log('Catatan tidak ditemukan!');
    }
};

// Fungsi untuk menghapus catatan berdasarkan judul
const removeNote = (title) => {
    const notes = loadNotes();
    const notesToKeep = notes.filter((note) => note.title !== title);

    if (notes.length > notesToKeep.length) {
        console.log('Catatan berhasil dihapus!');
        saveNotes(notesToKeep);
    } else {
        console.log('Catatan tidak ditemukan!');
    }
};

// --- Konfigurasi Yargs ---

// Dapatkan instance yargs
const yargsInstance = yargs();

// Konfigurasi command 'add'
yargsInstance.command({
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
});

// Konfigurasi command 'remove'
yargsInstance.command({
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
});

// Konfigurasi command 'list'
yargsInstance.command({
    command: 'list',
    describe: 'Menampilkan semua catatan',
    handler() {
        listNotes();
    },
});

// Konfigurasi command 'read'
yargsInstance.command({
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
});

// Tambahkan help command
yargsInstance.help();

// Penting: Parse argumen command line
yargsInstance.parse();

// --- Contoh Penggunaan ---
// addNote('Judul Pertama', 'Ini adalah isi catatan pertama.');
// addNote('Belajar Node.js', 'Membuat aplikasi CLI sederhana.');
// addNote('Judul Pertama', 'Ini adalah catatan duplikat.'); // Akan gagal
// listNotes(); // Aktifkan ini untuk melihat catatan
// readNote('Belajar Node.js');
// readNote('Catatan yang tidak ada'); // Akan menampilkan 'Catatan tidak ditemukan!'
// removeNote('Judul Pertama');
// removeNote('Catatan yang tidak ada'); // Akan menampilkan 'Catatan tidak ditemukan!'
// listNotes(); // Untuk verifikasi setelah penghapusan

