import type { Metadata } from "next";
import { UserPlus, Crown, Shield, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDate, initialsFromName } from "@/lib/utils";
import type { MemberRole } from "@/types";

export const metadata: Metadata = { title: "Team" };

const members = [
  { id: "1", name: "Sarah Chen", email: "sarah@acmefinancial.com", role: "owner" as MemberRole, joinedAt: "2025-01-15", lastActive: "2026-04-25", avatar: null },
  { id: "2", name: "James Park", email: "james@acmefinancial.com", role: "admin" as MemberRole, joinedAt: "2025-02-01", lastActive: "2026-04-24", avatar: null },
  { id: "3", name: "Maria Lopez", email: "maria@acmefinancial.com", role: "compliance" as MemberRole, joinedAt: "2025-03-10", lastActive: "2026-04-23", avatar: null },
  { id: "4", name: "Tom Wilson", email: "tom@acmefinancial.com", role: "risk" as MemberRole, joinedAt: "2025-06-01", lastActive: "2026-04-20", avatar: null },
  { id: "5", name: "Nina Patel", email: "nina@acmefinancial.com", role: "viewer" as MemberRole, joinedAt: "2026-01-05", lastActive: "2026-04-15", avatar: null },
];

const roleConfig: Record<MemberRole, { label: string; icon: React.ElementType; variant: "default" | "secondary" | "outline" | "muted" }> = {
  owner: { label: "Owner", icon: Crown, variant: "default" },
  admin: { label: "Admin", icon: Shield, variant: "secondary" },
  compliance: { label: "Compliance", icon: Shield, variant: "outline" },
  risk: { label: "Risk", icon: Shield, variant: "outline" },
  viewer: { label: "Viewer", icon: Eye, variant: "muted" },
};

export default function TeamPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Team</h1>
          <p className="text-sm text-muted-foreground">
            Manage team members and their access levels
          </p>
        </div>
        <Button>
          <UserPlus className="h-4 w-4" />
          Invite member
        </Button>
      </div>

      {/* Role legend */}
      <div className="grid gap-3 sm:grid-cols-4">
        {(["admin", "compliance", "risk", "viewer"] as MemberRole[]).map((role) => {
          const cfg = roleConfig[role];
          return (
            <Card key={role}>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <cfg.icon className="h-4 w-4 text-muted-foreground" />
                  <p className="font-medium text-sm">{cfg.label}</p>
                </div>
                <p className="text-xs text-muted-foreground">
                  {role === "admin" && "Full access excluding billing and org deletion"}
                  {role === "compliance" && "Create and manage assessments, evidence, and reports"}
                  {role === "risk" && "View and comment on assessments; manage actions"}
                  {role === "viewer" && "Read-only access to all compliance data"}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">{members.length} members</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {members.map((member) => {
            const cfg = roleConfig[member.role];
            return (
              <div key={member.id} className="flex items-center gap-4 rounded-lg p-3 hover:bg-accent transition-colors">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={member.avatar ?? undefined} />
                  <AvatarFallback className="text-xs">{initialsFromName(member.name)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">{member.name}</p>
                  <p className="text-xs text-muted-foreground">{member.email}</p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs text-muted-foreground hidden sm:block">
                    Active {formatDate(member.lastActive)}
                  </span>
                  <Badge variant={cfg.variant}>
                    <cfg.icon className="h-3 w-3 mr-1" />
                    {cfg.label}
                  </Badge>
                  <Button variant="ghost" size="sm" className="h-7 text-xs">
                    Edit
                  </Button>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
