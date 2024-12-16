import { db, eq } from "@repo/drizzle";
import { tasks } from "@repo/drizzle/schema/tasks";

export async function getTaskbyId({ id }: { id: string }) {
    const res = await db.select().from(tasks).where(eq(tasks.id, id));
    return res[0];
}