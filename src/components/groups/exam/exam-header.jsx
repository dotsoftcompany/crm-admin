import React from 'react';

import { Calendar } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

function ExamHeader({ exam, loading }) {
  if (loading) {
    return (
      <div className="space-y-2 py-4 w-full border-b border-border">
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-64" />
        </div>

        <div className="flex items-center gap-3 md:gap-5">
          <div className="flex items-center gap-1 text-xs md:text-sm capitalize">
            <Skeleton className="w-2 h-2 rounded-full" />
            <Skeleton className="h-4 w-20" />
          </div>

          <Skeleton className="h-4 w-24" />

          <div className="flex items-center gap-1 text-xs md:text-sm text-muted-foreground">
            <Skeleton className="w-4 h-4" />
            <Skeleton className="h-4 w-16" />
          </div>

          <div className="flex items-center gap-1 text-xs md:text-sm text-muted-foreground">
            <Skeleton className="w-4 h-4" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="space-y-2 py-4 w-full border-b border-border">
      <div className="flex items-center gap-2">
        <h1 className="text-lg md:text-xl font-semibold">{exam?.title}</h1>
      </div>

      <div className="flex items-center gap-3 md:gap-5">
        <div
          className={`flex items-center gap-1 text-xs md:text-sm capitalize ${
            exam?.place === 'online' ? 'text-green-500' : 'text-yellow-500'
          }`}
        >
          <div
            className={`w-2 h-2 animate-pulse rounded-full ${
              exam?.place === 'online' ? 'bg-green-500' : 'bg-yellow-500'
            }`}
          />
          <span>{exam?.type}</span>
        </div>
        <div
          className={`capitalize ${
            exam?.status === 'ongoing' ? 'text-green-500' : ''
          }
        ${exam?.status === 'upcoming' ? 'text-blue-500' : ''}
        ${exam?.status === 'completed' ? 'text-indigo-500' : ''}
        ${exam?.status === 'cancelled' ? 'text-red-500' : ''}
        ${exam?.status === 'paused' ? 'text-yellow-500' : ''}`}
        >
          <span>
            {exam?.status === 'ongoing' ? 'Davom etmoqda' : ''}
            {exam?.status === 'upcoming' ? 'Kutilmoqda' : ''}
            {exam?.status === 'completed' ? 'Yakuniga yetdi' : ''}
            {exam?.status === 'cancelled' ? 'Bekor qilindi' : ''}
            {exam?.status === 'paused' ? "To'xtatib turilipt" : ''}
          </span>
        </div>

        <div className="flex items-center gap-1 text-xs md:text-sm text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span className='whitespace-nowrap'>{exam?.start}</span>
        </div>
        <div className="flex items-center gap-1 text-xs md:text-sm text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span className='whitespace-nowrap'>{exam?.end}</span>
        </div>
      </div>
    </div>
  );
}

export default ExamHeader;
