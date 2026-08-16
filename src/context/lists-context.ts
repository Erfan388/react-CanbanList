import type {ListType} from "@/types/list.ts";
import {type ActionDispatch, createContext,} from "react";
import type {ListAction} from "@/reducers/list-reducer.ts";

type ContextValue = {
    lists: ListType[];
    dispatchLists: ActionDispatch<[action: ListAction]>;
}


export const ListsContext = createContext<ContextValue>({} as ContextValue)