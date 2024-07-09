export const ItemTypes = {
    BOX: 'box',
}
export interface ReOrderItem {
    id: string,
    content: string
}
export interface ReOrderColumn {
    id: string,
    title: string,
    itemIds: string[]
}