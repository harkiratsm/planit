import { Icons } from "../components/icons";

export interface NavItem {
    title : string;
    icon ?: keyof typeof Icons;
    href : string;
    disable ?: boolean;
    label : string;
}

export type NavItems = {
    [key: string]: {
        title?: string;
        items: () => NavItem[]            
    }
}


export const navItems: NavItems = {
    workspace: {
        items: () => 
            [
                {
                    title : "Tasks",
                    icon : "content",
                    href : `/`,
                    label : "Tasks",
                    disable : false,
                },
                {
                    title : "Actions",
                    icon : "actions",
                    href : `/actions`,
                    label : "Actions",
                    disable:true
                },
                {
                    title : "Insights",
                    icon : "insights",
                    href : `/insights`,
                    label : "Insights",
                    disable:true
                },
                {
                    title : "Upcoming",
                    icon : "upcoming",
                    href : `/upcoming`,
                    label : "upcoming",
                    disable:true
                },
            ]
    },
    accountSetting : {
        items: () =>  [
            {
                title : "General",
                icon : "general",
                href : `/account/settings/profile`,
                label : "general",
            },
            {
                title: "Security",
                icon: "security",
                href: '/account/settings/security',
                label: 'security'
            }
        ]
    },
}