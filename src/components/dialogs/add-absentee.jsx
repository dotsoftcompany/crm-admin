import React, { useState } from 'react';
import { I18nProvider } from 'react-aria';
import { addDoc, collection, doc } from 'firebase/firestore';
import { useMainContext } from '@/context/main-context';
import { db } from '@/api/firebase';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
import InputDatePicker from '@/components/ui/input-date-picker';
import { Check, Loader, Search, X } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

function AddAbsenteeDialog({
  students,
  groupId,
  open,
  setOpen,
  fetchAbsentees,
}) {
  const { uid } = useMainContext();
  const { toast } = useToast();

  const [selectedStudents, setSelectedStudents] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [formattedDate, setFormattedDate] = useState();

  const studentsFilter = students.filter((s) =>
    s.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRowClick = (studentId) => {
    setSelectedStudents((prevSelected) =>
      prevSelected.includes(studentId)
        ? prevSelected.filter((id) => id !== studentId)
        : [...prevSelected, studentId]
    );
  };

  const addAbsenteeData = async () => {
    setIsSubmitting(true);
    try {
      const absenteesRef = collection(
        doc(db, `users/${uid}/groups`, groupId),
        'absentees'
      );

      await addDoc(absenteesRef, {
        date: formattedDate,
        students: selectedStudents,
      });
    } catch (error) {
      console.error('Error adding absentee data: ', error);
    } finally {
      setSelectedStudents([]);
      setOpen(false);
      fetchAbsentees();
      setIsSubmitting(false);
      toast({
        title: "Muvaffaqiyatli qo'shildi",
      });
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
          <I18nProvider locale="ru-RU">
            <InputDatePicker
              formattedDate={formattedDate}
              setFormattedDate={setFormattedDate}
            />
          </I18nProvider>
        </div>
        <ScrollArea className="h-[300px] overflow-auto rounded-md">
          <Table>
            <TableCaption className="hidden">
              A list of your recent invoices.
            </TableCaption>
            <TableHeader className="sticky top-0">
              <TableRow>
                <TableHead className="w-10"></TableHead>
                <TableHead>Ism familya</TableHead>
                <TableHead>Manzil</TableHead>
                <TableHead>Telefon raqam</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="w-full">
              {studentsFilter.map((student) => {
                const isSelected = selectedStudents.includes(student.id);
                return (
                  <TableRow
                    key={student.id}
                    onClick={() => handleRowClick(student.id)}
                    className={`cursor-pointer ${
                      isSelected
                        ? 'bg-red-100 text-red-500 dark:bg-red-500 hover:opacity-90 duration-200 transition-opacity dark:text-white'
                        : 'hover:bg-gray-100 dark:hover:bg-muted/60'
                    }`}
                  >
                    <TableCell className="w-10">
                      {isSelected ? (
                        <X className="w-4 h-4 text-red-500 dark:text-white mx-auto" />
                      ) : (
                        <Check className="w-4 h-4 text-green-500 mx-auto" />
                      )}
                    </TableCell>
                    <TableCell className="truncate">
                      {student.fullName}
                    </TableCell>
                    <TableCell>{student.address}</TableCell>
                    <TableCell>{student.phoneNumber}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </ScrollArea>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Yopish
            </Button>
          </DialogClose>
          <Button
            onClick={addAbsenteeData}
            disabled={isSubmitting}
            className="flex items-center gap-1.5"
            type="submit"
          >
            {isSubmitting && <Loader className="w-3 h-3 animate-spin" />}
            Yo'qlama qilish
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddAbsenteeDialog;
