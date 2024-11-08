import { auth, db } from '@/api/firebase';
import BreadcrumbComponent from '@/components/breadcrumb';
import ExamHeader from '@/components/groups/exam/exam-header';
import Questions from '@/components/groups/exam/questions';
import GroupHeader from '@/components/groups/header';
import { useMainContext } from '@/context/main-context';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const GroupExam = () => {
  const { groupId, examId } = useParams();
  const { groups, courses } = useMainContext();
  const group = groups.find((g) => g.id === groupId);

  const [exam, setExam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExam = async () => {
      setLoading(true);
      try {
        const examRef = doc(
          db,
          `users/${auth.currentUser.uid}/groups/${groupId}/exams`,
          examId
        );
        const examSnapshot = await getDoc(examRef);

        if (examSnapshot.exists()) {
          setExam({ id: examSnapshot.id, ...examSnapshot.data() });
        } else {
          console.log('No such exam!');
        }
      } catch (error) {
        console.error('Error fetching exam:', error);
        setError('Error fetching exam data');
      } finally {
        setLoading(false);
      }
    };

    if (auth.currentUser) {
      fetchExam();
    }
  }, [db, groupId, examId, auth.currentUser]);

  return (
    <div className="px-4 lg:px-8 mt-4">
      <BreadcrumbComponent
        title="Guruhlar ro'yxati"
        titleLink="/groups"
        subtitle={`${
          courses.filter((item) => item.id === group.courseId)[0]?.courseTitle
        } #${group?.groupNumber}`}
        subtitleLink={`/groups/${groupId}`}
        subtitle2={`${loading ? 'Loading' : exam?.title} (exam)`}
      />
      <ExamHeader exam={exam} loading={loading} />

      <Questions groupId={groupId} examId={examId} />
    </div>
  );
};

export default GroupExam;
