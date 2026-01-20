import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'bordered' | 'elevated';
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    const variants = {
      default: 'bg-neutral-100 border border-neutral-400',
      bordered: 'bg-white border-2 border-neutral-400',
      elevated: 'bg-neutral-100 border border-neutral-400 shadow-md',
    };
    
    return (
      <div
        ref={ref}
        className={cn('rounded-lg', variants[variant], className)}
        {...props}
      />
    );
  }
);

Card.displayName = 'Card';

export default Card;