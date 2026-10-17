import { NextResponse } from 'next/server';
import { getSession } from '@/lib/permissions';
import { db } from '@/lib/db';

export async function GET(req: Request) {
  try {
    const session = await getSession();
    if (!session?.user) return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    const reports = await db.dailyReport.findMany({
      where: {
        organizationId: session.user.organizationId,
        ...(userId ? { userId } : {}),
      },
      include: {
        user: { select: { id: true, name: true, role: true } },
        reviewer: { select: { id: true, name: true } },
      },
      orderBy: { businessDate: 'desc' },
      take: 100,
    });

    return NextResponse.json(reports);
  } catch (_err: any) {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session?.user) return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 });

    const body = await req.json();
    const report = await db.dailyReport.create({
      data: {
        ...body,
        organizationId: session.user.organizationId,
        userId: session.user.id,
        businessDate: new Date(body.businessDate),
      },
    });

    return NextResponse.json(report, { status: 201 });
  } catch (_err: any) {
    if (_err?.code === 'P2002') {
      return NextResponse.json({ error: 'Duplicate report for this date' }, { status: 409 });
    }
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await getSession();
    if (!session?.user) return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 });

    const body = await req.json();
    const { id, status, ...rest } = body;

    const report = await db.dailyReport.update({
      where: { id },
      data: {
        ...rest,
        ...(status ? { status, reviewedAt: new Date(), reviewerId: session.user.id } : {}),
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(report);
  } catch (_err: any) {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
