import React, { ChangeEvent, forwardRef } from 'react';
import { useState, useCallback } from 'react';
import ReactFlow, {
  addEdge,
  Node,
  Edge,
  OnConnect,
  useNodesState,
  useEdgesState,
  reconnectEdge,
  Connection
} from 'reactflow';
import CustomNode from './CustomNode';
import { NodeData } from './type/LineMatchType';
// import {LineMatchProps, NodeData } from './type/LineMatchType';
const initialEdges: Edge[] = [];
 
const nodeTypes = {
  customNode: CustomNode
};

export interface FlowRef {
  exportToJson: () => void
}
export interface FlowProps {
  data: NodeData[]
  flowClassName: string
}

const Flow = forwardRef<FlowRef, FlowProps>(({data, flowClassName}, ref) => {
  const initialNodes = data.map((item: NodeData, index: number) => {
    return {
      id: `${index}`,
      data: { label: item.content, handleType: item.type, handlePosition: item.type === 'source' ? 'right' : 'left' },
      position: { x: item.type === 'source' ? 0 : 300, y: Math.floor(index / 2) * 100 },
      type: 'customNode'
    } as unknown as Node
  }) as Node[]

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const reconnectDone = React.useRef(true);
  const proOptions = { hideAttribution: true };

  const onConnect: OnConnect = useCallback(
    (connection) => {
      setEdges((eds) => addEdge(connection, eds))
    },
    [setEdges],
  );
 
  const onReconnectStart = useCallback(() => {
    reconnectDone.current = false;
  }, []);

  const onReconnect = useCallback((oldEdge: Edge, newConnection: Connection) => {
    reconnectDone.current = true;
    setEdges((els) => reconnectEdge(oldEdge, newConnection, els));
  }, []);

  const onReconnectEnd = useCallback((_: any, edge: Edge) => {
    if (!reconnectDone.current) {
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    }

    reconnectDone.current = true;
  }, []);
  
  React.useImperativeHandle(ref, () => ({
    exportToJson() {
      return edges.map((edge: Edge) => {
        return {source: data[parseInt(edge.source)], target: data[parseInt(edge.target)]}
      }) || []
    },
  }));

  return (
    <ReactFlow
      className={flowClassName}
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onReconnect={onReconnect}
      onReconnectStart={onReconnectStart}
      onReconnectEnd={onReconnectEnd}
      fitView
      nodeTypes={nodeTypes}
      proOptions={proOptions}
      draggable={false}
      panOnDrag={false}
      zoomOnScroll={false}
    />
  );
})

export default Flow