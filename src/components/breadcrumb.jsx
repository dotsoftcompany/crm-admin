import React from 'react';
import { Link } from 'react-router-dom';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { SheetMenu } from './layout/sheet-menu';

function BreadcrumbComponent({ title, titleLink = null, subtitle }) {
  return (
    <div className="flex items-center gap-2">
      <SheetMenu />
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Asosiy sahifa</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            {subtitle ? (
              <BreadcrumbLink href={titleLink} className="cursor-pointer">
                {title}
              </BreadcrumbLink>
            ) : (
              <span className="cursor-text text-white">{title}</span>
            )}
          </BreadcrumbItem>
          {subtitle && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{subtitle}</BreadcrumbPage>
              </BreadcrumbItem>
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}

export default BreadcrumbComponent;
