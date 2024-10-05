import React from 'react';
import AddStudentForm from '@/components/students/form';
import BreadcrumbComponent from '@/components/breadcrumb';

function AddStudent() {
  return (
    <div className="px-4 lg:px-8 mx-auto space-y-4 my-4">
      <BreadcrumbComponent title="O'quvchi qo'shish" />

      <div>
        <h2 className="text-2xl font-bold tracking-tight">
          O'quvchilar ro'yxati
        </h2>
        <p className="text-muted-foreground">Barcha o'qituvhilar ro'yxarti!</p>
      </div>

      <AddStudentForm />
    </div>
  );
}

export default AddStudent;
