import raw from "../../siteContent.json";

export const content = raw;

export function assetUrl(filename) {
  if (!filename) return "";
  const base = content.assets.baseUrl.replace(/\/$/, "");
  return `${base}/${filename}`;
}

export function fileUrl(key) {
  const file = content.assets.files[key];
  if (!file) return "";
  return assetUrl(file);
}
