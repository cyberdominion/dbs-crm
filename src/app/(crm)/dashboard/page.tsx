export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Sales pipeline overview</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card title="Active Prospects" value="0" />
        <Card title="New Today" value="0" />
        <Card title="Overdue Tasks" value="0" />
      </div>
    </div>
  );
}

function Card({ title, value }: { title: string; value: number | string }) {
  return (
    <div className="rounded-lg border bg-card p-6">
      <h2 className="text-sm font-medium text-muted-foreground">{title}</h2>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  );
}
