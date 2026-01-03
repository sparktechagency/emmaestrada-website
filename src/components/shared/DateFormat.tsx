// utils/formatDate.ts
export const formatDate = (
  date: string | Date,
  locale: string = "en-US"
): string => {
  if (!date) return "";

  return new Date(date).toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
