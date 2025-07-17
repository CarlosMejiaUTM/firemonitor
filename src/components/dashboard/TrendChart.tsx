// src/components/dashboard/TrendChart.tsx

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ChartData {
  time: string;
  value: number;
}

interface TrendChartProps {
  data: ChartData[];
  title: string;
  lineColor: string;
  dataKey: string;
}

export default function TrendChart({ data, title, lineColor, dataKey }: TrendChartProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md h-80">
      <h3 className="font-bold text-gray-800 mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: -10, bottom: 25 }} // Ajustado para que quepa todo
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis dataKey="time" stroke="#6b7280" fontSize={12} />
          <YAxis stroke="#6b7280" fontSize={12} />
          <Tooltip 
            contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', border: '1px solid #ccc', borderRadius: '5px' }}
          />
          <Legend />
          <Line type="monotone" dataKey={dataKey} stroke={lineColor} strokeWidth={2} dot={false} activeDot={{ r: 6 }}/>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}