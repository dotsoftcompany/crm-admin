import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DatePicker } from '@/components/ui/date-picker';
import { useState } from 'react';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '@/api/firebase';
import { useMainContext } from '@/context/main-context';
import { useToast } from '../ui/use-toast';

const TeacherEdit = ({ id, setCloseDialog }) => {
  const { teachers } = useMainContext();
  const teacher = teachers.find((s) => s.id === id);

  const { toast } = useToast();

  const defaultValues = {
    fullName: teacher?.fullName,
    position: teacher?.position,
    phone: teacher?.phone,
    address: teacher?.address,
    dateOfBirth: teacher?.dateOfBirth,
    dateOfJoining: teacher?.dateOfJoining,
  };

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: defaultValues,
  });

  React.useEffect(() => {
    if (teacher) {
      reset(defaultValues);
    }
  }, [teacher, reset]);

  const onSubmit = React.useCallback(
    async (data) => {
      try {
        const docRef = doc(db, `users/${auth.currentUser.uid}/teachers`, id);

        await updateDoc(docRef, data);
        toast({
          title: 'Uztos muvaffaqiyatli yangilandi',
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
          <Controller
            name="dateOfBirth"
            control={control}
            rules={{ required: 'Date of birth is required' }}
            render={({ field }) => (
              <DatePicker
                data={field.value ? new Date(field.value) : null}
                setData={(date) => field.onChange(date ? date.getTime() : null)} // Convert back to timestamp
                className="w-full mt-2"
              />
            )}
          />
          {errors.dateOfBirth && (
            <p className="text-red-500">{errors.dateOfBirth.message}</p>
          )}
        </div>

        <div className="w-full">
          <Label htmlFor="dateOfJoining">Date of Joining</Label>
          <Controller
            name="dateOfJoining"
            control={control}
            rules={{ required: 'dateOfJoining is required' }}
            render={({ field }) => (
              <DatePicker
                data={field.value ? new Date(field.value) : null}
                setData={(date) => field.onChange(date ? date.getTime() : null)} // Convert back to timestamp
                className="w-full mt-2"
              />
            )}
          />
          {errors.dateOfJoining && (
            <p className="text-red-500">{errors.dateOfJoining.message}</p>
          )}
        </div>
      </div>
      <Button className="float-right" type="submit" variant="default">
        Tahrirlash
      </Button>
    </form>
  );
};

export default TeacherEdit;
