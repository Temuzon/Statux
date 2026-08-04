export async function loadJsonData(path) {
  const response = await fetch(path);
  if (!response.ok) throw new Error(`No se pudo cargar el JSON: ${path}`);
  return response.json();
}
