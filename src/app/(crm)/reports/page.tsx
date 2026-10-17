export default function ReportsPage() {
  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold tracking-tight text-foreground">
            Daily Reports
          </h1>
          <p className="mt-1 text-muted-foreground">
            Submit and review daily activity reports.
          </p>
        </div>
      </div>
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="text-center py-12">
          <p className="text-muted-foreground">No reports yet.</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Submit your first daily activity report.
          </p>
        </div>
      </div>
    </div>
  );
}
