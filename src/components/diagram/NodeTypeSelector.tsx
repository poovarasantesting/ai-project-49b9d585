import { Card, CardContent } from "../ui/card";
import { Square, Circle, Hexagon, Diamond, Type, Image } from "lucide-react";

export function NodeTypeSelector() {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium mb-2">Shapes</h4>
        <div className="grid grid-cols-2 gap-2">
          <Card 
            className="cursor-grab hover:bg-gray-50"
            draggable
            onDragStart={(e) => onDragStart(e, 'shape')}
          >
            <CardContent className="p-3 flex flex-col items-center justify-center">
              <Square className="h-8 w-8 mb-1 text-green-600" />
              <span className="text-xs">Rectangle</span>
            </CardContent>
          </Card>
          
          <Card 
            className="cursor-grab hover:bg-gray-50"
            draggable
            onDragStart={(e) => onDragStart(e, 'shape')}
          >
            <CardContent className="p-3 flex flex-col items-center justify-center">
              <Circle className="h-8 w-8 mb-1 text-blue-600" />
              <span className="text-xs">Circle</span>
            </CardContent>
          </Card>
          
          <Card 
            className="cursor-grab hover:bg-gray-50"
            draggable
            onDragStart={(e) => onDragStart(e, 'shape')}
          >
            <CardContent className="p-3 flex flex-col items-center justify-center">
              <Diamond className="h-8 w-8 mb-1 text-purple-600" />
              <span className="text-xs">Diamond</span>
            </CardContent>
          </Card>
          
          <Card 
            className="cursor-grab hover:bg-gray-50"
            draggable
            onDragStart={(e) => onDragStart(e, 'shape')}
          >
            <CardContent className="p-3 flex flex-col items-center justify-center">
              <Hexagon className="h-8 w-8 mb-1 text-amber-600" />
              <span className="text-xs">Hexagon</span>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div>
        <h4 className="text-sm font-medium mb-2">Text</h4>
        <Card 
          className="cursor-grab hover:bg-gray-50"
          draggable
          onDragStart={(e) => onDragStart(e, 'text')}
        >
          <CardContent className="p-3 flex items-center justify-center gap-2">
            <Type className="h-6 w-6 text-gray-600" />
            <span className="text-sm">Text Box</span>
          </CardContent>
        </Card>
      </div>
      
      <div>
        <h4 className="text-sm font-medium mb-2">Media</h4>
        <Card 
          className="cursor-grab hover:bg-gray-50"
          draggable
          onDragStart={(e) => onDragStart(e, 'image')}
        >
          <CardContent className="p-3 flex items-center justify-center gap-2">
            <Image className="h-6 w-6 text-gray-600" />
            <span className="text-sm">Image</span>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}