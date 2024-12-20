import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import BreadcrumbComponent from '@/components/breadcrumb';
import { useMainContext } from '@/context/main-context';

import EditDialog from '@/components/dialogs/edit-dialog';
import DeleteAlert from '@/components/dialogs/delete-alert';
import GroupEdit from '@/components/groups/edit';
import GroupCard from '@/components/groups/card';
import FilterGroups from '@/components/groups/filter';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

function Groups() {
  const { groups, courses, teachers, loading, uid } = useMainContext();

  const [isCard, setIsCard] = useState(true);
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
        collection={`users/${uid}/groups`}
        open={openGroupDeleteDialog}
        setOpen={setOpenGroupDeleteDialog}
      />

      <div>
        <h2 className="text-2xl font-bold tracking-tight">
          Guruhlaringizni boshqaring
        </h2>
        <p className="text-muted-foreground">
          Guruh tafsilotlarini koʻring, aʼzolarni boshqaring.
        </p>
      </div>

      <FilterGroups
        url="/add-group"
        title="Guruh qo'shish"
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterOption={filterOption}
        setFilterOption={setFilterOption}
        card={{ isCard, setIsCard }}
      />

      {loading && <GroupCarLoading />}

      {filteredGroups.length == 0 && (
        <p className="!mt-10 text-muted-foreground text-center">
          Guruh topilmadi.
        </p>
      )}

      <div
        className={`grid gap-4 ${
          isCard ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'
        }`}
      >
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

export function GroupCarLoading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {[...Array(6)].map((_, index) => (
        <Card key={index}>
          <div className="p-4 pb-0 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Skeleton className="h-6 w-16 rounded" />
                <Skeleton className="h-6 w-24 rounded" />
              </div>
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <Skeleton className="h-6 w-40 rounded" />
                <Skeleton className="h-6 w-12 rounded" />
              </div>

              <div className="flex gap-0 mt-2">
                <Skeleton className="h-6 w-32 rounded" />
                <Skeleton className="h-6 w-24 rounded" />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between py-3 px-4 mt-4 border-t border-border">
            <div className="flex items-center gap-2 w-52">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-6 w-32 rounded" />
            </div>
            <Skeleton className="h-6 w-24 rounded" />
          </div>
        </Card>
      ))}
    </div>
  );
}
