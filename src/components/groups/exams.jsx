import React, { useEffect, useRef, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

import { Eye } from 'lucide-react';

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
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { auth, db } from '@/api/firebase';
import { Link } from 'react-router-dom';

function Exams({ groupId, setOpen }) {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredExams, setFilteredExams] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const debounceRef = useRef(null);

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
      } finally {
        setLoading(false);
      }
    };

    if (auth.currentUser) {
      fetchExams();
    }
  }, [db, groupId, auth.currentUser]);

  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      if (searchTerm) {
        const filtered = exams.filter((exam) =>
          exam.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredExams(filtered);
      } else {
        setFilteredExams(exams);
      }
    }, 300);

    return () => {
      clearTimeout(debounceRef.current);
    };
  }, [searchTerm, exams]);

  return (
    <div className="space-y-2 pt-2">
      <div className="flex gap-2 items-center">
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by title"
          className="max-w-md"
        />
      </div>

      <Table className="rounded-b-md">
        <TableCaption>{loading && 'Loading...'}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="max-w-56 rounded-tl-md">Title</TableHead>
            <TableHead>Start date</TableHead>
            <TableHead>End date</TableHead>
            <TableHead>Place</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="rounded-tr-md text-center">View</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredExams.map((exam) => (
            <TableRow key={exam.id}>
              {' '}
              <TableCell className="max-w-56">{exam?.title}</TableCell>
              <TableCell>
                {new Date(exam?.startDate).toLocaleDateString()}
              </TableCell>{' '}
              <TableCell>
                {new Date(exam?.endDate).toLocaleDateString()}
              </TableCell>
              <TableCell>{exam?.place}</TableCell>
              <TableCell>{exam?.status}</TableCell>
              <TableCell className="text-center">
                <Link to={`/groups/${groupId}/exam/${exam.id}`}>
                  <Button onClick={() => setOpen(true)} variant="link">
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
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default Exams;
