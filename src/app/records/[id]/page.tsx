import { ArrowLeft, Download, ShieldCheck, Camera, CarFront } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ViolationDetail() {
  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-4">
        <Link href="/records">
          <Button variant="ghost" size="icon" className="hover:bg-secondary">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2 text-foreground">
            Evidence <span className="font-mono text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20">EV-9921</span>
          </h1>
          <p className="text-muted-foreground text-sm mt-1">Captured on Oct 12, 2024 at 14:32:01</p>
        </div>
        <div className="ml-auto flex gap-2">
          <Button variant="outline" className="border-border"><Download className="w-4 h-4 mr-2" /> Export</Button>
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-[0_0_15px_rgba(5,150,105,0.4)]"><ShieldCheck className="w-4 h-4 mr-2" /> Verify & Issue</Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          <Card className="border-border bg-card/50 overflow-hidden shadow-sm">
            <div className="aspect-video relative bg-black flex items-center justify-center group">
              <img src="https://images.unsplash.com/photo-1558981806-ec527fa842a9?auto=format&fit=crop&q=80" alt="Violation" className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute top-1/4 left-1/3 w-32 h-32 border-2 border-primary shadow-[0_0_15px_rgba(0,229,255,0.4)] rounded-sm bg-primary/10">
                <Badge className="absolute -top-3 -left-1 bg-primary text-primary-foreground text-[10px]">99% No Helmet</Badge>
              </div>
            </div>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card className="border-border bg-card/50 backdrop-blur-md">
             <CardHeader>
               <CardTitle>Forensic Details</CardTitle>
             </CardHeader>
             <CardContent className="space-y-5">
               <div className="p-3 bg-secondary/30 rounded-lg border border-border/50">
                 <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-1">Violation Category</p>
                 <p className="font-medium text-destructive flex items-center gap-2">Helmet Non-Compliance</p>
               </div>
               <div className="p-3 bg-secondary/30 rounded-lg border border-border/50">
                 <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-1">Vehicle License</p>
                 <Badge variant="outline" className="font-mono text-base border-primary/50 text-primary mt-1 shadow-inner">MH 12 PQ 4567</Badge>
               </div>
               <div className="p-3 bg-secondary/30 rounded-lg border border-border/50">
                 <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-1">Capture Node</p>
                 <p className="flex items-center gap-2 text-sm text-foreground"><Camera className="w-4 h-4 text-primary" /> CAM-S-88 (MG Road)</p>
               </div>
               <div className="p-3 bg-secondary/30 rounded-lg border border-border/50">
                 <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-1">Neural Net Confidence</p>
                 <div className="flex items-center gap-3 mt-2">
                   <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                     <div className="w-[99%] h-full bg-primary shadow-[0_0_5px_rgba(0,229,255,1)]" />
                   </div>
                   <span className="text-sm font-bold text-primary">99.2%</span>
                 </div>
               </div>
             </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
