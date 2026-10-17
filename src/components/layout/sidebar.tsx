"use client";

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';

const nav = [
  { name: 'Dashboard', href: '/dashboard', icon: 'Layout' },
  { name: 'Prospects', href: '/prospects', icon: 'Users' },
  { name: 'Pipeline', href: '/pipeline', icon: 'Board' },
  { name: 'Tasks', href: '/tasks', icon: 'CheckCircle' },
  { name: 'Reports', href: '/reports', icon: 'ClipboardList' },
  { name: 'Settings', href: '/settings', icon: 'Settings' },
];

export default function Sidebar() {
  const { data } = useSession();
  const isCEO = data?.user?.role === 'CEO';

  return (
    <aside className="w-64 border-r border-border bg-card flex-shrink-0">
      <div className="p-6">
        <h2 className="text-xl font-bold">DBS CRM</h2>
        <p className="text-xs text-muted-foreground">
          {data?.user?.organizationId ? 'Organization scoped' : 'No organization'}
        </p>
      </div>
      <nav className="space-y-1 p-4">
        {nav.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors text-foreground hover:bg-accent"
          >
            {item.name}
          </Link>
        ))}
        {isCEO && (
          <div className="pt-4 border-t border-border">
            <Link
              href="/users"
              className="flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors text-foreground hover:bg-accent"
            >
              User Management
            </Link>
          </div>
        )}
      </nav>
      <div className="p-4 border-t border-border">
        <button
          onClick={() => signOut()}
          className="w-full flex items-center rounded-lg px-3 py-2 text-sm font-medium text-destructive hover:bg-destructive/10"
        >
          Sign out
        </button>
      </div>
    </aside>
  );
}
