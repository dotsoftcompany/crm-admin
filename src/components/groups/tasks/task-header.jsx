import React from 'react';

import { Calendar } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

function TaskHeader({ task, messages, loading }) {
  if (loading) {
    return (
      <div className="space-y-2 py-4 w-full border-b border-border">
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-1/3" />
        </div>

        <div className="flex items-center gap-3 md:gap-5">
          <div className="flex items-center gap-1 text-xs md:text-sm">
            <Skeleton className="w-2 h-2 rounded-full" />
            <Skeleton className="h-4 w-12" />
          </div>
          <div className="text-xs md:text-sm">
            <Skeleton className="h-4 w-20" />
          </div>

          <div className="flex items-center gap-1 text-xs md:text-sm text-muted-foreground">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <Skeleton className="h-4 w-16" />
          </div>
          <div className="flex items-center gap-1 text-xs md:text-sm text-muted-foreground">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
      </div>
    );
  }

  function formatDate(timestamp) {
    if (!timestamp) return null;

    const { seconds, nanoseconds } = timestamp;
    const date = new Date(seconds * 1000 + nanoseconds / 1000000);
    return format(date, 'dd.MM.yy');
  }

  return (
    <div className="space-y-2 py-4 w-full">
      <div>
        <h1 className="text-lg md:text-xl font-semibold">{task?.title}</h1>
        <p className="text-sm text-muted-foreground max-w-2xl">
          {task?.description}
        </p>
      </div>

      <div className="flex items-center gap-3 md:gap-5">
        <div className="flex items-center gap-1 text-xs md:text-sm text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span>{formatDate(task?.due)}</span>
        </div>
        <div className="flex items-center gap-1 text-xs md:text-sm">
          <Badge variant="active" className="px-2">
            {task?.images ? task?.images?.length : 0}
          </Badge>
          <span>Attachments</span>
        </div>
        <div className="flex items-center gap-1 text-xs md:text-sm">
          <Badge variant="inactive" className="px-2">
            {messages ? messages?.length : 0}
          </Badge>
          <span>Message</span>
        </div>
      </div>
    </div>
  );
}

export default TaskHeader;
