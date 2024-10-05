import BreadcrumbComponent from '@/components/breadcrumb';
import React from 'react';

function PaymentHistory() {
  return (
    <div className="px-4 lg:px-8 my-4 space-y-4">
      <BreadcrumbComponent title="To'lovlar ro'yxati" />

      <div>
        <h2 className="text-2xl font-bold tracking-tight">Keine Ahnung!</h2>
        <p className="text-muted-foreground">
          I don't know what should I add here!
        </p>
      </div>
    </div>
  );
}

export default PaymentHistory;
