import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const formatNumber = (value) => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};

export function formatPhoneNumber(phoneNumber) {
  const formattedNumber = phoneNumber.replace(
    /(\+998)(\d{2})(\d{3})(\d{2})(\d{2})/,
    '$1 $2 $3 $4 $5'
  );
  return formattedNumber;
}

export const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
};

export function formatJSONDate(obj) {
  // Extract year, month, and day from the object
  const day = String(obj?.day).padStart(2, '0'); // Ensure two-digit day
  const month = String(obj?.month).padStart(2, '0'); // Ensure two-digit month
  const year = obj?.year;

  // Format to "dd.mm.yyyy"
  return `${day}.${month}.${year}`;
}
