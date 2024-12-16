import { pgTable, serial, text, timestamp, varchar, pgEnum } from "drizzle-orm/pg-core";
import { users } from "./user";

export const taskStatusEnum = pgEnum('task_status', ['pending', 'completed']);
export const priorityEnum = pgEnum('priority', ['low', 'medium', 'high']);

export const tasks = pgTable('tasks', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  title: varchar('title', { length: 255 }).notNull(),
  priority: priorityEnum('priority').default('low'),
  description: text('description').notNull(),
  userId: text('user_id').references(() => users.id).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  endTime: timestamp('end_time').notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  status: taskStatusEnum('status').default('pending'),
});

export type Task = typeof tasks.$inferSelect;
export type NewTask = typeof tasks.$inferInsert;