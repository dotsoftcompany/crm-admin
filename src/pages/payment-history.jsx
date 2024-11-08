import React, { useState } from 'react';
import { MonthPicker } from '@/components/ui/month-picker';
import { useMainContext } from '@/context/main-context';
import { formatNumber } from '@/lib/utils';
import {
  getMostPaidCourse,
  getPaymentMethodBreakdown,
  getPaymentsForSelectedMonth,
  getSelectedMonthAndYear,
  getTotalAmountPaid,
} from '@/lib/payment-history';
import EditDialog from '@/components/dialogs/edit-dialog';
import EditPayment from '@/components/payment/edit-payment';
import BreadcrumbComponent from '@/components/breadcrumb';
import StudentPaymentHistory from '@/components/payment/data-table';
import DeletePaymentAlert from '@/components/dialogs/delete-payment';

function PaymentHistory() {
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [id, setId] = useState('');

  const { paymentHistory, courses, groups } = useMainContext();
  const { month, year } = getSelectedMonthAndYear(selectedMonth);

  const filteredPayments = getPaymentsForSelectedMonth(
    paymentHistory,
    month,
    year
  );

  const totalAmount = getTotalAmountPaid(filteredPayments);
  const mostPaidCourse = getMostPaidCourse(filteredPayments);
  const paymentMethodBreakdown = getPaymentMethodBreakdown(filteredPayments);

  const courseId = groups.find(
    (c) => c.id === mostPaidCourse?.course
  )?.courseId;
  const courseTitle = courses.find((c) => c.id === courseId)?.courseTitle;

  return (
    <div className="px-4 lg:px-8 my-4 space-y-4">
      <BreadcrumbComponent title="To'lovlar ro'yxati" />

      <EditDialog id={id} open={openEdit} setOpen={setOpenEdit}>
        <EditPayment paymentId={id} setOpen={setOpenEdit} />
      </EditDialog>

      <DeletePaymentAlert
        paymentId={id}
        open={openDelete}
        setOpen={setOpenDelete}
      />

      {/* <div>
        <h2 className="text-2xl font-bold tracking-tight">Keine Ahnung!</h2>
        <p className="text-muted-foreground">
          I don't know what should I add here!
        </p>
      </div> */}

      <div className="grid grid-cols-3 gap-2">
        <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="tracking-tight text-sm font-normal">
              Total Revenue
            </div>
          </div>
          <div className="pt-0 pb-0">
            <div className="text-2xl font-bold">{totalAmount} uzs</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </div>
          {/* <LineChart1 /> */}
        </div>
        <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="tracking-tight text-sm font-normal">
              Most sale course
            </div>
          </div>
          <div className="pt-0 pb-0">
            {mostPaidCourse ? (
              <div>
                <p>{courseTitle}</p>
                <p>{formatNumber(mostPaidCourse.totalAmount)} UZS</p>
              </div>
            ) : (
              <p>No payments recorded</p>
            )}
            {/* <div className="text-2xl font-bold">{mostPaidCourse.course}</div> */}
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </div>
        </div>
        <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="tracking-tight text-sm font-normal">
              Pay methods
            </div>
          </div>
          <div className="pt-0 pb-0">
            {Object.entries(paymentMethodBreakdown).length === 0 ? (
              <p>No payments recorded</p>
            ) : (
              <ul>
                {Object.entries(paymentMethodBreakdown).map(
                  ([method, totalAmount]) => (
                    <li key={method}>
                      <strong>{method}:</strong> {formatNumber(totalAmount)} UZS
                    </li>
                  )
                )}
              </ul>
            )}
            {/* <div className="text-2xl font-bold">{mostPaidCourse.course}</div> */}
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </div>
        </div>
      </div>

      <StudentPaymentHistory
        data={filteredPayments}
        setId={setId}
        setOpenDelete={setOpenDelete}
        setOpenEdit={setOpenEdit}
        totalAmount={totalAmount}
      >
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
