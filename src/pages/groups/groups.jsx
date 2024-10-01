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
import { Dot, Settings2 } from 'lucide-react';
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

function Groups() {
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
        <Card className="cursor-pointer hover:shadow">
          <div className="p-4 pb-0 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Badge className="bg-orange-100 text-orange-500 hover:bg-orange-200/80">
                        18:00 - 20:00
                      </Badge>
                    </TooltipTrigger>
                    <TooltipContent side="top">
                      <p className="text-xs font-medium text-accent-foreground">
                        Du - Chor - Ju
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <Badge className="bg-green-100 text-green-500 hover:bg-green-200/80">
                  Aktiv
                </Badge>
              </div>

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
              <div className="flex items-center gap-2">
                <h2 className="text-lg lg:text-xl font-semibold">
                  Frontend Development
                </h2>
                <span className="text-base text-muted-foreground">#44</span>
              </div>

              <div className="flex gap-2 mt-2">
                <div className="flex items-center -space-x-3">
                  <Avatar className="h-8 w-8 shadow border">
                    <AvatarImage
                      src="https://mynaui.com/avatars/avatar-06.jpg"
                      alt="@shadcn"
                    />
                    <AvatarFallback>ZY</AvatarFallback>
                  </Avatar>
                  <Avatar className="h-8 w-8 shadow border">
                    <AvatarImage
                      src="https://mynaui.com/avatars/avatar-03.jpg"
                      alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <Avatar className="h-8 w-8 shadow border">
                    <AvatarImage
                      src="https://mynaui.com/avatars/avatar-04.jpg"
                      alt="@shadcn"
                    />
                    <AvatarFallback>MD</AvatarFallback>
                  </Avatar>
                  <Avatar className="h-8 w-8 shadow border">
                    <AvatarImage
                      src="https://mynaui.com/avatars/avatar-10.jpg"
                      alt="@shadcn"
                    />
                    <AvatarFallback>MD</AvatarFallback>
                  </Avatar>
                </div>
                <Badge className="text-sm px-2 font-medium" variant="secondary">
                  Talabalar: 12ta
                </Badge>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between py-3 px-4 mt-4 border-t border-border">
            <div className="flex items-center gap-2 w-52">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium truncate">John Doe</span>
            </div>
            <small className="text-sm px-2 font-medium text-muted-foreground">
              10.05.2023
            </small>
          </div>
        </Card>
        <Card className="cursor-pointer hover:shadow">
          <div className="p-4 pb-0 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Badge className="bg-purple-100 text-purple-500 hover:bg-purple-200/80">
                        18:00 - 20:00
                      </Badge>
                    </TooltipTrigger>
                    <TooltipContent side="top">
                      <p className="text-xs font-medium text-accent-foreground">
                        Se - Pay - Shan
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <Badge className="bg-green-100 text-green-500 hover:bg-green-200/80">
                  Aktiv
                </Badge>
              </div>

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
              <div className="flex items-center gap-2">
                <h2 className="text-lg lg:text-xl font-semibold">
                  Frontend Development
                </h2>
                <span className="text-base text-muted-foreground">#44</span>
              </div>

              <div className="flex gap-2 mt-2">
                <div className="flex items-center -space-x-3">
                  <Avatar className="h-8 w-8 shadow border">
                    <AvatarImage
                      src="https://mynaui.com/avatars/avatar-06.jpg"
                      alt="@shadcn"
                    />
                    <AvatarFallback>ZY</AvatarFallback>
                  </Avatar>
                  <Avatar className="h-8 w-8 shadow border">
                    <AvatarImage
                      src="https://mynaui.com/avatars/avatar-03.jpg"
                      alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <Avatar className="h-8 w-8 shadow border">
                    <AvatarImage
                      src="https://mynaui.com/avatars/avatar-04.jpg"
                      alt="@shadcn"
                    />
                    <AvatarFallback>MD</AvatarFallback>
                  </Avatar>
                  <Avatar className="h-8 w-8 shadow border">
                    <AvatarImage
                      src="https://mynaui.com/avatars/avatar-10.jpg"
                      alt="@shadcn"
                    />
                    <AvatarFallback>MD</AvatarFallback>
                  </Avatar>
                </div>
                <Badge className="text-sm px-2 font-medium" variant="secondary">
                  Talabalar: 12ta
                </Badge>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between py-3 px-4 mt-4 border-t border-border">
            <div className="flex items-center gap-2 w-52">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium truncate">John Doe</span>
            </div>
            <small className="text-sm px-2 font-medium text-muted-foreground">
              10.05.2023
            </small>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Groups;
