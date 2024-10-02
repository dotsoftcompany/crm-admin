import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
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

function AddCourses() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const defaultValue = {
    courseTitle: '',
    courseDescription: '',
    courseCode: '',
    courseDuration: '',
    coursePrice: 0,
    isCertification: false,
  };
  const [data, setData] = useState(defaultValue);

  const handleChange = (e) => {
    const value = e.target.value;
    setData({ ...data, [e.target.name]: value });
  };

  const onSubmit = async () => {
    try {
      const userCourseRef = collection(
        db,
        `users/${auth.currentUser.uid}/courses`
      );

      await addDoc(userCourseRef, {
        ...data,
        coursePrice: Number(data.coursePrice),
      }).then(() => {
        setData(defaultValue);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto my-4 space-y-4">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Kurs qo'shish</h2>
        <p className="text-muted-foreground">
          Here&apos;s a list of your tasks for this month!
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col md:flex-row items-center gap-2 w-full">
          <div className="w-full">
            <Label htmlFor="courseTitle">Course Title</Label>
            <Input
              id="courseTitle"
              {...register('courseTitle', {
                required: 'Course title is required',
              })}
              placeholder="Course Title"
              name="courseTitle"
              value={data.courseTitle}
              onChange={handleChange}
            />
            {errors.title && (
              <small className="text-red-500">{errors.title.message}</small>
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
              name="courseCode"
              value={data.courseCode}
              onChange={handleChange}
            />
            {errors.code && (
              <small className="text-red-500">{errors.code.message}</small>
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
            name="courseDescription"
            value={data.courseDescription}
            onChange={handleChange}
          />
          {errors.description && (
            <small className="text-red-500">{errors.description.message}</small>
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

          <div className="w-full">
            <Label htmlFor="courseDuration">Duration (in hours)</Label>
            <Input
              type="number"
              id="courseDuration"
              {...register('courseDuration', {
                required: 'Duration is required',
                min: 1,
              })}
              placeholder="Course Duration"
              name="courseDuration"
              value={data.courseDuration}
              onChange={handleChange}
            />
            {errors.duration && (
              <small className="text-red-500">{errors.duration.message}</small>
            )}
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-2 w-full">
          <div className="w-full">
            <Label htmlFor="coursePrice">Price</Label>
            <Input
              type="number"
              id="coursePrice"
              {...register('coursePrice', {
                required: 'Price is required',
                min: 0,
              })}
              placeholder="Price"
              name="coursePrice"
              value={data.coursePrice}
              onChange={handleChange}
            />
            {errors.price && (
              <small className="text-red-500">{errors.price.message}</small>
            )}
          </div>

          <div className="flex items-center justify-between w-full">
            <Label htmlFor="isCertification">Certification </Label>
            <Checkbox
              id="isCertification"
              {...register('isCertification')}
              checked={data.isCertification}
              onClick={() =>
                setData({
                  ...data,
                  isCertification: data.isCertification ? false : true,
                })
              }
            />
          </div>
        </div>

        {/* Submit Button */}
        <Button type="submit" className="mt-2">
          Add Course
        </Button>
      </form>
    </div>
  );
}

export default AddCourses;
