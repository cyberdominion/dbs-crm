import { NextResponse } from 'next/server';
import { getSession } from '@/lib/permissions';
import { db } from '@/lib/db';

export async function GET(req: Request) {
  try {
    const session = await getSession();
    if (!session?.user) return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get('limit') || '100', 10);

    const logs = await db.auditLog.findMany({
      where: { organizationId: session.user.organizationId },
      include: { user: { select: { id: true, name: true, role: true } } },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });

    return NextResponse.json(logs);
  } catch (_err) {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
