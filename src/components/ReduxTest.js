
import React from 'react'
// import store from '../store'
import {connect} from 'react-redux'
import { dispatch } from 'rxjs/internal/observable/pairs';

// 參數1：mapStateToProps = (state) => {return {num: state}}
// 參數2：mapDispatchToProps = dispatch => {return {add: ()=>dispatch({type: 'add'})}}
@connect(
    state => ({num: state}),
    // dispatch => ({
    //     add: () => dispatch({type: 'add'}),   // action creator
    //     minus: () => dispatch({type: 'minus'}),
    // })
    {
        add: (num)=>({type: 'add', payload: num}),
        minus: ()=>({type: 'minus'}),
        // 
        asyncAdd: () => dispatch => {
            setTimeout(() => {
                dispatch({type: 'add'})
            }, 1000)
        }
    }
)
class ReduxTest extends React.Component {
    /* componentDidMount() {
        store.subscribe(() => {
            this.forceUpdate()
        })
    } */
    render() {
        // console.log('render = ', store.getState())
        return (
            <div>
                <p>{this.props.num}</p>
                <button onClick={()=>this.props.add(2)}>+</button>
                <button onClick={this.props.minus}>-</button>
                <button onClick={this.props.asyncAdd}>+</button>
            </div>
        )
    }
}
export default ReduxTest
/* export default class ReduxTest extends React.Component {
    constructor(props) {
        super()
        console.log(props)
        this.state = {
            count: 0
        }
    }
    addHandle = () => {
        this.setState({
            count: this.state.count + 1
        })
    }
    asyncAddHandle = () => {
        setTimeout(() => {
            this.setState({
                count: this.state.count + 2
            })
        }, 1000)
    }
    minusHandle = () => {
        this.setState({
            count: this.state.count - 1
        })
    }
    render() {
        return (
            <div>
                <p>{this.state.count}</p>
                
                <button onClick={this.addHandle}>+</button>
                <button onClick={this.minusHandle}>-</button>
                <button onClick={this.asyncAddHandle}>+</button>
            </div>
        )
    }
} */
