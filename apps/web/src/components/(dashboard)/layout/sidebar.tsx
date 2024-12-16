'use client'
import React, { useMemo } from 'react';
import { cn } from '@/lib/utils';
import { navItems } from '@/constants';
import { DashboardNav } from '@/components/navigation-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ChevronLeft, LogOut, Settings } from 'lucide-react';
import { signOut } from 'next-auth/react';
import { useParams, usePathname } from 'next/navigation';
type SidebarProps = {
  className?: string;
  user?: any;
};

export default function Sidebar({ className, user }: SidebarProps) {
  const pathName = usePathname();
  const { slug } = useParams() as { slug: string };

  const currentView = useMemo(()=>{
      return pathName.startsWith(`/account/settings`) ? 'accountSetting' : pathName.startsWith(`/${slug}/settings`) ? 'workspaceSetting' : 'workspace'
  },[slug, pathName])

  return (
    <aside
      className={cn(
        `relative h-screen w-[240px] bg-neutral-100 max-w-full flex-none border-r bg-card transition-[width] duration-500`,
        className
      )}
    >
      <div className="p-5 pt-10 flex justify-between items-center ">
        {currentView === 'workspace' ? (
          <span className="text-xl font-semibold text-primary">PlanIt</span>
        ) : (
          <Link href={`/`}>
             <span className="font-semibold group/arrow flex items-center">
             <ChevronLeft className="size-5 mr-2 group-hover/arrow:-translate-x-1 transition-transform" />
              Settings
            </span>
          </Link>
        )}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
                  <Avatar className="cursor-pointer size-6">
                    <AvatarImage src={user?.image} alt={user?.name} />
                    <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                  </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
              <Link href="/account/settings">
                  <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                  </DropdownMenuItem>
              </Link>
              <DropdownMenuItem onClick={()=>  
                signOut({
                //   redirect: '/',
                })}
              >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign out</span>
              </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="mt-3 space-y-1">
            <DashboardNav navItems={navItems} className="hidden md:col-span-3 md:flex" />
          </div>
        </div>
      </div>
    </aside>
  );
}
