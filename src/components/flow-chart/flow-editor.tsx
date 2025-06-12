import React, { useState, useCallback, useRef } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  addEdge,
  Node,
  Edge,
  Connection,
  useNodesState,
  useEdgesState,
  Panel,
  ReactFlowProvider,
  NodeTypes
} from 'reactflow';
import 'reactflow/dist/style.css';

import { ProcessNode, DecisionNode, TerminalNode, IONode } from './custom-nodes';
import { NodeControls } from './node-controls';

// Define node types
const nodeTypes: NodeTypes = {
  process: ProcessNode,
  decision: DecisionNode,
  terminal: TerminalNode,
  io: IONode
};

// Initial nodes and edges
const initialNodes: Node[] = [
  {
    id: 'start',
    type: 'terminal',
    position: { x: 250, y: 50 },
    data: { label: 'Start' }
  },
  {
    id: 'process1',
    type: 'process',
    position: { x: 250, y: 150 },
    data: { label: 'Process' }
  },
  {
    id: 'decision',
    type: 'decision',
    position: { x: 250, y: 250 },
    data: { label: 'Decision' }
  },
  {
    id: 'end',
    type: 'terminal',
    position: { x: 250, y: 350 },
    data: { label: 'End' }
  }
];

const initialEdges: Edge[] = [
  { id: 'e1-2', source: 'start', target: 'process1' },
  { id: 'e2-3', source: 'process1', target: 'decision' },
  { id: 'e3-4', source: 'decision', target: 'end' }
];

export function FlowEditor() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  
  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div className="w-full h-[calc(100vh-64px)]">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        defaultZoom={1.5}
        minZoom={0.2}
        maxZoom={4}
        fitView
        attributionPosition="bottom-left"
      >
        <Background color="#aaa" gap={16} />
        <Controls />
        <MiniMap />
        <NodeControls />
      </ReactFlow>
    </div>
  );
}

export function FlowEditorWithProvider() {
  return (
    <ReactFlowProvider>
      <FlowEditor />
    </ReactFlowProvider>
  );
}