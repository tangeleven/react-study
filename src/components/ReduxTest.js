import React from 'react'
import store from '../store'

export default class ReduxTest extends React.Component{
    componentDidMount(){
        // 订阅状态变更
        store.subscribe(()=>{
            this.forceUpdate();
        })
    }
    render() {
        return (
            <div>
                {store.getState()}
                <div>
                    <button onClick={()=>{store.dispatch({type: 'add'})}}>+</button>
                    <button onClick={()=>{store.dispatch({type: 'minus'})}}>-</button>
                </div>
            </div>
        )
    }
}
