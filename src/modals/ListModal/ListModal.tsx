import {
    type ComponentProps,
    type ReactNode,
    useContext,
} from "react";

import TextInput from "@/components/TextInput/TextInput.tsx";
import {ListsContext} from "@/context/lists-context.ts";
import {toast} from "react-toastify";
import FormModal from "@/modals/FormModal/FormModal.tsx";
import type {ListType} from "@/types/list.ts";
import {ListSchema} from "@/schema/list-schema.ts";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

type Values = Omit<ListType, "id" | "items">;

type Props = Pick<ComponentProps<typeof FormModal>, "modalRef"> & {
    listIndex?: number;
    defaultValues?: Values;
};

export default function ListModal({modalRef, listIndex, defaultValues}: Props): ReactNode {
    const {dispatchLists} = useContext(ListsContext);


  const { register, handleSubmit, formState: { errors } } = useForm({defaultValues , resolver : zodResolver(ListSchema)});


    const handleFormSubmit = (values: Values): void => {


        if (listIndex !== undefined) {
            dispatchLists({type: "list_edited", listIndex, list: values})
            toast.success("list edited  successfully.!");
        } else {
            const id = globalThis.crypto.randomUUID();
            dispatchLists({type: "list_created", list: {id, items: [], ...values}})
            toast.success("list created successfully.!");
        }

        modalRef.current?.close();
    };

    const handleRemoveButtonClick = (): void => {
        if (listIndex === undefined) return;

        dispatchLists({type: "list_removed", listIndex})
        toast.success("list removed successfully.!");

        modalRef.current?.close();
    }

    return (
// @ts-ignore
        <FormModal modalRef={modalRef} heading={listIndex !== undefined ? "Edit this List" : "create a new list"}
                   onSubmit={handleSubmit (handleFormSubmit)}
                   onRemove={listIndex !== undefined && handleRemoveButtonClick}>
            <TextInput {...register('title')}  label="Title" type="text" error={errors.title?.message}/>
        </FormModal>
    );
}