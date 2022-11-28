import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

export const getFormatDistanceToNow = (date: number) => {
  const fromNow = formatDistanceToNow(date, { locale: es });
  return `${fromNow}`;
};


export const getKb = (bits: number) => {
  return Math.round(bits / 1024);
};
