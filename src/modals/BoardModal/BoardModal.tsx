import {
    type ComponentProps,
    type ReactNode,
    useContext,
    useState,
} from "react";

import type {SubmitEvent} from "react";
import TextInput from "@/components/TextInput/TextInput.tsx";
import {BoardsContext} from "@/context/boards-context.ts";
import {toast} from "react-toastify";
import FormModal from "@/modals/FormModal/FormModal.tsx";
import type {BoardColor, BoardType} from "@/types/board.ts";
import Button from "@/components/Button/Button.tsx";
import TextArea from "@/components/TextArea/TextArea.tsx";
import ColorInput from "@/components/ColorInput/ColorInput.tsx";
import {useNavigate} from "react-router";

type Values = Omit<BoardType, "id" | "lists">;

type Props = Pick<ComponentProps<typeof FormModal>, "modalRef"> & {
    boardId?: string;
    defaultValues?: Partial<Values>;
};

export default function BoardModal({modalRef, boardId, defaultValues}: Props): ReactNode {
    const {dispatchBoards} = useContext(BoardsContext);


    const [titleError, setTitleError] = useState<string | null>(null);


    const handleFormReset = () => {
        setTitleError(null)

    }

    const handleFormSubmit = (event: SubmitEvent<HTMLFormElement>): void => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const rawTitle = formData.get("title");

        const values: Values = {
            title: typeof rawTitle === "string" ? rawTitle : "",
            description: formData.get("description") as string,
            color: formData.get("color") as BoardColor,
        };

        if (!validateTitle(values.title)) {
            return;
        }

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


    const validateTitle = (title: string): boolean => {
        if (title.trim().length === 0) {
            setTitleError("you can't create an empty item!");
            return false;
        }
        if (title.trim().length < 5) {
            setTitleError("at least 5 characters long!");
            return false;
        }

        setTitleError(null);
        return true;
    };


    return (
// @ts-ignore
        <FormModal modalRef={modalRef} heading={boardId !== undefined ? "Edit this Board" : "create a new board"}
                   onReset={handleFormReset} onSubmit={handleFormSubmit}
                   extraActions={
                       boardId !== undefined && (
                           <Button
                               type="button"
                               variant="text"
                               color="danger"
                               onClick={handleRemoveButtonClick}>
                               Remove
                           </Button>
                       )}>
            <TextInput defaultValue={defaultValues?.title} label="Title" type="text" name="title" error={titleError}/>
            <TextArea label="Desctiption" name="description" type="text" defaultValue={defaultValues?.description}/>
            <ColorInput label="color" name="color" defaultValue={defaultValues?.color}/>

        </FormModal>
    );
}