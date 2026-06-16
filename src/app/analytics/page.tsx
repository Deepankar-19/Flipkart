"use client"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const data = [
  { name: 'Mon', violations: 400 },
  { name: 'Tue', violations: 300 },
  { name: 'Wed', violations: 550 },
  { name: 'Thu', violations: 278 },
  { name: 'Fri', violations: 189 },
  { name: 'Sat', violations: 239 },
  { name: 'Sun', violations: 349 },
];

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col gap-8 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Analytics Hub</h1>
        <p className="text-muted-foreground mt-1">Deep insights into traffic violations and AI performance.</p>
      </div>
      <Card className="border-border bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Weekly Violation Distribution</CardTitle>
          <CardDescription>Total aggregated violations across all edge nodes.</CardDescription>
        </CardHeader>
        <CardContent className="h-[450px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 20, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 10%)" vertical={false} />
              <XAxis dataKey="name" stroke="#888888" tickLine={false} axisLine={false} />
              <YAxis stroke="#888888" tickLine={false} axisLine={false} />
              <Tooltip cursor={{fill: 'oklch(1 0 0 / 5%)'}} contentStyle={{ backgroundColor: 'oklch(0.16 0 0)', border: '1px solid oklch(1 0 0 / 15%)', borderRadius: '8px' }} />
              <Bar dataKey="violations" fill="oklch(0.7 0.15 200)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
