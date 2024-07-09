import React, { ReactNode, useState } from 'react';
import { ReOrderColumn, ReOrderItem } from './type/ReorderType';
import DraggableItem from './DraggableItem';


interface ColumnProps {
  title: string;
  children: ReactNode;
  // items: ReOrderItem[];
  column: ReOrderColumn;
  moveCard: (id: string, columnId: string, columnIndex: number) => void;
}
const DraggableColumn = ({ title,children, column, moveCard }: ColumnProps) => {
  return (
    <div className="w-1/2 p-4 bg-gray-200 rounded">
      {children}
    </div>
  );
};

export default DraggableColumn;
