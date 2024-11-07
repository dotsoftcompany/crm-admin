import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowUpDown, MoreHorizontal, ChevronDown, Eye } from 'lucide-react';

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useMainContext } from '@/context/main-context';
import { formatNumber } from '@/lib/utils';
import { format } from 'date-fns';

export default function StudentPaymentHistory({
  data,
  loadingStudents,
  children,
}) {
  const { courses, groups } = useMainContext();
  const history = useNavigate();

  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});

  const handleRowClick = (teacherId) => {
    history(`/students/${teacherId}`);
  };

  const columns = [
    {
      accessorKey: 'name',
      header: 'Name',
      cell: ({ row }) => (
        <div className="whitespace-nowrap">{row.getValue('name')}</div>
      ),
    },
    {
      accessorKey: 'course',
      header: 'Course',
      cell: ({ row }) => {
        const courseId = groups.find(
          (g) => g.id === row.getValue('course')
        ).courseId;
        return (
          <div className="whitespace-nowrap">
            {courses.find((course) => course.id === courseId)?.courseTitle ||
              'Course not found'}
          </div>
        );
      },
    },
    {
      accessorKey: 'timestamp',
      header: 'Timestamp',
      cell: ({ row }) => {
        function formatDate(timestamp) {
          const { seconds, nanoseconds } = timestamp;
          const date = new Date(seconds * 1000 + nanoseconds / 1000000);
          return format(date, 'dd.MM.yyyy');
        }
        return (
          <div className="whitespace-nowrap">
            {formatDate(row.getValue('timestamp'))}
          </div>
        );
      },
    },
    {
      accessorKey: 'amount',
      header: 'Amount',
      cell: ({ row }) => {
        return (
          <div className="whitespace-nowrap">
            {formatNumber(row.getValue('amount'))} so'm
          </div>
        );
      },
    },
    {
      accessorKey: 'method',
      header: 'Payment Method',
      cell: ({ row }) => {
        function formatPaymentMethod(method) {
          switch (method) {
            case 'cash':
              return 'Naqd pul';
            case 'credit_card':
              return 'Kredit karta';
            case 'bank_transfer':
              return 'Bank oʻtkazmasi';
            default:
              return 'Nomaʼlum usul';
          }
        }
        return (
          <div className="whitespace-nowrap">
            {formatPaymentMethod(row.getValue('method'))}
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-2 lg:mb-0">
        <div className="flex items-center py-2 gap-2">
          <Input
            placeholder="Ism bilan qidirish..."
            value={table.getColumn('name')?.getFilterValue() ?? ''}
            onChange={(event) =>
              table.getColumn('name')?.setFilterValue(event.target.value)
            }
            className="w-full md:w-64 xl:w-72"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Ustunlar <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <>{children}</>
      </div>
      <div className="rounded-b-md border max-w-[44rem] min-w-full overflow-x-auto">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="whitespace-nowrap">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns?.length}
                  className="h-16 text-center"
                >
                  {loadingStudents ? 'Loading...' : 'No results.'}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Orqaga
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Oldinga
          </Button>
        </div>
      </div>
    </div>
  );
}
