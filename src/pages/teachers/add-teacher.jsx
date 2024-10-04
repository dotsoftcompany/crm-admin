import AddTeacherForm from '@/components/teachers/form';
import React from 'react';

function AddTeacher() {
  return (
    <div className="px-4 lg:px-8 mx-auto">
      <div className="pt-4">
        <h2 className="text-2xl font-bold tracking-tight">
          O'qituvchilar ro'yxati
        </h2>
        <p className="text-muted-foreground">Barcha o'qituvhilar ro'yxarti!</p>
      </div>
      
      <AddTeacherForm />
    </div>
  );
}

export default AddTeacher;
