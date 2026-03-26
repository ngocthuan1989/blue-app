import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount) {
  return (amount || 0).toLocaleString('vi-VN');
}

export function formatDate(dateString) {
  if (!dateString) return "-";
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return date.toLocaleDateString('vi-VN');
  } catch (e) {
    return dateString;
  }
}
