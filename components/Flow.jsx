import React, {
  useState,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from "react";
import {
  ReactFlow,
  Background,
  Controls,
  applyEdgeChanges,
  applyNodeChanges,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import reactFlowStyles from "../styles/main.module.scss";
import { RequestNode } from "./nodes/RequestNode";
import { ResponseNode } from "./nodes/ResposeNode";

const initialNodes = [
  {
    id: "1",
    type: "requestNode",
    position: { x: 0, y: 0 },
    data: { label: "Request Node" },
  },
  {
    id: "2",
    type: "responseNode",
    position: { x: 100, y: 100 },
    data: { label: "Response Node", status: "", responseData: "" },
  },
];

const initialEdges = [
  {
    id: "1-2",
    source: "1",
    target: "2",
    type: "step",
    style: { stroke: "#000", strokeDasharray: "5 5" },
  },
];

export const Flow = forwardRef((props, ref) => {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [contextNames, setContextNames] = useState({});
  const nodeTypes = { requestNode: RequestNode, responseNode: ResponseNode };

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const newRequestNodeId = (nodes.length + 1).toString();
  const newResponseNodeId = (nodes.length + 2).toString();

  const newRequestNodePosition = { x: 100, y: 100 + nodes.length * 100 };
  const newResponseNodePosition = { x: 300, y: 100 + nodes.length * 100 };

  const addNewNodes = () => {
    const newRequestNode = {
      id: newRequestNodeId,
      type: "requestNode",
      position: newRequestNodePosition,
      data: { label: `Request Node ${newRequestNodeId}` },
    };

    const newResponseNode = {
      id: newResponseNodeId,
      type: "responseNode",
      position: newResponseNodePosition,
      data: {
        label: `Response Node ${newResponseNodeId}`,
        status: "",
        responseData: "",
      },
    };

    const newEdge = {
      id: `${newRequestNodeId}-${newResponseNodeId}`,
      source: newRequestNodeId,
      target: newResponseNodeId,
      type: "step",
      style: { stroke: "#000", strokeDasharray: "5 5" },
    };

    setNodes((prevNodes) => [...prevNodes, newRequestNode, newResponseNode]);
    setEdges((prevEdges) => [...prevEdges, newEdge]);
  };

  useImperativeHandle(ref, () => ({
    addNewNodes,
    handleTestRun,
  }));

  const handleTestRun = async () => {
    const requestNode = nodes.find((node) => node.type === "requestNode");
    const contextName = contextNames[requestNode?.id] || ""; 

    if (!contextName) {
      alert("Context Name is required in the Request Node!");
      return;
    }

    try {
      const response = await fetch(
        `https://sd-backend-mg1i.onrender.com/api/requests/context?contextName=${contextName}`
      );
      const data = await response.json();
      if (response.ok) {
        const updatedNodes = nodes.map((node) => {
          if (node.type === "responseNode") {
            return {
              ...node,
              data: {
                ...node.data,
                status: data[0]?.status || "Unknown Status",
                responseData: data[0]?.data || "No Data Available",
              },
            };
          }
          return node;
        });

        console.log("Updated Nodes: ", updatedNodes);

        setNodes([...updatedNodes]);
      } else {
        alert(data.message || "Failed to fetch data.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("An error occurred while fetching data.");
    }
  };

  const setContextName = (nodeId, value) => {
    setContextNames((prev) => ({
      ...prev,
      [nodeId]: value,
    }));
  };

  return (
    <>
      <ReactFlow
        nodes={nodes.map((node) => ({
          ...node,
          data: {
            ...node.data,
            contextName: contextNames[node.id] || "",
            setContextName: (value) => setContextName(node.id, value),
          },
        }))}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
      >
        <Background />
        <Controls className={reactFlowStyles.flowControl} />
      </ReactFlow>
    </>
  );
});
