import {
    type ComponentProps,
    type ReactNode,
    useContext,
} from "react";

import TextInput from "@/components/TextInput/TextInput.tsx";
import {ListsContext} from "@/context/lists-context.ts";
import {toast} from "react-toastify";
import FormModal from "@/modals/FormModal/FormModal.tsx";
import TextArea from "@/components/TextArea/TextArea.tsx";
import {ListItemSchema} from "@/schema/list-item-schema.ts";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";

type Values = z.infer<typeof  ListItemSchema>;


type Props = Pick<ComponentProps<typeof FormModal>, "modalRef"> & {
    listIndex: number;
    itemIndex?: number;
    defaultValues?: Values;
};

export default function ListItemModal({modalRef, listIndex, itemIndex, defaultValues}: Props): ReactNode {
    const {dispatchLists} = useContext(ListsContext);

    const {register, reset,handleSubmit, formState: {errors}} = useForm({
        defaultValues,
        resolver: zodResolver(ListItemSchema)
    });


    const handleFormSubmit = (values: Values): void => {


        if (itemIndex !== undefined) {
            dispatchLists({
                type: "item_edited",
                listIndex,
                itemIndex,
                item: values,
            });
            toast.success("Item edited successfully.!");
        } else {
            const itemId = globalThis.crypto.randomUUID();
            dispatchLists({type: "Item_created", listIndex, item: {id: itemId, ...values}})
            toast.success("Item created successfully.!");
        }

        modalRef.current?.close();
    };

    const handleRemoveItemButtonClick = (): void => {
        if (itemIndex === undefined) return;

        dispatchLists({type: "Item_removed", listIndex, itemIndex});
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