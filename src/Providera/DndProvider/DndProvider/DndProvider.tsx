import {type PropsWithChildren, type ReactNode, useContext, useState} from "react";

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
import {BoardContext} from "@/context/board-context.ts";
import List from "@/components/List/List.tsx";


type Props = PropsWithChildren;

export default function DndProvider({children}: Props): ReactNode {
    const {dispatchLists} = useContext(BoardContext)

    const sensors = useSensors(useSensor(PointerSensor));

    const [activeData, setActiveData] = useState<DraggableData | null>(null)

    const handleDragStart = (event: DragStartEvent): void => {
        setActiveData(event.active.data.current as DraggableData);
    }

    const handleDragOver = (event: DragOverEvent): void => {
        if (!event.over || event.active.data.current!.isList) return;

        dispatchLists({
            type: "Item_dragged_over",
            activeListIndex: event.active.data.current!.listIndex,
            activeItemIndex: event.active.data.current!.itemIndex,
            overListIndex: event.over.data.current!.listIndex,
            overItemIndex: event.over.data.current!.itemIndex,
        });
    }

    const handleDragEnd = (event: DragEndEvent): void => {
        setActiveData(null);

        if (!event.over) return;

        if (event.active.data.current!.isList) {
            dispatchLists({
                type: "List_dragged_end",
                activeListIndex: event.active.data.current!.listIndex,
                overListIndex: event.over.data.current!.listIndex,
            });
        } else {
            dispatchLists({
                type: "Item_dragged_end",
                activeListIndex: event.active.data.current!.listIndex,
                activeItemIndex: event.active.data.current!.itemIndex,
                overItemIndex: event.over.data.current!.itemIndex,
            });
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
                        <List Presentational={true} listIndex={activeData.listIndex} list={activeData.list}/>
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