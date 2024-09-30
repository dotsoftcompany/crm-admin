import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import DashboardLayout from '@/components/layout/layout';
import MainPage from '@/pages/main';
import Courses from '@/pages/courses/courses';

function Dashboard() {
  return (
    <Router>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/courses" element={<Courses />} />
        </Routes>
      </DashboardLayout>
    </Router>
  );
}

export default Dashboard;
