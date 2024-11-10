import { useEffect, useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import { collection, getDocs } from 'firebase/firestore';
import { useMainContext } from '@/context/main-context';
import { db } from '@/api/firebase';
import { X } from 'lucide-react';

function Evaluation({ groupId, students }) {
  const { uid } = useMainContext();
  const [loading, setLoading] = useState(true);

  const [evaluations, setEvaluations] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  const convertTimestampToDate = (timestamp) => {
    return new Date(timestamp.seconds * 1000);
  };

  const sortedEvaluations = evaluations.sort(
    (a, b) => a.timestamp.seconds - b.timestamp.seconds
  );

  const filteredEvaluations = sortedEvaluations.filter((evaluation) => {
    if (!selectedDate) return true;

    const evaluationDate = convertTimestampToDate(evaluation.timestamp);
    return (
      evaluationDate.toLocaleDateString('en-GB') ===
      selectedDate.toLocaleDateString('en-GB')
    );
  });

  const clearDate = () => setSelectedDate(null);

  const fetchEvaluations = async () => {
    setLoading(true);
    try {
      const evaluationsRef = collection(
        db,
        `users/${uid}/groups/${groupId}/evaluations`
      );
      const querySnapshot = await getDocs(evaluationsRef);

      const evaluationsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setEvaluations(evaluationsList);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvaluations();
  }, [uid, groupId]);

  return (
    <>
      <div className="space-y-2 pt-2">
        <div className="flex justify-between items-center">
          <h2 className="hidden lg:block text-lg font-bold tracking-tight">
            O'quvchilar balli
          </h2>
          <div className="flex items-center gap-2">
            <div className="relative">
              <ReactDatePicker
                placeholderText="Sanani tanlang."
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                dateFormat="dd.MM.yyyy"
                className="w-fit py-2 px-3 border rounded-md bg-background"
              />
              {selectedDate && (
                <X
                  onClick={clearDate}
                  className="absolute top-1/2 -translate-y-1/2 right-2 h-4 w-4 cursor-pointer"
                />
              )}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto rounded-lg">
          <div className="inline-flex border border-border rounded-lg min-w-fit">
            <div className="flex-shrink-0 w-44 md:w-52 !sticky left-0 bg-muted/50 z-10 shadow">
              <div className="font-medium text-sm p-4 border-b border-border">
                Ism familiya
              </div>
              {students.map((student) => (
                <div
                  key={student.id}
                  className="p-4 text-sm border-b  border-border whitespace-nowrap truncate bg-muted/50"
                >
                  {student.fullName}
                </div>
              ))}
            </div>

            <div className="flex overflow-x-auto rounded-r-lg">
              {filteredEvaluations.map((evaluation) => {
                function formatDate(timestamp) {
                  const { seconds, nanoseconds } = timestamp;
                  const date = new Date(seconds * 1000 + nanoseconds / 1000000);
                  return format(date, 'dd.MM.yy');
                }
                return (
                  <div key={evaluation.id} className="flex-shrink-0 group">
                    <div className="relative px-4 py-[0.88rem] border-l border-border border-b bg-muted/50">
                      <span className="text-xs text-muted-foreground font-medium">
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
              {filteredEvaluations.length === 0 && (
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
    </>
  );
}

export default Evaluation;
