# LaundrYuk! 🧺

Aplikasi web ini bertujuan untuk mendigitalisasi dan mempermudah pencatatan administrasi pada usaha laundry. Dimulai dari manajemen data pelanggan, layanan pakaian, hingga pencatatan transaksi yang menghubungkan keduanya. Proyek ini dikembangkan dari sebuah program yang sebelumnya berupa program CLI C++ dengan Multi-Linked List.

- 🔗 **Demo:** https://laundryyuk-web.vercel.app/
- 📦 **Versi CLI (C++):** https://github.com/M4VAIS3/laundryyuk-main-algorithm

## Fitur

- **Dashboard**: ringkasan data dan navigasi cepat
- **Customer**: tambah, ubah, hapus, dan cari data pelanggan
- **Layanan**: kelola jenis layanan laundry beserta harganya
- **Transaksi**: catat transaksi antara pelanggan dan layanan
- **Relasi**: tampilan hubungan pelanggan dan layanan
- **Statistik**: grafik dan jumlah data

## Teknologi

- React + TypeScript
- Vite
- Tailwind CSS
- Radix UI / shadcn-ui, Lucide Icons, Recharts

## Menjalankan di Lokal

Prasyarat: [Node.js](https://nodejs.org) versi 18 ke atas.

```bash
git clone https://github.com/M4VAIS3/laundryyuk-web.git
cd laundryyuk-web
npm install
npm run dev
```

Buka alamat yang muncul di terminal (biasanya `http://localhost:5173`).

Untuk build produksi:

```bash
npm run build
npm run preview
```

## Struktur Folder

```
laundryyuk-web/
├── public/
├── src/
│   ├── app/
│   │   ├── App.tsx
│   │   └── components/      # Dashboard, Customer, Layanan, Transaksi, Relasi, Statistik
│   ├── styles/
│   └── main.tsx
├── index.html
├── vite.config.ts
└── package.json
```

## Catatan

Versi web ini masih berupa **frontend**. Data disimpan sementara di state browser, sehingga akan hilang saat halaman di-refresh.

## Tim

- Michio Avryant Gervaise
- Syahrul Ramadhan
- Rahul Adiswara

## Tentang Proyek

Proyek ini dibuat sebagai proyek portofolio pribadi. Perkembangan lebih lanjut sangat terbuka, misalnya penyimpanan data permanen (localStorage atau backend + database), integrasi logika Multi-Linked List, dan peningkatan tampilan.

Saran, masukan, dan kontribusi sangat diterima lewat [Issues](https://github.com/M4VAIS3/laundryyuk-web/issues) atau pull request.

Berawal dari Tugas Besar Struktur Data, Telkom University Jakarta
