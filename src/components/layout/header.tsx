"use client";

import { useSession } from 'next-auth/react';

export default function Header() {
  const { data } = useSession();
  return (
    <header className="border-b border-border bg-background/80 backdrop-blur px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <span className="font-serif text-sm font-semibold tracking-tight text-foreground">
          {data?.user?.name || 'User'}
        </span>
        <span className="text-xs px-2 py-1 rounded-md border border-border bg-secondary text-muted-foreground">
          {data?.user?.role}
        </span>
      </div>
      <div className="text-xs text-muted-foreground">
        Africa/Lagos
      </div>
    </header>
  );
}
