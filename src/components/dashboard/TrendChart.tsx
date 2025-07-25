// src/components/dashboard/TrendChart.tsx
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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

// MEJORA: Tooltip personalizado para un look profesional.
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-800 text-white p-2 px-3 rounded-lg shadow-xl border border-gray-700">
        <p className="text-sm font-bold">{`${payload[0].value}`}</p>
        <p className="text-xs text-gray-400">{`Hora: ${label}`}</p>
      </div>
    );
  }
  return null;
};

export default function TrendChart({ data, title, lineColor, dataKey }: TrendChartProps) {
  // MEJORA: Manejo de estado cuando no hay suficientes datos para mostrar.
  if (!data || data.length < 2) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md h-full flex flex-col">
        <h3 className="font-bold text-gray-800 mb-4">{title}</h3>
        <div className="flex-grow flex items-center justify-center text-sm text-gray-500 bg-gray-50 rounded-md">
          No hay datos disponibles.
        </div>
      </div>
    );
  }

  const gradientId = `gradient-${dataKey}`;

  return (
    // MEJORA: Se usa flexbox para que el gráfico ocupe el espacio disponible.
    <div className="bg-white p-4 rounded-lg shadow-md h-full flex flex-col">
      <h3 className="font-bold text-gray-800 mb-4">{title}</h3>
      <div className="flex-grow">
        <ResponsiveContainer width="100%" height="100%">
          {/* MEJORA: Se usa AreaChart para el relleno con gradiente. */}
          <AreaChart
            data={data}
            margin={{ top: 5, right: 20, left: -10, bottom: 0 }}
          >
            {/* MEJORA: Gradiente definido dinámicamente con el color del prop. */}
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={lineColor} stopOpacity={0.7}/>
                <stop offset="95%" stopColor={lineColor} stopOpacity={0}/>
              </linearGradient>
            </defs>
            
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            
            {/* MEJORA: Ejes con estilo minimalista. */}
            <XAxis dataKey="time" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
            
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: lineColor, strokeWidth: 1 }} />
            
            <Area 
              type="monotone" 
              dataKey={dataKey} 
              stroke={lineColor} 
              strokeWidth={2.5}
              fillOpacity={1} 
              fill={`url(#${gradientId})`}
              activeDot={{ r: 6, stroke: '#fff', strokeWidth: 2, fill: lineColor }} 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}