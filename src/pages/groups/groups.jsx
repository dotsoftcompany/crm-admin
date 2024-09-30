import React from 'react';
import BreadcrumbComponent from '@/components/breadcrumb';

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Settings2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

function Groups() {
  return (
    <div className="container mx-auto py-4 space-y-4">
      <BreadcrumbComponent title="Guruhlar" />

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

      <div className="space-y-2">
        <div className="relative flex items-center bg-accent dark:bg-background p-4 rounded-md border border-border">
          <div className="bg-white p-3 rounded-md w-44 h-24 space-y-1 flex flex-col items-center justify-center">
            <h4 className="text-sm font-bold uppercase text-center">
              Toq kunlar
            </h4>
            <p className="text-center text-sm font-medium">13:00 - 15:00</p>
          </div>
          <div className="md:ml-4 xl:ml-6 space-y-1 max-w-xl">
            <h2 className="text-xl font-semibold">Frontend Development</h2>
            <p className="text-sm font-medium">
              Front-end development is the process of creating the visual and
              interactive parts of a website or web application that users
              directly interact with.
            </p>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 right-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Tahrirlash</DropdownMenuItem>
                <DropdownMenuItem>O'chirish</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="relative flex items-center bg-accent dark:bg-background p-4 rounded-md border border-border">
          <div className="bg-white p-3 rounded-md w-44 h-24 space-y-1 flex flex-col items-center justify-center">
            <h4 className="text-sm font-bold uppercase text-center">
              Juft kunlar
            </h4>
            <p className="text-center text-sm font-medium">10:00 - 12:00</p>
          </div>
          <div className="md:ml-4 xl:ml-6 space-y-1 max-w-xl">
            <h2 className="text-xl font-semibold">Frontend Development</h2>
            <p className="text-sm font-medium">
              Front-end development is the process of creating the visual and
              interactive parts of a website or web application that users
              directly interact with.
            </p>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 right-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Tahrirlash</DropdownMenuItem>
                <DropdownMenuItem>O'chirish</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Groups;
