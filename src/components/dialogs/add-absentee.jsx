import React, { useState } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { useMainContext } from '@/context/main-context';
import { DatePicker } from '../ui/date-picker';
import InputDatePicker from '../ui/input-date-picker';
import { Search } from 'lucide-react';
import { addDoc, collection, doc } from 'firebase/firestore';
import { useToast } from '../ui/use-toast';
import { db } from '@/api/firebase';

function AddAbsenteeDialog({ groupId, open, setOpen, fetchAbsentees }) {
  const { students, uid } = useMainContext();

  const { toast } = useToast();

  const [selectedStudents, setSelectedStudents] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [formattedDate, setFormattedDate] = useState();

  const studentsFilter = students.filter((s) =>
    s.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCheckboxChange = (studentId) => {
    setSelectedStudents((prevSelected) =>
      prevSelected.includes(studentId)
        ? prevSelected.filter((id) => id !== studentId)
        : [...prevSelected, studentId]
    );
  };

  const addAbsenteeData = async () => {
    try {
      const absenteesRef = collection(
        doc(db, `users/${uid}/groups`, groupId),
        'absentees'
      );

      await addDoc(absenteesRef, {
        date: formattedDate,
        students: selectedStudents,
      });

      setSelectedStudents('');
      setOpen(false);
      fetchAbsentees();

      toast({
        title: "Muvvafaqiyatli qo'shildi",
      });
    } catch (error) {
      console.error('Error adding absentee data: ', error);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Darsga kelmagan o'quvchilar</DialogTitle>
        </DialogHeader>
        <div className="flex items-center gap-2">
          <div className="relative w-full">
            <Input
              className="peer pe-9 ps-9 w-full"
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="O'quvchilarni qidiring"
            />
            <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
              <Search size={16} strokeWidth={2} />
            </div>
          </div>
          <InputDatePicker
            formattedDate={formattedDate}
            setFormattedDate={setFormattedDate}
          />
        </div>
        <ScrollArea className="h-[300px] overflow-auto rounded-md">
          <Table>
            <TableCaption className="hidden">
              A list of your recent invoices.
            </TableCaption>
            <TableHeader className="sticky top-0">
              <TableRow>
                <TableHead></TableHead>
                <TableHead className="whitespace-nowrap">Ism familya</TableHead>
                <TableHead className="whitespace-nowrap">Manzil</TableHead>
                <TableHead className="whitespace-nowrap">
                  Telefon raqam
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="w-full">
              {studentsFilter.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>
                    <Checkbox
                      type="checkbox"
                      checked={!selectedStudents.includes(student.id)}
                      onCheckedChange={() => handleCheckboxChange(student.id)}
                    />
                  </TableCell>
                  <TableCell className="truncate font-medium">
                    {student.fullName}
                  </TableCell>
                  <TableCell>{student.address}</TableCell>
                  <TableCell>{student.phoneNumber}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Yopish
            </Button>
          </DialogClose>
          <Button onClick={addAbsenteeData} type="submit">
            Tasdiqlash
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddAbsenteeDialog;
