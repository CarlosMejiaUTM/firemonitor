interface SeverityBadgeProps {
  severity: 'Alta' | 'Media' | 'Baja' | 'Critica';
}

export default function SeverityBadge({ severity }: SeverityBadgeProps) {
  // MEJORA: El objeto de estilos ahora define el color del punto y el del fondo del texto.
  const severityStyles = {
    Critica: {
      dot: "bg-red-500",
      main: "bg-red-100 text-red-800",
    },
    Alta: {
      dot: "bg-orange-500",
      main: "bg-orange-100 text-orange-800",
    },
    Media: {
      dot: "bg-yellow-500",
      main: "bg-yellow-100 text-yellow-800",
    },
    Baja: {
      dot: "bg-green-500",
      main: "bg-green-100 text-green-800",
    },
  };

  const currentStyle = severityStyles[severity] || { dot: 'bg-gray-400', main: 'bg-gray-100' };

  return (
    // MEJORA: Se usa 'inline-flex' para alinear el punto de color con el texto.
    <div
      className={`inline-flex items-center gap-x-2 px-2 py-1 rounded-full text-xs font-bold ${currentStyle.main}`}
    >
      <span className={`h-2 w-2 rounded-full ${currentStyle.dot}`}></span>
      <span>{severity}</span>
    </div>
  );
}