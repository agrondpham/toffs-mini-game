import React, { ReactNode, useState } from 'react';
// import {DragSource, DropTarget} from 'react-dnd';
import _ from 'lodash';
import { ConnectDragSource, ConnectDropTarget, DragSourceMonitor, DropTargetMonitor, useDrag, useDrop } from 'react-dnd';


interface ItemProps {
    id?: string ;
    content?: string ;
    // children: ReactNode;
    columnId?: string;
    columnIndex?: number;
    moveCard: (id: string, columnId: string, columnIndex: number) => void;
    isDragging?: boolean;
    isSpacer: boolean;
    itemClassName?: string;
}

const DraggableItem: React.FC<ItemProps> = (props) => {
    const [{ isDragging }, drag] = useDrag({
      type: 'Card',
      item: { id: props.id },
      collect: (monitor: DragSourceMonitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });
  
    const [, drop] = useDrop({
      accept: 'Card',
      // drop: (item) => { console.log('drop')},
      drop: (item: { id: string }) => {
        const { columnId, columnIndex } = props;
        if (item.id !== props.id) {
          props.moveCard(item.id, columnId || '0', columnIndex || 0 );
        }
      },
    });
  
    return (
      <div ref={(node) => drag(drop(node))}>
        <div className={`p-2 mb-2 bg-white rounded shadow ${props.itemClassName}`}>{props.content}</div>
      </div>
    );
  };
  
  export default DraggableItem;