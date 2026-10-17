import * as React from 'react';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'primary';
}

export function Badge({ variant = 'default', className, ...props }: BadgeProps) {
  return (
    <div
      className={`inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-all duration-200 ${
        variant === 'destructive'
          ? 'border-destructive text-destructive bg-destructive/5'
          : variant === 'outline'
            ? 'border-input bg-transparent'
            : variant === 'primary'
              ? 'border-transparent bg-primary text-primary-foreground'
              : 'border-transparent bg-secondary text-secondary-foreground'
      } ${className || ''}`}
      {...props}
    />
  );
}
