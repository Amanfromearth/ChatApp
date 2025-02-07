import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function getStrapiURL() {
  return process.env.NEXT_PUBLIC_STRAPI_URL;
}