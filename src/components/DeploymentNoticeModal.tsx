"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Check, AlertTriangle, FileArchive } from "lucide-react";

export function DeploymentNoticeModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isRead, setIsRead] = useState(true); // default true to avoid hydration mismatch/flash
  const [envelopeOpened, setEnvelopeOpened] = useState(false);

  useEffect(() => {
    // We only check once the component has mounted on the client
    const hasRead = sessionStorage.getItem("deployment-notice-read");
    if (!hasRead) {
      setIsRead(false);
      setIsOpen(true);
    }
  }, []);

  const handleUnderstand = () => {
    sessionStorage.setItem("deployment-notice-read", "true");
    setIsOpen(false);
    setTimeout(() => setIsRead(true), 500); // Wait for exit animation
  };

  if (isRead) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6"
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-background/90 backdrop-blur-md" />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg mx-auto"
          >
            {!envelopeOpened ? (
              <motion.div
                initial={{ rotate: -5 }}
                animate={{ rotate: 0 }}
                whileHover={{ scale: 1.05, rotate: 2 }}
                onClick={() => setEnvelopeOpened(true)}
                className="cursor-pointer group flex flex-col items-center justify-center p-12 bg-card border border-primary/20 shadow-2xl rounded-2xl overflow-hidden relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <Mail className="w-24 h-24 text-primary mb-6 animate-pulse" strokeWidth={1} />
                <h2 className="text-2xl font-bold tracking-tight text-foreground mb-2">You have a new message</h2>
                <p className="text-muted-foreground text-center">Click to open this important deployment note</p>
                <div className="mt-8 px-6 py-2 bg-primary/10 text-primary rounded-full font-medium text-sm border border-primary/20 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                  Open Envelope
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="bg-card border border-primary/30 shadow-2xl rounded-2xl overflow-hidden flex flex-col relative"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
                <div className="bg-primary/5 border-b border-primary/10 p-6 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center shrink-0 border border-primary/30">
                    <AlertTriangle className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold tracking-tight">Deployment Notice</h2>
                    <p className="text-sm text-primary/80">Please read before continuing</p>
                  </div>
                </div>
                
                <div className="p-6 md:p-8 space-y-6 text-foreground/90 leading-relaxed text-[15px]">
                  <p className="text-lg">
                    This deployment is <strong className="text-primary font-semibold text-xl border-b border-primary/30 pb-0.5">frontend-only</strong>. 
                  </p>
                  <p>
                    All the actual features, including backend processing and data persistence, are available in the <span className="inline-flex items-center gap-1.5 font-medium bg-primary/10 border border-primary/20 px-2.5 py-1 rounded-md text-sm text-primary"><FileArchive className="w-3.5 h-3.5"/> zip file</span> submitted and shown in the demo.
                  </p>
                  <div className="bg-muted/30 rounded-xl p-5 border border-border/50 shadow-inner">
                    <p className="text-muted-foreground text-sm">
                      <strong className="text-foreground">Why?</strong> The backend could not be deployed because the free tier limitations of the hosting platforms could not handle its requirements.
                    </p>
                  </div>
                </div>
                
                <div className="p-6 border-t border-border/50 bg-muted/10 flex justify-end">
                  <button
                    onClick={handleUnderstand}
                    className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 hover:scale-105 transition-all active:scale-95"
                  >
                    <Check className="w-4 h-4" />
                    I understand
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
