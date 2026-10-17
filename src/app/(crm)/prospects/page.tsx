export default function ProspectsPage() {
  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold tracking-tight text-foreground">
            Prospects
          </h1>
          <p className="mt-1 text-muted-foreground">
            Manage your prospect register.
          </p>
        </div>
      </div>
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="text-center py-12">
          <p className="text-muted-foreground">No prospects yet.</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Add your first prospect to get started.
          </p>
        </div>
      </div>
    </div>
  );
}
