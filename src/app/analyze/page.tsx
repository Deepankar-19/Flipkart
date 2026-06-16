"use client"

import { useState, useCallback } from "react";
import { UploadCloud, CheckCircle2, AlertCircle, RefreshCw, FileImage, Cpu, Camera, CarFront } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { mockAnalyzeImage, mockPollJobStatus } from "@/services/api";
import { AnalysisResult } from "@/types";
import { motion, AnimatePresence } from "framer-motion";

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
      const initRes = await mockAnalyzeImage(file);
      setStatus('processing');
      setProgress(40);
      
      let currentResult = null;
      for (let i = 0; i < 4; i++) {
        currentResult = await mockPollJobStatus(initRes.jobId, i);
        setProgress(40 + (i * 15));
        if (currentResult.status === 'completed') {
          break;
        }
      }
      
      if (currentResult && currentResult.status === 'completed') {
        setResult(currentResult);
        setStatus('success');
        setProgress(100);
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Analyze Evidence</h1>
        <p className="text-muted-foreground mt-1">Upload traffic camera feeds or images for AI violation detection.</p>
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
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-32 space-y-8">
          <div className="relative">
            <div className="absolute inset-0 rounded-full blur-xl bg-primary/30 animate-pulse" />
            <div className="relative bg-background border border-primary/30 p-6 rounded-full shadow-[0_0_20px_rgba(0,229,255,0.2)]">
              <RefreshCw className="h-12 w-12 text-primary animate-spin" />
            </div>
          </div>
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-400">
              {status === 'uploading' ? 'Uploading to Edge Node...' : 'Running Inference Models...'}
            </h3>
            <p className="text-muted-foreground">Extracting features and identifying violations</p>
          </div>
          <div className="w-full max-w-md space-y-2 bg-card p-6 rounded-xl border">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Neural Engine Status</span>
              <span className="font-medium text-primary">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2 bg-primary/20" />
            <p className="text-xs text-muted-foreground/70 text-right mt-2 font-mono">
              {progress < 50 ? 'Loading tensor graph...' : 'Evaluating confidence scores...'}
            </p>
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
                            <div key={v.id} className="p-3 rounded-lg bg-destructive/10 border border-destructive/30 relative overflow-hidden group/violation hover:bg-destructive/15 transition-colors">
                              <div className="absolute left-0 top-0 bottom-0 w-1 bg-destructive shadow-[0_0_10px_rgba(var(--destructive),0.8)]" />
                              <div className="flex justify-between items-center mb-1">
                                <span className="font-semibold text-sm text-destructive">{v.type}</span>
                                <Badge variant="destructive" className="text-[10px] bg-destructive/80">{(v.confidence * 100).toFixed(1)}%</Badge>
                              </div>
                              <p className="text-xs text-muted-foreground/90 leading-relaxed mt-2">{v.explanation}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <div className="pt-6 flex gap-3">
                    <Button className="w-full gap-2 shadow-[0_0_15px_rgba(0,229,255,0.3)] hover:shadow-[0_0_25px_rgba(0,229,255,0.5)] transition-shadow">
                      <CheckCircle2 className="w-4 h-4" /> Verify Evidence
                    </Button>
                    <Button variant="outline" className="w-full gap-2 border-border hover:bg-secondary" onClick={() => {setStatus('idle'); setFile(null);}}>
                      <RefreshCw className="w-4 h-4" /> Reset
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
