import { useState } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

type ImageNodeData = {
  src: string;
  width: number;
  height: number;
};

export function ImageNode({ data, selected, id }: NodeProps<ImageNodeData>) {
  const [nodeData, setNodeData] = useState<ImageNodeData>(data);

  const handleDataChange = (updates: Partial<ImageNodeData>) => {
    const newData = { ...nodeData, ...updates };
    setNodeData(newData);
    data.src = newData.src;
    data.width = newData.width;
    data.height = newData.height;
  };

  return (
    <div className="relative">
      <Handle type="target" position={Position.Top} />
      <div className="border border-gray-200 rounded overflow-hidden">
        <img
          src={nodeData.src}
          alt="Node"
          style={{
            width: `${nodeData.width}px`,
            height: `${nodeData.height}px`,
            objectFit: 'cover',
          }}
        />
      </div>
      <Handle type="source" position={Position.Bottom} />

      {selected && (
        <div className="absolute top-full left-0 mt-2 bg-white p-2 rounded-md shadow-md border z-10">
          <div className="grid gap-2 w-48">
            <div className="grid gap-1">
              <Label htmlFor={`image-url-${id}`}>Image URL</Label>
              <Input
                id={`image-url-${id}`}
                value={nodeData.src}
                onChange={(e) => handleDataChange({ src: e.target.value })}
              />
            </div>
            
            <div className="grid gap-1">
              <Label htmlFor={`width-${id}`}>Width</Label>
              <Input
                id={`width-${id}`}
                type="number"
                value={nodeData.width}
                onChange={(e) => handleDataChange({ width: parseInt(e.target.value) || 100 })}
              />
            </div>
            
            <div className="grid gap-1">
              <Label htmlFor={`height-${id}`}>Height</Label>
              <Input
                id={`height-${id}`}
                type="number"
                value={nodeData.height}
                onChange={(e) => handleDataChange({ height: parseInt(e.target.value) || 100 })}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}