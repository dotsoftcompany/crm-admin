import React from 'react';

import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Calendar,
  CalendarPlus,
  KeyRound,
  MapPin,
  User,
  Users,
} from 'lucide-react';
import { formatDate, formatPhoneNumber } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

function TeacherHeader({ teacher }) {
  const [showPassword, setShowPassword] = React.useState(false);

  const username = teacher?.email?.replace(/@teacher\.uz$/, '');

  return (
    <div className="bg-background space-y-2 border-b border-border pb-4">
      <div className="flex items-center gap-2 md:gap-3">
        <h1 className="text-xl md:text-2xl font-semibold">
          {teacher.fullName}
        </h1>
        <Badge>{teacher.position}</Badge>
      </div>
      <div className="flex flex-wrap items-center gap-3 md:gap-5">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          <p className="text-sm md:text-base">{teacher.address}</p>
        </div>
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4" />
          <a
            href={`tel:${teacher.phone}`}
            className="text-sm md:text-base hover:underline"
          >
            {formatPhoneNumber(teacher.phone)}
          </a>
        </div>
        {!teacher.isTeacherUpdate && (
          <div className="h-full w-[1px] bg-border">‎</div>
        )}
        {!teacher.isTeacherUpdate && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <p className="text-sm md:text-base">{username}</p>
                </div>
              </TooltipTrigger>
              <TooltipContent side="top">
                <small className="text-xs">Username</small>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
        {!teacher.isTeacherUpdate && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="flex items-center gap-2"
                >
                  <KeyRound className="h-4 w-4" />
                  {showPassword ? (
                    <p className="text-sm md:text-base">{teacher.password}</p>
                  ) : (
                    <p className="text-sm md:text-base">********</p>
                  )}
                </div>
              </TooltipTrigger>
              <TooltipContent side="top">
                {showPassword ? (
                  <small className="text-xs">Password</small>
                ) : (
                  <small className="text-xs">Show Password</small>
                )}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
    </div>
  );
}

export default TeacherHeader;
