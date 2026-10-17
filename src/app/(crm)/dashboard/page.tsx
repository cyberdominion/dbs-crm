export default function DashboardPage() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="font-serif text-3xl font-bold tracking-tight text-foreground">
          Dashboard
        </h1>
        <p className="mt-1 text-muted-foreground">
          Sales pipeline overview
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title="Active Prospects" value="0" />
        <Card title="New Today" value="0" />
        <Card title="Overdue Tasks" value="0" />
      </div>
    </div>
  );
}

function Card({ title, value }: { title: string; value: number | string }) {
  return (
    <div className="rounded-xl border bg-card p-6">
      <h2 className="text-sm font-semibold tracking-tight text-muted-foreground">
        {title}
      </h2>
      <div className="mt-2 text-3xl font-bold text-foreground">{value}</div>
    </div>
  );
}
