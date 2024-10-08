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

function AddAbsenteeDialog({ open, setOpen }) {
  const { students } = useMainContext();

  const [date, setDate] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const studentsFilter = students.filter((s) =>
    s.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Darsga kelmagan o'quvchilar</DialogTitle>
        </DialogHeader>
        <div className="flex items-center gap-2">
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="O'quvchilarni qidiring"
          />
          <DatePicker setData={setDate} data={date} className="w-fit h-10" />
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
                    <Checkbox checked={true} />
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
          <Button type="submit">Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddAbsenteeDialog;
