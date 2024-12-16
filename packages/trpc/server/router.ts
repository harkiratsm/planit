import { taskRouter } from "./task-router/router";
import { router } from "./trpc";
import { userRouter } from "./user/router";

export const appRouter = router({
    task: taskRouter,
    userRouter: userRouter,
    // different router slides here
})

export type AppRouter = typeof appRouter;