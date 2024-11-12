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

  const { paymentHistory } = useMainContext();
  const { month, year } = getSelectedMonthAndYear(selectedMonth);

  const filteredPayments = getPaymentsForSelectedMonth(
    paymentHistory,
    month,
    year
  );

  const totalAmount = getTotalAmountPaid(filteredPayments);

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

      <div>
        <h2 className="text-2xl font-bold tracking-tight">
          O'quvchilar to'lov tarixi
        </h2>
        <p className="text-muted-foreground">
          oquvchilarni toʻlov tarixini samarali kuzatib boring va boshqaring.
        </p>
      </div>

      <StudentPaymentHistory
        data={filteredPayments}
        setId={setId}
        idKey="id"
        setOpenDelete={setOpenDelete}
        setOpenEdit={setOpenEdit}
        totalAmount={totalAmount}
        selectedMonth={selectedMonth}
      >
        <div className="flex items-center gap-2">
          <div className="items-center space-x-2">
            <MonthPicker
              className="w-full lg:w-44"
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
