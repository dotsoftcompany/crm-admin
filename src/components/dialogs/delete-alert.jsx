import React from 'react';
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
import useDelete from '@/hooks/useDelete';

function DeleteAlert({ id, collection, fetch, open, setOpen }) {
  const { deleteItem, loading } = useDelete(id, collection, fetch);

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
          <AlertDialogAction onClick={deleteItem}>
            {loading ? "O'chirilmoqda..." : "O'chirish"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteAlert;
