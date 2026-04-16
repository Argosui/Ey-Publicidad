const lugares = document.getElementById("lugares");
const video = document.getElementById("intro-video");
const intro = document.getElementById("intro");

const coordsData = {
  "EYMZT-001": { lat: 23.252028, lng: -106.437417 },
  "EYMZT-003A": { lat: 23.237323, lng: -106.437432 },
  "EYMZT-004A": { lat: 23.246528, lng: -106.43425 },
  "EYMZT-005": { lat: 23.239361, lng: -106.431861 },
  "EYMZT-007": { lat: 23.239667, lng: -106.431639 },
  "EYMZT-008": { lat: 23.240694, lng: -106.446417 },
  "EYMZT-009": { lat: 23.259083, lng: -106.426917 },
  "EYMZT-010": { lat: 23.257278, lng: -106.440722 },
  "EYMZT-012": { lat: 23.238972, lng: -106.431833 },
  "EYMZT-013B": { lat: 23.250722, lng: -106.437028 },
  "EYMZT-014A": { lat: 23.238, lng: -106.438306 },
  "EYMZT-015": { lat: 23.239056, lng: -106.432417 },
  "EYMZT-016A": { lat: 23.239058, lng: -106.432411 },
  "EYMZT-020A": { lat: 23.233563, lng: -106.392315 },
  "EYMZT-021": { lat: 23.24137, lng: -106.421616 },
  "EYMZT-022A": { lat: 23.259983, lng: -106.418071 },
  "EYMZT-027": { lat: 23.22478, lng: -106.420642 },
  "EYMZT-028": { lat: 23.213157, lng: -106.406567 },
  "EYMZT-029A": { lat: 23.258917, lng: -106.404496 },
  "EYMZT-030A": { lat: 23.274928, lng: -106.379549 },
  "EYMZT-031A": { lat: 23.249875, lng: -106.407516 },
};

let map;
let marker;

const images = [
  "assets/images/image1.png",
  "assets/images/image2.png",
  "assets/images/image3.png",
  "assets/images/image4.png",
  "assets/images/image5.png",
  "assets/images/image6.png",
  "assets/images/image7.png",
];

const imagesBus = [
  "assets/images/bus1.jpeg",
  "assets/images/bus2.jpeg",
  "assets/images/bus3.jpeg",
  "assets/images/bus4.jpeg",
  "assets/images/bus5.jpeg",
  "assets/images/bus6.jpeg",
  "assets/images/bus7.jpg",
];



const prev = document.querySelectorAll(".prev");
const next = document.querySelectorAll(".next");


document.querySelectorAll(".carrusel").forEach((carrusel) => {

  let index = 0;

  const img = carrusel.querySelector(".carousel-img");
  const puntos = carrusel.querySelectorAll(".puntos span");
  const prev = carrusel.querySelector(".prev");
  const next = carrusel.querySelector(".next");

  const tipo = carrusel.dataset.type;
  const currentImages = tipo === "camiones" ? imagesBus : images;

  function actualizarCarrusel() {
    img.src = currentImages[index];

    puntos.forEach((punto, i) => {
      punto.classList.toggle("active", i === index);
    });
  }

  if (next) {
    next.addEventListener("click", () => {
      index = (index + 1) % currentImages.length;
      actualizarCarrusel();
    });
  }

  if (prev) {
    prev.addEventListener("click", () => {
      index = (index - 1 + currentImages.length) % currentImages.length;
      actualizarCarrusel();
    });
  }

  puntos.forEach((punto, i) => {
    punto.addEventListener("click", () => {
      index = i;
      actualizarCarrusel();
    });
  });

  actualizarCarrusel();
});

if (video) {
  video.onended = () => {
    intro.classList.add("inactive");

    setTimeout(() => {
      intro.style.display = "none";

      // 🔥 IMPORTANTE: arreglar render del mapa
      
    }, 2500);
  };
}

