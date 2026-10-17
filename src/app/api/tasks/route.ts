import { NextResponse } from 'next/server';
import { getSession } from '@/lib/permissions';
import { db } from '@/lib/db';

export async function GET(req: Request) {
  try {
    const session = await getSession();
    if (!session?.user) return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const assigneeId = searchParams.get('assigneeId');

    const tasks = await db.task.findMany({
      where: {
        organizationId: session.user.organizationId,
        ...(assigneeId ? { assigneeId } : {}),
      },
      include: {
        assignee: { select: { id: true, name: true, role: true } },
        prospect: { select: { id: true, businessName: true, stage: true } },
      },
      orderBy: { dueAt: 'asc' },
      take: 100,
    });

    return NextResponse.json(tasks);
  } catch (_err: any) {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session?.user) return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 });

    const body = await req.json();
    const task = await db.task.create({
      data: {
        ...body,
        organizationId: session.user.organizationId,
        creatorId: session.user.id,
        dueAt: body.dueAt ? new Date(body.dueAt) : null,
      },
    });

    return NextResponse.json(task, { status: 201 });
  } catch (_err: any) {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await getSession();
    if (!session?.user) return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 });

    const body = await req.json();
    const { id, ...updates } = body;

    const task = await db.task.update({
      where: { id },
      data: {
        ...updates,
        dueAt: updates.dueAt ? new Date(updates.dueAt) : undefined,
        ...(updates.status === 'COMPLETED' ? { completedAt: new Date() } : {}),
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(task);
  } catch (_err: any) {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
