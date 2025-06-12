import { useState } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { ChromePicker } from 'react-color';
import { Button } from '../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

type ShapeNodeData = {
  shape: 'rectangle' | 'circle' | 'diamond' | 'hexagon';
  width: number;
  height: number;
  color: string;
};

export function ShapeNode({ data, selected, id }: NodeProps<ShapeNodeData>) {
  const [nodeData, setNodeData] = useState<ShapeNodeData>(data);

  const handleDataChange = (updates: Partial<ShapeNodeData>) => {
    const newData = { ...nodeData, ...updates };
    setNodeData(newData);
    data.shape = newData.shape;
    data.width = newData.width;
    data.height = newData.height;
    data.color = newData.color;
  };

  const renderShape = () => {
    const { shape, width, height, color } = nodeData;

    switch (shape) {
      case 'circle':
        return (
          <div
            style={{
              width: `${width}px`,
              height: `${width}px`, // Using width for both to keep it a circle
              borderRadius: '50%',
              backgroundColor: color,
            }}
          />
        );
      case 'diamond':
        return (
          <div
            style={{
              width: `${width}px`,
              height: `${height}px`,
              backgroundColor: 'transparent',
              position: 'relative',
            }}
          >
            <div
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                transform: 'rotate(45deg)',
                backgroundColor: color,
              }}
            />
          </div>
        );
      case 'hexagon':
        return (
          <div
            style={{
              width: `${width}px`,
              height: `${height}px`,
              backgroundColor: 'transparent',
              position: 'relative',
              clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
              backgroundColor: color,
            }}
          />
        );
      case 'rectangle':
      default:
        return (
          <div
            style={{
              width: `${width}px`,
              height: `${height}px`,
              backgroundColor: color,
            }}
          />
        );
    }
  };

  return (
    <div className="relative">
      <Handle type="target" position={Position.Top} />
      {renderShape()}
      <Handle type="source" position={Position.Bottom} />

      {selected && (
        <div className="absolute top-full left-0 mt-2 bg-white p-2 rounded-md shadow-md border z-10">
          <div className="grid gap-2 w-48">
            <div className="grid gap-1">
              <Label htmlFor={`shape-${id}`}>Shape</Label>
              <Select
                value={nodeData.shape}
                onValueChange={(value) => handleDataChange({ shape: value as ShapeNodeData['shape'] })}
              >
                <SelectTrigger id={`shape-${id}`}>
                  <SelectValue placeholder="Select shape" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rectangle">Rectangle</SelectItem>
                  <SelectItem value="circle">Circle</SelectItem>
                  <SelectItem value="diamond">Diamond</SelectItem>
                  <SelectItem value="hexagon">Hexagon</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-1">
              <Label htmlFor={`width-${id}`}>Width</Label>
              <Input
                id={`width-${id}`}
                type="number"
                value={nodeData.width}
                onChange={(e) => handleDataChange({ width: parseInt(e.target.value) || 50 })}
              />
            </div>
            
            <div className="grid gap-1">
              <Label htmlFor={`height-${id}`}>Height</Label>
              <Input
                id={`height-${id}`}
                type="number"
                value={nodeData.height}
                onChange={(e) => handleDataChange({ height: parseInt(e.target.value) || 50 })}
              />
            </div>
            
            <div className="grid gap-1">
              <Label>Color</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    style={{ backgroundColor: nodeData.color }}
                  >
                    <span className="ml-2 text-white drop-shadow-md">{nodeData.color}</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <div className="p-1">
                    <ChromePicker
                      color={nodeData.color}
                      onChange={(color) => handleDataChange({ color: color.hex })}
                    />
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}