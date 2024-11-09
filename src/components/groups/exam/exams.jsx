import React, { useEffect, useRef, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { auth, db } from '@/api/firebase';
import { Link } from 'react-router-dom';

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
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

function Exams({ groupId }) {
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
          placeholder="Sarlovha bilan qidirish..."
          className="max-w-md"
        />
      </div>

      <div className="max-w-[44rem] min-w-full overflow-x-auto">
        <Table className="rounded-b-md">
          <TableCaption
            className={
              loading && !exams.length
                ? 'bg-muted/50 py-4 rounded-b-md'
                : 'py-4'
            }
          >
            {(loading && 'Loading...') || (!exams.length && 'No result.')}
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="max-w-56 rounded-tl-md whitespace-nowrap">
                Title
              </TableHead>
              <TableHead className="whitespace-nowrap">Start date</TableHead>
              <TableHead className="whitespace-nowrap">End date</TableHead>
              <TableHead className="whitespace-nowrap">Place</TableHead>
              <TableHead className="whitespace-nowrap">Status</TableHead>
              <TableHead className="rounded-tr-md text-center whitespace-nowrap">
                View
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredExams.map((exam) => (
              <TableRow key={exam.id}>
                {' '}
                <TableCell className="max-w-56 whitespace-nowrap">
                  {exam?.title}
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  {exam?.start}
                </TableCell>{' '}
                <TableCell className="whitespace-nowrap">{exam?.end}</TableCell>
                <TableCell className="whitespace-nowrap">
                  {exam?.type}
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  {exam?.status}
                </TableCell>
                <TableCell className="text-center">
                  <Link to={`/groups/${groupId}/exam/${exam.id}`}>
                    <Button
                      variant="ghost"
                      className="h-8 w-8 p-0"
                      title={exam?.title}
                    >
                      <Eye className="h-4 w-4 cursor-pointer mx-auto" />
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default Exams;
