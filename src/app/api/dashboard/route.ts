import { NextResponse } from 'next/server';
import { getSession } from '@/lib/permissions';
import { db } from '@/lib/db';

export async function GET(req: Request) {
  try {
    const session = await getSession();
    if (!session?.user) return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const stage = searchParams.get('stage');

    const where: any = {
      organizationId: session.user.organizationId,
      archivedAt: null,
    };
    if (stage) where.stage = stage;

    const prospects = await db.prospect.findMany({
      where,
      select: {
        id: true,
        businessName: true,
        stage: true,
        priority: true,
        estimatedValue: true,
        wonValue: true,
        ownerId: true,
        nextFollowUpDate: true,
        archivedAt: true,
      },
    });

    const totalActive = prospects.length;
    const byStage = prospects.reduce((acc: Record<string, number>, p) => {
      acc[p.stage] = (acc[p.stage] || 0) + 1;
      return acc;
    }, {});
    const pipelineValue = prospects.reduce(
      (sum, p) => sum + Number(p.estimatedValue || 0),
      0
    );

    return NextResponse.json({
      totalActive,
      byStage,
      pipelineValue,
      generatedAt: new Date().toISOString(),
    });
  } catch (_err: any) {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
