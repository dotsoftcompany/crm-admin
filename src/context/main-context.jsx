import { auth, db } from '@/api/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, onSnapshot } from 'firebase/firestore';
import { createContext, useContext, useEffect, useState } from 'react';

const MainContext = createContext({});

export const useMainContext = () => {
  return useContext(MainContext);
};

export const MainContextProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState([]);
  const [uid, setUid] = useState();
  const [courses, setCourses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [students, setStudents] = useState([]);

  const colorVariants = {
    green: 'bg-green-100 hover:!bg-green-200/50 text-green-500',
    red: 'bg-rose-500 hover:!bg-rose-600 focus:!bg-rose-500  border !border-rose-500 focus:!text-white text-white hover:!text-white',
    yellow:
      'bg-amber-500 hover:!bg-amber-600 focus:!bg-amber-500 border !border-amber-500 focus:!text-white text-white hover:!text-white',
    gray: 'bg-slate-100 hover:!bg-slate-200/50 text-slate-500',
    orange:
      'bg-orange-500 hover:!bg-orange-600 focus:!bg-orange-500 border !border-orange-500 focus:!text-white text-white hover:!text-white',
    lime: 'bg-lime-500 hover:!bg-lime-600 focus:!bg-lime-500  border !border-lime-500 focus:!text-white text-white hover:!text-white',
    emerald:
      'bg-emerald-500 hover:!bg-emerald-600 focus:!bg-emerald-500 border !border-emerald-500 focus:!text-white text-white hover:!text-white',
    indigo:
      'bg-indigo-500 hover:!bg-indigo-600 focus:!bg-indigo-500 border !border-indigo-500 focus:!text-white text-white hover:!text-white',
    teal: 'bg-teal-500 hover:!bg-teal-600 focus:!bg-teal-500 border !border-teal-500 focus:!text-white text-white hover:!text-white',
    cyan: 'bg-cyan-500 hover:!bg-cyan-600 focus:!bg-cyan-500 border !border-cyan-500 focus:!text-white text-white hover:!text-white',
    sky: 'bg-sky-500 hover:!bg-sky-600 focus:!bg-sky-500 border !border-sky-500 focus:!text-white text-white hover:!text-white',
    blue: 'bg-blue-500 hover:!bg-blue-600 focus:!bg-blue-500 border !border-blue-500 focus:!text-white text-white hover:!text-white',
    violet:
      'bg-violet-500 hover:!bg-violet-600 focus:!bg-violet-500 border !border-violet-500 focus:!text-white text-white hover:!text-white',
    purple:
      'bg-purple-500 hover:!bg-purple-600 focus:!bg-purple-500 border !border-purple-500 focus:!text-white text-white hover:!text-white',
    fuchsia:
      'bg-fuchsia-500 hover:!bg-fuchsia-600 focus:!bg-fuchsia-500 border !border-fuchsia-500 focus:!text-white text-white hover:!text-white',
    pink: 'bg-pink-500 hover:!bg-pink-600 focus:!bg-pink-500 border !border-pink-500 focus:!text-white text-white hover:!text-white',
    rose: 'bg-rose-500 hover:!bg-rose-600 focus:!bg-rose-500 border !border-rose-500 focus:!text-white text-white hover:!text-white',
  };

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, (res) => {
      if (res) {
        setUser(res);
        setUid(auth.currentUser.uid);
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const coursesCollection = collection(db, `users/${uid}/courses`);
    onSnapshot(coursesCollection, (snapshot) => {
      setCourses(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });

    const teachersCollection = collection(db, `users/${uid}/teachers`);
    onSnapshot(teachersCollection, (snapshot) => {
      setTeachers(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });

    const groupsCollection = collection(db, `users/${uid}/groups`);
    onSnapshot(groupsCollection, (snapshot) => {
      setGroups(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });

    const studentsCollection = collection(db, `users/${uid}/students`);
    onSnapshot(studentsCollection, (snapshot) => {
      setStudents(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  }, [uid]);

  const logoutUser = () => {
    signOut(auth);
  };

  function addLeadingzero(d) {
    return d < 10 ? '0' + d : d;
  }

  function getUsertime(t) {
    let Y = t.getUTCFullYear();
    let M = addLeadingzero(t.getMonth() + 1);
    let D = addLeadingzero(t.getDate());
    return `${D}.${M}.${Y}`;
  }

  const contextValue = {
    isOpen,
    setIsOpen,
    colorVariants,
    user,
    setUser,
    logoutUser,
    courses,
    teachers,
    groups,
    getUsertime,
    students,
  };

  return (
    <MainContext.Provider value={contextValue}>{children}</MainContext.Provider>
  );
};
