import { useState } from 'react';
import ReactFlow, { 
  Background, 
  Controls, 
  MiniMap, 
  addEdge, 
  applyEdgeChanges, 
  applyNodeChanges
} from 'react-flow-renderer';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Separator } from '../components/ui/separator';
import DiagramToolbar from '../components/diagram/DiagramToolbar';
import NodePanel from '../components/diagram/NodePanel';
import { 
  ChevronLeft, 
  Download, 
  Save
} from 'lucide-react';
import { useToast } from '../components/ui/use-toast';

const initialNodes = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Start' },
    position: { x: 250, y: 25 },
  },
];

export default function DiagramEditor() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState([]);
  const [diagramName, setDiagramName] = useState('Untitled Diagram');
  const { toast } = useToast();

  const onNodesChange = (changes) => {
    setNodes((nds) => applyNodeChanges(changes, nds));
  };

  const onEdgesChange = (changes) => {
    setEdges((eds) => applyEdgeChanges(changes, eds));
  };

  const onConnect = (connection) => {
    setEdges((eds) => addEdge(connection, eds));
  };

  const handleSave = () => {
    // In a real app, this would save to a backend or local storage
    toast({
      title: "Diagram saved",
      description: `${diagramName} has been saved successfully.`,
    });
  };

  const handleExport = () => {
    // In a real app, this would export the diagram as an image or JSON
    const dataStr = JSON.stringify({ nodes, edges, name: diagramName });
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `${diagramName.replace(/\s+/g, '-').toLowerCase()}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    toast({
      title: "Diagram exported",
      description: `${diagramName} has been exported as JSON.`,
    });
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 shadow-sm border-b dark:border-slate-700 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <ChevronLeft size={16} />
                Back
              </Button>
            </Link>
            <Separator orientation="vertical" className="h-6" />
            <div>
              <input
                type="text"
                value={diagramName}
                onChange={(e) => setDiagramName(e.target.value)}
                className="text-xl font-semibold bg-transparent border-0 border-b border-transparent hover:border-slate-300 focus:border-slate-400 focus:outline-none p-1"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2" onClick={handleExport}>
              <Download size={16} />
              Export
            </Button>
            <Button size="sm" className="gap-2" onClick={handleSave}>
              <Save size={16} />
              Save
            </Button>
          </div>
        </div>
      </header>

      {/* Toolbar */}
      <DiagramToolbar />

      {/* Main Editor Area */}
      <div className="flex-1 flex">
        {/* Left Panel */}
        <NodePanel setNodes={setNodes} nodes={nodes} />

        {/* Diagram Canvas */}
        <div className="flex-1 h-full">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView
          >
            <Controls />
            <MiniMap />
            <Background variant="dots" gap={12} size={1} />
          </ReactFlow>
        </div>
      </div>
    </div>
  );
}