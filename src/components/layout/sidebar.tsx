"use client";

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';

const nav = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Prospects', href: '/prospects' },
  { name: 'Pipeline', href: '/pipeline' },
  { name: 'Tasks', href: '/tasks' },
  { name: 'Reports', href: '/reports' },
  { name: 'Settings', href: '/settings' },
];

export default function Sidebar() {
  const { data } = useSession();
  const isCEO = data?.user?.role === 'CEO';
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-border bg-card flex-shrink-0">
      <div className="p-6">
        <h2 className="font-serif text-xl font-bold tracking-tight text-foreground">
          DBS CRM
        </h2>
        <p className="mt-1 text-xs text-muted-foreground">
          {data?.user?.organizationId ? 'Organization scoped' : 'No organization'}
        </p>
      </div>
      <nav className="space-y-0.5 p-4">
        {nav.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-accent text-accent-foreground'
                  : 'text-foreground hover:bg-secondary hover:text-accent-foreground'
              }`}
            >
              {item.name}
            </Link>
          );
        })}
        {isCEO && (
          <div className="pt-4 border-t border-border mt-4">
            <Link
              href="/users"
              className="flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 text-foreground hover:bg-secondary hover:text-accent-foreground"
            >
              User Management
            </Link>
          </div>
        )}
      </nav>
      <div className="p-4 border-t border-border">
        <button
          onClick={() => signOut()}
          className="w-full flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 text-muted-foreground hover:text-destructive hover:bg-destructive/5"
        >
          Sign out
        </button>
      </div>
    </aside>
  );
}
