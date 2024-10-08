import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import { useMainContext } from '@/context/main-context';

import TeacherHeader from '@/components/teachers/header';
import BreadcrumbComponent from '@/components/breadcrumb';
import GroupCard from '@/components/groups/card';
import EditDialog from '@/components/dialogs/edit-dialog';
import GroupEdit from '@/components/groups/edit';
import DeleteAlert from '@/components/dialogs/delete-alert';
import FilterGroups from '@/components/groups/filter';

const Teacher = () => {
  const { groups, courses, teachers } = useMainContext();
  const { teacherId } = useParams();

  const teacher = teachers.find((t) => t.id === teacherId);

  const [openGroupEditDialog, setOpenGroupEditDialog] = useState(false);
  const [openGroupDeleteDialog, setOpenGroupDeleteDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOption, setFilterOption] = useState('title');

  // You should put teacher's group right here.
  const filteredGroups = groups.filter((group) => {
    switch (filterOption) {
      case 'title':
        return courses
          .filter((item) => item.id === group.courseId)[0]
          .courseTitle.toLowerCase()
          .includes(searchTerm.toLowerCase());
      case 'teacher':
        return teachers
          .filter((item) => item.id === group.teacherId)[0]
          .fullName.toLowerCase()
          .includes(searchTerm.toLowerCase());
      default:
        return false;
    }
  });

  if (!teacher) {
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
    <div className="px-4 lg:px-8 mx-auto my-4 space-y-4">
      <BreadcrumbComponent
        title="O'qituvchilar ro'yxati"
        titleLink="/teachers"
        subtitle="John Doe"
      />
      <TeacherHeader teacher={teacher} />

      <EditDialog open={openGroupEditDialog} setOpen={setOpenGroupEditDialog}>
        <GroupEdit />
      </EditDialog>

      <DeleteAlert
        open={openGroupDeleteDialog}
        setOpen={setOpenGroupDeleteDialog}
      />

      <FilterGroups
        url="/add-teacher"
        title="Add teacher"
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterOption={filterOption}
        setFilterOption={setFilterOption}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredGroups.map((card) => (
          <Link key={card.id} to={`/groups/${card.id}`}>
            <GroupCard
              card={card}
              setOpenDelete={setOpenGroupDeleteDialog}
              setOpenEdit={setOpenGroupEditDialog}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Teacher;
