/** Public asset URLs with Vite base path (e.g. /Portfolio-V1/ on GitHub Pages). */
const base = import.meta.env.BASE_URL;

export function assetUrl(path) {
  const normalized = path.startsWith('/') ? path.slice(1) : path;
  return `${base}${normalized}`;
}
