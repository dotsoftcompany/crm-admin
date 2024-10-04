import React from 'react';
import { useForm } from 'react-hook-form';

import { useMainContext } from '@/context/main-context';

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

function GroupEdit() {
  const { courses } = useMainContext();

  const defaultValue = {
    groupNumber: '',
    timeInDay: '',
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: defaultValue });

  const onSubmit = (data) => {};
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="flex flex-col md:flex-row items-center gap-2 w-full">
        <div className="w-full">
          <Label>Select Course</Label>
          <Select
            {...register('course', { required: true })}
            onValueChange={(e) => setSelectedCourse(e)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Course" />
            </SelectTrigger>
            <SelectContent>
              {courses.map((item) => {
                return (
                  <SelectItem value={item.id}>{item.courseTitle}</SelectItem>
                );
              })}
            </SelectContent>
          </Select>
          {errors.course && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>

        <div className="w-full">
          <Label>Select Teacher</Label>
          <Select {...register('teacher', { required: true })}>
            <SelectTrigger>
              <SelectValue placeholder="Select Teacher" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="teacher1">teacher 1</SelectItem>
              <SelectItem value="teacher2">teacher 2</SelectItem>
            </SelectContent>
          </Select>
          {errors.teacher && (
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
          <DatePicker className="w-full mt-2" />
          {/* <Input type="date" {...register('startDate', { required: true })} /> */}
          {errors.startDate && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-2">
        <div className="w-full">
          <Label>Select Day</Label>
          <Select {...register('day', { required: true })}>
            <SelectTrigger>
              <SelectValue placeholder="Select Day" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="odd">Toq kunlar</SelectItem>
              <SelectItem value="even">Juft kunlar</SelectItem>
            </SelectContent>
          </Select>
          {errors.teacher && (
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

      <div className="flex items-center gap-2">
        <Checkbox id="isActive" {...register('isActive')} />
        <Label htmlFor="isActive">Is Active</Label>
      </div>

      <Button type="submit" className="float-right">
        Tahrirlash
      </Button>
    </form>
  );
}

export default GroupEdit;
