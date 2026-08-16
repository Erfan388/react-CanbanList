import { createContext,} from "react";
import type {BoardType} from "@/types/board.ts";

type ContextValue = {
    board: BoardType;
}


export const BoardpageContext = createContext<ContextValue>({} as ContextValue);