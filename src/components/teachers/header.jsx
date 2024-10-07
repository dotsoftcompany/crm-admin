import React from 'react';

import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Calendar, CalendarPlus, MapPin, Users } from 'lucide-react';
import { formatDate, formatPhoneNumber } from '@/lib/utils';

function TeacherHeader({ teacher }) {
  return (
    <div className="bg-background space-y-2 border-b border-border pb-4">
      <div className="flex items-center gap-2 md:gap-3">
        <h1 className="text-xl md:text-2xl font-semibold">
          {teacher.fullName}
        </h1>
        <Badge>{teacher.position}</Badge>
      </div>
      <div className="flex items-center gap-3 md:gap-5">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          <p className="text-sm md:text-base">{teacher.address}</p>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <p className="text-sm md:text-base">
                  {formatDate(teacher.dateOfBirth)}
                </p>
              </div>
            </TooltipTrigger>
            <TooltipContent side="top">
              <small className="text-xs">Tug'ulgan yil</small>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div className="flex items-center gap-2">
                <CalendarPlus className="h-4 w-4" />
                <p className="text-sm md:text-base">
                  {formatDate(teacher.dateOfJoining)}
                </p>
              </div>
            </TooltipTrigger>
            <TooltipContent side="top">
              <small className="text-xs">Ishga kirgan sana</small>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4" />
          <a
            href={`tel:${teacher.phone}`}
            className="text-sm md:text-base hover:underline"
          >
            {formatPhoneNumber(teacher.phone)}
          </a>
        </div>
      </div>
    </div>
  );
}

export default TeacherHeader;
