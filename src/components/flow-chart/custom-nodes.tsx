import React, { memo } from "react";
import { Handle, Position, NodeProps } from "reactflow";

// Process Node (Rectangle)
export const ProcessNode = memo(({ data, isConnectable }: NodeProps) => {
  return (
    <div className="px-4 py-2 border-2 border-gray-500 bg-white rounded-md w-48 shadow-md">
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
        className="w-2 h-2 bg-blue-500"
      />
      <div className="text-center font-medium">{data.label}</div>
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
        className="w-2 h-2 bg-blue-500"
      />
    </div>
  );
});

// Decision Node (Diamond)
export const DecisionNode = memo(({ data, isConnectable }: NodeProps) => {
  return (
    <div className="relative">
      <div 
        className="bg-white border-2 border-gray-500 w-48 h-24 shadow-md" 
        style={{ 
          transform: 'rotate(45deg)',
          position: 'absolute',
          top: '0',
          left: '0',
        }}
      />
      <div 
        className="flex items-center justify-center w-48 h-24 z-10 relative"
      >
        <div className="text-center font-medium px-2">{data.label}</div>
      </div>
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
        className="w-2 h-2 bg-blue-500"
        style={{ zIndex: 20 }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
        className="w-2 h-2 bg-blue-500"
        style={{ zIndex: 20 }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="right"
        isConnectable={isConnectable}
        className="w-2 h-2 bg-blue-500"
        style={{ zIndex: 20 }}
      />
      <Handle
        type="source"
        position={Position.Left}
        id="left"
        isConnectable={isConnectable}
        className="w-2 h-2 bg-blue-500"
        style={{ zIndex: 20 }}
      />
    </div>
  );
});

// Start/End Node (Rounded)
export const TerminalNode = memo(({ data, isConnectable }: NodeProps) => {
  return (
    <div className="px-4 py-2 border-2 border-gray-500 bg-white rounded-full w-48 shadow-md">
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
        className="w-2 h-2 bg-blue-500"
      />
      <div className="text-center font-medium">{data.label}</div>
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
        className="w-2 h-2 bg-blue-500"
      />
    </div>
  );
});

// Input/Output Node (Parallelogram)
export const IONode = memo(({ data, isConnectable }: NodeProps) => {
  return (
    <div className="relative">
      <div className="px-6 py-2 border-2 border-gray-500 bg-white w-48 shadow-md" style={{ clipPath: 'polygon(15% 0%, 100% 0%, 85% 100%, 0% 100%)' }}>
        <Handle
          type="target"
          position={Position.Top}
          isConnectable={isConnectable}
          className="w-2 h-2 bg-blue-500"
        />
        <div className="text-center font-medium py-1">{data.label}</div>
        <Handle
          type="source"
          position={Position.Bottom}
          isConnectable={isConnectable}
          className="w-2 h-2 bg-blue-500"
        />
      </div>
    </div>
  );
});