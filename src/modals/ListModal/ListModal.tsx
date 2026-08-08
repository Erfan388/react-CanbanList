import {
    type ComponentProps,
    type ReactNode,
    useContext,
    useState,
} from "react";

import type {SubmitEvent} from "react";
import TextInput from "@/components/TextInput/TextInput.tsx";
import {BoardContext} from "@/context/board-context.ts";
import {toast} from "react-toastify";
import FormModal from "@/modals/FormModal/FormModal.tsx";
import type {ListType} from "@/types/list.ts";
import Button from "@/components/Button/Button.tsx";

type Values = Omit<ListType, "id" | "items">;

type Props = Pick<ComponentProps<typeof FormModal>, "modalRef"> & {
    listIndex?: number;
    defaultValues?: Partial<Values>;
};

export default function ListModal({modalRef, listIndex, defaultValues}: Props): ReactNode {
    const {dispatchLists} = useContext(BoardContext);


    const [titleError, setTitleError] = useState<string | null>(null);


    const handleFormReset = () => {
        setTitleError(null)

    }

    const handleFormSubmit = (event: SubmitEvent<HTMLFormElement>): void => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const rawTitle = formData.get("title");

        console.log("rawTitle:", rawTitle);
        console.log("type:", typeof rawTitle);

        const values: Values = {
            title: typeof rawTitle === "string" ? rawTitle : "",
        };

        if (!validateTitle(values.title)) {
            return;
        }

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
        if (!listIndex) return;

        dispatchLists({type: "list_removed", listIndex})
        toast.success("list removed successfully.!");

        modalRef.current?.close();
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
        <FormModal modalRef={modalRef} heading={listIndex !== undefined ? "Edit this List" : "create a new list"}
                   onReset={handleFormReset} onSubmit={handleFormSubmit}
                   extraActions={
                       listIndex !== undefined && (
                           <Button
                               type="button"
                               variant="text"
                               color="danger"
                               onClick={handleRemoveButtonClick}>
                               Remove
                           </Button>
                       )}>
            <TextInput defaultValue={defaultValues?.title} label="Title" type="text" name="text" error={titleError}/>
        </FormModal>
    );
}