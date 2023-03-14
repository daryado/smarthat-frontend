export type JoinLobbyRequest = {
    player_name : string;
    lobby_code : string;
}

export type StartGameRequest = {
    lobby_code : string;
}

export type GuessWordRequest = {
    lobby_code: string;
    player_name: string;
    word: string;
}

export type CreateGameRequest = {
    player_name : string;
    number_of_words : number;
    round_time : number;
}
