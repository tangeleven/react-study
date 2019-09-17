import {createStore, applyMiddleware, combineReducers} from 'redux';
import logger from "redux-logger";
import thunk from "redux-thunk";
import {counterReducer} from './counter'


const store = createStore(
    // 这里给 counterReducer 起一个名字 counter ，这一步相当于在做模块化
    combineReducers({counter: counterReducer}), 
    applyMiddleware(logger, thunk)
);

export default store;

