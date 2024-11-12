import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import { useMainContext } from '@/context/main-context';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import BreadcrumbComponent from '@/components/breadcrumb';
import StudentHeader from '@/components/students/header';
import GroupCard from '@/components/groups/card';
import FilterGroups from '@/components/groups/filter';
import EditDialog from '@/components/dialogs/edit-dialog';
import GroupEdit from '@/components/groups/edit';
import DeleteAlert from '@/components/dialogs/delete-alert';
import { GroupCarLoading } from '../groups/groups';
import { Skeleton } from '@/components/ui/skeleton';
import LessonsSchedule from '@/components/students/lesson-schedule';
import { DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import StudentPayment from '@/components/dialogs/student-payment';
import StudentPaymentHistory from '@/components/payment/data-table';
import EditPayment from '@/components/payment/edit-payment';
import DeletePaymentAlert from '@/components/dialogs/delete-payment';
import StudentEdit from '@/components/students/edit';
import DeleteStudentAlert from '@/components/dialogs/delete-student-alert';

const Student = () => {
  const { studentId } = useParams();
  const {
    groups,
    courses,
    teachers,
    students,
    loading,
    uid,
    openStudentPayment,
    setOpenStudentPayment,
    openStudentDelete,
    setOpenStudentDelete,
    openStudentEdit,
    setOpenStudentEdit,
  } = useMainContext();

  const student = students.find((s) => s.id === studentId);

  const [isCard, setIsCard] = useState(true);
  const [openGroupEditDialog, setOpenGroupEditDialog] = useState(false);
  const [openGroupDeleteDialog, setOpenGroupDeleteDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOption, setFilterOption] = useState('title');
  const [filteredGroups, setFilteredGroups] = useState(groups);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [id, setId] = useState('');

  const studentGroups = groups?.length
    ? groups.filter((group) => group?.students?.includes(studentId))
    : [];

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

  if (loading) {
    return (
      <div className="px-4 lg:px-8 mx-auto py-4 space-y-3 md:space-y-5">
        <Skeleton className="h-4 w-72" />
        <div className="space-y-2 pb-4 w-full border-b border-border">
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-64" />
          </div>

          <div className="flex items-center gap-3 md:gap-5">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
        <Skeleton className="h-10 w-72" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="h-9 w-64" />
            <Skeleton className="h-9 w-20" />
          </div>
          <Skeleton className="h-9 w-28" />
        </div>
        <GroupCarLoading />
      </div>
    );
  }

  if (!student) {
    return (
      <div className="px-4 lg:px-8 mx-auto my-4 space-y-4">
        <BreadcrumbComponent
          title="O'quvchilar ro'yxati"
          subtitle="Noma'lum o'quvchi"
        />
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            O'quvchi topilmadi.
          </h2>
          <p className="text-muted-foreground">
            Siz qidirayotgan o'quvchi o'chirilgan yoki umuman mavjud emas.
          </p>
        </div>
      </div>
    );
  }

  console.log(id);

  return (
    <div className="px-4 lg:px-8 mx-auto my-4 space-y-4">
      <div className="flex items-center justify-between w-full">
        <BreadcrumbComponent
          title="O'quvchilar ro'yxati"
          titleLink="/students"
          subtitle={student?.fullName}
        />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
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
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                setOpenStudentEdit(true);
                document.body.style.pointerEvents = '';
              }}
            >
              Tahrirlash
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                setOpenStudentPayment(true);
                document.body.style.pointerEvents = '';
              }}
            >
              To'lov qilish
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                setOpenStudentDelete(true);
                document.body.style.pointerEvents = '';
              }}
            >
              O'chirish
              <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <StudentHeader student={student} />

      <EditDialog id={id} open={openEdit} setOpen={setOpenEdit}>
        <EditPayment paymentId={id} setOpen={setOpenEdit} />
      </EditDialog>

      <EditDialog
        id={studentId}
        open={openStudentEdit}
        setOpen={setOpenStudentEdit}
      >
        <StudentEdit id={studentId} setCloseDialog={setOpenStudentEdit} />
      </EditDialog>

      <DeleteStudentAlert
        id={studentId}
        open={openStudentDelete}
        setOpen={setOpenStudentDelete}
      />

      <DeletePaymentAlert
        paymentId={id}
        open={openDelete}
        setOpen={setOpenDelete}
      />

      <StudentPayment
        student={student}
        groups={studentGroups}
        open={openStudentPayment}
        setOpen={setOpenStudentPayment}
      />

      <Tabs defaultValue="groups" className="">
        <TabsList>
          <TabsTrigger value="groups">Guruhlar ro'yxati</TabsTrigger>
          <TabsTrigger value="lesson-schedule">Dars jadvali</TabsTrigger>
          <TabsTrigger value="attendance-check">To'lovlar tarixi</TabsTrigger>
          <TabsTrigger value="personal-details" className="hidden">
            Shaxsiy ma'lumotlar
          </TabsTrigger>
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
            collection={`users/${uid}/groups`}
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
            card={{ isCard, setIsCard }}
          />
          {filteredGroups.length == 0 && (
            <p className="mt-10 text-muted-foreground text-center">
              Guruh topilmadi.
            </p>
          )}
          <div
            className={`grid gap-4 ${
              isCard
                ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3'
                : 'grid-cols-1'
            }`}
          >
            {filteredGroups.map((card) => (
              <Link key={card.id} to={`/groups/${card.id}`}>
                <GroupCard
                  card={card}
                  studentCard={false}
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
        <TabsContent value="lesson-schedule">
          <LessonsSchedule studentId={studentId} />
        </TabsContent>
        <TabsContent value="attendance-check" className="py-2 space-y-4">
          <StudentPaymentHistory
            data={student?.paymentHistory || ''}
            setId={setId}
            setOpenDelete={setOpenDelete}
            setOpenEdit={setOpenEdit}
          />
        </TabsContent>
        <TabsContent value="personal-details" className="hidden py-2 space-y-4">
          <div className="w-[550px] h-auto p-4 bg-gradient-to-r from-green-200 to-blue-200 border border-gray-300 shadow-lg rounded-lg relative text-[10px]">
            {/* Header */}
            <div className="flex items-center justify-between pb-2 border-b border-gray-300">
              <div className="text-center">
                <p className="font-bold text-[8px] text-blue-900">
                  O'ZBEKISTON RESPUBLIKASI
                </p>
                <p className="text-[6px] text-green-700 font-semibold">
                  SHAXS GUVOHNOMASI
                </p>
                <p className="text-[6px] text-gray-600">
                  Republic of Uzbekistan Identity Card
                </p>
              </div>
              <img
                src="/path-to-uzbekistan-flag.png"
                alt="Flag"
                className="w-6 h-4"
              />
            </div>

            {/* Photo & Details */}
            <div className="flex mt-2">
              {/* Profile Photo */}
              <div className="w-32 h-44 bg-gray-300 rounded overflow-hidden border border-gray-400">
                <img
                  src="https://via.placeholder.com/64" // Replace with actual image URL
                  alt="Profile"
                  className="object-cover w-full h-full"
                />
              </div>

              {/* Personal Information */}
              <div className="ml-2 flex flex-col space-y-1">
                <div>
                  <p className="font-bold text-gray-700">Familya / Surname</p>
                  <p>IKRAMOV</p>
                </div>
                <div>
                  <p className="font-bold text-gray-700">
                    Ismi / Given name(s)
                  </p>
                  <p>AKROM</p>
                </div>
                <div>
                  <p className="font-bold text-gray-700">Otasi / Patronymic</p>
                  <p>MURODOVICH</p>
                </div>
                <div>
                  <p className="font-bold text-gray-700">
                    Tug'ilgan sanasi / Date of birth
                  </p>
                  <p>11.09.1988</p>
                </div>
                <div>
                  <p className="font-bold text-gray-700">Jinsi / Sex</p>
                  <p>ERKAK / M</p>
                </div>
              </div>
            </div>

            {/* Nationality and ID Number */}
            <div className="mt-2 text-xs">
              <p>
                <span className="font-bold text-gray-700">
                  Fuqaroligi / Nationality:
                </span>{' '}
                O'ZBEKISTON / UZB
              </p>
              <p>
                <span className="font-bold text-gray-700">
                  Shaxsiy raqami / ID number:
                </span>{' '}
                328802792660010
              </p>
            </div>

            {/* Issue and Expiry Dates */}
            <div className="flex justify-between mt-2 text-xs">
              <div>
                <p>
                  <span className="font-bold text-gray-700">
                    Berilgan sana / Date of issue:
                  </span>{' '}
                  05.12.2019
                </p>
              </div>
              <div>
                <p>
                  <span className="font-bold text-gray-700">
                    Amal qilish muddati / Date of expiry:
                  </span>{' '}
                  05.12.2029
                </p>
              </div>
            </div>

            {/* Signature Section */}
            <div className="mt-2 flex justify-between items-center">
              <div className="text-gray-700 text-[8px]">Imzo / Signature:</div>
              <div className="w-24 h-4 border-b border-gray-400"></div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Student;
