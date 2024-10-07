import * as React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DatePicker } from '@/components/ui/date-picker';
import { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '@/api/firebase';

const AddTeacherForm = () => {
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [dateOfJoining, setDateOfJoining] = useState('');

  const defaultValue = {
    fullName: '',
    position: '',
    phone: '',
    address: '',
    username: '',
    password: '',
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ defaultValues: defaultValue });

  const onSubmit = async (data) => {
    try {
      const userTeachersRef = collection(
        db,
        `users/${auth.currentUser.uid}/teachers`
      );

      await addDoc(userTeachersRef, {
        ...data,
        dateOfBirth: new Date(dateOfBirth).getTime(),
        dateOfJoining: new Date(dateOfJoining).getTime(),
      }).then(() => {
        reset();
        setDateOfBirth('');
        setDateOfJoining('');
      });
    } catch (error) {
      console.log(error);
    }
  };

  const existingUsernames = ['johnDoe', 'janeDoe']; // just example

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            type="text"
            id="phone"
            {...register('phone', {
              required: 'Phone number is required',
              pattern: {
                value: /^[0-9+()-\s]+$/,
                message: 'Invalid phone number format',
              },
            })}
            placeholder="+1 234 567 8901"
          />
          {errors.phoneNumber && (
            <p className="text-red-500">{errors.phone.message}</p>
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

      {/* https://github.com/shadcn-ui/ui/discussions/1553 */}
      <div className="flex flex-col md:flex-row items-center gap-2">
        <div className="w-full">
          <Label htmlFor="dateOfBirth">Date of Birth</Label>
          <DatePicker
            className="w-full mt-2"
            setData={setDateOfBirth}
            data={dateOfBirth}
          />
          {errors.dateOfBirth && (
            <p className="text-red-500">{errors.dateOfBirth.message}</p>
          )}
        </div>

        <div className="w-full">
          <Label htmlFor="dateOfJoining">Date of Joining</Label>
          <DatePicker
            className="w-full mt-2"
            setData={setDateOfJoining}
            data={dateOfJoining}
          />
          {errors.dateOfJoining && (
            <p className="text-red-500">{errors.dateOfJoining.message}</p>
          )}
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-2">
        <div className="w-full">
          <Label htmlFor="username">Username</Label>
          <Input
            type="text"
            id="username"
            {...register('username', {
              required: 'Username is required',
              validate: (value) =>
                existingUsernames.includes(value)
                  ? 'Username is already taken'
                  : true,
            })}
            placeholder="Enter username"
          />
          {errors.username && (
            <p className="text-red-500">{errors.username.message}</p>
          )}
        </div>

        <div className="w-full">
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id="password"
            {...register('password', {
              required: 'Password is required',
            })}
            placeholder="Enter password"
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
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
