export const formatDateTime = (value: string | number | Date | undefined) => {
  if (!value) return "";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);

  const pad = (num: number) => num.toString().padStart(2, "0");
  const day = pad(date.getDate());
  const month = pad(date.getMonth() + 1);
  const year = date.getFullYear();

  const hours = date.getHours();
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());
  const ampm = hours >= 12 ? "PM" : "AM";
  const hour12 = pad(hours % 12 || 12);

  return `${day}/${month}/${year} ${hour12}:${minutes}:${seconds} ${ampm}`;
};
