import { useState } from 'react';
import { toast } from 'sonner';
import Chart from './components/chart';
import { ReportResult, ScanResult } from './lib/types';
import { getReport, performScan } from './lib/api';
import ScanCard from './components/ScanCard';
import { ScrollArea } from './components/ui/scroll-area';
import ThemeSwitch from './components/theme-switch';
import ScanResultsTable from './components/scans-result-table';
import { Alert, AlertDescription, AlertTitle } from './components/ui/alert';
import { RocketIcon } from 'lucide-react';

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [scanResult, setScanResult] = useState<ReportResult | null>(null);

  const handleClick = async () => {
    setIsLoading(true);
    toast.info('Scanning website...');

    try {
      const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });
      const tabUrl = tab.url;

      if (!tabUrl) {
        throw new Error('No URL found');
      }

      const scanResult: ScanResult = await performScan(tabUrl);
      const report: ReportResult = await getReport(scanResult.scan_id);

      setScanResult(report);

      toast.success('Scan completed successfully');
    } catch (error) {
      console.error('Error during scan:', error);
      if (error instanceof Error) {
        toast.error(`Error scanning website: ${error.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollArea className=" w-[600px] h-[600px] rounded-md  border p-6 space-y-10">
      <div className="flex mb-4 items-center justify-between">
        <h1 className="text-3xl">Rapid Scan</h1>
        <ThemeSwitch />
      </div>
      <ScanCard isLoading={isLoading} handleClick={handleClick} />
      <div className="mt-4 mb-1">
        {scanResult && (
          <>
            <Alert className="mb-3">
              <RocketIcon className="h-4 w-4" />
              <AlertTitle>Scanning Done!</AlertTitle>
              <AlertDescription>
                Scan Results for {scanResult?.url}
              </AlertDescription>
            </Alert>
            <ScanResultsTable scans={scanResult?.scans || {}} />
          </>
        )}
      </div>
      <div className="my-4">
        {scanResult?.total && <Chart reportResult={scanResult} />}
      </div>
    </ScrollArea>
  );
};

export default App;
