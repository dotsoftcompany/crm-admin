import React, { useState } from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

import { formatNumber } from '@/lib/utils';

function CourseCard({ item, setOpenDelete, setOpenEdit }) {
  return (
    <Card className="flex flex-col">
      <div className="p-4 grow space-y-2 lg:space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-base text-muted-foreground">
            #{item.courseCode ? item.courseCode : "noma'lum"}
          </p>
          <DropdownMenu>
            <DropdownMenuTrigger asChild aria-hidden="true">
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
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[160px]">
              <DropdownMenuItem
                onClick={setOpenEdit}
                onSelect={() => {
                  document.body.style.pointerEvents = '';
                }}
              >
                Tahrirlash
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={setOpenDelete}
                onSelect={() => {
                  document.body.style.pointerEvents = '';
                }}
              >
                O'chirish
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
          <Badge className="text-sm px-2 font-medium" variant="secondary">
            Davomiyligi: {item.courseDuration} oy
          </Badge>
          <Badge
            className="text-sm font-medium flex items-center gap-1"
            variant="secondary"
          >
            <span>Sertifikat:</span>
            {item.isCertification ? (
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
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-4 w-4 text-red-500"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </Badge>
        </div>
      </div>

      <div className="flex items-center justify-between py-3 px-4 border-t border-border">
        <div className="hidden items-center gap-2 w-52">
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium truncate">John Doe</span>
        </div>
        <span className="text-lg font-semibold">
          {formatNumber(item.coursePrice)} uzs
        </span>
      </div>
    </Card>
  );
}

export default CourseCard;
