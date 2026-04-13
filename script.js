
const lugares = document.getElementById("lugares");
const video = document.getElementById("intro-video");
const intro = document.getElementById("intro");

const coordsData = {
  "EYMZT-001": { lat: 23.252028, lng: -106.437417 },
  "EYMZT-003A": { lat: 23.237323, lng: -106.437432 },
  "EYMZT-004A": { lat: 23.246528, lng: -106.434250 },
  "EYMZT-005": { lat: 23.239361, lng: -106.431861 },
  "EYMZT-007": { lat: 23.239667, lng: -106.431639 },
  "EYMZT-008": { lat: 23.240694, lng: -106.446417 },
  "EYMZT-009": { lat: 23.259083, lng: -106.426917 },
  "EYMZT-010": { lat: 23.257278, lng: -106.440722 },
  "EYMZT-012": { lat: 23.238972, lng: -106.431833 },
  "EYMZT-013B": { lat: 23.250722, lng: -106.437028 },
  "EYMZT-014A": { lat: 23.238000, lng: -106.438306 },
  "EYMZT-015": { lat: 23.239056, lng: -106.432417 },
  "EYMZT-016A": { lat: 23.239058, lng: -106.432411 },
  "EYMZT-020A": { lat: 23.233563, lng: -106.392315 },
  "EYMZT-021": { lat: 23.241370, lng: -106.421616 },
  "EYMZT-022A": { lat: 23.259983, lng: -106.418071 },
  "EYMZT-027": { lat: 23.224780, lng: -106.420642 },
  "EYMZT-028": { lat: 23.213157, lng: -106.406567 },
  "EYMZT-029A": { lat: 23.258917, lng: -106.404496 },
  "EYMZT-030A": { lat: 23.274928, lng: -106.379549 },
  "EYMZT-031A": { lat: 23.249875, lng: -106.407516 }
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
  "assets/images/image7.png"
];

let index = 0;

const img = document.getElementById("carousel-img");
const puntos = document.querySelectorAll(".puntos span");

const prev = document.querySelector(".prev");
const next = document.querySelector(".next");

function actualizarCarrusel() {
  img.src = images[index];

  puntos.forEach((punto, i) => {
    punto.classList.toggle("active", i === index);
  });
}

// Botón siguiente
next.addEventListener("click", () => {
  index = (index + 1) % images.length;
  actualizarCarrusel();
});

// Botón anterior
prev.addEventListener("click", () => {
  index = (index - 1 + images.length) % images.length;
  actualizarCarrusel();
});

// Click en puntos
puntos.forEach((punto, i) => {
  punto.addEventListener("click", () => {
    index = i;
    actualizarCarrusel();
  });
});

if (video) {
  video.onended = () => {
    intro.classList.add("inactive");

    setTimeout(() => {
      intro.style.display = "none";

      // 🔥 IMPORTANTE: arreglar render del mapa
      if (map) {
        google.maps.event.trigger(map, "resize");
        map.setCenter({ lat: 25.1721, lng: -107.4795 });
      }

    }, 2500);
  };
}


window.initMap = function () {
  const ubicacionInicial = { lat: 25.1721, lng: -107.4795 };

  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 7,
    center: ubicacionInicial,
  });

  marker = new google.maps.Marker({
    position: ubicacionInicial,
    map: map,
  });

  Object.entries(coordsData).forEach(([id,coords]) => { 
    marker = new google.maps.Marker({
      position: coords,
      map: map,
      title: id
    });
  });



};


if (lugares) {
  lugares.addEventListener("click", (e) => {
    if (!map) return;

    const boton = e.target.closest("[data-lat]");
    if (!boton) return;

    const lat = parseFloat(boton.dataset.lat);
    const lng = parseFloat(boton.dataset.lng);

    const ubicacion = { lat, lng };

    map.panTo(ubicacion);

    setTimeout(() => {
      map.setZoom(13);
    }, 300);

    marker.setPosition(ubicacion);

    document.querySelectorAll(".ciudad-btn").forEach(btn => {
      btn.classList.remove("active");
    });

    boton.classList.add("active");
  });
}
