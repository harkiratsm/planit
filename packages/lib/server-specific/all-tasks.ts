import { db, eq } from "@repo/drizzle";
import { tasks } from "@repo/drizzle/schema/tasks";

export async function getAllTasks({ userId }: { userId: string }) {
    return await db.select().from(tasks).where(eq(tasks.userId, userId));
}