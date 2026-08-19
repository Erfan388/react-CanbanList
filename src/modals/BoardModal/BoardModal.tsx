import {
    type ComponentProps,
    type ReactNode,
    useContext,
} from "react";

import {BoardSchema} from "@/schema/board-schema.ts";
import {BoardsContext} from "@/context/boards-context.ts";
import {zodResolver} from "@hookform/resolvers/zod";



import TextInput from "@/components/TextInput/TextInput.tsx";
import {toast} from "react-toastify";
import FormModal from "@/modals/FormModal/FormModal.tsx";
import TextArea from "@/components/TextArea/TextArea.tsx";
import ColorInput from "@/components/ColorInput/ColorInput.tsx";
import {useNavigate} from "react-router";
import {Controller, useForm} from "react-hook-form";
import {z} from "zod";

type Values = z.infer<typeof BoardSchema>;

type Props = Pick<ComponentProps<typeof FormModal>, "modalRef"> & {
    boardId?: string;
    defaultValues?: Values;
};

export default function BoardModal({modalRef, boardId, defaultValues}: Props): ReactNode {
    const {dispatchBoards} = useContext(BoardsContext);

    const {control, reset ,register, handleSubmit, formState: {errors}} = useForm({
        defaultValues,
        resolver: zodResolver(BoardSchema)
    });


    const handleFormSubmit = (values : Values): void => {
        if (boardId !== undefined) {
            dispatchBoards({type: "board_edited", boardId, board: values})
            toast.success("boardedited  successfully.!");
        } else {
            const id = globalThis.crypto.randomUUID();
            dispatchBoards({type: "board_created", board: {id, lists: [], ...values}})
            toast.success("boardcreated successfully.!");
        }
        modalRef.current?.close();
    };

    const navigate = useNavigate();

    const handleRemoveButtonClick = (): void => {
        if (boardId === undefined) return;

        dispatchBoards({type: "board_removed", boardId})
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