import z from "zod";

export const ZCreateTaskSchema = z.object({
    title: z.string(),
    description: z.string(),
    status: z.string(),
    priority : z.string(),
});

export const ZUpdateTaskSchema = z.object({
    id: z.string(),
    title: z.string().optional(),
    description: z.string().optional(),
    priority: z.string().optional(),
    status: z.string().optional(),
});