import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { useMainContext } from '@/context/main-context';
import { Button } from './ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';
import { Skeleton } from './ui/skeleton';

export function RecentlyAdded() {
  const { courses, teachers, students, groups, loading } = useMainContext();
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

  const items = Array(5).fill({
    courseTitle: 'Loading...',
    timestamp: new Date(),
  });

  if (loading) {
    return (
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center justify-between py-2">
            <div className="space-y-1">
              <div className="text-sm font-medium leading-none">
                <Skeleton className="h-4 w-32" />
              </div>
              <div className="text-sm text-muted-foreground">
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
            <Skeleton className="h-4 w-12" />
          </li>
        ))}
      </ul>
    );
  }
  return (
    <ul className='relative'>
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
      <p className='text-sm text-muted-foreground absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2'>{displayedItems.length == 0 && "Hali hech narsa qo'shilmagan"}</p>
      <Button
        onClick={() => setViewAll((prev) => !prev)}
        variant="link"
        className="pl-0 mt-2 flex items-center gap-1 mx-auto"
      >
        <span>{!viewAll ? "Ko'proq" : 'Kamroq'}</span>
        {viewAll ? (
          <ChevronUp className="w-4 h-4" />
        ) : (
          <ChevronDown className="w-4 h-4" />
        )}
      </Button>
    </ul>
  );
}
