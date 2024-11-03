import React, { useState } from 'react';
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
import {
  arrayRemove,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from 'firebase/firestore';
import { db } from '@/api/firebase';
import { useToast } from '../ui/use-toast';

function DeleteStudentAlert({ id, open, setOpen }) {
  const [loading, setLoading] = useState();
  const { uid } = useMainContext();

  const { toast } = useToast();

  const deleteStudent = async () => {
    try {
      setLoading(true);

      const studentDocRef = doc(db, `students`, id);
      await deleteDoc(studentDocRef);

      const groupsSnapshot = await getDocs(
        collection(db, `users/${uid}/groups`)
      );
      const batchUpdates = [];

      groupsSnapshot.forEach((groupDoc) => {
        const groupData = groupDoc.data();
        const groupDocRef = groupDoc.ref;

        if (groupData.students && groupData.students.includes(id)) {
          batchUpdates.push(
            updateDoc(groupDocRef, {
              students: arrayRemove(id),
            })
          );
        }
      });

      await Promise.all(batchUpdates);

      toast({
        title: "Muvaffaqiyatli o'chirildi",
      });
    } catch (err) {
      console.error(`Error deleting student ${id} and updating groups:`, err);
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
          <AlertDialogAction onClick={deleteStudent}>
            {loading ? "O'chirilmoqda..." : "O'chirish"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteStudentAlert;
