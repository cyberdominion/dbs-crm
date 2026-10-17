import * as React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  value?: React.ReactNode;
  children?: React.ReactNode;
}

export function Card({ title, value, children, className }: CardProps) {
  return (
    <div className={`rounded-xl border bg-card p-6 transition-all duration-200 hover:border-primary/30 ${className || ''}`}>
      {title && (
        <h2 className="mb-2 font-serif text-sm font-semibold tracking-tight text-foreground">
          {title}
        </h2>
      )}
      {value && <div className="text-2xl font-bold text-foreground">{value}</div>}
      {children}
    </div>
  );
}
