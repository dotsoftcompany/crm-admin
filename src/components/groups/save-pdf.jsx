import React, { useEffect, useState } from 'react';
import { useMainContext } from '@/context/main-context';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatDate } from '@/lib/utils';
import { collection, getDocs } from 'firebase/firestore';
import { auth, db } from '@/api/firebase';

function SavePDF({ targetRef, group, groupId, students }) {
  const { teachers, courses } = useMainContext();
  const [exams, setExams] = useState([]);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const examsRef = collection(
          db,
          `users/${auth.currentUser.uid}/groups/${groupId}/exams`
        );

        const examsSnapshot = await getDocs(examsRef);

        const examsList = examsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setExams(examsList);
      } catch (error) {
        console.error('Error fetching exams:', error);
      }
    };

    if (auth.currentUser) {
      fetchExams();
    }
  }, [db, groupId, auth.currentUser]);

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
            {teachers.filter((item) => item.id === group.teacherId)[0].fullName}
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
          <TableHeader className="rounded-t-lg !bg-accent">
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
              <TableRow key={student.id} className="!border-b-2">
                <TableCell className="font-medium">
                  {student?.fullName}
                </TableCell>
                <TableCell>{student?.phoneNumber}</TableCell>
                <TableCell>{student?.parentPhoneNumber}</TableCell>
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
        <h4 className="!mb-4 text-xl font-semibold">Yo'qlamalar ro'yxati</h4>
        <Table>
          <TableHeader className="rounded-t-lg !bg-accent">
            <TableRow>
              <TableHead>Sana</TableHead>
              <TableHead>Nechtadan</TableHead>
              <TableHead>Foizda (%)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">12.11.2024</TableCell>
              <TableCell>9/10</TableCell>
              <TableCell>90%</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">23.12.2023</TableCell>
              <TableCell>8/10</TableCell>
              <TableCell>80%</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <div>
        <h4 className="!mb-4 text-xl font-semibold">Imtihonlar ro'yxati</h4>
        <Table>
          <TableHeader className="rounded-t-lg !bg-accent">
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
              <TableRow>
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
