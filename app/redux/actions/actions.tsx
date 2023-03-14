import {
    CREATE_NEW_GAME,
    CREATOR_CLEAN_OFF_GAME,
    CREATOR_STARTS_THE_GAME,
    CREATOR_STARTS_THE_ROUND,
    PLAYER_CLEAN_OFF_GAME,
    PlayerColor,
    SET_JOINED_PAGE,
    IN_GAME_SET_WORD,
    GAME_RESULTS,
    READY_TO_CONTINUE,
    CHANGE_LEADER
} from '../../types';

export function setJoinedPage(_code: string, _username: string, _color: PlayerColor){
    return {
        type: SET_JOINED_PAGE,
        lobbyCode: _code,
        username: _username,
        color: _color,
    }
}

export function createNewGame(_code: string, _username: string, _color: {}){
    return {
        type: CREATE_NEW_GAME,
        lobbyCode: _code,
        username: _username,
        color: _color,
    }
}

export function playerCleanOffGame(){
    return {
        type: PLAYER_CLEAN_OFF_GAME,
    }
}

export function creatorStartsGame(){
    return {
        type: CREATOR_STARTS_THE_GAME,
    }
}

export function creatorStartsRound(){
    return {
        type: CREATOR_STARTS_THE_ROUND,
    }
}

export function InGameSetWord(_word: string){
    return {
        type: IN_GAME_SET_WORD,
        word: _word,
    }
}

export function changeLeader(_name: string){
    return {
        type: CHANGE_LEADER,
        leaderName: _name,
    }
}


export function GameResult(){
    return {
        type: GAME_RESULTS,
    }
}

export function GameContinue(){
    return {
        type: READY_TO_CONTINUE,
    }
}
