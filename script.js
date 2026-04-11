// =============================
// ELEMENTOS
// =============================
const lugares = document.getElementById("lugares");
const video = document.getElementById("intro-video");
const intro = document.getElementById("intro");

// =============================
// VARIABLES GLOBALES
// =============================
let map;
let marker;

// =============================
// INTRO (VIDEO)
// =============================
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

// =============================
// GOOGLE MAPS (GLOBAL)
// =============================
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
};

// =============================
// EVENTO BOTONES (CIUDADES)
// =============================
if (lugares) {
  lugares.addEventListener("click", (e) => {
    // 🔒 evitar errores si mapa aún no carga
    if (!map) return;

    const boton = e.target.closest("[data-lat]");
    if (!boton) return;

    const lat = parseFloat(boton.dataset.lat);
    const lng = parseFloat(boton.dataset.lng);

    const ubicacion = { lat, lng };

    // 🎯 mover mapa
    map.panTo(ubicacion);

    setTimeout(() => {
      map.setZoom(13);
    }, 300);

    marker.setPosition(ubicacion);

    // 🔥 UI (activo)
    document.querySelectorAll(".ciudad-btn").forEach(btn => {
      btn.classList.remove("active");
    });

    boton.classList.add("active");
  });
}
