export default function DashboardPage() {
  return (
    <div className="animate-fade-in space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold tracking-tight text-foreground">
            Dashboard
          </h1>
          <p className="mt-1 text-muted-foreground">
            Sales pipeline overview
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 items-center justify-center rounded-full bg-green-500"></span>
          <span className="text-xs font-medium text-muted-foreground">All systems operational</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="text-sm font-semibold tracking-tight text-muted-foreground">
            Active Prospects
          </h2>
          <div className="mt-2 text-3xl font-bold text-foreground">0</div>
          <p className="mt-1 text-xs text-muted-foreground">No new prospects this week</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="text-sm font-semibold tracking-tight text-muted-foreground">
            New Today
          </h2>
          <div className="mt-2 text-3xl font-bold text-foreground">0</div>
          <p className="mt-1 text-xs text-muted-foreground">No new leads today</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="text-sm font-semibold tracking-tight text-muted-foreground">
            Overdue Tasks
          </h2>
          <div className="mt-2 text-3xl font-bold text-destructive">0</div>
          <p className="mt-1 text-xs text-muted-foreground">All tasks up to date</p>
        </div>
      </div>
    </div>
  );
}
