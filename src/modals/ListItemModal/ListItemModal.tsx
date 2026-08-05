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
import type {ListItemType} from "@/types/list-item.ts";

type Values = Omit<ListItemType, "id">;

type Props = Pick<ComponentProps<typeof FormModal>, "modalRef"> & {
    listIndex: number;
};

export default function ListItemModal({modalRef, listIndex}: Props): ReactNode {
    const {dispatchLists} = useContext(BoardContext);


    const [titleError, setTitleError] = useState<string | null>(null);


    const handleFormReset = () => {
        setTitleError(null)

    }

    const handleFormSubmit = (event: SubmitEvent<HTMLFormElement>): void => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const values: Values ={
            title : formData.get("title") as string,
        }

    if (!validateTitle(values.title)) {
        return;
    }

    const itemId = globalThis.crypto.randomUUID();
    dispatchLists({type: "Item_created", listIndex, item: {id: itemId , ...values}})
    modalRef.current?.close();

    toast.success("Item created successfully.!");
};

const validateTitle = (title: string): boolean => {
    if (title.trim().length === 0) {
        setTitleError("you cant create an empty item!");
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
    <FormModal modalRef={modalRef} heading="Create a new Item"
               onReset={handleFormReset} onSubmit={handleFormSubmit}>
        <TextInput label="Title" type="text" name="text" error={titleError}/>
    </FormModal>
);
}