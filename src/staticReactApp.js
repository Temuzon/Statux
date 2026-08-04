(function () {
  function mount() {
    var root = document.getElementById('root');
    if (!root) return;

    var app = React.createElement('div', {
      className: 'calistenia-shell',
      dangerouslySetInnerHTML: { __html: window.CALISTENIA_MARKUP || '' }
    });

    ReactDOM.createRoot(root).render(app);

    setTimeout(function () {
      if (typeof window.initCalisteniaRuntime === 'function') {
        window.initCalisteniaRuntime();
      }
    }, 0);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount, { once: true });
  } else {
    mount();
  }
}());
