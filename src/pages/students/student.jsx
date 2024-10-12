import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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

import BreadcrumbComponent from '@/components/breadcrumb';
import StudentHeader from '@/components/students/header';
import GroupCard from '@/components/groups/card';
import FilterGroups from '@/components/groups/filter';
import EditDialog from '@/components/dialogs/edit-dialog';
import GroupEdit from '@/components/groups/edit';
import DeleteAlert from '@/components/dialogs/delete-alert';

const Student = () => {
  const { studentId } = useParams();
  const { groups, courses, teachers, students } = useMainContext();

  const student = students.find((s) => s.id === studentId);
  const studentGroups = groups.filter((group) =>
    group.students.includes(studentId)
  );

  const [openGroupEditDialog, setOpenGroupEditDialog] = useState(false);
  const [openGroupDeleteDialog, setOpenGroupDeleteDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOption, setFilterOption] = useState('title');
  const [filteredGroups, setFilteredGroups] = useState(groups);
  const [id, setId] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      const newFilteredGroups = studentGroups.filter((group) => {
        switch (filterOption) {
          case 'title':
            return (
              courses
                .filter((item) => item.id === group.courseId)[0]
                ?.courseTitle.toLowerCase()
                .includes(searchTerm.toLowerCase()) ?? false
            );
          case 'teacher':
            return (
              teachers
                .filter((item) => item.id === group.teacherId)[0]
                ?.fullName.toLowerCase()
                .includes(searchTerm.toLowerCase()) ?? false
            );
          default:
            return false;
        }
      });
      setFilteredGroups(newFilteredGroups);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, filterOption, groups, courses, teachers]);

  if (!student) {
    return (
      <div className="px-4 lg:px-8 mx-auto py-4">
        <h2 className="text-2xl font-bold tracking-tight">404 error</h2>
        <p className="text-muted-foreground">
          Siz qidirayotgan o'quvchi topilmadi!
        </p>
      </div>
    );
  }

  const paymentHistory = [
    {
      invoice: 'INV001',
      status: 'Paid',
      method: 'Credit Card',
      amount: '$250.00',
    },
    {
      invoice: 'INV002',
      status: 'Pending',
      method: 'Bank Transfer',
      amount: '$150.00',
    },
    { invoice: 'INV003', status: 'Paid', method: 'PayPal', amount: '$320.00' },
    {
      invoice: 'INV004',
      status: 'Failed',
      method: 'Credit Card',
      amount: '$200.00',
    },
    { invoice: 'INV005', status: 'Paid', method: 'Cash', amount: '$180.00' },
  ];

  return (
    <div className="px-4 lg:px-8 mx-auto my-4 space-y-4">
      <BreadcrumbComponent
        title="O'quvchilar ro'yxati"
        titleLink="/students"
        subtitle="John Doe"
      />
      <StudentHeader student={student} />

      <Tabs defaultValue="groups" className="mt-4">
        <TabsList>
          <TabsTrigger value="groups">Guruhlar ro'yxati</TabsTrigger>
          <TabsTrigger value="attendance_check">To'lovlar tarixi</TabsTrigger>
        </TabsList>
        <TabsContent value="groups" className="py-2 space-y-4">
          <EditDialog
            open={openGroupEditDialog}
            setOpen={setOpenGroupEditDialog}
          >
            <GroupEdit id={id} setCloseDialog={setOpenGroupEditDialog} />
          </EditDialog>

          <DeleteAlert
            id={id}
            collection="groups"
            open={openGroupDeleteDialog}
            setOpen={setOpenGroupDeleteDialog}
          />

          <FilterGroups
            url="/add-student"
            title="Add student"
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filterOption={filterOption}
            setFilterOption={setFilterOption}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredGroups.map((card) => (
              <Link key={card.id} to={`/groups/${card.id}`}>
                <GroupCard
                  card={card}
                  setOpenDelete={() => {
                    setId(card.id);
                    setOpenGroupDeleteDialog(true);
                  }}
                  setOpenEdit={() => {
                    setId(card.id);
                    setOpenGroupEditDialog(true);
                  }}
                />
              </Link>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="attendance_check" className="py-2 space-y-4">
          <Table className="rounded-md">
            <TableCaption>A list of recent student payments.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Invoice</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Method</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paymentHistory.map((payment, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    {payment.invoice}
                  </TableCell>
                  <TableCell>{payment.status}</TableCell>
                  <TableCell>{payment.method}</TableCell>
                  <TableCell className="text-right">{payment.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Student;
