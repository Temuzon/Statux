// ===============================
// 🔒 SISTEMA DE BLOQUEO — STATUX
// ===============================

(function () {
  const SELECTOR_BLOQUEADO = "[data-bloqueado]";
  let bloqueoActivo = true;

  // --- Detectar si estamos en modo preview ---
  const isPreview = (() => {
    try {
      const params = new URLSearchParams(window.location.search);
      return params.has("stx_return"); // tu sistema actual ya usa esto 👀
    } catch {
      return false;
    }
  })();

  // Solo activar bloqueo en preview
  if (!isPreview) return;

  // --- Interceptar clicks ---
  document.addEventListener("click", (e) => {
    const el = e.target.closest(SELECTOR_BLOQUEADO);
    if (!el || !bloqueoActivo) return;

    e.preventDefault();
    e.stopPropagation();

    triggerBloqueoUX(el);
  });

  // --- Interceptar formularios ---
  document.addEventListener("submit", (e) => {
    const el = e.target.closest(SELECTOR_BLOQUEADO);
    if (!el || !bloqueoActivo) return;

    e.preventDefault();
    triggerBloqueoUX(el);
  });

  // --- UX de bloqueo ---
  function triggerBloqueoUX(elemento) {
    mostrarModalBloqueo();

    // micro feedback visual (opcional pero recomendado)
    elemento.classList.add("stx-bloqueado-feedback");

    setTimeout(() => {
      elemento.classList.remove("stx-bloqueado-feedback");
    }, 300);

    // tracking interno (futuro 🔥)
    trackIntento(elemento);
  }

  // --- Modal elegante ---
  function mostrarModalBloqueo() {
    let modal = document.getElementById("stx-modal-bloqueo");

    if (!modal) {
      modal = document.createElement("div");
      modal.id = "stx-modal-bloqueo";

      modal.innerHTML = `
        <div class="stx-overlay">
          <div class="stx-modal">
            <p class="stx-title">Acceso restringido</p>
            <p class="stx-sub">Este nodo aún no es tuyo</p>
            <button class="stx-btn">Desbloquear Systux</button>
          </div>
        </div>
      `;

      document.body.appendChild(modal);

      // cerrar al click fuera
      modal.querySelector(".stx-overlay").addEventListener("click", (e) => {
        if (e.target.classList.contains("stx-overlay")) {
          modal.remove();
        }
      });
    }
  }

  // --- Tracking básico ---
  function trackIntento(el) {
    const key = "stx_bloqueos";
    const data = JSON.parse(localStorage.getItem(key)) || {};

    const nombre = el.getAttribute("data-bloqueado") || "default";

    data[nombre] = (data[nombre] || 0) + 1;

    localStorage.setItem(key, JSON.stringify(data));
  }

  console.log("🔒 Modo preview activo — bloqueo habilitado");

})();
