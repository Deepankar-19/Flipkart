"use client"

import { Camera, Image as ImageIcon, Crosshair, Scale, Type, FileText, BarChart3, ArrowDown, Network } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

const architectureSteps = [
  {
    title: "Traffic Camera Feed",
    description: "High-resolution edge node capture at 60fps.",
    icon: Camera,
    tech: "RTSP / WebRTC",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    border: "border-blue-500/30"
  },
  {
    title: "Image Preprocessing",
    description: "Noise reduction, perspective correction, and contrast enhancement.",
    icon: ImageIcon,
    tech: "OpenCV / CUDA",
    color: "text-indigo-500",
    bg: "bg-indigo-500/10",
    border: "border-indigo-500/30"
  },
  {
    title: "Vehicle Detection",
    description: "Identifies object class (Car, Bike) and tracking IDs.",
    icon: Crosshair,
    tech: "YOLOv8 / TensorRT",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30"
  },
  {
    title: "Violation Rule Engine",
    description: "Evaluates spatial relationships (e.g. helmet missing, triple riding).",
    icon: Scale,
    tech: "Custom Heuristics / Python",
    color: "text-amber-500",
    bg: "bg-amber-500/10",
    border: "border-amber-500/30"
  },
  {
    title: "OCR Engine",
    description: "Extracts alphanumeric registration numbers from cropped plates.",
    icon: Type,
    tech: "Tesseract / EasyOCR",
    color: "text-orange-500",
    bg: "bg-orange-500/10",
    border: "border-orange-500/30"
  },
  {
    title: "Evidence Generator",
    description: "Collates annotated images, timestamp, and confidence scores.",
    icon: FileText,
    tech: "FastAPI / Node.js",
    color: "text-red-500",
    bg: "bg-red-500/10",
    border: "border-red-500/30"
  },
  {
    title: "Analytics Dashboard",
    description: "Visualizes real-time metrics and allows manual evidence verification.",
    icon: BarChart3,
    tech: "Next.js / React",
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/30"
  }
];

export default function ArchitecturePage() {
  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto pb-12">
      <div className="relative">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background blur-2xl" />
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Network className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">System Architecture</h1>
        </div>
        <p className="text-muted-foreground text-lg max-w-2xl">
          A high-level view of the end-to-end AI inference pipeline that powers the TrafficVision platform. Designed for high throughput and explainability.
        </p>
      </div>

      <div className="mt-8 flex flex-col items-center">
        {architectureSteps.map((step, index) => (
          <div key={index} className="flex flex-col items-center w-full max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              className="w-full"
            >
              <Card className={`relative overflow-hidden border ${step.border} bg-card/40 backdrop-blur-sm hover:bg-card/60 transition-colors group`}>
                <div className={`absolute left-0 top-0 bottom-0 w-1 ${step.bg.replace('/10', '')} shadow-[0_0_10px_rgba(0,0,0,0.5)]`} />
                <CardHeader className="pb-3 flex flex-row items-center gap-4">
                  <div className={`p-3 rounded-xl ${step.bg} ${step.color} group-hover:scale-110 transition-transform`}>
                    <step.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <CardTitle className="text-xl flex items-center gap-3">
                      {step.title}
                    </CardTitle>
                    <CardDescription className="text-sm mt-1">{step.description}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="pt-0 pl-20">
                  <span className={`inline-block px-2.5 py-1 rounded text-[10px] font-mono font-bold uppercase tracking-wider ${step.bg} ${step.color} border ${step.border}`}>
                    Tech Stack: {step.tech}
                  </span>
                </CardContent>
              </Card>
            </motion.div>
            
            {index < architectureSteps.length - 1 && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ delay: (index * 0.15) + 0.1, duration: 0.3 }}
                className="py-4"
              >
                <ArrowDown className="w-6 h-6 text-muted-foreground/50 animate-pulse" />
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
