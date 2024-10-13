import { TrendingUp } from 'lucide-react';
import { Label, Pie, PieChart } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { ReportResult } from '@/lib/types';

export const description = 'Vulnerability Scan Results';

const generateChartData = (reportResult: ReportResult) => {
  const cleanSites = Object.values(reportResult.scans).filter(
    scan => scan.result === 'clean site'
  ).length;
  const unratedSites = Object.values(reportResult.scans).filter(
    scan => scan.result === 'unrated site'
  ).length;
  const maliciousSites = reportResult.positives;

  return [
    { category: 'clean', count: cleanSites, fill: 'hsl(var(--chart-1))' },
    { category: 'unrated', count: unratedSites, fill: 'hsl(var(--chart-2))' },
    {
      category: 'malicious',
      count: maliciousSites,
      fill: 'hsl(var(--chart-3))',
    },
  ];
};

const chartConfig = {
  count: {
    label: 'Count',
  },
  clean: {
    label: 'Clean',
    color: 'hsl(var(--chart-1))',
  },
  unrated: {
    label: 'Unrated',
    color: 'hsl(var(--chart-2))',
  },
  malicious: {
    label: 'Potentially Malicious',
    color: 'hsl(var(--chart-3))',
  },
} satisfies ChartConfig;

interface ChartProps {
  reportResult: ReportResult;
}

const Chart = ({ reportResult }: ChartProps) => {
  const chartData = generateChartData(reportResult);

  return (
    <Card className="flex flex-col mb-4">
      <CardHeader className="items-center pb-0">
        <CardTitle>Vulnerability Scan Results</CardTitle>
        <CardDescription>{reportResult.scan_date}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="category"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {reportResult.total.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Total Scans
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          {reportResult.positives > 0 ? (
            <>
              Potential threats detected{' '}
              <TrendingUp className="h-4 w-4 text-red-500" />
            </>
          ) : (
            <>
              No threats detected{' '}
              <TrendingUp className="h-4 w-4 text-green-500" />
            </>
          )}
        </div>
        <div className="leading-none text-muted-foreground">
          URL Scanned: {reportResult.url}
        </div>
      </CardFooter>
    </Card>
  );
};

export default Chart;
