import type {Draft} from "immer";
import type {BoardType} from "@/types/board.ts";

export type BoardsAction =
    {
        type: "board_created";
        board: BoardType;
    }
    |
    {
        type: "board_edited";
        board: Partial<BoardType>;
        boardId: string;
    }
    |
    {
        type: "board_removed";
        boardId: string;
    }
;


export function boardReducer(draft: Draft<BoardType[]>, action: BoardsAction): void {
    switch (action.type) {
        case "board_created": {
            draft.push(action.board);
            return;
        }
        case "board_edited": {
            const boardIndex = draft.findIndex(board => board.id === action.boardId);

            if (boardIndex === -1) return;

            draft[boardIndex] = {...draft[boardIndex], ...action.board};

            return;
        }
        case "board_removed": {
            const boardIndex = draft.findIndex((board) => board.id === action.boardId);

            if (boardIndex === -1) return;

            draft.splice(boardIndex, 1);
            return;
        }
        default: {
            throw new Error("unknown action type");
        }
    }
}