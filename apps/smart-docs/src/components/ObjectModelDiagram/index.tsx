import React, { forwardRef, useMemo, useState } from "react";
import ReactFlow, { MiniMap, Controls, Background } from "reactflow";
import "reactflow/dist/style.css";
import { nodeTypes, edgeTypes } from "app/utils/constants";
import DrawingTool from "./DrawingTool";
import { NODE_TYPE } from "app/utils/constants";
import { EDGE_TYPE } from "app/utils/constants";
import useInitialReactFlow from "app/hooks/useInitialReactFlow";
import { AppModalInstance } from "app/pages";
import NodeForm from "app/components/ObjectModelDiagram/Forms/Node";
import EdgeForm from "app/components/ObjectModelDiagram/Forms/Edge";

const minimapStyle = {
  height: 120,
};

const ObjectModelDiagram = forwardRef((props: any, ref: any) => {
  const {
    nodes: _nodes,
    edges: _edges,
    onUpdateJson,
    onOpenJsonEditorModal,
  } = props;
  const [nodeType, setNodeType] = useState(NODE_TYPE.EXPAND_FRAME as string);
  const [edgeType, setEdgeType] = useState(EDGE_TYPE.DEFAULT as string);
  const [
    { onConnect, onInit },
    { nodes, edges },
    { setNodes, setEdges, onNodesChange, onEdgesChange },
  ] = useInitialReactFlow({
    nodes: _nodes || [],
    edges: _edges || [],
    onChange: (newData: any) => {
      onUpdateJson(newData);
    },
    ref: ref,
  });

  const handleOpenCreateNodeModal = (type: string) => {
    setNodeType(type);
    AppModalInstance.replaceChildren(NodeForm);
    AppModalInstance.updateChildrenProps({
      nodeType: type,
      nodes,
      edges,
      onUpdateJson,
      onNodesChange,
    });
    AppModalInstance.open();
  };

  const handleOpenEditNodeModal = (node: any) => {
    setNodeType(node.type || NODE_TYPE.DEFAULT);
    AppModalInstance.replaceChildren(NodeForm);
    AppModalInstance.updateChildrenProps({
      nodeType: node.type,
      nodes,
      edges,
      onUpdateJson,
      onNodesChange,
      initialValues: node,
      isEdit: true,
    });
    AppModalInstance.open();
  };

  const handleOpenCreateEdgeModal = (type: string) => {
    setEdgeType(type);
    AppModalInstance.replaceChildren(EdgeForm);
    AppModalInstance.updateChildrenProps({
      edgeType: type,
      nodes,
      edges,
      onUpdateJson,
      onEdgesChange,
    });
    AppModalInstance.open();
  };

  const handleOpenEditEdgeModal = (edge: any) => {
    setEdgeType(edge.type || EDGE_TYPE.DEFAULT);
    AppModalInstance.replaceChildren(EdgeForm);
    AppModalInstance.updateChildrenProps({
      edgeType: edge.type,
      nodes,
      edges,
      onUpdateJson,
      onEdgesChange,
      initialValues: edge,
      isEdit: true,
    });
    AppModalInstance.open();
  };

  return (
    <>
      <DrawingTool
        addNode={handleOpenCreateNodeModal}
        editNode={handleOpenEditNodeModal}
        addEdge={handleOpenCreateEdgeModal}
        editEdge={handleOpenEditEdgeModal}
        onUpdateJson={onUpdateJson}
        nodes={nodes || []}
        edges={edges || []}
        setNodes={setNodes}
        setEdges={setEdges}
        onOpenJsonEditorModal={onOpenJsonEditorModal}
      />
      <ReactFlow
        nodes={nodes || []}
        edges={edges || []}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={onInit}
        fitView
        attributionPosition="top-right"
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
      >
        <MiniMap style={minimapStyle} zoomable pannable />
        <Controls />
        <Background color="#000" gap={16} />
      </ReactFlow>
    </>
  );
});

export default ObjectModelDiagram;
