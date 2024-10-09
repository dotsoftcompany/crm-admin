import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import BreadcrumbComponent from '@/components/breadcrumb';
import { useMainContext } from '@/context/main-context';

import EditDialog from '@/components/dialogs/edit-dialog';
import DeleteAlert from '@/components/dialogs/delete-alert';
import GroupEdit from '@/components/groups/edit';
import GroupCard from '@/components/groups/card';
import FilterGroups from '@/components/groups/filter';

function Groups() {
  const { groups, courses, teachers } = useMainContext();
  const [openGroupEditDialog, setOpenGroupEditDialog] = useState(false);
  const [openGroupDeleteDialog, setOpenGroupDeleteDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOption, setFilterOption] = useState('title');
  const [filteredGroups, setFilteredGroups] = useState(groups);
  const [id, setId] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      const newFilteredGroups = groups.filter((group) => {
        switch (filterOption) {
          case 'title':
            return (
              courses
                .filter((item) => item.id === group.courseId)[0]
                ?.courseTitle.toLowerCase()
                .includes(searchTerm.toLowerCase()) ?? false
            );
          case 'teacher':
            return (
              teachers
                .filter((item) => item.id === group.teacherId)[0]
                ?.fullName.toLowerCase()
                .includes(searchTerm.toLowerCase()) ?? false
            );
          default:
            return false;
        }
      });
      setFilteredGroups(newFilteredGroups);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, filterOption, groups, courses, teachers]);

  return (
    <div className="px-4 lg:px-8 mx-auto my-4 space-y-4">
      <BreadcrumbComponent title="Guruhlar ro'yxati" />

      <EditDialog open={openGroupEditDialog} setOpen={setOpenGroupEditDialog}>
        <GroupEdit id={id} setCloseDialog={setOpenGroupEditDialog} />
      </EditDialog>

      <DeleteAlert
        id={id}
        collection="groups"
        open={openGroupDeleteDialog}
        setOpen={setOpenGroupDeleteDialog}
      />

      <div>
        <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
        <p className="text-muted-foreground">
          Here&apos;s a list of your tasks for this month!
        </p>
      </div>

      <FilterGroups
        url="/add-group"
        title="Add group"
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
    </div>
  );
}

export default Groups;
