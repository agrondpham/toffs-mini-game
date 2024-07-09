import React, { forwardRef, useCallback, useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DraggableColumns from './DraggableColumn';
import { ReOrderColumn, ReOrderItem } from './type/ReorderType';
import DraggableItem from './DraggableItem';
import _ from 'lodash';

const initialColumns = [
    {
        id: '1',
        title: 'Source',
        itemIds: []

    },
    {
        id: '2',
        title: 'Destination',
        itemIds: []
    }
]
interface ReorderProps {
    data: ReOrderItem[];
    itemClassName?: string;
}
export interface ReOrderRef {
    exportToJson: () => void
}
const ReorderComponent = forwardRef<ReOrderRef, ReorderProps>((prop, ref) => {

    // const flowRef = useRef<FlowRef>(null)
    React.useImperativeHandle(ref, () => ({
        exportToJson() {
            return ""
        },
    }));

    const [items, setItems] = useState<ReOrderItem[]>(prop.data);
    const [columns, setColumns] = useState<ReOrderColumn[]>(initialColumns);

    useEffect(() => {
        const updatedColumns = [...columns];
        updatedColumns[0].itemIds = items.map((item) => item.id);
        setColumns(updatedColumns);
    }, [items]);

    const moveCard = (itemId: string, destColumnId: string, index: number) => {
        // index = 2
        const temp = columns.map((column) => ({
            ...column,
            itemIds: _.flowRight(
                // 2) If this is the destination column, insert the cardId.
                (ids: string[]) =>
                    column.id === destColumnId
                        ? [...ids.slice(0, index), itemId, ...ids.slice(index)]
                        : ids,
                // 1) Remove the cardId for all columns
                (ids: string[]) => ids.filter((id) => id !== itemId)
            )(column.itemIds),
        }))
        setColumns(temp)
    }


    return (
        <DndProvider backend={HTML5Backend}>
            <div className="flex space-x-4">
                {columns.map(col => (
                    <DraggableColumns
                        key={col.id}
                        title={col.title}
                        // items={items.filter((item) => col.itemIds.indexOf(item.id) > -1)}
                        // items={col.itemIds.map(itemId => items.find(item => item.id === itemId)).map()}
                        moveCard={moveCard}
                        column={col}
                    >
                        {col.itemIds
                            .map(itemId => items.find(item => item.id === itemId))
                            .map((item, index) => (
                                <DraggableItem
                                    id={item?.id}
                                    columnId={col.id}
                                    columnIndex={index}
                                    content={item?.content}
                                    moveCard={moveCard}
                                    isSpacer={false}
                                    itemClassName={prop.itemClassName}
                                />
                            ))}
                        {col.itemIds.length === 0 && (
                            <DraggableItem
                                isSpacer
                                moveCard={(itemId: string) => moveCard(itemId, col.id, 0)}
                            />
                        )}
                    </DraggableColumns>
                ))}
            </div>
        </DndProvider>
    );
});

export default ReorderComponent;
