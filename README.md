# Kamus Kenyah Translator | Penerjemah Kamus Kenyah

[English](#english) | [Bahasa Indonesia](#bahasa-indonesia)

![Kamus Kenyah Translator Preview](preview.png)

<a id="english"></a>
## English

### Overview

An interactive translator application for the Kenyah language, designed to preserve and promote this indigenous language from Borneo. This project aims to bridge communication gaps and serve as a comprehensive digital resource for Kenyah speakers and those interested in learning the language.

> **Note:** This project is founded and led by [KOU](https://kou.my.id). Started in 2023 (Version 1.0), now at Version 8.0.

### About Kenyah Language
The Kenyah language is spoken by the Kenyah people, an indigenous ethnic group from the island of Borneo, primarily in East Kalimantan (Indonesia), Sarawak and Sabah (Malaysia). With multiple dialects and a rich cultural heritage, this language is an important part of Borneo's linguistic diversity. As modernization progresses, preservation efforts become increasingly vital to ensure this linguistic treasure continues to thrive for future generations.

### Features

- **Kenyah-Indonesian Translation:** Specialized translation focusing on the Kenyah-Indonesian language pair
- **Comprehensive Dictionary:** Contains thousands of words, phrases, and cultural expressions
- **Intelligent Search:** Find words quickly with fuzzy search and predictive text capabilities
- **Audio Pronunciation:** Listen to native pronunciations for authentic learning
- **Cultural Context:** Learn about cultural significance and proper usage of terms
- **User Profiles:** Save favorite translations and track learning progress
- **Offline Mode:** Full functionality without internet connection
- **Cross-Platform:** Available on web, iOS, and Android devices

### Technical Architecture

- **Frontend:** React Native / React.js with responsive design for all device sizes
- **Backend:** Node.js with Express for RESTful API endpoints
- **Database:** Supabase for scalable, real-time data storage
- **Authentication:** Google OAuth integration for secure and seamless login
- **Audio Processing:** WebAudio API for high-quality pronunciation playback
- **Caching:** Redux for state management and local storage for offline capabilities
- **CI/CD:** GitHub Actions for automated testing and deployment

### Database Structure

Our Supabase implementation includes:

- `words` table: Stores all Kenyah vocabulary with Indonesian translations
- `audio_files` table: References to pronunciation audio files
- `cultural_notes` table: Cultural context and usage examples
- `user_favorites` table: User-saved translations
- `search_history` table: Recent user searches for personalized experience

### Installation

```bash
# Clone the repository
git clone https://github.com/AlpianPPLG/KamusKenyah-Translator.git

# Navigate to project directory
cd KamusKenyah-Translator

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your Supabase and OAuth credentials

# Start the application
npm start
```

### Usage

1. Sign in with your Google account or continue as a guest
2. Enter a word in Kenyah or Indonesian in the search field
3. View translation results with cultural context and usage examples
4. Click the audio icon to hear native pronunciation
5. Save translations to your favorites by clicking the star icon
6. Access your history and saved translations in your profile section
7. Use offline mode when internet connectivity is limited

### API Documentation

Our RESTful API endpoints include:

- `GET /api/translate`: Translate between Kenyah and Indonesian
- `GET /api/search`: Search the dictionary with fuzzy matching
- `POST /api/favorites`: Save translations to user favorites
- `GET /api/audio/:word`: Retrieve pronunciation audio files
- `GET /api/cultural-notes/:word`: Get cultural context for specific terms

Detailed API documentation is available in our [API.md](./docs/API.md) file.

### Contributing

Contributions to improve the dictionary database or application features are welcome! We especially need help with:

- Adding more Kenyah words and phrases
- Improving translation accuracy
- Recording high-quality audio pronunciations
- Adding cultural context to entries
- Enhancing the user interface and experience

Contribution process:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add some amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please read our [CONTRIBUTING.md](./docs/CONTRIBUTING.md) for detailed guidelines.

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### Acknowledgements

- [KOU](https://kou.my.id) for founding and leading this project since 2023
- Indigenous Kenyah language experts and community members
- Contributors to the Kenyah language database
- Supabase team for the robust database platform
- Google for OAuth authentication services
- Open source language processing libraries used in this project
- Funding organizations supporting indigenous language preservation
- Academic partners providing linguistic expertise

<a id="bahasa-indonesia"></a>
## Bahasa Indonesia

### Ikhtisar

Aplikasi penerjemah interaktif untuk bahasa Kenyah, dirancang untuk melestarikan dan mempromosikan bahasa asli dari Borneo ini. Proyek ini bertujuan untuk menjembatani kesenjangan komunikasi dan berfungsi sebagai sumber daya digital komprehensif bagi penutur bahasa Kenyah dan mereka yang tertarik mempelajari bahasa tersebut.

> **Catatan:** Proyek ini didirikan dan dipimpin oleh [KOU](https://kou.my.id). Dimulai pada 2023 (Versi 1.0), sekarang di Versi 8.0.

### Tentang Bahasa Kenyah

Bahasa Kenyah digunakan oleh suku Kenyah, kelompok etnis asli dari pulau Borneo, terutama di Kalimantan Timur (Indonesia), Sarawak dan Sabah (Malaysia). Dengan berbagai dialek dan warisan budaya yang kaya, bahasa ini merupakan bagian penting dari keragaman linguistik Borneo. Seiring kemajuan modernisasi, upaya pelestarian menjadi semakin penting untuk memastikan harta linguistik ini terus berkembang untuk generasi mendatang.

### Fitur

- **Terjemahan Kenyah-Indonesia:** Penerjemahan khusus yang berfokus pada pasangan bahasa Kenyah-Indonesia
- **Kamus Komprehensif:** Berisi ribuan kata, frasa, dan ungkapan budaya
- **Pencarian Cerdas:** Temukan kata dengan cepat menggunakan pencarian fuzzy dan kemampuan teks prediktif
- **Pengucapan Audio:** Dengarkan pengucapan dari penutur asli untuk pembelajaran yang autentik
- **Konteks Budaya:** Pelajari makna budaya dan penggunaan istilah yang tepat
- **Profil Pengguna:** Simpan terjemahan favorit dan lacak kemajuan pembelajaran
- **Mode Offline:** Fungsionalitas penuh tanpa koneksi internet
- **Lintas Platform:** Tersedia di web, iOS, dan perangkat Android

### Arsitektur Teknis

- **Frontend:** React Native / React.js dengan desain responsif untuk semua ukuran perangkat
- **Backend:** Node.js dengan Express untuk endpoint API RESTful
- **Database:** Supabase untuk penyimpanan data yang skalabel dan real-time
- **Autentikasi:** Integrasi Google OAuth untuk login yang aman dan lancar
- **Pemrosesan Audio:** WebAudio API untuk pemutaran pengucapan berkualitas tinggi
- **Caching:** Redux untuk manajemen state dan penyimpanan lokal untuk kemampuan offline
- **CI/CD:** GitHub Actions untuk pengujian dan deployment otomatis

### Struktur Database

Implementasi Supabase kami mencakup:

- Tabel `words`: Menyimpan semua kosakata Kenyah dengan terjemahan bahasa Indonesia
- Tabel `audio_files`: Referensi ke file audio pengucapan
- Tabel `cultural_notes`: Konteks budaya dan contoh penggunaan
- Tabel `user_favorites`: Terjemahan yang disimpan pengguna
- Tabel `search_history`: Pencarian terbaru pengguna untuk pengalaman yang dipersonalisasi

### Instalasi

```bash
# Klon repositori
git clone https://github.com/AlpianPPLG/KamusKenyah-Translator.git

# Navigasi ke direktori proyek
cd KamusKenyah-Translator

# Instal dependensi
npm install

# Siapkan variabel lingkungan
cp .env.example .env
# Edit .env dengan kredensial Supabase dan OAuth Anda

# Mulai aplikasi
npm start
```

### Penggunaan

1. Masuk dengan akun Google Anda atau lanjutkan sebagai tamu
2. Masukkan kata dalam bahasa Kenyah atau Indonesia di kolom pencarian
3. Lihat hasil terjemahan dengan konteks budaya dan contoh penggunaan
4. Klik ikon audio untuk mendengar pengucapan asli
5. Simpan terjemahan ke favorit dengan mengklik ikon bintang
6. Akses riwayat dan terjemahan tersimpan di bagian profil Anda
7. Gunakan mode offline saat konektivitas internet terbatas

### Dokumentasi API

Endpoint API RESTful kami mencakup:

- `GET /api/translate`: Terjemahkan antara Kenyah dan Indonesia
- `GET /api/search`: Cari kamus dengan pencocokan fuzzy
- `POST /api/favorites`: Simpan terjemahan ke favorit pengguna
- `GET /api/audio/:word`: Ambil file audio pengucapan
- `GET /api/cultural-notes/:word`: Dapatkan konteks budaya untuk istilah tertentu

Dokumentasi API detail tersedia di file [API.md](./docs/API.md).

### Kontribusi

Kontribusi untuk memperbaiki database kamus atau fitur aplikasi sangat disambut! Kami terutama membutuhkan bantuan dengan:

- Menambahkan lebih banyak kata dan frasa bahasa Kenyah
- Meningkatkan akurasi terjemahan
- Merekam pengucapan audio berkualitas tinggi
- Menambahkan konteks budaya pada entri
- Meningkatkan antarmuka dan pengalaman pengguna

Proses kontribusi:

1. Fork repositori
2. Buat branch fitur (`git checkout -b fitur/fitur-luar-biasa`)
3. Commit perubahan (`git commit -m 'Menambahkan fitur luar biasa'`)
4. Push ke branch (`git push origin fitur/fitur-luar-biasa`)
5. Buka Pull Request

Silakan baca [CONTRIBUTING.md](./docs/CONTRIBUTING.md) untuk panduan detail.

### Lisensi

Proyek ini dilisensikan di bawah Lisensi MIT - lihat file [LICENSE](LICENSE) untuk detailnya.

### Ucapan Terima Kasih

- [KOU](https://kou.my.id) yang mendirikan dan memimpin proyek ini sejak 2023
- Para ahli bahasa Kenyah asli dan anggota komunitas
- Kontributor database bahasa Kenyah
- Tim Supabase untuk platform database yang tangguh
- Google untuk layanan autentikasi OAuth
- Pustaka pemrosesan bahasa open source yang digunakan dalam proyek ini
- Organisasi pendanaan yang mendukung pelestarian bahasa asli
- Mitra akademis yang memberikan keahlian linguistik
