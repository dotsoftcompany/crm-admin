import React from 'react';
import AddStudentForm from '@/components/students/form';

function AddStudent() {
  return (
    <div className="container mx-auto">
      <div className="pt-4">
        <h2 className="text-2xl font-bold tracking-tight">
          O'qituvchilar ro'yxati
        </h2>
        <p className="text-muted-foreground">Barcha o'qituvhilar ro'yxarti!</p>
      </div>

      <AddStudentForm />
    </div>
  );
}

export default AddStudent;
