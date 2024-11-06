import React from 'react';
import BreadcrumbComponent from '@/components/breadcrumb';
import StudentPaymentHistory from '@/components/payment/data-table';
import { useMainContext } from '@/context/main-context';

function PaymentHistory() {
  const { paymentHistory } = useMainContext();

  return (
    <div className="px-4 lg:px-8 my-4 space-y-4">
      <BreadcrumbComponent title="To'lovlar ro'yxati" />

      <div>
        <h2 className="text-2xl font-bold tracking-tight">Keine Ahnung!</h2>
        <p className="text-muted-foreground">
          I don't know what should I add here!
        </p>
      </div>

      <StudentPaymentHistory data={paymentHistory} />
    </div>
  );
}

export default PaymentHistory;
