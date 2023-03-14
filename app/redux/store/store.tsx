import {createStore} from 'redux';
import {RootReducer} from "../reducers/reducer";

const store = createStore(RootReducer)

export default store;


