import React, { useEffect } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Loader } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useMainContext } from '@/context/main-context';

import { useForm, Controller } from 'react-hook-form';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/api/firebase';
import { formatNumber } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

function EditPayment({ paymentId, setOpen }) {
  const { toast } = useToast();
  
  const { uid, paymentHistory, groups, courses, students } = useMainContext();
  const payment = paymentHistory.find((p) => p.id === paymentId);
  const student = students.find((s) => s.id === payment?.studentId);

  const getDefaultValues = () => {
    if (!payment) return {};
    return {
      name: payment.name || '',
      amount: payment.amount || '',
      course: payment.course || '',
      method: payment.method || 'cash',
      timestamp: payment.timestamp ? payment.timestamp.toDate() : new Date(),
    };
  };

  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: getDefaultValues(),
  });

  useEffect(() => {
    if (payment) {
      reset(getDefaultValues());
    }
  }, [payment, reset]);

  const onSubmit = async (data) => {
    try {
      const paymentDocRef = doc(db, `users/${uid}/paymentHistory`, paymentId);
      await updateDoc(paymentDocRef, {
        ...data,
        timestamp: data.timestamp,
      });

      const studentRef = doc(db, 'students', payment?.studentId);
      await updateDoc(studentRef, {
        paymentHistory: student.paymentHistory.map((entry) =>
          entry.paymentId === paymentId ? { ...entry, ...data } : entry
        ),
      });

      reset();
      setOpen(false);
      toast({
        title: "To'lov muvaffaqiyatli yangilandi",
      });
    } catch (error) {
      console.error('Error updating payment:', error);
    }
  };

  return (
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
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>

        <div className="flex flex-col space-y-1 mt-1">
          <Label id="timestamp">Sana</Label>
          <Controller
            disabled={isSubmitting}
            name="timestamp"
            control={control}
            render={({ field }) => (
              <ReactDatePicker
                selected={field.value}
                onChange={(date) => field.onChange(date)}
                dateFormat="dd.MM.yyyy"
                className="w-full py-2 px-3 border rounded-md bg-background"
              />
            )}
          />
        </div>
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
              uzs
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
                  <SelectItem value="bank_transfer">Bank o'tkazmasi</SelectItem>
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
            <Label>Kursni tanlang</Label>
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
                      {courseTitle}
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
        <span>Yangilash</span>
      </Button>
    </form>
  );
}

export default EditPayment;
