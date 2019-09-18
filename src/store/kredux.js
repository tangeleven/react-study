
export function createStore(reducer, enhancer) {

    if (enhancer) {
        return enhancer(createStore)(reducer)
    }

    let currentState = undefined;
    const currentListeners = [];

    function getState() {
        return currentState;
    }

    function dispatch(action) {
        currentState = reducer(currentState, action)
        currentListeners.forEach(v => v())
        return action
    }

    function subscribe(cb) {
        currentListeners.push(cb);
    }

    dispatch({type: Symbol()})

    return {
        getState,
        dispatch,
        subscribe
    }
}

export function applyMiddleware(...middlewares){
    return 
}




