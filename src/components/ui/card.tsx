import * as React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  value?: React.ReactNode;
  children?: React.ReactNode;
}

export function Card({ title, value, children, className }: CardProps) {
  return (
    <div className={`rounded-lg border bg-card p-6 ${className || ''}`}>
      {title && <h2 className="text-sm font-medium text-muted-foreground">{title}</h2>}
      {value && <div className="text-2xl font-bold">{value}</div>}
      {children}
    </div>
  );
}
