import {memo, type ReactNode, type MouseEvent, useRef} from "react";

import {CSS} from "@dnd-kit/utilities";
import styles from './ListItem.module.css';
import type {ListItemType} from "@/types/list-item.ts";
import IconButton from "@/components/IconButton/IconButton.tsx";

import {useSortable} from "@dnd-kit/sortable";
import clsx from "clsx";
import MingcuteEdit2Line from "@/components/icons/MingcuteEdit2Line.tsx";
import ListItemModal from "@/modals/ListItemModal/ListItemModal.tsx";


type Props = {
    Presentational?: boolean;
    listIndex: number;
    itemIndex: number;
    item: ListItemType;
}


const ListItem = memo
(function ListItem({item, listIndex, itemIndex, Presentational,}: Props): ReactNode {
    const modalRef = useRef<HTMLDialogElement>(null);

    const {attributes, listeners, setNodeRef, transform, transition, isDragging, over} = useSortable({
        id: item.id,
        data: {
            isList: false, listIndex, itemIndex, item
        }
    })
    const oveListIndex = over?.data.current?.listIndex;

    const handleEditButtonClick = (event: MouseEvent<HTMLButtonElement>): void => {
        event.stopPropagation();

        modalRef.current?.showModal();
    }

    return (
        <>
            <div ref={setNodeRef} className={clsx(styles["list-item"], Presentational && styles.Presentational)}
                 style={{
                     opacity: isDragging ? ".5" : undefined,
                     transform: CSS.Translate.toString(transform),
                     transition: listIndex === oveListIndex ? transition : undefined,
                 }}
                 {...listeners} {...attributes}>
                {item.title}
                <IconButton onPointerDown={handleEditButtonClick}>
                    <MingcuteEdit2Line/>
                </IconButton>
            </div>
            <ListItemModal listIndex={listIndex} modalRef={modalRef} itemIndex={itemIndex} defaultValues={item}/>
        </>)
})

export default ListItem;