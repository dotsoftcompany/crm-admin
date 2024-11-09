import { useState, useEffect } from 'react';
import { getLocalTimeZone, today } from '@internationalized/date';
import {
  DateInput,
  DatePicker,
  DateSegment,
  Group,
} from 'react-aria-components';

export default function InputDatePicker({
  formattedDate,
  setFormattedDate,
  ariaLabelledby,
  notFormat = false,
}) {
  const [selectedDate, setSelectedDate] = useState(today(getLocalTimeZone()));

  const formatDate = (date) => {
    const jsDate = new Date(date.year, date.month - 1, date.day);
    const day = String(jsDate.getDate()).padStart(2, '0');
    const month = String(jsDate.getMonth() + 1).padStart(2, '0');
    const year = jsDate.getFullYear();
    return `${day}.${month}.${year}`;
  };

  useEffect(() => {
    if (!notFormat) {
      setFormattedDate(formatDate(selectedDate));
    } else {
      setFormattedDate(selectedDate.toString());
    }
  }, [selectedDate, notFormat]);

  return (
    <DatePicker
      className="space-y-2"
      value={selectedDate}
      onChange={setSelectedDate}
      aria-labelledby={ariaLabelledby}
    >
      <Group className="inline-flex h-10 w-full items-center justify-center whitespace-nowrap rounded-lg border border-input bg-background px-3 py-2 text-sm shadow-sm shadow-black/[.04] ring-offset-background transition-shadow data-[focus-within]:border-ring data-[disabled]:opacity-50 data-[focus-within]:outline-none data-[focus-within]:ring-2 data-[focus-within]:ring-ring/30 data-[focus-within]:ring-offset-2">
        <DateInput className="w-full mx-auto">
          {(segment) => (
            <DateSegment
              segment={segment}
              className="inline rounded p-0.5 text-foreground caret-transparent outline outline-0 data-[disabled]:cursor-not-allowed data-[focused]:bg-accent data-[invalid]:data-[focused]:bg-destructive data-[type=literal]:px-0 data-[focused]:data-[placeholder]:text-foreground data-[focused]:text-foreground data-[invalid]:data-[focused]:data-[placeholder]:text-destructive-foreground data-[invalid]:data-[focused]:text-destructive-foreground data-[invalid]:data-[placeholder]:text-destructive data-[invalid]:text-destructive data-[placeholder]:text-muted-foreground/70 data-[type=literal]:text-muted-foreground/70 data-[disabled]:opacity-50"
            />
          )}
        </DateInput>
      </Group>
    </DatePicker>
  );
}
