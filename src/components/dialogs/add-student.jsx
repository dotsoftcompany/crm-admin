import React, { useState } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
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
import { useMainContext } from '@/context/main-context';
import { Check, Circle, Loader, X } from 'lucide-react';

function AddStudentDialog({
  handleAddStudent,
  selectedStudents,
  setSelectedStudents,
  currentGroupStudents,
  openDialog,
  setOpenDialog,
  loadingStudents,
}) {
  const { students } = useMainContext();

  const [searchTerm, setSearchTerm] = useState('');

  // Filter students based on the search term
  const studentsFilter = students.filter((s) =>
    s.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle adding/removing student by clicking on the table row
  const handleRowClick = (studentId) => {
    if (currentGroupStudents.includes(studentId)) return;

    setSelectedStudents((prevSelected) =>
      prevSelected.includes(studentId)
        ? prevSelected.filter((id) => id !== studentId)
        : [...prevSelected, studentId]
    );
  };

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button>O'quvchi qo'shish</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>O'quvchilarni ushbu guruhga qo'shish</DialogTitle>
        </DialogHeader>
        <div>
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="O'quvchilarni qidiring"
          />
        </div>
        <ScrollArea className="h-[300px] overflow-auto rounded-md">
          <Table className="h-full">
            {!studentsFilter.length && (
              <TableCaption>Student is not defined</TableCaption>
            )}
            <TableHeader className="sticky top-0">
              <TableRow>
                <TableHead></TableHead>
                <TableHead>Ism familya</TableHead>
                <TableHead>Manzil</TableHead>
                <TableHead>Telefon raqam</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="w-full">
              {studentsFilter.map((student) => (
                <TableRow
                  title={
                    currentGroupStudents.includes(student.id) &&
                    "O'quvchi allaqachon qo'shilgan"
                  }
                  key={student.id}
                  onClick={() => handleRowClick(student.id)}
                  className={`cursor-pointer ${
                    currentGroupStudents.includes(student.id)
                      ? 'opacity-40 pointer-events-none cursor-not-allowed'
                      : selectedStudents.includes(student.id)
                      ? 'bg-secondary hover:bg-muted/80 dark:bg-muted'
                      : ''
                  }`}
                >
                  <TableCell className="w-fit">
                    {selectedStudents.includes(student.id) && (
                      <Check className="w-4 h-4 text-green-500 mx-auto" />
                    )}

                    {!selectedStudents.includes(student.id) &&
                      currentGroupStudents.includes(student.id) && (
                        <X className="w-4 h-4 text-primary dark:text-white mx-auto" />
                      )}

                    {!selectedStudents.includes(student.id) &&
                      !currentGroupStudents.includes(student.id) && (
                        <Circle className="w-4 h-4 text-primary dark:text-white mx-auto" />
                      )}
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
              Close
            </Button>
          </DialogClose>
          <Button
            disabled={loadingStudents}
            className="flex items-center gap-1.5"
            onClick={handleAddStudent}
          >
            {loadingStudents && <Loader className="w-3 h-3 animate-spin" />}
            <span>Qo'shish</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddStudentDialog;
