import { useEffect, useState, useCallback, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactFlow, {
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Panel,
  MarkerType,
} from "reactflow";
import "reactflow/dist/style.css";
import { useDiagramStore } from "../store/diagramStore";
import { Layout } from "../components/Layout";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { ShapeNode } from "../components/diagram/ShapeNode";
import { TextNode } from "../components/diagram/TextNode";
import { ImageNode } from "../components/diagram/ImageNode";
import { NodeTypeSelector } from "../components/diagram/NodeTypeSelector";
import { Save, ArrowLeft, Trash2 } from "lucide-react";
import { useToast } from "../components/ui/use-toast";
import { v4 as uuidv4 } from 'uuid';

// Define the node types for ReactFlow
const nodeTypes = {
  shape: ShapeNode,
  text: TextNode,
  image: ImageNode,
};

export default function DiagramEditor() {
  const { id } = useParams();
  const { toast } = useToast();
  const navigate = useNavigate();
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);
  const { getDiagram, saveDiagram, removeDiagram } = useDiagramStore();
  
  // Initialize with saved diagram or new one
  const diagram = id ? getDiagram(id) : null;
  const [diagramName, setDiagramName] = useState(diagram?.name || "Untitled Diagram");
  const [nodes, setNodes, onNodesChange] = useNodesState(diagram?.nodes || []);
  const [edges, setEdges, onEdgesChange] = useEdgesState(diagram?.edges || []);
  
  // Handle connections between nodes
  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => 
      addEdge({ 
        ...params, 
        type: 'smoothstep', 
        markerEnd: { type: MarkerType.Arrow } 
      }, eds)),
    [setEdges]
  );

  // Save the diagram to store
  const handleSave = () => {
    const diagramData = {
      id: id || uuidv4(),
      name: diagramName,
      nodes,
      edges,
      lastEdited: Date.now(),
    };
    
    saveDiagram(diagramData);
    
    toast({
      title: "Diagram saved",
      description: "Your diagram has been successfully saved."
    });
    
    if (!id) {
      navigate(`/editor/${diagramData.id}`);
    }
  };

  // Handle drag and drop from the shape selector
  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      if (!reactFlowWrapper.current || !reactFlowInstance) return;

      const type = event.dataTransfer.getData('application/reactflow');
      
      // Check if the dropped element is valid
      if (!type) return;

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      let newNode;
      
      switch (type) {
        case 'shape':
          newNode = {
            id: `shape_${uuidv4()}`,
            type,
            position,
            data: { shape: 'rectangle', width: 100, height: 60, color: '#c8e6c9' },
          };
          break;
        case 'text':
          newNode = {
            id: `text_${uuidv4()}`,
            type,
            position,
            data: { text: 'Edit this text', fontSize: 16 },
          };
          break;
        case 'image':
          newNode = {
            id: `image_${uuidv4()}`,
            type,
            position,
            data: { 
              src: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=250&auto=format&fit=crop',
              width: 150,
              height: 100
            },
          };
          break;
        default:
          return;
      }

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );

  const handleDelete = () => {
    if (id) {
      removeDiagram(id);
      toast({
        title: "Diagram deleted",
        description: "Your diagram has been successfully deleted."
      });
      navigate('/');
    }
  };

  // Auto-save on changes
  useEffect(() => {
    const autoSaveTimer = setTimeout(() => {
      if (nodes.length > 0 || edges.length > 0) {
        handleSave();
      }
    }, 30000); // Auto-save every 30 seconds

    return () => clearTimeout(autoSaveTimer);
  }, [nodes, edges, diagramName]);

  return (
    <Layout>
      <div className="flex flex-col h-screen">
        <div className="flex justify-between items-center p-4 border-b">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate('/')} className="flex items-center gap-2">
              <ArrowLeft size={18} /> Back
            </Button>
            <Input
              value={diagramName}
              onChange={(e) => setDiagramName(e.target.value)}
              className="w-64 font-medium"
            />
          </div>
          <div className="flex gap-2">
            <Button 
              variant="destructive" 
              className="flex items-center gap-2"
              onClick={handleDelete}
            >
              <Trash2 size={18} /> Delete
            </Button>
            <Button onClick={handleSave} className="flex items-center gap-2">
              <Save size={18} /> Save
            </Button>
          </div>
        </div>
        
        <div className="flex flex-grow overflow-hidden">
          <div className="w-64 p-4 border-r overflow-y-auto">
            <h3 className="font-medium mb-4">Diagram Elements</h3>
            <NodeTypeSelector />
          </div>
          
          <div className="flex-grow" ref={reactFlowWrapper}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onInit={setReactFlowInstance}
              onDrop={onDrop}
              onDragOver={onDragOver}
              nodeTypes={nodeTypes}
              deleteKeyCode="Delete"
              fitView
            >
              <Controls />
              <Background color="#aaa" gap={16} />
            </ReactFlow>
          </div>
        </div>
      </div>
    </Layout>
  );
}