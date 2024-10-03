import React from 'react';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

function GroupHeader({ group }) {
  return (
    <div className="px-[2rem] bg-background space-y-2 py-4 border-b border-border">
      <div className="flex items-center gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Badge
                className="md:text-sm"
                variant={group.days === 'odd' ? 'odd' : 'even'}
              >
                {group.time}
              </Badge>
            </TooltipTrigger>
            <TooltipContent side="top">
              <p className="text-xs font-medium text-accent-foreground">
                {group.days === 'odd' ? 'Du - Chor - Jum' : 'Se - Pay - Shan'}
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
      <div className="flex items-end gap-2">
        <h1 className="text-xl md:text-2xl font-semibold">{group.title}</h1>
        <span className="text-base text-muted-foreground">{group.code}</span>
      </div>
      <div className="flex items-end gap-2">
        <p className="text-base text-muted-foreground">Guruh yaratildi: </p>
        <Badge className="md:text-sm" variant="secondary">
          {group.date}
        </Badge>
      </div>
      <Link to={`/teacher/1`}>
        <div className="flex items-center p-1 pr-3 rounded-md cursor-pointer hover:bg-accent w-fit">
          <img
            src={group.teacher.avatar}
            alt={group.teacher.name}
            className="h-10 w-10 rounded-full border-2 border-white"
          />
          <span className="ml-2 font-medium">{group.teacher.name}</span>
        </div>
      </Link>
    </div>
  );
}

export default GroupHeader;
