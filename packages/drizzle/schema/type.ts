import { createSelectSchema } from "drizzle-zod";
import { Authenticator, users } from "./user";
import { z } from "zod";
import { tasks } from "./tasks";


// Note Schema
export const ZTasksSchema = createSelectSchema(tasks);

export type TaskSchema = z.infer<typeof ZTasksSchema>

// User Schema

export const ZUserSchema = createSelectSchema(users);

export type UserSchema = z.infer<typeof ZUserSchema>

export const ZAuthenticatorSchema = createSelectSchema(Authenticator);

export type AuthenticatorSchema = z.infer<typeof ZAuthenticatorSchema>
