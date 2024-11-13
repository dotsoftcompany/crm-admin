import * as React from 'react';
import { cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
        outline: 'text-foreground',
        odd: 'bg-orange-100 text-orange-500 hover:bg-orange-200/80 dark:bg-orange-500 hover:dark:bg-orange-600 dark:text-white',
        even: 'bg-purple-100 text-purple-500 hover:bg-purple-200/80 dark:bg-purple-500 hover:dark:bg-purple-600 dark:text-white',
        every:
          'bg-white hover:opacity-90 text-primary dark:text-black',
        odd_outline:
          'bg-orange-50 dark:bg-transparent border-orange-500 text-orange-500 hover:border-orange-600/80 dark:border-orange-500 hover:dark:border-orange-600 dark:text-orange-500',
        even_outline:
          'bg-purple-50 dark:bg-transparent border-purple-500 text-purple-500 hover:border-purple-600/80 dark:border-purple-500 hover:dark:border-purple-600 dark:text-purple-500',
        active:
          'bg-green-100 text-green-500 hover:bg-green-200/80 dark:bg-green-500 hover:dark:bg-green-600 dark:text-white cursor-text',
        inactive:
          'bg-red-100 text-red-500 hover:bg-red-200/80 dark:bg-red-500 hover:dark:bg-red-600 dark:text-white cursor-text',
        active_outline:
          'bg-green-50 dark:bg-transparent border-green-500 text-green-500 hover:border-green-600/80 dark:border-green-500 hover:dark:border-green-600 dark:text-green cursor-text',
        inactive_outline:
          'bg-red-50 dark:bg-transparent border-red-500 text-red-500 hover:border-red-600/80 dark:border-red-500 hover:dark:border-red-600 dark:text-red cursor-text',
        white: 'bg-transparent border-primary text-primary cursor-text',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

function Badge({ className, variant, ...props }) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
