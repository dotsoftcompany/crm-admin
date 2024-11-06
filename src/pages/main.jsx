import React from 'react';

// ui
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { BookOpen, GraduationCapIcon, Star, Users } from 'lucide-react';
import { BarGraph } from '@/components/charts/bar-graph';
import { RecentlyAdded } from '@/components/recently-added';
import { AreaGraph } from '@/components/charts/area-graph';
import { PieGraph } from '@/components/charts/pie-graph';
import { useMainContext } from '@/context/main-context';
import { SheetMenu } from '@/components/layout/sheet-menu';
import { MonthPicker } from '@/components/ui/month-picker';
import MakeStudentsUnpaid from '@/components/dialogs/make-students-unpaid';

function MainPage() {
  const { courses, teachers, students, groups } = useMainContext();
  const [month, setMonth] = React.useState(null);

  const allData = [
    ...courses.map((item) => ({ ...item, type: 'course' })),
    ...teachers.map((item) => ({ ...item, type: 'teacher' })),
    ...groups.map((item) => ({ ...item, type: 'group' })),
    ...students.map((item) => ({ ...item, type: 'student' })),
  ];

  // Sort the combined data based on the ID or any other relevant property (e.g., `startDate` or `dateOfJoining`)
  const sortedData = allData.sort((a, b) => b.id.localeCompare(a.id)); // Assuming `id` is sortable

  // Get the last 5 added items
  const lastFiveItems = sortedData.slice(0, 5);

  // https://github.com/Kiranism/next-shadcn-dashboard-starter

  return (
    <div className="px-8 mx-auto my-4 space-y-4">
      {/* <MakeStudentsUnpaid /> */}

      <div className="space-y-2">
        <div className="flex items-center justify-between space-y-2">
          <div className="flex items-center gap-2">
            <SheetMenu />
            <h2 className="text-2xl font-bold tracking-tight">
              Hi, Welcome back 👋
            </h2>
          </div>
          <div className="hidden items-center space-x-2 md:flex">
            <MonthPicker month={month} setMonth={setMonth} />
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MainCard title="Kurslar" Icon={BookOpen} count={courses?.length} />
        <MainCard title="O'qituvchilar" Icon={Star} count={teachers?.length} />
        <MainCard title="Guruhlar" Icon={Users} count={groups?.length} />
        <MainCard
          title="O'quvchilar"
          Icon={GraduationCapIcon}
          count={students?.length}
        />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4">
          <BarGraph />
        </div>
        <Card className="col-span-4 md:col-span-3">
          <CardHeader>
            <CardTitle>Oxirgi qo'shilganlar</CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent>
            <RecentlyAdded />
          </CardContent>
        </Card>
        <div className="col-span-4">
          <AreaGraph />
        </div>
        <div className="col-span-4 md:col-span-3">
          <PieGraph />
        </div>
      </div>
    </div>
  );
}

export default MainPage;

function MainCard({ title, Icon, count }) {
  return (
    <Card className="dark:bg-background/95">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{count} ta</div>
      </CardContent>
    </Card>
  );
}
