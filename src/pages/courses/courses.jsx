import React, { useEffect, useState } from 'react';

import { useMainContext } from '@/context/main-context';
import EditDialog from '@/components/dialogs/edit-dialog';
import BreadcrumbComponent from '@/components/breadcrumb';
import CourseEdit from '@/components/courses/edit';
import DeleteAlert from '@/components/dialogs/delete-alert';
import CourseCard from '@/components/courses/card';
import FilterCourses from '@/components/courses/filter';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

function Courses() {
  const { courses, loading, uid } = useMainContext();

  const [openCourseDeleteDialog, setOpenCourseDeleteDialog] = useState(false);
  const [openCourseEditDialog, setOpenCourseEditDialog] = useState(false);
  const [filteredCourses, setFilteredCourses] = useState(courses);
  const [filterOption, setFilterOption] = useState('title');
  const [searchTerm, setSearchTerm] = useState('');
  const [id, setId] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      const newFilteredCourses = courses.filter((course) => {
        switch (filterOption) {
          case 'title':
            return course.courseTitle
              .toLowerCase()
              .includes(searchTerm.toLowerCase());
          case 'description':
            return course.courseDescription
              .toLowerCase()
              .includes(searchTerm.toLowerCase());
          case 'price':
            return course.coursePrice.toString().includes(searchTerm);
          default:
            return false;
        }
      });
      setFilteredCourses(newFilteredCourses);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, filterOption, courses]);

  return (
    <div className="px-4 lg:px-8 my-4 space-y-4">
      <BreadcrumbComponent title="Kurslar ro'yxati" />

      <EditDialog open={openCourseEditDialog} setOpen={setOpenCourseEditDialog}>
        <CourseEdit id={id} setCloseDialog={setOpenCourseEditDialog} />
      </EditDialog>

      <DeleteAlert
        id={id}
        collection={`users/${uid}/courses`}
        open={openCourseDeleteDialog}
        setOpen={setOpenCourseDeleteDialog}
      />

      <div>
        <h2 className="text-2xl font-bold tracking-tight">Mavjud kurslar</h2>
        <p className="text-muted-foreground">
          Osiyo-akt academyda hozir kunga qadar mavjud bo'lgan kurslar ro'yxati.
        </p>
      </div>

      <FilterCourses
        url="/add-course"
        title="Kurs qo'shish"
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterOption={filterOption}
        setFilterOption={setFilterOption}
      />

      {loading && <CardLoading />}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredCourses.map((item) => (
          <CourseCard
            key={item.id}
            item={item}
            setOpenDelete={() => {
              setId(item.id);
              setOpenCourseDeleteDialog(true);
            }}
            setOpenEdit={() => {
              setId(item.id);
              setOpenCourseEditDialog(true);
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default Courses;

function CardLoading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {[...Array(6)].map((_, index) => (
        <Card className="flex flex-col">
          <div className="p-4 grow space-y-2 lg:space-y-4">
            <div className="flex items-center justify-between">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>

            <div>
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-full mt-2" />
              <Skeleton className="h-4 w-3/4 mt-2" />
            </div>

            <div className="flex gap-2 mt-4">
              <Skeleton className="h-6 w-28" />
              <Skeleton className="h-6 w-32" />
            </div>
          </div>

          <div className="flex items-center justify-between py-3 px-4 border-t border-border">
            <div className="hidden items-center gap-2 w-52">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-6 w-32" />
            </div>
            <Skeleton className="h-6 w-24" />
          </div>
        </Card>
      ))}
    </div>
  );
}
