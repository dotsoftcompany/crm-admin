import React, { useState } from 'react';
import BreadcrumbComponent from '@/components/breadcrumb';
import { cardData } from '@/lib/data';
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
<<<<<<< HEAD
import { useMainContext } from '@/context/main-context';

function Groups() {
  const { groups, courses } = useMainContext();

=======
import EditDialog from '@/components/dialogs/edit-dialog';
import CourseEdit from '@/components/courses/edit';
import DeleteAlert from '@/components/dialogs/delete-alert';
import GroupEdit from '@/components/groups/edit';

function Groups() {
  const [openGroupEditDialog, setOpenGroupEditDialog] = useState(false);
  const [openGroupDeleteDialog, setOpenGroupDeleteDialog] = useState(false);
>>>>>>> 7d5e10636e085be33ea35a4a41875b83dd131b76
  return (
    <div className="px-4 lg:px-8 mx-auto my-4 space-y-4">
      <BreadcrumbComponent title="Kurslar" />

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

      <div className="flex items-center justify-between">
        <Input className="max-w-sm" placeholder="Guruhlarni qidirish" />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="ml-auto hidden h-8 lg:flex"
            >
              <Settings2 className="mr-2 h-4 w-4" />
              Filtrlash
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[150px]">
            <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {/* {table
              .getAllColumns()
              .filter(
                (column) =>
                  typeof column.accessorFn !== 'undefined' &&
                  column.getCanHide()
              )
              .map((column) => {
                return ( */}
            <DropdownMenuCheckboxItem
              // key={column.id}
              className="capitalize"
              // checked={column.getIsVisible()}
              checked={true}
              // onCheckedChange={(value) => column.toggleVisibility(!!value)}
            >
              Toq kunlar
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              // key={column.id}
              className="capitalize"
              // checked={column.getIsVisible()}
              checked={true}
              // onCheckedChange={(value) => column.toggleVisibility(!!value)}
            >
              Juft kunlar
            </DropdownMenuCheckboxItem>
            {/* );
              })} */}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {groups.map((card) => (
          <Link key={card.id} to={`/groups/${card.id}`}>
            <Card key={card.id} className="group-card group-dark-card">
              <div className="p-4 pb-0 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Badge variant={card.selectedDay === 'odd' ? 'odd' : 'even'}>
                            {card.timeInDay}
                          </Badge>
                        </TooltipTrigger>
                        <TooltipContent side="top">
                          <p className="text-xs font-medium text-accent-foreground">
                            {card.days === 'odd'
                              ? 'Du - Chor - Jum'
                              : 'Se - Pay - Shan'}
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    {/* <Badge variant={card.status ? 'active' : 'inactive'}>
                      {card.status ? 'Aktiv' : 'Tugatildi'}
                    </Badge> */}
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          className="h-5 w-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                          />
                        </svg>
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[160px]">
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenGroupEditDialog(true);
                          document.body.style.pointerEvents = '';
                        }}
                      >
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenGroupDeleteDialog(true);
                          document.body.style.pointerEvents = '';
                        }}
                      >
                        Delete
                        <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg lg:text-xl font-semibold">
                      {card.cour}
                    </h2>
                    <span className="text-base text-muted-foreground">
                      {card.groupNumber}
                    </span>
                  </div>

                  <div className="flex gap-2 mt-2">
                    <div className="flex items-center -space-x-3">
                      {/* {card.avatars.map((avatar, index) => (
                        <Avatar key={index} className="h-6 w-6 shadow border">
                          <AvatarImage src={avatar.src} alt={avatar.alt} />
                          <AvatarFallback>{avatar.fallback}</AvatarFallback>
                        </Avatar>
                      ))} */}
                    </div>
                    <Badge
                      className="text-sm px-2 font-medium"
                      variant="secondary"
                    >
                      {/* Talabalar: {card.students}ta */}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between py-3 px-4 mt-4 border-t border-border">
                <div className="flex items-center gap-2 w-52">
                  <Avatar className="h-8 w-8">
                    {/* <AvatarImage
                      src={card.teacher.avatar}
                      alt={card.teacher.name}
                    /> */}
                    {/* <AvatarFallback>{card.teacher.fallback}</AvatarFallback> */}
                  </Avatar>
                  <span className="text-sm font-medium truncate">
                    {/* {card.teacher.name} */}
                  </span>
                </div>
                <small className="text-sm px-2 font-medium text-muted-foreground">
                  {/* {card.date} */}
                </small>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Groups;
