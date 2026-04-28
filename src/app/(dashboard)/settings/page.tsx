import type { Metadata } from "next";
import { Building2, Bell, Shield, Key, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = { title: "Settings" };

export default function SettingsPage() {
  return (
    <div className="space-y-6 animate-fade-in max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground">
          Manage your organisation and account settings
        </p>
      </div>

      {/* Organisation */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Building2 className="h-4 w-4 text-muted-foreground" />
            <CardTitle className="text-base">Organisation</CardTitle>
          </div>
          <CardDescription>Update your firm details and FCA registration information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="orgName">Organisation name</Label>
              <Input id="orgName" defaultValue="Acme Financial Ltd" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="frn">FCA Firm Reference Number</Label>
              <Input id="frn" placeholder="e.g. 123456" defaultValue="794533" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="regulated">Regulated activities</Label>
            <Textarea
              id="regulated"
              defaultValue="Consumer credit, Mortgage lending, Investment advice"
              className="h-20"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="sector">Sector</Label>
              <Select defaultValue="retail">
                <SelectTrigger id="sector">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="retail">Retail banking</SelectItem>
                  <SelectItem value="investment">Investment management</SelectItem>
                  <SelectItem value="insurance">Insurance</SelectItem>
                  <SelectItem value="mortgage">Mortgage lending</SelectItem>
                  <SelectItem value="consumer_credit">Consumer credit</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="jurisdiction">Jurisdiction</Label>
              <Select defaultValue="uk">
                <SelectTrigger id="jurisdiction">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="uk">United Kingdom</SelectItem>
                  <SelectItem value="ewa">England & Wales</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button>Save changes</Button>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Bell className="h-4 w-4 text-muted-foreground" />
            <CardTitle className="text-base">Notifications</CardTitle>
          </div>
          <CardDescription>Configure when you receive email alerts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { id: "overdue", label: "Overdue actions", description: "When an action passes its due date without being completed" },
              { id: "review_due", label: "Assessments due for review", description: "30, 14, and 7 days before an annual review is due" },
              { id: "new_assessment", label: "New assessment assigned", description: "When you are assigned as owner of an assessment" },
              { id: "report_ready", label: "Reports ready", description: "When an AI-generated report is ready to download" },
            ].map((notif) => (
              <div key={notif.id} className="flex items-start justify-between gap-4 py-2">
                <div>
                  <p className="text-sm font-medium">{notif.label}</p>
                  <p className="text-xs text-muted-foreground">{notif.description}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <input
                    type="checkbox"
                    id={notif.id}
                    defaultChecked
                    className="h-4 w-4 rounded border-input bg-background accent-primary"
                  />
                </div>
              </div>
            ))}
          </div>
          <Separator className="my-4" />
          <Button>Save notification preferences</Button>
        </CardContent>
      </Card>

      {/* Security */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-muted-foreground" />
            <CardTitle className="text-base">Security</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between rounded-lg border border-border p-4">
            <div>
              <p className="text-sm font-medium">Two-factor authentication</p>
              <p className="text-xs text-muted-foreground">Add an extra layer of security to your account</p>
            </div>
            <Badge variant="muted">Not enabled</Badge>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-border p-4">
            <div>
              <p className="text-sm font-medium">SSO / SAML</p>
              <p className="text-xs text-muted-foreground">Available on Enterprise plan</p>
            </div>
            <Badge variant="muted">Enterprise only</Badge>
          </div>
          <Button variant="outline">Change password</Button>
        </CardContent>
      </Card>

      {/* API Keys */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Key className="h-4 w-4 text-muted-foreground" />
            <CardTitle className="text-base">API Keys</CardTitle>
          </div>
          <CardDescription>Use the Praxis API to integrate with your existing systems</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-3 rounded-lg border border-border p-4">
            <Key className="h-4 w-4 text-muted-foreground shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium">Production key</p>
              <p className="text-xs text-muted-foreground font-mono">prx_live_••••••••••••••••••••••••3f9a</p>
            </div>
            <Button variant="outline" size="sm">Reveal</Button>
          </div>
          <Button variant="outline" size="sm">
            <Key className="h-3.5 w-3.5" />
            Generate new key
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
