import { hash } from 'bcryptjs';
import { db } from '@/lib/db';

export default async function seed() {
  const org = await db.organization.create({
    data: {
      name: 'Digital Business Solutions',
      slug: 'dbs',
      timezone: 'Africa/Lagos',
      currency: 'NGN',
    },
  });

  const ceoPassword = await hash('CEOPassword123!', 12);
  const assistantPassword = await hash('AssistantPassword123!', 12);

  const ceo = await db.user.create({
    data: {
      email: 'ceo@dbs.example.com',
      name: 'CEO',
      role: 'CEO',
      organizationId: org.id,
      emailVerified: new Date(),
      passwordHash: ceoPassword,
    },
  });

  const assistant = await db.user.create({
    data: {
      email: 'assistant@dbs.example.com',
      name: 'Business Assistant',
      role: 'ASSISTANT',
      organizationId: org.id,
      emailVerified: new Date(),
      passwordHash: assistantPassword,
    },
  });

  // New credentials - additional CEO
  const coCeoPassword = await hash('CoCeoPassword123!', 12);
  await db.user.create({
    data: {
      email: 'co-ceo@dbs.example.com',
      name: 'Co-CEO',
      role: 'CEO',
      organizationId: org.id,
      emailVerified: new Date(),
      passwordHash: coCeoPassword,
    },
  });

  // New credentials - additional assistants
  const opsPassword = await hash('OpsPassword123!', 12);
  await db.user.create({
    data: {
      email: 'ops@dbs.example.com',
      name: 'Operations Assistant',
      role: 'ASSISTANT',
      organizationId: org.id,
      emailVerified: new Date(),
      passwordHash: opsPassword,
    },
  });

  const salesPassword = await hash('SalesPassword123!', 12);
  await db.user.create({
    data: {
      email: 'sales@dbs.example.com',
      name: 'Sales Assistant',
      role: 'ASSISTANT',
      organizationId: org.id,
      emailVerified: new Date(),
      passwordHash: salesPassword,
    },
  });

  await db.prospect.create({
    data: {
      organizationId: org.id,
      businessName: 'Example Enterprise Ltd',
      normalizedName: 'example enterprise ltd',
      category: 'Technology',
      location: 'Lagos, Nigeria',
      website: 'https://example.com',
      contactPerson: 'Jane Doe',
      contactRole: 'Founder',
      email: 'jane@example.com',
      phone: '+2348000000000',
      whatsappNumber: '+2348000000000',
      source: 'Referral',
      priority: 'HIGH',
      stage: 'Contacted',
      estimatedValue: '500000.00',
      currency: 'NGN',
      nextAction: 'Schedule discovery call',
      nextFollowUpDate: new Date(Date.now() + 86400000),
      ownerId: assistant.id,
      creatorId: ceo.id,
    },
  });

  console.log('Seed complete');
}
