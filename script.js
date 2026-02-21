const API_URL =
  "https://script.google.com/macros/s/AKfycbwlgFhTDWxeXnyuWOSaE3DBPpy6xUG0bT6f_wT1OpqCsImxnD0Rj95hcKEPYG_cDDls/exec";
const perHalaman = 3;
let waktu = 1800;

let halaman = 0;
let timer;
let waktuHabis = false;
let sudahSubmit = false;
let jawaban = {};

const soal = [
  {
t: "Makna utama Pancasila sebagai ideologi terbuka adalah?",
p: [
  "Dapat diubah seluruhnya sesuai perkembangan zaman",
  "Memiliki nilai dasar tetap namun nilai instrumental dapat berkembang",
  "Mengikuti ideologi negara maju",
  "Bersifat sementara"
],
j: 1,
},

{
t: "Rumusan Pancasila yang sah tercantum dalam?",
p: [
  "Piagam Jakarta",
  "Pembukaan UUD 1945 alinea IV",
  "Batang Tubuh UUD 1945",
  "Tap MPR No. II/MPR/1978"
],
j: 1,
},

{
t: "Tokoh yang pertama kali mengusulkan istilah Pancasila dalam sidang BPUPKI adalah?",
p: [
  "Mohammad Yamin",
  "Soepomo",
  "Soekarno",
  "Mohammad Hatta"
],
j: 2,
},

{
t: "BPUPKI dibentuk pada tanggal?",
p: [
  "29 April 1945",
  "1 Juni 1945",
  "7 Agustus 1945",
  "17 Agustus 1945"
],
j: 0,
},

{
t: "Tujuan utama dibentuknya Paskibraka adalah?",
p: [
  "Mencari siswa berprestasi akademik",
  "Menyiapkan generasi muda berkarakter Pancasila melalui pengibaran bendera",
  "Membentuk pasukan militer pelajar",
  "Kegiatan seremonial tahunan"
],
j: 1,
},

{
t: "Pasukan pengibar bendera pertama kali dilaksanakan secara nasional pada tahun?",
p: [
  "1967",
  "1968",
  "1970",
  "1972"
],
j: 1,
},

{
t: "Tokoh yang menggagas pembentukan Paskibraka adalah?",
p: [
  "Idik Sulaeman",
  "Husein Mutahar",
  "Sarwo Edhie Wibowo",
  "Ahmad Yani"
],
j: 1,
},

{
t: "Makna formasi 17-8-45 dalam Paskibraka melambangkan?",
p: [
  "Jumlah anggota pasukan",
  "Tanggal Proklamasi Kemerdekaan Indonesia",
  "Jumlah provinsi Indonesia",
  "Jumlah sila Pancasila"
],
j: 1,
},

{
t: "Nilai utama yang harus dimiliki Paskibraka sesuai pembinaan ideologi Pancasila adalah?",
p: [
  "Kompetisi",
  "Individualisme",
  "Kedisiplinan dan gotong royong",
  "Dominasi kelompok"
],
j: 2,
},

{
t: "Makna nasionalisme dalam konteks Paskibraka adalah?",
p: [
  "Membanggakan bangsa lain",
  "Kesetiaan kepada bangsa dan negara",
  "Mengutamakan daerah",
  "Menolak budaya luar"
],
j: 1,
},

{
t: "Semboyan Bhinneka Tunggal Ika terdapat dalam kitab?",
p: [
  "Sutasoma",
  "Negarakertagama",
  "Pararaton",
  "Arjunawiwaha"
],
j: 0,
},

{
t: "Penulis kitab Sutasoma adalah?",
p: [
  "Mpu Tantular",
  "Mpu Prapanca",
  "Empu Kanwa",
  "Mpu Sedah"
],
j: 0,
},

{
t: "Tujuan negara Indonesia tercantum dalam?",
p: [
  "Pasal 1 UUD 1945",
  "Pembukaan UUD 1945 alinea IV",
  "Pasal 27 UUD 1945",
  "Pasal 30 UUD 1945"
],
j: 1,
},

{
t: "Sikap yang mencerminkan sila ke-3 Pancasila adalah?",
p: [
  "Mengutamakan kepentingan pribadi",
  "Menjaga persatuan bangsa",
  "Menghindari musyawarah",
  "Bersikap individual"
],
j: 1,
},

{
t: "Sidang pertama BPUPKI dilaksanakan pada tanggal?",
p: [
  "29 Mei – 1 Juni 1945",
  "10 – 17 Juli 1945",
  "1 – 7 Juni 1945",
  "7 – 9 Agustus 1945"
],
j: 0,
},

{
t: "PPKI dibentuk pada tanggal?",
p: [
  "7 Agustus 1945",
  "9 Agustus 1945",
  "10 Agustus 1945",
  "12 Agustus 1945"
],
j: 0,
},

{
t: "Makna utama pengibaran bendera Merah Putih bagi Paskibraka adalah?",
p: [
  "Seremonial tahunan",
  "Simbol penghormatan terhadap perjuangan bangsa",
  "Kegiatan lomba",
  "Tradisi sekolah"
],
j: 1,
},

{
t: "Bendera Merah Putih pertama kali dijahit oleh?",
p: [
  "RA Kartini",
  "Fatmawati",
  "Cut Nyak Dien",
  "Martha Christina Tiahahu"
],
j: 1,
},

{
t: "Peristiwa Rengasdengklok terjadi pada tanggal?",
p: [
  "16 Agustus 1945",
  "15 Agustus 1945",
  "17 Agustus 1945",
  "14 Agustus 1945"
],
j: 0,
},

{
t: "Tujuan peristiwa Rengasdengklok adalah?",
p: [
  "Mengamankan Soekarno-Hatta dari Jepang",
  "Mempercepat proklamasi kemerdekaan",
  "Menghindari konflik internal",
  "Mengatur pemerintahan"
],
j: 1,
},

// 20 tambahan

{
t: "Nilai gotong royong dalam Paskibraka mencerminkan sila?",
p: [
  "Sila ke-1",
  "Sila ke-2",
  "Sila ke-3",
  "Sila ke-5"
],
j: 2,
},

{
t: "Perubahan Piagam Jakarta terjadi pada tanggal?",
p: [
  "17 Agustus 1945",
  "18 Agustus 1945",
  "16 Agustus 1945",
  "19 Agustus 1945"
],
j: 1,
},

{
t: "Makna integritas bagi anggota Paskibraka adalah?",
p: [
  "Konsisten antara perkataan dan tindakan",
  "Menjaga popularitas",
  "Mencari penghargaan",
  "Menghindari tanggung jawab"
],
j: 0,
},

{
t: "Pasal UUD 1945 yang mengatur bela negara adalah?",
p: [
  "Pasal 27 ayat (3)",
  "Pasal 28",
  "Pasal 29",
  "Pasal 31"
],
j: 0,
},

{
t: "Tokoh perumus dasar negara yang menyampaikan konsep negara integralistik adalah?",
p: [
  "Soepomo",
  "Mohammad Yamin",
  "Soekarno",
  "Hatta"
],
j: 0,
},

{
t: "Makna disiplin dalam Paskibraka adalah?",
p: [
  "Taat pada aturan dan waktu",
  "Mengikuti perintah teman",
  "Menghindari tugas",
  "Bersikap bebas"
],
j: 0,
},

{
t: "Lambang negara Indonesia adalah?",
p: [
  "Garuda Pancasila",
  "Burung Rajawali",
  "Garuda Nusantara",
  "Elang Indonesia"
],
j: 0,
},

{
t: "Jumlah bulu pada sayap Garuda melambangkan?",
p: [
  "17",
  "8",
  "45",
  "17 Agustus 1945"
],
j: 3,
},

{
t: "Makna warna merah pada bendera Indonesia adalah?",
p: [
  "Keberanian",
  "Kesucian",
  "Keadilan",
  "Kemakmuran"
],
j: 0,
},

{
t: "Makna warna putih pada bendera Indonesia adalah?",
p: [
  "Kesucian",
  "Kejujuran",
  "Kemakmuran",
  "Persatuan"
],
j: 0,
},

{
t: "Sikap utama yang harus dimiliki Paskibraka saat latihan adalah?",
p: [
  "Kerja sama",
  "Kompetisi berlebihan",
  "Egoisme",
  "Individualisme"
],
j: 0,
},

{
t: "Pembukaan UUD 1945 tidak dapat diubah karena?",
p: [
  "Merupakan norma hukum tertinggi",
  "Memuat dasar negara",
  "Kesepakatan nasional",
  "Semua benar"
],
j: 3,
},

{
t: "Makna persatuan dalam konteks keberagaman Indonesia adalah?",
p: [
  "Menyeragamkan budaya",
  "Menghilangkan perbedaan",
  "Menghargai perbedaan",
  "Mengutamakan mayoritas"
],
j: 2,
},

{
t: "Tujuan pembinaan ideologi Pancasila bagi Paskibraka adalah?",
p: [
  "Meningkatkan wawasan kebangsaan",
  "Menjadi aparat negara",
  "Menjadi pasukan militer",
  "Kegiatan seremonial"
],
j: 0,
},

{
t: "Peraturan BPIP No. 3 Tahun 2022 mengatur tentang?",
p: [
  "Pembentukan Paskibraka",
  "Pembinaan ideologi Pancasila bagi Paskibraka",
  "Upacara bendera",
  "Latihan militer pelajar"
],
j: 1,
},

{
t: "Nilai karakter utama dalam pembentukan Paskibraka adalah?",
p: [
  "Disiplin, tanggung jawab, nasionalisme",
  "Popularitas",
  "Kompetisi",
  "Prestise"
],
j: 0,
},

{
t: "Makna keteladanan bagi Paskibraka adalah?",
p: [
  "Menjadi contoh perilaku positif",
  "Menjadi terkenal",
  "Menjadi pemimpin organisasi",
  "Menjadi juara lomba"
],
j: 0,
},

{
t: "Perilaku yang mencerminkan nasionalisme adalah?",
p: [
  "Menggunakan produk dalam negeri",
  "Menghina budaya lain",
  "Mengutamakan kepentingan pribadi",
  "Menolak perbedaan"
],
j: 0,
},

{
t: "Pengamalan Pancasila harus dilakukan dalam?",
p: [
  "Kehidupan sehari-hari",
  "Upacara saja",
  "Kegiatan resmi saja",
  "Lingkungan sekolah saja"
],
j: 0,
},

{
t: "Paskibraka setelah bertugas diharapkan menjadi?",
p: [
  "Kader pemimpin bangsa berkarakter Pancasila",
  "Petugas upacara sekolah",
  "Anggota militer",
  "Panitia kegiatan"
],
j: 0,
}
];

function mulaiUjian() {
  if (!nama.value || !sekolah.value || !daerah.value)
    return alert("Lengkapi data!");

  localStorage.setItem("nama", nama.value);
  localStorage.setItem("gender", gender.value);
  localStorage.setItem("sekolah", sekolah.value);
  localStorage.setItem("tinggibadan", tinggibadan.value);
  localStorage.setItem("beratbadan", beratbadan.value);
  localStorage.setItem("daerah", daerah.value);

  document.querySelector(".info").classList.add("hidden");
  document.querySelector(".timer").classList.remove("hidden");
  document.querySelector(".progress-box").classList.remove("hidden");
  navSoal.classList.remove("hidden");
  quizForm.classList.remove("hidden");

  mulaiTimer();
  tampilkan();
}

function mulaiTimer() {
  timer = setInterval(() => {
    waktu--;
    time.textContent = `${Math.floor(waktu / 60)}:${String(waktu % 60).padStart(2, "0")}`;
    if (waktu <= 0) {
      waktuHabis = true;
      clearInterval(timer);
      alert("Waktu habis, jawaban dikirim otomatis.");
      kirim();
    }
  }, 1000);
}

function tampilkan() {
  window.scrollTo(0, 0);
  soalContainer.innerHTML = "";
  const start = halaman * perHalaman;

  soal.slice(start, start + perHalaman).forEach((x, i) => {
    const idx = start + i;
    soalContainer.innerHTML += `
    <div class="question">
      <p>${idx + 1}. ${x.t}</p>
      ${x.p
        .map(
          (a, j) => `
        <label>
          <input type="radio" name="q${idx}" value="${j}"
            ${jawaban[idx] === j ? "checked" : ""}>
          ${a}
        </label>`,
        )
        .join("")}
    </div>`;
  });

  nextBtn.textContent =
    start + perHalaman >= soal.length ? "Selesai" : "Berikutnya ➡";

  autoSave();
  updateProgress();
  buatNavigasi();
}

function autoSave() {
  document.querySelectorAll("input[type=radio]").forEach((r) => {
    r.onchange = () => (jawaban[+r.name.replace("q", "")] = +r.value);
  });
}

function berikutnya() {
  if ((halaman + 1) * perHalaman >= soal.length) kirim();
  else {
    halaman++;
    tampilkan();
  }
}

function sebelumnya() {
  if (halaman > 0) {
    halaman--;
    tampilkan();
  }
}

function semuaTerjawab() {
  for (let i = 0; i < soal.length; i++) if (jawaban[i] === undefined) return i;
  return -1;
}

function kirim() {
  if (sudahSubmit) return;

  if (!waktuHabis) {
    const kosong = semuaTerjawab();
    if (kosong !== -1) {
      alert(`Soal ${kosong + 1} belum dijawab`);
      halaman = Math.floor(kosong / perHalaman);
      tampilkan();
      return;
    }

    if (!confirm("Yakin ingin mengakhiri ujian dan mengirim jawaban?")) return;
  }

  sudahSubmit = true;
  clearInterval(timer);
  nextBtn.disabled = true;
  nextBtn.textContent = "Mengirim...";

  let benar = 0;
  soal.forEach((s, i) => jawaban[i] === s.j && benar++);
  const nilai = Math.round((benar / soal.length) * 100);

  localStorage.setItem("nilai", nilai);

  const fd = new FormData();
  fd.append("nama", localStorage.getItem("nama"));
  fd.append("gender", localStorage.getItem("gender"));
  fd.append("sekolah", localStorage.getItem("sekolah"));
  fd.append("tinggibadan", localStorage.getItem("tinggibadan"));
  fd.append("beratbadan", localStorage.getItem("beratbadan"));
  fd.append("daerah", localStorage.getItem("daerah"));
  fd.append("nilai", nilai);

  fetch(API_URL, { method: "POST", body: fd }).finally(
    () => (location.href = "hasil.html"),
  );
}

function updateProgress() {
  const j = Object.keys(jawaban).length;
  progressBar.style.width = `${(j / soal.length) * 100}%`;
  progressText.textContent = `${j} / ${soal.length}`;
}

function buatNavigasi() {
  navSoal.innerHTML = "";
  soal.forEach((_, i) => {
    const b = document.createElement("button");
    b.textContent = i + 1;
    if (jawaban[i] !== undefined) b.classList.add("answered");
    if (Math.floor(i / perHalaman) === halaman) b.classList.add("active");
    b.onclick = () => {
      halaman = Math.floor(i / perHalaman);
      tampilkan();
    };
    navSoal.appendChild(b);
  });
}
