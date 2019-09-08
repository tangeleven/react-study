import React, { Component, useState, useEffect } from 'react'


// 函数组件状态管理： useState, useEffect
// 函数型组件状态管理必须有hooks支持，react版本必须大于16.8.x，没有hooks支持的时候，函数型组件通常无状态，仅关注内容展示，返回渲染结果即可
// hooks 只能在16.8.x以后使用
function ClockFunc() {
    // 创建状态, useState返回状态和修改状态的函数所组成的数组
    const [date, setDate] = useState(new Date())

    // 定时器是副作用，需要用到useEffect
    useEffect(()=>{
        const timerId = setInterval(()=>{
            setDate(new Date())
        }, 1000)

        return () => {
            clearInterval(timerId)
        }
    },[]) // 参数2指的是依赖状态，本例中没有依赖而且仅执行一次，就放一个空数组
    // [] 中放依赖的状态，什么时候，什么状态的时候，某个值变化的之后，useEffect函数才执行

    return (
        <div>{date.toLocaleTimeString()}</div>
    )
}


// class 组件通过state 和 setState维护状态
class Clock extends Component {
    constructor(props) {
        super(props)
        this.state = {
            date: new Date(),
            counter: 0
        }
    }
    componentDidMount() {
        // 第一个参数是json格式，回调函数中状态值是 1， 这三个加法只会执行最后一个
        /* this.setState({counter: this.state.counter + 1}, () => {
            console.log(this.state.counter) // 1
        })
        this.setState({counter: this.state.counter + 1}, () => {
            console.log(this.state.counter) // 1
        })
        this.setState({counter: this.state.counter + 1}, () => {
            console.log(this.state.counter) // 1
        }) */
        // console.log(this.state.counter)

        // 第一个参数是函数，回调函数中状态值是 3，它会把第一个参数的函数都执行一遍
        /* this.setState((state) => ({ counter: state.counter + 1 }), () => {
            console.log(this.state.counter) // 3
        })
        this.setState((state) => ({ counter: state.counter + 1 }), () => {
            console.log(this.state.counter) // 3
        })
        this.setState((state) => ({ counter: state.counter + 1 }), () => {
            console.log(this.state.counter)  // 3
        })

        console.log(this.state.counter)  // 0 */

        this.setState((state, props) => {
            console.log(state.counter) // 0
            return { counter: state.counter + 1 }
        }, () => {
            console.log(this.state.counter) // 3
        });
        this.setState((state, props) => {
            console.log(state.counter) // 1
            return { counter: state.counter + 1 }
        }, () => {
            console.log(this.state.counter) // 3
        });
        this.setState((state, props) => {
            console.log(state.counter) // 2
            return { counter: state.counter + 1 }
        }, () => {
            console.log(this.state.counter) // 3
        });

        // 定时器
        this.timerId = setInterval(() => {

            this.setState({
                date: new Date()
            })
        }, 1000)

        document.body.addEventListener('click', this.changeValue, false)
    }
    componentWillUnmount() {
        clearInterval(this.timerId)
    }
    changeValue = () => {
        this.setState({ counter: this.state.counter + 1 })
        console.log(this.state.counter)
    }

    render() {
        return (
            <div>
                <div>{this.state.date.toLocaleTimeString()}</div>
                <p>{this.state.counter}</p>
            </div>
        )
    }
}

export default function StateMgt() {
    return (
        <div>
            <Clock />
            <ClockFunc />
        </div>
    )
}
