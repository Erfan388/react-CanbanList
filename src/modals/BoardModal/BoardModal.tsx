import {
    type ComponentProps,
    type ReactNode,
} from "react";

import {BoardSchema} from "@/schema/board-schema.ts";
import {zodResolver} from "@hookform/resolvers/zod";



import TextInput from "@/components/TextInput/TextInput.tsx";
import {toast} from "react-toastify";
import FormModal from "@/modals/FormModal/FormModal.tsx";
import TextArea from "@/components/TextArea/TextArea.tsx";
import ColorInput from "@/components/ColorInput/ColorInput.tsx";
import {useNavigate} from "react-router";
import {Controller, useForm} from "react-hook-form";
import {z} from "zod";
import {useKanbanStore} from "@/stores/kanban-store/kanban-store.ts";

type Values = z.infer<typeof BoardSchema>;

type Props = Pick<ComponentProps<typeof FormModal>, "modalRef"> & {
    boardId?: string;
    defaultValues?: Values;
};

export default function BoardModal({modalRef, boardId, defaultValues}: Props): ReactNode {
    const createBoard =useKanbanStore((state) => state.createBoard)
    const editBoard =useKanbanStore((state) => state.editBoard)
    const removeBoard =useKanbanStore((state) => state.removeBoard)

    const {control, reset ,register, handleSubmit, formState: {errors}} = useForm({
        defaultValues: defaultValues ?? {color : 'blue'},
        resolver: zodResolver(BoardSchema)
    });


    const handleFormSubmit = (values : Values): void => {
        if (boardId !== undefined) {
            editBoard(boardId, values)
            toast.success("boardedited  successfully.!");
        } else {
            createBoard(values)
            toast.success("board created successfully.!");
        }
        modalRef.current?.close();
    };

    const navigate = useNavigate();

    const handleRemoveButtonClick = (): void => {
        if (boardId === undefined) return;

        removeBoard(boardId)
        toast.success("board removed successfully.!");

        modalRef.current?.close();

        navigate("/");
    }

    return (
// @ts-ignore
        <FormModal  modalRef={modalRef} onClose={()=> reset()} heading={boardId !== undefined ? "Edit this Board" : "create a new board"}
                   onSubmit={handleSubmit(handleFormSubmit)}
                   onRemove={boardId !== undefined && handleRemoveButtonClick}>
            <TextInput  {...register('title')} label="Title" type="text" error={errors.title?.message}/>
            <TextArea  {...register('description')} label="Desctiption" type="text" error={errors.description?.message}/>
            {/*use controller for fix the problem*/}
            <Controller name="color" control={control}  render={({field}) => (
                <ColorInput  {...field} label="color" error={errors.color?.message}/>
            )} />
        </FormModal>
    );
}