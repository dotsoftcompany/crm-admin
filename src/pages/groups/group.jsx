import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { useMainContext } from '@/context/main-context';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import StudentsDataTable from '@/components/students/data-table';
import GroupHeader from '@/components/groups/header';
import AddStudentDialog from '@/components/dialogs/add-student';
import BreadcrumbComponent from '@/components/breadcrumb';
import EditDialog from '@/components/dialogs/edit-dialog';
import StudentEdit from '@/components/students/edit';
import DeleteAlert from '@/components/dialogs/delete-alert';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import AddAbsenteeDialog from '@/components/dialogs/add-absentee';
import ListAbsenteeDialog from '@/components/dialogs/list-absentee';

const Group = () => {
  const { groups, courses, students } = useMainContext();
  const [openAddStudentDialog, setOpenAddStudentDialog] = useState(false);
  const [openStudentEditDialog, setOpenStudentEditDialog] = useState(false);
  const [openStudentDeleteDialog, setOpenStudentDeleteDialog] = useState(false);
  const [openAddAbsenteeDialog, setOpenAddAbsenteeDialog] = useState(false);
  const [showAbsenteeStudentsDialog, setShowAbsenteeStudentsDialog] =
    useState(false);
  const [id, setId] = useState('');

  const { groupId } = useParams();

  const group = groups.find((g) => g.id === groupId);

  if (!group) {
    return (
      <div className="px-4 lg:px-8 mx-auto py-4">
        <h2 className="text-2xl font-bold tracking-tight">404 error</h2>
        <p className="text-muted-foreground">
          Siz qidirayotgan guruh topilmadi!
        </p>
      </div>
    );
  }

  return (
    <div className="px-4 lg:px-8 mt-4">
      <BreadcrumbComponent
        title="Guruhlar ro'yxati"
        titleLink="/groups"
        subtitle={`${
          courses.filter((item) => item.id === group.courseId)[0].courseTitle
        } #${group.groupNumber}`}
      />
      <GroupHeader group={group} />

      <EditDialog
        id={id}
        open={openStudentEditDialog}
        setOpen={setOpenStudentEditDialog}
      >
        <StudentEdit id={id} setCloseDialog={setOpenStudentEditDialog} />
      </EditDialog>

      <DeleteAlert
        id={id}
        collection="students"
        open={openStudentDeleteDialog}
        setOpen={setOpenStudentDeleteDialog}
      />

      <AddAbsenteeDialog
        open={openAddAbsenteeDialog}
        setOpen={setOpenAddAbsenteeDialog}
      />

      <ListAbsenteeDialog
        open={showAbsenteeStudentsDialog}
        setOpen={setShowAbsenteeStudentsDialog}
      />

      <Tabs defaultValue="students" className="mt-4">
        <TabsList>
          <TabsTrigger value="students">O'quvchilar ro'yxati</TabsTrigger>
          <TabsTrigger value="attendance_check">Yo'qlamalar</TabsTrigger>
          <TabsTrigger value="exams">Imtihonlar</TabsTrigger>
        </TabsList>
        <TabsContent value="students">
          <StudentsDataTable
            id={id}
            setId={setId}
            data={students}
            setOpenEdit={setOpenStudentEditDialog}
            setOpenDelete={setOpenStudentDeleteDialog}
          >
            <AddStudentDialog
              openAddStudentDialog={openAddStudentDialog}
              setOpenAddStudentDialog={setOpenAddStudentDialog}
            />
          </StudentsDataTable>
        </TabsContent>
        <TabsContent value="attendance_check">
          <div className="space-y-2 pt-2">
            <div className="flex justify-between items-center">
              <Input placeholder="Enter date" className="max-w-md" />
              <Button
                onClick={() => setOpenAddAbsenteeDialog(true)}
                variant="secondary"
                className="dark:bg-white dark:text-black"
              >
                Yo'qlama qilsh
              </Button>
            </div>

            <Table className="rounded-b-md">
              <TableCaption className="hidden">
                A list of absent students for the selected date.
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-72 rounded-tl-md">Sana</TableHead>
                  <TableHead>Nechtadan</TableHead>
                  <TableHead>Foizda (%)</TableHead>
                  <TableHead className="text-right rounded-tr-md"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="border-x border-b border-border">
                <TableRow>
                  <TableCell className="font-medium">12.11.2024</TableCell>
                  <TableCell>9/10</TableCell>
                  <TableCell>90%</TableCell>
                  <TableCell className="text-right">
                    <Button
                      onClick={() => setShowAbsenteeStudentsDialog(true)}
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
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium rounded-bl-lg">
                    23.12.2023
                  </TableCell>
                  <TableCell>8/10</TableCell>
                  <TableCell>80%</TableCell>
                  <TableCell className="text-right rounded-br-lg">
                    <Button
                      onClick={() => setShowAbsenteeStudentsDialog(true)}
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
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        <TabsContent value="exams">
          <div className="space-y-2 pt-2">
            <div className="flex gap-2 items-center">
              <Input placeholder="Search by title" className="max-w-md" />
              <small className="text-purple-500">Demo table</small>
            </div>

            <Table className="rounded-b-md">
              <TableCaption className="hidden">
                A list of absent students for the selected date.
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-72 rounded-tl-md">Title</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right rounded-tr-md"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="border-x border-b border-border">
                <TableRow>
                  <TableCell>General Chemistry Final Exam</TableCell>
                  <TableCell className="font-medium">12.11.2024</TableCell>
                  <TableCell>scheduled</TableCell>
                  <TableCell className="text-right">
                    <Button
                      onClick={() => setShowAbsenteeStudentsDialog(true)}
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
                </TableRow>
                <TableRow>
                  <TableCell>Chemical Reactions and Equilibrium Test</TableCell>
                  <TableCell className="font-medium rounded-bl-lg">
                    23.12.2023
                  </TableCell>
                  <TableCell>Completed</TableCell>
                  <TableCell className="text-right rounded-br-lg">
                    <Button
                      onClick={() => setShowAbsenteeStudentsDialog(true)}
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
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Group;
