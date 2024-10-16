import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { useMainContext } from '@/context/main-context';
import { formatNumber } from '@/lib/utils';
import { Button } from './ui/button';
import { ChevronRight } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';

export function RecentlyAdded() {
  const { courses, teachers, students, groups } = useMainContext();
  const [viewAll, setViewAll] = useState(false);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const allData = [
    ...courses.map((item) => ({ ...item, type: 'course' })),
    ...teachers.map((item) => ({ ...item, type: 'teacher' })),
    ...groups.map((item) => ({ ...item, type: 'group' })),
    ...students.map((item) => ({ ...item, type: 'student' })),
  ];

  const sortedData = allData.sort((a, b) => b.timestamp - a.timestamp);

  const displayedItems = !viewAll ? sortedData.slice(0, 5) : sortedData;
  return (
    <ul>
      <ScrollArea className="h-72">
        {displayedItems.map((item, index) => {
          switch (item.type) {
            case 'course':
              return (
                <li key={index} className="flex items-center py-2">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {item.courseTitle}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(item.timestamp)}
                    </p>
                  </div>

                  <Badge variant="active" className="ml-auto">
                    Kurs
                  </Badge>
                </li>
              );
            case 'teacher':
              return (
                <li key={index} className="flex items-center py-2">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {item.fullName}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(item.timestamp)}
                    </p>
                  </div>

                  <Badge variant="odd" className="ml-auto">
                    O'qituvchi
                  </Badge>
                </li>
              );
            case 'group':
              const courseTitle =
                courses.find((course) => course.id === item.courseId)
                  ?.courseTitle || 'Unknown Course';
              return (
                <li key={index} className="flex items-center py-2">
                  <div className="space-y-1">
                    <p className="flex items-center gap-2 text-sm font-medium leading-none">
                      {courseTitle}{' '}
                      <span className="text-muted-foreground">
                        #{item.groupNumber}
                      </span>
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {' '}
                      {formatDate(item.timestamp)}
                    </p>
                  </div>

                  <Badge variant="even" className="ml-auto">
                    Guruh
                  </Badge>
                </li>
              );
            case 'student':
              return (
                <li key={index} className="flex items-center py-2">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {item.fullName}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(item.timestamp)}
                    </p>
                  </div>

                  <Badge variant="inactive" className="ml-auto">
                    O'quvchi
                  </Badge>
                </li>
              );
            default:
              return null;
          }
        })}
      </ScrollArea>
      <Button
        onClick={() => setViewAll((prev) => !prev)}
        variant="link"
        className="pl-0 mt-2 flex items-center gap-2 group mx-auto"
      >
        <span>{!viewAll ? 'View all' : 'Show less'}</span>
        <ChevronRight className="w-4 h-4 group-hover:ml-0.5 duration-300" />
      </Button>
    </ul>
  );
}
