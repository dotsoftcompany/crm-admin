import React from 'react';
import { Controller, useForm } from 'react-hook-form';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DatePicker } from '@/components/ui/date-picker';
import { useState } from 'react';
import { useMainContext } from '@/context/main-context';
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '@/api/firebase';
import BreadcrumbComponent from '@/components/breadcrumb';

function AddGroup() {
  const { courses, teachers } = useMainContext();
  const [startDate, setStartDate] = useState('');

  const defaultValue = {
    courseId: '',
    teacherId: '',
    groupNumber: '',
    timeInDay: '',
    selectedDay: '',
  };

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ defaultValues: defaultValue });

  const onSubmit = async (data) => {
    try {
      const userGroupsRef = collection(
        db,
        `users/${auth.currentUser.uid}/groups`
      );

      await addDoc(userGroupsRef, {
        ...data,
        startDate: new Date(startDate).getTime(),
      }).then(() => {
        reset();
        setStartDate('');
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="px-4 lg:px-8 mx-auto my-4 space-y-4">
      <BreadcrumbComponent title="Guruh qo'shish" />

      <div>
        <h2 className="text-2xl font-bold tracking-tight">Guruh qo'shish</h2>
        <p className="text-muted-foreground">
          Here&apos;s a list of your tasks for this month!
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Select Course */}
        <div className="flex flex-col md:flex-row items-center gap-2 w-full">
          <div className="w-full">
            <Label>Select Course</Label>
            <Controller
              name="courseId"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  onValueChange={(value) => field.onChange(value)}
                  value={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Course" />
                  </SelectTrigger>
                  <SelectContent>
                    {courses.map((item) => (
                      <SelectItem key={item.id} value={item.id}>
                        {item.courseTitle}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.courseId && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>

          {/* Select Teacher */}
          <div className="w-full">
            <Label>Select Teacher</Label>
            <Controller
              name="teacherId"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Teacher" />
                  </SelectTrigger>
                  <SelectContent>
                    {teachers.map((item) => (
                      <SelectItem key={item.id} value={item.id}>
                        {item.fullName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.teacherId && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-2">
          <div className="w-full">
            <Label>Group Number</Label>
            <Input
              type="number"
              placeholder="Group Number"
              {...register('groupNumber', { required: true })}
            />
            {errors.groupNumber && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>

          <div className="w-full flex flex-col">
            <Label>Start Date</Label>
            <DatePicker
              className="w-full mt-2"
              setData={setStartDate}
              data={startDate}
            />
            {/* <Input type="date" {...register('startDate', { required: true })} /> */}
            {errors.startDate && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-2">
          <div className="w-full">
            <Label>Select Day</Label>
            <Controller
              name="selectedDay"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Day" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="odd">Har kuni</SelectItem>
                    <SelectItem value="odd">Toq kunlar</SelectItem>
                    <SelectItem value="even">Juft kunlar</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.selectedDay && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>

          <div className="w-full">
            <Label>Time in a Day (e.g., 18:00 - 20:00)</Label>
            <Input
              type="text"
              placeholder="18:00 - 20:00"
              {...register('timeInDay', { required: true })}
            />
            {errors.timeInDay && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>
        </div>

        {/* Is Active */}
        {/* <div>
          <Label>Is Active</Label>
          <Checkbox {...register('isActive')} />
        </div> */}

        {/* Time in a Day */}

        <Button type="submit">Add Group</Button>
      </form>
    </div>
  );
}

export default AddGroup;
