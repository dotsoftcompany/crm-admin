import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { Input } from '../ui/input';
import { Label } from '../ui/label';
import InputDatePicker from '../ui/input-date-picker';
import { Button } from '../ui/button';
import { I18nProvider } from 'react-aria';
import { useMainContext } from '@/context/main-context';
import { formatNumber } from '@/lib/utils';
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '@/api/firebase';
import { useToast } from '../ui/use-toast';

function StudentPayment({ student, groups, open, setOpen }) {
  const { courses } = useMainContext();
  const { toast } = useToast();
  const course = courses.find((c) => c.id === groups[0]?.courseId);
  const [date, setDate] = useState();
  const [defaultValues, setDefaultValues] = useState({
    name: student?.fullName,
    amount: course?.coursePrice,
    course: '',
    method: 'cash',
  });

  useEffect(() => {
    if (student) {
      setDefaultValues({
        name: student?.fullName,
        amount: course?.coursePrice || '',
        course:
          courses.filter((item) => item.id === groups[0]?.courseId)[0]?.id ||
          '',
        method: 'cash',
      });
    }
  }, [student, groups, courses]);

  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues });

  const onSubmit = async (data) => {
    try {
      const userGroupsRef = collection(
        db,
        `users/${auth.currentUser.uid}/payments`
      );

      await addDoc(userGroupsRef, data).then(() => {
        reset();
        setOpen(false);
        toast({
          title: "Payment muvaffaqiyat qo'shildi",
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  console.log(groups);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-full max-w-2xl">
        <DialogHeader>
          <DialogTitle>To'lov qo'shish</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-2 w-full">
            <div className="w-full">
              <Label>Ism familiya</Label>
              <Input
                className="w-full"
                disabled={isSubmitting}
                type="text"
                id="name"
                {...register('name', {
                  required: "Bu yerni to'ldirish talab qilinadi",
                })}
                placeholder="Alex Johnson"
              />
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
            </div>

            {/* Timestamp Field */}
            <Controller
              name="timestamp"
              control={control}
              defaultValue={new Date()}
              render={({ field }) => (
                <div>
                  <Label>Sana</Label>
                  <I18nProvider locale="ru-RU">
                    <InputDatePicker
                      formattedDate={date}
                      setFormattedDate={setDate}
                    />
                  </I18nProvider>
                </div>
              )}
            />
          </div>

          <div className="w-full">
            <Label>Narx</Label>
            <Controller
              name="amount"
              control={control}
              defaultValue=""
              rules={{
                required: "Bu yerni to'ldirish talab qilinadi",
                min: 0,
              }}
              render={({ field: { onChange, value, ref } }) => (
                <Input
                  type="text"
                  id="amount"
                  className="pe-12"
                  value={formatNumber(value)}
                  onChange={(e) => {
                    const rawValue = e.target.value.replace(/\D/g, '');
                    onChange(rawValue);
                  }}
                  placeholder="500 000"
                  ref={ref}
                />
              )}
            />
            {errors.amount && (
              <p className="text-red-500">{errors.amount.message}</p>
            )}
          </div>

          {/* Payment Method Field */}
          <Controller
            name="method"
            control={control}
            render={({ field }) => (
              <div>
                <Label>To'lov usuli</Label>
                <Select
                  onValueChange={(value) => field.onChange(value)}
                  value={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Payment Method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cash">Naqd</SelectItem>
                    <SelectItem value="credit_card">Kredit karta</SelectItem>
                    <SelectItem value="bank_transfer">
                      Bank o'tkazmasi
                    </SelectItem>
                  </SelectContent>
                </Select>
                {errors.method && (
                  <p className="text-red-500">{errors.method.message}</p>
                )}
              </div>
            )}
          />

          <Controller
            name="course"
            control={control}
            defaultValue={
              courses.filter((item) => item.id === groups[0]?.courseId)[0]?.id
            }
            render={({ field }) => (
              <div>
                <Label>Course</Label>
                <Select
                  onValueChange={(value) => field.onChange(value)}
                  value={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Payment course" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={course.id}>
                      {
                        courses.filter(
                          (item) => item.id === groups[0]?.courseId
                        )[0]?.courseTitle
                      }
                      #{groups[0].groupNumber}
                    </SelectItem>
                  </SelectContent>
                </Select>
                {errors.course && (
                  <p className="text-red-500">{errors.course.message}</p>
                )}
              </div>
            )}
          />

          {/* Submit Button */}
          <Button type="submit">Submit Payment</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default StudentPayment;
