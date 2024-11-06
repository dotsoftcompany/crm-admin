import React, { useState } from 'react';
import BreadcrumbComponent from '@/components/breadcrumb';
import StudentPaymentHistory from '@/components/payment/data-table';
import { useMainContext } from '@/context/main-context';

import { MonthPicker } from '@/components/ui/month-picker';
import {
  getCoursePayments,
  getMostPaidCourse,
  getPaymentMethodBreakdown,
  getPaymentsForSelectedMonth,
  getSelectedMonthAndYear,
  getTotalAmountPaid,
} from '@/lib/payment-history';
import { LineChart1 } from '@/components/ui/chart/line-chart';

function PaymentHistory() {
  const { paymentHistory, courses, groups } = useMainContext();
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const { month, year } = getSelectedMonthAndYear(selectedMonth);

  const filteredPayments = getPaymentsForSelectedMonth(
    paymentHistory,
    month,
    year
  );

  const totalAmount = getTotalAmountPaid(filteredPayments);
  const mostPaidCourse = getMostPaidCourse(filteredPayments);
  const paymentMethodBreakdown = getPaymentMethodBreakdown(filteredPayments);

  const courseId = groups.find((c) => c.id === mostPaidCourse?.course)?.courseId;
  const courseTitle = courses.find((c) => c.id === courseId)?.courseTitle;

  return (
    <div className="px-4 lg:px-8 my-4 space-y-4">
      <BreadcrumbComponent title="To'lovlar ro'yxati" />

      {/* <div>
        <h2 className="text-2xl font-bold tracking-tight">Keine Ahnung!</h2>
        <p className="text-muted-foreground">
          I don't know what should I add here!
        </p>
      </div> */}

      <div className="grid grid-cols-3 gap-2">
        <div class="rounded-xl border bg-card text-card-foreground shadow p-6">
          <div class="flex flex-row items-center justify-between space-y-0 pb-2">
            <div class="tracking-tight text-sm font-normal">Total Revenue</div>
          </div>
          <div class="pt-0 pb-0">
            <div class="text-2xl font-bold">{totalAmount} so'm</div>
            <p class="text-xs text-muted-foreground">+20.1% from last month</p>
          </div>
          {/* <LineChart1 /> */}
        </div>
        <div class="rounded-xl border bg-card text-card-foreground shadow p-6">
          <div class="flex flex-row items-center justify-between space-y-0 pb-2">
            <div class="tracking-tight text-sm font-normal">
              Most sale course
            </div>
          </div>
          <div class="pt-0 pb-0">
            {mostPaidCourse ? (
              <div>
                <p>{courseTitle}</p>
                <p>{mostPaidCourse.totalAmount} UZS</p>
              </div>
            ) : (
              <p>No payments recorded</p>
            )}
            {/* <div class="text-2xl font-bold">{mostPaidCourse.course}</div> */}
            <p class="text-xs text-muted-foreground">+20.1% from last month</p>
          </div>
          {/* <LineChart1 /> */}
        </div>
        <div class="rounded-xl border bg-card text-card-foreground shadow p-6">
          <div class="flex flex-row items-center justify-between space-y-0 pb-2">
            <div class="tracking-tight text-sm font-normal">Pay methods</div>
          </div>
          <div class="pt-0 pb-0">
            {Object.entries(paymentMethodBreakdown).length === 0 ? (
              <p>No payments recorded</p>
            ) : (
              <ul>
                {Object.entries(paymentMethodBreakdown).map(
                  ([method, totalAmount]) => (
                    <li key={method}>
                      <strong>{method}:</strong> {totalAmount} UZS
                    </li>
                  )
                )}
              </ul>
            )}
            {/* <div class="text-2xl font-bold">{mostPaidCourse.course}</div> */}
            <p class="text-xs text-muted-foreground">+20.1% from last month</p>
          </div>
          {/* <LineChart1 /> */}
        </div>
      </div>

      <StudentPaymentHistory data={filteredPayments}>
        <div className="flex items-center gap-2">
          <div className="items-center space-x-2">
            <MonthPicker
              className="w-44"
              month={selectedMonth}
              setMonth={setSelectedMonth}
            />
          </div>
        </div>
      </StudentPaymentHistory>
    </div>
  );
}

export default PaymentHistory;
