import React, { useState } from 'react';
import { useReactFlow, NodeTypes } from 'reactflow';
import { 
  Square, 
  Diamond, 
  Circle, 
  Trash2,
  Edit,
  Plus,
  Download,
  ArrowDown,
  Type,
  Italic,
  Bold
} from 'lucide-react';
import { toPng } from 'html-to-image';
import { toast } from 'sonner';

import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Input } from '../ui/input';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

interface NodeControlsProps {
  id: string;
}

export function NodeControls() {
  const reactFlowInstance = useReactFlow();
  const [newNodeText, setNewNodeText] = useState('New Node');
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [editNodeText, setEditNodeText] = useState('');
  
  const addNode = (type: string) => {
    const position = reactFlowInstance.getViewport();
    const centerX = (window.innerWidth / 2 - position.x) / position.zoom;
    const centerY = (window.innerHeight / 2 - position.y) / position.zoom;
    
    const newNode = {
      id: `node-${Date.now()}`,
      type,
      position: { x: centerX, y: centerY },
      data: { label: newNodeText }
    };
    
    reactFlowInstance.addNodes(newNode);
    toast.success('Node added');
  };

  const deleteNode = () => {
    const selectedNodes = reactFlowInstance.getNodes().filter(node => node.selected);
    
    if (selectedNodes.length > 0) {
      reactFlowInstance.deleteElements({ 
        nodes: selectedNodes, 
        edges: reactFlowInstance.getEdges().filter(edge => 
          selectedNodes.some(node => 
            node.id === edge.source || node.id === edge.target
          )
        ) 
      });
      toast.success('Deleted selected node(s)');
    } else {
      toast.error('No node selected');
    }
  };

  const handleEditNode = () => {
    const selectedNodes = reactFlowInstance.getNodes().filter(node => node.selected);
    
    if (selectedNodes.length === 1) {
      setSelectedNode(selectedNodes[0].id);
      setEditNodeText(selectedNodes[0].data.label);
    } else if (selectedNodes.length === 0) {
      toast.error('No node selected');
    } else {
      toast.error('Please select only one node to edit');
    }
  };

  const saveNodeEdit = () => {
    if (selectedNode) {
      reactFlowInstance.setNodes(nodes => 
        nodes.map(node => {
          if (node.id === selectedNode) {
            return {
              ...node,
              data: {
                ...node.data,
                label: editNodeText
              }
            };
          }
          return node;
        })
      );
      setSelectedNode(null);
      toast.success('Node updated');
    }
  };

  const exportFlowchart = () => {
    const flowElement = document.querySelector('.react-flow');
    if (!flowElement) {
      toast.error('No flowchart to export');
      return;
    }

    toPng(flowElement as HTMLElement, {
      backgroundColor: '#ffffff',
      quality: 1,
      pixelRatio: 2
    })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = 'flowchart.png';
        link.href = dataUrl;
        link.click();
        toast.success('Flowchart exported');
      })
      .catch((error) => {
        console.error('Error exporting flowchart:', error);
        toast.error('Failed to export flowchart');
      });
  };

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-10 bg-white rounded-lg shadow-lg p-2 border">
      <div className="flex space-x-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Plus className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => addNode('process')}>
              <Square className="mr-2 h-4 w-4" />
              Process
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => addNode('decision')}>
              <Diamond className="mr-2 h-4 w-4" />
              Decision
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => addNode('terminal')}>
              <Circle className="mr-2 h-4 w-4" />
              Start/End
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => addNode('io')}>
              <ArrowDown className="mr-2 h-4 w-4 rotate-45" />
              Input/Output
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="outline" size="icon" onClick={deleteNode}>
          <Trash2 className="h-4 w-4" />
        </Button>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="icon" onClick={handleEditNode}>
              <Edit className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          {selectedNode && (
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Node</DialogTitle>
              </DialogHeader>
              <div className="py-4">
                <Input
                  value={editNodeText}
                  onChange={(e) => setEditNodeText(e.target.value)}
                  placeholder="Node text"
                  className="mb-4"
                />
                <div className="flex justify-end">
                  <Button onClick={saveNodeEdit}>Save</Button>
                </div>
              </div>
            </DialogContent>
          )}
        </Dialog>

        <Button variant="outline" size="icon" onClick={exportFlowchart}>
          <Download className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}