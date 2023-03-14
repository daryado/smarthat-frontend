import {
    SET_JOINED_PAGE,
    CREATOR_STARTS_THE_GAME,
    CREATE_NEW_GAME,
    PlayerColor, PLAYER_CLEAN_OFF_GAME,
    IN_GAME_SET_WORD,
    GAME_RESULTS,
    CHANGE_LEADER, READY_TO_CONTINUE, CREATOR_STARTS_THE_ROUND,
} from "../../types";
import {username} from "../selectors";

export enum GameCycle {
    None = "NONE",
    Lobby = "LOBBY",
    Started = "STARTED",
    Result = "RESULT"
}

export interface State {
    username: string;
    lobbyCode: string;
    color: {red: 0, green: 0, blue: 0},
    players: [],
    leader: string;
    is_leader: boolean,
    word: string,
    game_stage: GameCycle,
}

export const initialState : State = {
    username: "",
    lobbyCode: "",
    color: {red: 0, green: 0, blue: 0},
    players: [],
    is_leader: false,
    leader: "",
    //started: false,
    word: "",
    game_stage: GameCycle.None,
};

export const initialReducer = (state = initialState, action : any) => {
    switch (action.type) {
        case SET_JOINED_PAGE:
            return {...state,
                    username: action.username,
                    lobbyCode: action.lobbyCode,
                    color: action.color,
                    game_stage: GameCycle.Lobby,
                    is_leader: false}

        case CREATOR_STARTS_THE_GAME:
            return {...state,
                    game_stage: GameCycle.Started}

        case CREATE_NEW_GAME:
            return {...state,
                    username: action.username,
                    lobbyCode: action.lobbyCode,
                    color: action.color,
                    leader: action.username,
                    is_leader: true,
                    game_stage: GameCycle.Lobby}
                    //started: false}

        case PLAYER_CLEAN_OFF_GAME:
            return {...state,
                username: "",
                lobbyCode: "",
                color: {red: 0, green: 0, blue: 0},
                is_leader: false,
                leader: "",
                game_stage: GameCycle.None}
                //started: false}

        case IN_GAME_SET_WORD:
            return {...state,
                word: action.word,
            }
        case GAME_RESULTS:
            return {...state,
                game_stage: GameCycle.Result,
            }
        case READY_TO_CONTINUE:
            return {...state,
                game_stage: GameCycle.Started,
            }
        case CHANGE_LEADER:
            return {...state,
                is_leader: (state.username == action.leaderName),
                leader: action.leaderName,
            }
        case CREATOR_STARTS_THE_ROUND:
            return {...state,
                word: ''}

        default: return state
    }
}
