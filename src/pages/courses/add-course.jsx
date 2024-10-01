import React from 'react';
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

function AddCourses() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
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
            <Label htmlFor="title">Course Title</Label>
            <Input
              id="title"
              {...register('title', { required: 'Course title is required' })}
              placeholder="Course Title"
            />
            {errors.title && (
              <small className="text-red-500">{errors.title.message}</small>
            )}
          </div>

          <div className="w-full">
            <Label htmlFor="code">Course Code</Label>
            <Input
              id="code"
              {...register('code', { required: 'Course code is required' })}
              placeholder="Course Code"
            />
            {errors.code && (
              <small className="text-red-500">{errors.code.message}</small>
            )}
          </div>
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            {...register('description', {
              required: 'Description is required',
            })}
            placeholder="Course Description"
          />
          {errors.description && (
            <small className="text-red-500">{errors.description.message}</small>
          )}
        </div>

        <div className="flex flex-col md:flex-row items-center gap-2 w-full">
          <div className="w-full">
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
          </div>

          <div className="w-full">
            <Label htmlFor="duration">Duration (in hours)</Label>
            <Input
              type="number"
              id="duration"
              {...register('duration', {
                required: 'Duration is required',
                min: 1,
              })}
              placeholder="Course Duration"
            />
            {errors.duration && (
              <small className="text-red-500">{errors.duration.message}</small>
            )}
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-2 w-full">
          <div className="w-full">
            <Label htmlFor="price">Price</Label>
            <Input
              type="number"
              id="price"
              {...register('price', { required: 'Price is required', min: 0 })}
              placeholder="Price"
            />
            {errors.price && (
              <small className="text-red-500">{errors.price.message}</small>
            )}
          </div>

          <div className="flex items-center justify-between w-full">
            <Label htmlFor="certification">Certification </Label>
            <Checkbox id="certification" {...register('certification')} />
          </div>
        </div>

        {/* Submit Button */}
        <Button type="submit">Add Course</Button>
      </form>
    </div>
  );
}

export default AddCourses;
