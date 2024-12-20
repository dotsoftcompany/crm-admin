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
import { formatPhoneNumber, hasPaidThisMonth } from '@/lib/utils';
import { calculateCurrentMonthDebt } from '@/lib/payment-history';
import { useMainContext } from '@/context/main-context';

export default function StudentsDataTable({
  setId,
  data,
  loadingStudents,
  setOpenDelete,
  setOpenEdit,
  setOpenPayment,
  studentEdit = true,
  children,
}) {
  const history = useNavigate();
  const { courses, groups } = useMainContext();

  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});

  const handleRowClick = (teacherId) => {
    history(`/students/${teacherId}`);
  };

  const columns = [
    {
      accessorKey: 'fullName',
      header: ({ column }) => {
        return (
          <Button
            className="pl-0"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Ism familiya
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div
          title={`${row.getValue('fullName')} sahifasiga o'tish`}
          onClick={() => handleRowClick(row.original.id)}
          className="capitalize whitespace-nowrap cursor-pointer"
        >
          {row.getValue('fullName')}
        </div>
      ),
    },
    {
      accessorKey: 'phoneNumber',
      header: 'Telefon raqami',
      cell: ({ row }) => (
        <div className="whitespace-nowrap">
          {formatPhoneNumber(row.getValue('phoneNumber'))}
        </div>
      ),
    },
    {
      accessorKey: 'address',
      header: 'Manzil',
      cell: ({ row }) => (
        <div className="truncate whitespace-nowrap">
          {row.getValue('address')}
        </div>
      ),
    },
    {
      accessorKey: 'isPay',
      header: "To'lov qilganligi",
      cell: ({ row }) => {
        const paidThisMonth = hasPaidThisMonth(row.original.paymentHistory);

        const { debt } =
          calculateCurrentMonthDebt(row.original, courses, groups);

        return (
          <div
            className={`${paidThisMonth ? 'text-green-500' : 'text-red-500'} ${
              debt && 'text-orange-500'
            } whitespace-nowrap`}
          >
            {paidThisMonth ? "To'lov qilgan" : "To'lov qilmagan"}
          </div>
        );
      },
    },
    {
      accessorKey: 'view',
      header: 'Sahifani ochish',
      cell: ({ row }) => (
        <Button
          title={`${row.getValue('fullName')} sahifasiga o'tish`}
          onClick={() => handleRowClick(row.original.id)}
          variant="ghost"
          className="h-8 w-8 p-0"
        >
          <Eye className="h-4 w-4 cursor-pointer mx-auto" />
        </Button>
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
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {studentEdit && (
                <>
                  <DropdownMenuItem
                    onClick={() => {
                      setId(student.id);
                      setOpenEdit(true);
                    }}
                  >
                    Tahrirlash
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      setId(student.id);
                      setOpenPayment(true);
                    }}
                  >
                    To'lov qilish
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                </>
              )}
              <DropdownMenuItem
                onClick={() => {
                  setId(student.id);
                  setOpenDelete(true);
                }}
              >
                {studentEdit ? "O'chirish" : 'Olib tashlash'}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
        <div className="flex items-center py-2 gap-2 w-full">
          <Input
            placeholder="Ism bilan qidirish..."
            value={table.getColumn('fullName')?.getFilterValue() ?? ''}
            onChange={(event) =>
              table.getColumn('fullName')?.setFilterValue(event.target.value)
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
            {table?.getRowModel().rows?.length ? (
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
      <div className="flex items-start justify-between space-x-2 py-4">
        <div className="hidden lg:flex items-center gap-2 lg:gap-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <small className="text-muted-foreground">To'lov qilgan</small>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500" />
            <small className="text-muted-foreground">To'lov qilmagan</small>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-orange-500" />
            <small className="text-muted-foreground">
              To'lov qilgan, lekin to'liq emas
            </small>
          </div>
        </div>
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
