import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Activity, Cpu, Database, Server, Network } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function HealthPage() {
  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">System Health</h1>
        <p className="text-muted-foreground mt-1">Real-time monitoring of inference nodes and backend architecture.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          { title: "API Gateway", icon: Server, status: "Healthy", ping: "42ms" },
          { title: "Inference Engine", icon: Cpu, status: "Healthy", ping: "128ms" },
          { title: "Database", icon: Database, status: "Healthy", ping: "12ms" },
          { title: "Edge Nodes", icon: Network, status: "Degraded", ping: "N/A" }
        ].map((item) => (
          <Card key={item.title} className="border-border bg-card/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{item.title}</CardTitle>
              <item.icon className={`h-4 w-4 ${item.status === 'Healthy' ? 'text-emerald-500' : 'text-amber-500'}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{item.status}</div>
              <p className="text-xs mt-1 text-muted-foreground">Latency: {item.ping}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-border bg-card/50">
        <CardHeader>
           <CardTitle>GPU Utilization</CardTitle>
           <CardDescription>Live metrics from the central processing cluster.</CardDescription>
        </CardHeader>
        <CardContent>
           <div className="flex items-center justify-center h-48 bg-secondary/30 rounded-lg border border-border/50 border-dashed">
             <div className="text-center space-y-2">
                <Cpu className="w-8 h-8 text-muted-foreground mx-auto" />
                <p className="text-muted-foreground">Detailed metrics module requires Enterprise License</p>
                <Badge variant="outline" className="border-primary/50 text-primary">Upgrade Plan</Badge>
             </div>
           </div>
        </CardContent>
      </Card>
    </div>
  );
}
