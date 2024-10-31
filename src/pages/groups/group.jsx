import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Download } from 'lucide-react';
import { usePDF } from 'react-to-pdf';
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
} from 'firebase/firestore';
import { auth, db } from '@/api/firebase';
import { useMainContext } from '@/context/main-context';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

import StudentsDataTable from '@/components/students/data-table';
import GroupHeader from '@/components/groups/header';
import AddStudentDialog from '@/components/dialogs/add-student';
import BreadcrumbComponent from '@/components/breadcrumb';
import EditDialog from '@/components/dialogs/edit-dialog';
import StudentEdit from '@/components/students/edit';
import DeleteItemAlert from '@/components/dialogs/delete-item-alert';
import Exams from '@/components/groups/exams';
import SavePDF from '@/components/groups/save-pdf';
import Absentee from '@/components/groups/absentee';

const Group = () => {
  const { toast } = useToast();
  const { groupId } = useParams();
  const { groups, courses, loading } = useMainContext();
  const group = groups.find((g) => g.id === groupId);

  const { toPDF, targetRef } = usePDF({
    filename: `${
      courses.filter((item) => item.id === group.courseId)[0]?.courseTitle
    } #${group?.groupNumber}.pdf`,
  });

  const [id, setId] = useState('');
  const [openAddStudentDialog, setOpenAddStudentDialog] = useState(false);
  const [openStudentEditDialog, setOpenStudentEditDialog] = useState(false);
  const [openStudentDeleteDialog, setOpenStudentDeleteDialog] = useState(false);
  const [showAbsenteeStudentsDialog, setShowAbsenteeStudentsDialog] =
    useState(false);
  const [groupStudents, setGroupStudents] = useState([]);
  const [currentGroupStudents, setCurrentGroupStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);

  const fetchGroupStudents = useCallback(async () => {
    try {
      if (!auth.currentUser) {
        return;
      }

      const groupRef = doc(db, `users/${auth.currentUser.uid}/groups`, groupId);
      const groupSnap = await getDoc(groupRef);

      if (groupSnap.exists()) {
        const groupData = groupSnap.data();
        const studentIds = groupData.students || [];
        setCurrentGroupStudents(studentIds);

        if (studentIds.length > 0) {
          const userId = auth.currentUser.uid;
          const studentsRef = collection(db, 'students');
          const q = query(studentsRef, where('__name__', 'in', studentIds));

          const querySnapshot = await getDocs(q);
          const fetchedStudents = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          setGroupStudents(fetchedStudents);
        } else {
          setGroupStudents([]);
        }
      }
    } catch (error) {
      console.error('Error fetching group data:', error);
    }
  }, [groupId]);

  const handleAddStudent = async () => {
    const groupRef = doc(db, `users/${auth.currentUser.uid}/groups`, groupId);

    try {
      const groupSnap = await getDoc(groupRef);
      const groupData = groupSnap.data();
      const existingStudents = Array.isArray(groupData.students)
        ? groupData.students
        : [];

      const newUniqueStudents = selectedStudents.filter(
        (studentId) => !existingStudents.includes(studentId)
      );
      const updatedStudents = [...existingStudents, ...newUniqueStudents];

      await updateDoc(groupRef, {
        students: updatedStudents,
      });

      setCurrentGroupStudents(updatedStudents);
      setSelectedStudents([]);
      setOpenAddStudentDialog(false);

      toast({
        title: "Muvvafaqiyatli qo'shildi",
      });

      await fetchGroupStudents();
    } catch (error) {
      console.error('Error updating group:', error);
    }
  };

  useEffect(() => {
    fetchGroupStudents();
  }, [groupId]);

  const handleRemoveStudent = async (studentId) => {
    const updatedStudents = currentGroupStudents.filter(
      (id) => id !== studentId
    );
    const groupRef = doc(db, `users/${auth.currentUser.uid}/groups`, groupId);

    try {
      await updateDoc(groupRef, {
        students: updatedStudents,
      });

      setCurrentGroupStudents(updatedStudents);
      fetchGroupStudents();

      toast({
        title: "Muvvafaqiyatli o'chirildi",
      });
    } catch (error) {
      console.error('Error updating group:', error);
    }
  };

  if (loading || !group) {
    return (
      <div className="px-4 lg:px-8 mx-auto py-4 space-y-3 md:space-y-5">
        <Skeleton className="h-4 w-72" />
        <div className="space-y-2 pb-4 w-full border-b border-border">
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-64" />
          </div>

          <div className="flex items-center gap-3 md:gap-5">
            <div className="flex items-center gap-1 text-xs md:text-sm capitalize">
              <Skeleton className="h-4 w-20" />
            </div>

            <Skeleton className="h-4 w-24" />

            <div className="flex items-center gap-1 text-xs md:text-sm text-muted-foreground">
              <Skeleton className="h-4 w-16" />
            </div>

            <div className="flex items-center gap-1 text-xs md:text-sm text-muted-foreground">
              <Skeleton className="w-4 h-4" />
              <Skeleton className="h-4 w-16" />
            </div>
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
        <div className="space-y-1">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-[97vh] overflow-hidden mt-4">
      <div className="absolute inset-0 z-0 overflow-auto h-full bg-background px-4 lg:px-8">
        <div className="flex items-center justify-between w-full">
          <BreadcrumbComponent
            title="Guruhlar ro'yxati"
            titleLink="/groups"
            subtitle={`${
              courses.filter((item) => item.id === group.courseId)[0]
                .courseTitle
            } #${group.groupNumber}`}
          />
          <button
            className="flex items-center gap-1.5 text-sm"
            onClick={() => toPDF()}
          >
            <Download className="w-4 h-4 text-muted-foreground" />
            <span>Pdf saqlash</span>
          </button>
        </div>

        <GroupHeader group={group} />

        <EditDialog
          id={id}
          open={openStudentEditDialog}
          setOpen={setOpenStudentEditDialog}
        >
          <StudentEdit id={id} setCloseDialog={setOpenStudentEditDialog} />
        </EditDialog>

        <DeleteItemAlert
          id={id}
          deleteGroupStudent={handleRemoveStudent}
          open={openStudentDeleteDialog}
          setOpen={setOpenStudentDeleteDialog}
        />

        <Tabs defaultValue="students" className="mt-4">
          <TabsList>
            <TabsTrigger value="students">O'quvchilar ro'yxati</TabsTrigger>
            <TabsTrigger value="absentee">Yo'qlamalar</TabsTrigger>
            <TabsTrigger value="exams">Imtihonlar</TabsTrigger>
          </TabsList>
          <TabsContent value="students">
            <StudentsDataTable
              id={id}
              deleteGroupStudent={handleRemoveStudent}
              setId={setId}
              data={groupStudents}
              setOpenEdit={setOpenStudentEditDialog}
              setOpenDelete={setOpenStudentDeleteDialog}
              setOpenDeleteDialog={setOpenStudentDeleteDialog}
            >
              <AddStudentDialog
                groupId={groupId}
                handleAddStudent={handleAddStudent}
                selectedStudents={selectedStudents}
                setSelectedStudents={setSelectedStudents}
                currentGroupStudents={currentGroupStudents}
                setCurrentGroupStudents={setCurrentGroupStudents}
                openDialog={openAddStudentDialog}
                setOpenDialog={setOpenAddStudentDialog}
              />
            </StudentsDataTable>
          </TabsContent>
          <TabsContent value="absentee">
            <Absentee groupId={groupId} allStudents={groupStudents} />
          </TabsContent>
          <TabsContent value="exams">
            <Exams groupId={groupId} setOpen={setShowAbsenteeStudentsDialog} />
          </TabsContent>
        </Tabs>
      </div>

      <div className="absolute inset-0 z-[-10] overflow-auto h-full no-scrollbar">
        <SavePDF
          targetRef={targetRef}
          group={group}
          groupId={groupId}
          students={groupStudents}
        />
      </div>
    </div>
  );
};

export default Group;
