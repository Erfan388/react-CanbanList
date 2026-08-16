
import {type PropsWithChildren, type ReactNode} from "react";
import type {BoardType} from "@/types/board.ts";
import {BoardpageContext} from "@/context/board-page-context.ts";


type Props = PropsWithChildren<{
    board: BoardType;
}>;


export default function BoardPageProvider({board,children}: Props): ReactNode {
    return <BoardpageContext value={{board}}>{children}</BoardpageContext>
}