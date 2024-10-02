import React from 'react';

import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import StudentsDataTable from '@/components/students/data-table';

function Students() {
  return (
    <div className="container mx-auto space-y-2">
      <div className="pt-4">
        <h2 className="text-2xl font-bold tracking-tight">
          O'quvchilar ro'yxati
        </h2>
        <p className="text-muted-foreground">Barcha o'quvchilar ro'yxarti!</p>
      </div>

      <div>
        <StudentsDataTable>
          <Link to="/add-student">
            <Button>O'quvchi qo'shish</Button>
          </Link>
        </StudentsDataTable>
      </div>
    </div>
  );
}

export default Students;
