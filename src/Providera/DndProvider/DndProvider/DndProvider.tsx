import {type PropsWithChildren, type ReactNode, useState} from "react";

import {
    DndContext,
    type DragEndEvent, type DragOverEvent,
    DragOverlay,
    type DragStartEvent,
    PointerSensor,
    useSensor,
    useSensors
} from "@dnd-kit/core";
import type {DraggableData} from "@/types/draggable-data.ts";
import ListItem from "@/components/ListItem/ListItem.tsx";
import {detectionCollision} from "@/Providera/DndProvider/utils/collision-detection.ts";
import List from "@/components/List/List.tsx";
import {useKanbanStore} from "@/stores/kanban-store/kanban-store.ts";
import {useParams} from "react-router";


type Props = PropsWithChildren;

export default function DndProvider({children}: Props): ReactNode {
   const {boardId} = useParams()

    const moveList =useKanbanStore((state) => state.moveList)
    const moveItem =useKanbanStore((state) => state.moveItem)
    const moveItemBetweenLists =useKanbanStore((state) => state.moveItemBetweenLists)

    const sensors = useSensors(useSensor(PointerSensor));

    const [activeData, setActiveData] = useState<DraggableData | null>(null)

    const handleDragStart = (event: DragStartEvent): void => {
        setActiveData(event.active.data.current as DraggableData);
    }

    const handleDragOver = (event: DragOverEvent): void => {
        if (!event.over || event.active.data.current!.isList) return;

        moveItemBetweenLists(
            boardId,
            event.active.data.current!.listIndex,
            event.active.data.current!.itemIndex,
            event.over.data.current!.listIndex,
            event.over.data.current!.itemIndex,
            );
    }

    const handleDragEnd = (event: DragEndEvent): void => {
        setActiveData(null);

        if (!event.over) return;

        if (event.active.data.current!.isList) {
            moveList(boardId,
                event.active.data.current!.listIndex,
                event.over.data.current!.listIndex,);
        } else {
            moveItem(boardId,
                event.active.data.current!.listIndex,
                event.active.data.current!.itemIndex,
                event.over.data.current!.itemtIndex,);
        }
    };


    return <DndContext
        sensors={sensors}
        collisionDetection={detectionCollision}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}>
        {children}
        <DragOverlay>
            {
                activeData && (
                    activeData.isList ? (
                        <List presentational={true} listIndex={activeData.listIndex} list={activeData.list}/>
                    ) : (
                        <ListItem
                            Presentational
                            listIndex={activeData.listIndex}
                            itemIndex={activeData.itemIndex}
                            item={activeData.item}
                        />
                    )
                )
            }
        </DragOverlay>
    </DndContext>;

}