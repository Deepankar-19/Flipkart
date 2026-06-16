export type ViolationType = 
  | 'Helmet Non-Compliance'
  | 'Triple Riding'
  | 'Seatbelt Non-Compliance'
  | 'Wrong-Side Driving'
  | 'Stop-Line Violation'
  | 'Red-Light Violation'
  | 'Illegal Parking'
  | 'Over-Speeding';

export interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface OCRResult {
  text: string;
  confidence: number;
  boundingBox: BoundingBox;
}

export interface Violation {
  id: string;
  type: ViolationType;
  confidence: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
  explanation: string;
  boundingBox: BoundingBox;
}

export interface VehicleDetection {
  id: string;
  type: 'Car' | 'Motorcycle' | 'Truck' | 'Bus' | 'Auto' | 'Unknown';
  confidence: number;
  boundingBox: BoundingBox;
  ocr?: OCRResult;
  violations: Violation[];
}

export interface AnalysisResult {
  jobId: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  timestamp: string;
  originalImage: string;
  annotatedImage?: string;
  detections: VehicleDetection[];
  processingTimeMs: number;
}

export interface EvidenceRecord {
  id: string;
  vehicleNumber: string;
  violationType: ViolationType;
  confidence: number;
  timestamp: string;
  status: 'Pending Review' | 'Verified' | 'Rejected' | 'Issued';
  thumbnailUrl: string;
  fullImageUrl: string;
  location: string;
  cameraInfo: string;
}

export interface AnalyticsData {
  totalViolations: number;
  violationsToday: number;
  detectionAccuracy: number;
  ocrSuccessRate: number;
  activeCameras: number;
  averageProcessingTime: number;
  trendData: Array<{
    date: string;
    violations: number;
  }>;
  categoryDistribution: Array<{
    name: string;
    value: number;
  }>;
}
