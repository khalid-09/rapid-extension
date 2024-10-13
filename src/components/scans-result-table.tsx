import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Shield, ShieldAlert, HelpCircle } from 'lucide-react';
import { Scans } from '@/lib/types';

interface ScanResultsTableProps {
  scans: Scans;
}

const ScanResultsTable = ({ scans }: ScanResultsTableProps) => {
  const getStatusIcon = (detected: boolean, result: string) => {
    if (detected) {
      return <ShieldAlert className="h-5 w-5 text-red-500" />;
    } else if (result === 'clean site') {
      return <Shield className="h-5 w-5 text-green-500" />;
    } else {
      return <HelpCircle className="h-5 w-5 text-yellow-500" />;
    }
  };

  return (
    <Table>
      <TableCaption>Scan Results from Various Vendors</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[200px]">Vendor</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Result</TableHead>
          <TableHead className="w-[100px]">Detected</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Object.entries(scans).map(([vendorName, scanResult]) => (
          <TableRow key={vendorName}>
            <TableCell className="font-medium">{vendorName}</TableCell>
            <TableCell>
              {getStatusIcon(scanResult.detected, scanResult.result)}
            </TableCell>
            <TableCell>{scanResult.result}</TableCell>
            <TableCell>{scanResult.detected ? 'Yes' : 'No'}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ScanResultsTable;
