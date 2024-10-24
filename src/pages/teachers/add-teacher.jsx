import BreadcrumbComponent from '@/components/breadcrumb';
import AddTeacherForm from '@/components/teachers/form';
import React from 'react';

function AddTeacher() {
  return (
    <div className="px-4 lg:px-8 my-4 mx-auto space-y-4">
      <BreadcrumbComponent title="O'qituvchi qo'shish" />

      <div>
        <h2 className="text-2xl font-bold tracking-tight">
          O'qituvchilar ro'yxati
        </h2>
        <p className="text-muted-foreground">Barcha o'qituvhilar ro'yxarti!</p>
      </div>

      <div className="xl:flex">
        <div className="xl:w-1/2">
          <AddTeacherForm />
        </div>
        <div className="xl:w-1/2 h-[calc(100vh-160px)] xl:flex hidden items-center">
          <h1 className="text-9xl font-bold uppercase text-border -translate-y-24 -rotate-90">
            ADD TEACHER
          </h1>
        </div>
      </div>
    </div>
  );
}

export default AddTeacher;
