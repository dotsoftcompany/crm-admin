import React from 'react';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { useMainContext } from '@/context/main-context';

function GroupHeader({ group }) {
  const { getUsertime, teachers, courses } = useMainContext();

  return (
    <div className="relative px-[2rem] bg-background space-y-2 py-4 border-b border-border w-full">
      <div className="flex items-center gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Badge
                className="md:text-sm"
                variant={group.selectedDay === 'odd' ? 'odd' : 'even'}
              >
                {group.timeInDay}
              </Badge>
            </TooltipTrigger>
            <TooltipContent side="top">
              <p className="text-xs font-medium text-accent-foreground">
                {group.selectedDay === 'odd'
                  ? 'Du - Chor - Jum'
                  : 'Se - Pay - Shan'}
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <Badge
          variant={group.status ? 'active' : 'inactive'}
          className="md:text-sm"
        >
          {group.status ? 'Aktiv' : 'Tugatildi'}
        </Badge>
      </div>
      <div className="flex items-center gap-2">
        <h1 className="text-xl md:text-2xl font-semibold">
          {courses.filter((item) => item.id === group.courseId)[0].courseTitle}
        </h1>
        <span className="text-base text-muted-foreground">
          #{group.groupNumber}
        </span>
      </div>
      <div className="flex items-end gap-2">
        <p className="text-base text-muted-foreground">Since: </p>
        <Badge className="md:text-sm" variant="outline">
          {getUsertime(new Date(group.startDate))}
        </Badge>
      </div>
      <Link to={`/teachers/1`}>
        <div className="absolute top-2 right-[2rem] z-10 flex items-center p-1 pl-3 rounded-md cursor-pointer hover:bg-accent duration-200 w-fit">
          <span className="mr-2 font-medium">
            {teachers.filter((item) => item.id === group.teacherId)[0].fullName}
          </span>
          <Avatar className="h-8 w-8 shadow">
            <AvatarImage
              src={
                teachers.filter((item) => item.id === group.teacherId)[0]
                  .fullName
              }
              alt={
                teachers.filter((item) => item.id === group.teacherId)[0]
                  .fullName
              }
            />
            <AvatarFallback className="text-xs bg-orange-500 text-white">
              {teachers
                .filter((item) => item.id === group.teacherId)[0]
                ?.fullName?.split(' ')
                .map((word) => word[0])
                .join('')
                .slice(0, 2)
                .toUpperCase() || 'N/A'}
            </AvatarFallback>
          </Avatar>
        </div>
      </Link>
    </div>
  );
}

export default GroupHeader;
