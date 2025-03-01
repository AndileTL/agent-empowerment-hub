
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Tooltip } from "@/components/ui/tooltip";
import { Info } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
  description?: string;
}

const StatsCard = ({ title, value, icon, trend, className, description }: StatsCardProps) => {
  return (
    <Card className={cn("p-6 animate-scale-in", className)}>
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-1">
            <p className="text-sm font-medium text-gray-600">{title}</p>
            {description && (
              <Tooltip content={description}>
                <Info className="h-4 w-4 text-gray-400" />
              </Tooltip>
            )}
          </div>
          <h3 className="text-2xl font-semibold mt-2">{value}</h3>
          {trend && (
            <p className={cn(
              "text-sm mt-2 flex items-center gap-1",
              trend.isPositive ? "text-success-600" : "text-error-600"
            )}>
              {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
            </p>
          )}
        </div>
        <div className="text-primary-500">{icon}</div>
      </div>
    </Card>
  );
};

export default StatsCard;
