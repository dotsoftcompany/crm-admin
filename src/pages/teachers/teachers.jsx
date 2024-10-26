import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import BreadcrumbComponent from '@/components/breadcrumb';
import { useMainContext } from '@/context/main-context';

import TeachersDataTable from '@/components/teachers/data-table';
import EditDialog from '@/components/dialogs/edit-dialog';
import DeleteAlert from '@/components/dialogs/delete-alert';
import TeacherEdit from '@/components/teachers/edit';

function Teachers() {
  const { teachers } = useMainContext();

  const [openTeacherEditDialog, setOpenTeacherEditDialog] = useState(false);
  const [openTeacherDeleteDialog, setOpenTeacherDeleteDialog] = useState(false);
  const [id, setId] = useState('');

  return (
    <div className="px-4 lg:px-8 mx-auto py-4 space-y-4 overflow-x-hidden">
      <BreadcrumbComponent title="O'qituvchilar ro'yxati" />

      <EditDialog
        id={id}
        open={openTeacherEditDialog}
        setOpen={setOpenTeacherEditDialog}
      >
        <TeacherEdit id={id} setCloseDialog={setOpenTeacherEditDialog} />
      </EditDialog>

      <DeleteAlert
        id={id}
        collection="teachers"
        open={openTeacherDeleteDialog}
        setOpen={setOpenTeacherDeleteDialog}
      />

      <div>
        <h2 className="text-2xl font-bold tracking-tight">
          O'qituvchilar ro'yxati
        </h2>
        <p className="text-muted-foreground">Barcha o'qituvchilar ro'yxati!</p>
      </div>

      <TeachersDataTable
        setId={setId}
        data={teachers}
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
  );
}

export default Teachers;
