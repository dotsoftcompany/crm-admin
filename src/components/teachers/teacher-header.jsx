import React from 'react';

import { Badge } from '@/components/ui/badge';
import { formatPhoneNumber } from '@/lib/utils';

function TeacherHeader({ teacher }) {
  return (
    <div className="bg-background space-y-2 py-4 border-b border-border">
      <div className="flex items-center gap-2">
        <Badge>{teacher.position}</Badge>
      </div>
      <div className="flex items-end gap-2">
        <h1 className="text-xl md:text-2xl font-semibold">
          {teacher.fullName},
        </h1>
        <span className="text-base text-muted-foreground">
          {teacher.address}
        </span>
      </div>
      <div className="flex items-end gap-2">
        <div className="flex items-end gap-2">
          <p className="text-base text-muted-foreground">Since: </p>
          <Badge className="md:text-sm" variant="outline">
            {teacher.dateOfJoin}
          </Badge>
        </div>
        <Badge className="md:text-sm" variant="outline">
          {formatPhoneNumber(teacher.phone)}
        </Badge>
      </div>
      {/* <div className="flex items-center p-1 pr-3 rounded-md cursor-pointer hover:bg-accent w-fit">
        <img
          src={teacher.teacher.avatar}
          alt={teacher.teacher.name}
          className="h-10 w-10 rounded-full border-2 border-white"
        />
        <span className="ml-2 font-medium">{teacher.teacher.name}</span>
      </div> */}
    </div>
  );
}

export default TeacherHeader;
