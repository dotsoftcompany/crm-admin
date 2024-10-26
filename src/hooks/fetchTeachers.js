import { db } from '@/api/firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';

function fetchTeachers(uid, setTeachers) {
  try {
    const teachersCollection = collection(db, 'teachers');
    const queryTeachers = query(teachersCollection, where('role', '==', uid));

    const unsubscribeTeachers = onSnapshot(queryTeachers, (snapshot) => {
      setTeachers(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });

    return unsubscribeTeachers;
  } catch (error) {
    console.error('Error fetching teachers:', error);
  }
}

export default fetchTeachers;
