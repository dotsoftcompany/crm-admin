import React from 'react';

import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Phone, Users } from 'lucide-react';

function StudentHeader({ student }) {
  return (
    <div className="bg-background space-y-2">
      <div className="flex items-center gap-2">
        <Badge variant={student.isPaid ? 'active' : 'inactive'}>
          {student.isPaid ? "To'lov qilgan" : "To'lov qilmagan"}
        </Badge>
      </div>
      <div className="flex items-end gap-2">
        <h1 className="text-xl md:text-2xl font-semibold">
          {student.fullName},
        </h1>
        <span className="text-base text-muted-foreground">
          {student.address}
        </span>
      </div>
      <div className="flex items-center gap-3 md:gap-5">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <a
                  href={`tel:${student.phoneNumber}`}
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
      </div>
    </div>
  );
}

export default StudentHeader;
