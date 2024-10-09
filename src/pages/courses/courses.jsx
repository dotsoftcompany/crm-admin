import React, { useEffect, useState } from 'react';

import { useMainContext } from '@/context/main-context';
import EditDialog from '@/components/dialogs/edit-dialog';
import BreadcrumbComponent from '@/components/breadcrumb';
import CourseEdit from '@/components/courses/edit';
import DeleteAlert from '@/components/dialogs/delete-alert';
import CourseCard from '@/components/courses/card';
import FilterCourses from '@/components/courses/filter';

function Courses() {
  const { courses } = useMainContext();

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
        collection="courses"
        open={openCourseDeleteDialog}
        setOpen={setOpenCourseDeleteDialog}
      />

      <div>
        <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
        <p className="text-muted-foreground">
          Here&apos;s a list of your tasks for this month!
        </p>
      </div>

      <FilterCourses
        url="/add-course"
        title="Add course"
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterOption={filterOption}
        setFilterOption={setFilterOption}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((item) => (
            <CourseCard
              key={item.courseCode}
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
          ))
        ) : (
          <p className="py-2 text-muted-foreground">Kurs topilmadi.</p>
        )}
      </div>
    </div>
  );
}

export default Courses;
