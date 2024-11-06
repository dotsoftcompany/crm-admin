import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { formatNumber } from '@/lib/utils';
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '@/api/firebase';
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

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputDatePicker from '@/components/ui/input-date-picker';
import { Button } from '@/components/ui/button';
import { I18nProvider } from 'react-aria';
import { useMainContext } from '@/context/main-context';
import { useToast } from '@/components/ui/use-toast';
import { Loader } from 'lucide-react';

function StudentPayment({ student, groups, open, setOpen }) {
  const { courses, uid } = useMainContext();
  const { toast } = useToast();

  const getDefaultValues = () => {
    const course = courses.find((c) => c.id === groups[0]?.courseId);
    return {
      name: student?.fullName || '',
      amount: course?.coursePrice || '',
      course: groups.length > 0 ? groups[0].id : '',
      method: 'cash',
      studentId: '',
    };
  };

  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: getDefaultValues() });

  useEffect(() => {
    reset(getDefaultValues());
  }, [student, groups, courses, reset]);

  const onSubmit = async (data) => {
    try {
      // 1. Add the payment record to paymentHistory collection for general record
      const userHistoryPaymentCollection = collection(
        db,
        `users/${uid}/paymentHistory`
      );
      const paymentDocRef = await addDoc(userHistoryPaymentCollection, {
        ...data,
        studentId: student?.id,
      });

      // 2. Create the payment entry for the student's payment history
      const paymentEntry = {
        name: data.name,
        amount: data.amount,
        paymentId: paymentDocRef.id,
        course: data.course,
        method: data.method,
        timestamp: data.timestamp,
      };

      // 3. Update the student's payment history array
      const studentRef = doc(db, 'students', student?.id);
      await updateDoc(studentRef, {
        paymentHistory: arrayUnion(paymentEntry),
        lastPaymentDate: new Date()
      });

      // Reset form and close modal
      reset();
      setOpen(false);
      toast({
        title: "To'lov muvaffaqiyat qo'shildi",
      });
    } catch (error) {
      console.error('Error adding payment:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-full max-w-2xl">
        <DialogHeader>
          <DialogTitle>To'lov qo'shish</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-start gap-2 w-full">
            <div>
              <Label>Ism familiya</Label>
              <Input
                type="text"
                disabled={isSubmitting}
                {...register('name', {
                  required: "Bu yerni to'ldirish talab qilinadi",
                })}
                placeholder="Alex Johnson"
              />
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
            </div>

            <Controller
              disabled={isSubmitting}
              name="timestamp"
              control={control}
              defaultValue={new Date()}
              render={({ field }) => (
                <div>
                  <Label id="timestamp">Sana</Label>
                  <I18nProvider locale="ru-RU">
                    <InputDatePicker
                      formattedDate={field.value}
                      setFormattedDate={field.onChange}
                      ariaLabelledby="timestamp"
                    />
                  </I18nProvider>
                </div>
              )}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 items-start gap-2 w-full">
            <div className="w-full">
              <Label>Narx</Label>
              <div className="relative">
                <Controller
                  disabled={isSubmitting}
                  name="amount"
                  control={control}
                  rules={{
                    required: "Bu yerni to'ldirish talab qilinadi",
                    min: 0,
                  }}
                  render={({ field: { onChange, value, ref } }) => (
                    <Input
                      type="text"
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
                <span className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-sm text-muted-foreground peer-disabled:opacity-50">
                  so'm
                </span>
                {errors.amount && (
                  <p className="text-red-500">{errors.amount.message}</p>
                )}
              </div>
            </div>

            <Controller
              disabled={isSubmitting}
              name="method"
              control={control}
              render={({ field }) => (
                <div>
                  <Label>To'lov usuli</Label>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="To'lov usuli" />
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
          </div>

          <Controller
            disabled={isSubmitting}
            name="course"
            control={control}
            render={({ field }) => (
              <div>
                <Label>Guruhni tanlang</Label>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Guruhni tanlang" />
                  </SelectTrigger>
                  <SelectContent>
                    {groups.map((group) => {
                      const courseTitle = courses.find(
                        (item) => item.id === group?.courseId
                      )?.courseTitle;
                      return (
                        <SelectItem value={group.id} key={group.id}>
                          {courseTitle} #{group.groupNumber}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                {errors.course && (
                  <p className="text-red-500">{errors.course.message}</p>
                )}
              </div>
            )}
          />

          {/* Submit Button */}
          <Button
            disabled={isSubmitting}
            className="flex items-center gap-1.5"
            type="submit"
          >
            {isSubmitting && <Loader className="w-3 h-3 animate-spin" />}
            <span>To'lov qilish</span>
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default StudentPayment;
