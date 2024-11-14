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
import { Eye, EyeOff } from 'lucide-react';
import { formatJSONDate } from '@/lib/utils';

const AddTeacherForm = () => {
  const [dateOfBirth, setDateOfBirth] = React.useState('');
  const [dateOfJoining, setDateOfJoining] = React.useState('');
  const [debouncedFullName, setDebouncedFullName] = React.useState('');
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible((prevState) => !prevState);

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
    watch,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({ defaultValues: defaultValue });

  const fullName = watch('fullName');
  const bornDate = watch('bornDate');

  const getYearFromDate = (date) => {
    if (!date) return '';
    return formatJSONDate(date).split('.').pop(); // Get last part of "dd.mm.yyyy"
  };

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedFullName(fullName);
    }, 300);

    return () => clearTimeout(timer);
  }, [fullName]);

  React.useEffect(() => {
    if (debouncedFullName) {
      const birthYear = getYearFromDate(bornDate);
      const username =
        debouncedFullName.replace(/\s+/g, '').toLowerCase() + birthYear;
      const password = debouncedFullName.replace(/\s+/g, '').toLowerCase();
      setValue('email', username);
      setValue('password', password);
    }
  }, [debouncedFullName, bornDate, setValue]);

  const onSubmit = async (data) => {
    try {
      const url = 'https://crm-server-omega.vercel.app/add-teacher';

      const response = await axios.post(
        url,
        {
          email: `${data.email}@teacher.uz`,
          password: data.password,
          fullName: data.fullName,
          phone: data.phone,
          address: data.address,
          position: data.position,
          role: auth.currentUser?.uid,
          isTeacherUpdate: false,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true, // Add this line
        }
      );

      if (response.status === 201) {
        reset();
        setDateOfBirth('');
        setDateOfJoining('');
        toast({
          title: "Ustoz muvaffaqiyat qo'shildi",
        });
      }
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data.error
        : 'An unexpected error occurred.';

      toast({
        variant: 'destructive',
        title: "O'qituvchi qo'shishda muammo.",
        description: errorMessage,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="flex flex-col md:flex-row items-start gap-2">
        <div className="w-full">
          <Label required={true} htmlFor="fullName">
            Ism Familiya
          </Label>
          <Input
            disabled={isSubmitting}
            type="text"
            id="fullName"
            {...register('fullName', {
              required: "Bu yerni to'ldirish talab qilinadi",
            })}
            placeholder="John Doe"
          />
          <small className="text-xs md:text-sm text-red-500">
            {errors.fullName?.message}
          </small>
        </div>

        <div className="w-full">
          <Label required={true} htmlFor="position">
            Yo'nalish
          </Label>
          <Input
            disabled={isSubmitting}
            type="text"
            id="position"
            {...register('position', {
              required: "Bu yerni to'ldirish talab qilinadi",
            })}
            placeholder="Frontend Developer"
          />
          <small className="text-xs md:text-sm text-red-500">
            {errors.position?.message}
          </small>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-start gap-2">
        <div className="w-full">
          <Label required={true} htmlFor="phone">
            Telefon raqam
          </Label>
          <Controller
            name="phone"
            control={control}
            defaultValue=""
            rules={{
              required: "Bu yerni to'ldirish talab qilinadi",
              minLength: { value: 10, message: "Yetarlicha raqam qo'shilmadi" },
            }}
            render={({ field }) => (
              <PhoneNumberInput
                id="phone"
                disabled={isSubmitting}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
          <small className="text-xs md:text-sm text-red-500">
            {errors.phone?.message}
          </small>
        </div>

        <div className="w-full">
          <Label required={true} htmlFor="address">
            Manzil
          </Label>
          <Input
            disabled={isSubmitting}
            type="text"
            id="address"
            {...register('address', {
              required: "Bu yerni to'ldirish talab qilinadi",
            })}
            placeholder="Toshkent, Yunusobod tumani"
          />
          <small className="text-xs md:text-sm text-red-500">
            {errors.address?.message}
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
              disabled={isSubmitting}
              className="peer pe-12"
              type="text"
              id="email"
              {...register('email', {
                required: "Bu yerni to'ldirish talab qilinadi",
                validate: (value) =>
                  value ? true : "Bu yerni to'ldirish talab qilinadi",
              })}
              placeholder="johndoe"
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
          <div className="relative">
            <Input
              disabled={isSubmitting}
              type={isVisible ? 'text' : 'password'}
              id="password"
              {...register('password', {
                required: "Bu yerni to'ldirish talab qilinadi",
              })}
              placeholder="**********"
            />
            <button
              className="absolute inset-y-px end-px flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 transition-shadow hover:text-foreground focus-visible:border focus-visible:border-ring focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
              type="button"
              onClick={toggleVisibility}
              aria-label={isVisible ? 'Hide password' : 'Show password'}
              aria-pressed={isVisible}
              aria-controls="password"
            >
              {isVisible ? (
                <EyeOff size={16} strokeWidth={2} aria-hidden="true" />
              ) : (
                <Eye size={16} strokeWidth={2} aria-hidden="true" />
              )}
            </button>
          </div>
          <small className="text-xs md:text-sm text-red-500">
            {errors.password?.message}
          </small>
        </div>
      </div>

      <Button disabled={isSubmitting} type="submit" variant="default">
        {!isSubmitting ? "Qo'shish" : "Qo'shilmoqda..."}
      </Button>
    </form>
  );
};

export default AddTeacherForm;
