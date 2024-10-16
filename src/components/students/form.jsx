import * as React from 'react';
import { useForm } from 'react-hook-form';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { auth, db } from '@/api/firebase';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { ToastAction } from '../ui/toast';

const AddStudentForm = () => {
  const defaultValues = {
    fullName: '',
    parentPhoneNumber: '',
    phoneNumber: '',
    address: '',
    isPaid: false,
    username: '',
    password: '',
    isStudentUpdate: false,
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm({
    defaultValues: defaultValues,
  });

  const [existingUsernames, setExistingUsernames] = React.useState([]);
  const { toast } = useToast();

  React.useEffect(() => {
    const fetchUsernames = async () => {
      try {
        const userStudentsRef = collection(
          db,
          `users/${auth.currentUser.uid}/students`
        );
        const querySnapshot = await getDocs(userStudentsRef);
        const usernames = querySnapshot.docs.map((doc) => doc.data().username);
        setExistingUsernames(usernames);
      } catch (error) {
        console.error('Error fetching usernames:', error);
      }
    };

    fetchUsernames();
  }, []);

  const onSubmit = async (data) => {
    try {
      const userStudentsRef = collection(
        db,
        `users/${auth.currentUser.uid}/students`
      );

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

      await addDoc(userStudentsRef, {
        ...data,
        timestamp: new Date().getTime(),
      });
      reset();

      toast({
        title: "O'quvchi muvaffaqiyat qo'shildi",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
      <div className="flex flex-col md:flex-row items-start gap-2">
        <div className="w-full">
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            type="text"
            id="fullName"
            {...register('fullName', { required: 'Full name is required' })}
            placeholder="Enter full name"
          />
          <p className="text-xs md:text-sm text-red-500">
            {errors.fullName?.message}
          </p>
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
          <p className="text-xs md:text-sm text-red-500">
            {errors.parentPhoneNumber?.message}
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-start gap-2">
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
          <p className="text-xs md:text-sm text-red-500">
            {errors.phoneNumber?.message}
          </p>
        </div>

        <div className="w-full">
          <Label htmlFor="address">Address</Label>
          <Input
            type="text"
            id="address"
            {...register('address', { required: 'Address is required' })}
            placeholder="Enter address"
          />
          <p className="text-xs md:text-sm text-red-500">
            {errors.address?.message}
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-start gap-2">
        <div className="w-full">
          <Label htmlFor="username">Username</Label>
          <Input
            type="text"
            id="username"
            {...register('username', {
              required: 'Username is required',
            })}
            placeholder="Enter username"
          />
          <p className="text-xs md:text-sm text-red-500">
            {errors.username?.message}
          </p>
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
          <p className="text-xs md:text-sm text-red-500">
            {errors.password?.message}
          </p>
        </div>
      </div>

      <Button type="submit" variant="default">
        Submit
      </Button>
    </form>
  );
};

export default AddStudentForm;
