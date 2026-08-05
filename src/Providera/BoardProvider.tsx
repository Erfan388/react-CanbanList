
import {type PropsWithChildren, type ReactNode, useEffect} from "react";
import {BoardContext} from "@/context/board-context.ts";
import type {ListType} from "@/types/list.ts";
import {listsData} from "@/Data/lists-data.ts";
import {listsReducer} from "@/reducers/list-reducer.ts";
import {useImmerReducer} from "use-immer";

function save(list: ListType[]): void {
    localStorage.setItem("lists", JSON.stringify(list));
}

function load(): ListType[] {
    const item = localStorage.getItem("lists");
    if (!item) {
        return listsData;
    }

    return JSON.parse(item);
}

type Props = PropsWithChildren;


export default function BoardProvider({children}: Props): ReactNode {

    const [lists, dispatchLists] = useImmerReducer(listsReducer, undefined, load);

    useEffect(() => save(lists), [lists]);



    return (
        <BoardContext value={{lists, dispatchLists}}>
            {children}
        </BoardContext>
    )

}