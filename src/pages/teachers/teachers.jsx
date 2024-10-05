import React from 'react';
import TeachersDataTable from '@/components/teachers/data-table';

import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

function Teachers() {
  return (
    <div className="px-4 lg:px-8 mx-auto space-y-2">
      <div className="pt-4">
        <h2 className="text-2xl font-bold tracking-tight">
          O'qituvchilar ro'yxati
        </h2>
        <p className="text-muted-foreground">Barcha o'qituvchilar ro'yxati!</p>
      </div>

      <div>
        <TeachersDataTable>
          <Link to="/add-teacher">
            <Button>O'qituvchi qo'shish</Button>
          </Link>
        </TeachersDataTable>
      </div>
    </div>
  );
}

export default Teachers;