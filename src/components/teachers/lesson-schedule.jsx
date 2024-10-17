import BreadcrumbComponent from '@/components/breadcrumb';
import { useMainContext } from '@/context/main-context';
import { ChevronRight, Clock } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

function LessonsSchedule({ teacherId }) {
  const { groups, courses } = useMainContext();

  const teacherGroups = groups.filter((group) => group.teacherId === teacherId);

  const days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  const times = Array.from({ length: 13 }, (_, i) => {
    const hour = 8 + i;
    return `${hour < 10 ? '0' : ''}${hour}:00`;
  });

  // Helper function to get the days based on selectedDay
  const getDaysForSchedule = (selectedDay) => {
    if (selectedDay === 'odd') return ['Monday', 'Wednesday', 'Friday'];
    if (selectedDay === 'even') return ['Tuesday', 'Thursday', 'Saturday'];
    if (selectedDay === 'every_day') return days.slice(0, 6);
    return [];
  };

  // Helper function to check if the current time is in the given range
  const isTimeInRange = (time, range) => {
    const [start, end] = range.split(' - ');
    const startHour = parseInt(start.split(':')[0], 10);
    const endHour = parseInt(end.split(':')[0], 10);
    const currentHour = parseInt(time.split(':')[0], 10);
    return currentHour >= startHour && currentHour < endHour;
  };

  // Helper function to assign background color based on selectedDay
  const getBackgroundColor = (selectedDay) => {
    if (selectedDay === 'odd') return 'bg-orange-200 dark:bg-orange-500';
    if (selectedDay === 'even') return 'bg-purple-200 dark:bg-purple-500';
    if (selectedDay === 'every_day') return 'bg-green-200 dark:bg-green-500';
    return '';
  };

  return (
    <div className="my-4 space-y-4">
      <div className="overflow-x-auto">
        <div className="grid grid-cols-8 gap-x-1 md:gap-x-1.5 min-w-[50rem] w-full">
          <div></div>
          {days.map((day) => (
            <div key={day} className="font-semibold text-center p-2 pb-4">
              {day}
            </div>
          ))}

          {/* Time slots and schedule cells */}
          {times.map((time, timeIndex) => (
            <React.Fragment key={time}>
              {/* Time column */}
              <div className="sticky left-0 z-10 flex items-center justify-center gap-1 md:gap-2 font-semibold text-center dark:bg-background p-2 bg-background">
                <Clock className="w-4 h-4" />
                <span>{time}</span>
              </div>
              {/* Cells for each day */}
              {days.map((day) => {
                // Find if there's a class scheduled for this time and day
                const groupForDay = teacherGroups.find((schedule) => {
                  const scheduleDays = getDaysForSchedule(schedule.selectedDay);
                  return (
                    scheduleDays.includes(day) &&
                    isTimeInRange(time, schedule.timeInDay)
                  );
                });

                if (groupForDay) {
                  const isFirstTimeSlot =
                    timeIndex ===
                    times.indexOf(groupForDay.timeInDay.split(' - ')[0]);

                  return (
                    <Link to={`/groups/${groupForDay.id}`}>
                      <div
                        key={day + time}
                        className={`relative p-2 h-10 text-center font-semibold cursor-pointer ${getBackgroundColor(
                          groupForDay.selectedDay
                        )} ${
                          isFirstTimeSlot
                            ? 'rounded-t-sm md:rounded-t-md'
                            : 'rounded-b-sm md:rounded-b-md'
                        }`}
                      >
                        {isFirstTimeSlot ? (
                          <>
                            <div className="absolute top-1/2 left-2 z-10 flex flex-wrap items-center gap-1 rounded-t-sm md:rounded-t-md group">
                              <p className="text-xs leading-3">
                                {
                                  courses.filter(
                                    (item) => item.id === groupForDay.courseId
                                  )[0].courseTitle
                                }
                              </p>
                              <small className="opacity-80">
                                #{groupForDay.groupNumber}
                              </small>
                              <ChevronRight className="w-3 h-3 group-hover:ml-1 duration-200" />
                            </div>
                          </>
                        ) : (
                          <div></div>
                        )}
                      </div>
                    </Link>
                  );
                }

                // Render empty cell if no class is scheduled
                return (
                  <div
                    key={day + time}
                    className="border rounded-md p-2 h-10"
                  ></div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LessonsSchedule;
