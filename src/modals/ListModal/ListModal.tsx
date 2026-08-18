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
import type {ListType} from "@/types/list.ts";
import Button from "@/components/Button/Button.tsx";
import {ListSchema} from "@/schema/list-schema.ts";
import {z} from "zod";

type Values = Omit<ListType, "id" | "items">;
type Errors = { [key in keyof Values]?: string[] };

type Props = Pick<ComponentProps<typeof FormModal>, "modalRef"> & {
    listIndex?: number;
    defaultValues?: Partial<Values>;
};

export default function ListModal({modalRef, listIndex, defaultValues}: Props): ReactNode {
    const {dispatchLists} = useContext(ListsContext);


    const [Errors, setErrors] = useState<Errors>({});


    const handleFormReset = () => {
        setErrors({})

    }

    const handleFormSubmit = (event: SubmitEvent<HTMLFormElement>): void => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const rawTitle = formData.get("title");

        const values: Values = {
            title: typeof rawTitle === "string" ? rawTitle : "",
        };

        const {data, error} = ListSchema.safeParse(values);
        if (error) {
            setErrors(z.flattenError(error).fieldErrors)
            return;
        }

        if (listIndex !== undefined) {
            dispatchLists({type: "list_edited", listIndex, list: data})
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
            <TextInput defaultValue={defaultValues?.title} label="Title" type="text" name="title" error={Errors.title?.  [0]}/>
        </FormModal>
    );
}