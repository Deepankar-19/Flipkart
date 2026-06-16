import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Camera } from "lucide-react";

const mockImages = [
  "https://images.unsplash.com/photo-1558981806-ec527fa842a9?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1518175510652-33cc9a08eb67?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80"
];

export default function EvidencePage() {
  return (
    <div className="flex flex-col gap-8 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Evidence Gallery</h1>
        <p className="text-muted-foreground mt-1">Visual grid of all captured and processed violations.</p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {mockImages.map((src, i) => (
          <Card key={i} className="border-border bg-card/50 overflow-hidden group cursor-pointer hover:border-primary/50 transition-colors shadow-sm hover:shadow-[0_0_15px_rgba(0,229,255,0.15)]">
            <div className="aspect-square relative overflow-hidden bg-black/80">
              <img src={src} alt="Evidence" className="w-full h-full object-cover opacity-70 group-hover:scale-110 transition-transform duration-700 group-hover:opacity-100" />
              <Badge className="absolute top-3 right-3 bg-black/60 text-white border-none backdrop-blur-md shadow-lg font-mono">EV-99{21-i}</Badge>
              <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-xs text-white/80 bg-black/50 px-2 py-1 rounded backdrop-blur-sm">
                <Camera className="w-3 h-3" /> CAM-{10+i}
              </div>
            </div>
            <CardContent className="p-4 bg-card/80 backdrop-blur-sm">
              <p className="font-semibold text-foreground truncate text-sm">Violation Detected</p>
              <p className="text-xs text-muted-foreground mt-1">Oct 12, 14:{30 - i}:00</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
