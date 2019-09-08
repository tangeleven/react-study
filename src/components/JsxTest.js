import React from 'react'
import ReactDOM from 'react-dom'


export default class JsxTest extends React.Component {
    render() {
        const jsx = <h1>React真帅</h1>
        console.log(jsx)
        return (
            <div>
                {jsx}
            </div>
        )
    }
}

