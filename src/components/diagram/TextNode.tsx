import { useState } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Slider } from '../ui/slider';

type TextNodeData = {
  text: string;
  fontSize: number;
};

export function TextNode({ data, selected, id }: NodeProps<TextNodeData>) {
  const [nodeData, setNodeData] = useState<TextNodeData>(data);

  const handleDataChange = (updates: Partial<TextNodeData>) => {
    const newData = { ...nodeData, ...updates };
    setNodeData(newData);
    data.text = newData.text;
    data.fontSize = newData.fontSize;
  };

  return (
    <div className="relative">
      <Handle type="target" position={Position.Top} />
      <div 
        className="min-w-[100px] min-h-[40px] px-2 py-1 text-center flex items-center justify-center border border-dashed border-gray-300 bg-white"
        style={{ fontSize: `${nodeData.fontSize}px` }}
      >
        {nodeData.text}
      </div>
      <Handle type="source" position={Position.Bottom} />

      {selected && (
        <div className="absolute top-full left-0 mt-2 bg-white p-2 rounded-md shadow-md border z-10">
          <div className="grid gap-2 w-48">
            <div className="grid gap-1">
              <Label htmlFor={`text-${id}`}>Text</Label>
              <Input
                id={`text-${id}`}
                value={nodeData.text}
                onChange={(e) => handleDataChange({ text: e.target.value })}
              />
            </div>
            
            <div className="grid gap-1">
              <Label htmlFor={`fontsize-${id}`}>Font Size: {nodeData.fontSize}px</Label>
              <Slider
                id={`fontsize-${id}`}
                value={[nodeData.fontSize]}
                min={8}
                max={40}
                step={1}
                onValueChange={(value) => handleDataChange({ fontSize: value[0] })}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}