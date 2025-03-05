
import React from "react";
import StatsCard from "@/components/StatsCard";
import { Clock, ThumbsUp, PhoneCall, Calendar, Phone, Users } from "lucide-react";

interface PerformanceMetric {
  value: string;
  target?: string;
  trend: {
    value: number;
    isPositive: boolean;
  };
}

interface PerformanceMetrics {
  handlingTime: PerformanceMetric;
  customerSatisfaction: PerformanceMetric;
  firstCallResolution: PerformanceMetric;
  scheduleAdherence: PerformanceMetric;
  callVolume: PerformanceMetric;
  serviceLevel: PerformanceMetric;
}

interface KeyMetricsProps {
  metrics: PerformanceMetrics;
}

const KeyMetrics: React.FC<KeyMetricsProps> = ({ metrics }) => {
  return (
    <section>
      <h2 className="text-xl font-semibold mb-4">Key Metrics</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
        <StatsCard
          title="Average Handling Time"
          value={metrics.handlingTime.value}
          icon={<Clock />}
          trend={metrics.handlingTime.trend}
          className="bg-white"
        />
        <StatsCard
          title="Customer Satisfaction"
          value={metrics.customerSatisfaction.value + "%"}
          icon={<ThumbsUp />}
          trend={metrics.customerSatisfaction.trend}
          className="bg-white"
        />
        <StatsCard
          title="First Call Resolution"
          value={metrics.firstCallResolution.value + "%"}
          icon={<PhoneCall />}
          trend={metrics.firstCallResolution.trend}
          className="bg-white"
        />
        <StatsCard
          title="Schedule Adherence"
          value={metrics.scheduleAdherence.value + "%"}
          icon={<Calendar />}
          trend={metrics.scheduleAdherence.trend}
          className="bg-white"
        />
        <StatsCard
          title="Call Volume"
          value={metrics.callVolume.value}
          icon={<Phone />}
          trend={metrics.callVolume.trend}
          className="bg-white"
        />
        <StatsCard
          title="Service Level"
          value={metrics.serviceLevel.value}
          icon={<Users />}
          trend={metrics.serviceLevel.trend}
          className="bg-white"
        />
      </div>
    </section>
  );
};

export default KeyMetrics;
