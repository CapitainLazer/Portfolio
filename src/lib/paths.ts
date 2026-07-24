/** Préfixe les chemins locaux pour GitHub Pages (ex. /Portfolio). */
export function withBasePath(path: string): string {
  if (!path || path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  const base = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");
  const normalized = path.startsWith("/") ? path : `/${path}`;

  if (!base) return normalized;
  if (normalized === base || normalized.startsWith(`${base}/`)) return normalized;

  return `${base}${normalized}`;
}
