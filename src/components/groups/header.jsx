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
import { cn, formatDate } from '@/lib/utils';
import { Button } from '../ui/button';

function GroupHeader({ group }) {
  const { teachers, courses } = useMainContext();

  return (
    <div className="relative bg-background space-y-2 pt-4 w-full">
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
        <Badge
          className={cn(
            'md:text-sm',
            'border border-gray-300', // Outline style for light mode
            'dark:bg-secondary dark:border-none' // Secondary style for dark mode
          )}
          variant="outline"
        >
          {formatDate(group.startDate)}
        </Badge>
      </div>
      <div className="flex items-center gap-2">
        <h1 className="text-xl md:text-2xl font-semibold">
          {courses.filter((item) => item.id === group.courseId)[0].courseTitle}
        </h1>
        <span className="text-base text-muted-foreground mt-1">
          #{group.groupNumber}
        </span>
      </div>

      <Link to={`/teachers/1`} className="inline-flex">
        <Button variant="secondary" className="flex items-center p-1 pr-3 mt-2">
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
          <span className="ml-2 font-medium">
            {teachers.filter((item) => item.id === group.teacherId)[0].fullName}
          </span>
        </Button>
      </Link>
    </div>
  );
}

export default GroupHeader;
