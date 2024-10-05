import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import StudentsDataTable from '@/components/students/data-table';
import BreadcrumbComponent from '@/components/breadcrumb';
import EditDialog from '@/components/dialogs/edit-dialog';
import DeleteAlert from '@/components/dialogs/delete-alert';
import GroupEdit from '@/components/groups/edit';
import StudentEdit from '@/components/students/edit';

function Students() {
  const [openStudentEditDialog, setOpenStudentEditDialog] = useState(false);
  const [openStudentDeleteDialog, setOpenStudentDeleteDialog] = useState(false);
  return (
    <div className="px-4 lg:px-8 mx-auto my-4 space-y-2">
      <BreadcrumbComponent title="O'quvchilar ro'yxati" />

      <EditDialog
        open={openStudentEditDialog}
        setOpen={setOpenStudentEditDialog}
      >
        <StudentEdit />
      </EditDialog>

      <DeleteAlert
        open={openStudentDeleteDialog}
        setOpen={setOpenStudentDeleteDialog}
      />

      <div>
        <h2 className="text-2xl font-bold tracking-tight">
          O'quvchilar ro'yxati
        </h2>
        <p className="text-muted-foreground">Barcha o'quvchilar ro'yxarti!</p>
      </div>

      <div>
        <StudentsDataTable
          setOpenEdit={setOpenStudentEditDialog}
          setOpenDelete={setOpenStudentDeleteDialog}
        >
          <Link to="/add-student">
            <Button>O'quvchi qo'shish</Button>
          </Link>
        </StudentsDataTable>
      </div>
    </div>
  );
}

export default Students;
