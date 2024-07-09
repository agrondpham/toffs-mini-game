import { ReactFlowProvider } from "reactflow";
import React, { forwardRef, useRef } from "react";
import Flow, { FlowRef } from "./Flow";
import { NodeData } from "./type/LineMatchType";
export interface LineMatchRef {
  exportToJson: () => void
}
export interface LineMatchProps {
  data: NodeData[]
  flowClassName: string
}
const LineMatchComponent = forwardRef<LineMatchRef, LineMatchProps>(({data, flowClassName}, ref) => {
  const flowRef = useRef<FlowRef>(null)
  React.useImperativeHandle(ref, () => ({
    exportToJson() {
      if (flowRef.current) {
        return flowRef.current.exportToJson()
      }
      return ""
    },
  }));
  
  return (
    <ReactFlowProvider>
      <Flow data={data} ref={flowRef} flowClassName={flowClassName}/>
    </ReactFlowProvider>
  );
})
export default LineMatchComponent;
