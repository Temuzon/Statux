async function loadHomeSection() {
  const target = document.querySelector('[data-home-root]');
  if (!target) return;

  try {
    const response = await fetch('home.html', { cache: 'no-cache' });
    if (!response.ok) throw new Error(`No se pudo cargar Home (${response.status})`);

    const html = await response.text();
    target.innerHTML = html;
  } catch (error) {
    target.innerHTML = '<p class="home-loading-error">No se pudo cargar la sección Home.</p>';
    console.error(error);
  }
}

document.addEventListener('DOMContentLoaded', loadHomeSection);
