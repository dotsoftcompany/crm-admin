import React from 'react';
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

function BreadcrumbComponent({ title, titleLink = null, subtitle }) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <Link
            to={subtitle ? titleLink : null}
            className={subtitle ? 'cursor-pointer' : 'cursor-text'}
          >
            <BreadcrumbLink>{title}</BreadcrumbLink>
          </Link>
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
  );
}

export default BreadcrumbComponent;
