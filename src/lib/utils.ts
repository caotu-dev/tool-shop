import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD") // separate accents
    .replace(/[\u0300-\u036f]/g, "") // remove accents
    .replace(/[^a-z0-9\s-]/g, "") // remove special chars
    .replace(/\s+/g, "-") // replace spaces with dashes
    .replace(/-+/g, "-") // collapse multiple dashes
    .replace(/^-+|-+$/g, ""); // trim leading/trailing dashes
}

export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

export function getProductImage(imagesUrl: string | null) {
  if (!imagesUrl) return "";

  const arr = imagesUrl.split("___");
  return arr;
}

export function currencyFormat(
  amount: number,
  locale?: string,
  currency?: string
) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
}

export function objectToQueryParams(obj: Record<string, any>): string {
  const params = new URLSearchParams();

  for (const key in obj) {
    if (obj[key] !== undefined && obj[key] !== null && obj[key] !== "") {
      params.append(key, String(obj[key]));
    }
  }

  return params.toString();
}
