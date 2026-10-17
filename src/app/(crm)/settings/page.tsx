export default function SettingsPage() {
  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold tracking-tight text-foreground">
            Settings
          </h1>
          <p className="mt-1 text-muted-foreground">
            Business settings and user administration.
          </p>
        </div>
      </div>
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="space-y-4">
          <h2 className="font-serif text-lg font-bold tracking-tight text-foreground">
            Organization
          </h2>
          <p className="text-sm text-muted-foreground">
            Manage organization details and preferences.
          </p>
        </div>
        <div className="pt-4 border-t border-border">
          <h2 className="font-serif text-lg font-bold tracking-tight text-foreground">
            Users
          </h2>
          <p className="text-sm text-muted-foreground">
            Add and manage team members.
          </p>
        </div>
      </div>
    </div>
  );
}
