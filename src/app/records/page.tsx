"use client"

import { useState, useEffect } from "react";
import { Search, Filter, Download, MoreHorizontal, Eye, Camera } from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { mockGetEvidenceRecords } from "@/services/api";
import { EvidenceRecord } from "@/types";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { format } from "date-fns";
import Link from "next/link";

export default function RecordsPage() {
  const [records, setRecords] = useState<EvidenceRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    mockGetEvidenceRecords().then(data => {
      setRecords(data);
      setLoading(false);
    });
  }, []);

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Verified': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
      case 'Rejected': return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'Issued': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      default: return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Violation Records</h1>
          <p className="text-muted-foreground mt-1">Enterprise evidence database and management.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2 border-border bg-card/50 hover:bg-secondary">
            <Filter className="w-4 h-4" /> Filters
          </Button>
          <Button className="gap-2 shadow-[0_0_15px_rgba(0,229,255,0.3)]">
            <Download className="w-4 h-4" /> Export CSV
          </Button>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card/40 backdrop-blur-md overflow-hidden shadow-sm">
        <div className="p-4 border-b border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by vehicle number or ID..."
              className="pl-9 bg-background/50 border-border"
            />
          </div>
          <div className="flex gap-2 text-sm text-muted-foreground w-full sm:w-auto justify-end">
             <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500" /> Verified</span>
             <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-amber-500" /> Pending</span>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow className="hover:bg-transparent border-border">
                <TableHead className="w-[120px] font-semibold text-foreground">Evidence ID</TableHead>
                <TableHead className="font-semibold text-foreground">Vehicle Info</TableHead>
                <TableHead className="font-semibold text-foreground">Violation</TableHead>
                <TableHead className="font-semibold text-foreground">Timestamp & Location</TableHead>
                <TableHead className="font-semibold text-foreground">Confidence</TableHead>
                <TableHead className="font-semibold text-foreground">Status</TableHead>
                <TableHead className="text-right font-semibold text-foreground">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center h-48 text-muted-foreground">
                    <div className="flex flex-col items-center justify-center space-y-3">
                       <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                       <p>Retrieving database records...</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : records.map((record) => (
                <TableRow key={record.id} className="group hover:bg-muted/30 transition-colors border-border/50">
                  <TableCell className="font-mono text-xs font-medium text-muted-foreground">
                    {record.id.toUpperCase()}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-md overflow-hidden bg-black/80 border border-border shrink-0">
                        <img src={record.thumbnailUrl} alt="Thumbnail" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      <div>
                        <Badge variant="outline" className="font-mono text-sm border-primary/30 text-primary bg-primary/5 px-2 py-0.5 shadow-[0_0_5px_rgba(0,229,255,0.1)]">
                          {record.vehicleNumber}
                        </Badge>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium text-foreground">{record.violationType}</span>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <p className="text-sm text-foreground">{format(new Date(record.timestamp), 'MMM d, yyyy HH:mm:ss')}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                        <Camera className="w-3 h-3 text-primary/70" /> 
                        <span className="truncate max-w-[150px]">{record.location}</span>
                        <span className="text-[10px] bg-secondary px-1 rounded">{record.cameraInfo}</span>
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-1.5 rounded-full bg-secondary overflow-hidden">
                        <div className="h-full bg-primary shadow-[0_0_8px_rgba(0,229,255,0.8)]" style={{ width: `${record.confidence * 100}%` }} />
                      </div>
                      <span className="text-xs font-medium text-foreground">{(record.confidence * 100).toFixed(1)}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getStatusColor(record.status)}>
                      {record.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-[180px] bg-card border-border">
                        <DropdownMenuLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Record Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator className="bg-border" />
                        <DropdownMenuItem asChild className="cursor-pointer hover:bg-secondary">
                          <Link href={`/records/${record.id}`} className="flex items-center">
                            <Eye className="mr-2 h-4 w-4 text-primary" />
                            View Full Analysis
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer hover:bg-secondary text-emerald-500">Verify Evidence</DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer text-destructive focus:bg-destructive/10 focus:text-destructive">Reject as False Positive</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        <div className="p-4 border-t border-border flex items-center justify-between text-sm text-muted-foreground bg-muted/10">
          <p>Showing <span className="font-medium text-foreground">{records.length}</span> of <span className="font-medium text-foreground">124,592</span> records</p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled className="border-border">Previous</Button>
            <Button variant="outline" size="sm" className="border-border hover:bg-secondary">Next</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
