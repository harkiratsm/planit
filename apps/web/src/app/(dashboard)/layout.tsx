import { auth } from "@/auth";
import Sidebar from "@/components/(dashboard)/layout/sidebar";
import { UserSchema } from "@repo/drizzle/schema/type";
import { redirect } from "next/navigation";
import React from "react";

type DashboardLayoutProps = {
    children: React.ReactNode;
};

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
    const session = await auth();

    if (!session || !session?.user) {
        redirect("/signin");
    }

    return (
        <div className="flex">
            <Sidebar user={session?.user as UserSchema}/>
            <main className="w-full flex-1 overflow-hidden">
                {children}
            </main>
        </div>
    );

}
