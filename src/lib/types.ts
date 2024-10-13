export interface ScanResult {
  permalink: string;
  resource: string;
  response_code: number;
  scan_date: string;
  scan_id: string;
  url: string;
  verbose_msg: string;
}

interface VendorScanResult {
  detected: boolean;
  result: string;
}

export interface Scans {
  [vendorName: string]: VendorScanResult;
}

export interface ReportResult {
  filescan_id: string | null;
  permalink: string;
  positives: number;
  resource: string;
  response_code: number;
  scan_date: string;
  scan_id: string;
  scans: Scans;
  total: number;
  url: string;
  verbose_msg: string;
}
