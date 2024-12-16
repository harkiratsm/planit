import { Activity, Clapperboard, Cog, CreditCard, Fingerprint, GitPullRequestArrow, Lightbulb, LucideIcon,  PlugZap,  Settings, Users, Workflow } from "lucide-react";

export type Icon = LucideIcon;

export const Icons = {
    settings : Settings,
    upcoming: Lightbulb,
    content: Clapperboard,
    insights: Activity,
    requests: GitPullRequestArrow,
    actions: Workflow,
    general: Cog,
    security: Fingerprint,
    members: Users,
    connections: PlugZap,
    billing: CreditCard,
}