import { NextResponse } from 'next/server';
import { getSession } from '@/lib/permissions';
import { db } from '@/lib/db';
import { prospectSchema } from '@/lib/validation';

export async function GET(req: Request) {
  try {
    const session = await getSession();
    if (!session?.user) return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const stage = searchParams.get('stage');
    const ownerId = searchParams.get('ownerId');
    const search = searchParams.get('search');

    const where: any = {
      organizationId: session.user.organizationId,
      archivedAt: null,
    };
    if (stage) where.stage = stage;
    if (ownerId) where.ownerId = ownerId;
    if (search) {
      where.OR = [
        { businessName: { contains: search, mode: 'insensitive' } },
        { contactPerson: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { phone: { contains: search } },
        { whatsappNumber: { contains: search } },
      ];
    }

    const prospects = await db.prospect.findMany({
      where,
      include: {
        owner: { select: { id: true, name: true, role: true } },
        creator: { select: { id: true, name: true } },
        _count: { select: { activities: true, tasks: true } },
      },
      orderBy: { updatedAt: 'desc' },
      take: 100,
    });

    return NextResponse.json(prospects);
  } catch (_err) {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session?.user) return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 });

    const body = await req.json();
    const data = prospectSchema.parse(body);

    const prospect = await db.prospect.create({
      data: {
        ...data,
        organizationId: session.user.organizationId,
        creatorId: session.user.id,
        ownerId: data.ownerId || session.user.id,
        normalizedName: data.businessName
          ? data.businessName.toLowerCase().trim().replace(/\s+/g, ' ')
          : '',
      },
    });

    return NextResponse.json(prospect, { status: 201 });
  } catch (_err: any) {
    if (err?.issues) {
      return NextResponse.json({ error: 'Validation failed', issues: err.issues }, { status: 422 });
    }
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
