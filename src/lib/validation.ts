import { z } from 'zod';

export const prospectSchema = z.object({
  businessName: z.string().min(1, 'Business name is required'),
  category: z.string().optional(),
  location: z.string().optional(),
  website: z.string().url().optional().or(z.literal('')),
  socialLinks: z.string().optional(),
  contactPerson: z.string().optional(),
  contactRole: z.string().optional(),
  email: z.string().email().optional().or(z.literal('')),
  phone: z.string().optional(),
  whatsappNumber: z.string().optional(),
  digitalPresence: z.string().optional(),
  identifiedNeeds: z.string().optional(),
  proposedServices: z.string().optional(),
  source: z.string().optional(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH']).default('MEDIUM'),
  stage: z.string().default('NEW'),
  estimatedValue: z.string().optional().transform((val) => (val ? parseFloat(val) : null)),
  nextAction: z.string().optional(),
  nextFollowUpDate: z.string().optional().transform((val) => (val ? new Date(val) : null)),
  ownerId: z.string().optional(),
});

export const activitySchema = z.object({
  prospectId: z.string().min(1),
  type: z.enum(['CALL', 'WHATSAPP', 'EMAIL', 'MEETING', 'NOTE', 'OTHER']),
  eventAt: z.string().transform((val) => new Date(val)),
  summary: z.string().min(1, 'Summary is required'),
  messageContent: z.string().optional(),
  outcome: z.string().optional(),
  nextAction: z.string().optional(),
});

export const taskSchema = z.object({
  prospectId: z.string().optional(),
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  status: z.enum(['TODO', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED']).default('TODO'),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH']).default('MEDIUM'),
  dueAt: z.string().optional().transform((val) => (val ? new Date(val) : null)),
  assigneeId: z.string().min(1),
});

export const reportSchema = z.object({
  businessDate: z.string().transform((val) => new Date(val)),
  prospectsIdentified: z.number().int().nonnegative().default(0),
  initialContacts: z.number().int().nonnegative().default(0),
  responsesReceived: z.number().int().nonnegative().default(0),
  meetingsBooked: z.number().int().nonnegative().default(0),
  pipelineChanges: z.string().optional(),
  summary: z.string().optional(),
  blockers: z.string().optional(),
  nextPriorities: z.string().optional(),
});

export type ProspectInput = z.infer<typeof prospectSchema>;
export type ActivityInput = z.infer<typeof activitySchema>;
export type TaskInput = z.infer<typeof taskSchema>;
export type ReportInput = z.infer<typeof reportSchema>;
