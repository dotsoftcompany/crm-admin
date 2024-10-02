import * as React from 'react';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const data = [
  {
    id: '1',
    fullName: 'John Doe',
    dateOfBirth: '1985-03-15',
    phone: '+1 234 567 8901',
    address: '123 Main St, Springfield, USA',
    position: 'Math Teacher',
    dateOfJoining: '2015-09-01',
  },
  {
    id: '2',
    fullName: 'Jane Smith',
    dateOfBirth: '1990-07-25',
    phone: '+1 987 654 3210',
    address: '456 Oak Ave, Metropolis, USA',
    position: 'Science Teacher',
    dateOfJoining: '2017-08-15',
  },
  {
    id: '3',
    fullName: 'Michael Johnson',
    dateOfBirth: '1978-10-30',
    phone: '+44 20 7946 0958',
    address: '789 Elm St, London, UK',
    position: 'English Teacher',
    dateOfJoining: '2013-05-23',
  },
  {
    id: '4',
    fullName: 'Emily Davis',
    dateOfBirth: '1992-12-05',
    phone: '+49 30 1234 5678',
    address: '101 Maple Dr, Berlin, Germany',
    position: 'History Teacher',
    dateOfJoining: '2020-02-10',
  },
  {
    id: '5',
    fullName: 'David Brown',
    dateOfBirth: '1980-04-19',
    phone: '+33 1 2345 6789',
    address: '202 Pine Ln, Paris, France',
    position: 'Physics Teacher',
    dateOfJoining: '2012-11-03',
  },
];

export const columns = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'fullName',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Full Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue('fullName')}</div>,
  },
  {
    accessorKey: 'dateOfBirth',
    header: 'Date of Birth',
    cell: ({ row }) => <div>{row.getValue('dateOfBirth')}</div>,
  },
  {
    accessorKey: 'phone',
    header: 'Phone',
    cell: ({ row }) => <div>{row.getValue('phone')}</div>,
  },
  {
    accessorKey: 'address',
    header: 'Address',
    cell: ({ row }) => (
      <div className="truncate">{row.getValue('address')}</div>
    ),
  },
  {
    accessorKey: 'position',
    header: 'Position',
    cell: ({ row }) => <div>{row.getValue('position')}</div>,
  },
  {
    accessorKey: 'dateOfJoining',
    header: 'Date of Joining',
    cell: ({ row }) => <div>{row.getValue('dateOfJoining')}</div>,
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const teacher = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(teacher.id)}
            >
              Copy teacher ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View teacher details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
