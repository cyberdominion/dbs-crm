import { db } from '@/lib/db';
import { auditLog } from '@/server/audit/actions';

export async function createProspect(data: any, userId: string, organizationId: string) {
  const prospect = await db.prospect.create({
    data: {
      ...data,
      organizationId,
      creatorId: userId,
      ownerId: data.ownerId || userId,
      normalizedName: data.businessName
        ? data.businessName.toLowerCase().trim().replace(/\s+/g, ' ')
        : '',
    },
  });

  await auditLog({
    organizationId,
    userId,
    action: 'PROSPECT_CREATE',
    entityType: 'Prospect',
    entityId: prospect.id,
    metadata: JSON.stringify({ businessName: prospect.businessName }),
  });

  return prospect;
}

export async function updateProspect(id: string, data: any, userId: string, organizationId: string) {
  const prospect = await db.prospect.update({
    where: { id },
    data: { ...data, updatedAt: new Date() },
  });

  await auditLog({
    organizationId,
    userId,
    action: 'PROSPECT_UPDATE',
    entityType: 'Prospect',
    entityId: id,
    metadata: JSON.stringify({ businessName: prospect.businessName }),
  });

  return prospect;
}

export async function archiveProspect(id: string, userId: string, organizationId: string) {
  const prospect = await db.prospect.update({
    where: { id },
    data: { archivedAt: new Date(), updatedAt: new Date() },
  });

  await auditLog({
    organizationId,
    userId,
    action: 'PROSPECT_ARCHIVE',
    entityType: 'Prospect',
    entityId: id,
  });

  return prospect;
}

export async function changeStage(
  id: string,
  stage: string,
  userId: string,
  organizationId: string
) {
  const prospect = await db.prospect.update({
    where: { id },
    data: { stage, lastContactAt: new Date(), updatedAt: new Date() },
  });

  await auditLog({
    organizationId,
    userId,
    action: 'PROSPECT_STAGE_CHANGE',
    entityType: 'Prospect',
    entityId: id,
    metadata: JSON.stringify({ stage, businessName: prospect.businessName }),
  });

  return prospect;
}
