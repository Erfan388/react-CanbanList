import type {BoardType} from "@/types/board.ts";
import type {kanbanStateCreator} from "@/stores/kanban-store/kanban-store.ts";
import {boardsData} from "@/Data/boards-data.ts";
import {withBoardIndex} from "@/stores/kanban-store/utils/kanban-utils.ts";

export type BoardSlice = {
    boards: BoardType[];
    createBoard: (board: Omit<BoardType, 'id' | "lists">) => void;
    editBoard: (boardId: string | undefined, board: Partial<BoardType>) => void;
    removeBoard: (boardId: string | undefined,) => void;
}


export const createBoardsSlice: kanbanStateCreator<BoardSlice> = (set) => ({
    boards: boardsData,

    createBoard: (board) => set((state) => {
        const id = globalThis.crypto.randomUUID();
        state.boards.push({id, lists: [], ...board})
    }),

    editBoard: ( boardId,board) =>
        set((state) =>
            withBoardIndex(state, boardId, (boardIndex) => {
                state.boards[boardIndex] = {...state.boards[boardIndex], ...board };
    })),

    removeBoard: (boardId) => set((state) =>
        withBoardIndex(state, boardId, (boardIndex) => {
            state.boards.splice(boardIndex, 1);
        })),
});