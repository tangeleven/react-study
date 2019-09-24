import {createStore, applyMiddleware, combineReducers} from 'redux';
import logger from "redux-logger";
import thunk from "redux-thunk";
import createSagaMiddleware from 'redux-saga'
import mySaga from './sagas';

import {counterReducer} from './counter'
import {user} from './user'

// 1. 创建中间件
const mid = createSagaMiddleware();

const store = createStore(
    // 这里给 counterReducer 起一个名字 counter ，这一步相当于在做模块化
    combineReducers({counter: counterReducer, user: user}), 
    applyMiddleware(logger, mid)
);

// 2. 运行saga监听
mid.run(mySaga);

export default store;

