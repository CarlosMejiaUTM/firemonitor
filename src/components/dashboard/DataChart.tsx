// src/components/dashboard/DataChart.tsx
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ChartData {
  time: string;
  temperatura: number;
}

interface DataChartProps {
  data: ChartData[];
}

export default function DataChart({ data }: DataChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
        <XAxis dataKey="time" stroke="#6b7280" />
        <YAxis stroke="#6b7280" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="temperatura" stroke="#ef4444" strokeWidth={2} activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}