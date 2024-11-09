import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { useMainContext } from '@/context/main-context';
import { Eye, Search } from 'lucide-react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/api/firebase';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import AddAbsenteeDialog from '@/components/dialogs/add-absentee';
import ListAbsenteeDialog from '@/components/dialogs/list-absentee';
import DeleteAlert from '@/components/dialogs/delete-alert';

function Absentee({ groupId, allStudents }) {
  const { uid } = useMainContext();

  const [id, setId] = useState('');
  const [openAddAbsenteeDialog, setOpenAddAbsenteeDialog] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [showAbsenteeStudentsDialog, setShowAbsenteeStudentsDialog] =
    useState(false);
  const [absentees, setAbsentees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Pagination
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(absentees.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = absentees.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const absenteesFilter = currentItems.filter((a) =>
    a.date.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const fetchAbsentees = useCallback(async () => {
    setLoading(true);
    try {
      const absenteeRef = collection(
        db,
        `users/${uid}/groups/${groupId}/absentees`
      );

      const snapshot = await getDocs(absenteeRef);
      const absenteesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setAbsentees(absenteesData);
    } catch (error) {
      console.error('Error fetching absentee data:', error);
    } finally {
      setLoading(false);
    }
  }, [groupId]);

  useEffect(() => {
    fetchAbsentees();
  }, [groupId]);

  return (
    <Fragment>
      <AddAbsenteeDialog
        students={allStudents}
        groupId={groupId}
        open={openAddAbsenteeDialog}
        setOpen={setOpenAddAbsenteeDialog}
        fetchAbsentees={fetchAbsentees}
      />

      <ListAbsenteeDialog
        id={id}
        absentees={absentees}
        students={allStudents}
        open={showAbsenteeStudentsDialog}
        setOpen={setShowAbsenteeStudentsDialog}
      />

      <DeleteAlert
        id={id}
        collection={`users/${uid}/groups/${groupId}/absentees`}
        fetch={fetchAbsentees}
        open={openDelete}
        setOpen={setOpenDelete}
      />

      <div className="space-y-2 py-2">
        <div className="flex justify-between items-center gap-2">
          <div className="relative w-full">
            <Input
              className="peer pe-9 ps-9 max-w-md"
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Sana bo'yicha qidiring..."
            />
            <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
              <Search size={16} strokeWidth={2} />
            </div>
          </div>
          <Button
            onClick={() => setOpenAddAbsenteeDialog(true)}
            variant="secondary"
            className="dark:bg-white dark:text-black"
          >
            Yo'qlama qilsh
          </Button>
        </div>

        <div className="max-w-[44rem] min-w-full overflow-x-auto">
          <Table className="rounded-b-md">
            <TableCaption
              className={
                loading && !absentees.length
                  ? 'bg-muted/50 py-4 rounded-b-md'
                  : 'py-4'
              }
            >
              {(loading && 'Loading...') || (!absentees.length && 'No result.')}
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-72 rounded-tl-md whitespace-nowrap">
                  Sana
                </TableHead>
                <TableHead className="whitespace-nowrap">Nechtadan</TableHead>
                <TableHead className="whitespace-nowrap">Foizda (%)</TableHead>
                <TableHead className="text-center whitespace-nowrap">
                  Yo'qlamani ko'rish
                </TableHead>
                <TableHead className="text-center rounded-tr-md whitespace-nowrap">
                  Yo'qlamani ko'rish
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="max-w-[44rem] min-w-full">
              {absenteesFilter.map((absentee) => {
                const attendancePercentage = (
                  ((allStudents.length - absentee.students.length) /
                    allStudents.length) *
                  100
                ).toFixed(0);

                return (
                  <TableRow>
                    <TableCell className="font-medium">
                      {absentee.date}
                    </TableCell>
                    <TableCell>
                      {allStudents.length - absentee.students.length}/
                      {allStudents.length}
                    </TableCell>
                    <TableCell>{attendancePercentage}%</TableCell>
                    <TableCell className="text-center">
                      <Button
                        onClick={() => {
                          setShowAbsenteeStudentsDialog(true);
                          setId(absentee.id);
                        }}
                        variant="link"
                      >
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <Eye className="w-5 h-5" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <small>Batafsil</small>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </Button>
                    </TableCell>
                    <TableCell className="flex items-center justify-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
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
                          {/* <DropdownMenuItem
                            onClick={(e) => {
                              e.stopPropagation();
                              // setOpenEdit();
                              document.body.style.pointerEvents = '';
                            }}
                          >
                            Tahrirlash
                          </DropdownMenuItem>
                          <DropdownMenuSeparator /> */}
                          <DropdownMenuItem
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenDelete(true);
                              setId(absentee.id);
                              document.body.style.pointerEvents = '';
                            }}
                          >
                            O'chirish
                            <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>

          <Pagination className={absentees.length <= 5 && 'hidden'}>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                />
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, index) => (
                <PaginationItem key={index + 1}>
                  <PaginationLink
                    href="#"
                    onClick={() => handlePageChange(index + 1)}
                    active={currentPage === index + 1}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={
                    currentPage === totalPages ||
                    absentees.length < itemsPerPage
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </Fragment>
  );
}

export default Absentee;
