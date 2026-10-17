import { NextResponse } from 'next/server';
import { getSession } from '@/lib/permissions';
import { db } from '@/lib/db';
import { prospectSchema } from '@/lib/validation';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSession();
    if (!session?.user) return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 });

    const prospect = await db.prospect.findFirst({
      where: { id: params.id, organizationId: session.user.organizationId },
      include: {
        owner: { select: { id: true, name: true, role: true } },
        activities: {
          include: { user: { select: { id: true, name: true, role: true } } },
          orderBy: { eventAt: 'desc' },
        },
        tasks: { orderBy: { dueAt: 'asc' } },
      },
    });

    if (!prospect) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(prospect);
  } catch (_err: any) {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSession();
    if (!session?.user) return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 });

    const body = await req.json();
    const data = prospectSchema.partial().parse(body);

    const prospect = await db.prospect.update({
      where: { id: params.id },
      data: { ...data, updatedAt: new Date() },
    });

    return NextResponse.json(prospect);
  } catch (err: any) {
    if (err?.issues) {
      return NextResponse.json({ error: 'Validation failed', issues: err.issues }, { status: 422 });
    }
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSession();
    if (!session?.user) return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 });

    await db.prospect.update({
      where: { id: params.id },
      data: { archivedAt: new Date(), updatedAt: new Date() },
    });

    return NextResponse.json({ ok: true });
  } catch (_err: any) {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
