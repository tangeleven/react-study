import React, {Component} from 'react'
import {createStore} from '../store/kredux';

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

class MyReduxTest extends Component {
    componentDidMount(){
        store.subscribe(() =>{
            this.forceUpdate()
        })
    }
    render() {
        return (
            <div>
                {store.getState()}
                <div>
                    <button onClick={()=>store.dispatch({type: 'add'})}>+</button>
                </div>
            </div>
        )
    }
}
export default MyReduxTest