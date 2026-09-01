import {
    type ComponentProps,
    type ReactNode,
} from "react";

import TextInput from "@/components/TextInput/TextInput.tsx";
import {toast} from "react-toastify";
import FormModal from "@/modals/FormModal/FormModal.tsx";
import {ListSchema} from "@/schema/list-schema.ts";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {useKanbanStore} from "@/stores/kanban-store/kanban-store.ts";
import {useParams} from "react-router";

type Values = z.infer<typeof ListSchema>;

type Props = Pick<ComponentProps<typeof FormModal>, "modalRef"> & {
    listIndex?: number;
    defaultValues?: Values;
};

export default function ListModal({modalRef, listIndex, defaultValues}: Props): ReactNode {
    const createList =useKanbanStore((state) => state.createList)
    const editList =useKanbanStore((state) => state.editList)
    const removeList =useKanbanStore((state) => state.removeList)

const {boardId} = useParams()

    const { register, reset, handleSubmit, formState: { errors } } = useForm({defaultValues , resolver : zodResolver(ListSchema)});


    const handleFormSubmit = (values: Values): void => {


        if (listIndex !== undefined) {
            editList(boardId, listIndex, values)
            toast.success("list edited  successfully.!");
        } else {
            createList(boardId, values)
            toast.success("list created successfully.!");
        }

        modalRef.current?.close();
    };

    const handleRemoveButtonClick = (): void => {
        if (listIndex === undefined) return;

        removeList(boardId, listIndex);
        toast.success("list removed successfully.!");

        modalRef.current?.close();
    }

    return (
// @ts-ignore
        <FormModal onClose={()=> reset()} modalRef={modalRef} heading={listIndex !== undefined ? "Edit this List" : "create a new list"}
                   onSubmit={handleSubmit (handleFormSubmit)}
                   onRemove={listIndex !== undefined && handleRemoveButtonClick}>
            <TextInput {...register('title')}  label="Title" type="text" error={errors.title?.message}/>
        </FormModal>
    );
}