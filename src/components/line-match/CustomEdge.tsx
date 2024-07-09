import { useCallback } from "react";
import {
  useStore,
  EdgeLabelRenderer,
  getStraightPath,
  useReactFlow,
  EdgeProps,
} from "reactflow";

import { getEdgeParams } from "./utils/LineMatch";
import React from "react";

const CustomEdge: React.FC<EdgeProps> = ({ id, source, target, style }) => {
  const { setEdges } = useReactFlow();
  const sourceNode = useStore(
    useCallback((store) => store.nodeInternals.get(source), [source]),
  );
  const targetNode = useStore(
    useCallback((store) => store.nodeInternals.get(target), [target]),
  );

  if (!sourceNode || !targetNode) {
    return null;
  }

  const { sx, sy, tx, ty } = getEdgeParams(sourceNode, targetNode);
  const [edgePath, labelX, labelY] = getStraightPath({
    sourceX: sx,
    sourceY: sy,
    targetX: tx,
    targetY: ty,
  });

  return (
    <>
      <path
        id={id}
        className="react-flow__edge-path"
        d={edgePath}
        style={style}
      />
      <EdgeLabelRenderer>
        <button
          className={`absolute text-sm hidden`}
          style={{
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
          }}
          onClick={() => setEdges((edges) => edges.filter((e) => e.id !== id))}
        >
          Delete
        </button>
      </EdgeLabelRenderer>
    </>
  );
}

export default CustomEdge