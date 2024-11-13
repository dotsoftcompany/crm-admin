import React from 'react';
import { useMainContext } from '@/context/main-context';
import { formatDate } from '@/lib/utils';
import { Users } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

function GroupCard({ card, studentCard = true, setOpenDelete, setOpenEdit }) {
  const { courses, teachers, students } = useMainContext();
  const groupStudents = students.filter((student) =>
    card?.students?.includes(student.id)
  );

  const teacherFullName = teachers?.filter(
    (item) => item.id === card?.teacherId
  )[0]?.fullName;

  const getInitials = (fullName) => {
    const nameParts = fullName.split(' ');

    if (nameParts.length === 1) {
      return nameParts[0].slice(0, 2).toUpperCase();
    } else {
      return nameParts[0][0].toUpperCase() + nameParts[1][0].toUpperCase();
    }
  };

  return (
    <Card key={card.id} className="bg-muted dark:bg-background group-card group-dark-card">
      <div className="p-4 pb-0 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Badge
                    variant={
                      card.selectedDay === 'odd'
                        ? 'odd'
                        : card.selectedDay === 'even'
                        ? 'even'
                        : 'every'
                    }
                  >
                    {card.timeInDay}
                  </Badge>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p className="text-xs font-medium text-accent-foreground">
                    {card.selectedDay === 'odd'
                      ? 'Du - Chor - Jum'
                      : card.selectedDay === 'even'
                      ? 'Se - Pay - Shan'
                      : 'Har kuni'}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Badge variant={card.status ? 'active' : 'inactive'}>
              {card.status ? 'Aktiv' : 'Tugatildi'}
            </Badge>
            <Badge
              className="bg-white dark:bg-muted flex items-center gap-1.5 w-fit text-xs"
              variant="secondary"
            >
              <Users className="w-3 h-3" />
              <span>
                {card?.students?.length
                  ? ` ${card?.students?.length} ta`
                  : ' 0'}
              </span>
            </Badge>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className={`${
                  studentCard
                    ? 'flex h-8 w-8 p-0 data-[state=open]:bg-muted'
                    : 'hidden'
                }`}
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
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[160px]">
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation(); // Prevent the click event from propagating
                  setOpenEdit(); // Call the function passed as a prop
                  document.body.style.pointerEvents = ''; // Optionally manage pointer events
                }}
              >
                Tahrirlash
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation(); // Prevent the click event from propagating
                  setOpenDelete(); // Call the function passed as a prop
                  document.body.style.pointerEvents = ''; // Optionally manage pointer events
                }}
              >
                O'chirish
                <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg lg:text-xl font-semibold">
              {
                courses.filter((item) => item.id === card.courseId)[0]
                  ?.courseTitle
              }
            </h2>
            <span className="text-base text-muted-foreground mt-0.5">
              #{card.groupNumber}
            </span>
          </div>
          {groupStudents?.length === 0 && (
            <p className="text-muted-foreground text-sm mt-1 md:mt-2">
              O'quvchi qo'shilmagan
            </p>
          )}
          <div className="flex items-center -space-x-2.5 mt-2 md:mt-3">
            {groupStudents.slice(0, 5).map((student) => (
              <Avatar
                title={student?.fullName}
                key={student.id}
                className="w-7 h-7 shadow border border-border"
              >
                <AvatarImage src="" />
                <AvatarFallback className="text-xs bg-white dark:bg-muted">
                  {getInitials(student?.fullName)}
                </AvatarFallback>
              </Avatar>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between py-3 px-4 mt-4 border-t border-border">
        <div className="flex items-center gap-2 w-52">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src=""
              alt={
                teacherFullName
                  ? teacherFullName
                  : 'Ustoz topilmadi - yangi ustoz tanlang'
              }
            />
            <AvatarFallback className="text-xs bg-white dark:bg-muted">
              {teacherFullName
                ?.split(' ')
                .map((word) => word[0])
                .join('')
                ?.slice(0, 2)
                .toUpperCase() || 'UT'}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium truncate">
            {teacherFullName ? teacherFullName : 'Ustoz tanlanmagan'}
          </span>
        </div>
        <small className="text-sm px-2 font-medium text-muted-foreground">
          {formatDate(card.startDate)}
        </small>
      </div>
    </Card>
  );
}

export default GroupCard;
