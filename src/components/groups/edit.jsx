import React, { useCallback, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

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
import { Switch } from '../ui/switch';
import { doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '@/api/firebase';
import { useToast } from '../ui/use-toast';

function GroupEdit({ id, setCloseDialog }) {
  const { courses, teachers, groups } = useMainContext();
  const group = groups.find((g) => g.id === id);

  const { toast } = useToast();

  console.log(groups);

  const defaultValue = {
    groupNumber: group?.groupNumber,
    timeInDay: group?.timeInDay,
    selectedDay: group?.selectedDay,
    startDate: group?.startDate,
    courseId: group?.courseId,
    teacherId: group?.teacherId,
    status: group?.status || false,
  };

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: defaultValue,
  });

  useEffect(() => {
    if (group) {
      reset(defaultValue);
    }
  }, [group, reset]);

  const onSubmit = useCallback(
    async (data) => {
      try {
        const groupDocRef = doc(db, `users/${auth.currentUser.uid}/groups`, id);

        await updateDoc(groupDocRef, data);
        toast({
          title: 'Kurs muvaffaqiyatli yangilandi',
        });
        setCloseDialog(false);
        reset();
      } catch (error) {
        toast({
          title: 'Xatolik yuz berdi',
          description: error.message,
          status: 'error',
        });
      }
    },
    [id]
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="flex flex-col md:flex-row items-center gap-2 w-full">
        <div className="w-full">
          <Label>Select Course</Label>
          <Controller
            name="courseId"
            control={control}
            rules={{ required: 'Course selection is required' }}
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={(e) => field.onChange(e)}
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
            <span className="text-red-500">{errors.courseId.message}</span>
          )}
        </div>

        <div className="w-full">
          <Label>Select Teacher</Label>
          <Controller
            name="teacherId"
            control={control}
            rules={{ required: 'Teacher selection is required' }}
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={(e) => field.onChange(e)}
              >
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
            <span className="text-red-500">{errors.teacherId.message}</span>
          )}
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-2">
        <div className="w-full">
          <Label>Group Number</Label>
          <Input
            type="number"
            placeholder="Group Number"
            {...register('groupNumber', {
              required: 'Group number is required',
            })}
          />
          {errors.groupNumber && (
            <span className="text-red-500">{errors.groupNumber.message}</span>
          )}
        </div>

        <div className="w-full flex flex-col">
          <Label>Start Date</Label>
          <Controller
            name="startDate"
            control={control}
            rules={{ required: 'Start date is required' }}
            render={({ field }) => (
              <DatePicker
                // Convert timestamp to Date object if the field value exists
                data={field.value ? new Date(field.value) : null}
                setData={(date) => field.onChange(date ? date.getTime() : null)} // Convert back to timestamp
                className="w-full mt-2"
              />
            )}
          />
          {errors.startDate && (
            <span className="text-red-500">{errors.startDate.message}</span>
          )}
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-2">
        <div className="w-full">
          <Label>Select Day</Label>
          <Controller
            name="selectedDay"
            control={control}
            rules={{ required: 'Day selection is required' }}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Day" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="odd">Odd days</SelectItem>
                  <SelectItem value="even">Even days</SelectItem>
                  <SelectItem value="every_day">Every day</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.selectedDay && (
            <span className="text-red-500">{errors.selectedDay.message}</span>
          )}
        </div>

        <div className="w-full">
          <Label>Time in a Day</Label>
          <Controller
            name="timeInDay"
            control={control}
            rules={{ required: 'Time selection is required' }}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="08:00 - 10:00">08:00 - 10:00</SelectItem>
                  <SelectItem value="10:00 - 12:00">10:00 - 12:00</SelectItem>
                  <SelectItem value="14:00 - 16:00">14:00 - 16:00</SelectItem>
                  <SelectItem value="16:00 - 18:00">16:00 - 18:00</SelectItem>
                  <SelectItem value="18:00 - 20:00">18:00 - 20:00</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.timeInDay && (
            <span className="text-red-500">{errors.timeInDay.message}</span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Controller
          name="status"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Switch checked={value} onCheckedChange={onChange} id="status" />
          )}
        />
        <Label htmlFor="status">Is Active</Label>
      </div>

      <Button disabled={isSubmitting} type="submit" className="float-right">
        Submit
      </Button>
    </form>
  );
}

export default GroupEdit;
