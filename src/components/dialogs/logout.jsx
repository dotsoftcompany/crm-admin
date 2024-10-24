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

function LogoutAlert({ open, setOpen, handleQuit }) {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Hisobdan chiqishingiz rostan xohlayapsizmi?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Dasturdan chiqganingizdan so'ng email va passwordni yana kiritgan
            holda hisobga kirishingiz mumkin. Bu orqali hisob ichidagi
            ma'lumotlar o'chib ketmaydi.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Bekor qilish</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500 hover:bg-red-500/80 text-white"
            onClick={handleQuit}
          >
            Chiqish
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default LogoutAlert;
