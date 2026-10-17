import { redirect } from 'next/navigation';
import { assertPermission, PERMISSIONS } from '@/lib/permissions';
import { getUsers, createUser, updateUserRole, deleteUser } from '@/server/users/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default async function UsersPage() {
  const session = await assertPermission(PERMISSIONS.USER_MANAGE);
  const organizationId = session.user.organizationId;

  const users = await getUsers(organizationId);

  async function handleCreate(formData: FormData) {
    const email = formData.get('email') as string;
    const name = formData.get('name') as string;
    const role = formData.get('role') as 'CEO' | 'ASSISTANT';
    const password = formData.get('password') as string;

    try {
      await createUser({ email, name, role, password });
    } catch {
      // Error handling handled by server action throwing
    }

    redirect('/users');
  }

  async function handleUpdateRole(formData: FormData) {
    const id = formData.get('id') as string;
    const role = formData.get('role') as 'CEO' | 'ASSISTANT';

    try {
      await updateUserRole(id, role);
    } catch {
      // Error handled by server action
    }

    redirect('/users');
  }

  async function handleDelete(formData: FormData) {
    const id = formData.get('id') as string;
    await deleteUser(id);
    redirect('/users');
  }

  return (
    <div className="animate-fade-in space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold tracking-tight text-foreground">
            User Management
          </h1>
          <p className="mt-1 text-muted-foreground">
            Manage team members and their roles.
          </p>
        </div>
        <Button asChild>
          <a href="/dashboard" className="text-sm font-medium">
            Back to Dashboard
          </a>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="font-serif text-lg font-bold tracking-tight text-foreground mb-4">
            Add New User
          </h2>
          <form
            action={handleCreate}
            className="space-y-4"
            method="POST"
          >
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">
                Email
              </label>
              <Input name="email" type="email" required placeholder="name@dbs.example.com" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">
                Name
              </label>
              <Input name="name" type="text" required placeholder="Full name" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">
                Password
              </label>
              <Input name="password" type="password" required minLength={8} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">
                Role
              </label>
              <select name="role" className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                <option value="ASSISTANT">Assistant</option>
                <option value="CEO">CEO</option>
              </select>
            </div>
            <Button type="submit">
              Create User
            </Button>
          </form>
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="font-serif text-lg font-bold tracking-tight text-foreground mb-4">
            Team Members ({users.length})
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-muted-foreground">
                  <th className="pb-2 font-medium">Name</th>
                  <th className="pb-2 font-medium">Email</th>
                  <th className="pb-2 font-medium">Role</th>
                  <th className="pb-2 font-medium text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {users.map((user) => (
                  <tr key={user.id} className="group">
                    <td className="py-3 text-foreground font-medium">
                      {user.name || 'Unnamed'}
                    </td>
                    <td className="py-3 text-muted-foreground">{user.email}</td>
                    <td className="py-3 text-muted-foreground">
                      {user.role}
                    </td>
                    <td className="py-3 text-center">
                      <form action={handleUpdateRole} className="inline" method="POST">
                        <input name="id" value={user.id} />
                        <select
                          name="role"
                          className="flex h-8 w-auto rounded-lg border border-input bg-background px-2 py-1 text-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                          defaultValue={user.role}
                        >
                          <option value="ASSISTANT">Assistant</option>
                          <option value="CEO">CEO</option>
                        </select>
                        <Button type="submit" size="sm" className="ml-2 px-2 py-1">
                          Save
                        </Button>
                      </form>
                      {user.id !== session.user.id && (
                        <form
                          action={handleDelete}
                          className="inline mt-2"
                          method="POST"
                          onSubmit={(e) => {
                            if (!confirm('Are you sure you want to delete this user?')) {
                              e.preventDefault();
                            }
                          }}
                        >
                          <input name="id" value={user.id} />
                          <Button
                            type="submit"
                            variant="destructive"
                            size="sm"
                            className="px-2 py-1"
                          >
                            Delete
                          </Button>
                        </form>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
