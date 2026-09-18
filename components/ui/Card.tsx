import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'bordered' | 'elevated';
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    const variants = {
      default: 'bg-white border border-neutral-200/80',
      bordered: 'bg-white border border-neutral-200',
      elevated:
        'bg-white border border-neutral-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]',
    };

    return (
      <div
        ref={ref}
        className={cn('rounded-2xl', variants[variant], className)}
        {...props}
      />
    );
  }
);

Card.displayName = 'Card';

export default Card;
