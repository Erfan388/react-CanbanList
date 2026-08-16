import {type PropsWithChildren, type ReactNode, use, useEffect} from "react";
import {ListsContext} from "../context/lists-context.ts";
import {listsReducer} from "@/reducers/list-reducer.ts";
import {useImmerReducer} from "use-immer";
import {BoardsContext} from "@/context/boards-context.ts";
import {BoardpageContext} from "@/context/board-page-context.ts";


type Props = PropsWithChildren;


export default function ListProvider({children}: Props): ReactNode {
    const {dispatchBoards} = use(BoardsContext)
    const {board} = use(BoardpageContext);

    const [lists, dispatchLists] = useImmerReducer(listsReducer, board.lists);

    useEffect(() => {
        dispatchBoards({
            type: "board_edited"
            , boardId: board.id,
            board: {lists},
        });
    }, [board.id, dispatchBoards, lists]);


    return (
        <ListsContext value={{lists, dispatchLists}}>
            {children}
        </ListsContext>
    )

}