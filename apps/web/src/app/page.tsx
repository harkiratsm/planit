import { auth } from "@/auth";
import { redirect } from "next/navigation";

import { UserSchema } from "@repo/drizzle/schema/type";
import { getAllTasks } from "@repo/lib/server-specific/all-tasks";
import Sidebar from "@/components/(dashboard)/layout/sidebar";
import TaskManagement from "./task-management-client";

export default async function Dashboard() {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/signin");
  }

  const userId = session?.user?.id ?? '';
  const task = await getAllTasks({ userId });

  return (

      <div className="flex">
            <Sidebar user={session?.user}/>
            <main className="w-full flex-1 overflow-hidden p-4">
              <TaskManagement task={task} />
            </main>
      </div>
  )
}