'use client'
import { useParams, usePathname } from "next/navigation";
import { Icons } from "./icons";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { NavItem, NavItems } from "@/constants";
import { useMemo } from "react";

export interface DashboardNavProps {
    className ?: string;
    navItems: NavItems;
}

const sideBarViews = ['workspace', 'accountSetting'];

export const DashboardNav = ({ className, navItems }: DashboardNavProps ) => {
    const pathName = usePathname();
    const { slug } = useParams() as { slug: string };

    const currentView = useMemo(()=>{
        return pathName.startsWith(`/account/settings`) ? 'accountSetting' : 'workspace'
    },[slug, pathName])

    return (
        <div className={cn("pt-4", className)} >
            {sideBarViews.map((view) => 
                <div 
                    key={view}
                    className={cn(
                        'flex flex-col gap-1 left-0 top-0 w-full md:transition-[opacity,transform] md:duration-400',
                        currentView === view ? 'opacity-1 relative' : 'pointer-events-none absolute opacity-0 translate-x-full'

                    )}
                    aria-hidden={currentView !== view}
                >
                {navItems[view].items(slug).map((item: NavItem, index: number) => {
                    const Icon = Icons[item.icon || 'actions'];
                    return (
                        item.href && (
                            <Link
                                key={index}
                                href={item.href}
                                className={cn(
                                'flex group items-center text-sm gap-2 overflow-hidden rounded-md p-2 font-medium',
                                'text-black hover:bg-gray-100',
                                'outline-none focus-visible:ring-2 focus-visible:ring-black',
                                currentView === view ? 'relative opacity-100' : 'pointer-events-none opacity-0',
                                pathName === item.href && "bg-primary/90 text-white hover:bg-primary/80 active:text-white",
                                item.disable && 'cursor-not-allowed opacity-70'
                                )}
                            
                            >
                                <Icon className={cn(
                                    `size-4 text-black`,
                                    pathName === item.href && "text-white",
                                )}  />
                            {item.title}
                            </Link>
                        )
                    );
                })}
                </div>
            )}
        </div>
    )
}