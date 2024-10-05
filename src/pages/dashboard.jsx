import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import DashboardLayout from '@/components/layout/layout';
import MainPage from '@/pages/main';
import Courses from '@/pages/courses/courses';
import AddCourses from '@/pages/courses/add-course';
import Groups from '@/pages/groups/groups';
import AddGroup from '@/pages/groups/add-group';
import Group from '@/pages/groups/group';
import Teachers from '@/pages/teachers/teachers';
import Teacher from '@/pages/teachers/teacher';
import AddTeacher from '@/pages/teachers/add-teacher';
import AddStudent from '@/pages/students/add-student';
import Students from '@/pages/students/students';
import PaymentHistory from '@/pages/payment-history';

function Dashboard() {
  return (
    <Router>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/add-courses" element={<AddCourses />} />
          <Route path="/teachers" element={<Teachers />} />
          <Route path="/teachers/:teacherId" element={<Teacher />} />
          <Route path="/add-teacher" element={<AddTeacher />} />
          <Route path="/add-student" element={<AddStudent />} />
          <Route path="/students" element={<Students />} />
          <Route path="/groups" element={<Groups />} />
          <Route path="/groups/:groupId" element={<Group />} />
          <Route path="/add-group" element={<AddGroup />} />
          <Route path="/payment-history" element={<PaymentHistory />} />
        </Routes>
      </DashboardLayout>
    </Router>
  );
}

export default Dashboard;
