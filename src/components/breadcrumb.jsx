import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SheetMenu } from './layout/sheet-menu';

function BreadcrumbComponent({
  title,
  titleLink = null,
  subtitle,
  subtitleLink = null,
  subtitle2,
}) {
  return (
    <div className="flex items-center gap-2">
      <SheetMenu />
      <Breadcrumb className="overflow-x-auto whitespace-nowrap w-full">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Asosiy</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <DropdownMenu>
              <DropdownMenuTrigger
                className={
                  subtitle ? 'flex lg:hidden items-center gap-1' : 'hidden'
                }
              >
                <BreadcrumbEllipsis className="h-4 w-4" />
                <span className="sr-only">Toggle menu</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem>{title}</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </BreadcrumbItem>
          <BreadcrumbItem
            className={!subtitle ? 'block lg:-ml-2' : 'hidden lg:block'}
          >
            <Link
              to={subtitle ? titleLink : null}
              className={
                subtitle
                  ? 'cursor-pointer'
                  : 'cursor-text text-black dark:text-white'
              }
            >
              <BreadcrumbLink>{title}</BreadcrumbLink>
            </Link>
          </BreadcrumbItem>
          {subtitle && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <Link
                  to={subtitle2 ? subtitleLink : null}
                  className={
                    subtitle
                      ? 'cursor-text text-black dark:text-white'
                      : 'cursor-pointer'
                  }
                >
                  <BreadcrumbLink>{subtitle}</BreadcrumbLink>
                </Link>
              </BreadcrumbItem>
            </>
          )}
          {subtitle2 && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink>{subtitle2}</BreadcrumbLink>
              </BreadcrumbItem>
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}

export default BreadcrumbComponent;
