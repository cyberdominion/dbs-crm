import { NextResponse } from 'next/server';
import { getSession } from '@/lib/permissions';
import { db } from '@/lib/db';

export async function GET(req: Request) {
  try {
    const session = await getSession();
    if (!session?.user) return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const stage = searchParams.get('stage');
    const ownerId = searchParams.get('ownerId');

    const where: any = {
      organizationId: session.user.organizationId,
      archivedAt: null,
    };
    if (stage) where.stage = stage;
    if (ownerId) where.ownerId = ownerId;

    const prospects = await db.prospect.findMany({
      where,
      select: {
        id: true,
        businessName: true,
        category: true,
        location: true,
        contactPerson: true,
        email: true,
        phone: true,
        whatsappNumber: true,
        stage: true,
        priority: true,
        source: true,
        estimatedValue: true,
        currency: true,
        ownerId: true,
        nextFollowUpDate: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    const csvHeaders =
      'ID,Business Name,Category,Location,Contact Person,Email,Phone,WhatsApp,Stage,Priority,Source,Estimated Value,Currency,Owner ID,Next Follow-Up,Created At\n';

    const rows = prospects.map(
      (p) =>
        `${p.id},"${p.businessName}","${p.category || ''}","${p.location || ''}","${p.contactPerson || ''}","${p.email || ''}","${p.phone || ''}","${p.whatsappNumber || ''}","${p.stage}","${p.priority}","${p.source || ''}","${p.estimatedValue || 0}","${p.currency}","${p.ownerId}","${p.nextFollowUpDate || ''}","${p.createdAt}"\n`
    );

    const csv = csvHeaders + rows.join('');

    return new NextResponse(csv, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="prospects-${new Date().toISOString().slice(0,10)}.csv"`,
      },
    });
  } catch (_err: any) {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
