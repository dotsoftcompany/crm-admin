import { formatNumber } from './utils';

export const getOutstandingPayments = (students) => {
  return students.filter(
    (student) => !hasPaidThisMonth(student.paymentHistory)
  );
};

export const getPaymentMethodBreakdown = (paymentHistory) => {
  return paymentHistory.reduce((acc, payment) => {
    const method = payment.method;
    if (acc[method]) {
      acc[method] += payment.amount;
    } else {
      acc[method] = payment.amount;
    }
    return acc;
  }, {});
};

export const getCoursePayments = (paymentHistory) => {
  return paymentHistory.reduce((acc, payment) => {
    const course = payment.course;
    if (acc[course]) {
      acc[course] += payment.amount;
    } else {
      acc[course] = payment.amount;
    }
    return acc;
  }, {});
};

export const getTotalAmountPaid = (paymentHistory) => {
  return formatNumber(
    paymentHistory.reduce((total, payment) => total + payment.amount, 0)
  );
};

export const getSelectedMonthAndYear = (selectedDate) => {
  const date = new Date(selectedDate);
  return {
    month: date.getMonth(),
    year: date.getFullYear(),
  };
};

export const getPaymentsForSelectedMonth = (
  paymentHistory,
  selectedMonth,
  selectedYear
) => {
  return paymentHistory.filter((payment) => {
    const paymentDate = new Date(payment.timestamp.seconds * 1000);
    const paymentMonth = paymentDate.getMonth();
    const paymentYear = paymentDate.getFullYear();
    return paymentMonth === selectedMonth && paymentYear === selectedYear;
  });
};

export const getMostPaidCourse = (paymentHistory) => {
  // Aggregate payments by course
  const coursePayments = paymentHistory.reduce((acc, payment) => {
    const course = payment.course;
    const amount = payment.amount;

    if (acc[course]) {
      acc[course] += amount; // Sum the payments for the same course
    } else {
      acc[course] = amount; // Initialize the payment sum for the course
    }

    return acc;
  }, {});

  // Convert the coursePayments object to an array of [course, totalAmount]
  const coursesWithTotalAmount = Object.entries(coursePayments).map(
    ([course, totalAmount]) => ({
      course,
      totalAmount,
    })
  );

  // Sort by total amount in descending order
  coursesWithTotalAmount.sort((a, b) => b.totalAmount - a.totalAmount);

  // Return the course with the highest total payment
  return coursesWithTotalAmount[0];
};
