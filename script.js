const API_URL =
  "https://script.google.com/macros/s/AKfycbw47sIBVyysFCVVJ5dfBWkOfss3_EeFz1mYDJgA2OXODSwpELFeajodblXDC7DH6ODoIw/exec";
const perHalaman = 2;
let waktu = 3600;
// AMBIL ELEMENT DOM
const nama = document.getElementById("nama");
const sekolah = document.getElementById("sekolah");
const gender = document.getElementById("gender");
const tinggibadan = document.getElementById("tinggibadan");
const beratbadan = document.getElementById("beratbadan");
const daerah = document.getElementById("daerah");

const time = document.getElementById("time");
const soalContainer = document.getElementById("soalContainer");
const navSoal = document.getElementById("navSoal");
const quizForm = document.getElementById("quizForm");
const nextBtn = document.getElementById("nextBtn");
const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");
let halaman = 0;
let timer;
let waktuHabis = false;
let sudahSubmit = false;
let jawaban = {};

const soal = [
  {
    t: "Perbedaan gagasan para tokoh dalam sidang pertama BPUPK menjadi kekuatan karena...",
    p: [
      "Mempercepat pengambilan keputusan tanpa debat",
      "Mencerminkan dominasi satu kelompok",
      "Menghasilkan kompromi yang mewakili kepentingan bangsa",
      "Menghindari konflik antar tokoh",
    ],
    j: 2,
    e: "Perbedaan justru menghasilkan kompromi yang mewakili seluruh bangsa.",
    lvl: "hard",
  },
  {
    t: "Makna internasionalisme dalam pidato 1 Juni 1945 adalah...",
    p: [
      "Indonesia tunduk pada negara lain",
      "Nasionalisme dihilangkan",
      "Kepentingan global lebih utama dari nasional",
      "Nasionalisme seimbang dengan nilai kemanusiaan universal",
    ],
    j: 3,
    e: "Internasionalisme menekankan keseimbangan nasionalisme dan kemanusiaan universal.",
    lvl: "hard",
  },
  {
    t: "Jika Pancasila tidak diamalkan dalam kehidupan, dampak yang terjadi adalah...",
    p: [
      "Stabilitas meningkat",
      "Budaya demokrasi berkembang",
      "Krisis moral dan sosial",
      "Kesadaran hukum meningkat",
    ],
    j: 2,
    e: "Tanpa pengamalan, nilai Pancasila tidak berfungsi sehingga terjadi krisis moral.",
    lvl: "hard",
  },
  {
    t: "Pidato 1 Juni 1945 penting karena...",
    p: [
      "Menjadi sumber hukum tertinggi",
      "Menghapus perbedaan pendapat",
      "Memberikan rumusan dasar negara secara sistematis",
      "Menetapkan UUD 1945",
    ],
    j: 2,
    e: "Pidato Soekarno memberikan konsep dasar negara secara sistematis.",
    lvl: "hard",
  },
  {
    t: "Pancasila sebagai ideologi negara berarti...",
    p: [
      "Aturan hukum tertinggi",
      "Pedoman hidup yang dinamis dan terbuka",
      "Simbol persatuan saja",
      "Dasar pembentukan lembaga negara",
    ],
    j: 1,
    e: "Ideologi adalah pedoman hidup yang dinamis, bukan sekadar simbol.",
    lvl: "hard",
  },
  {
    t: "Mematuhi hukum karena takut sanksi menunjukkan kesadaran hukum tingkat...",
    p: ["Tinggi", "Ideologis", "Instrumental", "Kritis"],
    j: 2,
    e: "Level instrumental berarti patuh karena takut hukuman.",
    lvl: "hard",
  },
  {
    t: "Pernyataan yang salah tentang hubungan norma dan hukum adalah...",
    p: [
      "Hukum memiliki sanksi tegas",
      "Semua norma memiliki kekuatan hukum",
      "Norma menjadi dasar hukum",
      "Hukum mengatur masyarakat",
    ],
    j: 1,
    e: "Tidak semua norma menjadi hukum, hanya norma tertentu yang dilegalkan.",
    lvl: "hard",
  },
  {
    t: "Menuntut hak tanpa menjalankan kewajiban menyebabkan...",
    p: [
      "Ketimpangan ekonomi",
      "Ketidakseimbangan sosial",
      "Konflik budaya",
      "Stabilitas nasional",
    ],
    j: 1,
    e: "Hak dan kewajiban harus seimbang untuk menjaga keharmonisan sosial.",
    lvl: "hard",
  },
  {
    t: "Jika suatu peraturan bertentangan dengan Pancasila, maka harus...",
    p: [
      "Tetap dijalankan",
      "Diabaikan",
      "Direvisi atau dibatalkan",
      "Dipertahankan",
    ],
    j: 2,
    e: "Pancasila adalah sumber hukum tertinggi, jadi aturan harus sesuai dengannya.",
    lvl: "hard",
  },
  {
    t: "Tujuan hierarki peraturan perundang-undangan adalah...",
    p: [
      "Membatasi rakyat",
      "Mengatur kekuasaan lembaga",
      "Menjamin keselarasan hukum",
      "Mempercepat pembuatan hukum",
    ],
    j: 2,
    e: "Hierarki memastikan tidak ada aturan yang bertentangan satu sama lain.",
    lvl: "hard",
  },
  {
    t: "Makna Bhinneka Tunggal Ika adalah...",
    p: [
      "Menghilangkan perbedaan",
      "Menyatukan dalam perbedaan",
      "Menyeragamkan budaya",
      "Mengutamakan mayoritas",
    ],
    j: 1,
    e: "Bhinneka Tunggal Ika berarti berbeda-beda tetapi tetap satu.",
    lvl: "hard",
  },
  {
    t: "Dampak utama jika keberagaman tidak dikelola dengan baik adalah...",
    p: [
      "Kerja sama meningkat",
      "Pembangunan cepat",
      "Konflik sosial",
      "Stabilitas meningkat",
    ],
    j: 2,
    e: "Tanpa pengelolaan yang baik, keberagaman dapat memicu konflik.",
    lvl: "hard",
  },
  {
    t: "Nilai gotong royong mencerminkan sila...",
    p: ["Pertama", "Kedua", "Ketiga", "Kelima"],
    j: 2,
    e: "Gotong royong erat dengan persatuan Indonesia (sila ke-3).",
    lvl: "hard",
  },
  {
    t: "Keberagaman sebagai kekuatan bangsa disebut sebagai...",
    p: [
      "Ancaman sosial",
      "Penghambat pembangunan",
      "Modal sosial",
      "Kelemahan negara",
    ],
    j: 2,
    e: "Keberagaman dapat menjadi modal sosial untuk pembangunan.",
    lvl: "hard",
  },
  {
    t: "Sikap terbaik dalam menjaga harmoni keberagaman adalah...",
    p: [
      "Menghindari kelompok lain",
      "Eksklusif pada budaya sendiri",
      "Menghargai perbedaan dan bekerja sama",
      "Mengikuti mayoritas",
    ],
    j: 2,
    e: "Toleransi dan kerja sama adalah kunci harmoni.",
    lvl: "hard",
  },
  {
    t: "Solusi konflik antar suku sesuai nilai Pancasila adalah...",
    p: [
      "Memisahkan wilayah",
      "Penegakan hukum tanpa dialog",
      "Dialog dan gotong royong",
      "Mengutamakan mayoritas",
    ],
    j: 2,
    e: "Pendekatan dialog dan gotong royong mencerminkan nilai Pancasila.",
    lvl: "hard",
  },
  {
    t: "Perubahan rumusan Piagam Jakarta menjadi Pancasila menunjukkan bahwa para pendiri bangsa mengutamakan...",
    p: [
      "Kepentingan golongan tertentu",
      "Persatuan dan kesatuan bangsa",
      "Dominasi mayoritas",
      "Kepentingan internasional",
    ],
    j: 1,
    e: "Perubahan tersebut dilakukan demi menjaga persatuan bangsa.",
    lvl: "hard",
  },
  {
    t: "Nilai ketuhanan dalam Pancasila bersifat inklusif, artinya...",
    p: [
      "Hanya berlaku untuk agama tertentu",
      "Mengutamakan satu keyakinan",
      "Menghormati semua agama dan kepercayaan",
      "Tidak mengatur kehidupan beragama",
    ],
    j: 2,
    e: "Pancasila menjamin kebebasan beragama secara adil.",
    lvl: "hard",
  },
  {
    t: "Jika hukum ditegakkan secara tebang pilih, maka dampaknya adalah...",
    p: [
      "Meningkatkan kepercayaan masyarakat",
      "Menurunkan kesadaran hukum",
      "Memperkuat keadilan sosial",
      "Meningkatkan kepatuhan hukum",
    ],
    j: 1,
    e: "Ketidakadilan hukum membuat masyarakat kehilangan kepercayaan.",
    lvl: "hard",
  },
  {
    t: "Fungsi utama norma sosial dalam masyarakat adalah...",
    p: [
      "Memberikan sanksi hukum",
      "Mengatur perilaku agar tertib",
      "Menentukan kekuasaan",
      "Menggantikan hukum negara",
    ],
    j: 1,
    e: "Norma sosial berfungsi mengatur perilaku agar tercipta keteraturan.",
    lvl: "hard",
  },
  {
    t: "Sikap intoleransi dalam masyarakat bertentangan dengan nilai Pancasila terutama sila...",
    p: [
      "Pertama dan kedua",
      "Kedua dan ketiga",
      "Ketiga dan keempat",
      "Keempat dan kelima",
    ],
    j: 1,
    e: "Intoleransi melanggar nilai kemanusiaan dan persatuan.",
    lvl: "hard",
  },
  {
    t: "Kesadaran hukum yang tinggi ditunjukkan dengan perilaku...",
    p: [
      "Taat karena takut sanksi",
      "Taat karena diawasi",
      "Taat karena memahami pentingnya hukum",
      "Taat karena tekanan sosial",
    ],
    j: 2,
    e: "Kesadaran hukum sejati berasal dari pemahaman, bukan paksaan.",
    lvl: "hard",
  },
  {
    t: "Dalam kehidupan demokrasi, Pancasila berfungsi sebagai...",
    p: [
      "Pembatas kebebasan rakyat",
      "Pedoman dalam mengambil keputusan bersama",
      "Alat kekuasaan pemerintah",
      "Pengganti hukum negara",
    ],
    j: 1,
    e: "Demokrasi Indonesia berlandaskan nilai Pancasila.",
    lvl: "hard",
  },
  {
    t: "Perilaku diskriminasi dalam masyarakat dapat menyebabkan...",
    p: [
      "Persatuan meningkat",
      "Konflik sosial",
      "Kerja sama meningkat",
      "Stabilitas nasional",
    ],
    j: 1,
    e: "Diskriminasi memicu ketidakadilan dan konflik.",
    lvl: "hard",
  },
  {
    t: "Gotong royong dalam masyarakat modern dapat diwujudkan dalam bentuk...",
    p: [
      "Kompetisi antar individu",
      "Kerja sama dalam kegiatan sosial",
      "Dominasi kelompok tertentu",
      "Mengutamakan kepentingan pribadi",
    ],
    j: 1,
    e: "Gotong royong tetap relevan dalam bentuk kerja sama sosial.",
    lvl: "hard",
  },
  {
    t: "Pelanggaran hukum yang dibiarkan akan berdampak pada...",
    p: [
      "Meningkatkan keadilan",
      "Menurunkan wibawa hukum",
      "Meningkatkan kesejahteraan",
      "Memperkuat persatuan",
    ],
    j: 1,
    e: "Jika pelanggaran dibiarkan, hukum kehilangan wibawa.",
    lvl: "hard",
  },
  {
    t: "Salah satu ciri masyarakat yang menjunjung tinggi hukum adalah...",
    p: [
      "Banyaknya pelanggaran hukum",
      "Taat aturan tanpa paksaan",
      "Takut terhadap aparat",
      "Bergantung pada sanksi",
    ],
    j: 1,
    e: "Kesadaran hukum ditunjukkan dengan ketaatan tanpa paksaan.",
    lvl: "hard",
  },
  {
    t: "Mengutamakan musyawarah dalam menyelesaikan masalah mencerminkan sila...",
    p: ["Pertama", "Kedua", "Keempat", "Kelima"],
    j: 2,
    e: "Musyawarah adalah nilai utama dalam sila ke-4.",
    lvl: "hard",
  },
  {
    t: "Keberagaman budaya di Indonesia dapat memperkuat identitas nasional jika...",
    p: [
      "Dihilangkan perbedaannya",
      "Dikelola dengan sikap saling menghargai",
      "Didominasi budaya tertentu",
      "Dibatasi perkembangannya",
    ],
    j: 1,
    e: "Pengelolaan yang baik menjadikan keberagaman sebagai kekuatan.",
    lvl: "hard",
  },
  {
    t: "Jika masyarakat lebih mengutamakan kepentingan pribadi daripada kepentingan umum, maka akan terjadi...",
    p: [
      "Persatuan meningkat",
      "Keadilan sosial terwujud",
      "Disintegrasi sosial",
      "Stabilitas nasional",
    ],
    j: 2,
    e: "Egoisme dapat merusak persatuan dan menimbulkan disintegrasi.",
    lvl: "hard",
  },
  {
    t: "Dalam formasi 17-8-45, jika terjadi kesalahan pada pasukan 8 saat pengibaran, dampak paling krusial adalah...",
    p: [
      "Kesalahan tidak berpengaruh karena bukan pasukan inti",
      "Mengganggu ritme dan keselarasan seluruh rangkaian upacara",
      "Hanya berdampak pada pasukan 45",
      "Tidak mempengaruhi pengibaran bendera",
    ],
    j: 1,
    e: "Pasukan 8 berperan sebagai pengiring, kesalahan akan merusak sinkronisasi.",
    lvl: "hard",
  },
  {
    t: "Jika seorang anggota Paskibraka memiliki kemampuan fisik tinggi tetapi tidak disiplin, maka risiko terbesar adalah...",
    p: [
      "Menjadi pemimpin pasukan",
      "Mengganggu kekompakan tim",
      "Meningkatkan performa individu",
      "Mempercepat latihan",
    ],
    j: 1,
    e: "Disiplin lebih penting dari kemampuan individu dalam tim Paskibraka.",
    lvl: "hard",
  },
  {
    t: "Makna utama dari latihan PBB yang dilakukan secara berulang adalah...",
    p: [
      "Membentuk kekuatan fisik",
      "Menciptakan keseragaman gerakan dan mental kolektif",
      "Melatih kecepatan individu",
      "Mengurangi kesalahan teknis saja",
    ],
    j: 1,
    e: "PBB bertujuan membentuk kekompakan dan kesatuan gerak tim.",
    lvl: "hard",
  },
  {
    t: "Dalam kondisi cuaca buruk saat upacara, sikap yang paling mencerminkan jiwa Paskibraka adalah...",
    p: [
      "Menghentikan tugas demi keselamatan pribadi",
      "Tetap menjalankan tugas dengan penuh tanggung jawab",
      "Menunggu instruksi tanpa inisiatif",
      "Mengurangi standar pelaksanaan",
    ],
    j: 1,
    e: "Tanggung jawab dan dedikasi menjadi nilai utama Paskibraka.",
    lvl: "hard",
  },
  {
    t: "Jika terjadi perbedaan pendapat dalam tim saat latihan, solusi terbaik sesuai nilai Paskibraka adalah...",
    p: [
      "Mengikuti pendapat mayoritas tanpa diskusi",
      "Menyelesaikan dengan musyawarah dan menghargai pendapat",
      "Menyerahkan sepenuhnya ke pelatih",
      "Menghindari konflik",
    ],
    j: 1,
    e: "Musyawarah mencerminkan nilai kebersamaan dan kepemimpinan.",
    lvl: "hard",
  },
  {
    t: "Peran komandan pasukan dalam Paskibraka yang paling penting adalah...",
    p: [
      "Memberikan perintah tanpa koordinasi",
      "Mengatur ritme dan menjaga kekompakan seluruh pasukan",
      "Menggantikan tugas anggota",
      "Menentukan formasi sendiri",
    ],
    j: 1,
    e: "Komandan bertanggung jawab atas koordinasi dan kekompakan.",
    lvl: "hard",
  },
  {
    t: "Jika salah satu anggota melakukan kesalahan saat gladi, sikap tim yang paling tepat adalah...",
    p: [
      "Menyalahkan individu tersebut",
      "Mengabaikan kesalahan",
      "Melakukan evaluasi bersama dan memperbaiki",
      "Mengeluarkan anggota dari tim",
    ],
    j: 2,
    e: "Evaluasi bersama meningkatkan kualitas tim.",
    lvl: "hard",
  },
  {
    t: "Nilai nasionalisme dalam Paskibraka paling tepat ditunjukkan melalui...",
    p: [
      "Mengutamakan prestasi individu",
      "Menjalankan tugas dengan penuh dedikasi untuk negara",
      "Menghindari kesalahan pribadi",
      "Mengikuti aturan tanpa memahami makna",
    ],
    j: 1,
    e: "Nasionalisme tercermin dari dedikasi terhadap tugas negara.",
    lvl: "hard",
  },
  {
    t: "Kegagalan dalam sinkronisasi gerakan Paskibraka biasanya disebabkan oleh...",
    p: [
      "Kurangnya kemampuan fisik",
      "Kurangnya latihan individu",
      "Kurangnya kekompakan dan konsentrasi tim",
      "Kesalahan pelatih",
    ],
    j: 2,
    e: "Sinkronisasi sangat bergantung pada kekompakan tim.",
    lvl: "hard",
  },
  {
    t: "Makna menjadi Paskibraka tidak hanya saat bertugas, tetapi juga setelahnya, yaitu...",
    p: [
      "Menjadi simbol upacara saja",
      "Menjadi teladan dalam kehidupan bermasyarakat",
      "Mengikuti kegiatan seremonial",
      "Mengutamakan kepentingan pribadi",
    ],
    j: 1,
    e: "Nilai Paskibraka harus diterapkan dalam kehidupan sehari-hari.",
    lvl: "hard",
  },
  {
    t: "Faktor utama yang mendorong lahirnya pergerakan nasional Indonesia pada awal abad ke-20 adalah...",
    p: [
      "Kemenangan Jepang atas Rusia",
      "Kebijakan politik etis Belanda",
      "Masuknya budaya Barat",
      "Perlawanan kerajaan tradisional",
    ],
    j: 1,
    e: "Politik etis membuka akses pendidikan yang memicu kesadaran nasional.",
    lvl: "hard",
  },
  {
    t: "Peristiwa Sumpah Pemuda 1928 memiliki makna penting karena...",
    p: [
      "Mengakhiri penjajahan Belanda",
      "Menyatukan berbagai organisasi pemuda dalam satu identitas bangsa",
      "Membentuk pemerintahan Indonesia",
      "Memulai perlawanan fisik terhadap penjajah",
    ],
    j: 1,
    e: "Sumpah Pemuda menegaskan satu bangsa, satu tanah air, dan satu bahasa.",
    lvl: "hard",
  },
  {
    t: "Perbedaan utama antara BPUPK dan PPKI adalah...",
    p: [
      "BPUPK dibentuk Jepang, PPKI dibentuk Indonesia",
      "BPUPK bertugas merumuskan, PPKI mengesahkan dan mempersiapkan kemerdekaan",
      "BPUPK lebih berkuasa dari PPKI",
      "PPKI tidak memiliki peran penting",
    ],
    j: 1,
    e: "BPUPK merumuskan dasar negara, PPKI mengesahkan dan menjalankan.",
    lvl: "hard",
  },
  {
    t: "Peristiwa Rengasdengklok menunjukkan bahwa...",
    p: [
      "Golongan tua menolak kemerdekaan",
      "Golongan muda ingin mempercepat proklamasi tanpa campur tangan Jepang",
      "Jepang mendukung kemerdekaan Indonesia",
      "Tidak ada perbedaan pendapat",
    ],
    j: 1,
    e: "Golongan muda mendesak proklamasi segera dilaksanakan.",
    lvl: "hard",
  },
  {
    t: "Makna Proklamasi Kemerdekaan Indonesia bagi bangsa Indonesia adalah...",
    p: [
      "Akhir dari perjuangan",
      "Awal terbentuknya negara merdeka dan berdaulat",
      "Pengakuan internasional langsung",
      "Pembentukan pemerintahan kolonial baru",
    ],
    j: 1,
    e: "Proklamasi adalah awal berdirinya negara Indonesia.",
    lvl: "hard",
  },
  {
    t: "Salah satu faktor internal yang menyebabkan runtuhnya VOC adalah...",
    p: [
      "Serangan kerajaan Nusantara",
      "Korupsi dan manajemen yang buruk",
      "Persaingan dengan Inggris",
      "Krisis ekonomi global",
    ],
    j: 1,
    e: "Korupsi dan buruknya pengelolaan menyebabkan kebangkrutan VOC.",
    lvl: "hard",
  },
  {
    t: "Tujuan utama sistem tanam paksa (Cultuurstelsel) adalah...",
    p: [
      "Mensejahterakan rakyat Indonesia",
      "Mengisi kas Belanda yang kosong",
      "Meningkatkan produksi lokal",
      "Membantu petani Indonesia",
    ],
    j: 1,
    e: "Tanam paksa bertujuan mengisi kas Belanda setelah krisis ekonomi.",
    lvl: "hard",
  },
  {
    t: "Perlawanan rakyat Indonesia terhadap penjajah pada abad ke-19 umumnya mengalami kegagalan karena...",
    p: [
      "Kurangnya semangat juang",
      "Tidak adanya persatuan dan koordinasi nasional",
      "Persenjataan lengkap penjajah",
      "Kurangnya pemimpin",
    ],
    j: 1,
    e: "Perlawanan bersifat kedaerahan sehingga mudah dipatahkan.",
    lvl: "hard",
  },
  {
    t: "Peran Jepang dalam kemerdekaan Indonesia dapat dianalisis sebagai...",
    p: [
      "Sepenuhnya membantu Indonesia",
      "Tidak berpengaruh sama sekali",
      "Memberi peluang sekaligus tekanan bagi kemerdekaan",
      "Menghambat seluruh proses kemerdekaan",
    ],
    j: 2,
    e: "Jepang memberi peluang melalui organisasi, tetapi tetap memiliki kepentingan sendiri.",
    lvl: "hard",
  },
  {
    t: "Konferensi Meja Bundar (KMB) memiliki dampak penting bagi Indonesia yaitu...",
    p: [
      "Pengakuan kedaulatan secara penuh dari Belanda",
      "Kembali ke bentuk negara kesatuan",
      "Pembentukan pemerintahan kolonial baru",
      "Penghapusan semua hutang Indonesia",
    ],
    j: 0,
    e: "KMB menghasilkan pengakuan kedaulatan Indonesia oleh Belanda.",
    lvl: "hard",
  },
];

function mulaiUjian() {
  if (
    !nama.value ||
    !sekolah.value ||
    !gender.value ||
    !tinggibadan.value ||
    !beratbadan.value ||
    !daerah.value
  ) {
    alert("Harap lengkapi semua data terlebih dahulu!");
    return;
  }

  if (tinggibadan.value < 140 || beratbadan.value < 30) {
    alert("Data fisik tidak masuk akal, cek kembali!");
    return;
  }

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
    r.onchange = () => {
      jawaban[+r.name.replace("q", "")] = +r.value;

      // highlight pilihan
      r.parentElement.style.background = "#ffe0e0";
    };
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
