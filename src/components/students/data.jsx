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
    name: 'John',
    surname: 'Doe',
    phone: '+1 234 567 8901',
    address: '123 Main St, Springfield, USA',
    isPay: true,
  },
  {
    id: '2',
    name: 'Jane',
    surname: 'Smith',
    phone: '+1 987 654 3210',
    address: '456 Oak Ave, Metropolis, USA',
    isPay: false,
  },
  {
    id: '3',
    name: 'Michael',
    surname: 'Johnson',
    phone: '+44 20 7946 0958',
    address: '789 Elm St, London, UK',
    isPay: true,
  },
  {
    id: '4',
    name: 'Emily',
    surname: 'Davis',
    phone: '+49 30 1234 5678',
    address: '101 Maple Dr, Berlin, Germany',
    isPay: false,
  },
  {
    id: '5',
    name: 'David',
    surname: 'Brown',
    phone: '+33 1 2345 6789',
    address: '202 Pine Ln, Paris, France',
    isPay: true,
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
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue('fullName')}</div>
    ),
  },
  {
    accessorKey: 'phoneNumber',
    header: 'Phone',
    cell: ({ row }) => <div>{row.getValue('phoneNumber')}</div>,
  },
  {
    accessorKey: 'address',
    header: 'Address',
    cell: ({ row }) => (
      <div className="truncate">{row.getValue('address')}</div>
    ),
  },
  {
    accessorKey: 'isPay',
    header: 'Payment Status',
    cell: ({ row }) => (
      <div
        className={row.getValue('isPay') ? 'text-green-500' : 'text-red-500'}
      >
        {row.getValue('isPay') ? 'Paid' : 'Not Paid'}
      </div>
    ),
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const student = row.original;

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
              onClick={() => navigator.clipboard.writeText(student.id)}
            >
              Copy student ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View student details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
