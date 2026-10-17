import * as React from 'react';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline';
}

export function Badge({ variant = 'default', className, ...props }: BadgeProps) {
  return (
    <div
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${
        variant === 'destructive'
          ? 'border-destructive text-destructive bg-destructive/10'
          : variant === 'outline'
            ? 'border-input bg-transparent'
            : 'border-transparent bg-primary text-primary-foreground'
      } ${className || ''}`}
      {...props}
    />
  );
}
