import legacyRuntimeSource from './calisteniaLegacy.js?raw';

let currentScript;

export function mountLegacyRuntime() {
  if (currentScript) currentScript.remove();
  const script = document.createElement('script');
  script.textContent = legacyRuntimeSource;
  document.body.appendChild(script);
  currentScript = script;
  return () => {
    if (currentScript === script) currentScript = undefined;
    script.remove();
  };
}
