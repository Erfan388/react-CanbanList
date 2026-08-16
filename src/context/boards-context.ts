import {type ActionDispatch, createContext,} from "react";
import type {BoardType} from "@/types/board.ts";
import type {BoardsAction} from "@/reducers/board-reducer.ts";

type ContextValue = {
    boards: BoardType[];
    dispatchBoards: ActionDispatch<[action: BoardsAction]>;
}


export const BoardsContext = createContext<ContextValue>({} as ContextValue)