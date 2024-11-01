import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/api/firebase';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useMainContext } from '@/context/main-context';

function Questions({ groupId, examId }) {
  const { uid } = useMainContext();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const questionsRef = collection(
          db,
          `users/${uid}/groups/${groupId}/exams/${examId}/questions`
        );
        const querySnapshot = await getDocs(questionsRef);

        const questionsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setQuestions(questionsList);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [uid, groupId, examId]);

  console.log(questions);

  if (loading) {
    return (
      <ul className="w-full">
        {Array.from({ length: 3 }).map((_, index) => (
          <li key={index} className="w-full">
            <div className="flex items-center justify-between my-2">
              {/* Skeleton for question title */}
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
            <div className="border border-border rounded-md">
              {/* Skeleton for answers */}
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="flex items-center py-2.5 px-4 first:rounded-t-md last:rounded-b-md border-b border-border"
                >
                  <Skeleton className="w-5 h-5 rounded-full mr-4" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ))}
            </div>
          </li>
        ))}
      </ul>
    );
  }

  if (error) return <p>Error fetching questions: {error}</p>;

  const options = ['A', 'B', 'C', 'D'];

  return (
    <div>
      <ul className="w-full">
        {questions.map((question, index) => (
          <li className="w-full">
            <h2 className="text-lg font-semibold my-3">{index + 1}. {question.title}</h2>
            <ul className="border border-border rounded-md">
              {question.answers.map((option, index) => (
                <li
                  key={option.id}
                  className={`flex items-center py-2.5 px-4 first:rounded-t-md last:rounded-b-md border-b border-border`}
                >
                  <span
                    className={`flex items-center justify-center rounded-full text-xs w-5 h-5 p-1 bg-blue-500`}
                  >
                    {options[index]}
                  </span>
                  <span className="text-sm ml-4">{option}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Questions;
