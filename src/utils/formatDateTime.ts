type FormatOrder = "dmy" | "mdy";

interface FormatOptions {
  order?: FormatOrder;
  lowercaseAmPm?: boolean;
}

export const formatDateTime = (
  value: string | number | Date | undefined,
  options: FormatOptions = {}
) => {
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

  const order: FormatOrder = options.order || "dmy";
  const datePart =
    order === "mdy"
      ? `${month}/${day}/${year}`
      : `${day}/${month}/${year}`;
  const period = options.lowercaseAmPm ? ampm.toLowerCase() : ampm;

  return `${datePart} ${hour12}:${minutes}:${seconds} ${period}`;
};
