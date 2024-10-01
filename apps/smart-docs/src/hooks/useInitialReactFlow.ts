import { useCallback, useEffect, useMemo } from "react";
import { addEdge, useEdgesState, useNodesState } from "reactflow";

const useInitialReactFlow = (props: any) => {
  const { nodes, edges, ref, onChange } = props;

  const [_nodes, setNodes, onNodesChange] = useNodesState(nodes as Array<any>);
  const [_edges, setEdges, onEdgesChange] = useEdgesState(edges as Array<any>);

  useEffect(() => {
    if (nodes && nodes.length > 0) {
      setNodes(nodes);
    }
  }, [nodes]);

  useEffect(() => {
    if (edges && edges.length > 0) {
      setEdges(
        edges.map((edge: any) => ({
          ...edge,
          markerEnd: {
            type: "arrowclosed",
          },
        }))
      );
    }
  }, [edges]);

  const onConnect = useCallback(
    (params: any) => setEdges((eds: any) => addEdge(params, eds)),
    []
  );

  const onInit = (reactFlowInstance: any) => {
    if (ref) {
      ref.current = reactFlowInstance;
    }
    reactFlowInstance.zoomTo(0.68);
  };

  const edgesWithUpdatedTypes = useMemo(() => {
    return _edges.map((edge: any) => {
      if (edge.sourceHandle) {
        const edgeType = nodes.find((node: any) => node?.type === "custom")
          ?.data.selects[edge.sourceHandle];
        edge.type = edgeType;
      }
      return edge;
    });
  }, [_edges]);

  const handleNodeChanges = (changes: Array<any>) => {
    onNodesChange(changes);
    onChange &&
      onChange({
        nodes: _nodes,
        edges: _edges,
      });
  };

  const handleEdgeChanges = (changes: Array<any>) => {
    onEdgesChange(changes);
    onChange &&
      onChange({
        nodes: _nodes,
        edges: _edges,
      });
  };
  
  return [
    { onConnect, onInit },
    { nodes: _nodes, edges: edgesWithUpdatedTypes },
    {
      setNodes,
      setEdges,
      onNodesChange: handleNodeChanges,
      onEdgesChange: handleEdgeChanges,
    },
  ];
};

export default useInitialReactFlow;
