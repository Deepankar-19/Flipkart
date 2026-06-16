"use client"

import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Activity, 
  Camera, 
  CarFront, 
  CheckCircle2, 
  Clock, 
  Target 
} from "lucide-react";
import { 
  Area, 
  AreaChart, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis, 
  CartesianGrid 
} from "recharts";
import { Badge } from "@/components/ui/badge";

const kpis = [
  { title: "Total Violations", value: "124,592", icon: CarFront, trend: "+12.5%", trendUp: true },
  { title: "Violations Today", value: "842", icon: Activity, trend: "+4.1%", trendUp: true },
  { title: "Detection Accuracy", value: "99.4%", icon: Target, trend: "+0.2%", trendUp: true },
  { title: "OCR Success Rate", value: "98.7%", icon: CheckCircle2, trend: "+1.1%", trendUp: true },
  { title: "Active Cameras", value: "412/420", icon: Camera, trend: "-2", trendUp: false },
  { title: "Avg Processing Time", value: "142ms", icon: Clock, trend: "-12ms", trendUp: true },
];

const trendData = [
  { time: "00:00", violations: 120 },
  { time: "04:00", violations: 45 },
  { time: "08:00", violations: 890 },
  { time: "12:00", violations: 650 },
  { time: "16:00", violations: 1100 },
  { time: "20:00", violations: 430 },
  { time: "24:00", violations: 90 },
];

const recentDetections = [
  { id: "EV-9921", type: "Helmet Non-Compliance", plate: "KA01XY1234", time: "2 mins ago", conf: "99%" },
  { id: "EV-9920", type: "Red-Light Violation", plate: "TN09AB9876", time: "5 mins ago", conf: "97%" },
  { id: "EV-9919", type: "Triple Riding", plate: "MH12PQ4567", time: "12 mins ago", conf: "94%" },
  { id: "EV-9918", type: "Wrong-Side Driving", plate: "DL01CZ0000", time: "15 mins ago", conf: "98%" },
];

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Executive overview of traffic intelligence systems.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {kpis.map((kpi) => (
          <Card key={kpi.title} className="bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-colors duration-300">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {kpi.title}
              </CardTitle>
              <kpi.icon className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{kpi.value}</div>
              <p className={`text-xs mt-1 ${kpi.trendUp ? 'text-emerald-500' : 'text-destructive'}`}>
                {kpi.trend} from last period
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-7 lg:grid-cols-7">
        <Card className="col-span-4 lg:col-span-5 bg-card/50 backdrop-blur-sm border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Violation Trends</CardTitle>
            <CardDescription>Daily violation detection frequency across all camera nodes.</CardDescription>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorViolations" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="oklch(0.7 0.15 200)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="oklch(0.7 0.15 200)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="oklch(1 0 0 / 10%)" />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'oklch(0.16 0 0)', border: '1px solid oklch(1 0 0 / 15%)', borderRadius: '8px' }}
                  itemStyle={{ color: 'oklch(0.7 0.15 200)' }}
                />
                <Area type="monotone" dataKey="violations" stroke="oklch(0.7 0.15 200)" strokeWidth={2} fillOpacity={1} fill="url(#colorViolations)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="col-span-3 lg:col-span-2 bg-card/50 backdrop-blur-sm border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Recent Detections</CardTitle>
            <CardDescription>Live feed from inference edge nodes.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {recentDetections.map((detection) => (
                <div key={detection.id} className="flex items-center group relative p-2 -mx-2 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="ml-2 space-y-1 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium leading-none text-foreground">{detection.plate}</p>
                      <Badge variant="outline" className="text-xs text-primary border-primary/30 bg-primary/10">
                        {detection.conf}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {detection.type}
                    </p>
                    <p className="text-[10px] text-muted-foreground/60">{detection.time} • {detection.id}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
