import * as React from 'react';
import { useForm, Controller } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DatePicker } from '@/components/ui/date-picker';
import { formatPhoneNumber } from '@/lib/utils';

const AddTeacherForm = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
          <Label htmlFor="position">Position</Label>
          <Input
            type="text"
            id="position"
            {...register('position', { required: 'Position is required' })}
            placeholder="Enter position"
          />
          {errors.position && (
            <p className="text-red-500">{errors.position.message}</p>
          )}
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-2">
        <div className="w-full">
          <Label htmlFor="phoneNumber">Phone Number</Label>
          <Controller
            name="phoneNumber"
            control={control}
            defaultValue=""
            rules={{
              required: 'Phone number is required',
              pattern: {
                value: /^[0-9+()-\s]+$/,
                message: 'Invalid phone number format',
              },
            }}
            render={({ field: { onChange, value, ref } }) => (
              <Input
                type="text"
                id="phoneNumber"
                value={formatPhoneNumber(value)}
                onChange={(e) => {
                  const formattedValue = formatPhoneNumber(e.target.value);
                  onChange(formattedValue);
                }}
                placeholder="+1 234 567 8901"
                ref={ref}
              />
            )}
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

      <div className="flex flex-col md:flex-row items-center gap-2">
        <div className="w-full">
          <Label htmlFor="dateOfBirth">Date of Birth</Label>
          <DatePicker className="w-full mt-2" />
          {errors.dateOfBirth && (
            <p className="text-red-500">{errors.dateOfBirth.message}</p>
          )}
        </div>

        <div className="w-full">
          <Label htmlFor="dateOfJoining">Date of Joining</Label>
          <DatePicker className="w-full mt-2" />
          {errors.dateOfJoining && (
            <p className="text-red-500">{errors.dateOfJoining.message}</p>
          )}
        </div>
      </div>

      <Button type="submit" variant="default">
        Submit
      </Button>
    </form>
  );
};

export default AddTeacherForm;
