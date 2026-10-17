"use client";

import { useSession } from 'next-auth/react';

export default function Header() {
  const { data } = useSession();
  return (
    <header className="border-b border-border bg-background px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-muted-foreground">
          {data?.user?.name || 'User'}
        </span>
        <span className="text-xs px-2 py-1 rounded-full border bg-secondary text-muted-foreground">
          {data?.user?.role}
        </span>
      </div>
      <div className="text-xs text-muted-foreground">
        Africa/Lagos
      </div>
    </header>
  );
}
