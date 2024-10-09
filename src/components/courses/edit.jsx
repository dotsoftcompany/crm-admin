import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';

import { doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '@/api/firebase';
import { formatNumber } from '@/lib/utils';
import { useMainContext } from '@/context/main-context';

function CourseEdit({ id, setCloseDialog }) {
  const { courses } = useMainContext();
  const course = courses.find((c) => c.id === id);

  const defaultValue = {
    courseTitle: course?.courseTitle,
    courseDescription: course?.courseDescription,
    courseCode: course?.courseCode,
    courseDuration: course?.courseDuration,
    coursePrice: course?.coursePrice,
    isCertification: course?.isCertification,
  };

  const [isCertification, setIsCertification] = useState(
    defaultValue.isCertification
  );

  const { toast } = useToast();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({ defaultValues: defaultValue });

  const onSubmit = async (data) => {
    try {
      const courseDocRef = doc(db, `users/${auth.currentUser.uid}/courses`, id);

      await updateDoc(courseDocRef, {
        ...data,
        coursePrice: Number(data.coursePrice),
        courseDuration: Number(data.courseDuration),
        isCertification,
      });

      toast({
        title: 'Kurs muvaffaqiyatli yangilandi',
      });

      setCloseDialog(false);

      reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col md:flex-row items-center gap-2 w-full">
        <div className="w-full">
          <Label htmlFor="courseTitle">Course Title</Label>
          <Input
            id="courseTitle"
            {...register('courseTitle', {
              required: 'Course title is required',
            })}
            placeholder="Course Title"
          />
          {errors.courseTitle && (
            <small className="text-red-500">{errors.courseTitle.message}</small>
          )}
        </div>

        <div className="w-full">
          <Label htmlFor="courseCode">Course Code</Label>
          <Input
            id="courseCode"
            {...register('courseCode', {
              required: 'Course code is required',
            })}
            placeholder="Course Code"
          />
          {errors.courseCode && (
            <small className="text-red-500">{errors.courseCode.message}</small>
          )}
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-2 w-full">
        <div className="w-full">
          <Label htmlFor="coursePrice">Price</Label>
          <Controller
            name="coursePrice"
            control={control}
            defaultValue=""
            rules={{ required: 'Price is required', min: 0 }}
            render={({ field: { onChange, value, ref } }) => (
              <Input
                type="text"
                id="coursePrice"
                value={formatNumber(value)}
                onChange={(e) => {
                  const rawValue = e.target.value.replace(/\D/g, '');
                  onChange(rawValue);
                }}
                placeholder="Price"
                ref={ref}
              />
            )}
          />
          {errors.coursePrice && (
            <small className="text-red-500">{errors.coursePrice.message}</small>
          )}
        </div>

        <div className="w-full">
          <Label htmlFor="courseDuration">Duration (month)</Label>
          <Input
            type="number"
            id="courseDuration"
            {...register('courseDuration', {
              required: 'Duration is required',
              min: 1,
            })}
            placeholder="Course Duration"
          />
          {errors.courseDuration && (
            <small className="text-red-500">
              {errors.courseDuration.message}
            </small>
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="courseDescription">Description</Label>
        <Textarea
          id="courseDescription"
          {...register('courseDescription', {
            required: 'Description is required',
          })}
          placeholder="Course Description"
        />
        {errors.courseDescription && (
          <small className="text-red-500">
            {errors.courseDescription.message}
          </small>
        )}
      </div>

      <div className="flex flex-col md:flex-row items-center gap-2 w-full">
        {/* <div className="w-full">
      <Label htmlFor="teacher">Teacher</Label>
      <Select
        id="teacher"
        {...register('teacher', { required: 'Teacher is required' })}
      >
        <SelectTrigger className="">
          <SelectValue placeholder="teacher" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="john_doe">John Doe</SelectItem>
          <SelectItem value="jane_smith">Jane Smith</SelectItem>
        </SelectContent>
      </Select>
      {errors.teacher && (
        <small className="text-red-500">{errors.teacher.message}</small>
      )}
    </div> */}
        <div className="flex items-center space-x-2">
          <Switch
            checked={isCertification}
            onCheckedChange={setIsCertification}
            id="isCertification"
          />
          <Label htmlFor="isCertification">Certification</Label>
        </div>
      </div>

      {/* Submit Button */}
      <Button
        disabled={isSubmitting}
        type="submit"
        className="mt-2 float-right"
      >
        {isSubmitting ? 'Tahrirlanmoqda' : 'Tahrirlash'}
      </Button>
    </form>
  );
}

export default CourseEdit;
