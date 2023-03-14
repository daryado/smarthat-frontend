import { createSelector } from "reselect";
import {RootReducer} from "../reducers/reducer";
import {State} from "../reducers/initialReducer"

export const lobbyCode = state => state.initReducer.lobbyCode;

export const username = state => state.initReducer.username;
export const word = state => state.initReducer.word;

export const allPlayers = state => state.initReducer.players;

export const gameStage = state => state.initReducer.game_stage;

export const isLeader = state => state.initReducer.is_leader;

export const gameLeader = state => state.initReducer.leader;

// for tracking
export const current_state = state => state.initReducer;

