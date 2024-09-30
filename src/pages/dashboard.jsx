import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import DashboardLayout from '@/components/layout/layout';
import MainPage from '@/pages/main';
import Courses from '@/pages/courses/courses';
import AddCourses from '@/pages/courses/add-course';
import Groups from '@/pages/groups/groups';
import AddGroup from '@/pages/groups/add-group';

function Dashboard() {
  return (
    <Router>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/add-courses" element={<AddCourses />} />
          <Route path="/groups" element={<Groups />} />
          <Route path="/add-group" element={<AddGroup />} />
        </Routes>
      </DashboardLayout>
    </Router>
  );
}

export default Dashboard;
