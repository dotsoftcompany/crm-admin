import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useMainContext } from '@/context/main-context';

function EditDialog({ open, setOpen, children }) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-full max-w-2xl">
        <DialogHeader>
          <DialogTitle>Kursni yangilash</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}

export default EditDialog;
