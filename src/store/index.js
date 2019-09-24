import {createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger'
import thunk from 'redux-thunk'

const counterReducer = function(state=0, action) {
    const num = action.payload || 1

    console.log('2222 ',state)
    switch(action.type) {
        case 'add': 
            
            return state + num
        case 'minus': 
            
            return state - num
        default: 
            return state
    }
}

export default createStore(counterReducer, applyMiddleware(logger, thunk))