import React, { useCallback, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';

import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';

import { doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '@/api/firebase';
import { formatNumber } from '@/lib/utils';
import { useMainContext } from '@/context/main-context';

function CourseEdit({ id, setCloseDialog }) {
  const { courses } = useMainContext();
  const course = courses.find((c) => c.id === id);

  const defaultValues = {
    courseTitle: course?.courseTitle,
    courseDescription: course?.courseDescription,
    courseCode: course?.courseCode,
    courseDuration: course?.courseDuration,
    coursePrice: course?.coursePrice,
    isCertification: course?.isCertification || false,
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

  useEffect(() => {
    reset(defaultValues);
  }, [course, reset]);

  const onSubmit = useCallback(
    async (data) => {
      try {
        const courseDocRef = doc(
          db,
          `users/${auth.currentUser.uid}/courses`,
          id
        );

        await updateDoc(courseDocRef, {
          ...data,
          coursePrice: Number(data.coursePrice),
          courseDuration: Number(data.courseDuration),
        });

        toast({
          title: 'Kurs muvaffaqiyatli yangilandi',
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
    <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col md:flex-row items-start gap-2 w-full">
        <div className="w-full">
          <Label required htmlFor="courseTitle">
            Kurs sarlavhasi
          </Label>
          <Input
            disabled={isSubmitting}
            id="courseTitle"
            {...register('courseTitle', {
              required: "Bu yerni to'ldirish talab qilinadi",
            })}
            placeholder="Frontend Development"
          />
          {errors.courseTitle && (
            <small className="text-red-500">{errors.courseTitle.message}</small>
          )}
        </div>

        <div className="w-full">
          <Label optional htmlFor="courseCode">
            Kurs kodi
          </Label>
          <Input
            disabled={isSubmitting}
            {...register('courseCode')}
            id="courseCode"
            placeholder="Course Code"
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-start gap-2 w-full">
        <div className="w-full">
          <Label required htmlFor="coursePrice">
            Kurs narxi
          </Label>
          <div className="relative">
            <Controller
              name="coursePrice"
              control={control}
              defaultValue=""
              rules={{ required: "Bu yerni to'ldirish talab qilinadi", min: 0 }}
              render={({ field: { onChange, value, ref } }) => (
                <Input
                  type="text"
                  id="coursePrice"
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
          </div>
          {errors.coursePrice && (
            <small className="text-red-500">{errors.coursePrice.message}</small>
          )}
        </div>

        <div className="w-full">
          <Label required htmlFor="courseDuration">
            Kurs davomiyligi (oyda)
          </Label>
          <Input
            disabled={isSubmitting}
            type="number"
            id="courseDuration"
            {...register('courseDuration', {
              required: "Bu yerni to'ldirish talab qilinadi",
              min: 1,
            })}
            placeholder="8"
          />
          {errors.courseDuration && (
            <small className="text-red-500">
              {errors.courseDuration.message}
            </small>
          )}
        </div>
      </div>

      <div>
        <Label optional htmlFor="courseDescription">
          Kurs tavsifi
        </Label>
        <Textarea
          id="courseDescription"
          defaultValue={defaultValues?.courseDescription}
          {...register('courseDescription')}
          placeholder="Front-end dasturchi veb-saytlar va ilovalar uchun foydalanuvchi interfeysini (UI) yaratuvchi veb-ishlab chiquvchidir."
        />
      </div>

      <div className="flex flex-col md:flex-row items-start gap-2 w-full">
        <div className="flex items-center space-x-2">
          <Controller
            name="isCertification"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Switch
                checked={value}
                onCheckedChange={onChange}
                id="isCertification"
              />
            )}
          />
          <Label htmlFor="isCertification">Sertifikati bormi?</Label>
        </div>
      </div>

      <Button
        disabled={isSubmitting}
        type="submit"
        className="mt-2 float-right"
      >
        Tahrirlash
      </Button>
    </form>
  );
}

export default CourseEdit;
