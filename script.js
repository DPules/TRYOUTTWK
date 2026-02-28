const API_URL =
  "https://script.google.com/macros/s/AKfycbwuvrXFMQgGrjhGQ-dD_vo0v2W_P5lCUd7SaY_x82JNCl5wxC2985_bsAo1o5wrTJM/exec";
const perHalaman = 3;
let waktu = 1200;

let halaman = 0;
let timer;
let waktuHabis = false;
let sudahSubmit = false;
let jawaban = {};

const soal = [
  {
    t: "Pancasila ditetapkan sebagai dasar negara pada tanggal ....",
    p: [
      "1 Juni 1945",
      "22 Juni 1945",
      "17 Agustus 1945",
      "18 Agustus 1945",
      "20 Agustus 1945",
    ],
    j: 3,
  },
  {
    t: "Tokoh yang pertama kali mengusulkan istilah Pancasila adalah ....",
    p: [
      "Mohammad Hatta",
      "Soepomo",
      "Ir. Soekarno",
      "Mohammad Yamin",
      "Ahmad Soebardjo",
    ],
    j: 2,
  },
  {
    t: "Pancasila sebagai pandangan hidup bangsa berarti ....",
    p: [
      "Dasar hukum negara",
      "Pedoman hidup masyarakat",
      "Sumber kekuasaan negara",
      "Peraturan tertulis negara",
      "Dasar ekonomi negara",
    ],
    j: 1,
  },
  {
    t: "Rumusan Pancasila terdapat dalam Pembukaan UUD 1945 alinea ke ....",
    p: ["Pertama", "Kedua", "Ketiga", "Keempat", "Kelima"],
    j: 3,
  },
  {
    t: "Pancasila sebagai ideologi negara bersifat ....",
    p: ["Tertutup", "Kaku", "Terbuka", "Mutlak", "Terbatas"],
    j: 2,
  },
  {
    t: "BPUPKI dibentuk pada tahun ....",
    p: ["1943", "1944", "1945", "1946", "1947"],
    j: 2,
  },
  {
    t: "Sidang pertama BPUPKI membahas tentang ....",
    p: ["Bentuk negara", "Dasar negara", "UUD", "Kabinet", "Ekonomi"],
    j: 1,
  },
  {
    t: "Panitia Sembilan menghasilkan ....",
    p: [
      "UUD 1945",
      "Proklamasi",
      "Piagam Jakarta",
      "Dekrit Presiden",
      "Konstitusi RIS",
    ],
    j: 2,
  },
  {
    t: "Konstitusi negara Indonesia saat ini adalah ....",
    p: [
      "UUDS 1950",
      "Konstitusi RIS",
      "UUD 1945",
      "UUD 1949",
      "Piagam Jakarta",
    ],
    j: 2,
  },
  {
    t: "Konstitusi berarti ....",
    p: [
      "Peraturan pemerintah",
      "Hukum dasar negara",
      "Undang-undang biasa",
      "Keputusan presiden",
      "Peraturan daerah",
    ],
    j: 1,
  },
  {
    t: "UUD 1945 disahkan oleh ....",
    p: ["BPUPKI", "PPKI", "MPR", "DPR", "Presiden"],
    j: 1,
  },
  {
    t: "Lembaga yang berwenang mengubah UUD 1945 adalah ....",
    p: ["DPR", "Presiden", "MA", "MPR", "MK"],
    j: 3,
  },
  {
    t: "Pembukaan UUD 1945 tidak dapat diubah karena ....",
    p: [
      "Merupakan kesepakatan rakyat",
      "Memuat dasar negara",
      "Berisi sejarah",
      "Memuat hukum",
      "Tidak penting",
    ],
    j: 1,
  },
  {
    t: "Pasal-pasal UUD 1945 dapat diubah melalui ....",
    p: [
      "Sidang DPR",
      "Sidang Presiden",
      "Sidang MPR",
      "Sidang MA",
      "Sidang MK",
    ],
    j: 2,
  },
  {
    t: "Salah satu fungsi konstitusi adalah ....",
    p: [
      "Membatasi kekuasaan pemerintah",
      "Mengatur pajak",
      "Mengatur perdagangan",
      "Mengatur sekolah",
      "Mengatur budaya",
    ],
    j: 0,
  },
  {
    t: "Pancasila sebagai dasar negara digunakan untuk ....",
    p: [
      "Pedoman hukum nasional",
      "Mengatur ekonomi dunia",
      "Mengatur budaya asing",
      "Mengatur perdagangan internasional",
      "Mengatur organisasi masyarakat",
    ],
    j: 0,
  },
  {
    t: "Ideologi terbuka berarti ....",
    p: [
      "Tidak memiliki nilai",
      "Dapat menyesuaikan perkembangan",
      "Tidak tetap",
      "Berubah setiap saat",
      "Tidak memiliki aturan",
    ],
    j: 1,
  },
  {
    t: "UUD 1945 pertama kali berlaku pada tahun ....",
    p: ["1944", "1945", "1946", "1947", "1948"],
    j: 1,
  },
  {
    t: "Tujuan negara Indonesia terdapat pada Pembukaan UUD 1945 alinea ....",
    p: ["Pertama", "Kedua", "Ketiga", "Keempat", "Kelima"],
    j: 3,
  },
  {
    t: "Salah satu tujuan negara Indonesia adalah ....",
    p: [
      "Menguasai dunia",
      "Melindungi segenap bangsa Indonesia",
      "Mengembangkan budaya asing",
      "Mencari keuntungan negara",
      "Menguasai perdagangan dunia",
    ],
    j: 1,
  },
];

function mulaiUjian() {
  if (!nama.value || !sekolah.value || !daerah.value)
    return alert("Lengkapi data!");

  localStorage.setItem("nama", nama.value);
  localStorage.setItem("sekolah", sekolah.value);
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
  fd.append("sekolah", localStorage.getItem("sekolah"));
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
