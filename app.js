// ── Sección A — Arreglo de habilidades ──────────────────────────────────────
const habilidades = ["JavaScript", "CSS", "APIs", "HTML", "Git"];

// ── Sección B — Función que renderiza etiquetas ──────────────────────────────
const mostrarEtiquetas = (lista) => {
  const contenedor = document.querySelector("#etiquetas");
  contenedor.innerHTML = "";
  lista.forEach((habilidad) => {
    const span = document.createElement("span");
    span.classList.add("etiqueta");
    span.textContent = habilidad;
    contenedor.appendChild(span);
  });
};

// ── Sección C — Función que construye un objeto de perfil ────────────────────
const construirPerfil = (datos) => {
  return {
    nombre:  datos.name,
    usuario: "@" + datos.login,
    email:   datos.email   || "Correo no disponible",
    ciudad:  datos.location || "Sin ubicación",
    avatar:  datos.avatar_url,
  };
};

// ── Sección D — Función que actualiza el DOM ─────────────────────────────────
const renderizarPerfil = (perfil) => {
  document.querySelector("#nombre").textContent  = perfil.nombre;
  document.querySelector("#usuario").textContent = perfil.usuario;
  document.querySelector("#email").textContent   = perfil.email;
  document.querySelector("#ciudad").textContent  = perfil.ciudad;
  document.querySelector("#avatar").src          = perfil.avatar;
};

// ── Sección E — Fetch api ────────────────────────────────────────────────────
const cargarUsuario = async () => {
  const mensaje = document.querySelector("#mensaje");
  try {
    mensaje.textContent = "Cargando...";

    const respuesta = await fetch("https://api.github.com/users");
    const datos     = await respuesta.json();

    // La API devuelve un arreglo; tomamos un usuario al azar
    const datosUsuario = datos[Math.floor(Math.random() * datos.length)];

    // Necesitamos los detalles completos del usuario para tener email/location
    const respuestaDetalle = await fetch(datosUsuario.url);
    const detalle          = await respuestaDetalle.json();

    const perfil = construirPerfil(detalle);
    renderizarPerfil(perfil);
    mostrarEtiquetas(habilidades);

    document.querySelector("#tarjeta").style.display = "flex";
    mensaje.textContent = "";
  } catch (error) {
    mensaje.textContent = "Error al cargar usuario";
  }
};

// ── Sección F — Conectar el botón ────────────────────────────────────────────
document.querySelector("#btn").addEventListener("click", cargarUsuario);
