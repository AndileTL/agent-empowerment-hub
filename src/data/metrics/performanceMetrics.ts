
import { PerformanceMetrics } from "@/types/dashboard";

export const getPerformanceMetrics = (): PerformanceMetrics => ({
  handlingTime: {
    value: "280s",
    target: "300s",
    trend: { value: 5, isPositive: true }
  },
  customerSatisfaction: {
    value: "92",
    target: "90%",
    trend: { value: 2, isPositive: true }
  },
  firstCallResolution: {
    value: "85",
    target: "80%",
    trend: { value: 3, isPositive: false }
  },
  scheduleAdherence: {
    value: "95",
    target: "95%",
    trend: { value: 1, isPositive: true }
  },
  callVolume: {
    value: "1,200",
    trend: { value: 8, isPositive: true }
  },
  serviceLevel: {
    value: "80%",
    trend: { value: 2, isPositive: false }
  }
});
