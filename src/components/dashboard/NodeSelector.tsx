interface Node {
  id: string;
  nombre: string; // Asegúrate que el tipo use 'nombre'
}

interface NodeSelectorProps {
  nodes: Node[];
  selectedNodeId: string;
  onSelectNode: (nodeId: string) => void;
}

export default function NodeSelector({ nodes, selectedNodeId, onSelectNode }: NodeSelectorProps) {
  return (
    <div className="mb-6">
      <label htmlFor="node-select" className="block text-sm font-medium text-gray-700 mb-1">
        Seleccionar Nodo
      </label>
      <select
        id="node-select"
        value={selectedNodeId}
        onChange={(e) => onSelectNode(e.target.value)}
        className="w-full md:w-1/3 bg-white border border-gray-300 text-gray-700 py-2 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
      >
        {nodes.map(node => (
          <option key={node.id} value={node.id}>
            {/* Aquí está el cambio: de node.name a node.nombre */}
            {node.nombre}
          </option>
        ))}
      </select>
    </div>
  );
}