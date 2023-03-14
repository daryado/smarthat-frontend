import {combineReducers} from 'redux';
import {initialReducer} from "./initialReducer";


export const RootReducer = combineReducers({initReducer: initialReducer})
