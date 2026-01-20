import { SelectHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: Array<{ value: string; label: string }>;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, options, id, ...props }, ref) => {
    const selectId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="w-full space-y-1 overflow-visible">
        {label && (
          <label
            htmlFor={selectId}
            className="block w-full text-body-small font-medium text-neutral-900 whitespace-normal break-words"
            style={{ overflowWrap: 'anywhere' }}
          >
            {label}
          </label>
        )}

        <select
          ref={ref}
          id={selectId}
          className={cn(
            'w-full rounded border bg-white px-4 py-3 text-body-base text-neutral-900',
            'focus:outline-none focus:ring-2 focus:border-transparent',
            'disabled:bg-neutral-200 disabled:cursor-not-allowed transition-all duration-200',
            error
              ? 'border-semantic-error focus:ring-semantic-error'
              : 'border-neutral-400 focus:ring-brand-primary',
            className
          )}
          aria-invalid={!!error}
          aria-describedby={error ? `${selectId}-error` : undefined}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {error && (
          <p
            id={`${selectId}-error`}
            className="text-body-small text-semantic-error"
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

export default Select;