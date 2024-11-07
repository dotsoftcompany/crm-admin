import { endOfMonth, startOfMonth } from 'date-fns';
import { formatNumber } from './utils';

export const getOutstandingPayments = (students) => {
  return students.filter(
    (student) => !hasPaidThisMonth(student.paymentHistory)
  );
};

export const getPaymentMethodBreakdown = (paymentHistory) => {
  return paymentHistory.reduce((acc, payment) => {
    const method = payment.method;
    const amount = Number(payment.amount);

    if (acc[method]) {
      acc[method] += amount;
    } else {
      acc[method] = amount;
    }

    return acc;
  }, {});
};

export const getCoursePayments = (paymentHistory) => {
  return paymentHistory.reduce((acc, payment) => {
    const course = payment.course;
    const amount = Number(payment.amount);

    if (acc[course]) {
      acc[course] += amount;
    } else {
      acc[course] = amount;
    }

    return acc;
  }, {});
};

export const getTotalAmountPaid = (paymentHistory) => {
  return formatNumber(
    paymentHistory.reduce((total, payment) => total + Number(payment.amount), 0)
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
    const amount = Number(payment.amount); // Ensure amount is treated as a number

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

  // Return the course with the highest total payment, or null if empty
  return coursesWithTotalAmount.length > 0 ? coursesWithTotalAmount[0] : null;
};

// Calculate student monthly Debt
export const calculateCurrentMonthDebt = (student, courses, groups) => {
  if (!student.paymentHistory || student.paymentHistory.length === 0) {
    return {
      coursePrice: 0,
      totalPaidThisMonth: 0,
      debt: 0,
    };
  }

  const currentMonthStart = startOfMonth(new Date());
  const currentMonthEnd = endOfMonth(new Date());

  // Safely get the course ID
  const firstPayment = student.paymentHistory[0];
  const courseId = groups.find((c) => c.id === firstPayment.course)?.courseId;
  const coursePrice = courses.find((c) => c.id === courseId)?.coursePrice || 0;

  // Filter payments made in the current month
  const currentMonthPayments = student.paymentHistory.filter((payment) => {
    const paymentDate = payment.timestamp?.seconds
      ? new Date(payment.timestamp.seconds * 1000)
      : null;
    return (
      paymentDate &&
      paymentDate >= currentMonthStart &&
      paymentDate <= currentMonthEnd
    );
  });

  // Calculate total amount paid in the current month, ensuring amounts are converted to numbers
  const totalPaidThisMonth = currentMonthPayments.reduce(
    (sum, payment) => sum + Number(payment.amount),
    0
  );

  // Calculate debt if total paid is less than course price
  const debt =
    coursePrice > totalPaidThisMonth ? coursePrice - totalPaidThisMonth : 0;

  return {
    coursePrice,
    totalPaidThisMonth,
    debt,
  };
};
