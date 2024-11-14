import React, { useEffect, useState } from 'react';
import { useMainContext } from '@/context/main-context';
import { formatDate, formatPhoneNumber } from '@/lib/utils';
import { collection, getDocs } from 'firebase/firestore';
import { auth, db } from '@/api/firebase';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { format } from 'date-fns';

function SavePDF({ targetRef, group, groupId, students }) {
  const { uid, teachers, courses } = useMainContext();

  const [exams, setExams] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [absentees, setAbsentees] = useState([]);
  const [evaluations, setEvaluations] = useState([]);

  const fetchCollectionData = async (path, setter) => {
    try {
      const ref = collection(db, path);
      const snapshot = await getDocs(ref);
      const dataList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setter(dataList);
    } catch (error) {
      console.error(`Error fetching data from ${path}:`, error);
    }
  };

  useEffect(() => {
    if (!uid || !groupId) return;

    const fetchData = async () => {
      await Promise.all([
        fetchCollectionData(`users/${uid}/groups/${groupId}/exams`, setExams),
        fetchCollectionData(`users/${uid}/groups/${groupId}/tasks`, setTasks),
        fetchCollectionData(
          `users/${uid}/groups/${groupId}/absentees`,
          setAbsentees
        ),
        fetchCollectionData(
          `users/${uid}/groups/${groupId}/evaluations`,
          setEvaluations
        ),
      ]);
    };

    fetchData();
  }, [uid, groupId]);

  const sortedEvaluations = evaluations.sort(
    (a, b) => a.timestamp?.seconds - b.timestamp?.seconds
  );

  function formatDate2(timestamp) {
    const { seconds, nanoseconds } = timestamp;
    const date = new Date(seconds * 1000 + nanoseconds / 1000000);
    return format(date, 'dd.MM.yy');
  }

  return (
    <div
      className="absolute top-0 left-0 w-full text-black min-h-screen overflow-auto p-8 -z-10 space-y-4"
      ref={targetRef}
    >
      <div className="space-y-2 py-4 w-full border-b border-border">
        <div className="flex items-center gap-2 text-black">
          <h1 className="text-xl md:text-2xl font-semibold">
            {
              courses.filter((item) => item.id === group.courseId)[0]
                .courseTitle
            }
          </h1>
          <span className="text-lg mt-1">#{group.groupNumber}</span>
        </div>
        <div className="flex items-center gap-3 md:gap-5">
          <span className="hover:underline text-base md:text-lg">
            {
              teachers.filter((item) => item.id === group.teacherId)[0]
                ?.fullName
            }
          </span>
          <p className="text-base md:text-lg">{group.timeInDay}</p>
          <div className="text-base md:text-lg">
            <span>{formatDate(group.startDate)}</span>
          </div>
          <div
            className={`text-base md:text-lg ${
              group.status ? 'text-green-500' : 'text-red-500'
            }`}
          >
            <span>{group.status ? 'Aktiv' : 'Tugatildi'}</span>
          </div>
        </div>
      </div>

      <div>
        <h4 className="!mb-4 text-xl font-semibold">O'quvchilar ro'yxati</h4>
        <Table>
          <TableCaption
            className={students.length ? 'py-4 rounded-b-md' : 'py-4'}
          >
            {!students.length && 'No result.'}
          </TableCaption>
          <TableHeader className="!bg-accent">
            <TableRow>
              <TableHead className="w-52">Ism familiya</TableHead>
              <TableHead>Telefon</TableHead>
              <TableHead>Ota-onasi Telefoni</TableHead>
              <TableHead>Manzil</TableHead>
              <TableHead>To'lov holati</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id} className="!bg-gray-100">
                <TableCell className="font-medium">
                  {student?.fullName}
                </TableCell>
                <TableCell>{formatPhoneNumber(student?.phoneNumber)}</TableCell>
                <TableCell>
                  {formatPhoneNumber(student?.parentPhoneNumber)}
                </TableCell>
                <TableCell>{student?.address}</TableCell>
                <TableCell
                  className={`${
                    student?.isPaid ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  {student?.isPaid ? "To'lov qilgan" : "To'lov qilmagan"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div>
        <h4 className="!mb-4 text-xl font-semibold">Baholar ro'yxati</h4>

        <div className="overflow-x-auto rounded-lg">
          <div className="inline-flex border border-border rounded-lg min-w-fit">
            <div className="flex-shrink-0 w-44 md:w-52 !sticky left-0 bg-muted/50 z-10 shadow">
              <div className="font-medium text-sm p-4 border-b border-border bg-accent text-white">
                Ism familiya
              </div>
              {students.map((student) => (
                <div
                  key={student.id}
                  className="p-4 text-sm border-b  border-border whitespace-nowrap truncate bg-gray-100 text-black"
                >
                  {student.fullName}
                </div>
              ))}
            </div>

            <div className="flex overflow-x-auto rounded-r-lg">
              {sortedEvaluations.map((evaluation) => {
                function formatDate(timestamp) {
                  const { seconds, nanoseconds } = timestamp;
                  const date = new Date(seconds * 1000 + nanoseconds / 1000000);
                  return format(date, 'dd.MM.yy');
                }
                return (
                  <div key={evaluation.id} className="flex-shrink-0 group">
                    <div className="relative px-4 py-[0.88rem] border-l border-border border-b bg-accent">
                      <span className="text-xs text-white font-medium">
                        {formatDate(evaluation.timestamp)}
                      </span>
                    </div>

                    {students.map((student) => {
                      const studentScore =
                        evaluation.students.find((s) => s.id === student.id)
                          ?.score || '-';

                      return (
                        <div
                          key={student.id}
                          className={`flex items-center text-sm justify-center p-4 border-l border-b  border-border font-bold`}
                        >
                          {studentScore}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
              {evaluations.length === 0 && (
                <div className="flex-shrink-0 group flex items-center justify-center w-14">
                  <p className="-rotate-90 text-muted-foreground text-sm whitespace-nowrap">
                    Ma'lumot topilmadi.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div>
        <h4 className="!mb-4 text-xl font-semibold">Vaziaflar ro'yxati</h4>
        <Table className="min-w-[50rem] w-full">
          {!tasks.length && (
            <TableCaption className="bg-muted/50 py-4 rounded-b-md">
              No result
            </TableCaption>
          )}
          <TableHeader>
            <TableRow>
              <TableHead className="w-80 rounded-tl-md">Title</TableHead>
              <TableHead className="text-center">Due date</TableHead>
              <TableHead className="text-center">Attachments</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task.id} className="!bg-gray-100 h-full">
                <TableCell className="w-80">
                  <h1 className="text-base font-medium w-80">{task.title}</h1>
                  <p className="text-sm text-gray-500 w-80">
                    {task.description}
                  </p>
                </TableCell>
                <TableCell className="text-center">
                  {formatDate2(task.due)}
                </TableCell>
                <TableCell className="text-center">
                  {task?.images ? task?.images?.length : 0} attachments
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div>
        <h4 className="!mb-4 text-xl font-semibold">Yo'qlamalar ro'yxati</h4>
        <Table>
          <TableCaption
            className={absentees.length ? 'py-4 rounded-b-md' : 'py-4'}
          >
            {!absentees.length && 'No result.'}
          </TableCaption>
          <TableHeader className="bg-accent">
            <TableRow>
              <TableHead>Sana</TableHead>
              <TableHead>Nechtadan</TableHead>
              <TableHead>Foizda (%)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {absentees.map((absentee) => {
              const attendancePercentage = (
                ((students.length - absentee.students.length) /
                  students.length) *
                100
              ).toFixed(0);

              return (
                <TableRow key={absentee.id} className="!bg-gray-100">
                  <TableCell className="font-medium">{absentee.date}</TableCell>
                  <TableCell>
                    {students.length - absentee.students.length}/
                    {students.length}
                  </TableCell>
                  <TableCell>{attendancePercentage}%</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      <div>
        <h4 className="!mb-4 text-xl font-semibold">Imtihonlar ro'yxati</h4>
        <Table>
          <TableCaption className={exams.length ? 'py-4 rounded-b-md' : 'py-4'}>
            {!exams.length && 'No result.'}
          </TableCaption>
          <TableHeader className="!bg-accent">
            <TableRow>
              <TableHead>Sarlovha</TableHead>
              <TableHead>Boshlanish sanasi</TableHead>
              <TableHead>Tugash sanasi</TableHead>
              <TableHead>Manzil</TableHead>
              <TableHead>Holat</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {exams.map((exam) => (
              <TableRow key={exam?.id} className="!bg-gray-100">
                <TableCell className="font-medium">{exam?.title}</TableCell>
                <TableCell>{exam?.startDate}</TableCell>
                <TableCell>{exam?.endDate}</TableCell>
                <TableCell>{exam?.place}</TableCell>
                <TableCell>{exam?.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default SavePDF;
