const API_URL =
  "https://script.google.com/macros/s/AKfycbw47sIBVyysFCVVJ5dfBWkOfss3_EeFz1mYDJgA2OXODSwpELFeajodblXDC7DH6ODoIw/exec";
const perHalaman = 3;
let waktu = 1800;

let halaman = 0;
let timer;
let waktuHabis = false;
let sudahSubmit = false;
let jawaban = {};

const soal = [
  {
    t: "Pancasila sebagai dasar negara memiliki fungsi utama sebagai …",
    p: [
      "Pedoman hidup masyarakat",
      "Dasar penyelenggaraan negara",
      "Sumber budaya bangsa",
      "Simbol negara",
    ],
    j: 1,
    e: "Pancasila menjadi dasar dalam penyelenggaraan negara, termasuk pembentukan hukum dan kebijakan.",
  },
  {
    t: "Nilai dasar Pancasila bersifat tetap karena …",
    p: [
      "Dapat diubah oleh pemerintah",
      "Menjadi hasil kesepakatan sementara",
      "Merupakan prinsip fundamental bangsa",
      "Disesuaikan dengan zaman",
    ],
    j: 2,
    e: "Nilai dasar bersifat tetap karena merupakan hasil konsensus nasional yang menjadi identitas bangsa.",
  },
  {
    t: "Konstitusi negara Indonesia adalah …",
    p: ["UUD 1945", "Tap MPR", "UU", "Perpres"],
    j: 0,
    e: "UUD 1945 merupakan hukum dasar tertinggi di Indonesia.",
  },
  {
    t: "Kedaulatan berada di tangan rakyat dan dilaksanakan menurut UUD tercantum dalam …",
    p: ["Pasal 1 ayat 2", "Pasal 2 ayat 1", "Pasal 3 ayat 2", "Pasal 4 ayat 1"],
    j: 0,
    e: "Pasal 1 ayat (2) UUD 1945 menegaskan kedaulatan rakyat.",
  },
  {
    t: "Tujuan negara Indonesia dalam aspek internasional adalah …",
    p: [
      "Menguasai negara lain",
      "Ikut melaksanakan ketertiban dunia",
      "Memperluas wilayah",
      "Meningkatkan kekuatan militer",
    ],
    j: 1,
    e: "Tujuan ini tercantum dalam Pembukaan UUD 1945 alinea ke-4.",
  },
  {
    t: "Makna sila kedua Pancasila adalah …",
    p: [
      "Keadilan sosial",
      "Kemanusiaan yang adil dan beradab",
      "Persatuan bangsa",
      "Demokrasi",
    ],
    j: 1,
    e: "Sila kedua menekankan penghormatan terhadap hak asasi manusia.",
  },
  {
    t: "Peran Mahkamah Konstitusi adalah …",
    p: [
      "Mengadili pelanggaran HAM",
      "Menguji undang-undang terhadap UUD",
      "Mengawasi presiden",
      "Membuat undang-undang",
    ],
    j: 1,
    e: "MK berwenang melakukan judicial review terhadap UU.",
  },
  {
    t: "Negara Kesatuan Republik Indonesia (NKRI) berarti …",
    p: [
      "Negara berbentuk federasi",
      "Negara dengan sistem kerajaan",
      "Negara yang tidak terbagi-bagi",
      "Negara yang dipimpin presiden saja",
    ],
    j: 2,
    e: "NKRI adalah negara kesatuan, bukan federal.",
  },
  {
    t: "Ancaman terhadap integrasi nasional dapat berasal dari …",
    p: ["Perbedaan pendapat", "Radikalisme", "Pendidikan", "Kerjasama"],
    j: 1,
    e: "Radikalisme dapat memecah persatuan bangsa.",
  },
  {
    t: "Makna patriotisme adalah …",
    p: [
      "Cinta tanah air dan rela berkorban",
      "Mencari keuntungan pribadi",
      "Menghindari konflik",
      "Menolak budaya asing",
    ],
    j: 0,
    e: "Patriotisme adalah sikap rela berkorban demi bangsa.",
  },
  {
    t: "Sikap bela negara dapat diwujudkan dengan …",
    p: [
      "Menghindari kewajiban",
      "Menaati hukum",
      "Melawan pemerintah",
      "Mengabaikan aturan",
    ],
    j: 1,
    e: "Bela negara dapat dilakukan dengan taat hukum dan berkontribusi positif.",
  },
  {
    t: "Semboyan Bhinneka Tunggal Ika berarti …",
    p: [
      "Bersatu kita teguh",
      "Berbeda-beda tetapi tetap satu",
      "Persatuan bangsa",
      "Keanekaragaman budaya",
    ],
    j: 1,
    e: "Maknanya adalah persatuan dalam keberagaman.",
  },
  {
    t: "Salah satu faktor penghambat integrasi nasional adalah …",
    p: ["Toleransi", "Fanatisme sempit", "Gotong royong", "Persatuan"],
    j: 1,
    e: "Fanatisme sempit dapat memicu konflik sosial.",
  },
  {
    t: "Peran pemuda dalam pembangunan nasional adalah …",
    p: [
      "Menjadi penonton",
      "Berpartisipasi aktif",
      "Menghindari tanggung jawab",
      "Mengkritik tanpa solusi",
    ],
    j: 1,
    e: "Pemuda adalah agen perubahan dalam pembangunan.",
  },
  {
    t: "Demokrasi Pancasila mengutamakan …",
    p: [
      "Kekuasaan mayoritas",
      "Musyawarah mufakat",
      "Kebebasan mutlak",
      "Dominasi pemerintah",
    ],
    j: 1,
    e: "Demokrasi Indonesia menekankan musyawarah.",
  },
  {
    t: "Hak asasi manusia di Indonesia dijamin dalam …",
    p: ["UUD 1945", "UU saja", "Perpres", "Tap MPR"],
    j: 0,
    e: "HAM dijamin dalam UUD 1945 pasal 28A–28J.",
  },
  {
    t: "Tujuan pendidikan nasional adalah …",
    p: [
      "Meningkatkan ekonomi",
      "Mengembangkan potensi manusia",
      "Menguasai teknologi",
      "Meningkatkan kekuasaan",
    ],
    j: 1,
    e: "Tujuan pendidikan untuk mencerdaskan kehidupan bangsa.",
  },
  {
    t: "Perilaku toleransi ditunjukkan dengan …",
    p: [
      "Menghormati perbedaan",
      "Memaksakan kehendak",
      "Menolak budaya lain",
      "Menghindari interaksi",
    ],
    j: 0,
    e: "Toleransi berarti menghargai perbedaan.",
  },
  {
    t: "Gotong royong mencerminkan nilai …",
    p: ["Individualisme", "Persatuan", "Egoisme", "Kompetisi"],
    j: 1,
    e: "Gotong royong memperkuat persatuan bangsa.",
  },
  {
    t: "Globalisasi menuntut generasi muda untuk …",
    p: [
      "Menolak perubahan",
      "Adaptif dan selektif",
      "Menghindari teknologi",
      "Menutup diri",
    ],
    j: 1,
    e: "Generasi muda harus mampu menyaring pengaruh global.",
  },

  // (lanjut sampai 50)

  {
    t: "Salah satu bentuk ancaman non-militer adalah …",
    p: ["Invasi militer", "Hoaks", "Perang", "Serangan fisik"],
    j: 1,
    e: "Hoaks dapat memecah belah masyarakat.",
  },
  {
    t: "Nilai keadilan sosial berarti …",
    p: [
      "Semua orang sama",
      "Perlakuan adil bagi seluruh rakyat",
      "Kekayaan merata",
      "Tanpa perbedaan",
    ],
    j: 1,
    e: "Keadilan sosial berarti perlakuan yang adil.",
  },
  {
    t: "Sikap nasionalisme ditunjukkan dengan …",
    p: [
      "Mencintai produk dalam negeri",
      "Menolak budaya luar",
      "Menghindari interaksi",
      "Menyendiri",
    ],
    j: 0,
    e: "Nasionalisme berarti mencintai bangsa sendiri.",
  },
  {
    t: "Peran media sosial seharusnya …",
    p: [
      "Menyebarkan hoaks",
      "Menyebarkan informasi positif",
      "Mencari konflik",
      "Menyebarkan kebencian",
    ],
    j: 1,
    e: "Media sosial harus digunakan secara bijak.",
  },
  {
    t: "Paskibraka berperan sebagai …",
    p: ["Simbol negara", "Duta Pancasila", "Pemimpin daerah", "Pejabat negara"],
    j: 1,
    e: "Paskibraka menjadi teladan nilai Pancasila.",
  },
  {
    t: "Disiplin berarti …",
    p: [
      "Kebebasan bertindak",
      "Taat aturan",
      "Bebas tanpa batas",
      "Mengikuti keinginan",
    ],
    j: 1,
    e: "Disiplin adalah ketaatan pada aturan.",
  },
  {
    t: "Persatuan bangsa penting untuk …",
    p: [
      "Kekuatan negara",
      "Kekuasaan pemerintah",
      "Dominasi kelompok",
      "Kepentingan pribadi",
    ],
    j: 0,
    e: "Persatuan memperkuat negara.",
  },
  {
    t: "Musyawarah bertujuan untuk …",
    p: [
      "Mencari kemenangan",
      "Mencapai mufakat",
      "Menghindari konflik",
      "Mengikuti mayoritas",
    ],
    j: 1,
    e: "Musyawarah untuk mencapai kesepakatan bersama.",
  },
  {
    t: "Sikap yang mencerminkan Pancasila adalah …",
    p: ["Toleransi", "Egoisme", "Diskriminasi", "Individualisme"],
    j: 0,
    e: "Toleransi sesuai nilai Pancasila.",
  },
  {
    t: "Ancaman terhadap ideologi negara adalah …",
    p: ["Radikalisme", "Pendidikan", "Budaya", "Tradisi"],
    j: 0,
    e: "Radikalisme dapat merusak ideologi negara.",
  },
  {
    t: "Makna warna putih pada bendera Merah Putih adalah …",
    p: ["Keberanian", "Kesucian dan kejujuran", "Kemakmuran", "Kekuatan"],
    j: 1,
    e: "Warna putih melambangkan kesucian, kejujuran, dan niat baik.",
  },
  {
    t: "Pengibaran bendera setengah tiang dilakukan sebagai bentuk …",
    p: ["Perayaan", "Penghormatan", "Berkabung", "Simbol kemenangan"],
    j: 2,
    e: "Setengah tiang menandakan suasana duka atau berkabung nasional.",
  },
  {
    t: "Sikap hormat saat bendera dikibarkan mencerminkan nilai …",
    p: ["Individualisme", "Nasionalisme", "Egoisme", "Materialisme"],
    j: 1,
    e: "Menghormati bendera menunjukkan rasa cinta tanah air.",
  },
  {
    t: "Ukuran bendera yang digunakan harus sesuai aturan karena mencerminkan …",
    p: [
      "Kedisiplinan dan ketertiban",
      "Kebebasan individu",
      "Kreativitas",
      "Kemewahan",
    ],
    j: 0,
    e: "Ketaatan terhadap aturan bendera menunjukkan disiplin sebagai warga negara.",
  },
  {
    t: "Tindakan mencoret bendera negara merupakan pelanggaran karena …",
    p: [
      "Tidak sopan",
      "Melanggar hukum dan nilai nasionalisme",
      "Hanya masalah estetika",
      "Tidak penting",
    ],
    j: 1,
    e: "Bendera adalah simbol negara yang harus dihormati dan dilindungi.",
  },
  {
    t: "Mengibarkan bendera pada hari kemerdekaan merupakan bentuk …",
    p: [
      "Kebiasaan",
      "Simbol budaya",
      "Rasa cinta tanah air",
      "Kegiatan formal",
    ],
    j: 2,
    e: "Hal ini menunjukkan rasa nasionalisme dan penghargaan terhadap perjuangan bangsa.",
  },
  {
    t: "Menjaga kebersihan lingkungan sekolah mencerminkan sila …",
    p: ["Pertama", "Kedua", "Ketiga", "Kelima"],
    j: 3,
    e: "Sila ke-5 tentang keadilan sosial termasuk menjaga lingkungan bersama.",
  },
  {
    t: "Menghargai teman yang berbeda agama merupakan penerapan sila …",
    p: ["Pertama", "Kedua", "Ketiga", "Keempat"],
    j: 0,
    e: "Sila pertama mengajarkan toleransi antar umat beragama.",
  },
  {
    t: "Ikut kerja bakti di lingkungan rumah mencerminkan nilai …",
    p: ["Egoisme", "Gotong royong", "Individualisme", "Kompetisi"],
    j: 1,
    e: "Gotong royong merupakan nilai penting dalam Pancasila.",
  },
  {
    t: "Tidak mencontek saat ujian adalah penerapan nilai …",
    p: ["Kejujuran", "Keberanian", "Persatuan", "Kedisiplinan"],
    j: 0,
    e: "Kejujuran adalah bagian dari moral Pancasila.",
  },
  {
    t: "Membantu teman yang kesulitan belajar mencerminkan sila …",
    p: ["Pertama", "Kedua", "Ketiga", "Keempat"],
    j: 1,
    e: "Sila kedua menekankan sikap kemanusiaan dan saling membantu.",
  },
  {
    t: "Mengutamakan musyawarah dalam memilih ketua kelas mencerminkan sila …",
    p: ["Kedua", "Ketiga", "Keempat", "Kelima"],
    j: 2,
    e: "Sila keempat berkaitan dengan demokrasi dan musyawarah.",
  },
  {
    t: "Menggunakan produk dalam negeri sebagai bentuk …",
    p: ["Modernisasi", "Nasionalisme", "Globalisasi", "Kompetisi"],
    j: 1,
    e: "Mencintai produk lokal adalah bentuk cinta tanah air.",
  },
  {
    t: "Menghormati upacara bendera menunjukkan sikap …",
    p: [
      "Biasa saja",
      "Acuh tak acuh",
      "Nasionalisme dan disiplin",
      "Kebebasan",
    ],
    j: 2,
    e: "Upacara adalah simbol penghormatan kepada negara.",
  },
  {
    t: "Tidak membeda-bedakan teman mencerminkan sila …",
    p: ["Pertama", "Kedua", "Ketiga", "Kelima"],
    j: 1,
    e: "Sila kedua menekankan persamaan derajat manusia.",
  },
  {
    t: "Menjaga persatuan di sekolah mencerminkan sila …",
    p: ["Kedua", "Ketiga", "Keempat", "Kelima"],
    j: 1,
    e: "Sila ketiga menekankan persatuan Indonesia.",
  },
  {
    t: "Bersikap adil kepada teman merupakan penerapan sila …",
    p: ["Kedua", "Ketiga", "Keempat", "Kelima"],
    j: 3,
    e: "Sila kelima berbicara tentang keadilan sosial.",
  },
  {
    t: "Menghormati guru merupakan contoh penerapan nilai …",
    p: [
      "Kesopanan dan kemanusiaan",
      "Egoisme",
      "Individualisme",
      "Materialisme",
    ],
    j: 0,
    e: "Menghormati guru mencerminkan nilai kemanusiaan.",
  },
  {
    t: "Mengikuti aturan sekolah mencerminkan …",
    p: ["Kebebasan", "Kedisiplinan", "Kreativitas", "Persaingan"],
    j: 1,
    e: "Kedisiplinan penting dalam kehidupan berbangsa.",
  },
  {
    t: "Tidak menyebarkan hoaks di media sosial merupakan bentuk …",
    p: [
      "Nasionalisme dan tanggung jawab",
      "Kebebasan berekspresi",
      "Kritik sosial",
      "Kompetisi",
    ],
    j: 0,
    e: "Menjaga informasi yang benar adalah tanggung jawab warga negara.",
  },
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
  localStorage.setItem("jawabanUser", JSON.stringify(jawaban));
  localStorage.setItem("bankSoal", JSON.stringify(soal));

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
