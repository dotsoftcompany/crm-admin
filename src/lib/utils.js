import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { startOfMonth, endOfMonth } from 'date-fns';

export const hasPaidThisMonth = (paymentHistory) => {
  if (!paymentHistory || paymentHistory.length === 0) {
    return false;
  }

  const currentMonthStart = startOfMonth(new Date());
  const currentMonthEnd = endOfMonth(new Date());

  return paymentHistory.some((payment) => {
    const paymentDate = payment.timestamp?.seconds
      ? new Date(payment.timestamp.seconds * 1000)
      : null;

    if (!paymentDate) {
      return false;
    }

    return paymentDate >= currentMonthStart && paymentDate <= currentMonthEnd;
  });
};

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const formatNumber = (value) => {
  return value?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
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

export function formatPaymentMethod(method) {
  switch (method) {
    case 'cash':
      return 'Naqd pul';
    case 'credit_card':
      return 'Kredit karta';
    case 'bank_transfer':
      return 'Bank oʻtkazmasi';
    default:
      return 'Nomaʼlum usul';
  }
}