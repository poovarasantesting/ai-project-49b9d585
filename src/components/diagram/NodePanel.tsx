import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Card } from "../ui/card";
import { Search, Square, Circle, Diamond, Triangle } from "lucide-react";

export default function NodePanel({ nodes, setNodes }) {
  const [searchTerm, setSearchTerm] = useState("");
  
  const handleAddNode = (type, label, shape = "default") => {
    const newNode = {
      id: (nodes.length + 1).toString(),
      data: { label, shape },
      position: { 
        x: 100 + Math.random() * 200, 
        y: 100 + Math.random() * 200 
      },
      type,
    };
    
    setNodes((nodes) => [...nodes, newNode]);
  };
  
  const nodeTypes = {
    basic: [
      { type: "default", label: "Process", icon: <Square size={24} /> },
      { type: "output", label: "End", icon: <Circle size={24} /> },
      { type: "input", label: "Start", icon: <Circle size={24} /> },
    ],
    flowchart: [
      { type: "default", label: "Decision", icon: <Diamond size={24} /> },
      { type: "default", label: "Data", icon: <Triangle size={24} /> },
      { type: "default", label: "Document", icon: <Square size={24} className="rotate-1" /> },
    ],
  };
  
  const filteredNodeTypes = (category) => {
    return nodeTypes[category].filter((node) => 
      node.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };
  
  return (
    <div className="w-64 border-r dark:border-slate-700 bg-white dark:bg-slate-800 overflow-y-auto flex flex-col">
      <div className="p-4">
        <div className="relative mb-4">
          <Search size={16} className="absolute left-2.5 top-2.5 text-slate-400" />
          <Input
            placeholder="Search shapes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        
        <Tabs defaultValue="basic">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="basic">Basic</TabsTrigger>
            <TabsTrigger value="flowchart">Flowchart</TabsTrigger>
          </TabsList>
          
          <TabsContent value="basic" className="mt-4 space-y-3">
            {filteredNodeTypes('basic').map((node, index) => (
              <Card 
                key={index} 
                className="p-3 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center gap-3"
                onClick={() => handleAddNode(node.type, node.label)}
              >
                <div className="text-slate-500 dark:text-slate-300">
                  {node.icon}
                </div>
                <div>
                  <p className="font-medium">{node.label}</p>
                </div>
              </Card>
            ))}
          </TabsContent>
          
          <TabsContent value="flowchart" className="mt-4 space-y-3">
            {filteredNodeTypes('flowchart').map((node, index) => (
              <Card 
                key={index} 
                className="p-3 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center gap-3"
                onClick={() => handleAddNode(node.type, node.label, node.shape)}
              >
                <div className="text-slate-500 dark:text-slate-300">
                  {node.icon}
                </div>
                <div>
                  <p className="font-medium">{node.label}</p>
                </div>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
      
      <div className="mt-auto p-4 border-t dark:border-slate-700">
        <Button variant="outline" className="w-full">
          Custom Node
        </Button>
      </div>
    </div>
  );
}