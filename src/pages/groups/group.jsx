import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { cardData } from '@/lib/data';

import { Button } from '@/components/ui/button';

import StudentsDataTable from '@/components/students/data-table';
import GroupHeader from '@/components/groups/group-header';
import AddStudentDialog from '@/components/groups/add-student-dialog';
import { useMainContext } from '@/context/main-context';

const Group = () => {
  const [openAddStudentDialog, setOpenAddStudentDialog] = useState(false);
  const { groups } = useMainContext();
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
      <GroupHeader group={group} />

      <div className="px-4 lg:px-8 mx-auto space-y-2">
        <StudentsDataTable>
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
