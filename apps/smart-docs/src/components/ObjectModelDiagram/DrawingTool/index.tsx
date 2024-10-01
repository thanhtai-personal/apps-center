import {
  EDGE_TYPE,
  NODE_TYPE,
  edgeTypesMapping,
  nodeTypesMapping,
} from "app/utils/constants";
import React, { useCallback, useMemo, useState } from "react";
import useActionHotkey from "app/hooks/useActionHotkey";

interface DrawingToolProps {
  addNode: any;
  editNode: any;
  addEdge: any;
  editEdge: any;
  onUpdateJson: any;
  nodes: any;
  edges: any;
  setNodes: any;
  setEdges: any;
  onOpenJsonEditorModal: any;
}

const DrawingTool: React.FC<DrawingToolProps> = (props: DrawingToolProps) => {
  const {
    addNode,
    editNode,
    addEdge,
    editEdge,
    onUpdateJson,
    nodes,
    edges,
    setNodes,
    setEdges,
    onOpenJsonEditorModal,
  } = props;
  const [nodeType, setNodeType] = useState(NODE_TYPE.EXPAND_FRAME);
  const [edgeType, setEdgeType] = useState(EDGE_TYPE.DEFAULT);

  const handleAddNode = () => {
    addNode && addNode(nodeType);
  };

  const handleAddEdge = () => {
    addEdge && addEdge(edgeType);
  };

  const handleChangeNodeType = (e: any) => {
    setNodeType(e.target.value);
  };

  const handleChangeEdgeType = (e: any) => {
    setEdgeType(e.target.value);
  };

  const handleDeleteSeleted = () => {
    const selectedId = (
      (nodes || []).find((_node: any) => _node.selected) ||
      (edges || []).find((_edge: any) => _edge.selected)
    ).id;
    const newEdges = (edges || []).filter(
      (_edge: any) =>
        !_edge.selected &&
        _edge.source !== selectedId &&
        _edge.target !== selectedId
    );
    const newNodes = (nodes || [])
      .filter((_node: any) => !_node.selected)
      .map((_node: any) => {
        if (_node.parentNode === selectedId) {
          return {
            ..._node,
            parentNode: "",
          };
        } else {
          return _node;
        }
      });
    setEdges(newEdges);
    setNodes(newNodes);
    onUpdateJson({
      nodes: newNodes,
      edges: newEdges,
    });
  };

  const handleOpenEdit = () => {
    const selectedNode = (nodes || []).find((_node: any) => _node.selected);
    const selectedEdge = (edges || []).find((_edge: any) => _edge.selected);
    selectedNode && editNode && editNode(selectedNode);
    selectedEdge && editEdge && editEdge(selectedEdge);
  };

  const selectedItem = useMemo(
    () =>
      nodes.find((_node: any) => _node.selected) ||
      edges.find((_edge: any) => _edge.selected),
    [nodes, edges]
  );

  useActionHotkey(selectedItem, {
    onDelete: handleDeleteSeleted,
    onEdit: handleOpenEdit,
  });

  const handleOpenJsonModal = useCallback(() => {
    onOpenJsonEditorModal && onOpenJsonEditorModal();
  }, [onOpenJsonEditorModal]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        position: "fixed",
        background: "rgba(0,0,0, 0.125)",
        padding: "4px",
        top: "24px",
        left: "24px",
        minHeight: "24px",
        zIndex: 99999,
        width: "calc(100vw - 50px)",
        borderRadius: "4px",
      }}
    >
      <div className="drawing-left-bar">
        <div className="drawing-bar-item">
          <span style={{ color: "#fff" }}>Type:&nbsp;</span>
          <select onChange={handleChangeNodeType} value={nodeType}>
            {Object.keys(nodeTypesMapping).map((key) => (
              <option key={key} value={key}>
                {nodeTypesMapping[key].name}
              </option>
            ))}
          </select>
          <button
            style={{ marginLeft: "8px", padding: "8px" }}
            onClick={handleAddNode}
          >
            <i
              className="fa-solid fa-plus"
              style={{
                color: "#fff",
              }}
            ></i>
          </button>
        </div>
        <div className="drawing-bar-item">
          <span style={{ color: "#fff" }}>Edge:&nbsp;</span>
          <select onChange={handleChangeEdgeType} value={edgeType}>
            {Object.keys(edgeTypesMapping).map((key) => (
              <option key={key} value={key}>
                {edgeTypesMapping[key].name}
              </option>
            ))}
          </select>
          <button
            style={{ marginLeft: "8px", padding: "8px" }}
            onClick={handleAddEdge}
          >
            <i
              className="fa-solid fa-plus"
              style={{
                color: "#fff",
              }}
            ></i>
          </button>
        </div>
      </div>
      {selectedItem && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        ></div>
      )}
      <div>
        <div className="drawing-bar-item">
          <button
            title="Edit JSON data"
            style={{ padding: "8px" }}
            onClick={handleOpenJsonModal}
          >
            <i className="fa-solid fa-gears"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DrawingTool;
