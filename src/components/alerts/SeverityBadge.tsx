interface SeverityBadgeProps {
  severity: 'Alta' | 'Media' | 'Baja' | 'Critica';
}

export default function SeverityBadge({ severity }: SeverityBadgeProps) {
  const baseClasses = "px-2.5 py-0.5 rounded-full text-xs font-semibold";
  
  const styles = {
    Critica: "bg-red-200 text-red-800",
    Alta: "bg-orange-100 text-orange-800",
    Media: "bg-yellow-100 text-yellow-800",
    Baja: "bg-green-100 text-green-800",
  };

  return (
    <span className={`${baseClasses} ${styles[severity] || 'bg-gray-100'}`}>
      {severity}
    </span>
  );
}