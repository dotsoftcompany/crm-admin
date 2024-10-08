import React from 'react';

import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { KeyRound, MapPin, Phone, User, Users } from 'lucide-react';
import { formatPhoneNumber } from '@/lib/utils';

function StudentHeader({ student }) {
  const [showPassword, setShowPassword] = React.useState(false);
  return (
    <div className="space-y-2 pb-4 w-full border-b border-border">
      <div className="flex items-center gap-2">
        <h1 className="text-xl md:text-2xl font-semibold">
          {student.fullName}
        </h1>
        <Badge variant={student.isPaid ? 'active' : 'inactive'}>
          {student.isPaid ? "To'lov qilgan" : "To'lov qilmagan"}
        </Badge>
      </div>
      <div className="flex flex-wrap items-center gap-3 md:gap-5">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          <p className="text-sm md:text-base">{student.address}</p>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <a
                  href={`tel:${formatPhoneNumber(student.phoneNumber)}`}
                  className="text-sm md:text-base hover:underline"
                >
                  {student.phoneNumber}
                </a>
              </div>
            </TooltipTrigger>
            <TooltipContent side="top">
              <small className="text-xs">Shaxsiy telefon raqami</small>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <a
                  href={`tel:${student.phoneNumber}`}
                  className="text-sm md:text-base hover:underline"
                >
                  {student.phoneNumber}
                </a>
              </div>
            </TooltipTrigger>
            <TooltipContent side="top">
              <small className="text-xs">Ota-onasini telefon raqami</small>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        {!student.isStudentUpdate && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <p className="text-sm md:text-base">@{student.username}</p>
                </div>
              </TooltipTrigger>
              <TooltipContent side="top">
                <small className="text-xs">Username</small>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
        {!student.isStudentUpdate && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="flex items-center gap-2"
                >
                  <KeyRound className="h-4 w-4" />
                  {showPassword ? (
                    <p className="text-sm md:text-base">{student.password}</p>
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

export default StudentHeader;
