import React, { useState } from 'react';
import TeachersDataTable from '@/components/teachers/data-table';

import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import BreadcrumbComponent from '@/components/breadcrumb';
import EditDialog from '@/components/dialogs/edit-dialog';
import DeleteAlert from '@/components/dialogs/delete-alert';
import TeacherEdit from '@/components/teachers/edit';
import { PlusCircle } from 'lucide-react';

function Teachers() {
  const [openTeacherEditDialog, setOpenTeacherEditDialog] = useState(false);
  const [openTeacherDeleteDialog, setOpenTeacherDeleteDialog] = useState(false);
  return (
    <div className="px-4 lg:px-8 mx-auto py-4 space-y-4">
      <BreadcrumbComponent title="O'qituvchilar ro'yxati" />

      <EditDialog
        open={openTeacherEditDialog}
        setOpen={setOpenTeacherEditDialog}
      >
        <TeacherEdit />
      </EditDialog>

      <DeleteAlert
        open={openTeacherDeleteDialog}
        setOpen={setOpenTeacherDeleteDialog}
      />

      <div>
        <h2 className="text-2xl font-bold tracking-tight">
          O'qituvchilar ro'yxati
        </h2>
        <p className="text-muted-foreground">Barcha o'qituvchilar ro'yxati!</p>
      </div>

      <div>
        <TeachersDataTable
          setOpenEdit={setOpenTeacherEditDialog}
          setOpenDelete={setOpenTeacherDeleteDialog}
        >
          <Link to="/add-teacher">
            <Button
              variant="secondary"
              className="hidden md:flex items-center gap-1.5 h-9 dark:bg-primary dark:text-black"
            >
              <PlusCircle className="w-4 h-4 -ml-1" />
              <span>O'qituvchi qo'shish</span>
            </Button>
          </Link>
        </TeachersDataTable>
      </div>
    </div>
  );
}

export default Teachers;
