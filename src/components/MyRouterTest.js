import React, {Component} from 'react'
import {createBrowserHistory} from 'history'

// 创建上下文保存有 history、location等
const RouterContext = React.createContext();

// Router: 管理历史记录变更，location变更等等，并传递给后代
class BrowserRouter extends Component {
    constructor(props) {
        super(props);
        // 创建浏览器history对象
        this.history = createBrowserHistory(this.props)

        this.state = {
            location: this.history.location
        }

        this.unlisten = this.history.listen(location => {
            this.setState({location})
        })
    }
    componentWillUnmount() {
         if (this.unlisten) this.unlisten()
    }
    render() {
        return (
            <RouterContext.Provider
                children={this.props.children || null}
                value={{
                    history: this.history,
                    location: this.state.location                }}
            />
        )
    }
}

class Route extends Component {
    render() {
        return (
            <RouterContext.Consumer>
                {context => {
                    return (
                        "xxx"
                    )
                }}
            </RouterContext.Consumer>
        )
    }
}

export default class MyRouterTest extends Component {
    render() {
        return (
            <BrowserRouter>
                <Route path="/foo" component={() => <div>foo</div>}></Route>
                <Route path="/bar" component={() => <div>bar</div>}></Route>
            </BrowserRouter>
        )
    }
}
