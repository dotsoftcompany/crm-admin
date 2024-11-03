import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { auth, db } from '@/api/firebase';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { ToastAction } from '../ui/toast';
import PhoneNumberInput from '../ui/phone-number-input';
import { I18nProvider } from 'react-aria';
import DateTime from '../ui/date-time';
import { Eye, EyeOff, Info } from 'lucide-react';
import { formatJSONDate } from '@/lib/utils';
import axios from 'axios';

const AddStudentForm = () => {
  const { toast } = useToast();
  const [isVisible, setIsVisible] = React.useState(false);
  const [existingUsernames, setExistingUsernames] = React.useState([]);
  const [debouncedFullName, setDebouncedFullName] = React.useState('');
  const toggleVisibility = () => setIsVisible((prevState) => !prevState);

  const defaultValues = {
    fullName: '',
    username: '',
    password: '',
    address: '',
    phoneNumber: '',
    parentPhoneNumber: '',
    telegram: '',
    bornDate: '',
    passportId: '',
    isPaid: false,
    isStudentUpdate: false,
  };

  const {
    control,
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = useForm({
    defaultValues: defaultValues,
  });

  const fullName = watch('fullName');
  const bornDate = watch('bornDate');

  const getYearFromDate = (date) => {
    if (!date) return '';
    return formatJSONDate(date).split('.').pop(); // Get last part of "dd.mm.yyyy"
  };

  const generatePassword = (name, year) => {
    const specialChars = ['&', '%', '$', '#', '@'];
    const randomSpecialChar =
      specialChars[Math.floor(Math.random() * specialChars.length)];

    const password =
      name.replace(/\s+/g, '').toLowerCase() + randomSpecialChar + year;
    return password;
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
      const password = generatePassword(debouncedFullName, birthYear);
      setValue('username', username);
      setValue('password', password);
    }
  }, [debouncedFullName, bornDate, setValue]);

  React.useEffect(() => {
    const fetchUsernames = async () => {
      try {
        const userStudentsRef = collection(db, ':students');
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
      const url = 'https://osiyo-akt-server.vercel.app/add-student';

      const response = await axios.post(url, {
        email: `${data.username}@student.uz`,
        password: data.password,
        fullName: data.fullName,
        phoneNumber: data.phoneNumber,
        parentPhoneNumber: data.parentPhoneNumber,
        address: data.address,
        bornDate: formatJSONDate(data.bornDate),
        passportId: data.passportId,
        telegram: data.telegram,
        adminId: auth.currentUser?.uid,
        isPaid: data.isPaid,
        isStudentUpdate: data.isStudentUpdate,
      });

      if (response.status === 201) {
        reset();
        toast({
          title: 'Student successfully added',
        });
      }
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data.error
        : 'An unexpected error occurred.';

      toast({
        variant: 'destructive',
        title: "O'quvchi qo'shishda muammo.",
        description: errorMessage,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
      <div className="flex flex-col md:flex-row items-start gap-2">
        <div className="w-full">
          <Label required htmlFor="fullName">
            Ism Familiya
          </Label>
          <Input
            disabled={isSubmitting}
            type="text"
            id="fullName"
            {...register('fullName', {
              required: "Bu yerni to'ldirish talab qilinadi",
            })}
            placeholder="Alex Johnson"
          />
          <p className="text-xs md:text-sm text-red-500">
            {errors.fullName?.message}
          </p>
        </div>

        <div className="w-full">
          <Label required htmlFor="address">
            Manzil
          </Label>
          <Input
            disabled={isSubmitting}
            type="text"
            id="address"
            {...register('address', {
              required: "Bu yerni to'ldirish talab qilinadi",
            })}
            placeholder="Toshkent, Yakkasaroy tumani"
          />
          <p className="text-xs md:text-sm text-red-500">
            {errors.address?.message}
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-start gap-2">
        <div className="w-full">
          <Label required htmlFor="phoneNumber">
            Telefon raqam
          </Label>
          <Controller
            name="phoneNumber"
            control={control}
            defaultValue=""
            rules={{
              required: "Bu yerni to'ldirish talab qilinadi",
              minLength: { value: 10, message: "Yetarlicha raqam qo'shilmadi" },
            }}
            render={({ field }) => (
              <PhoneNumberInput
                id="phoneNumber"
                disabled={isSubmitting}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
          <p className="text-xs md:text-sm text-red-500">
            {errors.phoneNumber?.message}
          </p>
        </div>

        <div className="w-full">
          <Label required htmlFor="parentPhoneNumber">
            Ota-onasi telefon raqami
          </Label>
          <Controller
            name="parentPhoneNumber"
            control={control}
            defaultValue=""
            rules={{
              required: "Bu yerni to'ldirish talab qilinadi",
              minLength: { value: 10, message: "Yetarlicha raqam qo'shilmadi" },
            }}
            render={({ field }) => (
              <PhoneNumberInput
                id="parentPhoneNumber"
                disabled={isSubmitting}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
          <p className="text-xs md:text-sm text-red-500">
            {errors.parentPhoneNumber?.message}
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-start gap-2">
        <div className="w-full space-y-1.5 mt-1">
          <Label id="bornDate" className="flex items-center" htmlFor="bornDate">
            Tug'ulgan sana
            <span title="Talab etiladi!" className="text-red-500 ml-1">
              *
            </span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="w-3 h-3 ml-2 cursor-pointer" />
                </TooltipTrigger>
                <TooltipContent>
                  <small className="leading !text-center">
                    Faqat 10 yosh va undan yuqori <br /> o'quchilar qo'shish
                    mumkin.
                  </small>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Label>
          <Controller
            name="bornDate"
            control={control}
            defaultValue=""
            rules={{
              required: "Bu yerni to'ldirish talab qilinadi",
              minLength: { value: 10, message: "Yetarlicha raqam qo'shilmadi" },
            }}
            render={({ field }) => (
              <I18nProvider locale="ru-RU">
                <DateTime
                  disabled={isSubmitting}
                  label="Date"
                  value={field.value}
                  onChange={field.onChange}
                  ariaLabelledby="bornDate"
                />
              </I18nProvider>
            )}
          />

          <p className="text-xs md:text-sm text-red-500">
            {errors.bornDate?.message}
          </p>
        </div>

        <div className="w-full">
          <Label required htmlFor="passportId">
            Passport raqam
          </Label>
          <Input
            disabled={isSubmitting}
            type="text"
            id="passportId"
            className="uppercase"
            {...register('passportId', {
              required: "Bu yerni to'ldirish talab qilinadi",
              minLength: { value: 9, message: "Yetarlicha raqam qo'shilmadi" },
            })}
            maxLength={9}
            placeholder="AB1234567"
          />
          <p className="text-xs md:text-sm text-red-500">
            {errors.passportId?.message}
          </p>
        </div>
      </div>

      <div className="w-full">
        <Label optional>Telegram</Label>
        <div className="relative">
          <Input
            disabled={isSubmitting}
            type="text"
            id="telegram"
            className="pl-7 w-full"
            {...register('telegram')}
            placeholder="alexjohnson"
          />
          <span className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-sm text-muted-foreground peer-disabled:opacity-50">
            @
          </span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-start gap-2">
        <div className="w-full">
          <Label required htmlFor="username">
            Username
          </Label>
          <div className="relative">
            <Input
              disabled={isSubmitting}
              className="peer pe-12"
              type="text"
              id="username"
              {...register('username', {
                required: "Bu yerni to'ldirish talab qilinadi",
                validate: (value) =>
                  value ? true : "Bu yerni to'ldirish talab qilinadi",
              })}
              placeholder="alexjohnson"
              // readOnly
            />
            <span className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-sm text-muted-foreground peer-disabled:opacity-50">
              @student.uz
            </span>
          </div>
          <p className="text-xs md:text-sm text-red-500">
            {errors.username?.message}
          </p>
        </div>

        <div className="w-full">
          <Label required htmlFor="password">
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
              ariaLabel={isVisible ? 'Hide password' : 'Show password'}
              ariaPressed={isVisible}
              ariaControls="password"
            >
              {isVisible ? (
                <EyeOff size={16} strokeWidth={2} aria-hidden="true" />
              ) : (
                <Eye size={16} strokeWidth={2} aria-hidden="true" />
              )}
            </button>
          </div>
          <p className="text-xs md:text-sm text-red-500">
            {errors.password?.message}
          </p>
        </div>
      </div>

      <Button disabled={isSubmitting} type="submit" variant="default">
        {!isSubmitting ? "Qo'shish" : "Qo'shilmoqda..."}
      </Button>
    </form>
  );
};

export default AddStudentForm;
