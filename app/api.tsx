import axios from "axios";
import {JoinLobbyRequest, StartGameRequest, GuessWordRequest, CreateGameRequest} from "./redux/store/requests";
import {showAlert} from "./utils";

const instance = axios.create({
    baseURL: "http://192.168.3.41:8447/test/simulation/"//194.87.216.232
})

const myInterceptor = axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    console.log('error message: ', error.message);
    let status = error.response.status;

    if (status == 404) {
        showAlert(error.response.data);
    }
    else if (status == 400) {
        showAlert(error.response.data);
    }
    else {
        showAlert('Error, please try again later');
        console.log('Status was: ' + status);
    }
    return Promise.reject(error);
});


export const playersAPI = {
    getRoomState(lobbyCode : string ){
        //axios.interceptors.response.eject(myInterceptor);
        return instance.post('get_room_state/' + lobbyCode)
    },
    getAllPlayers(){
        return instance.get('get_all')
    },
    createGame(createGameRequest: CreateGameRequest){
        return instance.post('create_lobby', createGameRequest)
    },
    startGame(startGameRequest: StartGameRequest){
        return instance.post('start_game', startGameRequest)
    },
    startRound(startGameRequest: StartGameRequest){
        return instance.post('start_round', startGameRequest)
    },
    endRound(lobbyCode : string){
        return instance.post('end_round/' + lobbyCode)
    },
    getLeaderGuessWord(lobbyCode : string){
        return instance.post('get_leader_guess_word/' + lobbyCode)
    },
    setNextWord(lobbyCode : string){
        return instance.post('skip_word/' + lobbyCode)
    },
    setStopTimer(lobbyCode : string){
        return instance.post('pause_timer/' + lobbyCode)
    },
    setResumeTimer(lobbyCode : string){
        return instance.post('unpause_timer/' + lobbyCode)
    },
    creatorEndGame(lobbyCode: string){
        return instance.post('end_game/' + lobbyCode);
    },
    disconnectPlayer(joinLobbyRequest: JoinLobbyRequest){
        return instance.post('disconnect_player', joinLobbyRequest)
    },
    joinLobby(joinLobbyRequest: JoinLobbyRequest){
        console.log(joinLobbyRequest);
        return instance.post('join_lobby', joinLobbyRequest)
    },
    guessWord(guessWordRequest: GuessWordRequest){
        //console.log(guessWordRequest);
        return instance.post('guess_word/', guessWordRequest);
    }

}
