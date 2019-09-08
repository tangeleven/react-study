import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

// React类负责逻辑控制，比如修改数据 -> vdom
// ReactDOM类负责渲染，vdom -> dom
// jsx 就是虚拟dom
// ReactDOM.render(<h1>React真帅</h1>, document.getElementById('root'))


ReactDOM.render(<App title="开课吧真不错" />, document.getElementById('root'))



