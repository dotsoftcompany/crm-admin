import React, { useState } from 'react';

import StudentsDataTable from '@/components/students/data-table';
import BreadcrumbComponent from '@/components/breadcrumb';
import EditDialog from '@/components/dialogs/edit-dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import StudentEdit from '@/components/students/edit';
import { useMainContext } from '@/context/main-context';
import DeleteStudentAlert from '@/components/dialogs/delete-student-alert';
import { MonthPicker } from '@/components/ui/month-picker';
import { hasPaidThisMonth } from '@/lib/utils';

function Students() {
  const { students } = useMainContext();
  const [openStudentEditDialog, setOpenStudentEditDialog] = useState(false);
  const [openStudentDeleteDialog, setOpenStudentDeleteDialog] = useState(false);
  const [month, setMonth] = useState(null);
  const [id, setId] = useState('');
  const [filter, setFilter] = useState('all');

  const handleChange = (value) => {
    setFilter(value);
  };

  const filteredStudents = () => {
    switch (filter) {
      case 'paid':
        const paidStudents = students.filter((student) =>
          hasPaidThisMonth(student.paymentHistory)
        );
        return paidStudents;

      case 'notPaid':
        const notPaidStudents = students.filter(
          (student) => !hasPaidThisMonth(student.paymentHistory)
        );
        return notPaidStudents;

      default:
        return students;
    }
  };

  return (
    <div className="px-4 lg:px-8 mx-auto my-4 space-y-2">
      <BreadcrumbComponent title="O'quvchilar ro'yxati" />

      <EditDialog
        id={id}
        open={openStudentEditDialog}
        setOpen={setOpenStudentEditDialog}
      >
        <StudentEdit id={id} setCloseDialog={setOpenStudentEditDialog} />
      </EditDialog>

      <DeleteStudentAlert
        id={id}
        open={openStudentDeleteDialog}
        setOpen={setOpenStudentDeleteDialog}
      />

      <div>
        <h2 className="text-2xl font-bold tracking-tight">
          Barcha o'quvchilar.
        </h2>
        <p className="text-muted-foreground">
          O'quvchilar ro'yxatini osongina boshqaring va ko'ring.
        </p>
      </div>

      <StudentsDataTable
        id={id}
        setId={setId}
        data={filteredStudents()}
        setOpenEdit={setOpenStudentEditDialog}
        setOpenDelete={setOpenStudentDeleteDialog}
      >
        <div className="flex items-center gap-2">
          <Select value={filter} onValueChange={handleChange}>
            <SelectTrigger className="md:w-44">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Barchasi</SelectItem>
              <SelectItem value="paid">To'lov qilganlar</SelectItem>
              <SelectItem value="notPaid">To'lov qilmaganlar</SelectItem>
            </SelectContent>
          </Select>
          <div className="items-center space-x-2">
            <MonthPicker className="w-44" month={month} setMonth={setMonth} />
          </div>
        </div>
      </StudentsDataTable>
    </div>
  );
}

export default Students;
