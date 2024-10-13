import { Button } from './ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Loader2 } from 'lucide-react';

interface ScanCardProps {
  isLoading: boolean;
  handleClick: () => Promise<void>;
}

const ScanCard = ({ isLoading, handleClick }: ScanCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Website Vulnerability Scanner</CardTitle>
        <CardDescription>
          Scan your website for vulnerabilities and get a detailed report on
          what to fix.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button onClick={handleClick} disabled={isLoading}>
          {isLoading && <Loader2 className="size-6 mr-2 animate-spin" />}
          Scan
        </Button>
      </CardContent>
    </Card>
  );
};

export default ScanCard;
