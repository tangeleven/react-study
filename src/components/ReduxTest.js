import React, {Component} from 'react'
// import store from '../store'
import {connect} from 'react-redux'

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

@connect(
    state => ({num: state}),
    {
        add: (num) => ({type: 'add', payload: num}),
        minus: () => ({type: 'minus'})
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
            </div>
        )
    }
}
export default ReduxTest