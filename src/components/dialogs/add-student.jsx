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
import { Checkbox } from '../ui/checkbox';

function AddStudentDialog({
  handleAddStudent,
  selectedStudents,
  setSelectedStudents,
  currentGroupStudents,
  openDialog,
  setOpenDialog,
}) {
  const { students } = useMainContext();

  const [searchTerm, setSearchTerm] = useState('');

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
            {!studentsFilter.length > 0 && (
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
                    currentGroupStudents.includes(student.id)
                      ? 'This student already added this group'
                      : null
                  }
                  key={student.id}
                  className={
                    currentGroupStudents.includes(student.id)
                      ? 'opacity-40'
                      : 'opacity-100'
                  }
                >
                  <TableCell>
                    <Checkbox
                      disabled={currentGroupStudents.includes(student.id)}
                      type="checkbox"
                      checked={selectedStudents.includes(student.id)}
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
              Close
            </Button>
          </DialogClose>
          <Button onClick={handleAddStudent}>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddStudentDialog;
