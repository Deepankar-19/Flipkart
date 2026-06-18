"use client"

import { useState, useCallback } from "react";
import { UploadCloud, CheckCircle2, AlertCircle, RefreshCw, FileImage, Cpu, Camera, CarFront, ShieldAlert, Activity, FileText, CheckCircle, ChevronRight, AlertTriangle, ShieldCheck, MapPin, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { analyzeImage } from "@/services/api";
import { AnalysisResult } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";

const renderReasoning = (explanation: string) => {
  const points = explanation.split('. ').filter(Boolean);
  return points.map((p, i) => (
    <div key={i} className="flex items-start gap-2 mt-1.5">
      <CheckCircle className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
      <span className="text-xs text-muted-foreground leading-tight">{p.replace(/\.$/, '')}</span>
    </div>
  ));
};

const getSeverityBadge = (severity: string) => {
  switch(severity) {
    case 'critical': return <Badge variant="destructive" className="bg-red-500/15 text-red-500 hover:bg-red-500/25 border-none shadow-none text-[10px] uppercase tracking-wider">Critical</Badge>;
    case 'high': return <Badge variant="default" className="bg-orange-500/15 text-orange-500 hover:bg-orange-500/25 border-none shadow-none text-[10px] uppercase tracking-wider">High</Badge>;
    case 'medium': return <Badge variant="default" className="bg-amber-500/15 text-amber-500 hover:bg-amber-500/25 border-none shadow-none text-[10px] uppercase tracking-wider">Medium</Badge>;
    default: return <Badge variant="outline" className="bg-blue-500/15 text-blue-500 hover:bg-blue-500/25 border-none shadow-none text-[10px] uppercase tracking-wider">Low</Badge>;
  }
};

const pipelineSteps = [
  { label: 'Image Upload', threshold: 10 },
  { label: 'Vehicle Detection', threshold: 40 },
  { label: 'Violation Analysis', threshold: 60 },
  { label: 'License Plate Recognition', threshold: 80 },
  { label: 'Evidence Generation', threshold: 95 },
  { label: 'Report Creation', threshold: 100 }
];

export default function AnalyzeImage() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<'idle' | 'uploading' | 'processing' | 'success' | 'error'>('idle');
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const startAnalysis = async () => {
    if (!file) return;
    setStatus('uploading');
    setProgress(20);
    try {
      setStatus('processing');
      setProgress(60);
      
      const currentResult = await analyzeImage(file);
      
      if (currentResult && currentResult.status === 'completed') {
        setResult(currentResult);
        setStatus('success');
        setProgress(100);
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto">
      <div className="relative">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background blur-2xl" />
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl bg-clip-text text-transparent bg-gradient-to-br from-foreground to-foreground/70">
          Analyze Evidence
        </h1>
        <p className="text-muted-foreground mt-3 text-lg max-w-2xl">
          Upload traffic camera feeds or images. Our enterprise neural engine will automatically detect vehicles, recognize license plates, and classify violations with explainable AI.
        </p>
      </div>

      {status === 'idle' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card className="border-dashed border-2 border-border hover:border-primary/50 transition-colors bg-background/50 backdrop-blur-xl">
            <CardContent className="flex flex-col items-center justify-center py-24 text-center">
              <div 
                className="rounded-full bg-primary/10 p-6 mb-6 cursor-pointer hover:scale-105 transition-transform"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => document.getElementById('file-upload')?.click()}
              >
                <UploadCloud className="h-12 w-12 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Drag and drop evidence</h3>
              <p className="text-muted-foreground mb-6 max-w-md">
                Support for high-resolution JPG, PNG formats. Video analysis is currently available for Enterprise nodes only.
              </p>
              
              <div className="flex flex-col items-center gap-4">
                <Input type="file" className="hidden" id="file-upload" accept="image/*" onChange={handleFileChange} />
                <Button 
                  variant="outline" 
                  className="cursor-pointer" 
                  onClick={() => document.getElementById('file-upload')?.click()}
                >
                  Browse Files
                </Button>
                {file && (
                  <Button onClick={startAnalysis} className="gap-2 w-full max-w-xs mt-4">
                    <Cpu className="w-4 h-4" /> Analyze Now
                  </Button>
                )}
              </div>
              {file && (
                <div className="mt-6 flex items-center gap-2 text-sm text-emerald-500 bg-emerald-500/10 px-4 py-2 rounded-full border border-emerald-500/20">
                  <FileImage className="w-4 h-4" /> {file.name} ready for analysis
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      )}

      {(status === 'uploading' || status === 'processing') && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-20 space-y-12">
          <div className="relative">
            <div className="absolute inset-0 rounded-full blur-2xl bg-primary/20 animate-pulse" />
            <div className="relative bg-background/80 backdrop-blur-xl border border-primary/30 p-8 rounded-full shadow-[0_0_30px_rgba(0,229,255,0.15)]">
              <Activity className="h-16 w-16 text-primary animate-pulse" />
            </div>
          </div>
          
          <div className="text-center space-y-3">
            <h3 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-400 to-primary animate-[pulse_2s_ease-in-out_infinite]">
              {progress < 100 ? 'Running Inference Pipeline...' : 'Finalizing Report...'}
            </h3>
            <p className="text-muted-foreground text-lg">Processing evidence through neural tensor graph</p>
          </div>
          
          <div className="w-full max-w-2xl space-y-8 bg-card/40 backdrop-blur-md p-8 rounded-2xl border border-border/50 shadow-xl">
            <div className="flex justify-between items-end">
              <span className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Pipeline Progress</span>
              <span className="text-2xl font-mono font-bold text-primary">{progress}%</span>
            </div>
            
            <Progress value={progress} className="h-3 bg-secondary" />
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-4">
              {pipelineSteps.map((step, idx) => {
                const isActive = progress >= step.threshold && (idx === pipelineSteps.length - 1 || progress < pipelineSteps[idx + 1].threshold);
                const isCompleted = progress >= step.threshold;
                
                return (
                  <div key={idx} className={`flex items-center gap-3 transition-opacity duration-500 ${isCompleted ? 'opacity-100' : 'opacity-40'}`}>
                    <div className={`shrink-0 flex items-center justify-center w-6 h-6 rounded-full border ${isActive ? 'border-primary bg-primary/20 text-primary animate-pulse' : isCompleted ? 'border-emerald-500 bg-emerald-500/20 text-emerald-500' : 'border-muted-foreground text-muted-foreground'}`}>
                      {isCompleted && !isActive ? <CheckCircle2 className="w-4 h-4" /> : <div className="w-2 h-2 rounded-full bg-current" />}
                    </div>
                    <span className={`text-sm font-medium ${isActive ? 'text-primary' : isCompleted ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {step.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      )}

      {status === 'success' && result && (
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}>
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              <Card className="overflow-hidden border-border bg-card/50">
                <CardHeader className="bg-muted/20 border-b border-border/50">
                  <CardTitle className="text-lg flex items-center gap-2 text-foreground">
                    <Camera className="w-5 h-5 text-primary" />
                    Processed Evidence View
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0 relative group">
                  <div className="relative aspect-video w-full overflow-hidden bg-black flex items-center justify-center">
                    <img src={result.annotatedImage} alt="Annotated Evidence" className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 border-[3px] border-primary/60 m-12 md:m-24 rounded-lg shadow-[0_0_20px_rgba(0,229,255,0.4)] flex items-end justify-center p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                       <Badge variant="default" className="bg-primary/90 text-primary-foreground backdrop-blur-md">Target Tracked</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="border-border bg-card/50 backdrop-blur-md">
                <CardHeader>
                  <CardTitle className="text-foreground flex justify-between items-center">
                    Analysis Results
                    <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">Processed</Badge>
                  </CardTitle>
                  <CardDescription className="font-mono text-xs">Job ID: {result.jobId}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1 bg-secondary/30 p-3 rounded-lg border border-border/50">
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Processing Latency</p>
                      <p className="font-medium text-foreground text-lg">{result.processingTimeMs}ms</p>
                    </div>
                    <div className="space-y-1 bg-secondary/30 p-3 rounded-lg border border-border/50">
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Targets Extracted</p>
                      <p className="font-medium text-foreground text-lg">{result.detections.length}</p>
                    </div>
                  </div>

                  {result.detections.map((det) => (
                    <div key={det.id} className="space-y-4">
                      <div className="p-4 rounded-xl bg-secondary/50 border border-border/80 shadow-sm relative">
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="font-semibold flex items-center gap-2 text-foreground">
                            <CarFront className="w-4 h-4 text-primary" />
                            {det.type}
                          </h4>
                          {det.ocr && (
                            <Badge variant="outline" className="border-primary/50 bg-primary/10 text-primary font-mono text-sm px-2 py-0.5">
                              {det.ocr.text}
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mb-4">
                           <Progress value={det.confidence * 100} className="h-1.5 flex-1 bg-primary/20" />
                           <span className="text-xs font-medium text-primary">{(det.confidence * 100).toFixed(1)}%</span>
                        </div>
                        
                        <div className="space-y-3">
                          {det.violations.map((v) => (
                            <div key={v.id} className="p-4 rounded-xl bg-background/50 border border-border/50 relative overflow-hidden group/violation hover:border-border transition-colors shadow-sm">
                              <div className={`absolute left-0 top-0 bottom-0 w-1 ${v.severity === 'critical' ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]' : v.severity === 'high' ? 'bg-orange-500' : v.severity === 'medium' ? 'bg-amber-500' : 'bg-blue-500'}`} />
                              <div className="flex justify-between items-start mb-2">
                                <span className="font-semibold text-[15px] text-foreground flex items-center gap-2">
                                  {v.severity === 'critical' && <AlertTriangle className="w-4 h-4 text-red-500" />}
                                  {v.type}
                                </span>
                                <div className="flex items-center gap-2">
                                  {getSeverityBadge(v.severity)}
                                  <Badge variant="outline" className="text-[10px] bg-background">{(v.confidence * 100).toFixed(1)}%</Badge>
                                </div>
                              </div>
                              
                              <div className="mt-3 pt-3 border-t border-border/50">
                                <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5">
                                  <Cpu className="w-3 h-3 text-primary/70" /> Explainable AI Reasoning
                                </p>
                                <div className="space-y-1">
                                  {renderReasoning(v.explanation)}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <div className="pt-6 flex gap-3">
                    <Button variant="outline" className="w-full gap-2 border-border hover:bg-secondary" onClick={() => {setStatus('idle'); setFile(null);}}>
                      <RefreshCw className="w-4 h-4" /> Reset Analysis
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border bg-card/50 backdrop-blur-md">
                <CardHeader className="bg-muted/10 border-b border-border/50 pb-4">
                  <CardTitle className="text-foreground flex items-center gap-2 text-base">
                    <FileText className="w-5 h-5 text-primary" />
                    Official Evidence Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y divide-border/50">
                    <div className="grid grid-cols-2 p-4 hover:bg-muted/30 transition-colors">
                      <div className="text-sm text-muted-foreground flex items-center gap-2"><FileText className="w-3.5 h-3.5" /> Evidence ID</div>
                      <div className="text-sm font-mono text-right">{result.jobId.toUpperCase()}</div>
                    </div>
                    <div className="grid grid-cols-2 p-4 hover:bg-muted/30 transition-colors">
                      <div className="text-sm text-muted-foreground flex items-center gap-2"><CarFront className="w-3.5 h-3.5" /> Vehicle Number</div>
                      <div className="text-sm font-mono font-bold text-primary text-right">{result.detections[0]?.ocr?.text || 'UNKNOWN'}</div>
                    </div>
                    <div className="grid grid-cols-2 p-4 hover:bg-muted/30 transition-colors">
                      <div className="text-sm text-muted-foreground flex items-center gap-2"><Clock className="w-3.5 h-3.5" /> Timestamp</div>
                      <div className="text-sm text-right">{format(new Date(result.timestamp), 'MMM d, yyyy HH:mm:ss')}</div>
                    </div>
                    <div className="grid grid-cols-2 p-4 hover:bg-muted/30 transition-colors">
                      <div className="text-sm text-muted-foreground flex items-center gap-2"><MapPin className="w-3.5 h-3.5" /> Location</div>
                      <div className="text-sm text-right">Outer Ring Road, Sector 4</div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="bg-muted/10 border-t border-border/50 p-4 flex gap-3">
                  <Button className="w-full gap-2 shadow-[0_0_15px_rgba(0,229,255,0.3)] hover:shadow-[0_0_25px_rgba(0,229,255,0.5)] transition-shadow">
                    <ShieldCheck className="w-4 h-4" /> Generate Legal Notice
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
