
import {type PropsWithChildren, type ReactNode, useEffect} from "react";
import {BoardsContext} from "../context/boards-context.ts";
import type {BoardType} from "@/types/board.ts";
import {boardsData} from "../Data/boards-data.ts";
import {boardReducer} from "@/reducers/board-reducer.ts";
import {useImmerReducer} from "use-immer";

function save(board: BoardType[]): void {
    localStorage.setItem("boards", JSON.stringify(board));
}

function load(): BoardType[] {
    const item = localStorage.getItem("boards");
    if (!item) {
        return boardsData;
    }

    return JSON.parse(item);
}

type Props = PropsWithChildren;


export default function BoardProvider({children}: Props): ReactNode {

    const [boards, dispatchBoards] = useImmerReducer(boardReducer, undefined, load);

    useEffect(() => save(boards), [boards]);



    return (
        <BoardsContext value={{boards, dispatchBoards}}>
            {children}
        </BoardsContext>
    )

}