import React from 'react'
import JsxTest from './components/JsxTest'
import StateMgt from './components/StateMgt'
import EventHandle from './components/EventHandle'
import ContextTest from './components/ContextTest'
import HocTest from './components/HocTest.js'
import Composition from './components/Composition'
import HooksTest from './components/HooksTest'
import FormTest from './components/FormTest'
import KFormTest from './components/KFormTest'
import ReduxTest from './components/ReduxTest'

import {Button} from 'antd'


function App(props) {
    return (
        <div>
            <h1>{props.title}</h1>
            {/* <JsxTest /> */}
            {/* 状态管理 */}
            {/* <StateMgt /> */}
            {/* 事件处理 */}
            {/* <EventHandle /> */}
            {/* 上下文 */}
            {/* <ContextTest /> */}
            {/* Hoc */}
            {/* <HocTest /> */}
            {/* 组件复合 */}
            {/* <Composition /> */}
            {/* Hooks */}
            {/* <HooksTest /> */}
            {/* <Button type="primary">Button</Button> */}
            {/* <FormTest /> */}
            {/* <KFormTest /> */}
            <ReduxTest />
        </div>
    )
}
export default App

