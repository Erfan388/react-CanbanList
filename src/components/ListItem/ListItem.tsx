import {memo, type ReactNode, type MouseEvent, use} from "react";

import {CSS} from "@dnd-kit/utilities";
import styles from './ListItem.module.css';
import type {ListItemType} from "@/types/list-item.ts";
import IconButton from "@/components/IconButton/IconButton.tsx";
import MingcuteDelete2Line from "@/components/icons/MingcuteDelete2Line.tsx";
import {BoardContext} from "@/context/board-context.ts";
import {toast} from "react-toastify";
import {useSortable} from "@dnd-kit/sortable";
import clsx from "clsx";


type Props = {
    Presentational?: boolean;
    listIndex: number;
    itemIndex: number;
    item: ListItemType;
}


const ListItem = memo
(function ListItem({item, listIndex, itemIndex, Presentational,}: Props): ReactNode {
    const {dispatchLists} = use(BoardContext);

    const {attributes, listeners, setNodeRef, transform, transition , isDragging, over} = useSortable({
        id: item.id,
        data: {
            isList: false, listIndex, itemIndex, item
        }
    })
    const oveListIndex = over?.data.current?.listIndex;

    const handleRemoveButtonClick = (event: MouseEvent<HTMLButtonElement>): void => {
        event.stopPropagation();

        dispatchLists({type: "Item_removed", listIndex, itemIndex});
        toast.success("Item removed successfully.!");
    }

    return (
        <div ref={setNodeRef} className={clsx(styles["list-item"] , Presentational && styles.Presentational)}
             style={{
                 opacity: isDragging ? ".5" : undefined,
                 transform: CSS.Translate.toString(transform),
                 transition : listIndex === oveListIndex ? transition : undefined,
             }}
             {...listeners} {...attributes}>
            {item.title}
            <IconButton onPointerDown={handleRemoveButtonClick}>
                <MingcuteDelete2Line/>
            </IconButton>
        </div>)
})

export default ListItem;