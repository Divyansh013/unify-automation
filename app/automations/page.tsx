'use client'
import { useCallback, useState, useEffect } from 'react';
import {
  ReactFlow,
  addEdge,
  Background,
  Controls
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import TextNode from './TextNode';

const initialNodesData = [
  { id: '1', type: 'TextNode', data: { img: "gmail", heading: "1. Gmail", value: "Send an email" } },
  { id: '2', type: 'TextNode', data: { img: "slack", heading: "2. Slack", value: "Post a message" } },
  { id: '3', type: 'TextNode', data: { img: "schedule", heading: "3. Schedule", value: "Schedule an event" } },
  { id: '4', type: 'TextNode', data: { img: "branch", heading: "4. Branch", value: "Select a branch" } },
  { id: '5', type: 'TextNode', data: { img: "branch", heading: "5. Branch 1", value: "Select an action" } },
  { id: '6', type: 'TextNode', data: { img: "gmail", heading: "6. Gmail", value: "Draft an email" } },
  { id: '7', type: 'TextNode', data: { img: "slack", heading: "7. Gemini", value: "Generate an image" } },
  { id: '8', type: 'TextNode', data: { img: "slack", heading: "8. Slack", value: "Post to channel" } },
  { id: '9', type: 'TextNode', data: { img: "slack", heading: "9. Open AI", value: "Analyze a text" } },
  { id: '10', type: 'TextNode', data: { img: "stop", heading: "10. Stop", value: "Terminate the process" } },
  { id: '11', type: 'TextNode', data: { img: "gmail", heading: "11. Gmail", value: "Send completion mail" } },
];

const initialEdges = [
  { id: 'e12', source: '1', target: '2', style: { stroke: '#e0e3eb' }, type: "smoothstep" },
  { id: 'e13', source: '2', target: '3', style: { stroke: '#e0e3eb' }, type: "smoothstep" },
  { id: 'e22a', source: '3', target: '4', style: { stroke: '#e0e3eb' }, type: "smoothstep" },
  { id: 'e22b', source: '4', target: '5', style: { stroke: '#e0e3eb' }, type: "smoothstep" },
  { id: 'e22c', source: '4', target: '6', style: { stroke: '#e0e3eb' }, type: "smoothstep" },
  { id: 'e22d', source: '4', target: '7', style: { stroke: '#e0e3eb' }, type: "smoothstep" },
  { id: 'e31a', source: '5', target: '8', style: { stroke: '#e0e3eb' }, type: "smoothstep" },
  { id: 'e31b', source: '5', target: '9', style: { stroke: '#e0e3eb' }, type: "smoothstep" },
  { id: 'e31c', source: '9', target: '10', style: { stroke: '#e0e3eb' }, type: "smoothstep" },
  { id: 'e31d', source: '8', target: '10', style: { stroke: '#e0e3eb' }, type: "smoothstep" },
  { id: 'e31e', source: '7', target: '11', style: { stroke: '#e0e3eb' }, type: "smoothstep" },
  { id: 'e4', source: '11', target: '10', style: { stroke: '#e0e3eb' }, type: "smoothstep" },
];

const nodeTypes = { TextNode: TextNode };

const calculateNodePositions = (nodes, edges) => {
  const positions = {};
  const levelGap = 140;
  const siblingGap = 300;

  const getNodeChildren = (nodeId) => {
    return edges.filter(edge => edge.source === nodeId).map(edge => edge.target);
  };

  const setPosition = (nodeId, level, xOffset) => {
    if (positions[nodeId]) return;

    positions[nodeId] = {
      x: xOffset,
      y: level * levelGap,
    };

    const children = getNodeChildren(nodeId);
    let childXOffset = xOffset - ((children.length - 1) * siblingGap) / 2;

    children.forEach((childId) => {
      setPosition(childId, level + 1, childXOffset);
      childXOffset += siblingGap;
    });
  };

  nodes.forEach((node) => {
    if (!positions[node.id]) {
      setPosition(node.id, 0, 0);
    }
  });

  return nodes.map(node => ({
    ...node,
    position: positions[node.id],
  }));
};

function RootNode() {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState(initialEdges);

  useEffect(() => {
    const positionedNodes = calculateNodePositions(initialNodesData, initialEdges);
    setNodes(positionedNodes);
  }, []);

  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges],
  );

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default RootNode;
