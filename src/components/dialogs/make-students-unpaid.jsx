import React, { useEffect, useState } from 'react';
import { Loader, Users } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '@/api/firebase';
import { useToast } from '@/components/ui/use-toast';

function MakeStudentsUnpaid() {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();

  useEffect(() => {
    const checkFirstOfMonth = () => {
      const today = new Date();
      const isFirstOfMonth = today.getDate() === 5;
      const notUpdatedYet = localStorage.getItem('studentsUnpaidButtonClicked');

      if (isFirstOfMonth && !notUpdatedYet) {
        setShow(true);
      }
    };

    checkFirstOfMonth();
  }, []);

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const studentsCollection = collection(db, 'students');
      const studentsSnapshot = await getDocs(studentsCollection);
      const updatePromises = [];

      studentsSnapshot.forEach((studentDoc) => {
        const studentRef = doc(db, 'students', studentDoc.id);
        updatePromises.push(updateDoc(studentRef, { isPaid: false }));
      });

      await Promise.all(updatePromises);
      setShow(false);
      localStorage.setItem('studentsUnpaidButtonClicked', 'true');
      toast({
        title: "O'quvchilar to'lov qilinmagan holatiga o'zgardi",
      });
    } catch (error) {
      console.error('Error updating students: ', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`${
        show ? 'block' : 'hidden'
      } fixed z-50 top-4 left-1/2 -translate-x-1/2 w-[85%] lg:w-[40rem]`}
    >
      <Alert className="relative bg-blue-600 pr-20 max-w-96 !text-white ">
        <Users className="h-4 w-4 !text-white" />
        <AlertTitle>O'quvchilarni to'lov qilmaganga o'zgartirish.</AlertTitle>
        <AlertDescription>
          Har oyning birinchi kunidan barcha o'quvchilarni <br /> holatini
          "to'lov qilmaganga" o'zgartirish.
        </AlertDescription>
        <Button
          disabled={loading}
          onClick={handleUpdate}
          className="absolute top-1/2 -translate-y-1/2 right-4 h-9 rounded-md !px-3 flex items-center gap-1.5 bg-white hover:bg-gray-100 text-black"
        >
          <Loader
            className={`w-3 h-3 animate-spin ${loading ? 'block' : 'hidden'}`}
          />
          <span>O'tkazish</span>
        </Button>
      </Alert>
    </div>
  );
}

export default MakeStudentsUnpaid;
