import React from 'react';
import { Handle, HandleType, Position } from 'reactflow';

interface CustomNodeProps {
  data: {
    label: string
    handlePosition: Position
    handleType: HandleType
  };
}

const CustomNode: React.FC<CustomNodeProps> = ({ data }) => {
  const handlePosition = data.handlePosition === 'left' ? Position.Left : Position.Right;

  return (
    <div className='nodrag react-flow__node-default !border-none p-2 mb-2 bg-white rounded shadow'>
      <div>{data.label}</div>
      <Handle
        type={data.handleType}
        position={handlePosition}
        style={{ background: '#555' }}
      />
    </div>
  );
};

export default CustomNode;
