// src/components/dashboard/DataChart.tsx
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ChartData {
  time: string;
  temperatura: number;
}

interface DataChartProps {
  data: ChartData[];
}

// MEJORA: Componente para un Tooltip personalizado y con mejor estilo.
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-800 text-white p-3 rounded-lg shadow-xl border border-gray-700">
        <p className="text-sm font-bold">{`${payload[0].value}°C`}</p>
        <p className="text-xs text-gray-400">{`Hora: ${label}`}</p>
      </div>
    );
  }
  return null;
};

export default function DataChart({ data }: DataChartProps) {
  // Asegurarnos de que el gráfico no se renderice si no hay datos suficientes
  if (!data || data.length < 2) {
    return (
      <div className="flex items-center justify-center h-[300px] text-gray-500 bg-gray-50 rounded-md">
        Datos insuficientes para mostrar la gráfica.
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      {/* MEJORA: Se usa AreaChart para permitir un relleno con gradiente. */}
      <AreaChart
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        {/* MEJORA: Definición del gradiente para el relleno del área. */}
        <defs>
          <linearGradient id="colorTemperatura" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
          </linearGradient>
        </defs>
        
        {/* MEJORA: Ejes y cuadrícula más sutiles para un look más limpio. */}
        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
        <XAxis 
          dataKey="time" 
          stroke="#9ca3af" 
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis 
          stroke="#9ca3af" 
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}°`}
        />
        
        <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#ef4444', strokeWidth: 1, strokeDasharray: '3 3' }} />
        
        {/* MEJORA: Se usa <Area> en lugar de <Line> para aplicar el gradiente. */}
        <Area 
          type="monotone" 
          dataKey="temperatura" 
          stroke="#ef4444" 
          strokeWidth={3}
          fillOpacity={1} 
          fill="url(#colorTemperatura)" 
          activeDot={{ r: 8, stroke: '#fff', strokeWidth: 2, fill: '#ef4444' }} 
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}