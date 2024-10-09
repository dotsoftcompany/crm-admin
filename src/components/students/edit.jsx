import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '@/api/firebase';
import { Checkbox } from '../ui/checkbox';
import { useMainContext } from '@/context/main-context';
import { useToast } from '../ui/use-toast';

const StudentEdit = ({ id, setCloseDialog }) => {
  const { students } = useMainContext();
  const student = students.find((s) => s.id === id);

  const defaultValues = {
    fullName: student?.fullName,
    parentPhoneNumber: student?.parentPhoneNumber,
    phoneNumber: student?.phoneNumber,
    address: student?.address,
    isPaid: student?.isPaid,
  };

  const { toast } = useToast();

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
    reset(defaultValues);
  }, [student, reset]);

  const onSubmit = React.useCallback(
    async (data) => {
      try {
        const docRef = doc(db, `users/${auth.currentUser.uid}/students`, id);

        await updateDoc(docRef, data);

        toast({
          title: 'Talaba muvaffaqiyatli yangilandi',
        });

        setCloseDialog(false);

        reset();
      } catch (error) {
        toast({
          title: 'Xatolik yuz berdi',
          description: error.message,
          variant: 'destructive',
        });
      }
    },
    [id]
  );

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

      <div className="flex items-center space-x-2 p-2 border border-border rounded-md">
        <Controller
          name="isPaid"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Checkbox checked={value} onCheckedChange={onChange} id="isPaid" />
          )}
        />
        <Label
          htmlFor="isPaid"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          To'lov qilindi
        </Label>
      </div>

      <Button disabled={isSubmitting} type="submit" className="float-right">
        Tahrirlash
      </Button>
    </form>
  );
};

export default StudentEdit;
