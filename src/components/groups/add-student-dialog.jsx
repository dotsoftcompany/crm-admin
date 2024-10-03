import React from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
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
import { Input } from '../ui/input';

function AddStudentDialog({ openAddStudentDialog, setOpenAddStudentDialog }) {
  return (
    <Dialog open={openAddStudentDialog} onOpenChange={setOpenAddStudentDialog}>
      <DialogTrigger asChild>
        <Button>O'quvchi qo'shish</Button>
      </DialogTrigger>
      <DialogContent className="max-w-xl">
        <div>
          <Input placeholder="O'quvchilarni qidiring" />
        </div>
        <div>
          <ScrollArea className="h-[300px] overflow-auto rounded-md">
            <Table className="h-full">
              <TableCaption>A list of your recent invoices.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Ism</TableHead>
                  <TableHead>Familiya</TableHead>
                  <TableHead>Telefon raqam</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="w-full">
                <TableRow>
                  <TableCell className="font-medium">Javohir</TableCell>
                  <TableCell>Tursunqulov</TableCell>
                  <TableCell>+99899 557 20 27</TableCell>
                  <TableCell className="text-right">
                    <Button className="text-xs md:text-sm h-8 px-3">
                      Qo'shish
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Javohir</TableCell>
                  <TableCell>Tursunqulov</TableCell>
                  <TableCell>+99899 557 20 27</TableCell>
                  <TableCell className="text-right">
                    <Button className="text-xs md:text-sm h-8 px-3">
                      Qo'shish
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default AddStudentDialog;
