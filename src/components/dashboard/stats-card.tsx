import { type LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: { value: number; label: string };
  icon: LucideIcon;
  iconColor?: string;
  valueColor?: string;
}

export function StatsCard({ title, value, change, icon: Icon, iconColor, valueColor }: StatsCardProps) {
  const isPositive = change && change.value >= 0;

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className={cn("text-3xl font-bold tracking-tight", valueColor)}>{value}</p>
            {change && (
              <p className={cn("text-xs font-medium", isPositive ? "text-success" : "text-destructive")}>
                {isPositive ? "↑" : "↓"} {Math.abs(change.value)}% {change.label}
              </p>
            )}
          </div>
          <div className={cn("flex h-10 w-10 items-center justify-center rounded-lg", iconColor ?? "bg-primary/10")}>
            <Icon className="h-5 w-5 text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
