import React from 'react';
import { useMainContext } from '@/context/main-context';
import { formatDate } from '@/lib/utils';

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
  const { courses, teachers } = useMainContext();

  const teacherFullName = teachers?.filter(
    (item) => item.id === card?.teacherId
  )[0]?.fullName;

  return (
    <Card key={card.id} className="group-card group-dark-card">
      <div className="p-4 pb-0 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
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
            <span className="text-base text-muted-foreground">
              #{card.groupNumber}
            </span>
          </div>

          <div className="flex gap-0 mt-2">
            <div className="flex items-center -space-x-3">
              {/* Optionally display avatars here */}
            </div>
            <Badge className="text-sm px-2 font-medium" variant="secondary">
              Talabalar soni:
              {card?.students?.length ? ` ${card?.students?.length} ta` : ' 0'}
            </Badge>
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
            <AvatarFallback className="text-xs">
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
