import {
    type ComponentProps,
    type ReactNode,
} from "react";

import TextInput from "@/components/TextInput/TextInput.tsx";
import {toast} from "react-toastify";
import FormModal from "@/modals/FormModal/FormModal.tsx";
import TextArea from "@/components/TextArea/TextArea.tsx";
import {ListItemSchema} from "@/schema/list-item-schema.ts";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {useKanbanStore} from "@/stores/kanban-store/kanban-store.ts";
import {useParams} from "react-router";

type Values = z.infer<typeof  ListItemSchema>;


type Props = Pick<ComponentProps<typeof FormModal>, "modalRef"> & {
    listIndex: number;
    itemIndex?: number;
    defaultValues?: Values;
};

export default function ListItemModal({modalRef, listIndex, itemIndex, defaultValues}: Props): ReactNode {
    const createItemList =useKanbanStore((state) => state.createItem)
    const editItemList =useKanbanStore((state) => state.editItem)
    const removeItemList =useKanbanStore((state) => state.removeItem)

    const {boardId} = useParams()


    const {register, reset,handleSubmit, formState: {errors}} = useForm({
        defaultValues,
        resolver: zodResolver(ListItemSchema)
    });


    const handleFormSubmit = (values: Values): void => {


        if (itemIndex !== undefined) {
            editItemList(boardId, listIndex, itemIndex, values);
            toast.success("Item edited successfully.!");
        } else {
            createItemList(boardId, listIndex, values);
            toast.success("Item created successfully.!");
        }

        modalRef.current?.close();
    };

    const handleRemoveItemButtonClick = (): void => {
        if (itemIndex === undefined) return;

        removeItemList(boardId, listIndex, itemIndex);
        toast.success("item removed successfully.!");

        modalRef.current?.close();
    }

    return (
// @ts-ignore
        <FormModal onClose={()=> reset()} modalRef={modalRef} heading={
            itemIndex === undefined ? "Create a new Item" : "Edit existing Item"
        }
                   onSubmit={handleSubmit(handleFormSubmit)}
                   onRemove={itemIndex !== undefined && handleRemoveItemButtonClick}>
            <TextInput {...register('title')} label="Title" type="text" error={errors.title?.message}/>
            <TextArea {...register('description')} label="Desctiption" type="text" error={errors.description?.message}/>
            <TextInput {...register('duaDate')} label="dua Date" type="date" error={errors.duaDate?.message}/>

        </FormModal>
    );
}