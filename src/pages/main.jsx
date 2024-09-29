import React from 'react';

// ui
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, GraduationCapIcon, Users } from 'lucide-react';

function MainPage() {
  // https://github.com/Kiranism/next-shadcn-dashboard-starter
  return (
    <div className="container mx-auto">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 my-5">
        <Card className="bg-accent">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Kurslar</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12 ta</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card className="bg-accent">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">O'qituvchilar</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7 ta</div>
            <p className="text-xs text-muted-foreground">
              +180.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card className="bg-accent">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Talabalar</CardTitle>
            <GraduationCapIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">217 ta</div>
            <p className="text-xs text-muted-foreground">
              +19% from last month
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default MainPage;
