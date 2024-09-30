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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="container mx-auto my-4 space-y-4"
    >
      {/* Course Title */}
      <div>
        <Label htmlFor="title">Course Title</Label>
        <Input
          id="title"
          {...register('title', { required: 'Course title is required' })}
          placeholder="Course Title"
        />
        {errors.title && <p>{errors.title.message}</p>}
      </div>

      {/* Course Code */}
      <div>
        <Label htmlFor="code">Course Code</Label>
        <Input
          id="code"
          {...register('code', { required: 'Course code is required' })}
          placeholder="Course Code"
        />
        {errors.code && <p>{errors.code.message}</p>}
      </div>

      {/* Description */}
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          {...register('description', { required: 'Description is required' })}
          placeholder="Course Description"
        />
        {errors.description && <p>{errors.description.message}</p>}
      </div>

      {/* Duration */}
      <div>
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
        {errors.duration && <p>{errors.duration.message}</p>}
      </div>

      {/* Teacher */}
      <div>
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
        {errors.teacher && <p>{errors.teacher.message}</p>}
      </div>

      {/* Price */}
      <div>
        <Label htmlFor="price">Price</Label>
        <Input
          type="number"
          id="price"
          {...register('price', { required: 'Price is required', min: 0 })}
          placeholder="Price"
        />
        {errors.price && <p>{errors.price.message}</p>}
      </div>

      {/*  Certification  */}
      <div>
        <Label htmlFor="certification">Certification </Label>
        <Checkbox id="certification" {...register('certification')} />
      </div>

      {/* Submit Button */}
      <Button type="submit">Add Course</Button>
    </form>
  );
}

export default AddCourses;
