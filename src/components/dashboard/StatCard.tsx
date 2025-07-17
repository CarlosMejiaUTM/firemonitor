interface StatCardProps {
  icon: string;
  title: string;
  value: string;
  valueColor?: string;
}

function StatCard({ icon, title, value, valueColor = 'text-black' }: StatCardProps) {
  return (
    <div className="bg-gray-50 p-4 rounded-lg flex items-center space-x-4">
      <div className="text-4xl">{icon}</div>
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <p className={`text-2xl font-bold ${valueColor}`}>{value}</p>
      </div>
    </div>
  );
}

export default StatCard;