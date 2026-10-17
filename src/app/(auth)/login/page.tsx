"use client";

import { signIn } from 'next-auth/react';
import { useState } from 'react';

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError('Invalid email or password');
    } else {
      window.location.href = '/dashboard';
    }
  }

  return (
    <div className="min-h-screen flex items-center center justify-center bg-secondary">
      <div className="w-full max-w-md space-y-8 p-8">
        <div className="mx-auto">
          <h1 className="text-2xl font-bold text-foreground">DBS CRM</h1>
          <p className="text-muted-foreground">
            Sign in to Digital Business Solutions CRM
          </p>
        </div>

        {error && (
          <div className="bg-destructive text-destructive-foreground rounded-md p-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Email address</label>
            <input
              type="email"
              className="w-full rounded-md border-input border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Password</label>
            <input
              type="password"
              className="w-full rounded-md border-input border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring disabled:opacity-50 disabled:pointer-events-none"
          >
            Sign in
          </button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          Need an account? Contact your administrator.
        </p>
      </div>
    </div>
  );
}
