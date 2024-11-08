import React, { useState } from 'react';

// ui
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  BadgeDollarSign,
  BookOpen,
  Gem,
  GraduationCapIcon,
  Star,
  Users,
} from 'lucide-react';
import { BarGraph } from '@/components/charts/bar-graph';
import { RecentlyAdded } from '@/components/recently-added';
import { AreaGraph } from '@/components/charts/area-graph';
import { PieGraph } from '@/components/charts/pie-graph';
import { useMainContext } from '@/context/main-context';
import { SheetMenu } from '@/components/layout/sheet-menu';
import { MonthPicker } from '@/components/ui/month-picker';
import {
  getMostPaidCourse,
  getPaymentMethodBreakdown,
  getPaymentsForSelectedMonth,
  getSelectedMonthAndYear,
  getTotalAmountPaid,
} from '@/lib/payment-history';
import { formatNumber, formatPaymentMethod } from '@/lib/utils';

function MainPage() {
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const { courses, teachers, students, groups, paymentHistory } =
    useMainContext();
  const { month, year } = getSelectedMonthAndYear(selectedMonth);

  const filteredPayments = getPaymentsForSelectedMonth(
    paymentHistory,
    month,
    year
  );
  console.log(paymentHistory);

  const filterByMonthAndYear = (data, month, year) => {
    return data.filter((item) => {
      const itemDate = new Date(item.timestamp);
      return itemDate.getMonth() === month && itemDate.getFullYear() === year;
    });
  };

  const filteredStudents = filterByMonthAndYear(students, month, year);
  const filteredTeachers = filterByMonthAndYear(teachers, month, year);
  const filteredCourses = filterByMonthAndYear(courses, month, year);
  const filteredGroups = filterByMonthAndYear(groups, month, year);

  const totalAmount = getTotalAmountPaid(filteredPayments);
  const mostPaidCourse = getMostPaidCourse(filteredPayments);
  const paymentMethodBreakdown = getPaymentMethodBreakdown(filteredPayments);

  const courseId = groups.find(
    (c) => c.id === mostPaidCourse?.course
  )?.courseId;
  const courseTitle = courses.find((c) => c.id === courseId)?.courseTitle;

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
            <MonthPicker
              className="w-44"
              month={selectedMonth}
              setMonth={setSelectedMonth}
            />
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MainCard
          title="Kurslar"
          Icon={BookOpen}
          count={filteredCourses?.length}
        />
        <MainCard
          title="O'qituvchilar"
          Icon={Star}
          count={filteredTeachers?.length}
        />
        <MainCard
          title="Guruhlar"
          Icon={Users}
          count={filteredGroups?.length}
        />
        <MainCard
          title="O'quvchilar"
          Icon={GraduationCapIcon}
          count={filteredStudents?.length}
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="dark:bg-background/95">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-0">
            <CardTitle className="text-sm font-medium">Umumiy summa</CardTitle>
            <BadgeDollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          {totalAmount != 0 ? (
            <CardContent>
              <small className="text-muted-foreground">
                {groups.length} ta guruh uchun
              </small>
              <h4 className="text-2xl font-bold">
                {formatNumber(totalAmount)} uzs
              </h4>
            </CardContent>
          ) : (
            <CardContent className="mt-1">
              <small className="text-muted-foreground">
                No payments recorded
              </small>
            </CardContent>
          )}
        </Card>
        <Card className="dark:bg-background/95">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-0">
            <CardTitle className="text-sm font-medium">Ommabop kurs</CardTitle>
            <Gem className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          {mostPaidCourse ? (
            <CardContent>
              <small className="text-muted-foreground">{courseTitle}</small>
              <h4 className="text-2xl font-bold">
                {formatNumber(mostPaidCourse?.totalAmount)} uzs
              </h4>
            </CardContent>
          ) : (
            <CardContent className="mt-1">
              <small className="text-muted-foreground">
                No payments recorded
              </small>
            </CardContent>
          )}
        </Card>
        <Card className="dark:bg-background/95">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-0">
            <CardTitle className="text-sm font-medium">
              Ommabop to'lov usuli
            </CardTitle>
            <Gem className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          {Object.entries(paymentMethodBreakdown).length === 0 ? (
            <CardContent className="mt-1">
              <small className="text-muted-foreground">
                No payments recorded
              </small>
            </CardContent>
          ) : (
            <ul>
              {Object.entries(paymentMethodBreakdown)
                .slice(0, 1)
                .map(([method, totalAmount]) => (
                  <CardContent>
                    <small className="text-muted-foreground">
                      {formatPaymentMethod(method)}
                    </small>
                    <li key={method} className="text-2xl font-bold">
                      {formatNumber(totalAmount)} UZS
                    </li>
                  </CardContent>
                ))}
            </ul>
          )}
        </Card>
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

function MainCard({ title, Icon, count, uzs = false }) {
  return (
    <Card className="dark:bg-background/95">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {count} {uzs ? 'uzs' : 'ta'}
        </div>
      </CardContent>
    </Card>
  );
}
