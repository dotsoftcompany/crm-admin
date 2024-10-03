import * as React from 'react';
import { useForm, Controller } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { formatPhoneNumber } from '@/lib/utils';

const AddStudentForm = () => {
  const defaultValues = {
    fullName: '',
    parentPhoneNumber: '',
    phoneNumber: '',
    address: '',
    isPaid: false,
  };
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
      <div className="flex flex-col md:flex-row items-center gap-2">
        <div className="w-full">
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            type="text"
            id="fullName"
            {...register('fullName', { required: 'Full name is required' })}
            placeholder="Enter full name"
          />
          {errors.fullName && (
            <p className="text-red-500">{errors.fullName.message}</p>
          )}
        </div>

        <div className="w-full">
          <Label htmlFor="parentPhoneNumber">Parent number</Label>
          <Input
            type="text"
            id="parentPhoneNumber"
            {...register('parentPhoneNumber', {
              required: 'Phone number is required',
              pattern: {
                value: /^[0-9+()-\s]+$/,
                message: 'Invalid phone number format',
              },
            })}
            placeholder="+1 234 567 8901"
          />
          {errors.parentPhoneNumber && (
            <p className="text-red-500">{errors.parentPhoneNumber.message}</p>
          )}
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-2">
        <div className="w-full">
          <Label htmlFor="phoneNumber">Phone Number</Label>
          <Input
            type="text"
            id="phoneNumber"
            {...register('phoneNumber', {
              required: 'Phone number is required',
              pattern: {
                value: /^[0-9+()-\s]+$/,
                message: 'Invalid phone number format',
              },
            })}
            placeholder="+1 234 567 8901"
          />
          {errors.phoneNumber && (
            <p className="text-red-500">{errors.phoneNumber.message}</p>
          )}
        </div>

        <div className="w-full">
          <Label htmlFor="address">Address</Label>
          <Input
            type="text"
            id="address"
            {...register('address', { required: 'Address is required' })}
            placeholder="Enter address"
          />
          {errors.address && (
            <p className="text-red-500">{errors.address.message}</p>
          )}
        </div>
      </div>

      <Button type="submit" variant="default">
        Submit
      </Button>
    </form>
  );
};

export default AddStudentForm;
