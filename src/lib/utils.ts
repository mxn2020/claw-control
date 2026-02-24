import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  const merged = twMerge(clsx(inputs));
  // Deduplicate exact duplicate classes
  return Array.from(new Set(merged.split(" ").filter(Boolean))).join(" ");
}
