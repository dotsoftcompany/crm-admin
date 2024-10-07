import React, { useState } from 'react';
import BreadcrumbComponent from '@/components/breadcrumb';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { Dot, Settings2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { useMainContext } from '@/context/main-context';
import EditDialog from '@/components/dialogs/edit-dialog';
import CourseEdit from '@/components/courses/edit';
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

  return (
    <div className="px-4 lg:px-8 mx-auto my-4 space-y-4">
      <BreadcrumbComponent title="Guruhlar ro'yxati" />

      <EditDialog open={openGroupEditDialog} setOpen={setOpenGroupEditDialog}>
        <GroupEdit />
      </EditDialog>

      <DeleteAlert
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
              setOpenDelete={setOpenGroupDeleteDialog}
              setOpenEdit={setOpenGroupEditDialog}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Groups;
