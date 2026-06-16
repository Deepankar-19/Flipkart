import { AnalysisResult, EvidenceRecord } from "../types";

// Mock delays
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockAnalyzeImage = async (file: File): Promise<{ jobId: string; status: string }> => {
  await delay(800); // Network latency mock
  return {
    jobId: `job_${Math.random().toString(36).substr(2, 9)}`,
    status: "processing"
  };
};

export const mockPollJobStatus = async (jobId: string, pollCount: number): Promise<AnalysisResult> => {
  await delay(1000);
  
  if (pollCount < 3) {
    return {
      jobId,
      status: 'processing',
      timestamp: new Date().toISOString(),
      originalImage: '',
      detections: [],
      processingTimeMs: 0
    };
  }

  // After 3 polls, return completed mock data
  return {
    jobId,
    status: 'completed',
    timestamp: new Date().toISOString(),
    originalImage: 'https://images.unsplash.com/photo-1554223090-b1d5c2e36502?auto=format&fit=crop&q=80',
    annotatedImage: 'https://images.unsplash.com/photo-1554223090-b1d5c2e36502?auto=format&fit=crop&q=80', // Replace with an annotated version later if needed
    processingTimeMs: 2450,
    detections: [
      {
        id: 'det_1',
        type: 'Motorcycle',
        confidence: 0.98,
        boundingBox: { x: 120, y: 340, width: 200, height: 250 },
        ocr: {
          text: 'KA01AB1234',
          confidence: 0.95,
          boundingBox: { x: 150, y: 500, width: 100, height: 40 }
        },
        violations: [
          {
            id: 'viol_1',
            type: 'Helmet Non-Compliance',
            confidence: 0.99,
            severity: 'critical',
            explanation: 'Rider is not wearing a safety helmet. Head region fully exposed.',
            boundingBox: { x: 160, y: 350, width: 80, height: 80 }
          },
          {
            id: 'viol_2',
            type: 'Triple Riding',
            confidence: 0.88,
            severity: 'high',
            explanation: 'Detected 3 distinct persons on a single two-wheeler.',
            boundingBox: { x: 140, y: 350, width: 160, height: 200 }
          }
        ]
      }
    ]
  };
};

export const mockGetEvidenceRecords = async (): Promise<EvidenceRecord[]> => {
  await delay(600);
  return [
    {
      id: 'ev_1',
      vehicleNumber: 'TN09AB1234',
      violationType: 'Red-Light Violation',
      confidence: 0.97,
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      status: 'Pending Review',
      thumbnailUrl: 'https://images.unsplash.com/photo-1518175510652-33cc9a08eb67?auto=format&fit=crop&w=300&q=80',
      fullImageUrl: 'https://images.unsplash.com/photo-1518175510652-33cc9a08eb67?auto=format&fit=crop&q=80',
      location: 'Intersection 4, Anna Salai',
      cameraInfo: 'CAM-N-442'
    },
    {
      id: 'ev_2',
      vehicleNumber: 'KA03XY9876',
      violationType: 'Wrong-Side Driving',
      confidence: 0.99,
      timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
      status: 'Verified',
      thumbnailUrl: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=300&q=80',
      fullImageUrl: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&q=80',
      location: 'Ring Road, Sector 3',
      cameraInfo: 'CAM-W-102'
    },
    {
      id: 'ev_3',
      vehicleNumber: 'MH12PQ4567',
      violationType: 'Helmet Non-Compliance',
      confidence: 0.94,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
      status: 'Issued',
      thumbnailUrl: 'https://images.unsplash.com/photo-1558981806-ec527fa842a9?auto=format&fit=crop&w=300&q=80',
      fullImageUrl: 'https://images.unsplash.com/photo-1558981806-ec527fa842a9?auto=format&fit=crop&q=80',
      location: 'MG Road',
      cameraInfo: 'CAM-S-88'
    }
  ];
}
