import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

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
import { Textarea } from '@/components/ui/textarea';

import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '@/api/firebase';
import { formatNumber } from '@/lib/utils';
import BreadcrumbComponent from '@/components/breadcrumb';
import { useToast } from '@/components/ui/use-toast';

function AddCourses() {
  const [isCertification, setIsCertification] = useState(false);

  const defaultValue = {
    courseTitle: '',
    courseDescription: '',
    courseCode: '',
    courseDuration: '',
    coursePrice: '',
    isCertification: false,
  };
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({ defaultValues: defaultValue });

  const { toast } = useToast();

  const onSubmit = async (data) => {
    try {
      const userCourseRef = collection(
        db,
        `users/${auth.currentUser.uid}/courses`
      );

      await addDoc(userCourseRef, {
        ...data,
        coursePrice: Number(data.coursePrice),
        courseDuration: Number(data.courseDuration),
        isCertification,
      }).then(() => {
        reset();
        toast({
          title: "Kurs muvaffaqiyat qo'shildi",
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="px-4 lg:px-8 mx-auto my-4 space-y-4">
      <BreadcrumbComponent title="Kurs qo'shish" />

      <div>
        <h2 className="text-2xl font-bold tracking-tight">Kurs qo'shish</h2>
        <p className="text-muted-foreground">
          Here&apos;s a list of your tasks for this month!
        </p>
      </div>
      <div className="xl:flex">
        <div className="xl:w-1/2">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col md:flex-row items-center gap-2 mb-2 w-full">
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
                  <small className="text-red-500">
                    {errors.courseTitle.message}
                  </small>
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
                  <small className="text-red-500">
                    {errors.courseCode.message}
                  </small>
                )}
              </div>
            </div>

            <div className="mb-2">
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

            <div className="flex flex-col md:flex-row items-center gap-2 mb-2 w-full">
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
                  <small className="text-red-500">
                    {errors.coursePrice.message}
                  </small>
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

            <div className="flex items-center gap-2 border p-[10px] rounded-md">
              <Checkbox
                id="isCertification"
                checked={isCertification}
                onCheckedChange={setIsCertification}
                {...register('isCertification')}
              />
              <Label htmlFor="isCertification">Certification</Label>
            </div>
            {/* Submit Button */}
            <Button disabled={isSubmitting} type="submit" className="mt-2">
              {isSubmitting ? "Kurs qo'shilmoqda" : "Kurs qo'shish"}
            </Button>
          </form>
        </div>
        <div className="xl:w-1/2 h-[calc(100vh-160px)] xl:flex hidden items-center">
          <h1 className="text-9xl font-bold text-border -translate-y-24 -rotate-90">
            ADD COOURSE
          </h1>
        </div>
      </div>
    </div>
  );
}

export default AddCourses;
