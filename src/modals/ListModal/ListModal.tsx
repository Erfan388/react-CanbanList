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

type Values = Omit<ListType, "id" | "items">;

type Props = Pick<ComponentProps<typeof FormModal>, "modalRef"> & {};

export default function ListModal({modalRef}: Props): ReactNode {
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

        const id = globalThis.crypto.randomUUID();
        dispatchLists({type: "list_created", list: {id, items: [], ...values}})
        modalRef.current?.close();

        toast.success("list created successfully.!");
    };


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
        <FormModal modalRef={modalRef} heading="Create a new list"
                   onReset={handleFormReset} onSubmit={handleFormSubmit}>
            <TextInput label="Title" type="text" name="text" error={titleError}/>
        </FormModal>
    );
}