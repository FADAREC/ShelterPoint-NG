import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
    
    return (
      <div className="w-full space-y-1">
        {label && (
          <label htmlFor={inputId} className="block text-body-small font-medium text-neutral-900">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'w-full rounded border bg-white px-4 py-3 text-body-base text-neutral-900',
            'placeholder:text-neutral-600',
            'focus:outline-none focus:ring-2 focus:border-transparent',
            'disabled:bg-neutral-200 disabled:cursor-not-allowed transition-all duration-200',
            error 
              ? 'border-semantic-error focus:ring-semantic-error' 
              : 'border-neutral-400 focus:ring-brand-primary',
            className
          )}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
          {...props}
        />
        {error && (
          <p id={`${inputId}-error`} className="text-body-small text-semantic-error" role="alert">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={`${inputId}-helper`} className="text-body-small text-neutral-700">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;