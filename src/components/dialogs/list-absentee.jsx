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

function ListAbsenteeDialog({ id, absentees, students, open, setOpen }) {
  const filteredAbsentee = absentees.filter((absentee) => absentee.id === id);

  const absentStudentIds = filteredAbsentee.flatMap(
    (absentee) => absentee.students
  );

  const didNotComeStudents = students.filter((student) =>
    absentStudentIds.includes(student.id)
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            Darsga kelmagan o'quvchilar:
            <span className="pl-2">{filteredAbsentee[0]?.date}</span>
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[300px] overflow-auto rounded-md">
          <Table>
            <TableCaption
              className={
                !didNotComeStudents.length
                  ? 'bg-muted/50 py-4 rounded-b-md'
                  : 'py-4'
              }
            >
              {!didNotComeStudents.length && 'Darsga hamma kelgan.'}
            </TableCaption>
            <TableHeader className="sticky top-0">
              <TableRow>
                <TableHead className="whitespace-nowrap">Ism familya</TableHead>
                <TableHead className="whitespace-nowrap">Manzil</TableHead>
                <TableHead className="whitespace-nowrap">
                  Telefon raqam
                </TableHead>
                <TableHead>Ota-onasi raqami</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="w-full overflow-y-auto">
              {students.map((student) => {
                const isAbsent = absentStudentIds.includes(student.id);

                return (
                  <TableRow
                    key={student.id}
                    className={isAbsent ? 'text-red-500' : 'text-primary'}
                  >
                    <TableCell className="truncate">
                      {student.fullName}
                    </TableCell>
                    <TableCell>{student.address}</TableCell>
                    <TableCell>{student.phoneNumber}</TableCell>
                    <TableCell>{student.parentPhoneNumber}</TableCell>
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
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ListAbsenteeDialog;
