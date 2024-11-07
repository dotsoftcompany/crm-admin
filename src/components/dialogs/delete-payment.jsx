import React, { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import {
  arrayRemove,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '@/api/firebase';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useMainContext } from '@/context/main-context';

function DeletePaymentAlert({ paymentId, open, setOpen }) {
  const { toast } = useToast();
  const { uid, students, paymentHistory } = useMainContext();

  const [loading, setLoading] = useState(false);

  const payment = paymentHistory.find(p => p.id === paymentId);
  const student = students.find(s => s.id === payment?.studentId);

  const deletePayment = async () => {
    setLoading(true);
    try {
      const paymentDocRef = doc(db, `users/${uid}/paymentHistory`, paymentId);
      await deleteDoc(paymentDocRef);

      const studentRef = doc(db, 'students', student.id);
      await updateDoc(studentRef, {
        paymentHistory: arrayRemove({
          paymentId: paymentId,
          name: payment?.name,
          amount: payment?.amount,
          course: payment?.course,
          method: payment?.method,
          timestamp: payment?.timestamp,
        }),
      });

      toast({
        title: 'To‘lov muvaffaqiyatli o‘chirildi',
      });
      setOpen(false);
    } catch (error) {
      console.error('Error deleting payment:', error);
      toast({
        title: 'Xato yuz berdi',
        description: 'To‘lovni o‘chirishd a xato yuz berdi.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Siz mutlaqo ishonchingiz komilmi?</AlertDialogTitle>
          <AlertDialogDescription>
            Bu amalni ortga qaytarib bo‘lmaydi. Bu sizning hisobingizni butunlay
            o'chirib tashlaydi va ma'lumotlaringizni serverlarimizdan olib
            tashlaydi.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Bekor qilish</AlertDialogCancel>
          <AlertDialogAction onClick={deletePayment}>
            {loading ? "O'chirilmoqda..." : "O'chirish"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeletePaymentAlert;
