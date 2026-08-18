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
import {ListItemSchema} from "@/schema/list-item-schema.ts";
import {z} from "zod";

type Values = Omit<ListItemType, "id">;
type Errors = { [key in keyof Values]?: string[] };


type Props = Pick<ComponentProps<typeof FormModal>, "modalRef"> & {
    listIndex: number;
    itemIndex: number;
    defaultValue?: Partial<Values>;
};

export default function ListItemModal({modalRef, listIndex, itemIndex, defaultValue}: Props): ReactNode {
    const {dispatchLists} = useContext(ListsContext);


    const [Errors, setErrors] = useState<Errors>({});


    const handleFormReset = () => {
        setErrors({})
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

        const {data, error} = ListItemSchema.safeParse(values);
        if (error) {
            setErrors(z.flattenError(error).fieldErrors)
            return;
        }

        if (itemIndex !== undefined) {
            dispatchLists({
                type: "item_edited",
                listIndex,
                itemIndex,
                item: data,
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
        <FormModal modalRef={modalRef} heading={
            itemIndex === undefined ? "Create a new Item" : "Edit existing Item"
        }
                   onReset={handleFormReset} onSubmit={handleFormSubmit}
                   onRemove={itemIndex !== undefined && handleRemoveItemButtonClick}>
            <TextInput label="Title" type="text" name="title"  error={Errors.title?.  [0]} defaultValue={defaultValue?.title}/>
            <TextArea label="Desctiption" name="description"  type="text" defaultValue={defaultValue?.description}  error={Errors.description?.[0]}/>
            <TextInput label="dua Date" type="date" name="duaDate" error={Errors.duaDate?.[0]} defaultValue={defaultValue?.duaDate}/>

        </FormModal>
    );
}