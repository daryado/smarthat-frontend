import {PlayerColor} from "../../types";

export type RoomStateResponse = {
    players : [];
    game_started: boolean;
    round_started: boolean;
    time_left: number;
    is_paused: boolean;
    semantic_board: [];
    Player: {
        name: string;
        role: string;
        color: PlayerColor;
        score: number;
    };
    SemanticBoard: {
        playerName: string;
        word: string;
        similarity: 0.0;
    };
};

export type LeadWordResponse = {
    word: string;
}
