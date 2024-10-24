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

      <div className="xl:flex">
        <div className="xl:w-1/2">
          <AddStudentForm />
        </div>
        <div className="xl:w-1/2 h-[calc(100vh-160px)] xl:flex hidden items-center">
          <h1 className="text-9xl font-bold uppercase text-border -translate-y-24 -rotate-90">
            ADD student
          </h1>
        </div>
      </div>
    </div>
  );
}

export default AddStudent;
