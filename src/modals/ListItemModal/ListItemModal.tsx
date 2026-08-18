import {
    type ComponentProps,
    type ReactNode,
    useContext,
    useState,
} from "react";

import type {SubmitEvent} from "react";
import TextInput from "@/components/TextInput/TextInput.tsx";
import {ListsContext} from "@/context/lists-context.ts";
import {toast} from "react-toastify";
import FormModal from "@/modals/FormModal/FormModal.tsx";
import type {ListItemType} from "@/types/list-item.ts";
import TextArea from "@/components/TextArea/TextArea.tsx";
import Button from "@/components/Button/Button.tsx";

type Values = Omit<ListItemType, "id">;

type Props = Pick<ComponentProps<typeof FormModal>, "modalRef"> & {
    listIndex: number;
    itemIndex: number;
    defaultValue?: Partial<Values>;
};

export default function ListItemModal({modalRef, listIndex, itemIndex, defaultValue}: Props): ReactNode {
    const {dispatchLists} = useContext(ListsContext);


    const [titleError, setTitleError] = useState<string | null>(null);


    const handleFormReset = () => {
        setTitleError(null)

    }

    const handleFormSubmit = (event: SubmitEvent<HTMLFormElement>): void => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const title = formData.get("title");
        if (typeof title !== "string") {
            return;
        }
        const values: Values = {
            title,
            description: formData.get("description") as string,
            duaDate: formData.get("duaDate") as string,
        }

        if (!validateTitle(values.title)) {
            return;
        }

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
        <FormModal modalRef={modalRef} heading={
            itemIndex === undefined ? "Create a new Item" : "Edit existing Item"
        }
                   onReset={handleFormReset} onSubmit={handleFormSubmit}
                   extraActions={
                       itemIndex !== undefined && (
                           <Button
                               type="button"
                               variant="text"
                               color="danger"
                               onClick={handleRemoveItemButtonClick}>
                               Remove
                           </Button>
                       )}>
            <TextInput label="Title" type="text" name="title" error={titleError} defaultValue={defaultValue?.title}/>
            <TextArea label="Desctiption" name="description" type="text" defaultValue={defaultValue?.description}/>
            <TextInput label="dua Date" type="date" name="duaDate" error={titleError}
                       defaultValue={defaultValue?.duaDate}/>

        </FormModal>
    );
}