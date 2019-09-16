import {createStore} from 'redux';

const counterReducer = function (state=0, action) {
    const num = action.payload || 1;
    switch(action.type) {
        case 'add':
            return state + num;
        case 'minus':
            return state - num;
        default:
            return state;

    }
}

const store = createStore(counterReducer);

export default store;

