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
import { useMainContext } from '@/context/main-context';
import { DatePicker } from '../ui/date-picker';

function AddStudentDialog({ openAddStudentDialog, setOpenAddStudentDialog }) {
  const { students } = useMainContext();

  const [searchTerm, setSearchTerm] = useState('');

  const studentsFilter = students.filter((s) =>
    s.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <Dialog open={openAddStudentDialog} onOpenChange={setOpenAddStudentDialog}>
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
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader className="sticky top-0">
              <TableRow>
                <TableHead className="w-[100px]">Ism familya</TableHead>
                <TableHead>Manzil</TableHead>
                <TableHead>Telefon raqam</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="w-full">
              {studentsFilter.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="truncate font-medium">
                    {student.fullName}
                  </TableCell>
                  <TableCell>{student.address}</TableCell>
                  <TableCell>{student.phoneNumber}</TableCell>
                  <TableCell className="text-right">
                    <Button className="h-8 text-sm">Qo'shish</Button>
                  </TableCell>
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
          <Button type="submit">Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddStudentDialog;
