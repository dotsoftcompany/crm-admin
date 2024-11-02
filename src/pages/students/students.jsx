import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import StudentsDataTable from '@/components/students/data-table';
import BreadcrumbComponent from '@/components/breadcrumb';
import EditDialog from '@/components/dialogs/edit-dialog';
import DeleteAlert from '@/components/dialogs/delete-alert';
import StudentEdit from '@/components/students/edit';
import { useMainContext } from '@/context/main-context';
import { PlusCircle } from 'lucide-react';
import DeleteStudentAlert from '@/components/dialogs/delete-student-alert';

function Students() {
  const { students } = useMainContext();
  const [openStudentEditDialog, setOpenStudentEditDialog] = useState(false);
  const [openStudentDeleteDialog, setOpenStudentDeleteDialog] = useState(false);
  const [id, setId] = useState('');

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
          O'quvchilar ro'yxati
        </h2>
        <p className="text-muted-foreground">Barcha o'quvchilar ro'yxarti!</p>
      </div>

      <StudentsDataTable
        id={id}
        setId={setId}
        data={students}
        setOpenEdit={setOpenStudentEditDialog}
        setOpenDelete={setOpenStudentDeleteDialog}
      >
        <Link to="/add-student">
          <Button
            variant="secondary"
            className="hidden md:flex items-center gap-1.5 h-9 dark:bg-primary dark:text-black"
          >
            <PlusCircle className="w-4 h-4 -ml-1" />
            <span>O'quvchi qo'shish</span>
          </Button>
        </Link>
      </StudentsDataTable>
    </div>
  );
}

export default Students;
