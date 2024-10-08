import * as React from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Months } from './months';

export function MonthPicker({ className, month, setMonth }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-60 justify-start text-left font-normal',
            !month && 'text-muted-foreground',
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {month ? format(month, 'MMMM yyyy') : <span>Oyni tanlang</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Months
          currentMonth={month}
          onMonthChange={(value) => setMonth(value)}
        />
      </PopoverContent>
    </Popover>
  );
}
