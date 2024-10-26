import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import { useMainContext } from '@/context/main-context';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';

import TeacherHeader from '@/components/teachers/header';
import BreadcrumbComponent from '@/components/breadcrumb';
import GroupCard from '@/components/groups/card';
import EditDialog from '@/components/dialogs/edit-dialog';
import GroupEdit from '@/components/groups/edit';
import DeleteAlert from '@/components/dialogs/delete-alert';
import FilterGroups from '@/components/groups/filter';
import { GroupCarLoading } from '../groups/groups';
import LessonsSchedule from '@/components/teachers/lesson-schedule';

const Teacher = () => {
  const { groups, courses, teachers, loading, uid } = useMainContext();
  const { teacherId } = useParams();

  const teacher = teachers.find((t) => t.id === teacherId);
  const teacherGroups = groups.filter((group) => group.teacherId === teacherId);

  const [openGroupEditDialog, setOpenGroupEditDialog] = useState(false);
  const [openGroupDeleteDialog, setOpenGroupDeleteDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOption, setFilterOption] = useState('title');
  const [id, setId] = useState('');

  const filteredGroups = teacherGroups.filter((group) => {
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

  if (loading || !teacher) {
    return (
      <div className="px-4 lg:px-8 mx-auto py-4 space-y-3 md:space-y-5">
        <Skeleton className="h-4 w-72" />
        <div className="space-y-2 pb-4 w-full border-b border-border">
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-64" />
          </div>

          <div className="flex items-center gap-3 md:gap-5">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="h-9 w-64" />
            <Skeleton className="h-9 w-20" />
          </div>
          <Skeleton className="h-9 w-28" />
        </div>
        <GroupCarLoading />
      </div>
    );
  }

  return (
    <div className="px-4 lg:px-8 mx-auto my-4 space-y-4">
      <BreadcrumbComponent
        title="O'qituvchilar ro'yxati"
        titleLink="/teachers"
        subtitle={teacher?.fullName}
      />
      <TeacherHeader teacher={teacher} />

      <Tabs defaultValue="groups" className="space-y-4">
        <TabsList>
          <TabsTrigger value="groups">Guruhlar ro'yxati</TabsTrigger>
          <TabsTrigger value="lesson-schedule">Dars jadvali</TabsTrigger>
        </TabsList>
        <TabsContent value="groups">
          <EditDialog
            open={openGroupEditDialog}
            setOpen={setOpenGroupEditDialog}
          >
            <GroupEdit id={id} setCloseDialog={setOpenGroupEditDialog} />
          </EditDialog>

          <DeleteAlert
            id={id}
            collection={`users/${uid}/groups`}
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
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-4">
            {filteredGroups.map((card) => (
              <Link key={card.id} to={`/groups/${card.id}`}>
                <GroupCard
                  card={card}
                  setOpenDelete={() => {
                    setId(card.id);
                    setOpenGroupDeleteDialog(true);
                  }}
                  setOpenEdit={() => {
                    setId(card.id);
                    setOpenGroupEditDialog(true);
                  }}
                />
              </Link>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="lesson-schedule">
          <LessonsSchedule teacherId={teacherId} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Teacher;
