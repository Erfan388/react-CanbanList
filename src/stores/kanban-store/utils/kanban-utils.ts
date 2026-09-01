import type {WritableDraft} from "immer";
import type {kanbanStore} from "@/stores/kanban-store/kanban-store.ts";
import type {BoardType} from "@/types/board.ts";

export function withBoardIndex(
    state: WritableDraft<kanbanStore>,
    boardId: string | undefined,
    callback: (boardIndex: number) => void
): void {

    const boardIndex = state.boards.findIndex((board) => board.id === boardId);

    if (boardIndex === -1) return;

    callback(boardIndex);
}

export function withBoard(
    state: WritableDraft<kanbanStore>,
    boardId: string | undefined,
    callback: (board: BoardType) => void
): void {
withBoardIndex(state, boardId, (boardIndex) => {
    callback(state.boards[boardIndex]);
})
}