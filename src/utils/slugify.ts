// utils/slugify.ts
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .normalize("NFD") // quita tildes
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-") // espacios por guiones
    .replace(/[^\w\-]+/g, "") // elimina caracteres especiales
    .replace(/\-\-+/g, "-") // múltiple guiones por uno solo
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}