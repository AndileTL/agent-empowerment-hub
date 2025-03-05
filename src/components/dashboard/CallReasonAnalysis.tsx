
import React from "react";
import { Card } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

interface CallReasonItem {
  name: string;
  value: number;
  color: string;
}

interface CallReasonAnalysisProps {
  data: CallReasonItem[];
  chartType: string;
  onChartTypeChange: (type: string) => void;
}

const CallReasonAnalysis: React.FC<CallReasonAnalysisProps> = ({ 
  data, 
  chartType, 
  onChartTypeChange 
}) => {
  return (
    <section>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Call Reason Analysis</h2>
        <div className="flex gap-2">
          <button 
            className={`px-3 py-1 rounded-md ${chartType === 'pie' ? 'bg-primary-500 text-white' : 'bg-gray-200'}`}
            onClick={() => onChartTypeChange('pie')}
          >
            Pie Chart
          </button>
          <button 
            className={`px-3 py-1 rounded-md ${chartType === 'bar' ? 'bg-primary-500 text-white' : 'bg-gray-200'}`}
            onClick={() => onChartTypeChange('bar')}
          >
            Bar Chart
          </button>
        </div>
      </div>
      <Card className="p-6">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === 'pie' ? (
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
                <Legend layout="vertical" verticalAlign="middle" align="right" />
              </PieChart>
            ) : (
              <BarChart
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => `${value}%`} />
                <Legend />
                <Bar dataKey="value" name="Percentage" fill="#8884d8">
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      </Card>
    </section>
  );
};

export default CallReasonAnalysis;
