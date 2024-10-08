import * as React from 'react';
import { useForm } from 'react-hook-form';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { auth, db } from '@/api/firebase';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DatePicker } from '@/components/ui/date-picker';
import { useToast } from '@/components/ui/use-toast';
import { ToastAction } from '../ui/toast';

const AddTeacherForm = () => {
  const [dateOfBirth, setDateOfBirth] = React.useState('');
  const [dateOfJoining, setDateOfJoining] = React.useState('');

  const { toast } = useToast();

  const defaultValue = {
    fullName: '',
    position: '',
    phone: '',
    address: '',
    username: '',
    password: '',
    isTeacherUpdate: false,
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm({ defaultValues: defaultValue });

  const onSubmit = async (data) => {
    try {
      const userTeachersRef = collection(
        db,
        `users/${auth.currentUser.uid}/teachers`
      );
      const snapshot = await getDocs(userTeachersRef);
      const existingUsernames = snapshot.docs.map((doc) => doc.data().username);

      if (existingUsernames.includes(data.username)) {
        toast({
          variant: 'destructive',
          title: `"${data.username}" already taken.`,
          description: 'Please try another one.',
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
        setError('username', {
          type: 'manual',
          message: 'Username is already taken',
        });
        return;
      }

      await addDoc(userTeachersRef, {
        ...data,
        dateOfBirth: new Date(dateOfBirth).getTime(),
        dateOfJoining: new Date(dateOfJoining).getTime(),
      });

      reset();
      setDateOfBirth('');
      setDateOfJoining('');

      toast({
        title: "Ustoz muvaffaqiyat qo'shildi",
      });
    } catch (error) {
      console.log(error);
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

      <div className="flex flex-col md:flex-row items-start gap-2">
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
          <Label required={true} htmlFor="username">
            Username
          </Label>
          <Input
            type="text"
            id="username"
            {...register('username', {
              required: 'Username is required',
              validate: (value) => (value ? true : 'Username is required'),
            })}
            placeholder="Enter username"
          />
          <small className="text-xs md:text-sm text-red-500">
            {errors.username?.message}
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
