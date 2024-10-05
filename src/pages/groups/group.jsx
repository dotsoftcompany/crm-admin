import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { cardData } from '@/lib/data';

import { Button } from '@/components/ui/button';

import StudentsDataTable from '@/components/students/data-table';
import GroupHeader from '@/components/groups/header';
import AddStudentDialog from '@/components/groups/add-student-dialog';
import { useMainContext } from '@/context/main-context';
import BreadcrumbComponent from '@/components/breadcrumb';
import EditDialog from '@/components/dialogs/edit-dialog';
import StudentEdit from '@/components/students/edit';
import DeleteAlert from '@/components/dialogs/delete-alert';

const Group = () => {
  const { groups, courses } = useMainContext();
  const [openAddStudentDialog, setOpenAddStudentDialog] = useState(false);
  const [openStudentEditDialog, setOpenStudentEditDialog] = useState(false);
  const [openStudentDeleteDialog, setOpenStudentDeleteDialog] = useState(false);
  const { groupId } = useParams();

  const group = groups.find((g) => g.id === groupId);

  if (!group) {
    return (
      <div className="px-4 lg:px-8 mx-auto py-4">
        <h2 className="text-2xl font-bold tracking-tight">404 error</h2>
        <p className="text-muted-foreground">
          Siz qidirayotgan guruh topilmadi!
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="px-4 lg:px-8 mt-4">
        <BreadcrumbComponent
          title="Guruhlar ro'yxati"
          titleLink="/groups"
          subtitle={
            courses.filter((item) => item.id === group.courseId)[0].courseTitle
          }
        />
        <GroupHeader group={group} />
      </div>

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

      <div className="px-4 lg:px-8 mx-auto space-y-2">
        <StudentsDataTable
          setOpenEdit={setOpenStudentEditDialog}
          setOpenDelete={setOpenStudentDeleteDialog}
        >
          <AddStudentDialog
            openAddStudentDialog={openAddStudentDialog}
            setOpenAddStudentDialog={setOpenAddStudentDialog}
          />
        </StudentsDataTable>
      </div>
    </>
  );
};

export default Group;
