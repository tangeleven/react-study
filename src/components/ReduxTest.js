import React, {Component} from 'react'
// import store from '../store'
import {connect} from 'react-redux'
import {add, minus, asyncAdd} from '../store/counter'

// 参数1：mapStateToProps = (state) => {return {num: state}}
// 参数2：mapDispatchToProps = dispatch =>{return {add: () => dispatch({type: 'add'})}}

// 这种方式是可以，只是connect会做包装，可以写成下面哪种简写的形式
/* @connect(
    state => ({num: state}),
    dispatch => ({
        add: () => dispatch({type: 'add'}),
        minus: () => dispatch({type: 'minus'})
    })
) */

// 本身redux不支持函数型的action
// 中间件 thunk 支持函数型的action

// connect两个任务：
// 1. 自动渲染
// 2. 映射到组件属性
@connect(
    state => ({num: state.counter}),
    {
        add, minus, asyncAdd
    }
)
class ReduxTest extends Component {
    render() {
        return (
            <div>
                <div>
                    {/* {store.getState()} */}
                    {this.props.num}
                </div>
                <button onClick={() => this.props.add(2)}>+</button>
                <button onClick={this.props.minus}>-</button>
                <button onClick={this.props.asyncAdd}>+</button>
            </div>
        )
    }
}
export default ReduxTest