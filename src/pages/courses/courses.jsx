import React from 'react';
import BreadcrumbComponent from '@/components/breadcrumb';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { Settings2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useMainContext } from '@/context/main-context';

function Courses() {
  const { courses } = useMainContext();

  return (
    <div className="container mx-auto my-4 space-y-4">
      {/* <BreadcrumbComponent title="Kurslar" /> */}

      <div>
        <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
        <p className="text-muted-foreground">
          Here&apos;s a list of your tasks for this month!
        </p>
      </div>

      <div className="flex items-center justify-between">
        <Input className="max-w-sm" placeholder="Guruhlarni qidirish" />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="ml-auto hidden h-8 lg:flex"
            >
              <Settings2 className="mr-2 h-4 w-4" />
              Filterlash
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[150px]">
            <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {/* {table
              .getAllColumns()
              .filter(
                (column) =>
                  typeof column.accessorFn !== 'undefined' &&
                  column.getCanHide()
              )
              .map((column) => {
                return ( */}
            <DropdownMenuCheckboxItem
              // key={column.id}
              className="capitalize"
              // checked={column.getIsVisible()}
              checked={true}
              // onCheckedChange={(value) => column.toggleVisibility(!!value)}
            >
              Toq kunlar
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              // key={column.id}
              className="capitalize"
              // checked={column.getIsVisible()}
              checked={true}
              // onCheckedChange={(value) => column.toggleVisibility(!!value)}
            >
              Juft kunlar
            </DropdownMenuCheckboxItem>
            {/* );
              })} */}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.map((item) => {
          return (
            <Card className="flex flex-col">
              <div className="p-4 grow space-y-2 lg:space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-base text-muted-foreground">
                    #{item.courseCode}
                  </p>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          className="h-5 w-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                          />
                        </svg>

                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[160px]">
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        Delete
                        <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div>
                  <h2 className="text-lg lg:text-xl font-semibold">
                    {item.courseTitle}
                  </h2>
                  <p className="text-sm text-muted-foreground leading-snug">
                    {item.courseDescription}
                  </p>
                </div>

                <div className="flex gap-2">
                  <Badge
                    className="text-sm px-2 font-medium"
                    variant="secondary"
                  >
                    Davomiyligi: {item.courseDuration} oy
                  </Badge>
                  {item.isCertification ? (
                    <Badge
                      className="text-sm font-medium flex items-center gap-1"
                      variant="secondary"
                    >
                      <span>Sertifikat:</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-4 w-4 text-green-500"
                      >
                        <path
                          fillRule="evenodd"
                          d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </Badge>
                  ) : null}
                </div>
              </div>

              <div className="flex items-center justify-between py-3 px-4 border-t border-border">
                <div className="hidden items-center gap-2 w-52">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium truncate">John Doe</span>
                </div>
                <span className="text-lg font-semibold">
                  {item.coursePrice} so'm
                </span>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default Courses;
