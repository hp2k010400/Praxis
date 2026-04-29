"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ClipboardList,
  Package,
  Target,
  FileBarChart2,
  Settings,
  CreditCard,
  Users,
  Shield,
  ChevronRight,
  HelpCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const navItems = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { title: "Assessments", href: "/assessments", icon: ClipboardList },
  { title: "Products", href: "/products", icon: Package },
  { title: "Outcomes", href: "/outcomes", icon: Target },
  { title: "Reports", href: "/reports", icon: FileBarChart2 },
];

const secondaryItems = [
  { title: "Team", href: "/team", icon: Users },
  { title: "Billing", href: "/billing", icon: CreditCard },
  { title: "Settings", href: "/settings", icon: Settings },
];

function NavItem({
  href,
  icon: Icon,
  title,
  collapsed,
}: {
  href: string;
  icon: React.ElementType;
  title: string;
  collapsed?: boolean;
}) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(href + "/");

  const content = (
    <Link
      href={href}
      className={cn(
        "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-150",
        isActive
          ? "bg-primary/10 text-primary"
          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
      )}
    >
      <Icon className={cn("h-4 w-4 shrink-0", isActive && "text-primary")} />
      {!collapsed && (
        <>
          <span className="flex-1">{title}</span>
          {isActive && <ChevronRight className="h-3 w-3 opacity-50" />}
        </>
      )}
    </Link>
  );

  if (collapsed) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{content}</TooltipTrigger>
        <TooltipContent side="right">{title}</TooltipContent>
      </Tooltip>
    );
  }

  return content;
}

export function Sidebar({ collapsed = false }: { collapsed?: boolean }) {
  return (
    <TooltipProvider delayDuration={0}>
      <aside
        className={cn(
          "flex h-full flex-col border-r border-border bg-card transition-all duration-300",
          collapsed ? "w-16" : "w-60"
        )}
      >
        {/* Logo — links back to home */}
        <div className={cn("flex h-16 items-center border-b border-border px-4", collapsed && "justify-center")}>
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary">
              <Shield className="h-4 w-4 text-primary-foreground" />
            </div>
            {!collapsed && (
              <span className="text-base font-semibold tracking-tight">Praxis</span>
            )}
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-3 scrollbar-thin">
          <div className="flex flex-col gap-1">
            {!collapsed && (
              <p className="mb-1 px-3 text-xs font-medium uppercase tracking-wider text-muted-foreground/60">
                Compliance
              </p>
            )}
            {navItems.map((item) => (
              <NavItem key={item.href} {...item} collapsed={collapsed} />
            ))}
          </div>

          <div className="mt-4 flex flex-col gap-1">
            {!collapsed && (
              <p className="mb-1 px-3 text-xs font-medium uppercase tracking-wider text-muted-foreground/60">
                Organisation
              </p>
            )}
            {secondaryItems.map((item) => (
              <NavItem key={item.href} {...item} collapsed={collapsed} />
            ))}
          </div>
        </nav>

        {/* Footer */}
        <div className={cn("border-t border-border p-3", collapsed && "flex justify-center")}>
          {collapsed ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-accent hover:text-accent-foreground">
                  <HelpCircle className="h-4 w-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right">Help & Docs</TooltipContent>
            </Tooltip>
          ) : (
            <Link
              href="/docs"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <HelpCircle className="h-4 w-4" />
              <span>Help & Docs</span>
            </Link>
          )}
        </div>
      </aside>
    </TooltipProvider>
  );
}
