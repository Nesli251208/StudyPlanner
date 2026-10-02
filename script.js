/* ===================================
   STUDY PLANNER
   PASTEL GIRL VERSION
=================================== */


// ==================================
// DATA
// ==================================

let jadwal =
    JSON.parse(
        localStorage.getItem("studyJadwal")
    ) || [];


let tugas =
    JSON.parse(
        localStorage.getItem("studyTugas")
    ) || [];


// ==================================
// SIMPAN DATA
// ==================================

function simpanData() {

    localStorage.setItem(
        "studyJadwal",
        JSON.stringify(jadwal)
    );

    localStorage.setItem(
        "studyTugas",
        JSON.stringify(tugas)
    );

}


// ==================================
// NAVIGASI
// ==================================

const menu =
    document.querySelectorAll(".menu");

const halaman =
    document.querySelectorAll(".page");


function bukaHalaman(nama) {

    halaman.forEach(page => {

        page.classList.remove("active");

    });


    const halamanTujuan =
        document.getElementById(nama);


    if (halamanTujuan) {

        halamanTujuan.classList.add("active");

    }


    menu.forEach(item => {

        item.classList.toggle(
            "active",
            item.dataset.page === nama
        );

    });

}


menu.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            bukaHalaman(
                button.dataset.page
            );

        }
    );

});


document
    .querySelectorAll(
        "[data-page]:not(.menu)"
    )
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                bukaHalaman(
                    button.dataset.page
                );

            }
        );

    });


// ==================================
// MODAL
// ==================================

function bukaModal(id) {

    document
        .getElementById(id)
        .classList.add("show");

}


function tutupModal(id) {

    document
        .getElementById(id)
        .classList.remove("show");

}


// Tambah jadwal
document
    .getElementById("tambahJadwal")
    .addEventListener(
        "click",
        () => {

            bukaModal(
                "modalJadwal"
            );

        }
    );


// Tambah tugas
document
    .getElementById("tambahTugas")
    .addEventListener(
        "click",
        () => {

            bukaModal(
                "modalTugas"
            );

        }
    );


// Tombol close
document
    .querySelectorAll("[data-close]")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                tutupModal(
                    button.dataset.close
                );

            }
        );

    });


// Klik area luar modal
document
    .querySelectorAll(".modal")
    .forEach(modal => {

        modal.addEventListener(
            "click",
            event => {

                if (
                    event.target === modal
                ) {

                    modal.classList.remove(
                        "show"
                    );

                }

            }
        );

    });


// ==================================
// JADWAL
// ==================================

const formJadwal =
    document.getElementById(
        "formJadwal"
    );


formJadwal.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        const data = {

            id: Date.now(),

            mapel:
                document
                    .getElementById("mapel")
                    .value
                    .trim(),

            hari:
                document
                    .getElementById("hari")
                    .value,

            jam:
                document
                    .getElementById("jam")
                    .value,

            materi:
                document
                    .getElementById("materi")
                    .value
                    .trim()

        };


        jadwal.push(data);


        simpanData();

        tampilkanJadwal();

        updateDashboard();

        formJadwal.reset();

        tutupModal(
            "modalJadwal"
        );


        tampilkanNotifikasi(
            "Jadwal berhasil ditambahkan! 🌷"
        );

    }
);


// Tampilkan jadwal
function tampilkanJadwal() {

    const tempat =
        document.getElementById(
            "daftarJadwal"
        );


    if (jadwal.length === 0) {

        tempat.innerHTML = `

            <div class="content-card">

                <p class="description">
                    Belum ada jadwal belajar.
                    Yuk tambahkan jadwal pertama kamu! ♡
                </p>

            </div>

        `;

        return;

    }


    tempat.innerHTML =

        jadwal.map(item => `

            <div class="item">

                <div class="item-info">

                    <h3>
                        ${item.mapel}
                    </h3>

                    <p>
                        ${item.hari}
                        •
                        ${item.materi}
                    </p>

                </div>


                <div class="time">
                    ${item.jam}
                </div>


                <button
                    class="delete"
                    onclick="hapusJadwal(${item.id})"
                >
                    ×
                </button>

            </div>

        `).join("");

}


// Hapus jadwal
function hapusJadwal(id) {

    jadwal =
        jadwal.filter(
            item =>
                item.id !== id
        );


    simpanData();

    tampilkanJadwal();

    updateDashboard();


    tampilkanNotifikasi(
        "Jadwal dihapus ♡"
    );

}


// ==================================
// TUGAS
// ==================================

const formTugas =
    document.getElementById(
        "formTugas"
    );


formTugas.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        const data = {

            id: Date.now(),

            nama:
                document
                    .getElementById(
                        "namaTugas"
                    )
                    .value
                    .trim(),

            mapel:
                document
                    .getElementById(
                        "mapelTugas"
                    )
                    .value
                    .trim(),

            deadline:
                document
                    .getElementById(
                        "deadline"
                    )
                    .value,

            selesai: false

        };


        tugas.push(data);


        simpanData();

        tampilkanTugas();

        updateDashboard();

        formTugas.reset();

        tutupModal(
            "modalTugas"
        );


        tampilkanNotifikasi(
            "Tugas berhasil ditambahkan! 🎀"
        );

    }
);


// Tampilkan tugas
function tampilkanTugas() {

    const tempat =
        document.getElementById(
            "daftarTugas"
        );


    if (tugas.length === 0) {

        tempat.innerHTML = `

            <div class="content-card">

                <p class="description">
                    Belum ada tugas.
                    Semua tugas akan muncul di sini. 🌸
                </p>

            </div>

        `;

        return;

    }


    tempat.innerHTML =

        tugas.map(item => `

            <div
                class="item task
                ${item.selesai ? "selesai" : ""}"
            >


                <button

                    class="check
                    ${item.selesai ? "done" : ""}"

                    onclick="
                        selesaikanTugas(${item.id})
                    "
                >

                    ${item.selesai ? "✓" : ""}

                </button>


                <div class="item-info">

                    <h3>
                        ${item.nama}
                    </h3>

                    <p>
                        ${item.mapel}
                    </p>


                    <span class="deadline">

                        Deadline:
                        ${item.deadline}

                    </span>

                </div>


                <button

                    class="delete"

                    onclick="
                        hapusTugas(${item.id})
                    "
                >

                    ×

                </button>


            </div>

        `).join("");

}


// Tandai selesai
function selesaikanTugas(id) {

    const item =
        tugas.find(
            tugasItem =>
                tugasItem.id === id
        );


    if (item) {

        item.selesai =
            !item.selesai;

    }


    simpanData();

    tampilkanTugas();

    updateDashboard();

}


// Hapus tugas
function hapusTugas(id) {

    tugas =
        tugas.filter(
            item =>
                item.id !== id
        );


    simpanData();

    tampilkanTugas();

    updateDashboard();


    tampilkanNotifikasi(
        "Tugas dihapus ♡"
    );

}


// ==================================
// DASHBOARD
// ==================================

function updateDashboard() {

    const selesai =
        tugas.filter(
            item =>
                item.selesai
        ).length;


    document.getElementById(
        "jumlahJadwal"
    ).textContent =
        jadwal.length;


    document.getElementById(
        "jumlahTugas"
    ).textContent =
        tugas.length;


    document.getElementById(
        "jumlahSelesai"
    ).textContent =
        selesai;

}


// ==================================
// NOTIFIKASI
// ==================================

function tampilkanNotifikasi(pesan) {

    const box =
        document.getElementById(
            "notifikasi"
        );


    box.textContent =
        pesan;


    box.classList.add(
        "show"
    );


    setTimeout(
        () => {

            box.classList.remove(
                "show"
            );

        },
        2000
    );

}


// ==================================
// TIMER 25 MENIT
// ==================================

let waktu =
    25 * 60;


let timer = null;


let sedangBerjalan =
    false;


// Tampilkan timer
function tampilkanTimer() {

    const menit =
        Math.floor(
            waktu / 60
        );


    const detik =
        waktu % 60;


    document.getElementById(
        "timerDisplay"
    ).textContent =

        String(menit)
            .padStart(2, "0")

        +

        ":"

        +

        String(detik)
            .padStart(2, "0");

}


// Mulai / jeda
document
    .getElementById(
        "mulaiTimer"
    )
    .addEventListener(
        "click",
        () => {


            if (sedangBerjalan) {

                clearInterval(
                    timer
                );


                sedangBerjalan =
                    false;


                document.getElementById(
                    "mulaiTimer"
                ).textContent =
                    "▶ Lanjut";


                document.getElementById(
                    "timerStatus"
                ).textContent =
                    "Timer dijeda ♡";


                return;

            }


            sedangBerjalan =
                true;


            document.getElementById(
                "mulaiTimer"
            ).textContent =
                "Ⅱ Jeda";


            document.getElementById(
                "timerStatus"
            ).textContent =
                "Sedang belajar... 🌷";


            timer =
                setInterval(
                    () => {


                        waktu--;

                        tampilkanTimer();


                        if (waktu <= 0) {

                            clearInterval(
                                timer
                            );


                            sedangBerjalan =
                                false;


                            document.getElementById(
                                "mulaiTimer"
                            ).textContent =
                                "▶ Mulai";


                            document.getElementById(
                                "timerStatus"
                            ).textContent =
                                "Waktu belajar selesai! 🎀";


                            tampilkanNotifikasi(
                                "Timer selesai! Kamu hebat! ♡"
                            );

                        }

                    },
                    1000
                );

        }
    );


// Reset
document
    .getElementById(
        "resetTimer"
    )
    .addEventListener(
        "click",
        () => {


            clearInterval(
                timer
            );


            waktu =
                25 * 60;


            sedangBerjalan =
                false;


            tampilkanTimer();


            document.getElementById(
                "mulaiTimer"
            ).textContent =
                "▶ Mulai";


            document.getElementById(
                "timerStatus"
            ).textContent =
                "Siap untuk belajar? 🌷";

        }
    );


// ==================================
// SAAT WEBSITE DIBUKA
// ==================================

tampilkanJadwal();

tampilkanTugas();

updateDashboard();

tampilkanTimer();