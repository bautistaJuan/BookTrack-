export function formatDate(date?: Date | null): string {
  if (!date) return "";

  return date.toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}
