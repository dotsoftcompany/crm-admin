import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { auth, db } from '@/api/firebase';
import axios from 'axios';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DatePicker } from '@/components/ui/date-picker';
import { useToast } from '@/components/ui/use-toast';
import { ToastAction } from '../ui/toast';
import PhoneNumberInput from '../ui/phone-number-input';

const AddTeacherForm = () => {
  const [dateOfBirth, setDateOfBirth] = React.useState('');
  const [dateOfJoining, setDateOfJoining] = React.useState('');

  const { toast } = useToast();

  const defaultValue = {
    email: '',
    password: '',
    fullName: '',
    phone: '',
    address: '',
    position: '',
    isTeacherUpdate: false,
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
      const url = 'http://localhost:8080/add-teacher';

      // Ensure you're including the email correctly
      const response = await axios.post(url, {
        email: `${data.email}@teacher.uz`,
        password: data.password,
        fullName: data.fullName,
        phone: data.phone,
        address: data.address,
        position: data.position,
        role: auth.currentUser?.uid,
        isTeacherUpdate: false,
      });

      if (response.status === 201) {
        reset();
        setDateOfBirth('');
        setDateOfJoining('');
        toast({
          title: "Ustoz muvaffaqiyat qo'shildi",
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        variant: 'destructive',
        title: 'Error adding teacher',
        description: error.message || 'An unexpected error occurred.',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="flex flex-col md:flex-row items-start gap-2">
        <div className="w-full">
          <Label required={true} htmlFor="fullName">
            Full Name
          </Label>
          <Input
            type="text"
            id="fullName"
            {...register('fullName', { required: 'Full name is required' })}
            placeholder="Enter full name"
          />
          <small className="text-xs md:text-sm text-red-500">
            {errors.fullName?.message}
          </small>
        </div>

        <div className="w-full">
          <Label required={true} htmlFor="position">
            Position
          </Label>
          <Input
            type="text"
            id="position"
            {...register('position', { required: 'Position is required' })}
            placeholder="Enter position"
          />
          <small className="text-xs md:text-sm text-red-500">
            {errors.position?.message}
          </small>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-start gap-2">
        <div className="w-full">
          <Label required={true} htmlFor="phone">
            Phone Number
          </Label>
          <Controller
            name="phone"
            control={control}
            defaultValue=""
            rules={{
              required: 'Phone number is required',
              minLength: { value: 10, message: 'Phone number is too short' },
            }}
            render={({ field }) => (
              <PhoneNumberInput value={field.value} onChange={field.onChange} />
            )}
          />
          <small className="text-xs md:text-sm text-red-500">
            {errors.phone?.message}
          </small>
        </div>

        <div className="w-full">
          <Label required={true} htmlFor="address">
            Address
          </Label>
          <Input
            type="text"
            id="address"
            {...register('address', { required: 'Address is required' })}
            placeholder="Enter address"
          />
          <small className="text-xs md:text-sm text-red-500">
            {errors.address?.message}
          </small>
        </div>
      </div>

      <div className="hidden flex flex-col md:flex-row items-start gap-2">
        <div className="w-full">
          <Label optional={true} htmlFor="dateOfBirth">
            Date of Birth
          </Label>
          <DatePicker
            className="w-full mt-2"
            setData={setDateOfBirth}
            data={dateOfBirth}
          />
          <small className="text-xs md:text-sm text-red-500">
            {errors.dateOfBirth?.message}
          </small>
        </div>

        <div className="w-full">
          <Label optional={true} htmlFor="dateOfJoining">
            Date of Joining
          </Label>
          <DatePicker
            className="w-full mt-2"
            setData={setDateOfJoining}
            data={dateOfJoining}
          />
          <small className="text-xs md:text-sm text-red-500">
            {errors.dateOfJoining?.message}
          </small>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-start gap-2">
        <div className="w-full">
          <Label required={true} htmlFor="email">
            Username
          </Label>

          <div className="relative">
            <Input
              className="peer pe-12"
              type="text"
              id="email"
              {...register('email', {
                required: 'Username is required',
                validate: (value) => (value ? true : 'Username is required'),
              })}
              placeholder="username"
            />
            <span className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-sm text-muted-foreground peer-disabled:opacity-50">
              @teacher.uz
            </span>
          </div>
          <small className="text-xs md:text-sm text-red-500">
            {errors.email?.message}
          </small>
        </div>

        <div className="w-full">
          <Label required={true} htmlFor="password">
            Password
          </Label>
          <Input
            type="password"
            id="password"
            {...register('password', {
              required: 'Password is required',
            })}
            placeholder="Enter password"
          />
          <small className="text-xs md:text-sm text-red-500">
            {errors.password?.message}
          </small>
        </div>
      </div>

      <Button type="submit" variant="default">
        Submit
      </Button>
    </form>
  );
};

export default AddTeacherForm;
