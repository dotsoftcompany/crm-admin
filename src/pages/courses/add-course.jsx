import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '@/api/firebase';
import { formatNumber } from '@/lib/utils';
import BreadcrumbComponent from '@/components/breadcrumb';
import { useToast } from '@/components/ui/use-toast';
import { Hash } from 'lucide-react';
import { useCharacterLimit } from '@/hooks/useCharacterLimit';

function AddCourses() {
  const [isCertification, setIsCertification] = useState(false);
  const maxLength = 250;
  const {
    value,
    characterCount,
    handleChange,
    maxLength: limit,
  } = useCharacterLimit({ maxLength });

  const defaultValue = {
    courseTitle: '',
    courseDescription: '',
    courseCode: '',
    courseDuration: '',
    coursePrice: '',
    isCertification: false,
  };
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({ defaultValues: defaultValue });

  const { toast } = useToast();

  const onSubmit = async (data) => {
    try {
      const userCourseRef = collection(
        db,
        `users/${auth.currentUser.uid}/courses`
      );

      await addDoc(userCourseRef, {
        ...data,
        coursePrice: Number(data.coursePrice),
        courseDuration: Number(data.courseDuration),
        isCertification,
        timestamp: new Date().getTime(),
      }).then(() => {
        reset();
        toast({
          title: "Kurs muvaffaqiyat qo'shildi",
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="px-4 lg:px-8 mx-auto my-4 space-y-4">
      <BreadcrumbComponent title="Kurs qo'shish" />

      <div>
        <h2 className="text-2xl font-bold tracking-tight">
          Yangi kurs qo'shish
        </h2>
        <p className="text-muted-foreground">
          Tizimga yangi kurs qoʻshish uchun quyidagi shaklni toʻldiring.
        </p>
      </div>
      <div className="xl:flex">
        <div className="xl:w-2/3">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col md:flex-row items-start gap-2 mb-2 w-full">
              <div className="w-full">
                <Label required htmlFor="courseTitle">
                  Kurs sarlavhasi
                </Label>
                <Input
                  id="courseTitle"
                  {...register('courseTitle', {
                    required: "Bu yerni to'ldirish talab qilinadi",
                  })}
                  placeholder="Frontend Development"
                />
                {errors.courseTitle && (
                  <small className="text-red-500">
                    {errors.courseTitle.message}
                  </small>
                )}
              </div>

              <div className="w-full">
                <Label optional htmlFor="courseCode">
                  Kurs kodi
                </Label>
                <div className="relative">
                  <Input
                    className="pl-7"
                    id="courseCode"
                    {...register('courseCode')}
                    placeholder="899"
                  />
                  <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
                    <Hash size={16} strokeWidth={2} aria-hidden="true" />
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-2">
              <Label optional htmlFor="courseDescription">
                Kurs tavsifi
              </Label>
              <div className="relative">
                <Controller
                  name="courseDescription"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      maxLength={limit}
                      onChange={(e) => {
                        handleChange(e);
                        field.onChange(e);
                      }}
                      aria-describedby="character-count"
                      placeholder="Front-end dasturchi veb-saytlar va ilovalar uchun foydalanuvchi interfeysini (UI) yaratuvchi veb-ishlab chiquvchidir."
                    />
                  )}
                />

                <div
                  id="character-count"
                  className={`pointer-events-none absolute bottom-2 right-2 end-0 flex items-center justify-center pe-3 text-xs text-muted-foreground peer-disabled:opacity-50 ${
                    characterCount === limit && 'text-red-500'
                  }`}
                  aria-live="polite"
                  role="status"
                >
                  {characterCount}/{limit}
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-start gap-2 mb-2 w-full">
              <div className="w-full">
                <Label required htmlFor="coursePrice">
                  Kurs narxi
                </Label>
                <div className="relative">
                  <Controller
                    name="coursePrice"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: "Bu yerni to'ldirish talab qilinadi",
                      min: 0,
                    }}
                    render={({ field: { onChange, value, ref } }) => (
                      <Input
                        type="text"
                        id="coursePrice"
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
                  <span className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-sm text-muted-foreground peer-disabled:opacity-50">
                    uzs
                  </span>
                </div>
                {errors.coursePrice && (
                  <small className="text-red-500">
                    {errors.coursePrice.message}
                  </small>
                )}
              </div>

              <div className="w-full">
                <Label required htmlFor="courseDuration">
                  Kurs davomiyligi (oyda)
                </Label>
                <Input
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

            <div className="flex items-center gap-2 border p-[10px] rounded-md">
              <Checkbox
                id="isCertification"
                checked={isCertification}
                onCheckedChange={setIsCertification}
                {...register('isCertification')}
              />
              <Label htmlFor="isCertification">Sertifikati bormi?</Label>
            </div>
            {/* Submit Button */}
            <Button disabled={isSubmitting} type="submit" className="mt-2">
              {isSubmitting ? "Kurs qo'shilmoqda" : "Kurs qo'shish"}
            </Button>
          </form>
        </div>
        <div className="xl:w-1/2 h-[calc(100vh-160px)] xl:flex hidden items-center">
          <h1 className="text-9xl font-bold text-border -translate-y-24 -rotate-90">
            ADD COOURSE
          </h1>
        </div>
      </div>
    </div>
  );
}

export default AddCourses;
