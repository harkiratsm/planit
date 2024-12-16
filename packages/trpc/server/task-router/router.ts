import { z } from "zod";
import { procedure, router } from "../trpc";
import { and, db, eq } from "@repo/drizzle";
import {TaskSchema, ZTasksSchema } from "@repo/drizzle/schema/type";
import { tasks } from "@repo/drizzle/schema/tasks";
import { ZCreateTaskSchema, ZUpdateTaskSchema } from "./schema";
const { v4: uuidv4 } = require('uuid');

export const taskRouter = router({
    createNote: procedure.meta({
        openapi: {
            method: "POST",
            path: "/tasks",
            summary: "Create a note",
            tags: ["note"],
        }
    }).input(ZCreateTaskSchema).output(z.array(ZTasksSchema)).mutation(async ({input, ctx}) => {
        try {
             return await db.insert(tasks).values({
                id: uuidv4(),
                title: input.title,
                description: input.description,
                createdAt: new Date(),
                userId: ctx.session?.user?.id ?? "",
                priority: input.priority as "low" | "medium" | "high" | null | undefined,
                endTime: new Date(),
                updatedAt: new Date(),
                status: input.status as "pending" | "completed" | null | undefined,
            }).returning() as TaskSchema[];
        } catch (error) {
            console.error(error);
            throw new Error("Failed to create note");
        }
    }),
    updateTask: procedure.meta({
        openapi: {
            method: "PUT",
            path: "/tasks/{id}",
            summary: "Update a note",
            tags: ["note"],
        }
    }).input(ZUpdateTaskSchema).output(ZTasksSchema).mutation(async ({input, ctx}) => {
        try {
            const result = await db.update(tasks).set({
                title: input.title,
                description: input.description,
                priority: input.priority  as "low" | "medium" | "high" | null | undefined,
                status: input.status as "pending" | "completed" | null | undefined,
                updatedAt: new Date(),
            }).where(
                and(
                  eq(tasks.id, input.id),
                  eq(tasks.userId, ctx.session?.user?.id ?? "")
                )
              ).returning();
            return result[0] as TaskSchema;
        } catch (error) {
            console.error(error);
            throw new Error("Failed to update note"); 
        }
    })
});