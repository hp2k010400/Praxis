"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function NewProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    type: "",
    targetMarket: "",
    description: "",
    distributionChannels: "",
    vulnerableConsiderations: "",
  });

  function set(field: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((p) => ({ ...p, [field]: e.target.value }));
  }

  function canSubmit() {
    return form.name.trim().length > 1 && form.type.length > 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit()) return;
    setLoading(true);
    // In production: POST to /api/products
    await new Promise((r) => setTimeout(r, 800));
    router.push("/products");
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6 animate-fade-in">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => router.push("/products")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-xl font-bold tracking-tight">Add Product</h1>
          <p className="text-xs text-muted-foreground">Register a new product for Consumer Duty assessment</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Card>
          <CardContent className="space-y-5 pt-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Product name *</Label>
                <Input
                  id="name"
                  placeholder="e.g. Flexible Cash ISA"
                  required
                  value={form.name}
                  onChange={set("name")}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Product type *</Label>
                <Select value={form.type} onValueChange={(v) => setForm((p) => ({ ...p, type: v }))}>
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="savings">Savings</SelectItem>
                    <SelectItem value="investment">Investment</SelectItem>
                    <SelectItem value="mortgage">Mortgage</SelectItem>
                    <SelectItem value="insurance">Insurance</SelectItem>
                    <SelectItem value="banking">Banking</SelectItem>
                    <SelectItem value="consumer_credit">Consumer credit</SelectItem>
                    <SelectItem value="pension">Pension</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="targetMarket">Target market</Label>
              <Input
                id="targetMarket"
                placeholder="e.g. Retail — General consumers aged 18–65"
                value={form.targetMarket}
                onChange={set("targetMarket")}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Product description</Label>
              <Textarea
                id="description"
                placeholder="Describe the product, its key features, and intended customer benefits…"
                className="h-24"
                value={form.description}
                onChange={set("description")}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="distributionChannels">Distribution channels</Label>
              <Input
                id="distributionChannels"
                placeholder="e.g. Branch, online, independent financial advisers"
                value={form.distributionChannels}
                onChange={set("distributionChannels")}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="vulnerableConsiderations">Vulnerable customer considerations</Label>
              <Textarea
                id="vulnerableConsiderations"
                placeholder="Describe how the product design accounts for potentially vulnerable customers…"
                className="h-20"
                value={form.vulnerableConsiderations}
                onChange={set("vulnerableConsiderations")}
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex items-center justify-between">
          <Button type="button" variant="outline" onClick={() => router.push("/products")}>
            Cancel
          </Button>
          <Button type="submit" disabled={!canSubmit()} loading={loading}>
            Add product
          </Button>
        </div>
      </form>
    </div>
  );
}
