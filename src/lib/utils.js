import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const formatNumber = (value) => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};

export const formatPhoneNumber = (value) => {
  // Remove all non-digit characters
  let cleaned = ('' + value).replace(/\D/g, '');

  // Match the Uzbekistan phone number format
  let match = cleaned.match(/^(\+998)(\d{2})(\d{3})(\d{4})$/);

  if (match) {
    // Format it to +99893 008 2309
    return `${match[1]}${match[2]} ${match[3]} ${match[4]}`;
  }

  return value; // Return as-is if not matching
};

export const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
};
