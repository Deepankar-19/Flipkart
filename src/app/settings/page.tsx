import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">System Configuration</h1>
        <p className="text-muted-foreground mt-1">Configure AI thresholds and platform preferences.</p>
      </div>

      <Card className="border-border bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>AI Detection Thresholds</CardTitle>
          <CardDescription>Adjust the confidence levels required for flagging violations.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2 max-w-sm">
            <label className="text-sm font-medium text-foreground">Global Confidence Threshold (%)</label>
            <Input type="number" defaultValue={85} className="bg-background border-border focus-visible:ring-primary" />
            <p className="text-xs text-muted-foreground">Lower values will capture more potential violations but may increase false positives.</p>
          </div>
          <div className="space-y-2 max-w-sm">
            <label className="text-sm font-medium text-foreground">OCR Verification Strictness (%)</label>
            <Input type="number" defaultValue={90} className="bg-background border-border focus-visible:ring-primary" />
          </div>
          <div className="pt-4 border-t border-border">
            <Button className="shadow-[0_0_15px_rgba(0,229,255,0.3)]">Save Thresholds</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
