export const add = (num) => ({type: 'add', payload: num});

export const minus = () => ({type: 'minus'});
// 异步返回的是函数
export const asyncAdd = () => dispatch => {
    setTimeout(() =>{
        dispatch({type: 'add'})
    }, 1000)
}

export const counterReducer = function (state=0, action) {
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