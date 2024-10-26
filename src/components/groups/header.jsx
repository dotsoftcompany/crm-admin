import React from 'react';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Link } from 'react-router-dom';
import { useMainContext } from '@/context/main-context';
import { formatDate } from '@/lib/utils';
import { Activity, Calendar, Clock, Phone, User } from 'lucide-react';

function GroupHeader({ group }) {
  const { teachers, courses } = useMainContext();

  const teacher = teachers.filter((item) => item.id === group.teacherId)[0]
    ?.fullName;



  return (
    <div className="space-y-2 py-4 w-full border-b border-border">
      <div className="flex items-center gap-2">
        <h1 className="text-xl md:text-2xl font-semibold">
          {courses.filter((item) => item.id === group.courseId)[0].courseTitle}
        </h1>
        <span className="text-base text-muted-foreground mt-1">
          #{group.groupNumber}
        </span>
      </div>
      <div className="flex items-center gap-3 md:gap-5">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div
                className={`flex items-center gap-1 text-xs md:text-sm ${
                  group.selectedDay === 'odd'
                    ? 'text-orange-500'
                    : group.selectedDay === 'even'
                    ? 'text-purple-500'
                    : 'text-primary'
                }`}
              >
                <Clock className="h-4 w-4" />
                <p className="text-sm md:text-base">{group.timeInDay}</p>
              </div>
            </TooltipTrigger>
            <TooltipContent side="top">
              <p className="text-xs font-medium text-accent-foreground">
                {group.selectedDay === 'odd'
                  ? 'Du - Chor - Jum'
                  : group.selectedDay === 'even'
                  ? 'Se - Pay - Shan'
                  : 'Har kuni'}
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <div
          className={`flex items-center gap-1 text-xs md:text-sm ${
            group.status ? 'text-green-500' : 'text-red-500'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>{group.status ? 'Aktiv' : 'Tugatildi'}</span>
        </div>

        <div className="flex items-center gap-1">
          <User className="w-4 h-4" />
          <Link
            to={teacher ? `/teachers/${group?.teacherId}` : null}
            className="inline-flex"
          >
            <span className={teacher ? 'hover:underline' : 'cursor-text'}>
              {teacher ? teacher : 'Ustoz tanlanmagan'}
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-1 text-xs md:text-sm text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span>{formatDate(group.startDate)}</span>
        </div>
      </div>
    </div>
  );
}

export default GroupHeader;
