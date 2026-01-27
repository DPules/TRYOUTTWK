const API_URL =
  "https://script.google.com/macros/s/AKfycbzT8PXP1Yezln3py5sIjBlPLVPyT_QrRQJrtgCXEP-JTpKyeo6hRcj-xYaS5SdC6XiI/exec";
const perHalaman = 3;
let waktu = 1800;

let halaman = 0;
let timer;
let waktuHabis = false;
let sudahSubmit = false;
let jawaban = {};

const soal = [
  {
    t: "Makna Pancasila sebagai dasar negara paling tepat adalah?",
    p: [
      "Nilai moral masyarakat yang tidak mengikat secara hukum",
      "Landasan normatif yang menjiwai seluruh peraturan perundang-undangan",
      "Pedoman etika bagi penyelenggara negara saja",
      "Kesepakatan politik yang dapat disesuaikan dengan kekuasaan",
    ],
    j: 1,
  },
  {
    t: "Sikap toleransi beragama sesuai sila pertama diwujudkan dengan?",
    p: [
      "Mengikuti seluruh kegiatan keagamaan sebagai bentuk solidaritas",
      "Menghormati ibadah agama lain tanpa mencampuri keyakinannya",
      "Menyamakan semua ajaran agar tidak terjadi konflik",
      "Membatasi ekspresi agama di ruang publik",
    ],
    j: 1,
  },
  {
    t: "Esensi sila kemanusiaan yang adil dan beradab menekankan pada?",
    p: [
      "Kesamaan perlakuan tanpa mempertimbangkan kondisi",
      "Pengakuan martabat manusia dan keadilan proporsional",
      "Kepentingan mayoritas atas minoritas",
      "Pemberian hak tanpa kewajiban",
    ],
    j: 1,
  },
  {
    t: "Sila persatuan Indonesia menolak paham?",
    p: [
      "Nasionalisme terbuka",
      "Primordialisme sempit",
      "Cinta tanah air",
      "Keberagaman budaya",
    ],
    j: 1,
  },
  {
    t: "Musyawarah mufakat dalam sila keempat bertujuan utama untuk?",
    p: [
      "Menyamakan seluruh pendapat",
      "Menghindari konflik secara cepat",
      "Mencapai keputusan terbaik yang dapat diterima bersama",
      "Menjamin suara terbanyak selalu menang",
    ],
    j: 2,
  },
  {
    t: "Keadilan sosial menurut Pancasila berarti?",
    p: [
      "Pemerataan hasil bagi seluruh warga",
      "Keseimbangan hak dan kewajiban dalam kehidupan sosial",
      "Kebebasan ekonomi tanpa campur tangan negara",
      "Kesetaraan mutlak dalam semua aspek",
    ],
    j: 1,
  },
  {
    t: "Pancasila disebut ideologi terbuka karena?",
    p: [
      "Dapat diganti sesuai kepentingan zaman",
      "Nilai dasarnya tetap, pengamalannya dinamis",
      "Tidak memiliki batasan nilai",
      "Mengikuti ideologi global",
    ],
    j: 1,
  },
  {
    t: "Cinta tanah air menurut Pancasila ditunjukkan dengan?",
    p: [
      "Menutup diri dari pengaruh luar",
      "Mengutamakan kepentingan nasional secara bertanggung jawab",
      "Mendukung semua kebijakan tanpa kritik",
      "Mengagungkan simbol tanpa tindakan nyata",
    ],
    j: 1,
  },
  {
    t: "Sikap adil menurut Pancasila berarti?",
    p: [
      "Memperlakukan semua orang sama dalam segala kondisi",
      "Memberikan hak sesuai kewajiban dan kondisi",
      "Mengutamakan kepentingan kelompok sendiri",
      "Menghindari konflik dengan mengalah",
    ],
    j: 1,
  },
  {
    t: "Nilai gotong royong dalam Pancasila paling tepat dimaknai sebagai?",
    p: [
      "Kerja bersama demi kepentingan bersama",
      "Bantuan tanpa tanggung jawab",
      "Kewajiban negara kepada rakyat",
      "Kegiatan sosial sukarela semata",
    ],
    j: 0,
  },

  /* ================= SEJARAH INDONESIA ================= */

  {
    t: "Makna Proklamasi Kemerdekaan Indonesia secara yuridis adalah?",
    p: [
      "Berakhirnya penjajahan Jepang",
      "Pernyataan lahirnya negara yang berdaulat",
      "Pengakuan otomatis dunia internasional",
      "Awal terbentuknya pemerintahan",
    ],
    j: 1,
  },
  {
    t: "Peristiwa Rengasdengklok mencerminkan?",
    p: [
      "Perbedaan pandangan antara golongan muda dan tua",
      "Upaya menunda kemerdekaan",
      "Campur tangan Jepang",
      "Konflik internal bangsa",
    ],
    j: 0,
  },
  {
    t: "Tujuan utama Sumpah Pemuda adalah?",
    p: [
      "Menyatukan budaya Nusantara",
      "Menumbuhkan kesadaran persatuan bangsa",
      "Mempersiapkan kemerdekaan secara militer",
      "Membentuk organisasi pemuda",
    ],
    j: 1,
  },
  {
    t: "Makna satu bahasa dalam Sumpah Pemuda adalah?",
    p: [
      "Menghilangkan bahasa daerah",
      "Menjadikan bahasa Indonesia sebagai pemersatu",
      "Menyamakan budaya nasional",
      "Mewajibkan penggunaan bahasa resmi",
    ],
    j: 1,
  },
  {
    t: "Hari Pahlawan diperingati untuk mengenang?",
    p: [
      "Proklamasi Kemerdekaan",
      "Perlawanan rakyat Surabaya tahun 1945",
      "Pembentukan TNI",
      "Sumpah Pemuda",
    ],
    j: 1,
  },
  {
    t: "Hari Kebangkitan Nasional berkaitan dengan peristiwa?",
    p: [
      "Sumpah Pemuda",
      "Berdirinya Budi Utomo",
      "Proklamasi Kemerdekaan",
      "Peristiwa Rengasdengklok",
    ],
    j: 1,
  },
  {
    t: "Kemerdekaan menurut Pancasila menuntut bangsa Indonesia untuk?",
    p: [
      "Bebas tanpa aturan",
      "Berdaulat dan bertanggung jawab",
      "Menutup diri dari dunia internasional",
      "Mengutamakan kepentingan kelompok",
    ],
    j: 1,
  },
  {
    t: "Tokoh yang membacakan teks Proklamasi adalah?",
    p: [
      "Mohammad Hatta sebagai wakil presiden",
      "Soekarno sebagai presiden",
      "Ahmad Soebardjo sebagai perumus",
      "Sutan Sjahrir sebagai tokoh muda",
    ],
    j: 1,
  },
  {
    t: "Proklamasi memiliki arti politis bahwa?",
    p: [
      "Indonesia bebas dari penjajah Jepang",
      "Indonesia menentukan nasib sendiri",
      "Indonesia diakui PBB",
      "Indonesia memiliki konstitusi",
    ],
    j: 1,
  },
  {
    t: "Perjuangan bangsa Indonesia pasca-proklamasi ditandai dengan?",
    p: [
      "Stabilitas nasional",
      "Upaya mempertahankan kemerdekaan",
      "Pengakuan internasional penuh",
      "Pembangunan ekonomi",
    ],
    j: 1,
  },

  /* ================= SEJARAH PASKIBRAKA ================= */

  {
    t: "Penggagas awal Pasukan Pengibar Bendera Pusaka adalah?",
    p: [
      "Soekarno sebagai Presiden RI",
      "Mohammad Hatta sebagai Wakil Presiden",
      "Husein Mutahar sebagai tokoh kepanduan",
      "Sudirman sebagai Panglima TNI",
    ],
    j: 2,
  },
  {
    t: "Paskibraka pertama kali bertugas pada tahun?",
    p: [
      "1945 sebagai simbol kemerdekaan",
      "1946 setelah pembentukan negara",
      "1947 saat agresi militer",
      "1950 setelah RIS",
    ],
    j: 0,
  },
  {
    t: "Makna formasi 17–8–45 dalam Paskibraka adalah?",
    p: [
      "Hari lahir Pancasila",
      "Tanggal Proklamasi Kemerdekaan Indonesia",
      "Hari Kebangkitan Nasional",
      "Hari Pahlawan",
    ],
    j: 1,
  },
  {
    t: "Nilai utama yang ditanamkan dalam pembinaan Paskibraka adalah?",
    p: [
      "Keterampilan baris-berbaris",
      "Nasionalisme dan kepemimpinan berkarakter Pancasila",
      "Kedisiplinan fisik semata",
      "Prestasi non-akademik",
    ],
    j: 1,
  },
  {
    t: "Peran strategis Paskibraka bagi bangsa Indonesia adalah?",
    p: [
      "Petugas upacara kenegaraan",
      "Kader pemimpin dan teladan nilai Pancasila",
      "Pasukan kehormatan negara",
      "Simbol seremonial kemerdekaan",
    ],
    j: 1,
  },
  {
    t: "Anggota Paskibraka setelah selesai bertugas disebut?",
    p: ["Veteran", "Purna Paskibraka", "Duta Negara", "Kader Nasional"],
    j: 1,
  },
  {
    t: "Pembinaan Paskibraka secara nasional berada di bawah koordinasi?",
    p: [
      "Kementerian Pemuda dan Olahraga",
      "BPIP",
      "TNI",
      "Kementerian Pendidikan",
    ],
    j: 1,
  },
  {
    t: "Sikap disiplin Paskibraka paling tepat diwujudkan melalui?",
    p: [
      "Kepatuhan saat latihan saja",
      "Konsistensi sikap dalam kehidupan sehari-hari",
      "Ketaatan karena pengawasan",
      "Kedisiplinan fisik semata",
    ],
    j: 1,
  },
  {
    t: "Makna pengibaran bendera pusaka bagi Paskibraka adalah?",
    p: [
      "Tugas kehormatan pribadi",
      "Wujud pengabdian kepada bangsa dan negara",
      "Kegiatan seremonial tahunan",
      "Prestasi individu",
    ],
    j: 1,
  },
  {
    t: "Tujuan akhir pembinaan Paskibraka menurut BPIP adalah?",
    p: [
      "Menyiapkan petugas upacara",
      "Membentuk generasi muda berkarakter Pancasila",
      "Mencetak atlet baris-berbaris",
      "Meningkatkan citra institusi",
    ],
    j: 1,
  },

  {
    t: "Implementasi nilai Ketuhanan Yang Maha Esa dalam kehidupan berbangsa menuntut negara untuk?",
    p: [
      "Menentukan satu agama resmi",
      "Menjamin kebebasan beragama tanpa diskriminasi",
      "Membatasi praktik keagamaan tertentu",
      "Mengatur ajaran agama",
    ],
    j: 1,
  },
  {
    t: "Sikap adil dan beradab mengandung makna bahwa manusia harus diperlakukan berdasarkan?",
    p: [
      "Status sosial",
      "Kesamaan mutlak",
      "Martabat dan hak asasi manusia",
      "Kepentingan negara",
    ],
    j: 2,
  },
  {
    t: "Persatuan Indonesia menghendaki integrasi nasional yang dibangun atas dasar?",
    p: [
      "Keseragaman budaya",
      "Dominasi mayoritas",
      "Kesadaran kebangsaan dalam keberagaman",
      "Kesamaan kepentingan ekonomi",
    ],
    j: 2,
  },
  {
    t: "Musyawarah mufakat mengutamakan nilai?",
    p: [
      "Kecepatan pengambilan keputusan",
      "Kemenangan suara terbanyak",
      "Kebijaksanaan dan tanggung jawab bersama",
      "Kepentingan pimpinan",
    ],
    j: 2,
  },
  {
    t: "Keadilan sosial menuntut negara untuk berperan dalam?",
    p: [
      "Pembatasan hak warga negara",
      "Pemerataan kesempatan dan perlindungan kelompok lemah",
      "Penghapusan perbedaan sosial",
      "Liberalisasi ekonomi penuh",
    ],
    j: 1,
  },

  /* === SEJARAH INDONESIA === */
  {
    t: "Proklamasi Kemerdekaan Indonesia memiliki arti revolusioner karena?",
    p: [
      "Dilaksanakan tanpa persiapan",
      "Mengubah status bangsa dari terjajah menjadi merdeka",
      "Dilakukan oleh golongan muda",
      "Didukung Jepang",
    ],
    j: 1,
  },
  {
    t: "Perbedaan pandangan golongan tua dan muda menjelang Proklamasi menunjukkan?",
    p: [
      "Konflik ideologi",
      "Perbedaan strategi perjuangan",
      "Perebutan kekuasaan",
      "Perpecahan bangsa",
    ],
    j: 1,
  },
  {
    t: "Makna historis Sumpah Pemuda bagi perjuangan kemerdekaan adalah?",
    p: [
      "Awal perlawanan bersenjata",
      "Pemersatu gerakan nasional",
      "Pembentukan negara Indonesia",
      "Berakhirnya kolonialisme",
    ],
    j: 1,
  },
  {
    t: "Pertempuran Surabaya 10 November 1945 menunjukkan?",
    p: [
      "Kekuatan militer Indonesia",
      "Semangat heroik mempertahankan kemerdekaan",
      "Kemenangan diplomasi",
      "Pengakuan internasional",
    ],
    j: 1,
  },
  {
    t: "Kemerdekaan Indonesia dicapai melalui perjuangan yang bersifat?",
    p: [
      "Spontan dan individual",
      "Terorganisasi dan berkesinambungan",
      "Diplomatik semata",
      "Bersifat regional",
    ],
    j: 1,
  },

  /* === SEJARAH & NILAI PASKIBRAKA === */
  {
    t: "Paskibraka tidak hanya bersifat seremonial karena memiliki fungsi?",
    p: [
      "Latihan baris-berbaris nasional",
      "Pembinaan karakter dan kepemimpinan pemuda",
      "Kegiatan simbolik tahunan",
      "Agenda pemerintahan",
    ],
    j: 1,
  },
  {
    t: "Nilai kepemimpinan dalam Paskibraka tercermin dari?",
    p: [
      "Kemampuan memberi perintah",
      "Keteladanan sikap dan tanggung jawab",
      "Kekuatan fisik",
      "Posisi dalam formasi",
    ],
    j: 1,
  },
  {
    t: "Makna disiplin bagi anggota Paskibraka adalah?",
    p: [
      "Kepatuhan karena pengawasan",
      "Kesadaran menjalankan tugas dengan tanggung jawab",
      "Ketaatan saat latihan saja",
      "Kewajiban formal",
    ],
    j: 1,
  },
  {
    t: "Formasi Paskibraka melambangkan nilai historis yang berkaitan langsung dengan?",
    p: [
      "Hari lahir Pancasila",
      "Peristiwa Proklamasi",
      "Sumpah Pemuda",
      "Hari Pahlawan",
    ],
    j: 1,
  },
  {
    t: "Peran Purna Paskibraka Indonesia (PPI) dalam masyarakat adalah?",
    p: [
      "Petugas upacara daerah",
      "Pelanjut pembinaan nilai Pancasila",
      "Organisasi eksklusif alumni",
      "Kelompok prestasi non-akademik",
    ],
    j: 1,
  },
  {
    t: "Pembinaan ideologi dalam Paskibraka bertujuan untuk membentuk?",
    p: [
      "Petugas upacara profesional",
      "Generasi muda berkarakter Pancasila",
      "Pemuda berprestasi fisik",
      "Simbol nasionalisme",
    ],
    j: 1,
  },
  {
    t: "Makna pengabdian dalam tugas Paskibraka adalah?",
    p: [
      "Prestasi pribadi",
      "Tanggung jawab moral kepada bangsa dan negara",
      "Penghargaan sosial",
      "Pengalaman seremonial",
    ],
    j: 1,
  },
  {
    t: "Calon Paskibraka dituntut memiliki wawasan kebangsaan agar?",
    p: [
      "Memahami tata upacara",
      "Mampu menjiwai tugas kenegaraan",
      "Menghafal sejarah",
      "Menjadi populer",
    ],
    j: 1,
  },
  {
    t: "Paskibraka dipandang strategis dalam pembangunan bangsa karena?",
    p: [
      "Mewakili simbol negara",
      "Menjadi kader pemimpin masa depan",
      "Memiliki kedisiplinan tinggi",
      "Berperan dalam upacara kenegaraan",
    ],
    j: 1,
  },
  {
    t: "Nilai utama yang harus melekat pada Paskibraka setelah selesai bertugas adalah?",
    p: [
      "Kebanggaan simbolik",
      "Komitmen berkelanjutan terhadap nilai Pancasila",
      "Status sosial",
      "Pengalaman organisasi",
    ],
    j: 1,
  },
];

function mulaiUjian() {
  if (!nama.value || !sekolah.value || !daerah.value)
    return alert("Lengkapi data!");

  localStorage.setItem("nama", nama.value);
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
